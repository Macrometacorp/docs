---
title: Create a Key-Value Store
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to create a new Key-Value Store collection.

## Create a Key-Value Store Collection with the Console

Follow these instructions to create a new collection using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **Collections**.
1. Click **New Collection**.
1. Click **Key-Value Store**.
1. Enter information about the collection and then click **Create**.

   - **Name -** Required. A unique name to distinguish the collection. Spaces are not allowed.
   - **Expiration -** Enable expiration. This allows key-value documents to be removed at a certain date and time.
   - **Enable Collection stream -** Create a stream for this collection. You can do this now or after the collection is created.
   - **Wait for sync -** Synchronize to disk before completing record creation or update.

## Create Key-Value Store Collection with Code

This code example shows how to create a collection for saving the key-value pairs.

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