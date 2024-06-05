---
sidebar_position: 1
title: Getting Started with Event Delivery Client SDKs
---

PhotonIQ offers two client SDKs to enable you connect to and deliver event streams to your applications, services, and several other data-volatile use cases. These SDKs are written in Javascript:
- [WebSocket](/download/eds-clients/photoniq-eds-ws.min.js)
- Server Sent Events (SSE) 
 This section demonstrates some simple tasks to help get you started using these client SDKs. 

## Objectives
In event delivery, an event refers to every new data generated or function executed. Getting started with this PhotonIQ service will involve you connecting to and subscribing to events from a stream.

This quickstart guide will guide you through:
- Connecting to an event delivery service
- Querying that service and receiving query results
- Disconnecting from the event delivery service


## Pre-requisites
You need the WebSocket or SSE client to successfully complete this guide:
1. Download the `photoniq-eds-ws.min.js` or `photoniq-eds-sse.min.js` client SDK.
1. Attach the Javascript module to html code
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


