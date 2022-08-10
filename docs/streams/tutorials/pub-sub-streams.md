---
sidebar_position: 2
title: Pub-Sub with Streams
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This is about how to create geo-replicated streams and do queues & pub-sub messaging with local latencies across the globe.

## Pre-requisite

Let's assume your

* Tenant name is `nemo@nautilus.com` and
* User password is `xxxxxxxx`.

## Installation

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
With Yarn or NPM

    yarn add jsc8
    (or)
    npm install jsc8

If you want to use the SDK outside of the current directory, you can also install it globally using the `--global` flag:

    npm install --global jsc8

From source,

    git clone https://github.com/macrometacorp/jsc8.git
    cd jsC8
    npm install
    npm run dist
```

</TabItem>

<TabItem value="py" label="Python">

```py
pyC8 requires Python 3.5+. Python 3.6 or higher is recommended

To install pyC8, simply run

    $ pip3 install pyC8

or, if you prefer to use conda:

    conda install -c conda-forge pyC8

or pipenv:

    pipenv install --pre pyC8

Once the installation process is finished, you can begin developing applications in Python.
```

</TabItem>
</Tabs>  


## Code Sample

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
const jsc8 = require('jsc8');

const gdnUrl = "https://gdn.paas.macrometa.io";

// Crete a authenticated instance with Token / Apikey
// const client = new jsc8({url: gdnUrl, token: "XXXX", fabricName: '_system'});
// const client = new jsc8({url: gdnUrl, apiKey: "XXXX", fabricName: '_system'});
// await console.log("Authentication done!!...");

// Or use Email & Password to Authenticate client instance
const client = new jsc8(gdnUrl);

await client.login("nemo@nautilus.com", "xxxxxx");

//Variables
const msgs = ["message 1", "message 2", "message 3"];
let numberOfMessages = 0;

async function getDCList() {
  let dcListAll = await client.listUserFabrics();
  let dcListObject = await dcListAll.find(function(o) { return o.name === geo_fabric; });
  return dcListObject.options.dcList.split(",");
}


async function publish(stream) {
  console.log("\n ------- PUBLISH MESSAGES  ------");
  const publisher = await client.createStreamProducer("testStream");
}

async function receive(stream) {
  const consumer = await client.createStreamReader("testStream", "my-subscription");
  consumer.on("message", (msg) => {
    console.log(msg);
  });
}

(async function() {
  const dcList = await getDCList();
  await console.log("dcList: ", dcList);

  await client.createStream("testStream", false);
  //Here the last boolean value tells if the stream is local or global. false means that it is global.


  // publishing streams
  await receive();

  await publish();

})();
```

</TabItem>

<TabItem value="py" label="Python">

```py
from c8 import C8Client
import random
import threading
import time
import json
import base64
import six

# Variables
URL = "gdn.paas.macrometa.io"  # The request will be automatically routed to closest location.
EMAIL = "nemo@nautilus.com"
PASSWORD = "xxxxxxxx"
FABRIC = "_system"
STREAM_NAME = "stream" + str(random.randint(1, 10000))


def create_subscriber():
    print("\n ------- SUBSCRIBE TOPIC  ------")

    print(f"Subscribe to stream: {STREAM_NAME}")
    subscriber1 = client.subscribe(stream=STREAM_NAME, local=True, subscription_name="subscriber1",
                                   consumer_type=client.CONSUMER_TYPES.EXCLUSIVE)

    # Receive: Read the published messages over stream.
    for i in range(10):
        response1 = json.loads(subscriber1.recv())
        msg1 = base64.b64decode(six.b(response1["payload"]))
        print("Received Message:", msg1)
        if response1["messageId"]:
            print("Acknowledging msg: ", response1["messageId"])
            subscriber1.send(json.dumps({'messageId': response1['messageId']}))


if __name__ == '__main__':

    print("\n ------- CONNECTION SETUP  ------")
    print(f"user: {EMAIL}, geofabric: {FABRIC}")
    print(f"\n1. CONNECT: federation: {URL},  user: {EMAIL}")
    client = C8Client(protocol='https', host=URL, port=443, email=EMAIL, password=PASSWORD, geofabric=FABRIC)

    print("\n ------- CREATE STREAM  (local/geo-replicated) ------")
    client.create_stream(STREAM_NAME, local=True)   # Set local=False for geo-replicated stream available in all regions
    print(f"Created stream: {STREAM_NAME}")
    time.sleep(10)  # To account for network latencies in replication

    print("\n ------- CREATE SUBSCRIBER  ------")
    subscriber_thread = threading.Thread(target=create_subscriber)
    subscriber_thread.start()

    print("\n ------- CREATE PRODUCER  ------")
    print(f"Create producer on stream: {STREAM_NAME}")
    producer = client.create_stream_producer(stream=STREAM_NAME, local=True)
    print(producer.__dict__)
    print("\n ------- PUBLISH MESSAGES  ------")
    print(f"Publish 10 messages to stream: {STREAM_NAME}")
    for i in range(10):
        msg = f"Hello from user--({str(i)})"
        data = {
            "payload": msg,
        }
        try:
            producer.send(json.dumps(data))
            response = json.loads(producer.recv())
        except Exception as e:
            m = "Producer failed to send message due to Pulsar Error - %s" % e
            print(m)

    producer.close()
    print("Publish messages done...")

    print("Wait for subscriber to consume all messages...")
    subscriber_thread.join()  # Wait for subscriber to consume all messages.
    print("\n ------- DONE  ------")
```

</TabItem>
</Tabs>  
