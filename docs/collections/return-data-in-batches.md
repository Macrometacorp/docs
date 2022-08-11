---
title: Return Collection Data in Batches
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Macrometa GDN is a multi-tenant architecture for Free and Metered tier users. There are default limits for both tiers detailed in [Tenant Quotas and Limits](../references/quotas.md). This page describes some options to retrieve data from a collection in batches despite the default limit of 1,000 documents per query.

## SDK download

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
With Yarn or NPM

    yarn add jsc8
    (or)
    npm install jsc8

If you want to use the SDK outside of the current directory, you can also install it globally using the `--global` flag:

    npm install --global jsc8

From source,

    git clone https://github.com/macrometacorp/jsc8.git
    cd jsC8
    npm install
    npm run dist
```
</TabItem>
</Tabs>

## Solutions

The pattern in both of the solutions is similar: Create a connection to the GDN using the C8 SDK of your choice. You will need to have an API key, JWT, or Email/Password to complete authentication.

Next, create a cursor to receive the results from your request. You will get the collection document count to determine the necessary number of loops to retrieve all documents. After each loop the offset will increment by the batch size and return the next set of values. Now with a single script, you can retrieve data greater than your per-query limit.

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
import jsc8 from "jsc8";
const url = "https://gdn.paas.macrometa.io"
const fabricName = "_system"
const coll = "[collection-name]"
const batchSize = 1000;
const apiKey = "[apiKey]"

const client = new jsc8({
    url,
    apiKey,
    fabricName
});

let data = [];
(async function () {
    try {
        const { count } = await client.collection(coll).count();
        const num = Math.ceil(count / batchSize);
        for (let i = 0; i < num; i++) {
            let offset = i * batchSize;
            let cursor = await client.exportDataByCollectionName(coll, {
                offset: offset,
                limit: batchSize,
            });
            console.log(
                `Data pulled from source fabric, collection ${coll}, ${i + 1
                } of ${num}, server code: ${cursor.code}`
             );
            data.push.apply(data, cursor.result);
        }
        console.log(data);
    } catch (e) {
        console.log(e);
    }
})();
```

</TabItem>
</Tabs>
