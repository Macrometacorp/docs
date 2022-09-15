---
sidebar_position: 40
title: Set Permissions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Set permissions for various assets.

:::note
- Use `rw` to set the access level to `Administrate`.
- Use `ro` to set the access level to `Read Only`.
- Use `none` to set the access level to `No access`.
:::

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");

// Email and password to authenticate client instance
const email = "nemo@nautilus.com";
const password = "xxxxxx";
const fabric = "_system";
const keyid = "id1";
const collectionName = "testCollection";
const streamName = "testStream";

const client = new jsc8({
  url: "https://gdn.paas.macrometa.io",
  fabricName: fabric
});
// Or use one of the following authentication methods.

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
async function main () {
  await client
    .login(email, password)
    .then((e) => console.log("1. User authentication done!"))
    .catch((error) => error);

  console.log("\n2. Listing collections");
  await client
    .getCollections()
    .then((collections) => {
      console.log(collections);
    })
    .catch((error) => messageHandler(error));

  console.log("\n3. Creating collection");
  await client
    .createCollection(collectionName)
    .then((collection) => {
      console.log("Collection created successfully");
    })
    .catch((error) => messageHandler(error));

  console.log("\n4. Setting collection access level access level to read write");
  await client
    .setCollectionAccessLevel(keyid, fabric, collectionName, "rw")
    .then((collectionAccessLevel) => {
      console.log(collectionAccessLevel);
    })
    .catch((error) => messageHandler(error));

  console.log("\n5. Creating stream " + streamName);
  await client
    .createStream(streamName)
    .then((stream) => console.log(stream))
    .catch((error) => messageHandler(error));

  console.log(
    "\n6. Setting stream " + streamName + " access level to read only"
  );
  await client
    .setStreamAccessLevel(keyid, fabric, "c8globals." + streamName, "ro")
    .then((streamAccessLevel) => console.log(streamAccessLevel))
    .catch((error) => messageHandler(error));

  console.log(
    "\n7. Setting database " +
      fabric +
      " access level to read write for Key_ID " +
      keyid
  );
  await client
    .setDatabaseAccessLevel(keyid, fabric, "rw")
    .then((databaseAccessLevel) => console.log(databaseAccessLevel))
    .catch((error) => messageHandler(error));
}

main()
  .then()
  .catch((error) => console.log(error));

```

</TabItem>
<TabItem value="py" label="Python">

```py
from c8 import C8Client

# Create a connection to gdn
client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                        email='nemo@nautilus.com', password='xxxxx',
                        geofabric='_system')

# Set Accesslevels for an API Key

# Create a new collection if it does not exist
if client.has_collection('testCollection'):
    print("Collection exists")
else:
    client.create_collection_kv(name='testCollection')
# Create a new stream
# print(client.create_stream('testStream'))

print("Set Database Access Level: ", client.set_database_access_level('id1', '_system', 'rw'))

print("Set Collection Access Level: ", client.set_collection_access_level('id1', 'testCollection', '_system', 'rw'))

print("Set Stream Access Level: ", client.set_stream_access_level('id1','c8globals.testStream', '_system'))
```

</TabItem>
<TabItem value="RA" label="Rest API">

```js
FEDERATION = "api-gdn.macrometa.io"
FED_URL = "https://{}".format(FEDERATION)
keyid = "id1"
# Set Database Access Level
url = FED_URL + "/_api/key/" + keyid + "/database/_system"
payload={
"grant": "rw"
}
resp = session.put(url,data = json.dumps(payload))
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("Set Database Access Level: ", resp)

# Set Collection Access Level
url = FED_URL + "/_api/key/" + keyid + "/database/_system/collection/testCollection"
payload={
"grant": "rw"
}
resp = session.put(url,data = json.dumps(payload))
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("Set Collection Access Level: ", resp)

# Set Stream Access Level
url = FED_URL + "/_api/key/" + keyid + "/database/_system/stream/c8globals.testStream"
payload={
"grant": "rw"
}
resp = session.put(url,data = json.dumps(payload))
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("Set Stream Access Level: ", resp)
```

</TabItem>
</Tabs>
