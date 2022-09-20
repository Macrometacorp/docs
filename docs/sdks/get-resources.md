---
sidebar_position: 30
title: Get Resources
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

Get all accessible resources.

```js
const jsc8 = require("jsc8");

// Email and password to authenticate client instance
const email = "nemo@nautilus.com";
const password = "xxxxxx";
const fabric = "_system";
const keyid = "id1";

const client = new jsc8({
  url: "https://gdn.paas.macrometa.io",
  fabricName: fabric
});
// Choose one of the following authentication methods and remove the commenting.

// Create an authenticated instance with a JWT token.
// const clientUsingJwt = new jsc8({url: "https://gdn.paas.macrometa.io" , token: "XXXX" , fabricName: fabric});
// Create an authenticated instance with a API key.
// const clientUsingApiKey = new jsc8({url: "https://gdn.paas.macrometa.io" , apiKey: "XXXX" , fabricName: fabric });
function messageHandler(error) {
  const message = {
    "StatusCode ": error.statusCode,
    "ErrorMessage ": error.message,
    "ErrorNum ": error.errorNum
  };
  console.log(message);
}
async function main() {
  await client
    .login(email, password)
    .then((e) => console.log("1. User authentication done!"))
    .catch((error) => error);

  console.log("\n2. Listing accessible databases for Key_ID = " + keyid);
  await client
    .listAccessibleDatabases(keyid)
    .then((databases) => {
      console.log(databases.result);
    })
    .catch((error) => messageHandler(error));

  console.log("\n3. Listing accessible streams for Key_ID = " + keyid);
  await client
    .listAccessibleStreams(keyid, fabric, (full = false))
    .then((streams) => {
      console.log(streams.result);
    })
    .catch((error) => messageHandler(error));

  console.log("\n4. Listing accessible collections for Key_ID = " + keyid);
  await client
    .listAccessibleCollections(keyid, fabric, (full = false))
    .then((collections) => {
      console.log(collections.result);
    })
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

# Fetch List of accessible databases and streams
print("Accessible Databases: ", client.list_accessible_databases('id1'))

print("Accessible Streams of a db: ", client.list_accessible_streams('id1', '_system'))
```

</TabItem>
<TabItem value="RA" label="Rest API">

```js
# Fetch List of accessible databases and streams
FEDERATION = "api-gdn.macrometa.io"
FED_URL = "https://{}".format(FEDERATION)
keyid = "id1"
url = FED_URL + "/_api/key/" + keyid + "/database/_system/stream"
resp = session.get(url)
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("Accessible Streams: ", resp)

url = FED_URL + "/_api/key/" + keyid + "/database/_system/collection"
resp = session.get(url)
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("Accessible Collections: ", resp)

url = FED_URL + "/_api/key/" + keyid + "/database"
resp = session.get(url)
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("Accessible Databases: ", resp)
```

</TabItem>
</Tabs>
