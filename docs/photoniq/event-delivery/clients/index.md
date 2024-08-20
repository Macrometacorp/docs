---
sidebar_position: 1
title: Event Delivery Client SDKs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Manage connections to EDS using the JavaScript SDK, which supports both WebSocket and Server-Sent Events (SSE) connections.

## Quick Start

<Tabs groupId="sdks">
<TabItem value="commonjs" label="Minified JS Script">

- Download [Minified JS Script for Browsers](/download/eds-clients/photoniq-eds-sdk.min.js)

- Attach the module to your html:
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

<TabItem value="nodejs" label="Node.JS Module">

- Download [Node.JS module](/download/eds-clients/photoniq-eds-sdk.zip)

- Link the module in another project by the next command:

```
npm link ../photoniq-eds-sdk
```

- Add dependency in the project:

[Vue](https://vuejs.org/) Framework Example:
```js
import { connect } from 'photoniq-eds-sdk';

export default {
  name: 'App',
  mounted() {
    this.initializePhotoniqEdsSdk();
  },
  methods: {
    initializePhotoniqEdsSdk() {
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
| `host` | `string` | Yes | Host of the connectionn   |
| `customerId` | `string` | Yes | Customer ID credentails    |
| `apiKey` | `string` | Yes | ApiKey credentails    |
| `fabric` | `string` | No | Fabric to be used. Default is `_system`   |
| `connectionTypes` | `string[]` | No | Use type of connection and priority. Default is `["ws"]`. Types: `ws`, `sse`    |
| `queryType` | `string` | No | Type of query to use. Types: `"SQL"`   |
| `autoReconnect` | `boolean` | No | Automatically reconnect in case of network issues. Default is `true`    |
| `pingSeconds` | `number` | No | Seconds between ping-pong messages to the WebSocket server. Default is `29`   |
