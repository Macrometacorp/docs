---
sidebar_position: 60
title: Authentication
slug: authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can access your Macrometa GDN account using several methods:

- User Authentication
- Token-based Authentication
- API Keys

## User Authentication

Users can authenticate with Macrometa GDN via `email and password`, an `API Key`, or a `JSON Web Token (JWT)`.

**Code Samples:**

<Tabs groupId="operating-systems">

<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");
const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "", fabricName: '_system'});
async function login() {
  return await client.login("nemo@nautilus.com", "xxxxxx")}
```

</TabItem>
<TabItem value="py" label="Python">

```py
from c8 import C8Client
client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443, 
                    email='nemo@nautilus.com', password='xxxxxx')
```

</TabItem>
</Tabs>  

## Token-based Authentication

Users can also authenticate with Macrometa GDN via JSON web tokens (JWTs). The JWTs in GDN expire after 12 hours unless renewed. So it is best to use API Keys for access by your apps and APIs.

The code sample below shows how you could use a JWT token to authenticate with the SDK.

<Tabs groupId="operating-systems">

<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");
const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "xxxxxx", fabricName: '_system'});
```

</TabItem>
<TabItem value="py" label="Python">

```py
from c8 import C8Client
client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443, token=<your tokeb>)
```

</TabItem>
</Tabs>  

## API Keys

For more information about API keys, refer to [API Keys](../apikeys/index.md).

The code sample below shows how you could use an API key to authenticate with the SDK.

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");
const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "xxxxx", fabricName: '_system'});
```

</TabItem>
<TabItem value="py" label="Python">

```py
from c8 import C8Client
client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443, apikey="xxxxxxx")
```

</TabItem>
</Tabs>  

:::note
In Macrometa GDN, granular permissions can be assigned to both `user accounts` and for `api keys`.
:::
