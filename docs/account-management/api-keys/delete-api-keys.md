---
sidebar_position: 40
title: Delete API Keys
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page describes how to delete API keys.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

1. Log in to your [Macrometa account](https://auth-play.macrometa.io/).
1. Click **Access > API Keys**.
1. Click the trash icon next to the API key and click **Delete**.

</TabItem>
<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");

// Email and password to authenticate client instance
const email = "nemo@nautilus.com";
const password = "xxxxxx";
const fabric = "_system";
const keyid = "id1";

const client = new jsc8({
  url: "https://play.paas.macrometa.io",
  fabricName: fabric
});

// Or use one of the following authentication methods and remove the commenting.
// Create an authenticated instance with a JWT token.
// const clientUsingJwt = new jsc8({url: "https://play.paas.macrometa.io" , token: "XXXX" , fabricName: fabric});
// Create an authenticated instance with an API key.
// const clientUsingApiKey = new jsc8({url: "https://play.paas.macrometa.io" , apiKey: "XXXX" , fabricName: fabric });

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

  console.log("\n2. Deleting " + keyid);
  await client
    .removeApiKey(keyid)
    .then((removeApiKey) => console.log(removeApiKey))
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

API_ACTIVE = False
CHOSEN_API_KEY_ID = "myNewKey"
API_KEY = "my API key" # Change this to my key
URL = "play.paas.macrometa.io"

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
<TabItem value="RA" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Remove an API Key](https://www.macrometa.com/docs/api#/operations/RemoveApiKey).

```js
URL = "api-gdn.macrometa.io"
HTTP_URL = "https://{}".format(URL)
keyid = "id1"
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
<TabItem value="cli" label="CLI">

Use the [gdnsl apikey clear](../../cli/api-key-cli#gdnsl-apikey-clear) CLI command to clear some or all access levels from an API key.

Use the [gdnsl apikey](../../cli/api-key-cli) CLI command to delete an API key.

</TabItem>
</Tabs>
