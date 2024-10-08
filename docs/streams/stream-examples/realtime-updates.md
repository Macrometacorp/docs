---
sidebar_position: 140
title: Real-Time DB Updates Example
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Prerequisites from '../../_partials/_prerequisites-sdk-api-key.md';
import Steps from '../../_partials/_get-started-steps.md';
import ConnectToGDN from '../../_partials/_connect-to-gdn-code-block.md';

This tutorial demonstrates how to use Macrometa GDN as a real-time database with local latencies across the globe.

## Prerequisites

<Prerequisites />

## Step-by-Step Instructions

This page guides you through creating a collection, subscribing to the collection, and automatically adding and deleting data to the collection.

<Steps />

If you want to skip the explanation and just run the code, then go directly to the [Full Demo File](#full-demo-file).

### Step 1. Connect to GDN

To update a database with Macrometa Global Data Network (GDN), you must first establish a connection to a local region.

<ConnectToGDN />

### Step 2. Set Variables

Set the variables required to run the code.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python SDK">

```py
import threading
import pprint
import time
COLLECTION_NAME = "ddos"

# Variables
data = [
    {"ip": "10.1.1.1", "action": "block", "rule": "blocklistA"},
    {"ip": "20.1.1.2", "action": "block", "rule": "blocklistA"},
    {"ip": "30.1.1.3", "action": "block", "rule": "blocklistB"},
    {"ip": "40.1.1.4", "action": "block", "rule": "blocklistA"},
    {"ip": "50.1.1.5", "action": "block", "rule": "blocklistB"},
]

pp = pprint.PrettyPrinter(indent=4)
```

</TabItem>

<TabItem value="js" label="JavaScript SDK">

```js
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
```

</TabItem>

</Tabs>


### Step 3. Add Code

Add code to perform the following actions:

1. Create a [document collection](../../database/collections/index.md) called `ddos` to which you subscribe. If a collection by that name already exists, the existing collection is used instead.
1. Add `data` to the collection, then subscribe to the collection. In this example, we are adding IP addresses to block.
1. Delete the collection.

:::note
An existing collection must have streams enabled.
:::

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python SDK">

```py
if __name__ == '__main__':

    # Open connection to GDN. You will be routed to closest region.
    print(f"\n1. CONNECT: Server: {URL}")
    client = C8Client(protocol='https', host=URL, port=443, apikey=API_KEY, geofabric=GEO_FABRIC)

    # Create a collection if one does not exist
    print(f"\n2. CREATE_COLLECTION: Server: {URL},  Collection: {COLLECTION_NAME}")
    if client.has_collection(COLLECTION_NAME):
        collection = client.collection(COLLECTION_NAME)
    else:
        collection = client.create_collection(COLLECTION_NAME, stream=True)

    # Subscribe to receive real-time updates when changes are made to the collection.
    def create_callback():
        def callback_fn(event):
            pp.pprint(event)
            return

        client.on_change(COLLECTION_NAME, callback=callback_fn, timeout=15)

    print(f"\n3. SUBSCRIBE_COLLECTION: Server: {URL},  Collection: {COLLECTION_NAME}")
    rt_thread = threading.Thread(target=create_callback)
    rt_thread.start()
    time.sleep(10)
    print(f"Callback registered for collection: {COLLECTION_NAME}")

    # Insert documents into the collection to trigger a notification.
    print(f"\n4. INSERT_DOCUMENTS: Server: {URL},  Collection: {COLLECTION_NAME}")
    client.insert_document(COLLECTION_NAME, document=data)

    # Wait to close the callback.
    print("\n5. Waiting to close callback")
    rt_thread.join(2)

    # Delete collection.
    print(f"\n6. DELETE_COLLECTION: Server: {URL}, Collection: {COLLECTION_NAME}")
    client.delete_collection(COLLECTION_NAME)
```

</TabItem>

<TabItem value="js" label="JavaScript SDK">

```js
async function main () {
	async function createCollection () {
		console.log("\n1. Log in.");

    // Create a collection if one does not exist.
		console.log("\n2. Create collection.");
		try {
		  console.log(`Creating the collection ${collectionName}...`);
		  const existsColl = await client.hasCollection(collectionName);
		  if (existsColl === false) {
			await client.createCollection(collectionName, { stream: true });
		  }

      // Subscribe to be notified when changes are made to collection.
		  listener = await client.onCollectionChange(collectionName);
		  listener.on("message", (msg) => {
			const receivedMsg = msg && JSON.parse(msg);
			console.log("message=>", Buffer.from(receivedMsg.payload, "base64").toString("ascii"))
		  });

      // Open connection to GDN. You will be routed to closest region.
		  listener.on("open", () => console.log("Connection open"));
		  listener.on("close", () => console.log("Connection closed"));
		} catch (e) {
		  await console.log("Collection creation did not succeed due to " + e);
		}
	}
	await createCollection();

  // Insert documents into the collection to trigger a notification.
	async function insertData () {
		console.log(`\n3. Insert data`);
		await client.insertDocumentMany(collectionName, data);
	}
	await sleep(2000);
	await insertData();

  // Delete collection.
	async function deleteCollection () {
		console.log("\n4. Delete collection");
		await client.deleteCollection(collectionName);
	}
	await sleep(10000);

	await listener.close();
	await deleteCollection();  
}
main();
```

</TabItem>
</Tabs>


## Full Demo File

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python SDK">

```py
from c8 import C8Client
import threading
import pprint
import time

URL = "play.paas.macrometa.io"
GEO_FABRIC = "_system"
API_KEY = "my API key" # Change this to your API key

COLLECTION_NAME = "ddos"

# Variables
data = [
    {"ip": "10.1.1.1", "action": "block", "rule": "blocklistA"},
    {"ip": "20.1.1.2", "action": "block", "rule": "blocklistA"},
    {"ip": "30.1.1.3", "action": "block", "rule": "blocklistB"},
    {"ip": "40.1.1.4", "action": "block", "rule": "blocklistA"},
    {"ip": "50.1.1.5", "action": "block", "rule": "blocklistB"},
]

pp = pprint.PrettyPrinter(indent=4)

if __name__ == '__main__':

    # Open connection to GDN. You will be routed to closest region.
    print(f"\n1. CONNECT: Server: {URL}")
    client = C8Client(protocol='https', host=URL, port=443, apikey=API_KEY, geofabric=GEO_FABRIC)

    # Create a collection if one does not exist
    print(f"\n2. CREATE_COLLECTION: Server: {URL},  Collection: {COLLECTION_NAME}")
    if client.has_collection(COLLECTION_NAME):
        collection = client.collection(COLLECTION_NAME)
    else:
        collection = client.create_collection(COLLECTION_NAME, stream=True)

    # Subscribe to receive real-time updates when changes are made to the collection.
    def create_callback():
        def callback_fn(event):
            pp.pprint(event)
            return

        client.on_change(COLLECTION_NAME, callback=callback_fn, timeout=15)

    print(f"\n3. SUBSCRIBE_COLLECTION: Server: {URL},  Collection: {COLLECTION_NAME}")
    rt_thread = threading.Thread(target=create_callback)
    rt_thread.start()
    time.sleep(10)
    print(f"Callback registered for collection: {COLLECTION_NAME}")

    # Insert documents into the collection to trigger a notification.
    print(f"\n4. INSERT_DOCUMENTS: Server: {URL},  Collection: {COLLECTION_NAME}")
    client.insert_document(COLLECTION_NAME, document=data)

    # Wait to close the callback.
    print("\n5. Waiting to close callback")
    rt_thread.join(2)

    # Delete collection.
    print(f"\n6. DELETE_COLLECTION: Server: {URL}, Collection: {COLLECTION_NAME}")
    client.delete_collection(COLLECTION_NAME)
```

</TabItem>

<TabItem value="js" label="JavaScript SDK">

```js
const jsc8 = require("jsc8");

const client = new jsc8({url: "https://play.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});

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

async function main () {
	async function createCollection () {
		console.log("\n1. Log in.");

    // Create a collection if one does not exist.
		console.log("\n2. Create collection.");
		try {
		  console.log(`Creating the collection ${collectionName}...`);
		  const existsColl = await client.hasCollection(collectionName);
		  if (existsColl === false) {
			await client.createCollection(collectionName, { stream: true });
		  }

      // Subscribe to be notified when changes are made to collection.
		  listener = await client.onCollectionChange(collectionName);
		  listener.on("message", (msg) => {
			const receivedMsg = msg && JSON.parse(msg);
			console.log("message=>", Buffer.from(receivedMsg.payload, "base64").toString("ascii"))
		  });

      // Open connection to GDN. You will be routed to closest region.
		  listener.on("open", () => console.log("Connection open"));
		  listener.on("close", () => console.log("Connection closed"));
		} catch (e) {
		  await console.log("Collection creation did not succeed due to " + e);
		}
	}
	await createCollection();

  // Insert documents into the collection to trigger a notification.
	async function insertData () {
		console.log(`\n3. Insert data`);
		await client.insertDocumentMany(collectionName, data);
	}
	await sleep(2000);
	await insertData();

  // Delete collection.
	async function deleteCollection () {
		console.log("\n4. Delete collection");
		await client.deleteCollection(collectionName);
	}
	await sleep(10000);

	await listener.close();
	await deleteCollection();  
}
main();
```

</TabItem>
</Tabs>