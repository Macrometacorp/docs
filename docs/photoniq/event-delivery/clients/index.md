---
sidebar_position: 1
title: Event Delivery Client SDKs
---

This section demonstrates some of the tasks you can complete with JavaScript SDKs. Macrometa offers the following SDKs:

- [WebSocket](/download/eds-clients/photoniq-eds-ws.min.js)
- SSE (coming soon)

## Pre-requisites

- Download `photoniq-eds-ws.min.js` or `photoniq-eds-sse.min.js` from section above.
- Attach the module to your html:
```html
<script src="path/to/photoniq-eds-ws.min.js"></script>
<!-- or -->
<script src="path/to/photoniq-eds-sse.min.js"></script>
```

## Basic Example

Connect to Event Delivery Service, retrieve and subsribe to SQL:
```js
let config = {
    host: "<YOUR-PHOTONIQ>.photoniq.macrometa.io",
    customerId: "<YOUR-CUSTOMER-ID>",
    apiKey: "<YOUR-API-KEY>",
    fabric: "<YOUR-FABRIC>",
};

let connection = PhotoniqEdsWs.connect(config);

let querySet = connection.querySet();

querySet.retrieveAndSubscribe("SELECT * FROM <YOUR-COLLECTION> WHERE key=<YOUR-KEY>", (event) => {
    console.log(`Message event: `, event);
})
```

:::note
The example uses the WebSocket client. To use an SSE connection, replace `PhotoniqEdsWs` with `PhotoniqEdsSse`.
:::


## Config Schema

| **Property** | **Type** | **Requred** | **Description** |
|----------------------|-----------|-----------|-----------------------------------|
| `host` | `string` | Yes | Host of the connectionn   |
| `fabric` | `string` | No | Fabric to be used. Default is `_system`   |
| `customerId` | `string` | Yes | Customer ID credentails    |
| `apiKey` | `string` | Yes | ApiKey credentails    |
| `pingSeconds` | `number` | No | Seconds between ping-pong messages to the server. Default is `29`   |


## Disconnect

To gracefully disconnect from the Event Delivery Service:

```js
connection.disconnect();
```


