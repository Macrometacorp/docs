---
title: Create a Redis Mode Collection
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to create a new Document Store collection.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to create a new collection using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Collections**.
3. Click **New Collection**.
4. Click **Redis Mode**.
5. Enter a **Collection Name** then click **Create**.

</TabItem>
<TabItem value="py" label="Python SDK">

The below example shows the steps for connecting a fabric and then creating a collection called `employees`.

```py
  # Simple Approach
  client = C8Client(protocol='https', host='play.paas.macrometa.io', port=443,
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
  url: "https://play.paas.macrometa.io",
  fabricName: fabric
});

// Or use one of the following authentication methods and remove the commenting.
// Create an authenticated instance with a JWT token.
// const clientUsingJwt = new jsc8({url: "https://play.paas.macrometa.io" , token: "XXXX" , fabricName: fabric});
// Create an authenticated instance with an API key.
// const clientUsingApiKey = new jsc8({url: "https://play.paas.macrometa.io" , apiKey: "XXXX" , fabricName: fabric });

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

Use our interactive API Reference with code generation in 18 programming languages to [create a Document Store Collection](https://www.macrometa.com/docs/api#/operations/handleCommandPost:CreateCollection). 

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl collection](../../cli/collections-cli) CLI command to create a Document Store collection.

</TabItem>
</Tabs>  
