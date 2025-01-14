---
sidebar_position: 70
title: Retrieving Data
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page describes how to retrieve larger result sets from a collection with the default limit of 1,000 documents per query.

There are two recommended approaches depending on the volume of data being returned. The [Cursor](https://www.macrometa.com/docs/api#/operations/createQueryCursor) endpoint from Macrometa API can be used to fetch up to 30,000 records, this is an approximation based on platform limits. Attempting to return more than 30,000 from the endpoint may cause the query to exceed the query execution time limit and raise an error. The [Collection Export](https://www.macrometa.com/docs/api#/operations/ExportCollectionData) endpoint from Macrometa API is the recommended approach when retrieving an entire collection.

Create a connection to the GDN using the jsc8 SDK. You will need an API key, JWT, or Email/Password to complete authentication. For more information, refer to [Authentication](../../account-management/auth/index.md).

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


### Cursor

We can create a cursor to receive the results from our request. A cursor details where we left off when reading a stream of responses from API, so we can continue to read the batch of required data. When calling the `query` method request options are provided as key/value pairs. For a detailed explanation of options visit the [API reference](https://www.macrometa.com/docs/api#/operations/createQueryCursor). Set the `batchSize` to the required value (code ex. 1000) and the `stream` value to true. This will permit the results from the query to be returned as a stream, allowing us to return subsequent batches of data. In response, the entire result set is loaded into the cursor (code ex. `cursor`). Therefore we must be mindful of client-side memory capacity when running queries that can potentially return a large result set.

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");
client = new jsc8({
  url: "https://play.paas.macrometa.io",
  apiKey: "[apiKey]",
  fabricName: "_system",
});

(async function () {
  let query = "FOR i IN collection RETURN i";
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

### Collection Export

The Collection Export example should be used when retrieving the entire collection with out filtering the results. Entire collections can also be exported from the GDN web application. Get the collection document count to determine the necessary number of iterations to retrieve all documents. After each iteration the offset will increment by the batch size and return the next set of results.

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");
client = new jsc8({
  url: "https://play.paas.macrometa.io",
  apiKey: "[apiKey]",
  fabricName: "_system",
});

const coll = "[collection-name]"
const batchSize = 1000;

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
