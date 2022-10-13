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
const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
```

</TabItem>
<TabItem value="py" label="Python">

```py
from operator import concat
import base64
import json
import warnings
from c8 import C8Client
import six
warnings.filterwarnings("ignore")

# Define constants
URL = "gdn.paas.macrometa.io"
GEO_FABRIC = "_system" # Change this if you need to log in to a fabric other than _system.
API_KEY = "my API key" # Change this to your API key.

print("--- Connecting to C8")
client = C8Client(protocol='https', host=URL, port=443, apikey = API_KEY, geofabric = GEO_FABRIC)
```

</TabItem>
</Tabs>
