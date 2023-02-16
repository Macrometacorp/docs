---
sidebar_position: 30
title: Shared Code Example
---

## Shared

When setting up consumers _exclusive_ mode is the default mode. To use shared (round robin) mode we need to change consumers configuration to `Shared` ([Shown in code example below](#code-example-for-consumer-1)). Messages are delivered in a round robin distribution across consumers, and any given message is delivered to only one consumer.

:::note
There are two important things to be aware of when using shared mode:

Message ordering is not guaranteed.
You cannot use cumulative acknowledgment with shared mode.
:::



# Prerequisites
1. You should have Macrometa account. If you don't have one it is possible to create free account - [create a free developer account](https://auth-play.macrometa.io/sign-up).
2. You should have _Node.js_ >= v14 installed.

## How to use code examples

The best way to test various stream functionality is to create one producer and two consumers. (There can be more consumers but two is enough to test how messages are distributed between consumers). First step would be to create `producer.js` file and copy code shown in [code example for producer](#code-example-for-producer). After that we can create two consumers in the similar manner, in new file `consumer-1` copy [code example for consumer 1](#code-example-for-consumer-1) and in second new file `consumer-2` copy [code example for consumer 2](#code-example-for-consumer-2).

To test the code open three terminals simultaneously and run producer file `producer.js` in one of them with `node producer.js`. After that run `consumer-1.js` in second terminal and `consumer-2.js` in third terminal.
If there is no error you should see messages in both consumers.


## Code example for producer

<Tabs groupId="modify-single">
<TabItem value="javascript" label=" JavaScript SDK">

- Step 1. [Install the SDK](../../../sdks/install-sdks.md).
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
    // To create a global stream, set the second parameter to false
    // There is an option to create a local stream, which is only accessible within the fabric
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

## Code example for consumer 1

<Tabs groupId="modify-single">
<TabItem value="javascript" label=" JavaScript SDK">

- Step 1. [Install the SDK](../../../sdks/install-sdks.md).
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
    const consumer = await stream.consumer(subscriptionName, BASE_URL.replace("https://",""), {
      otp: consumerOTP,
      subscriptionType: "Shared"
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

:::note
Keep in mind that both consumers need to have same subscription name. In both consumer code examples subscription name is `consumer-subscription`.
:::

## Code example for consumer 2

<Tabs groupId="modify-single">
<TabItem value="javascript" label=" JavaScript SDK">

- Step 1. [Install the SDK](../../../sdks/install-sdks.md).
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
    const consumer = await stream.consumer(subscriptionName, BASE_URL.replace("https://",""), {
      otp: consumerOTP,
      subscriptionType: "Shared"
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