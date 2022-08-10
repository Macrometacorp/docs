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
// Set Access Level for an API Key
// Create Colleciton
var coll = await client.getCollections();
var collectionName = 'testCollection'
var streamName = 'testStream'
console.log("Existing Collections: ", coll.result)
try{
    await client.createCollection(collectionName);
    console.log("Collection Created Successfully")
}
catch(e){
    console.log("Collection creation did not succeed due to " + e)
}
try{
    await client.setCollectionAccessLevel(keyid, '_system', collectionName, 'rw')
}
catch(e){
    console.log("Failed to set Collection Access Level: ",e)
}
// Create stream
try{
    await client.createStream(streamName)
}
catch(e){
    console.log("Stream Creation Failed: ",e)
}
try{
    await client.setStreamAccessLevel(keyid, '_system', "c8globals."+streamName, 'ro')
}
catch(e){
    console.log("Failed to set Stream Access Level: ",e)
}
try{
    await client.setDatabaseAccessLevel(keyid, '_system', 'rw')
}
catch(e){
    console.log("Failed to set Database Access Level: ",e)
}
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