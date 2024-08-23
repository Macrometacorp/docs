---
sidebar_position: 35
title: Consumers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Prerequisites from '../../_partials/_prerequisites-sdk-api-key.md';

A _consumer_ is an application that subscribes to a stream and then receives messages published by [producers](/docs/streams/stream-basics/producers/).

## Receive Modes

Messages can be received from streams either synchronously (sync) or asynchronously (async).

| Mode          | Description  |
|--------------|---------------------------|
| Sync receive  | A sync receive will be blocked until a message is available. |
| Async receive | An async receive will return immediately with a future value |

## Acknowledgement (ack)

When a consumer has successfully processed a message, it must send an acknowledgement to the Global Data Network (GDN) so that the GDN can discard the message. If no acknowledgement is received, then the GDN stores the message based on [retention and expiry rules](messages#message-retention-and-expiry).

Messages can be acknowledged either one by one or cumulatively. With cumulative acknowledgement, the consumer only needs to acknowledge the last message it received. All messages in the stream, up to and including, the provided message will not be re-delivered to that consumer.

:::note
Cumulative acknowledgement cannot be used with [shared subscription mode](subscriptions#shared), because shared mode involves multiple consumers having access to the same subscription.
:::

## Create a Consumer

This sample code creates a new client, requests a stream object, and then creates a consumer. 

If you're using JavaScript, the code creates a `jsc8` client. If Python, it creates a `C8Client`

### Prerequisites

<Prerequisites />

### Create Consumer Code

This code creates a new client, requests a stream object, and then creates a consumer.

If you're using JavaScript, the code creates a `jsc8` client. If Python, it creates a `C8Client`

<Tabs groupId="modify-single">
<TabItem value="javascript" label="JavaScript SDK">

```js
const jsc8 = require("jsc8");

const BASE_URL = "https://play.paas.macrometa.io/"

client = new jsc8({
    url: BASE_URL,
    apiKey: "xxxxxx", // Update this with your API key
    fabricName: "_system",
});

const streamName = "streamQuickstart";
const subscriptionName = "consumer-subscription"

async function main () {
  async function createStream() {
      if (await client.hasStream(streamName, false)) {
        console.log("This stream already exists!");
        console.log(`Existing Consumer = c8globals.${streamName}`);
      } else {
        console.log("\nCreating global stream...");
        // To create a global stream, set the second parameter to false
        // There is an option to create a local stream, which is only accessible within the region
        const streamInfo = await client.createStream(streamName, false);
        console.log(`New Consumer = ${streamInfo.result["stream-id"]}`);
      }
    }

  async function consumer() {
    try {
      await console.log("\nConnecting consumer to global stream...");
      // Create stream only if stream does not exist
      createStream();
      // Request stream object
      const stream = client.stream(streamName, false);
      // Request one-time password
      const consumerOTP = await stream.getOtp();
      // Create consumer
      const consumer = await stream.consumer(subscriptionName, BASE_URL.replace("https://",""), {
        otp: consumerOTP
      });
      // Run consumer - open connection to server
      consumer.on("message", (msg) => {
        const { payload, messageId } = JSON.parse(msg);
        // Received message payload
        console.log(Buffer.from(payload, "base64").toString("ascii"));
        // Send message acknowledgement
        consumer.send(JSON.stringify({ messageId }));
      });
    } catch (e) {
      await console.log("Could not receive messages " + e);
    }
  }

  consumer();
}
main();
```
</TabItem>

<TabItem value="python" label="Python SDK">

```python
import base64
import json
import os
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

""" Create consumer and receive data through a stream """
def create_consumer():
    print("\nConnecting consumer to global stream...")
    consumer = client.subscribe(
        stream_name,
        local=False,
        subscription_name="consumer_subscription"
        )
    while True:
        message = json.loads(consumer.recv())
        decoded_message = base64.b64decode(message['payload']).decode('utf-8')
        print(f"Received message '{decoded_message}' id='{message['messageId']}'")
        consumer.send(json.dumps(
            {'messageId': message['messageId']}))


create_consumer()
```
</TabItem>
</Tabs>

## Readers

Stream readers are similar to stream consumers, but there are two crucial differences between them:

- Readers allow you to specify the starting point for processing messages within a stream. In contrast, consumers always begin with the earliest or latest available unacknowledged message.
- Unlike consumers, readers do not retain data or acknowledge messages. This means that readers can access messages without affecting other consumers or the message state within the stream.
- Readers read both acknowledged and unacknowledged messages.

Readers are useful in scenarios where you want to process the stream data without affecting the message acknowledgment state or when you need to start processing messages from a specific point in the stream. For example, you might use a reader for analytics, monitoring, or auditing purposes.

For more information about using readers, refer to [Manage Readers](../stream-tasks/manage-readers).

## Listeners

Client libraries can provide their own listener implementations for consumers. In this interface, the `received` method is called whenever a new message is received.

## Cursor

A cursor is the subscription position for a stream consumer. You can think of it like the cursor on your page, marking where you are.

