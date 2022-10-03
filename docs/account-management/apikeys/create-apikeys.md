---
sidebar_position: 10
title: Create and Manage API Keys
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section describes how to create and manage API keys.

## Create API Key

After creating the API key, best practice is to save the automatically generated `KeyID` string somewhere secure.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to create a new API key using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **Account**.
1. Click the **API Keys** tab.
1. Click **New API Key**.
1. Enter a unique ID.

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
  url: "https://gdn.paas.macrometa.io",
  fabricName: fabric
});
// Choose one of the following authentication methods and remove the commenting.

// Create an authenticated instance with a JWT token.
// const clientUsingJwt = new jsc8({url: "https://gdn.paas.macrometa.io" , token: "XXXX" , fabricName: fabric});
// Create an authenticated instance with an API key.
// const clientUsingApiKey = new jsc8({url: "https://gdn.paas.macrometa.io" , apiKey: "XXXX" , fabricName: fabric });
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

  console.log("2. Creating API key with KeyID = " + keyid);
  await client
    .createApiKey(keyid)
    .then((apiKey) => console.log(apiKey))
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
EMAIL = 'nemo@nautilus.com'
PASSWORD = 'xxxxx'
URL = "gdn.paas.macrometa.io"

client = C8Client(protocol='https', host=URL, port=443, email=EMAIL, password=PASSWORD)


# Get a list of all the API key ID's names
apiKeyIds = []
for api in client.list_all_api_keys():
    apiKeyIds.append(api["keyid"])

# Checks if `chosen_api_key` exists
for apiElement in apiKeyIds:
    if apiElement == CHOSEN_API_KEY_ID:
        API_ACTIVE = True
        break

# Checks if the API key exists
if API_ACTIVE:
    # Display a message that the key already exists
    print("Can't create an already existing key")
else:
    # Create a new API key
    try:
        print("Create API Key: ", client.create_api_key(CHOSEN_API_KEY_ID))
    except Exception as err:
        print("Error generating the API key")
        print(err)
```

</TabItem>
<TabItem value="RA" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Create an API Key](https://macrometa.com/docs/api#/operations/CreateApiKey).

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

## View API Keys

Once you log in to a Macrometa account, you can view all API keys that you have access to.

To see a list of existing API keys:

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **Account**.
1. Click the **API Keys** tab.

To see API key permissions:

1. Log in to your [Macrometa account](https://auth.paas.macrometa.io/).
1. Click **Account**.
1. Click the **API Keys** tab.
1. Click the API key in the list that you want to change permissions for.

   Macrometa displays permissions for that API key. Refer to [Permissions](index.md) for information about each permission level.

## Update API Keys

Once you log in to a Macrometa account, you can view all API keys that you have access to. If you have appropriate permissions, then you can also update them.

1. Log in to your [Macrometa account](https://auth.paas.macrometa.io/).
1. Click **Account**.
1. Click the **API Keys** tab.
1. Click the API key in the list that you want to change permissions for.
1. On the Permissions tab, select the option for the permissions you want to assign.

   Refer to [Permissions](index.md) for information about each permission level.

## Delete or Remove API Key

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

On the API Keys tab, click the trash icon next to an API key and then click **Delete**.

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
  url: "https://gdn.paas.macrometa.io",
  fabricName: fabric
});

// Or use one of the following authentication methods and remove the commenting.
// Create an authenticated instance with a JWT token.
// const clientUsingJwt = new jsc8({url: "https://gdn.paas.macrometa.io" , token: "XXXX" , fabricName: fabric});
// Create an authenticated instance with an API key.
// const clientUsingApiKey = new jsc8({url: "https://gdn.paas.macrometa.io" , apiKey: "XXXX" , fabricName: fabric });

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
<TabItem value="RA" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Remove an API Key](https://macrometa.com/docs/api#/operations/RemoveApiKey).

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
<TabItem value="cli" label="CLI">

Use the [gdnsl apikey clear](../../cli/api-key-cli.md#gdnsl-apikey-clear) CLI command to clear some or all access levels from an API key.

</TabItem>
</Tabs>
