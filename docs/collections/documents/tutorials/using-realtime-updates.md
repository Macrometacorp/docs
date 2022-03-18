---
sidebar_position: 4
title: Realtime Updates
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Realtime Updates

This tutorial is about using Macrometa GDN as a realtime database with local latencies across the globe.

## Pre-requisite

Let's assume your

* Tenant name is `nemo@nautilus.com` and
* User password is `xxxxxx`.

## Driver download

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    pyC8 requires Python 3.5+. Python 3.6 or higher is recommended

    To install pyC8, simply run

        $ pip3 install pyC8

    or, if you prefer to use conda:

        conda install -c conda-forge pyC8

    or pipenv:

        pipenv install --pre pyC8

    Once the installation process is finished, you can begin developing applications in Python.

  </TabItem>
  <TabItem value="js" label="Javascript">

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
    import threading
    import pprint
    import time

    # Variables - URLs
    global_url = "gdn.paas.macrometa.io"


    # Variables - DB
    email = "nemo@nautilus.com"
    password = "xxxxx"
    geo_fabric = "_system"
    collection_name = "ddos"

    # Variables - Data
    data = [
        {"ip": "10.1.1.1", "action": "block", "rule": "blacklistA"},
        {"ip": "20.1.1.2", "action": "block", "rule": "blacklistA"},
        {"ip": "30.1.1.3", "action": "block", "rule": "blacklistB"},
        {"ip": "40.1.1.4", "action": "block", "rule": "blacklistA"},
        {"ip": "50.1.1.5", "action": "block", "rule": "blacklistB"},
      ]

    pp = pprint.PrettyPrinter(indent=4)

    if __name__ == '__main__':

      # Step1: Open connection to GDN. You will be routed to closest region.
      print("\n1. CONNECT: federation: {},  user: {}".format(global_url, email))
      client = C8Client(protocol='https', host=global_url, port=443,
                        email=email, password=password,
                        geofabric=geo_fabric)      

      # Step2: Create a collection if not exists
      print("\n2. CREATE_COLLECTION: region: {},  collection: {}".format(global_url, collection_name))
      if client.has_collection(collection_name):
          collection = client.collection(collection_name)
      else:
          collection = client.create_collection(collection_name)

      # Subscriber to receive events when changes are made to collection.
      def create_callback():
        def callback_fn(event):
            pp.pprint(event)
            return
        client.on_change(collection_name, callback=callback_fn)

      # Step3: Subscribe to receive documents in realtime (PUSH model)
      print("\n3. SUBSCRIBE_COLLECTION: region: {},  collection: {}".format(global_url, collection_name))
      rt_thread = threading.Thread(target=create_callback)
      rt_thread.start()
      time.sleep(2)
      print("Callback registered for collection: {}".format(collection_name))

      # Step4: Subscribe to receive documents in realtime (PUSH model)
      print("\n4. INSERT_DOCUMENTS: region: {},  collection: {}".format(global_url, collection_name))
      client.insert_document(collection_name, document=data)
      
      # Step5: Wait to close the callback.
      print("\n5. Waiting to close callback")
      rt_thread.join()

      # Step6: Delete data.
      print("\n6. DELETE_DATA: region: {}, collection: {}".format(global_url, collection_name))
      collection.truncate()
      #fabric.delete_collection(collection_name)

  </TabItem>
  <TabItem value="js" label="Javascript">

    'use strict'

    const jsc8 = require('jsc8');

    // Variables - DB
    const global_url = "https://gdn.paas.macrometa.io";

    // Crete a authenticated instance with Token / Apikey
    // const client = new jsc8({url: global_url, token: "XXXX", fabricName: '_system'});
    // const client = new jsc8({url: global_url, apiKey: "XXXX", fabricName: '_system'});
    // await console.log("Authentication done!!...");

    // Or use Email & Password to Authenticate client instance
    const client = new jsc8(global_url);

    await client.login("nemo@nautilus.com", "xxxxxx");

    //Variables
    const collection_name = "ddos";
    let collectionDetails;

    // Variables - Data
    const data = [
      {"ip": "10.1.1.1", "action": "block", "rule": "blacklistA"},
      {"ip": "20.1.1.2", "action": "block", "rule": "blacklistA"},
      {"ip": "30.1.1.3", "action": "block", "rule": "blacklistB"},
      {"ip": "40.1.1.4", "action": "block", "rule": "blacklistA"},
      {"ip": "50.1.1.5", "action": "block", "rule": "blacklistB"},
    ];

    async function createCollection() {
      console.log("\n 2. CREATE_COLLECTION");

      try{
          console.log(`Creating the collection ${collection_name}...`);
          const exists_coll = await client.hasCollection(collection_name);
          if (exists_coll === false) {
              await client.createCollection(collection_name);
          }

          // adding a onChange listner for collection
            const listener = await client.onCollectionChange(collection_name);
            listener.on('message',(msg) => console.log("message=>", msg));
            listener.on('open',() => {
              this.callback_fn(collection);
            });
            listener.on('close',() => console.log("connection closed"));
        }
        catch (e) {
          await console.log("Collection creation did not succeed due to " + e);
        }
    }

    async function insertData() {
      console.log(`\n 3. INSERT_DATA in region ${global_url}`);
      await client.insertDocumentMany(collection_name, data);
    }

    async function deleteData(){
      console.log("\n 4. DELETE_DATA");
      await client.deleteCollection(collection_name);
    }

    (async function(){
      await createCollection();
      await insertData();
      await deleteData();
    })();
  </TabItem>
</Tabs>
