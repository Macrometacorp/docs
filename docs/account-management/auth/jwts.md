---
title: JSON Web Tokens (JWTs)
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can authenticate with Macrometa GDN via JSON web tokens (JWTs). The JWTs in GDN expire after 12 hours unless renewed. So it is best to use API Keys for access by your apps and APIs.

The code sample below shows how you could use a JWT to authenticate with the SDK.

<Tabs groupId="operating-systems">

<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");
const client = new jsc8({url: "https://play.paas.macrometa.io", token: "xxxxxx", fabricName: '_system'});
```

</TabItem>
<TabItem value="py" label="Python">

```py
from c8 import C8Client
client = C8Client(protocol='https', host='play.paas.macrometa.io', port=443, token=<your tokeb>)
```

</TabItem>
<TabItem value="apo" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Obtain JWT Authentication](https://www.macrometa.com/docs/api#/paths/_open-auth/post).

</TabItem>
</Tabs>
