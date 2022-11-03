---
sidebar_position: 90
title: Clear Access Levels
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

async function main () {
  await client
    .login(email, password)
    .then((e) => console.log("1. User authentication done!"))
    .catch((error) => error);

  console.log("\n2. Deleting database access level for Key_ID = " + keyid);
  await client
    .clearDatabaseAccessLevel(keyid, fabric)
    .then((databaseAccessLevel) => console.log(databaseAccessLevel))
    .catch((error) => messageHandler(error));

  console.log("\n3. Deleting stream access level for Key_ID = " + keyid);
  await client
    .clearStreamAccessLevel(keyid, fabric, "c8globals." + streamName)
    .then((streamAccessLevel) => console.log(streamAccessLevel))
    .catch((error) => messageHandler(error));

  console.log("\n4. Deleting collection access level for Key_ID = " + keyid);
  await client
    .clearCollectionAccessLevel(keyid, fabric, collectionName)
    .then((collectionAccessLevel) => console.log(collectionAccessLevel))
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

# Create a connection to GDN
client = C8Client(protocol='https', host='play.paas.macrometa.io', port=443,
                        email='nemo@nautilus.com', password='xxxxx',
                        geofabric='_system')

# Clear Access Level
print("Clear DB Access Level: ", client.clear_database_access_level('id1','_system'))

print("Clear Coll Access Level: ", client.clear_collection_access_level('id1','testCollection', '_system'))

print("Clear Stream Access Level: ", client.clear_stream_access_level('id1','c8globals.testStream', '_system'))
```

</TabItem>
<TabItem value="RA" label="Rest API">

```js
URL = "api-gdn.macrometa.io"
HTTP_URL = "https://{}".format(URL)
keyid = "id1"
# Clear Database Access Level
url = HTTP_URL + "/_api/key/" + keyid + "/database/_system"
resp = session.delete(url)
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("Clear Database Access Level: ", resp)

# Clear Collection Access Level
url = HTTP_URL + "/_api/key/" + keyid + "/database/_system/collection/testCollection"
resp = session.delete(url)
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("Clear Collection Access Level: ", resp)

# Clear Stream Access Level
url = HTTP_URL + "/_api/key/" + keyid + "/database/_system/stream/c8globals.testStream"
resp = session.delete(url)
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("Clear Stream Access Level: ", resp)
```

</TabItem>
</Tabs>
