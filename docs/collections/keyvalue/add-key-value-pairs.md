---
title: Add Key-Value-Pairs
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to add a key-value pair to a Key-Value Store collection.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to add key-value pairs to an existing key-value store collection using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Data > Collections**.
1. In the collection list, click the name of the key-value collection to which you want to add a key-value pair. If you aren't sure which collections are key-value collections, then you can click **Key-Value** at the top of the page to see just key-value collections.
1. Click **New Pair**.
1. (Optional) Enter information in fields.

   - **_key -** Optional. If left blank, then Macrometa automatically generates a key.
   - **Value -** Enter an individual value.
   - **Expiration -** Required if expiration was enabled when the collection was created.

1. Click **Create**.

   Macrometa creates the new key-value record.

</TabItem>
<TabItem value="py" label="Python SDK">

The code example below shows how to insert key-value pairs into the collection.

```py
  from c8 import C8Client

  key = "<your-api-key>"
  collection_name = "students"

  # Create a connection to GDN
  client = C8Client(protocol='https', host='play.paas.macrometa.io', port=443,
  apikey=key)

  # Insert key-value pairs
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
  print("Key-value pairs inserted")
```

  </TabItem>
  <TabItem value="js" label="JavaScript SDK">

The code example below shows how to insert key-value pairs into the collection.

```js
  // Insert key-value pairs
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
      console.log("Key-value pairs inserted successfully.");
  }
  catch(e){
      console.log("Key-value Pairs not inserted due to " + e);
  }
```

</TabItem>
</Tabs>
