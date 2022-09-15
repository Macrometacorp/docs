---
sidebar_position: 10
title: Connect to GDN
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The first step in using GDN is to establish a connection to a local region. When this code executes, it initializes the server connection to the region URL you sepcified. You can create an API key from the GUI or REST API.

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");

// Email and password to authenticate client instance
const email = "nemo@nautilus.com";
const password = "xxxxxx";
const fabric = "_system";

const client = new jsc8({
  url: "https://gdn.paas.macrometa.io",
  fabricName: fabric
});
// Or create an authenticated instance with a JWT token.
const clientUsingJwt = new jsc8({
  url: "https://gdn.paas.macrometa.io",
  token: "XXXX",
  fabricName: fabric
});
// Or create an authenticated instance with an API key.
const clientUsingApiKey = new jsc8({
  url: "https://gdn.paas.macrometa.io",
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
client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                    email='nemo@nautilus.com', password='xxxxx',
                    geofabric='_system')

# OR Using token
client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443, token="XXXX")
```

</TabItem>
<TabItem value="" label="Rest">

```js
import requests
import json

# Constants
FEDERATION = "api-gdn.macrometa.io"
FED_URL = "https://{}".format(FEDERATION)
EMAIL = "nemo@nautilus.com"
PASSWORD = "xxxxxx"
AUTH_TOKEN = "bearer "

# Create a HTTPS Session
url = "{}/_open/auth".format(FED_URL)
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
