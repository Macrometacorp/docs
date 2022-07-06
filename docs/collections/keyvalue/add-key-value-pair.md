---
title: Add Key-Value-Pairs
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to add a key-value pair to a Key-Value Store collection.

## Add a Key-Value Pair with the Console


## Add Key-Value Pairs from a File


## Insert Key Value Pairs with Code

The code examples below show how to insert key-value pairs into the collection.

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