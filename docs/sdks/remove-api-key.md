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

API_ACTIVE = False
CHOSEN_API_KEY_ID = "myNewKey"
API_KEY = "my API key" # Change this to my key
URL = "gdn.paas.macrometa.io"

# Create a connection to GDN. Replace apikey with username and password if needed
client = C8Client(protocol='https', host=URL, port=443, apikey = API_KEY)

                        
# Get a list of all the API key ID's names
apiKeyIds = []
for api in client.list_all_api_keys():
    apiKeyIds.append(api["keyid"])

# Checks if the API key exists
for apiElement in apiKeyIds:
    if apiElement == CHOSEN_API_KEY_ID:
        API_ACTIVE = True
        break

# Checks the specified API key
if API_ACTIVE:
    # Removes the chosen API key
    try:
        print("Remove API key: ", client.remove_api_key(CHOSEN_API_KEY_ID))
    except Exception as err:
        print("Error removing the API key.")
        print(err)
else:
    # Displays a message that the key does not exist
    print("Can't remove a non-existent key.")
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
