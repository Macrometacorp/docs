---
sidebar_position: 60
title: Clear Access Levels
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
// Clear Access Level
try{
    await client.clearDatabaseAccessLevel(keyid, '_system')
}
catch(e){
    console.log("Clearing Access Level for Database Failed: ",e)
}
try{
    await client.clearStreamAccessLevel(keyid, '_system', "c8globals."+streamName)

}
catch(e){
    console.log("Clearing Access Level for Stream Failed: ",e)
}
try{
    await client.clearCollectionAccessLevel(keyid, '_system', collectionName)
}
catch(e){
    console.log("Clearing Access Level for Collection Failed: ",e)
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

# Clear Access Level
print("Clear DB Access Level: ", client.clear_database_access_level('id1','_system'))

print("Clear Coll Access Level: ", client.clear_collection_access_level('id1','testCollection', '_system'))

print("Clear Stream Access Level: ", client.clear_stream_access_level('id1','c8globals.testStream', '_system'))
```

</TabItem>
<TabItem value="RA" label="Rest API">

```js
FEDERATION = "api-gdn.macrometa.io"
FED_URL = "https://{}".format(FEDERATION)
keyid = "id1"
# Clear Database Access Level
url = FED_URL + "/_api/key/" + keyid + "/database/_system"
resp = session.delete(url)
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("Clear Database Access Level: ", resp)

# Clear Collection Access Level
url = FED_URL + "/_api/key/" + keyid + "/database/_system/collection/testCollection"
resp = session.delete(url)
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("Clear Collection Access Level: ", resp)

# Clear Stream Access Level
url = FED_URL + "/_api/key/" + keyid + "/database/_system/stream/c8globals.testStream"
resp = session.delete(url)
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("Clear Stream Access Level: ", resp)
```

</TabItem>
</Tabs>
