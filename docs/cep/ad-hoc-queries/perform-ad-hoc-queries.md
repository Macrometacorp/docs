---
title: Perform Ad Hoc Queries
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page shows you different methods for performing ad hoc queries. 

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python SDK">

To see the full example, refer to the [Stream Workers SDK Example](../examples/basic-examples/stream-workers-sdk-example).

```py
q = "select * from SampleCargoAppDestTable limit 3"
result = app.query(q)
print(result)
```

</TabItem>
<TabItem value="js" label="JavaScript SDK">

To see the full example, refer to the [Stream Workers SDK Example](../examples/stream-workers-sdk-example.md).

```js
const q = "select * from SampleCargoAppDestTable limit 3";
result = await app.query(q);
console.log(result);
```

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Submit an Ad Hoc Query](https://www.macrometa.com/docs/api#/operations/queryStreamApp).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl stream-worker](../../cli/stream-workers-cli) CLI command to submit an ad hoc query.

```bash
# Submit an ad hoc Stream query and get the result records from a store.
gdnsl stream-worker TestStream --query "SELECT * FROM TestStreamTable"
```

</TabItem>
</Tabs>
