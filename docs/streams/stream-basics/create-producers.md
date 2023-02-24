---
sidebar_position: 30
title: Create Producers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Prerequisites from '../../_partials/_prerequisites-sdk-api-key.md';

This page describes how to create a [producer](producers.md).

<Prerequisites />

## Create Producer Code

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
      createStream();
      await console.log("\nConnecting producer to global stream...");

      // Request stream object
      const stream = client.stream(streamName, false);
      // Request one-time password
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
}
main();
```

</TabItem>

<TabItem value="py" label="Python">

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

    producer = client.create_stream_producer(stream_name, local=False)
    while True:
        message = f"Hello Macrometa Stream! Here is your random message number {random.randint(1, 100)}"
        producer.send(message)
        time.sleep(1)


create_producer()
```

</TabItem>
</Tabs>

