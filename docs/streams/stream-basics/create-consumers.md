---
sidebar_position: 40
title: Create Consumers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Prerequisites from '../../_partials/_prerequisites-sdk-api-key.md';

This page describes how to create a [consumer](consumers.md).

<Prerequisites />

## Create Consumer Code

When this code runs, it creates a new client, requests a stream object, and then creates a consumer.

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

<TabItem value="python" label="Python">

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