---
sidebar_position: 40
title: Create Consumers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Prerequisites from '../../_partials/_prerequisites-sdk-api-key.md';

This page describes how to create a consumer.

<Prerequisites />

## Create Consumer Code

When this code runs, it creates a new `jsc8` client, requests a stream object, and then creates a consumer.

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
</Tabs>