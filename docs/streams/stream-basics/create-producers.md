---
sidebar_position: 30
title: Create Producers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page describes how to create a producer.

## Prerequisites

- A [Macrometa account](https://auth-play.macrometa.io/) with sufficient permissions to create streams.
- Appropriate SDK installed. For more information, refer to [Install SDKs](../../sdks/install-sdks.md).

## Create Producer Code

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

