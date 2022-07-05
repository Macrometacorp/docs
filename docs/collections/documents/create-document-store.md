---
sidebar_position: 20
title: Create Document Store
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to create a new Document Store collection.

## Create a Collection with the Console



## Create Collection with Code

The below example shows the steps for connecting a fabric and then creating a collection called `employees`.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
  # Simple Approach
  client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                          email='nemo@nautilus.com', password='xxxxx',
                          geofabric='_system')
  client.create_collection(name='employees')
```

</TabItem>
<TabItem value="js" label="Javascript">

```js
  const jsc8 = require("jsc8");

  // Crete a authenticated instance with Token / Apikey
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