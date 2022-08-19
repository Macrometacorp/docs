---
sidebar_position: 70
title: Remove API Key
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Remove an API Key

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
// Remove an api key
try{
    await client.removeApiKey(keyid);
}
catch(e){
    console.log('API Deletion Failed: ', e);   
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

# Remove api key
remove = client.remove_api_key('id1')

print(remove)
```

</TabItem>
<TabItem value="RA" label="Rest API">

```js
FEDERATION = "api-gdn.macrometa.io"
FED_URL = "https://{}".format(FEDERATION)
keyid = "id1"
# Delete an API Key
url = FED_URL + "/_api/key/"+ keyid
resp = session.delete(url, data = json.dumps(payload))
resp = json.loads(resp.text)
if resp['error'] is True:
    print("ERROR: " , resp)
else:
    print("API Key Deleted: ", resp)
```

</TabItem>
</Tabs>
