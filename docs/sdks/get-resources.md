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
//Fetch accessible databases
try{
    var databases = await client.listAccessibleDatabases(keyid)
    console.log("Accessible Databases")
    console.log(databases.result)
}
catch(e){
    console.log('Failed to fetch accessible dataases: ', e);

}
// Fetch accessible streams
try{
    streams = await client.listAccessibleStreams(keyid, '_system', full=false)
    console.log("Accessible Streams")
    console.log(streams.result)
}
catch(e){
    console.log('Failed to fetch accessible streams: ', e);

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