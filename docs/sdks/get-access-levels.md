---
sidebar_position: 50
title: Get Access Levels
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");

const email = "nemo@nautilus.com";
const password = "xxxxxx";
const fabric = "_system";
const keyid = "id1";
const collectionName = "testCollection";
const streamName = "testStream";

// Email and password to authenticate client instance
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
async function main () {
  await client
    .login(email, password)
    .then((e) => console.log("1. User authentication done!"))
    .catch((error) => error);

  console.log("\n2. Getting collection " + collectionName + " access levels");
  await client
    .getCollectionAccessLevel(keyid, fabric, collectionName)
    .then((collectionAccessLevel) => console.log(collectionAccessLevel))
    .catch((error) => messageHandler(error));

  console.log("\n3. Getting stream " + streamName + " access levels");
  await client
    .getStreamAccessLevel(keyid, fabric, "c8globals." + streamName)
    .then((streamAccessLevel) => console.log(streamAccessLevel))
    .catch((error) => messageHandler(error));

  console.log("\n4. Getting database " + fabric + " access levels");
  await client
    .getDatabaseAccessLevel(keyid, fabric)
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

# Create a connection to GDN
client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                        email='nemo@nautilus.com', password='xxxxx',
                        geofabric='_system')

# Get Access Level
print("Get DB Access Level", client.get_database_access_level('id1','_system'))

print("Get Coll Access Level: ", client.get_collection_access_level('id1','testCollection', '_system'))

print("Get Stream Access Level: ", client.get_stream_access_level('id1','c8globals.testStream', '_system'))
```

</TabItem>
<TabItem value="RA" label="Rest API">

```js
FEDERATION = "api-gdn.macrometa.io"
FED_URL = "https://{}".format(FEDERATION)
keyid = "id1"
# Get Database Acces Level
url = FED_URL + "/_api/key/" + keyid + "/database/_system"
resp = session.get(url)
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("Get Database Access Level: ", resp)

# Get Stream Access Level
url = FED_URL + "/_api/key/" + keyid + "/database/_system/stream/c8globals.testStream"
resp = session.get(url)
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("Get Stream Access Level: ", resp)

# Get Collection Access Level
url = FED_URL + "/_api/key/" + keyid + "/database/_system/collection/testCollection"
resp = session.get(url)
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("Get Collection Access Level: ", resp)
```

</TabItem>
</Tabs>
