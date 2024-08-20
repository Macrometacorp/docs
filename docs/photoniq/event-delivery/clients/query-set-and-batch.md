---
sidebar_position: 20
title: Query Set And Batch
---

This abstract layer helps to manage a group of queries instead of working with each query independently. To initialize a new `QuerySet` instance, call the following method from the `Connection` instance:

```js
let querySet = connection.querySet();
```

## Supported methods


### retrieve

Only retrieves initial data and immediately removes the query from the Event Delivery Service after the response:
```js
querySet.retrieve("SELECT * FROM <YOUR-COLLECTION> WHERE key=<YOUR-KEY>", (event) => {
    console.log(`Message event: `, event);
})
```

| **Argument** | **Type** | **Requred** | **Description** |
|--------------|------------|----------|------------------------|
| `query` | `string` | Yes | SQL query to retrieve/listen  |
| `resultListener`| `function` | Yes |  [Info](/photoniq/event-delivery/clients/listeners-and-errors#result-listener) |
| `errorListener`| `function` | No |  [Info](/photoniq/event-delivery/clients/listeners-and-errors#error-listener) |
| `compress` | `boolean` | No | Compress incoming initial data.  |

### retrieveAndSubscribe

Retrieves initial data and subscribes to changes in the query:
```js
querySet.retrieveAndSubscribe("SELECT * FROM <YOUR-COLLECTION> WHERE key=<YOUR-KEY>", (event) => {
    console.log(`Message event: `, event);
})
```

| **Argument** | **Type** | **Requred** | **Description** |
|--------------|------------|----------|-------------------|
| `query` | `string` | Yes | SQL query to retrieve/listen  |
| `resultListener`| `function` | Yes |  [Info](/photoniq/event-delivery/clients/listeners-and-errors#result-listener) |
| `errorListener`| `function` | No |  [Info](/photoniq/event-delivery/clients/listeners-and-errors#error-listener) |
| `compress` | `boolean` | No | Compress incoming initial data.  |

### subscribe

Only subscribes to changes in the query:
```js
querySet.subscribe("SELECT * FROM <YOUR-COLLECTION> WHERE key=<YOUR-KEY>", (event) => {
    console.log(`Message event: `, event);
})
```

| **Argument** | **Type** | **Requred** | **Description** |
|--------------|------------|----------|-------------------|
| `query` | `string` | Yes | SQL query to retrieve/listen  |
| `resultListener`| `function` | Yes |  [Info](/photoniq/event-delivery/clients/listeners-and-errors#result-listener) |
| `errorListener`| `function` | No |  [Info](/photoniq/event-delivery/clients/listeners-and-errors#error-listener) |

### unubscribe

Removes a subscription if the query was subscribed in the `QuerySet`. This applies only to the `retrieveAndSubscribe` and `subscribe` methods:
```js
querySet.unsubscribe("SELECT * FROM <YOUR-COLLECTION> WHERE key=<YOUR-KEY>");
```

### batch

To make requests to the Event Delivery Service more efficient, it is possible to join them into one WebSocket/SSE message. This returns a `QueryBatch`  instance, which has the same methods (`retrieve`, `retrieveAndSubscribe`, `subscribe`, `unsubscribe`) as `QuerySet`.
The final method should be`assemble()`,  which builds and sends the message:
```js
let queryBatch = querySet.batch();
queryBatch
    .retrieve("SELECT * FROM <YOUR-COLLECTION> WHERE key=<YOUR-KEY>", (event) => {
       console.log(`Message event: `, event);
    })
    .retrieveAndSubscribe("SELECT * FROM <YOUR-COLLECTION> WHERE key=<YOUR-KEY>", (event) => {
       console.log(`Message event: `, event);
    })
    .subscribe("SELECT * FROM <YOUR-COLLECTION> WHERE key=<YOUR-KEY>", (event) => {
       console.log(`Message event: `, event);
    })
    .unsubscribe("SELECT * FROM <YOUR-COLLECTION> WHERE key=<YOUR-KEY>")
    .assemble();
```

### unubscribeAll

Removes all subscriptions in the `QuerySet`:
```js
querySet.unsubscribeAll();
```
