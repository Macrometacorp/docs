---
title: User Authentication
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The code sample below shows how you can use your email and password to authenticate with the SDK.

<Tabs groupId="operating-systems">

<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");
const client = new jsc8({url: "https://play.paas.macrometa.io", token: "", fabricName: '_system'});
async function login() {
  return await client.login("nemo@nautilus.com", "xxxxxx")}
```

</TabItem>
<TabItem value="py" label="Python">

```py
from c8 import C8Client
client = C8Client(protocol='https', host='play.paas.macrometa.io', port=443, 
                    email='nemo@nautilus.com', password='xxxxxx')
```

</TabItem>
</Tabs>
