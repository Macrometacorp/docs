---
title: Create a Document Store
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to create a new Document Store collection.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to create a new collection using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
2. Click **COLLECTIONS**.
3. Click **New Collection**.
4. Click **Document Store**.
5. Enter information about the collection and then click **Create**.

   - **Collection Name -** Required. A unique name to distinguish the collection. Spaces are not allowed.
   - **Geo Distribution -** Select whether to store data globally or locally.
   - **Enable Collection stream -** Create a stream for this collection. You can do this now or after the collection is created.
   - **Wait for sync -** Synchronize to disk before completing document creation or update.


Use our interactive API Reference with code generation in 18 programming languages to [create a Document Store Collection](/api#/operations/handleCommandPost:CreateCollection). 

</TabItem>
<TabItem value="py" label="Python SDK">

The below example shows the steps for connecting a fabric and then creating a collection called `employees`.

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

// Email and password to authenticate client instance
const email = "nemo@nautilus.com";
const password = "xxxxxx";
const fabric = "_system";
const collectionName = "employees";
const client = new jsc8({
  url: "https://gdn.paas.macrometa.io",
  fabricName: fabric
});

// Or use one of the following authentication methods and remove the commenting.
// Create an authenticated instance with a JWT token.
// const clientUsingJwt = new jsc8({url: "https://gdn.paas.macrometa.io" , token: "XXXX" , fabricName: fabric});
// Create an authenticated instance with an API key.
// const clientUsingApiKey = new jsc8({url: "https://gdn.paas.macrometa.io" , apiKey: "XXXX" , fabricName: fabric });

function messageHandler (error) {
  const message = {
    "StatusCode ": error.statusCode,
    "ErrorMessage ": error.message,
    "ErrorNum ": error.errorNum
  };
  console.log(message);
}

async function createCollection () {
  await client
    .login(email, password)
    .then((e) => console.log("1. User authentication done!"))
    .catch((error) => error);

  console.log("2. Creating collection employees in " + fabric + " fabric");
  await client
    .createCollection(collectionName, {
      stream: true,
      waitForSync: false,
      isLocal: false
    })
    .then((collectionDetails) => {
      console.log(
        "Collection " + collectionDetails.name + " created successfully"
      );
      console.log(collectionDetails);
    })
    .catch((error) => messageHandler(error));
}

createCollection()
  .then()
  .catch((error) => console.log(error));
```

</TabItem>
<TabItem value="apo" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [create a Document Store Collection](https://macrometa.com/docs/api#/operations/handleCommandPost:CreateCollection). 

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl collection](../../cli/collections-cli.md) CLI command to create a Document Store collection.

</TabItem>
</Tabs>  
