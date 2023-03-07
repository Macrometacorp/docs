---
title: SSE
---

HTTP SSE source sends a request to a given URL and listens to the response stream.

## SSE Source Syntax

```sql
CREATE SOURCE <name> WITH (type="sse-server", receiver.url="<STRING>", worker.count="<INT>", headers="<STRING>");
```

## SSE Source Query Parameters

| Name          | Description |	Default Value |	Possible Data Types	| Optional | Dynamic |
|---------------|-------------|----------------|---------------------| -------- |---------|
| receiver.url  | The SSE endpoint URL that should be monitored.  | | STRING	| No | No |
| worker.count  | The number of active worker threads to serve the incoming events.                     | 1 | INT | Yes | No |
| headers       | HTTP request headers in format.  | | STRING | Yes | No |

## SSE Source Example

```sql
CREATE SOURCE  ListenStream WITH (type='sse', map.type="json", receiver.url='http://localhost:8020/testsse') (param1 string);
```

This query shows how to subscribe to an SSE server.
