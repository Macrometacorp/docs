---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Authentication

There are multiple ways users can access their Macrometa GDN account:

* User Authentication
* Token based Authentication
* API Keys

## User Authentication

Users can authenticate with Macrometa GDN via `email and password`, an `API Key`, or a ` JSON Web Token (JWT)`.

**Code Samples:**

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    from c8 import C8Client
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443, 
                        email='nemo@nautilus.com', password='xxxxxx')
</TabItem>
  <TabItem value="js" label="Javascript">

    const jsc8 = require("jsc8");
    const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "", fabricName: '_system'});
    await client.login("nemo@nautilus.com", "xxxxxx");

  </TabItem>
</Tabs>  

## Token based Authentication

Users can also authenticate with Macrometa GDN via `Json web tokens`. The `JWT Tokens` in GDN expire after 12 hours unless renewed. So it is best to use API Keys for access by your apps & apis.

**Code Samples:**

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    from c8 import C8Client
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443, token=<your tokeb>)

  </TabItem>
  <TabItem value="js" label="Javascript">

    const jsc8 = require("jsc8");
    const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "xxxxxx", fabricName: '_system'});

  </TabItem>
</Tabs>  

## API Keys

Most APIs today use an API Key to authenticate legitimate clients. API Keys are very simple to use from the consumer perspective:

* Get an API key from the service (in essence a shared secret).
* Add the key to an Authorization header.
* Call the API.

API keys never expire.

**Code Samples:**

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    from c8 import C8Client
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443, apikey="xxxxxxx")

</TabItem>
  <TabItem value="js" label="Javascript">

    const jsc8 = require("jsc8");
    const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "xxxxx", fabricName: '_system'});

  </TabItem>
</Tabs>  


:::note
In Macrometa GDN, granular permissions can be assigned to both `user accounts` and for `api keys`.
:::