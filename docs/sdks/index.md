---
sidebar_position: 1
title: SDKs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section demonstrates some of the tasks that you can complete with Macrometa SDKs. Macrometa offers the following SDKs:

- [Javascript](https://github.com/Macrometacorp/jsC8)
- [Python](https://github.com/Macrometacorp/pyC8)

Read through the complete example below to see how to perform tasks with SDKs or with APIs using Python or JavaScript calls.

## Pre-requisites

- You must have a Macrometa account with admin privileges
- [Install the SDK](install-sdks.md) that corresponds to the programming language you want to use.

## SDK Example

Assume your tenant name is `nemo@nautilus.com` and user password is `xxxxx`.

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");

// Email and password to authenticate client instance
const email = "nemo@nautilus.com";
const password = "xxxxxx";
const fabric = "_system";
const collectionName = "testCollection";
const streamName = "testStream";
// API key ID
const keyid = "id1";

const client = new jsc8({
  url: "https://play.paas.macrometa.io",
  fabricName: fabric
});

// Or create an authenticated instance with a token or API key.
// const client = new jsc8({url: "https://play.paas.macrometa.io", token: "XXXX", fabricName: fabric});
// const client = new jsc8({url: "https://play.paas.macrometa.io", apiKey: "XXXX", fabricName: fabric});
// console.log("Authentication done!");

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
    .then((e) => console.log("User authentication done!"))
    .catch((error) => error);
  console.log("1. Creating API key with KeyID = " + keyid);
  await client
    .createApiKey(keyid)
    .then((apiKey) => console.log(apiKey))
    .catch((error) => messageHandler(error));

  console.log("\n2. Getting available API keys");
  await client
    .getAvailableApiKeys()
    .then((apiKeys) => console.log(apiKeys.result))
    .catch((error) => messageHandler(error));

  console.log("\n3. Listing accessible databases for Key_ID = " + keyid);
  await client
    .listAccessibleDatabases(keyid)
    .then((databases) => {
      console.log(databases.result);
    })
    .catch((error) => messageHandler(error));

  console.log("\n4. Listing accessible streams for Key_ID = " + keyid);
  await client
    .listAccessibleStreams(keyid, fabric, (full = false))
    .then((streams) => {
      console.log(streams.result);
    })
    .catch((error) => messageHandler(error));

  console.log("\n5. Listing collections");
  await client
    .getCollections()
    .then((collections) => {
      console.log(collections);
    })
    .catch((error) => messageHandler(error));

  console.log("\n6. Creating collection");
  await client
    .createCollection(collectionName)
    .then((collection) => {
      console.log("Collection created successfully");
    })
    .catch((error) => messageHandler(error));

  console.log("\n7. Setting collection access level");
  await client
    .setCollectionAccessLevel(keyid, fabric, collectionName, "rw")
    .then((collectionAccessLevel) => {
      console.log(collectionAccessLevel);
    })
    .catch((error) => messageHandler(error));

  console.log("\n8. Creating stream " + streamName);
  await client
    .createStream(streamName)
    .then((stream) => console.log(stream))
    .catch((error) => messageHandler(error));

  console.log(
    "\n9. Setting stream " + streamName + " access level to read only"
  );
  await client
    .setStreamAccessLevel(keyid, fabric, "c8globals." + streamName, "ro")
    .then((streamAccessLevel) => console.log(streamAccessLevel))
    .catch((error) => messageHandler(error));

  console.log(
    "\n10. Setting database " + fabric + " access level to read write for Key_ID " +
      keyid
  );
  await client
    .setDatabaseAccessLevel(keyid, fabric, "rw")
    .then((databaseAccessLevel) => console.log(databaseAccessLevel))
    .catch((error) => messageHandler(error));

  console.log("\n11. Getting collection" + collectionName + " access levels");
  await client
    .getCollectionAccessLevel(keyid, fabric, collectionName)
    .then((collectionAccessLevel) => console.log(collectionAccessLevel))
    .catch((error) => messageHandler(error));

  console.log("\n12. Getting stream" + streamName + " access levels");
  await client
    .getStreamAccessLevel(keyid, fabric, "c8globals." + streamName)
    .then((streamAccessLevel) => console.log(streamAccessLevel))
    .catch((error) => messageHandler(error));

  console.log("\n13. Getting database " + fabric + " access levels");
  await client
    .getDatabaseAccessLevel(keyid, fabric)
    .then((databaseAccessLevel) => console.log(databaseAccessLevel))
    .catch((error) => messageHandler(error));

  console.log("\n14. Deleting database access level for Key_ID = " + keyid);
  await client
    .clearDatabaseAccessLevel(keyid, fabric)
    .then((databaseAccessLevel) => console.log(databaseAccessLevel))
    .catch((error) => messageHandler(error));

  console.log("\n15. Deleting stream access level for Key_ID = " + keyid);
  await client
    .clearStreamAccessLevel(keyid, fabric, "c8globals." + streamName)
    .then((streamAccessLevel) => console.log(streamAccessLevel))
    .catch((error) => messageHandler(error));

  console.log("\n16. Deleting collection access level for Key_ID = " + keyid);
  await client
    .clearCollectionAccessLevel(keyid, fabric, collectionName)
    .then((collectionAccessLevel) => console.log(collectionAccessLevel))
    .catch((error) => messageHandler(error));

  console.log("\n17. Deleting " + keyid);
  await client
    .removeApiKey(keyid)
    .then((removeApiKey) => console.log(removeApiKey))
    .catch((error) => messageHandler(error));

  console.log("\n18. Deleting stream " + streamName);
  await client
    .deleteStream("c8globals." + streamName)
    .then((stream) => console.log(stream))
    .catch((error) => messageHandler(error));
  
  console.log("\n19. Deleting collection " + collectionName);
  await client
    .deleteCollection(collectionName)
    .then((collection) => console.log(collection))
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
client = C8Client(protocol='https', host='play.paas.macrometa.io', port=443,
                        email='nemo@nautilus.com', password='xxxxx',
                        geofabric='_system')

# API key ID
keyid = "id1"

# Create an API key
print("Create API Key: ", client.create_api_key(keyid))

# Fetch List of accessible databases and streams
print("Accessible Databases: ", client.list_accessible_databases(keyid))

print("Accessible Streams of a db: ", client.list_accessible_streams(keyid, '_system'))

# Set access levels for an API key

# Create a new collection if it does not exist
if client.has_collection('testCollection'):
    print("Collection exists")
else:
    client.create_collection_kv(name='testCollection')
# Create a new stream
# print(client.create_stream('testStream'))

print("Set DB Access Level: ", client.set_database_access_level(keyid, '_system', 'rw'))

print("Set Coll Access Level: ", client.set_collection_access_level(keyid, 'testCollection', '_system', 'rw'))

print("Set Stream Access Level: ", client.set_stream_access_level(keyid,'c8globals.testStream', '_system'))

# Get AccessLevel
print("Get DB Access Level", client.get_database_access_level(keyid,'_system'))

print("Get Coll Access Level: ", client.get_collection_access_level(keyid,'testCollection', '_system'))

print("Get Stream Access Level: ", client.get_stream_access_level(keyid,'c8globals.testStream', '_system'))

# Clear Access Level
print("Clear DB Access Level: ", client.clear_database_access_level(keyid,'_system'))

print("Clear Coll Access Level: ", client.clear_collection_access_level(keyid,'testCollection', '_system'))

print("Clear Stream Access Level: ", client.clear_stream_access_level(keyid,'c8globals.testStream', '_system'))

# Remove api key
remove = client.remove_api_key(keyid)

print(remove)
```

</TabItem>
<TabItem value="RA p" label="Rest API (python)">

```py
import requests
import json

# Constants

URL = "api-gdn.macrometa.io"
HTTP_URL = "https://{}".format(URL)
EMAIL = "nemo@nautilus.com"
PASSWORD = "xxxxxx"
AUTH_TOKEN = "bearer "

# Create a HTTPS Session

url = "{}/_open/auth".format(HTTP_URL)
payload = {
    'email':EMAIL,
    'password':PASSWORD
    }
headers = {
    'content-type': 'application/json'
    }

response = requests.post(url, data = json.dumps(payload), headers = headers)

if response.status_code == 200:
    resp_body = json.loads(response.text)
    AUTH_TOKEN += resp_body["jwt"]
    TENANT = resp_body["tenant"]
else:
    raise Exception("Error while getting auth token. Code:{}, Reason:{}".format(response.status_code,response.reason))


session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": AUTH_TOKEN})

# Create an API Key
keyid = "id1"
url = HTTP_URL + "/_api/key"
payload= {
"keyid": keyid
}

resp = session.post(url, data = json.dumps(payload))
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("API Key Created: ", resp)
        
# Fetch List of accessible databases and streams
url = HTTP_URL + "/_api/key/" + keyid + "/database/_system/stream"
resp = session.get(url)
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("Accessible Streams: ", resp)

url = HTTP_URL + "/_api/key/" + keyid + "/database/_system/collection"
resp = session.get(url)
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("Accessible Collections: ", resp)

url = HTTP_URL + "/_api/key/" + keyid + "/database"
resp = session.get(url)
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("Accessible Databases: ", resp)

# Set Database Access Level
url = HTTP_URL + "/_api/key/" + keyid + "/database/_system"
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
url = HTTP_URL + "/_api/key/" + keyid + "/database/_system/collection/testCollection"
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
url = HTTP_URL + "/_api/key/" + keyid + "/database/_system/stream/c8globals.testStream"
payload={
"grant": "rw"
}
resp = session.put(url,data = json.dumps(payload))
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("Set Stream Access Level: ", resp)

# Get Database Acces Level
url = HTTP_URL + "/_api/key/" + keyid + "/database/_system"
resp = session.get(url)
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("Get Database Access Level: ", resp)

# Get Stream Access Level
url = HTTP_URL + "/_api/key/" + keyid + "/database/_system/stream/c8globals.testStream"
resp = session.get(url)
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("Get Stream Access Level: ", resp)

# Get Collection Access Level
url = HTTP_URL + "/_api/key/" + keyid + "/database/_system/collection/testCollection"
resp = session.get(url)
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("Get Collection Access Level: ", resp)

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

# Delete an API Key
url = HTTP_URL + "/_api/key/"+ keyid
resp = session.delete(url, data = json.dumps(payload))
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("API Key Deleted: ", resp)
```

</TabItem>
<TabItem value="RA js" label="Rest API (javascript)">

```js
class APIRequest {
_headers = {
Accept: "application/json",
"Content-Type": "application/json",
};

constructor(url) {
this._url = url;
}

login(email, password) {
const endpoint = "/_open/auth";

const self = this;

return new Promise(function (resolve, reject) {
self
.req(endpoint, {
body: { email, password },
method: "POST",
})
.then(({ jwt, ...data }) => {
self._headers.authorization = bearer `${jwt}`;
resolve(data);
})
.catch(reject);
});
}

_handleResponse(response, resolve, reject) {
if (response.ok) {
resolve(response.json());
} else {
reject(response);
}
}

req(endpoint, { body, ...options } = {}) {
const self = this;
return new Promise(function (resolve, reject) {
fetch(self._url + endpoint, {
headers: self._headers,
body: body ? JSON.stringify(body) : undefined,
...options,
}).then((response) => self._handleResponse(response, resolve, reject));
});
}
}
const EMAIL = "nemo@nautilus.com";
const PASSWORD = "xxxxxx";
const HTTP_URL = "https://api-gdn.prod.macrometa.io";

const COLLECTION_NAME = "testCollection";
const STREAM_NAME = "testStream"
const KEY_ID = "id1"
const run = async function () {
try {
const connection = new APIRequest(HTTP_URL);

/* -------------------- Login (nemo@nautilus.com/xxxxxx) -------------------- */

await connection.login(EMAIL, PASSWORD);

console.log("Login Successfully using", EMAIL);

/* -------------------------- Create an API Key ------------------------- */

const apiKey = await connection.req(
`/_fabric/_system/_api/key`,
{
method: "POST",
body: {
    "keyid": KEY_ID
}
}
);

console.log("API KEY CREATED SUCCESSFULLY", apiKey);

/* ---------------------------- Get List of Accessible Databases and Streams ---------------------------- */

const accessibleStreams = await connection.req(
`/_fabric/_system/_api/key/${KEY_ID}/database/_system/stream`,
{
method: "GET",
}
);

console.log("ACCESSIBLE STREAMS", accessibleStreams);

const accessibleCollections = await connection.req(
`/_fabric/_system/_api/key/${KEY_ID}/database/_system/collection`,
{
method: "GET",
}
);

console.log("ACCESSIBLE COLLECTIONS", accessibleCollections);

const accessibleDatabases = await connection.req(
`/_fabric/_system/_api/key/${KEY_ID}/database`,
{
method: "GET",
}
);

console.log("ACCESSIBLE DATABASES", accessibleDatabases);
    

/* ----------------------------- Set Access Level ----------------------------- */
const setDatabaseAccessLevel = await connection.req(
`/_fabric/_system/_api/key/${KEY_ID}/database/_system`,
{
method: "PUT",
body:{
    "grant": "rw"
}
}
);
console.log("SET DATABASE ACCESS LEVEL", setDatabaseAccessLevel);


const setCollectionAccessLevel = await connection.req(
`/_fabric/_system/_api/key/${KEY_ID}/database/_system/collection/${COLLECTION_NAME}`,
{
method: "PUT",
body:{
    "grant": "rw"
}
}
);
    
console.log("SET COLLECTION ACCESS LEVEL", setCollectionAccessLevel);

const setStreamAccessLevel = await connection.req(
`/_fabric/_system/_api/key/${KEY_ID}/database/_system/stream/c8globals.${STREAM_NAME}`,
{
method: "PUT",
body:{
    "grant": "rw"
}
}
);
    
console.log("SET STREAM ACCESS LEVEL", setStreamAccessLevel);

    
/* ---------------------------- Get Access Level ---------------------------- */

const getStreamAccessLevel = await connection.req(
`/_fabric/_system/_api/key/${KEY_ID}/database/_system/stream/c8globals.${STREAM_NAME}`,
{
method: "GET",
}
);
    
console.log("GET STREAM ACCESS LEVEL", getStreamAccessLevel);

const getCollectionAccessLevel = await connection.req(
`/_fabric/_system/_api/key/${KEY_ID}/database/_system/collection/${COLLECTION_NAME}`,
{
method: "GET",
}
);
    
console.log("GET COLLECTION ACCESS LEVEL", getCollectionAccessLevel);

const getDatabaseAccessLevel = await connection.req(
`/_fabric/_system/_api/key/${KEY_ID}/database/_system`,
{
method: "GET",
}
);
console.log("SET DATABASE ACCESS LEVEL", getDatabaseAccessLevel);



/* -----------------------------Clear Access Level ----------------------------- */

const clearDatabaseAccessLevel = await connection.req(
`/_fabric/_system/_api/key/${KEY_ID}/database/_system`,
{
method: "DELETE",
}
);
console.log("CLEAR DATABASE ACCESS LEVEL", clearDatabaseAccessLevel);

const clearCollectionAccessLevel = await connection.req(
`/_fabric/_system/_api/key/${KEY_ID}/database/_system/collection/${COLLECTION_NAME}`,
{
method: "DELETE",
}
);
        
console.log("CLEAR COLLECTION ACCESS LEVEL", clearCollectionAccessLevel);

const clearStreamAccessLevel = await connection.req(
`/_fabric/_system/_api/key/${KEY_ID}/database/_system/stream/c8globals.${STREAM_NAME}`,
{
method: "DELETE",
}
);
    
console.log("CLEAR STREAM ACCESS LEVEL", clearStreamAccessLevel);
/* --------------------------- Delete API Key ---------------------------- */

const removeApiKey = await connection.req(
`/_fabric/_system/_api/key/${KEY_ID}`,
{
method: "DELETE",
}
);
    
console.log("CLEAR STREAM ACCESS LEVEL", removeApiKey);

    
} catch (e) {
console.error(e);
}
};

run();
```

</TabItem>
</Tabs>
