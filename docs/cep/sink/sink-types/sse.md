---
title: SSE
---

HTTP SSE sink sends events to all subscribers within the GDN only.

## SSE Sink Syntax

```sql
CREATE SINK <name> WITH (type="sse-server", server.port="<INT>", server.path="<STRING>", worker.count="<INT>", headers="<STRING>");
```

## SSE Sink Query Parameters

| Name         | Description |	Default Value |	Possible Data Types	| Optional | Dynamic |
|--------------|-------------|----------------|---------------------| -------- |---------|
| server.port  | The listening port of the SSE server to which clients must connect to receive events. | | INT	| No | No |
| server.path  | The listening path of the SSE server to which clients must connect to receive events. | | STRING | Yes | No |
| worker.count | The number of active worker threads to serve the incoming events .                    | 1 | INT | Yes | No |
| headers      | HTTP request headers in format.  | | STRING | Yes | No |

## SSE Sink Example

```sql
CREATE SINK  PublishStream WITH (type='sse-server', map.type="json", server.port='8020', server.path='testsse') (param1 string);
```
