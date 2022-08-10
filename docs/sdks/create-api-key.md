---
sidebar_position: 20
title: Create API Key
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
try{
await client.createApiKey(keyid);
}
catch(e){
console.log('API Creation Failed: ', e);
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

# Create an API key
print("Create API Key: ", client.create_api_key('id1'))
```

</TabItem>
<TabItem value="RA" label="Rest API">

```js
# Create an API Key
FEDERATION = "api-gdn.macrometa.io"
FED_URL = "https://{}".format(FEDERATION)
keyid = "id1"
url = FED_URL + "/_api/key"
payload= {
"keyid": keyid
}

resp = session.post(url, data = json.dumps(payload))
resp = json.loads(resp.text)
if resp['error'] is True:
print("ERROR: " , resp)
else:
print("API Key Created: ", resp)
```

</TabItem>
</Tabs>
