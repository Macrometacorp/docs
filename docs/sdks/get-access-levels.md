---
sidebar_position: 50
title: Get Access Levels
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
try{
    await client.getCollectionAccessLevel(keyid, '_system', collectionName)
}
catch(e){
    console.log("Failed to Get Access Level for the Collection: ",e)
}
try{
    await client.getStreamAccessLevel(keyid, '_system', "c8globals."+streamName)
}
catch(e){
    console.log("Failed to Get Access Level for the Stream: ",e)
}
try{
    await client.getDatabaseAccessLevel(keyid, '_system')

}
catch(e){
    console.log("Failed to Get Access Level for the Database: ",e)
}
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
