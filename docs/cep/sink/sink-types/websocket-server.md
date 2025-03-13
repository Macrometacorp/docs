---
title: websocket-server
---

The [WebSocket sink](websocket.md) sends events through the server which are then passed to the `example` stream. All events received by `example` stream are then sent to the WebSocket server

Clients can connect to `ws://localhost:9025/abc` to receive events from the stream.

## Syntax

```sql
CREATE SINK <NAME> WITH (type="websocket-server", map.type="<STRING>", host="<STRING>", port="<STRING>", sub.protocol="<STRING>", idle.timeout="<INT>", tls.enabled="<BOOL>", keystore.path="<STRING>", keystore.password="<STRING>"))
```

## Query Parameters


| Name | Description      | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------|---------------|---------------------|----------|---------|
| host | Host name for the WebSocket server. | - | STRING | No | No |
| port | Port number for the WebSocket server. | - | STRING | No | No |
| sub.protocol | Sub-Protocols which are allowed by the service. Use format `subprotocol1, subprotocol2,...` | `null` | STRING | Yes | No |
| idle.timeout | `-1` | INT | Yes | No |
| tls.enabled | `false` | BOOL | Yes | No |
| keystore.path | `${carbon.home}/resources/security/wso2carbon.jks` | STRING | Yes | No |
| keystore.password | `wso2carbon` | STRING | Yes | No |


## Example

```sql
CREATE SINK <NAME> WITH (type = 'websocket-server', map.type='json', host='localhost', port='8025')

CREATE STREAM example (attribute1 string, attribute2 int);
```
