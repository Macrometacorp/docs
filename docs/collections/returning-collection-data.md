---
sidebar_position: 70
title: Retrieving Data
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Macrometa GDN is a multi-tenant platform for Free and Metered tier users. There are default limits for both tiers detailed in [Tenant Quotas and Limits](../references/quotas.md). This page describes how to retrieve larger result sets from a collection with the default limit of 1,000 documents per query.

There are two recommmended approaches depending on the volume of data being returned. The [Cursor API](https://macrometa.com/docs/api#/operations/createQueryCursor) can be used to fetch up to 30,000 records, this is an approximation based on platform limits. Attempting to return more than 30,000 from the Cursor API may cause the query to exceed the query execution time limit and raise an error. The [Collection Export API](https://macrometa.com/docs/api#/operations/ExportCollectionData) is the recommended approach when retrieving an entire collection.

Create a connection to the GDN using the jsc8 SDK. You will need an API key, JWT, or Email/Password to complete authentication. For more information, refer to [Authentication](../authentication.md).

### SDK download

:::note
This solution is not currently supported in the pyc8 SDK
:::

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
With Yarn or NPM

    yarn add jsc8@beta
    (or)
    npm install jsc8@beta

If you want to use the SDK outside of the current directory, you can also install it globally using the `--global` flag:

    npm install --global jsc8@beta

From source,

    git clone https://github.com/macrometacorp/jsc8.git
    cd jsC8
    npm install
    npm run dist
```
</TabItem>
</Tabs>


### Cursor API

For the Cursor API solution, create a cursor to receive the results from your request. When calling the `query` method request options are provided as key/value pairs. It is important to set the `batchSize` value to 1000 and the `stream` value to true. This will permit the results from the query to be returned as a stream, allowing us to return subsequent batches of data.

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");
const url = "https://gdn.paas.macrometa.io";
const fabricName = "_system";
const apiKey = "[apiKey]";

let query = `FOR i IN collection RETURN i`

const client = new jsc8({
  url,
  apiKey,
  fabricName,
});

(async function () {
  let result = "";
  try {
    const cursor = await client.query(
      query,
      {},
      { batchSize: 1000, count: true, stream: true }
    );
    result = await cursor.all();
  } catch (e) {
    console.log(e.response.body);
  }
  console.log("Results:", result);
})();
```

</TabItem>
</Tabs>

### Collection Export API

The Collection Export solution should be used when retrieving the entire collection with out filtering the results. Entire collections can also be exported from the GDN web application. Get the collection document count to determine the necessary number of iterations to retrieve all documents. After each iteration the offset will increment by the batch size and return the next set of results.

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
