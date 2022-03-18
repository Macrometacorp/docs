---
sidebar_position: 2
title: Pub-Sub with Streams
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Pub-Sub with Streams

This is about how to create geo-replicated streams and do queues & pub-sub messaging with local latencies across the globe.

## Pre-requisite

Let's assume your

* Tenant name is `nemo@nautilus.com` and
* User password is `xxxxxxxx`.

## Driver download

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python Client">

    pyC8 requires Python 3.5+. Python 3.6 or higher is recommended

    To install pyC8, simply run

        $ pip3 install pyC8

    or, if you prefer to use conda:

        conda install -c conda-forge pyC8

    or pipenv:

        pipenv install --pre pyC8

    Once the installation process is finished, you can begin developing applications in Python.

  </TabItem>
  <TabItem value="js" label="Javascript Client">

    With Yarn or NPM

        yarn add jsc8
        (or)
        npm install jsc8

    If you want to use the driver outside of the current directory, you can also install it globally using the `--global` flag:

        npm install --global jsc8

    From source,

        git clone https://github.com/macrometacorp/jsc8.git
        cd jsC8
        npm install
        npm run dist

  </TabItem>
</Tabs>  


## Code Sample

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    from c8 import C8Client
    import random
    import threading
    import time
    import json
    import base64
    import six

    # Variables
    global_url = "gdn.paas.macrometa.io" # The request will be automatically routed to closest location.
    email = "guest1@macrometa.io"
    password = "guest1"
    geo_fabric = "testfabric"
    stream_name = "stream"+ str(random.randint(1, 10000))

    def create_subscriber():
        print("\n ------- SUBSCRIBE TOPIC  ------")

        print("Subscribe to stream: {}".format(stream_name))
        subscriber1 = client.subscribe(stream=stream_name, local=True, subscription_name="subscriber1",
        consumer_type=client.CONSUMER_TYPES.EXCLUSIVE)

        #receive: read the published messages over stream.
        for i in range(10):
            response = json.loads(subscriber1.recv())
            msg = base64.b64decode(response["payload"])
            print("Received Message:", msg)
            if response["messageId"]:
                # print("Acknowledging msg: ", response["messageId"])
                subscriber1.send(json.dumps(
                    {"payload": base64.b64encode(six.b(
                        response["messageId"])).decode("utf-8")}))

    if __name__ == '__main__':

        print("\n ------- CONNECTION SETUP  ------")
        print("user: {}, geofabric:{}".format(email, geo_fabric))
        print("\n1. CONNECT: federation: {},  user: {}".format(global_url, email))
        client = C8Client(protocol='https', host=global_url, port=443,
                        email=email, password=password,
                        geofabric=geo_fabric)    

        print("\n ------- CREATE STREAM  (local/geo-replicated) ------")
        client.create_stream(stream_name, local=True)  # set local=False for geo-replicated stream available in all regions.
        print("Created stream: {}".format(stream_name))
        time.sleep(10)  # to account for network latencies in replication

        print("\n ------- CREATE SUBSCRIBER  ------")
        subscriber_thread = threading.Thread(target=create_subscriber)
        subscriber_thread.start()

        print("\n ------- CREATE PRODUCER  ------")
        print("Create producer on stream: {}".format(stream_name))
        producer = client.create_stream_producer(stream_name, local=True)
        print(producer.__dict__)
        print("\n ------- PUBLISH MESSAGES  ------")
        print("Publish 10 messages to stream: {}".format(stream_name))
        for i in range(10):
            print(i)
            msg = "Hello from  user--" + "(" + str(i) + ")"
            data = {
                    "payload": base64.b64encode(six.b(msg)).decode("utf-8"),
            }
            try:
                producer.send(json.dumps(data))
                response =  json.loads(producer.recv())
                if response['result'] == 'ok':
                  print('Message published successfully')
                else:
                  print('Failed to publish message:', response)
            except Exception as e:
                m = "Producer failed to send message due to Pulsar Error - %s" % e
                print(m)

        producer.close()
        print("Publish messages done...")

        print("Wait for subscriber to consume all messages...")
        subscriber_thread.join()  # Wait for subscriber to consume all messages.
        print("\n ------- DONE  ------")

  </TabItem>
  <TabItem value="js" label="Javascript">

    const jsc8 = require('jsc8');

    const global_url = "https://gdn.paas.macrometa.io";

    // Crete a authenticated instance with Token / Apikey
    // const client = new jsc8({url: global_url, token: "XXXX", fabricName: '_system'});
    // const client = new jsc8({url: global_url, apiKey: "XXXX", fabricName: '_system'});
    // await console.log("Authentication done!!...");

    // Or use Email & Password to Authenticate client instance
    const client = new jsc8(global_url);

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
    
  </TabItem>
</Tabs>  
