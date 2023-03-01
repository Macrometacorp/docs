---
sidebar_position: 10
title: Exclusive Subscription Example
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Prerequisites from '../../_partials/_prerequisites-sdk-api-key.md';

This page describes how to configure an exclusive subscription for one stream. Refer to the [exclusive subscription](subscriptions.md#exclusive) section for details.

To test the example code, open three terminals simultaneously and run `node producer.js`, then run `consumer-1.js` in second terminal and `consumer-2.js` in third terminal. If successful, you will see messages in both consumer terminals.

<Prerequisites />

## Producer Example

This code creates a stream if one doesn't already exist, then creates a producer.

<Tabs groupId="operating-systems">
<TabItem value="js" label="JavaScript SDK">

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

    producer = client.create_stream_producer(stream_name, local=False)
    while True:
        message = f"Hello Macrometa Stream! Here is your random message number {random.randint(1, 100)}"
        producer.send(message)
        time.sleep(1)


create_producer()
```

</TabItem>
</Tabs>

## Create Consumer 1

This code creates a stream if one doesn't already exist, then creates the first consumer.

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
const subscriptionName = "consumer-subscription"

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
    // Request One Time Password
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

## Create Consumer 2

This code creates a stream if one doesn't already exist, then creates the second consumer.

The name of consumer 2 must match the name of consumer 1.

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
const subscriptionName = "consumer-subscription"

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
    // Request One Time Password
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