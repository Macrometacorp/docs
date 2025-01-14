---
title: Create a Key-Value Collection
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to create a new Key-Value collection.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to create a new collection using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Data > Collections**.
3. Click **New Collection**.
4. Click **Key-Value**.
5. Enter information about the collection and then click **Create**.

   - **Collection Name -** Required. A unique name to distinguish the collection. Spaces are not allowed.
   - **Collection stream -** Enable streams for all locations for this collection.
   - **Strong consistency -** Enable strong consistency on this collection. For more information, refer to [Strong consistency](../strong-consistency.md).
   - **Group ID -** Enable the **Group ID** field in key-value documents.
   - **Expiration -** Enable expiration. This allows key-value documents to be removed at a certain date and time.
   - **Blob storage -** (If enabled on your account.) Allows you to store blob files in the collection.

</TabItem>
<TabItem value="py" label="Python SDK">

This code example shows how to create a collection for saving key-value pairs.

```py
  from c8 import C8Client

  key = "<your-api-key>"
  collection_name = "students"

  # Create a connection to GDN
  client = C8Client(protocol='https', host='play.paas.macrometa.io', port=443,
  apikey=key)

  # Create a new collection if it does not exist
  if client.has_collection(collection_name):
      print("Collection exists")
  else:
      client.create_collection_kv(name=collection_name)
```

</TabItem>
<TabItem value="js" label="JavaScript SDK">

This code example shows how to create a collection for saving key-value pairs.

```js
  // Add this snippet in main function
  let coll = await client.getKVCollections();
  console.log("Existing collections: ", coll.result);
  try{
      await client.createKVCollection(collectionName);
      console.log("Collection created successfully");
  }
  catch(e){
      console.log("Collection creation did not succeed due to " + e);
  }
```

</TabItem>
</Tabs>
