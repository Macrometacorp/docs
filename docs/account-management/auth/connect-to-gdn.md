---
sidebar_position: 30
title: Auth Example - Connect to GDN
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The first step in using GDN is to establish a connection to a local region. When this code executes, it initializes the server connection to the region URL you specified.

The code example below shows how you might use authentication in your code.

:::note
The example below assumes you have already installed one or more Macrometa SDKs. For instructions, refer to [Install SDKs](../../developer-hub/sdks/install-sdks.md).
:::

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");

// Email and password to authenticate client instance
const email = "nemo@nautilus.com";
const password = "xxxxxx";
const fabric = "_system";

const client = new jsc8({
  url: "https://play.paas.macrometa.io",
  fabricName: fabric
});

// Or create an authenticated instance with a JWT token.
const clientUsingJwt = new jsc8({
  url: "https://play.paas.macrometa.io",
  token: "XXXX",
  fabricName: fabric
});

// Or create an authenticated instance with an API key.
const clientUsingApiKey = new jsc8({
  url: "https://play.paas.macrometa.io",
  apiKey: "XXXX",
  fabricName: fabric
});

async function main() {
  await client
    .login(email, password)
    .then((e) => console.log("1. User authentication done!"))
    .catch((error) => error);
}

main()
  .then()
  .catch((error) => console.log(error));

```

</TabItem>
<TabItem value="py" label="Python">

```py
from c8 import C8Client

# Define constants
URL = "play.paas.macrometa.io"
GEO_FABRIC = "_system" # Change this if you need to log in to a fabric other than _system.
API_KEY = "my API key" # Change this to your API key.

# Authenticate with your email and password
client = C8Client(protocol='https', host= URL, port=443,
                    email='nemo@nautilus.com', password='xxxxx',
                    geofabric= GEO_FABRIC)

# Authenticate with API key (recommended)
client = C8Client(protocol='https', host=URL, port=443, apikey = API_KEY, geofabric = GEO_FABRIC)

# Authenticate with JWT
client = C8Client(protocol='https', host=URL, port=443, token="XXXX", geofabric = GEO_FABRIC)
```

</TabItem>
<TabItem value="" label="Rest">

```js
import requests
import json

# Constants
URL = "api-gdn.macrometa.io"
HTTP_URL = "https://{}".format(URL)
EMAIL = "nemo@nautilus.com"
PASSWORD = "xxxxxx"
AUTH_TOKEN = "bearer "

# Create an HTTPS Session
url = "{}/_open/auth".format(HTTP_URL)
payload = {
  'email':EMAIL,
  'password':PASSWORD
}
headers = {
  'content-type': 'application/json'
}

response = requests.post(url, data = json.dumps(payload), headers = headers)

if response.status_code == 200:
  resp_body = json.loads(response.text)
  AUTH_TOKEN += resp_body["jwt"]
  TENANT = resp_body["tenant"]
else:
  raise Exception("Error while getting auth token. Code:{}, Reason:{}".format(response.status_code,response.reason))


session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": AUTH_TOKEN})  
```

</TabItem>
</Tabs>
