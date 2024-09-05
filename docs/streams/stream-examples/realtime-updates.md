---
sidebar_position: 140
title: Perform CRUD Operations in Real-Time
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Prerequisites from '../../_partials/_prerequisites-sdk-api-key.md';
import Steps from '../../_partials/_get-started-steps.md';
import ConnectToGDN from '../../_partials/_connect-to-gdn-code-block.md';

Applications relying on real-time updates for smooth day-to-day operations can benefit from using Macrometa Streams. By enabling streams on your Macrometa collections, businesses get real-time updates on any CRUD operations performed on a collection, ensuring more informed decision-making.  

Let's illustrate this with this tutorial. 

## Objectives

By the end of this tutorial, you would have achieved the following tasks:

- Established a connection to Macrometa GDN
- Created a collection.
- Subscribed to the new collection.
- Added and deleted data from the collection. 

## Prerequisites

<Prerequisites />

## Steps 

Before getting started, do the following:
<Steps />

If you want to skip the individual steps and explanation and run the code, go directly to the [Full Demo File](#full-demo-file).

### Step 1. Connect to GDN

To update a database with Macrometa Global Data Network (GDN), you must first establish a connection to a local region.

<ConnectToGDN />

### Step 2. Set Variables

Define your variables for your task. 

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


### Step 3. Perform CRUD operation

Now we have our variables set, we'll go ahead and perform CRUD operations with it. 

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python SDK">

a. Open a connection to GDN and create a [document collection](../../collections/index.md) called `ddos` and subscribe to it. If a collection by that name already exists, the existing collection is used instead.

```py
if __name__ == '__main__':

    # Open connection to GDN. This routes you to the closest region.
    print(f"\n1. CONNECT: Server: {URL}")
    client = C8Client(protocol='https', host=URL, port=443, apikey=API_KEY, geofabric=GEO_FABRIC)

    # Create a collection if one does not exist and enable streams
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
```

:::note
An existing collection must have streams enabled.
:::

b. Add `data` to the collection, then subscribe to the collection. In this example, we are adding IP addresses to block.

```py
    # Insert documents into the collection to trigger a notification.
    print(f"\n4. INSERT_DOCUMENTS: Server: {URL},  Collection: {COLLECTION_NAME}")
    client.insert_document(COLLECTION_NAME, document=data)

    # Wait to close the callback.
    print("\n5. Waiting to close callback")
    rt_thread.join(2)
```

c. Delete the collection

```py
    # Delete collection.
    print(f"\n6. DELETE_COLLECTION: Server: {URL}, Collection: {COLLECTION_NAME}")
    client.delete_collection(COLLECTION_NAME)
```

</TabItem>

<TabItem value="js" label="JavaScript SDK">

a. Create a collection and subscribe to it.

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
```

b. Insert documents into the collection

```js
  // Insert documents into the collection to trigger a notification.
	async function insertData () {
		console.log(`\n3. Insert data`);
		await client.insertDocumentMany(collectionName, data);
	}
	await sleep(2000);
	await insertData();
```

c. Delete collection

```js
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