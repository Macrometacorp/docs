---
sidebar_position: 50
title: Akamai EdgeWorker SDK Support
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page shows you how to use Akamai EdgeWorkers with Macrometa SDKs and API calls.

## Create or Update EdgeWorker Metadata

The first step to working with EdgeWorkers is to create EdgeWorker metadata. You can see more about parameters of metadata object in [Manage Integrations](../../docs/akamai/manage-integrations.md).

You can also check if there is existing metadata set up, update metadata, and delete metadata.

<Tabs groupId="modify-single">
<TabItem value="javascript" label="JavaScript SDK">

- Step 1. [Install the SDK](../../docs/sdks/install-sdks.md).
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
<TabItem value="python" label="Python SDK">

- Step 1. [Install the SDK](../../docs/sdks/install-sdks.md).
- Step 2. Create an instance of the C8Client.
- Step 3. Access Function commands `client.function.<function method>`.

```python
from c8 import C8Client

client = C8Client(
    protocol="https",
    host="https://play.paas.macrometa.io/",
    port=443,
    apikey="xxxxxx",
    geofabric="_system",
)

response = client.function.create_edge_worker_metadata(
    "akamai",
    "<accessToken>",
    "<baseUri>",
    "<clientSecret>",
    "<clientToken>",
    "200",
    "<groupId>",
    "test-akamai-ew.test.io"
)

print(response)

```

</TabItem>
<TabItem value="api" label="REST API">

[Create or Update EdgeWorker Metadata](https://macrometa.com/docs/api#/operations/UpdateFunctionWorkerMetadata).

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
        {
        "akamai",
        "testSdkEv",
        "testSdkEv",
        "PRODUCTION"
        }
    );
    console.log(response);
}

main();
```

</TabItem>
<TabItem value="python" label="Python SDK">

```python
from c8 import C8Client

client = C8Client(
    protocol="https",
    host="https://play.paas.macrometa.io/",
    port=443,
    apikey="xxxxxx",
    geofabric="_system",
)

response = client.function.deploy_query_worker_to_edge_worker(
    "testSdkEv",
    "testSdkEv"
)

print(response)

```

</TabItem>
<TabItem value="api" label="REST API">

[Deploy the query worker to the EdgeWorker environment](https://macrometa.com/docs/api#/operations/GenerateFunctionWorkerFromQueryWorker)

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
          "PRODUCTION"
        }
    );
    console.log(response);
}

main();
```

</TabItem>
<TabItem value="python" label="Python SDK">

```python
from c8 import C8Client

client = C8Client(
    protocol="https",
    host="https://play.paas.macrometa.io/",
    port=443,
    apikey="xxxxxx",
    geofabric="_system",
)

response = client.function.deploy_stream_publisher_to_edge_worker(
    "testSdkEvStreamPublisher",
    "testSdkEvStreamPublisher",
    "testSdkKvStreamPublisher"
)

print(response)

```

</TabItem>
<TabItem value="api" label="REST API">

[Deploy the stream worker to the EdgeWorker environment](https://macrometa.com/docs/api#/operations/GenerateFunctionWorkerFromStreamPublisher)

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
          "PRODUCTION"
        }
    );
    console.log(response);
}

main();
```

</TabItem>
<TabItem value="python" label="Python SDK">

```python
from c8 import C8Client

client = C8Client(
    protocol="https",
    host="https://play.paas.macrometa.io/",
    port=443,
    apikey="xxxxxx",
    geofabric="_system",
)

response = client.function.deploy_stream_adhoc_query_to_edge_worker(
    "testSdkEvStreamAdhoc",
    "testSdkKvStreamAdhoc"
)

print(response)

```

</TabItem>
<TabItem value="api" label="REST API">

- [Deploy the stream ad hoc query to the EdgeWorker environment](https://macrometa.com/docs/api#/operations/GenerateFunctionWorkerFromStreamQuery)

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
<TabItem value="python" label="Python SDK">

```python
from c8 import C8Client

client = C8Client(
    protocol="https",
    host="https://play.paas.macrometa.io/",
    port=443,
    apikey="xxxxxx",
    geofabric="_system",
)

response = client.function.invoke_function_worker("functionName")

print(response)

```

</TabItem>
<TabItem value="api" label="REST API">

[Invoke an EdgeWorker](https://macrometa.com/docs/api#/operations/InvokeFunctionWorkerByFunctionName)

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
<TabItem value="python" label="Python SDK">

```python
from c8 import C8Client

client = C8Client(
    protocol="https",
    host="https://play.paas.macrometa.io/",
    port=443,
    apikey="xxxxxx",
    geofabric="_system",
)

response = client.function.list_function_workers()

print(response)

```

</TabItem>
<TabItem value="api" label="REST API">

[List multiple EdgeWorkers](https://macrometa.com/docs/api#/operations/ListAllFunctionWorkerByType)

</TabItem>
</Tabs>

## Get EdgeWorker Details

You can get all the information about deployed EdgeWorker with `getFunctionWorkerInfo` method or an API call:

<Tabs groupId="modify-single">
<TabItem value="javascript" label="JavaScript SDK">

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
<TabItem value="python" label="Python SDK">

```python
from c8 import C8Client

client = C8Client(
    protocol="https",
    host="https://play.paas.macrometa.io/",
    port=443,
    apikey="xxxxxx",
    geofabric="_system",
)

response = client.function.get_function_worker_info("functionName")

print(response)

```

</TabItem>
<TabItem value="api" label="REST API">

- [Get EdgeWorker information](https://macrometa.com/docs/api#/operations/GetFunctionWorkerMetadata)

</TabItem>
</Tabs>
