---
title: Create a Document Store
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to create a new Document Store collection.

Use our interactive API Reference with code generation in 18 programming languages to [create a Document Store Collection](https://macrometa.com/docs/api#/operations/handleCommandPost:CreateCollection). 

### Create a Document Store Collection


<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

```
Follow these instructions to create a new collection using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **COLLECTIONS**.
1. Click **New Collection**.
1. Click **Document Store**.
1. Enter information about the collection and then click **Create**.

   - **Collection Name -** Required. A unique name to distinguish the collection. Spaces are not allowed.
   - **Geo Distribution -** Select whether to store data globally or locally.
   - **Enable Collection stream -** Create a stream for this collection. You can do this now or after the collection is created.
   - **Wait for sync -** Synchronize to disk before completing document creation or update.

```

</TabItem>
<TabItem value="py" label="Python SDK">
```py
  # Simple Approach
  client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                          email='nemo@nautilus.com', password='xxxxx',
                          geofabric='_system')
  client.create_collection(name='employees')
```

</TabItem>
<TabItem value="js" label="Javascript SDK">

```js
  const jsc8 = require("jsc8");

  // Create an authenticated instance with a token or API key.
  // const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
  // const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
  // await console.log("Authentication done!!...");

  // Or use Email and Password to Authenticate client instance
  const client = new jsc8("https://gdn.paas.macrometa.io");

  await client.login("nemo@nautilus.com", "xxxxxx");

  async function createCollection() {
    await console.log("Creating the collection employees under demoFabric...");
    let collectionDetails;
    try{
      collectionDetails = await client.createCollection('employees'); 
      await console.log("The collection details are: ", collectionDetails);
    } catch(e){
      return "Collection creation did not succeed due to " + e;
    }

    return "Collection " + collectionDetails.name + " created successfully";  
  }

  createCollection().then(console.log);
```

</TabItem>
</Tabs>  

