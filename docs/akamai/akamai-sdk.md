---
sidebar_position: 100
title: Akamai EdgeWorker SDK Support
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page shows you how to use Akamai EdgeWorkers with Macrometa SDKs and API calls.

## Create or Update EdgeWorker Metadata

The first step to working with EdgeWorkers is to create EdgeWorker metadata. You can see more about parameters of metadata object in [Manage Integrations](../../docs/akamai/manage-integrations.md).

You can also check if there is existing metadata set up, update metadata, and delete metadata.

<Tabs groupId="modify-single">
<TabItem value="javascript" label=" JavaScript SDK">

- Step 1. [Install the SDK](../../docs/developer-hub/sdks/install-sdks.md).
- Step 2. Create an instance of the jsC8.
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

[Create or Update EdgeWorker Metadata](https://www.macrometa.com/docs/api#/operations/UpdateFunctionWorkerMetadata).

</TabItem>
</Tabs>

## Deploy Query Worker to EdgeWorker

When metadata is set up, you can deploy a query worker to an EdgeWorker with `deployQueryWorkerToEdgeWorker` method or an API call.

<Tabs groupId="modify-single">
<TabItem value="javascript" label=" JavaScript SDK">

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

[Deploy the query worker to the EdgeWorker environment](https://www.macrometa.com/docs/api#/operations/GenerateFunctionWorkerFromQueryWorker)

</TabItem>
</Tabs>

## Deploy Stream Worker to EdgeWorker

<Tabs groupId="modify-single">
<TabItem value="javascript" label=" JavaScript SDK">

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

[Deploy the stream worker to the EdgeWorker environment](https://www.macrometa.com/docs/api#/operations/GenerateFunctionWorkerFromStreamPublisher)

</TabItem>
</Tabs>

## Deploy Stream Ad Hoc Query to EdgeWorker

<Tabs groupId="modify-single">
<TabItem value="javascript" label=" JavaScript SDK">

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

- [Deploy the stream ad hoc query to the EdgeWorker environment](https://www.macrometa.com/docs/api#/operations/GenerateFunctionWorkerFromStreamQuery)

</TabItem>
</Tabs>

## Invoke EdgeWorker

<Tabs groupId="modify-single">
<TabItem value="javascript" label=" JavaScript SDK">

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

[Invoke an EdgeWorker](https://www.macrometa.com/docs/api#/operations/InvokeFunctionWorkerByFunctionName)

</TabItem>
</Tabs>

## View Deployed EdgeWorkers

You can check deployed EdgeWorkers with `listFunctionWorkers` method or an API call.

<Tabs groupId="modify-single">
<TabItem value="javascript" label=" JavaScript SDK">

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

[List multiple EdgeWorkers](https://www.macrometa.com/docs/api#/operations/ListAllFunctionWorkerByType)

</TabItem>
</Tabs>

## Get EdgeWorker Details

You can get all the information about deployed EdgeWorker with `getFunctionWorkerInfo` method or an API call:

<Tabs groupId="modify-single">
<TabItem value="javascript" label=" JavaScript SDK">

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

- [Get EdgeWorker information](https://www.macrometa.com/docs/api#/operations/GetFunctionWorkerMetadata)

</TabItem>
</Tabs>
