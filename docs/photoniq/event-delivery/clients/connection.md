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

Retrieves the configuration of the connection. Returns a `Config` instance:
```js
connection.getConfig();
```

### getId

Retrieves the connection ID. Returns a `number` value:
```js
connection.getId();
```

### isConnected

Checks whether the connection is alive. Returns a `boolean` value:
```js
connection.isConnected();
```

### querySet

Create a `QuerySet` instance:
```js
connection.querySet();
```

### disconnect

Disconnect from the Event Delivery Service:
```js
connection.disconnect();
```
