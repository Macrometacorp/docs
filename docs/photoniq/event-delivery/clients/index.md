---
sidebar_position: 1
title: Getting Started with Event Delivery Client SDK
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

PhotonIQ offers SDK to enable you connect to and deliver event streams to your applications, services, and several other data-volatile use cases. It supports both WebSocket and Server-Sent Events (SSE) connections.

## Quick Start

This section demonstrates some simple tasks to help get you started using this client SDK in two ways.

This quickstart guide will guide you through:
- Connecting to an event delivery service
- Querying and subscribing that service and receiving query results and updates

<Tabs groupId="sdks">
<TabItem value="commonjs" label="Minified JS">

- Download [`photoniq-eds-sdk.min.js`](/download/eds-clients/photoniq-eds-sdk.min.js) client SDK.

- Attach the Javascript module to html code:
```html
<script src="path/to/photoniq-eds-sdk.min.js"></script>
```

- Basic Example:

Connect to Event Delivery Service, retrieve and subsribe to SQL:
```js
let config = {
    host: "<YOUR-PHOTONIQ>.photoniq.macrometa.io",
    customerId: "<YOUR-CUSTOMER-ID>",
    apiKey: "<YOUR-API-KEY>",
    fabric: "<YOUR-FABRIC>",
};

let connection = PhotoniqEdsSdk.connect(config);

let querySet = connection.querySet();

querySet.retrieveAndSubscribe("SELECT * FROM <YOUR-COLLECTION> WHERE key=<YOUR-KEY>", (event) => {
    console.log(`Message event: `, event);
})
```

</TabItem>

<TabItem value="nodejs" label="Node.JS">

- Install the module:

```
npm i photoniq-eds-sdk
```

- Add dependency in the project:

[Vue](https://vuejs.org/) Framework Example:
```js
import { connect } from 'photoniq-eds-sdk';

export default {
  name: 'App',
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
        let connection = connect({
          host: "<YOUR-HOST>",
          customerId: "<YOUR-CUSTOMER-ID>",
          apiKey: "<YOUR-API-KEY>",
          fabric: "<YOUR-FABRIC>",
        });

        let qs = connection.querySet();

        qs.retrieve("SELECT * FROM <YOUR-COLLECTION> WHERE key=<YOUR-KEY>", (event) => {
            console.log(`Message event: `, event);
        });
    }
  }
}
```

</TabItem>
</Tabs>

:::note
The example uses a WebSocket connection. To switch to an SSE connection, add connectionTypes: `["sse"]` to the config. For a priority connection that falls back to WebSocket in case of network issues, use connectionTypes: `["sse", "ws"]`.
:::

## Supported Methods

### Connect

Create a new [`Connection`](/photoniq/event-delivery/clients/Connection) instance and establish connection to PhotonIQ EDS server:

```js
let connection: Connection = PhotoniqEdsSdk.connect(config);
```

### Create

Create a new [`Connection`](/photoniq/event-delivery/clients/Connection) instance:

```js
let connection = PhotoniqEdsSdk.create(config);
```

#### `Config` instance schema:

| **Property** | **Type** | **Requred** | **Description** |
|----------------------|-----------|-----------|-----------------------------------|
| `host` | `string` | Yes | Host of the connection   |
| `customerId` | `string` | Yes | Customer ID credentails    |
| `apiKey` | `string` | Yes | ApiKey credentails    |
| `fabric` | `string` | No | Fabric to be used. Default is `_system`   |
| `connectionTypes` | `(string `\|` SubConfig)[]` | No | Use type of connection and priority. Default is `["ws"]`. Types: `ws`, `sse`    |
| `autoReconnect` | `boolean` | No | Automatically reconnect in case of network issues. Default is `true`    |

#### `SubConfig` instance schema:

| **Property** | **Type** | **Requred** | **Description** |
|----------------------|-----------|-----------|-----------------------------------|
| `type` | `string` | Yes | Type of the connection. Value: `ws` or `sse`   |
| `customerId` | `string` | No | Customer ID credentails. Default set from `Config`     |
| `apiKey` | `string` | No | ApiKey credentails. Default set from `Config`   |
| `fabric` | `string` | No | Fabric to be used. Default set from `Config`  |
| `pingSeconds` | `number` | No | Seconds between ping-pong messages to the WebSocket server. Default is `29`. Acceptable only for `ws` connection.   |
| `flushTimeoutMs` | `number` | No | Seconds between ping-pong messages to the WebSocket server. Default is `20`. Acceptable only for `sse` connection.   |