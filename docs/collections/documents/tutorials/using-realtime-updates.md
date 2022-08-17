---
sidebar_position: 4
title: Realtime Updates
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This tutorial is about using Macrometa GDN as a realtime database with local latencies across the globe.

## Pre-requisite

Let's assume your

* Tenant name is `nemo@nautilus.com` and
* User password is `xxxxxx`.

## SDK download

<Tabs groupId="operating-systems">
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
</Tabs>  

## Code Sample

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
import time
import threading
import pprint
from c8 import C8Client

# Variables - URLs
GLOBAL_URL = "gdn.paas.macrometa.io"

# Variables - DB
EMAIL = "nemo@nautilus.com"
PASSWORD = "xxxxx"
FABRIC = "_system"
COLLECTION_NAME = "ddos"

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
    print(f"\n1. CONNECT: federation: {GLOBAL_URL},  user: {EMAIL}")
    client = C8Client(protocol='https', host=GLOBAL_URL, port=443,
                      email=EMAIL, password=PASSWORD, geofabric=FABRIC)

    # Step2: Create a collection if not exists
    print(f"\n2. CREATE_COLLECTION: region: {GLOBAL_URL},  collection: {COLLECTION_NAME}")
    if client.has_collection(COLLECTION_NAME):
        collection = client.collection(COLLECTION_NAME)
    else:
        collection = client.create_collection(COLLECTION_NAME, stream=True)


    # Events are received by subscriber when changes are made to collection
    def create_callback():
        def callback_fn(event):
            pp.pprint(event)

        client.on_change(COLLECTION_NAME, callback=callback_fn, timeout=15)


    # Step3: Subscribe to receive documents in realtime (PUSH model)
    print(f"\n3. SUBSCRIBE_COLLECTION: region: {GLOBAL_URL},  collection: {COLLECTION_NAME}")
    rt_thread = threading.Thread(target=create_callback)
    rt_thread.start()
    time.sleep(2)
    print(f"Callback registered for collection: {COLLECTION_NAME}")

    # Step4: Subscribe to receive documents in realtime (PUSH model)
    print(f"\n4. INSERT_DOCUMENTS: region: {GLOBAL_URL},  collection: {COLLECTION_NAME}")
    client.insert_document(COLLECTION_NAME, document=data)
    
    # Step5: Wait to close the callback.
    print("\n5. Waiting to close callback")
    rt_thread.join(timeout=1)

    print(f"\n6. DELETE_DATA: region: {GLOBAL_URL}, collection: {COLLECTION_NAME}")
    collection.truncate()
    client.delete_collection(COLLECTION_NAME)
```

</TabItem>
<TabItem value="js" label="Javascript">

```js
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
```

</TabItem>
</Tabs>
