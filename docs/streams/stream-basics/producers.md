---
sidebar_position: 25
title: Producers
---

A _producer_ is an application or process that publishes messages to the stream. Once published, they can be processed with [stream workers](../../cep/index.md).

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

## Batching

If batching is enabled, then the producer accumulates and sends a batch of messages in a single request. Batching size is defined by the maximum number of messages and maximum publish latency.

## How to create producers?

It is possible to use our JavaScript or Python SDK to create producers.

<Tabs groupId="modify-single">
<TabItem value="javascript" label=" JavaScript SDK">

- Step 1. [Install the SDK](../../sdks/install-sdks.md).
- Step 2. Change `BASE_URL` if necessary and insert `apiKey`.
- Step 3. Create an instance of the jsC8.
- Step 4. Request `stream` object.
- Step 5. Request One Time Password and create producer.

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
    const streamInfo = await client.createStream(streamName, is_local);
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
    // Create producer
    const producer = await stream.producer(BASE_URL.replace("https://",""), {
      otp: producerOTP
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

