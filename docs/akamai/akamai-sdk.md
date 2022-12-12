---
sidebar_position: 50
title: Akamai EdgeWorker SDK Support
---

This page shows you how to use Akamai EdgeWorkers with Macrometa SDKs.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

First step is to create Edge worker metadata. You can see more about parameters of metadata object in [Manage Integrations](../../docs/akamai/manage-integrations.md).

<Tabs groupId="modify-single">
<TabItem value="javascript" label="JavaScript">

- Step 1. [Install the SDK](../../docs/sdks/install-sdks.md).
- Step 2. Create an instance of the jsc8.
- Step 3. Access Function commands `client.function.<function method>`.

```js
const jsc8 = require("jsc8");
client = new jsc8({
    url: "https://play.paas.macrometa.io/",
    apiKey: "xxxxxx",
    fabricName: "_system",
});

async function main() {
    const response = await client.function.createEdgeWorkerMetadata({
        "akamai",
        "<accessToken>",
        "<baseUri>",
        "<clientSecret>",
        "<clientToken>",
        "200",
        "<groupId>",
        "test-akamai-ew.test.io"
    });
    console.log(response);
}

main();
```

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages:

- [Create EdgeWorker metadata](https://macrometa.com/docs/api#/operations/RedisPost).

</TabItem>
</Tabs>

You can also check if there is existing metadata set-up, update metadata, and delete metadata.

When metadata is set up, you can deploy a query worker to an EdgeWorker with `deployQueryWorkerToEdgeWorker` method or an API call:

<Tabs groupId="modify-single">
<TabItem value="javascript" label="JavaScript">

```js
const jsc8 = require("jsc8");
client = new jsc8({
    url: "https://play.paas.macrometa.io/",
    apiKey: "xxxxxx",
    fabricName: "_system",
});

async function main() {
    const response = await client.function.deployQueryWorkerToEdgeWorker(
        "akamai",
        "testSdkEv",
        "testSdkEv",
        "PRODUCTION",
    );
    console.log(response);
}

main();
```

</TabItem>
<TabItem value="api" label="REST API">

- [Deploy the query worker to the edge worker environment](https://macrometa.com/docs/api#/operations/RedisPost)


</TabItem>
</Tabs>

You can check deployed EdgeWorkers with `listFunctionWorkers` method or an API call:

<Tabs groupId="modify-single">
<TabItem value="javascript" label="JavaScript">

```js
const jsc8 = require("jsc8");
client = new jsc8({
    url: "https://play.paas.macrometa.io/",
    apiKey: "xxxxxx",
    fabricName: "_system",
});

async function main() {
    const response = await client.function.listFunctionWorkers();
    console.log(response);
}

main();
```

</TabItem>
<TabItem value="api" label="REST API">

- [List multiple edge functions](https://macrometa.com/docs/api#/operations/RedisPost)

</TabItem>
</Tabs>

There are other deployment options such as `deployStreamPublisherToEdgeWorker` and `deployStreamAdhocQueryToEdgeWorker` methods or API calls:

<Tabs groupId="modify-single">
<TabItem value="javascript" label="JavaScript">

```js
const jsc8 = require("jsc8");
client = new jsc8({
    url: "https://play.paas.macrometa.io/",
    apiKey: "xxxxxx",
    fabricName: "_system",
});

async function main() {
    const response = await client.function.deployStreamPublisherToEdgeWorker(
        {
          "akamai",
          "testSdkEvStreamPublisher",
          "testSdkEvStreamPublisher",
          "testSdkKvStreamPublisher",
          "PRODUCTION",
        }
    );
    console.log(response);
}

main();
```

</TabItem>
<TabItem value="api" label="REST API">

- [Deploy the stream publisher to the edge worker environment](https://macrometa.com/docs/api#/operations/RedisPost)

</TabItem>
</Tabs>

<Tabs groupId="modify-single">
<TabItem value="javascript" label="JavaScript">

```js
const jsc8 = require("jsc8");
client = new jsc8({
    url: "https://play.paas.macrometa.io/",
    apiKey: "xxxxxx",
    fabricName: "_system",
});

async function main() {
    const response = await client.function.deployStreamAdhocQueryToEdgeWorker(
        {
          "akamai",
          "testSdkEvStreamAdhoc",
          "testSdkKvStreamAdhoc",
          "PRODUCTION",
        }
    );
    console.log(response);
}

main();
```

</TabItem>
<TabItem value="api" label="REST API">

- [Deploy the stream adhoc query to the edge worker environment](https://macrometa.com/docs/api#/operations/RedisPost)

</TabItem>
</Tabs>

You can get all the information about deployed EdgeWorker with `getFunctionWorkerInfo` method or an API call:

<Tabs groupId="modify-single">
<TabItem value="javascript" label="JavaScript">

```js
const jsc8 = require("jsc8");
client = new jsc8({
    url: "https://play.paas.macrometa.io/",
    apiKey: "xxxxxx",
    fabricName: "_system",
});

async function main() {
    const response = await client.function.getFunctionWorkerInfo(
        "functionName"
    );
    console.log(response);
}

main();
```

</TabItem>
<TabItem value="api" label="REST API">

- [Get edge function information](https://macrometa.com/docs/api#/operations/RedisPost)

</TabItem>
</Tabs>

Last step would be to invoke Edge Worker with `invokeFunctionWorker` method or an API call:

<Tabs groupId="modify-single">
<TabItem value="javascript" label="JavaScript">

```js
const jsc8 = require("jsc8");
client = new jsc8({
    url: "https://play.paas.macrometa.io/",
    apiKey: "xxxxxx",
    fabricName: "_system",
});

async function main() {
    const response = await client.function.invokeFunctionWorker(
        "functionName"
    );
    console.log(response);
}

main();
```

</TabItem>
<TabItem value="api" label="REST API">

- [Invoke a edge function](https://macrometa.com/docs/api#/operations/RedisPost).

</TabItem>
</Tabs>