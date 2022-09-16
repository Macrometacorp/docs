---
sidebar_position: 60
title: Authentication
slug: authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

There are multiple ways users can access their Macrometa GDN account:

* User Authentication
* Token-based Authentication
* API Keys

## User Authentication

Users can authenticate with Macrometa GDN via `email and password`, an `API Key`, or a ` JSON Web Token (JWT)`.

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

Users can also authenticate with Macrometa GDN via `Json web tokens`. The `JWT Tokens` in GDN expire after 12 hours unless renewed. So it is best to use API Keys for access by your apps and APIs.

**Code Samples:**

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

Most APIs today use an API Key to authenticate legitimate clients. API Keys are very simple to use from the consumer perspective:

* Get an API key from the service (in essence a shared secret).
* Add the key to an Authorization header.
* Call the API with `api-` plus your base URL. Example: `https://api-seastar-9b9d9999.paas.macrometa.io/`

API keys never expire.

**Code Samples:**

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
