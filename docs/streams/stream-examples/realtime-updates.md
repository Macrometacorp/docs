---
sidebar_position: 140
title: Realtime DB Updates Example
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This tutorial is about using Macrometa GDN as a realtime database with local latencies across the globe.

## Prerequisites

- A Macrometa account with sufficient permissions to create streams.
- An API key. For more information, refer to [Create API Keys](../../account-management/api-keys/create-api-keys).
- Appropriate SDK installed. For more information, refer to [Install SDKs](../../sdks/install-sdks.md).

## Realtime Updates Code

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");

// Constants - DB
const globalUrl = "https://play.paas.macrometa.io/";
const email = "your@email.com";
const password = "password";
const client = new jsc8(globalUrl);

// Variables
const collectionName = "ddos";
let listener;
const data = [
  { ip: "10.1.1.1", action: "block", rule: "blocklistA" },
  { ip: "20.1.1.2", action: "block", rule: "blocklistA" },
  { ip: "30.1.1.3", action: "block", rule: "blocklistB" },
  { ip: "40.1.1.4", action: "block", rule: "blocklistA" },
  { ip: "50.1.1.5", action: "block", rule: "blocklistB" }
];

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

// Create an authenticated instance with a token or API key

// const client = new jsc8({url: globalUrl, token: "XXXX", fabricName: '_system'});
// const client = new jsc8({url: globalUrl, apiKey: "XXXX", fabricName: '_system'});

// Or use email and password to authenticate client instance

async function createCollection () {
  console.log("\n1. Log in.");
  await client.login(email, password);
  console.log("\n2. Create collection.");
  try {
    console.log(`Creating the collection ${collectionName}...`);
    const existsColl = await client.hasCollection(collectionName);
    if (existsColl === false) {
      await client.createCollection(collectionName, { stream: true });
    }
    // Add an onChange listener for collection
    listener = await client.onCollectionChange(collectionName);
    
    // Decode the message printed here in readable format
    listener.on("message", (msg) => {
      const receivedMsg = msg && JSON.parse(msg);
      console.log("message=>", Buffer.from(receivedMsg.payload, "base64").toString("ascii"))
    });
    listener.on("open", () => console.log("Connection open"));
    listener.on("close", () => console.log("Connection closed"));
  } catch (e) {
    await console.log("Collection creation did not succeed due to " + e);
  }
}
async function insertData () {
  console.log(`\n3. Insert data in region ${globalUrl}`);
  await client.insertDocumentMany(collectionName, data);
}
async function deleteData () {
  console.log("\n4. Delete data");
  await client.deleteCollection(collectionName);
}
(async function () {
  await createCollection();
  await sleep(2000);
  await insertData();
  await sleep(10000);
  await listener.close();
  await deleteData();
})();
```

</TabItem>

<TabItem value="py" label="Python">

```py
from c8 import C8Client
import threading
import pprint
import time

# Variables - URLs
GLOBAL_URL = "play.paas.macrometa.io"

# Variables - DB
EMAIL = "your@email.com"
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
    client = C8Client(protocol='https', host=GLOBAL_URL, port=443, apikey="", geofabric=FABRIC)

    # Step 2: Create a collection if one does not exist
    print(f"\n2. CREATE_COLLECTION: region: {GLOBAL_URL},  collection: {COLLECTION_NAME}")
    if client.has_collection(COLLECTION_NAME):
        collection = client.collection(COLLECTION_NAME)
    else:
        collection = client.create_collection(COLLECTION_NAME, stream=True)

    # Subscribe to be notified when changes are made to collection.

    def create_callback():
        def callback_fn(event):
            pp.pprint(event)
            return

        client.on_change(COLLECTION_NAME, callback=callback_fn, timeout=15)

    # Step3: Subscribe to receive documents in realtime (PUSH model)
    print(f"\n3. SUBSCRIBE_COLLECTION: region: {GLOBAL_URL},  collection: {COLLECTION_NAME}")
    rt_thread = threading.Thread(target=create_callback)
    rt_thread.start()
    time.sleep(10)
    print(f"Callback registered for collection: {COLLECTION_NAME}")

    # Step4: Subscribe to receive documents in realtime (PUSH model)
    print(f"\n4. INSERT_DOCUMENTS: region: {GLOBAL_URL},  collection: {COLLECTION_NAME}")
    client.insert_document(COLLECTION_NAME, document=data)

    # Step5: Wait to close the callback.
    print("\n5. Waiting to close callback")
    rt_thread.join(2)

    # Step6: Delete data.
    print(f"\n6. DELETE_DATA: region: {GLOBAL_URL}, collection: {COLLECTION_NAME}")
    collection.truncate()
    client.delete_collection(COLLECTION_NAME)
```

</TabItem>
</Tabs>
