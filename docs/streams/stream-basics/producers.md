---
sidebar_position: 25
title: Producers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


A _producer_ is an application or process that publishes messages to the stream. Once published, they can be processed with [stream workers](../../cep/).

## Send Modes

Producers can send messages to GDN either synchronously (sync) or asynchronously (async).

| Mode       | Description  |
|-----------|---------------------|
| Sync send  | The producer waits for acknowledgement from the broker after sending each message. If acknowledgment isn't received, then the producer considers the send operation a failure. |
| Async send | The producer puts the message in a blocking queue and return immediately. The client library then sends the message to the broker in the background. If the queue is full, then the producer could be blocked or fail immediately when calling the API, depending on arguments passed to the producer. |

## Compression

Messages published by producers can be compressed during transportation in order to save bandwidth. Macrometa streams currently supports two types of compression:

- [LZ4](https://github.com/lz4/lz4)
- [ZLIB](https://zlib.net/)
- [ZSTD](https://facebook.github.io/zstd/)
- [SNAPPY](https://github.com/google/snappy)

## Batching

Macrometa Streams use batching to enhance efficiency in message processing. When batching is enabled, the producer aggregates multiple messages and transmits them as a single batched request. The batching size is determined by two factors: the maximum number of messages allowed in a batch and the maximum publish latency.

By default, a batch can accommodate up to 1,000 messages. The default maximum publish latency is set at 10 milliseconds, ensuring a timely transmission of message batches.

## How to create a producer with specific options in SDK

This example shows how to create a producer with specific options in JavaScript SDK.
When we create a producer, we can specify the following options:


|         Option          |                         Description                         | Default |
| :---------------------: | :---------------------------------------------------------: | :-----: |
|    sendTimeoutMillis    |                        Send timeout                         | 30 secs |
|     batchingEnabled     |                 Enable batching of messages                 |  false  |
|   batchingMaxMessages   |       Maximum number of messages permitted in a batch       |  1000   |
|   maxPendingMessages    | Set the max size of the internal-queue holding the messages |  1000   |
| batchingMaxPublishDelay |    Time period within which the messages will be batched    |  10ms   |

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
    createStream();
    await console.log("\nConnecting producer to global stream...");

    // Request stream object
    const stream = client.stream(streamName, false);
    // Request One Time Password
    const producerOTP = await stream.getOtp();

    // ********** Producer Options **********
    // Create producer
    const producer = await stream.producer(BASE_URL, {
      otp: producerOTP,
      sendTimeoutMillis: 30000, // default is 30000 ms
      batchingEnabled: true,  // default is false
      compressionType: 'LZ4', // Options: NONE, LZ4, ZLIB, ZSTD, SNAPPY -> default is NONE
      batchingMaxMessages: 100, // default is 1000
      batchingMaxPublishDelayMs: 10 // default is 10 ms
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
```
</TabItem>
</Tabs>