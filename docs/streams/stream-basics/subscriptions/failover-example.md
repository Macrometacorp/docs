---
sidebar_position: 40
title: Failover Code Example
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Failover

When setting up consumers _exclusive_ mode is the default mode. To use failover mode we need to change consumers configuration to `Failover` ([Shown in code example below](#code-example-for-consumer-1)). In failover mode, multiple consumers can attach to the same subscription. A master consumer is picked for the stream to receives messages. When the master consumer disconnects, all non-acknowledged and subsequent messages are delivered to the next consumer in line.

# Prerequisites
1. You should have Macrometa account. If you don't have one it is possible to create free account - [create a free developer account](https://auth-play.macrometa.io/sign-up).
2. You should have _Node.js_ >= v14 installed.

## How to use code examples

The best way to test various stream functionality is to create one producer and two consumers. (There can be more consumers but two is enough to test how messages are distributed between consumers). First step would be to create `producer.js` file and copy code shown in [code example for producer](#code-example-for-producer). After that we can create two consumers in the similar manner, in new file `consumer-1` copy [code example for consumer 1](#code-example-for-consumer-1) and in second new file `consumer-2` copy [code example for consumer 2](#code-example-for-consumer-2).

To test the code open three terminals simultaneously and run producer file `producer.js` in one of them with `node producer.js`. After that run `consumer-1.js` in second terminal and `consumer-2.js` in third terminal.
If there is no error you should see messages in both consumers.

:::note
You can run the code examples in any order but keep in mind that if you run `producer.js` code first it will instantly generate data (endless stream of data). If none of the consumers are running those first messages will not be picked up.
:::


## Code example for producer

<Tabs groupId="modify-single">
<TabItem value="javascript" label=" JavaScript">

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
<TabItem value="py" label="Python">

- Step 1. [Install the SDK](../../../sdks/install-sdks.md).
- Step 2. Change `BASE_URL` if necessary and insert `apiKey`.
- Step 3. Create an instance of the C8Client.
- Step 4. Request `stream` object.
- Step 5. Request One Time Password and create producer.


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

## Code example for consumer 1

<Tabs groupId="modify-single">
<TabItem value="javascript" label=" JavaScript">

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
      otp: consumerOTP,
      subscriptionType: "Failover"
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
<TabItem value="python" label="Python">

- Step 1. [Install the SDK](../../../sdks/install-sdks.md).
- Step 2. Change `BASE_URL` if necessary and insert `apiKey`.
- Step 3. Create an instance of the C8Client.
- Step 4. Request `stream` object.
- Step 5. Request One Time Password and create producer.

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
        subscription_name="consumer_subscription",
        consumer_type="Failover"
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

:::note
Keep in mind that both consumers need to have same subscription name. In both consumer code examples subscription name is `consumer-subscription`.
:::

## Code example for consumer 2

<Tabs groupId="modify-single">
<TabItem value="javascript" label=" JavaScript">

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
      otp: consumerOTP,
      subscriptionType: "Failover"
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
<TabItem value="python" label="Python">

- Step 1. [Install the SDK](../../../sdks/install-sdks.md).
- Step 2. Change `BASE_URL` if necessary and insert `apiKey`.
- Step 3. Create an instance of the C8Client.
- Step 4. Request `stream` object.
- Step 5. Request One Time Password and create producer.

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
        subscription_name="consumer_subscription",
        consumer_type="Failover"
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