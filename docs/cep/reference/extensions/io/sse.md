---
title: SSE
---

This an extension that receives and publishes events from SSE server.


## SSE Sink

HTTP SSE sink sends events to all subscribers.

### SSE Sink Syntax:

```js
CREATE SINK <name> WITH (type="sse-server", server.port="<INT>", server.path="<STRING>", worker.count="<INT>", headers="<STRING>");
```

### SSE Sink Query Parameters:

| Name         | Description |	Default Value |	Possible Data Types	| Optional | Dynamic |
|--------------|-------------|----------------|---------------------| -------- |---------|
| server.port  | The listening port of the SSE server which clients need to connect to receive events. | | INT	| No | No |
| server.path  | The listening path of the SSE server which clients need to connect to receive events. | | STRING | Yes | No |
| worker.count | The number of active worker threads to serve the incoming events .                    | 1 | INT | Yes | No |
| headers      | HTTP request headers in format.  | | STRING | Yes | No |



### SSE Sink Example:

```js
CREATE SINK  PublishStream WITH (type='sse-server', map.type="json", server.port='8020', server.path='testsse') (param1 string);
```




## SSE Source

HTTP SSE source send a request to a given url and listen to the response stream.


### SSE Source Syntax:

```js
CREATE SOURCE <name> WITH (type="sse-server", receiver.url="<STRING>", worker.count="<INT>", headers="<STRING>");
```

### SSE Source Query Parameters:

| Name          | Description |	Default Value |	Possible Data Types	| Optional | Dynamic |
|---------------|-------------|----------------|---------------------| -------- |---------|
| receiver.url  | The SSE endpoint URL that should be monitored.  | | STRING	| No | No |
| worker.count  | The number of active worker threads to serve the incoming events.                     | 1 | INT | Yes | No |
| headers       | HTTP request headers in format.  | | STRING | Yes | No |


### SSE Source Example:

```js
CREATE SOURCE  ListenStream WITH (type='sse', map.type="json", receiver.url='http://localhost:8020/testsse') (param1 string);
```

This query shows how to subscribe to a sse server. 