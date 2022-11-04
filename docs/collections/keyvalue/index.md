---
title: Key-Value Store
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A key-value collection stores data in the form of a dictionary. This requires a key for each record and a corresponding value that contains the data. Each document in the database must have a unique key, similar to the concept of a primary key. Key-value databases are known for being quick and storage efficient resulting in faster CRUD (Create, Read, Update, Delete) operations.

In GDN, each document stored in a collection contains a `_key`, and the rest of the document is its _value_. The only key-value operations available are key lookups (single and batch) and key-value pair insertions and updates. If no sharding attribute is specified, `_key` is used for sharding the data instead.

Key-value collections are always global. You can specify time_to_live (TTL) during creation.

For the following examples, assume these credentials:

- Tenant name: nemo@nautilus.com
- Password: xxxxxx

## SDK download

Download the appropriate SDK for Python or JavaScript.

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

## Connect to GDN

Establish connection to a local region. When this code runs, it initializes the server connection to the region URL you specify. You can create an API key from the GUI or REST API.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
  from c8 import C8Client

  # Simple Way
  print("--- Connecting to C8")
  client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                          email='nemo@nautilus.com', password="xxxxxx",
                          geofabric='_system')

  # Or Using token
  client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
  token="XXXX")

  # Or Using API Key
  client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
  apikey="<your-api-key>")
```

</TabItem>
<TabItem value="js" label="Javascript">

```js
  const jsc8 = require("jsc8");

  // Simple Way
  const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "", fabricName: '_system'});
  // ----- OR -----
  const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "<your-api-key>", fabricName: '_system'});

  // To use advanced options
  const client = new jsc8("https://gdn.paas.macrometa.io"); 
```

</TabItem>
</Tabs>  

## Create Collection

Create a Collection for saving the key-value pairs.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
  from c8 import C8Client

  key = "<your-api-key>"
  collection_name = "students"

  # Create a connection to gdn
  client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
  apikey=key)

  # Create a new collection if it does not exist
  if client.has_collection(collection_name):
      print("Collection exists")
  else:
      client.create_collection_kv(name=collection_name)
```

</TabItem>
<TabItem value="js" label="Javascript">

```js
  // Add this snippet in previously created main function
  let coll = await client.getKVCollections();
  console.log("Existing Collections: ", coll.result);
  try{
      await client.createKVCollection(collectionName);
      console.log("Collection Created Successfully");
  }
  catch(e){
      console.log("Collection creation did not succeed due to " + e);
  }
```

</TabItem>
</Tabs>  

## Insert Key Value Pairs

Insert key-value pairs into the collection.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
  from c8 import C8Client

  key = "<your-api-key>"
  collection_name = "students"

  # Create a connection to gdn
  client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
  apikey=key)
  # Insert Key Value pairs
  data = [
    {
      "_key": "John",
      "value": "Science",
      "expireAt": 0
    },
    {
      "_key": "Alice",
      "value": "Maths",
      "expireAt": 0
    },
    {
      "_key": "Alex",
      "value": "Physics",
      "expireAt": 0
    },
    {
      "_key": "Monika",
      "value": "Chemistry",
      "expireAt": 0
    }
  ]

  client.insert_key_value_pair(collection_name, data)
  print("KV Pairs Inserted")
```

  </TabItem>
  <TabItem value="js" label="Javascript">

```js
  // Insert Key Value pairs
  var data = [
    {
      "_key": "John",
      "value": "Science",
      "expireAt": 0
    },
    {
      "_key": "Alice",
      "value": "Maths",
      "expireAt": 0
    },
    {
      "_key": "Alex",
      "value": "Physics",
      "expireAt": 0
    },
    {
      "_key": "Monika",
      "value": "Chemistry",
      "expireAt": 0
    }
  ]
  try{
      await client.insertKVPairs(collectionName, data);
      console.log("Key Value pairs inserted successfully.");
  }
  catch(e){
      console.log("Key Value Pairs not inserted due to " + e);
  }
```

</TabItem>
</Tabs>  

## Get Value

Get value for a given key.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
  from c8 import C8Client

  key = "<your-api-key>"
  collection_name = "students"

  # Create a connection to gdn
  client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
  apikey=key)
  # Get value for a key
  print("Value for the provided key: ",client.get_value_for_key(collection_name, "Monika"))
```

</TabItem>
<TabItem value="js" label="Javascript">

```js
  const result = await client.getValueForKey(collectionName, 'Monika');
  console.log("Value for provided key: ", result);
```

</TabItem>
</Tabs>  

## Get Key-Value Count

Get key-value count from a given collection.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
  from c8 import C8Client

  key = "<your-api-key>"
  collection_name = "students"

  # Create a connection to gdn
  client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
  apikey=key)

  # Get KV count of a collection
  print("Number of kv pairs in your collection: ",client.get_kv_count(collection_name))
```

</TabItem>
<TabItem value="js" label="Javascript">

```js
  // Get KV count of a collection
  const count = await client.getKVCount(collectionName);
  console.log("Number of kv pairs in your collection: ", count.count);
  ```

</TabItem>
</Tabs>  

## Update Value

Update value for a given key.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
  from c8 import C8Client

  key = "<your-api-key>"
  collection_name = "students"

  # Create a connection to gdn
  client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
  apikey=key)

  # Update value for a key
  data = {
      "_key": "John",
      "value": "Biology",
      "expireAt": 0
  }
  client.insert_key_value_pair(collection_name, data)
  print("Updated the specified KV pair")
```

</TabItem>
<TabItem value="js" label="Javascript">

```js
  //Update value for a key
  data = {
      "_key": "John",
      "value": "Biology",
      "expireAt": 0
  }
  try{
      client.insertKVPairs(collectionName, data)
      console.log("Updated the specified KV pair")
  }
  catch(e){
    console.log("Key Value Pair not updated due to " + e)

  }
```

</TabItem>
</Tabs>  

## Delete Key-Value

Delete key-value pairs from a collection.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
  from c8 import C8Client

  key = "<your-api-key>"
  collection_name = "students"

  # Create a connection to gdn
  client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
  apikey=key)

  # Delete entry for a key
  print("Deleted Entry for the specified Key: ",client.delete_entry_for_key(collection_name, "John"))

  # Delete entry for multiple keys
  print("Deleted Entries for the list of keys: ",client.delete_entry_for_keys(collection_name, ["Monika", "Alex", "Alice"]))
```

</TabItem>
<TabItem value="js" label="Javascript">

```js
  try{
      // Delete entry for a key
      await client.deleteEntryForKey(collectionName, 'John');

      // Delete entries for multiple keys
      await client.deleteEntryForKeys(collectionName, ["Monika", "Alex", "Alice"])
  }
  catch(e){
      console.log("Failed to delete entries due to " + e)

  }
```

</TabItem>
</Tabs>  

## Delete Collection

Delete key-value collection

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
  from c8 import C8Client

  key = "<your-api-key>"
  collection_name = "students"

  # Create a connection to gdn
  client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
  apikey=key)

  # Delete Collection
  print("Collection Deleted: ",client.delete_collection_kv(collection_name))
```

</TabItem>
<TabItem value="js" label="Javascript">

```js
  // Delete Collection
  try{
      await client.deleteKVCollection(collectionName)
      console.log("Collection Deleted")
  }
  catch(e){
      console.log("Failed to delete collection due to " + e)
  }
```

</TabItem>
</Tabs>  

## Complete Example

The following complete examples are a composite of the previous code snippets:

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
  from c8 import C8Client

  key = "<your-api-key>"
  collection_name = "students"

  # Create a connection to gdn
  client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
  apikey=key)

  # client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
  #                          email='nemo@nautilus.com', password="xxxxxx",
  #                          geofabric='_system')

  # OR Using token
  # client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
  #  token="XXXX")


  # Create a new collection if it does not exist
  if client.has_collection(collection_name):
      print("Collection exists")
  else:
      client.create_collection_kv(name=collection_name)

  # Insert Key Value pairs
  data = [
    {
      "_key": "John",
      "value": "Science",
      "expireAt": 0
    },
    {
      "_key": "Alice",
      "value": "Maths",
      "expireAt": 0
    },
    {
      "_key": "Alex",
      "value": "Physics",
      "expireAt": 0
    },
    {
      "_key": "Monika",
      "value": "Chemistry",
      "expireAt": 0
    }
  ]

  client.insert_key_value_pair(collection_name, data)
  print("KV Pairs Inserted")

  # Get value for a key
  print("Value for the provided key: ",client.get_value_for_key(collection_name, "Monika"))

  # Get KV count of a collection
  print("Number of kv pairs in your collection: ",client.get_kv_count(collection_name))

  # Update value for a key
  data = {
      "_key": "John",
      "value": "Biology",
      "expireAt": 0
  }
  client.insert_key_value_pair(collection_name, data)
  print("Updated the specified KV pair")

  # Delete entry for a key
  print("Deleted Entry for the specified Key: ",client.delete_entry_for_key(collection_name, "John"))

  # Delete entry for multiple keys
  print("Deleted Entries for the list of keys: ",client.delete_entry_for_keys(collection_name, ["Monika", "Alex", "Alice"]))

  # Delete Collection
  print("Collection Deleted: ",client.delete_collection_kv(collection_name))
```

</TabItem>
<TabItem value="js" label="Javascript">

```js
  const jsc8 = require("jsc8");

  const key = "<your-api-key>";
  const collectionName = "students";

  // Connect to gdn
  const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: key});

  // Crete a authenticated instance with Token / Apikey
  // const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
  // const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
  // await console.log("Authentication done!!...");

  // Or use Email & Password to Authenticate client instance
  // const client = new jsc8("https://gdn.paas.macrometa.io");

  // await client.login("nemo@nautilus.com", "xxxxx");

  async function main(){
  // Create a Collection  
  let coll = await client.getKVCollections();
  console.log("Existing Collections: ", coll.result);
  try{
      await client.createKVCollection(collectionName);
      console.log("Collection Created Successfully");
  }
  catch(e){
      console.log("Collection creation did not succeed due to " + e);
  }

  // Insert Key Value pairs
  var data = [
    {
      "_key": "John",
      "value": "Science",
      "expireAt": 0
    },
    {
      "_key": "Alice",
      "value": "Maths",
      "expireAt": 0
    },
    {
      "_key": "Alex",
      "value": "Physics",
      "expireAt": 0
    },
    {
      "_key": "Monika",
      "value": "Chemistry",
      "expireAt": 0
    }
  ]
  try{
      await client.insertKVPairs(collectionName, data);
      console.log("Key Value pairs inserted successfully.");
  }
  catch(e){
      console.log("Key Value Pairs not inserted due to " + e);
  }

  // Get value for a key
  const result = await client.getValueForKey(collectionName, 'Monika');
  console.log("Value for provided key: ", result);

  // Get KV count of a collection
  const count = await client.getKVCount(collectionName);
  console.log("Number of kv pairs in your collection: ", count.count);

  //Update value for a key
  data = {
      "_key": "John",
      "value": "Biology",
      "expireAt": 0
  }
  try{
      client.insertKVPairs(collectionName, data);
      console.log("Updated the specified KV pair");
  }
  catch(e){
    console.log("Key Value Pair not updated due to " + e);

  }
  try{
      // Delete entry for a key
      await client.deleteEntryForKey(collectionName, 'John');

      // Delete entries for multiple keys
      await client.deleteEntryForKeys(collectionName, ["Monika", "Alex", "Alice"]);
  }
  catch(e){
      console.log("Failed to delete entries due to " + e);

  }

  // Delete Collection
  try{
      await client.deleteKVCollection(collectionName);
      console.log("Collection Deleted");
  }
  catch(e){
      console.log("Failed to delete collection due to " + e);
  }


  }

  main();
  ```
  
</TabItem>
</Tabs>
