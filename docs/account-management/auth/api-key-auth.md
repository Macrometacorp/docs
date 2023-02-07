---
title: API Key Authentication
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

API keys are the recommended authentication method for access by apps and APIs.

- You can apply granular permissions to API keys. For more information, refer to [Permissions](../permissions/index.md).
- You can manage API keys in multiple ways, including the web console.

For more information about creating and managing API keys, refer to [Manage API Keys](../api-keys/index.md).

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");
// Replace the apiKey placeholder with your API key.
// Update the fabricName if you need to log in to a fabric other than _system.
const client = new jsc8({url: "https://play.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
```

</TabItem>
<TabItem value="py" label="Python">

```py
from c8 import C8Client

# Define constants
URL = "play.paas.macrometa.io"
GEO_FABRIC = "_system" # Change this if you need to log in to a fabric other than _system.
API_KEY = "my API key" # Change this to your API key.

print("--- Connecting to C8")
client = C8Client(protocol='https', host=URL, port=443, apikey = API_KEY, geofabric = GEO_FABRIC)
```

</TabItem>
<TabItem value="api" label="REST API">

Sample Python code demonstrating how to use API key to make REST API calls:

```py
import requests

# Constants

URL = "api-play.paas.macrometa.io"
HTTP_URL = f"https://{URL}"
FABRIC = "_system"
API_KEY = "XXXXX" # To be replaced by your apikey

# apikey keyword needs to be appended to the apikey
AUTH_TOKEN = f"apikey {API_KEY}"

# Create a HTTPS Session authenticated with apikey
session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": AUTH_TOKEN})

# Now you can use the above session to make any API request
# For example we are calling the 'List all collections' API below
url = f"{HTTP_URL}/_fabric/{FABRIC}/_api/collection"

response = session.get(url)
print(response.text)
```

Sample Javascript code demonstrating how to use API key to make REST API calls:

```js
class APIRequest {
  _headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
​
  constructor (url, apiKey) {
    this._url = url;
    this._headers.authorization = `apikey ${apiKey}`; // apikey keyword needs to be appended
  }
​
  _handleResponse (response, resolve, reject) {
    if (response.ok) {
      resolve(response.json());
    } else {
      reject(response);
    }
  }
​
  req (endpoint, { body, ...options } = {}) {
    const self = this;
    return new Promise(function (resolve, reject) {
      fetch(self._url + endpoint, {
        headers: self._headers,
        body: body ? JSON.stringify(body) : undefined,
        ...options
      }).then((response) => self._handleResponse(response, resolve, reject));
    });
  }
}
​
const federationName = "api-play.paas.macrometa.io";
const federationUrl = `https://${federationName}`;
const fabric = "_system";
const apiKey = "XXXXX";
​
const run = async function () {
  try {
    const connection = new APIRequest(federationUrl, apiKey);
​
    // Now we can use the above connection to call APIs
    // For example we are calling the 'List all collections' API below
    const response = await connection.req(`/_fabric/${fabric}/_api/collection`, {
      method: "GET"
    });
    console.log(response)
  } catch (e) {
    console.error(e);
  }
};
​
run();
```

</TabItem>
</Tabs>
