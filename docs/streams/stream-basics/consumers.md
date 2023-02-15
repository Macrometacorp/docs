---
sidebar_position: 35
title: Consumers
---

A _consumer_ is an application that subscribes to a stream and then receives messages published by [producers](producers.md).

## Receive Modes

Messages can be received from streams either synchronously (sync) or asynchronously (async).

| Mode          | Description  |
|--------------|---------------------------|
| Sync receive  | A sync receive will be blocked until a message is available. |
| Async receive | An async receive will return immediately with a future value |

## Acknowledgement (ack)

When a consumer has successfully processed a message, it needs to send an acknowledgement to the Global Data Network (GDN) so that the GDN can discard the message. If no acknowledgement is received, then the GDN stores the message based on [retention and expiry rules](messages.md#message-retention-and-expiry).

Messages can be acknowledged either one by one or cumulatively. With cumulative acknowledgement, the consumer only needs to acknowledge the last message it received. All messages in the stream, up to and including, the provided message will not be re-delivered to that consumer.

:::note
Cumulative acknowledgement cannot be used with [shared subscription mode](subscriptions.md#shared), because shared mode involves multiple consumers having access to the same subscription.
:::

## Readers

GDN stream readers are like stream consumers, but they have two crucial differences:

- You can specify where on a stream readers begin processing messages; consumers always begin with the latest available unacknowledged message.
- Readers don't retain data or acknowledge messages.

## Listeners

Client libraries can provide their own listener implementations for consumers. In this interface, the `received` method is called whenever a new message is received.

## Cursor

A cursor is the subscription position for a stream consumer. You can think of it like the cursor on your page, marking where you are.

## Create Consumers

It is possible to use our JavaScript or Python SDK to create producers.

<Tabs groupId="modify-single">
<TabItem value="javascript" label=" JavaScript SDK">

- Step 1. [Install the SDK](../../sdks/install-sdks.md).
- Step 2. Change `BASE_URL` if necessary and insert `apiKey`.
- Step 3. Create an instance of the jsC8.
- Step 4. Request `stream` object.
- Step 5. Request One Time Password and create consumer.

```js
const jsc8 = require("jsc8");

const BASE_URL = "https://play.paas.macrometa.io/"

client = new jsc8({
    url: BASE_URL,
    apiKey: "xxxxxx",
    fabricName: "_system",
});

const streamName = "streamQuickstart";
const subscriptionName = "consumer-subscription"

async function consumer() {
  try {
    await console.log("\nConnecting consumer to global stream...");

    // Request stream object
    const stream = client.stream(streamName, false);
    // Request One Time Password
    const consumerOTP = await stream.getOtp();
    // Create consumer
    const consumer = stream.consumer(subscriptionName, BASE_URL.replace("https://",""), {
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
```
</TabItem>
</Tabs>