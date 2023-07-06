---
title: Create a Key-Value Store
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to create a new Key-Value Store collection.

## Create a Key-Value Store Collection with the Console

Follow these instructions to create a new collection using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Data > Collections**.
1. Click **New Collection**.
1. Click **Key-Value Store**.
1. Enter information about the collection and then click **Create**.

   - **Name -** Required. A unique name to distinguish the collection. Spaces are not allowed.
   - **Expiration -** Enable expiration. This allows key-value documents to be removed at a certain date and time.
   - **Enable Collection stream -** Enable streams for all locations for this collection.
   - **Wait for sync -** Synchronize to disk before completing record creation or update.

## KV Blob Storage

:::note
This feature is available upon request. Contact support@macrometa.com to enable it on your account.
:::

If this feature is enabled on your account, then when you create a new key-value store, you can select the **Blob storage** checkbox. This marks the collection as a blob-based KV collection. These collections can only be used to store blob files, such as images. Once created, this setting cannot be changed.

- Maximum blob file size is 1 MB. This can be changed, but can never exceed 2 MB.
- You can add blob records using the Macrometa API. Adding records in the Macrometa web console is not supported.

## Create Key-Value Store Collection with Code

This code example shows how to create a collection for saving the key-value pairs.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
  from c8 import C8Client

  key = "<your-api-key>"
  collection_name = "students"

  # Create a connection to gdn
  client = C8Client(protocol='https', host='play.paas.macrometa.io', port=443,
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