---
sidebar_position: 25
title: Producers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Prerequisites from '../../_partials/_prerequisites-sdk-api-key.md';

A _producer_ is an application or process that publishes messages to the stream. Once published, they can be processed with [stream workers](../../cep/).

## Send Modes

Producers can send messages to GDN either synchronously (sync) or asynchronously (async).

| Mode       | Description                                                                                                                                         |
|:-----------|:----------------------------------------------------------------------------------------------------------------------------------------------------|
| Sync send  | The producer waits for acknowledgement from the broker after sending each message. If acknowledgment isn't received, then the producer considers the send operation a failure. |
| Async send | The producer puts the message in a blocking queue and return immediately. The client library then sends the message to the broker in the background. If the queue is full, then the producer could be blocked or fail immediately when calling the API, depending on arguments passed to the producer. |


## Compression

Messages published by producers can be compressed during transportation in order to save bandwidth. Macrometa streams currently supports two types of compression:

- [LZ4](https://github.com/lz4/lz4)
- [ZLIB](https://zlib.net/)
- [ZSTD](https://facebook.github.io/zstd/)
- [SNAPPY](https://github.com/google/snappy)

## Batching

Macrometa streams use batching to enhance efficiency in message processing. When batching is enabled, the producer aggregates multiple messages and transmits them as a single batched request. The batching size is determined by two factors: the maximum number of messages allowed in a batch and the maximum publish latency.

By default, a batch can accommodate up to 1,000 messages. The default maximum publish latency is set at 10 milliseconds, ensuring a timely transmission of message batches.

## Create a Producer

This example shows how to create a producer with specific options using the JavaScript SDK and Python SDK.
When we create a producer, we can specify the following options:

| Option                | Description                                      | Default |
|:----------------------|:-------------------------------------------------|:-------|
| sendTimeoutMillis     | Send timeout                                     | 30 secs |
| batchingEnabled       | Enable batching of messages                      |  false  |
| batchingMaxMessages   | Maximum number of messages permitted in a batch  |  1000   |
| maxPendingMessages    | Set the max size of the internal-queue holding the messages |  1000   |
| batchingMaxPublishDelay | Time period within which the messages will be batched |  10ms   |

**sendTimeoutMillis:** Specifies the time in milliseconds the producer waits for acknowledgement from the broker after sending a message. If the acknowledgement isn't received within this time, the send operation is considered a failure. Longer timeouts can be more tolerant of network issues but may lead to slower throughput.

**batchingEnabled:** Determines whether messages are batched before being sent to the broker. Batching can help increase throughput and reduce overhead but may introduce a slight delay in message delivery.

**batchingMaxMessages:** Sets the maximum number of messages allowed in a batch. Larger batches can increase throughput but may consume more memory and introduce latency.

**maxPendingMessages:** Controls the maximum size of the internal queue holding the messages before they are sent to the broker. This can be helpful for controlling memory usage and preventing excessive message backlog. If the queue reaches its maximum size, new messages may be blocked or fail immediately, depending on the producer configuration.

**batchingMaxPublishDelay:** Defines the maximum time period in milliseconds within which messages are batched before being sent to the broker. Lower values can help ensure faster delivery at the cost of potentially smaller batches and reduced throughput.

### Prerequisites

<Prerequisites />

### Sample Code

When this code runs, it creates a new client, requests a stream object, and then creates a producer.

If you're using JavaScript, the code creates a `jsc8` client. If Python, it creates a `C8Client`

<Tabs groupId="modify-single">
<TabItem value="javascript" label="JavaScript SDK">

```js
const jsc8 = require("jsc8");

const BASE_URL = "https://play.paas.macrometa.io/"

client = new jsc8({
    url: BASE_URL,
    apiKey: "xxxxxx",
    fabricName: "_system",
});

const streamName = "streamQuickstart";

async function main () {
  async function createStream() {
    if (await client.hasStream(streamName, false)) {
      console.log("This stream already exists!");
      console.log(`Existing Producer = c8globals.${streamName}`);
    } else {
      console.log("\nCreating global stream...");
      // To create a global stream, set the second parameter to false
      // There is an option to create a local stream, which is only accessible within the region
      const streamInfo = await client.createStream(streamName, false);
      console.log(`New Producer = ${streamInfo.result["stream-id"]}`);
    }
  }

  async function producer() {
    try {
      // Create stream only if stream does not exist
      await createStream();
      await console.log("\nConnecting producer to global stream...");

      // Request stream object
      const stream = client.stream(streamName, false);
      // Request one-time password
      const producerOTP = await stream.getOtp();

      // ********** Producer Options **********
      // Create producer
      const producer = await stream.producer(BASE_URL, {
        otp: producerOTP,
        sendTimeoutMillis: 30000, // Default is 30000 ms
        batchingEnabled: true,  // Default is false
        compressionType: 'LZ4', // Options: NONE, LZ4, ZLIB, ZSTD, SNAPPY -> default is NONE
        batchingMaxMessages: 100, // Default is 1000
        batchingMaxPublishDelayMs: 10 // Default is 10 ms
      });

      // Run producer - Open connection to server
      producer.on("open", () => {});

      // Set messages in interval of 1000 ms
      setInterval(() => {
        // If your message is an object, convert the object to a string.
        // e.g. const message = JSON.stringify({message:'Hello World'});
        const message = `Hello Macrometa Stream! Here is your random message number ${Math.floor(
          Math.random() * 101
        )}`;
        let payloadObj = { payload: Buffer.from(message).toString("base64") };
        producer.send(JSON.stringify(payloadObj));
      }, 1000);

      producer.onclose = function () {
        console.log("Closed WebSocket:Producer connection for " + streamName);
      };
    } catch (e) {
      await console.log("Error while creating stream publisher" + e);
    }
  }

  producer();
}
main();
```

</TabItem>

<TabItem value="py" label="Python SDK">

```python
import os
import random
import time

from c8 import C8Client

""" For Python SDK we can omit https:// part of the URL """
BASE_URL = "play.paas.macrometa.io/"

stream_name = "stream_quickstart"

""" Connect to GDN """
client = C8Client(
    protocol='https',
    host=BASE_URL,
    port=443,
    apikey="xxxxxx",
    geofabric="_system"
)

""" Create stream"""
def create_stream():
    has_stream = client.has_stream(stream_name)
    """ Create a stream if stream does not exist """
    if has_stream:
        print("This stream already exists!")
        print(f"Existing Producer = c8globals.${stream_name}")
    else:
        print("\nCreating global stream...")
        stream_info = client.create_stream(stream_name, False)
        print(f"New Producer = ${stream_info['stream-id']}")


""" Create producer and send data through a stream """
def create_producer():
    create_stream()

    """ Be sure to use enum value for compression_type"""
    producer = client.create_stream_producer(
        stream_name,
        local=False, # Default is False (global stream)
        send_timeout_millis=30000, # Default is 30000
        batching_enabled=True, # Default is False
        compression_type=CompressionType.LZ4.value, # Options: NONE, LZ4, ZLIB, ZSTD, SNAPPY -> default is NONE
        batching_max_messages=100, # Default is 1000
        batching_max_publish_delay_ms= 10 # Default is 10
    )

    while True:
        message = f"Hello Macrometa Stream! Here is your random message number {random.randint(1, 100)}"
        producer.send(message)
        time.sleep(1)


create_producer()
```

</TabItem>
</Tabs>

