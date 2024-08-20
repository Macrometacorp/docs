---
sidebar_position: 10
title: Connection
---

It maintains a WebSocket/SSE connection:

## Supported methods

### connect

Connects to the Event Delivery Service. This method can be used to reconnect after a disconnection, such as after using the `disconnect` method:
```js
connection.connect();
```

### getConfig

Retrieves the configuration of the connection. Returns a [`Config`](/photoniq/event-delivery/clients/#config) instance:
```js
connection.getConfig();
```

| **Argument** | **Type** | **Description** |
|--------------|------------|------------------------|
| return | [`Config`](/photoniq/event-delivery/clients/#config) | Client configuration of the connection |

### getId

Retrieves the connection ID:
```js
connection.getId();
```

| **Argument** | **Type** | **Description** |
|--------------|------------|------------------------|
| return | `number` | ID of the connection  |

### getStatus

Checks status of the connection:
```js
connection.getStatus();
```

The  method can return the next `ConnectionType` enum values:

| **Type** | **Description** |
|----------------------|---------------------------|
| `ConnectionType.Closed` | Connection closed  |
| `ConnectionType.Connecting` | Connection is opening    |
| `ConnectionType.Open` | Connection opened    |
| `ConnectionType.Closing` | Connection is closing   |


### getProperty

Get property of a connection:
```js
connection.getProperty(name);
```

| **Argument** | **Type** | **Description** |
|--------------|------------|------------------------|
| `name` | `string` | Name of a property  |
| return | `string` | Value of a property  |


### getProperties

Get all properties of a connection:
```js
connection.getProperties();
```

| **Argument** | **Type** | **Description** |
|--------------|------------|------------------------|
| return | `object` | Object of all property:value pairs  |

### querySet

Create a [`QuerySet`](/photoniq/event-delivery/clients/query-set-and-batch) instance:
```js
connection.querySet();
```

| **Argument** | **Type** | **Description** |
|--------------|------------|------------------------|
| return | [`QuerySet`](/photoniq/event-delivery/clients/query-set-and-batch) | Query set instance  |


### disconnect

Disconnect from the Event Delivery Service:
```js
connection.disconnect();
```

| **Argument** | **Type** | **Description** |
|--------------|------------|------------------------|
| return | `boolean` | `true` if disconnected; `false`  if it was not connected |