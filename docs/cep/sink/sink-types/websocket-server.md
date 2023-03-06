---
title: websocket-server
---

The [WebSocket sink](websocket.md) sends events to be processed by Macrometa from a topic in a WebSocket server.

Under this configuration, GDN receives events via the WebSocket server and they are passed to Foo stream for processing.

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
CREATE SINK <NAME> WITH (type = 'websocket-server', map.type='xml', host='localhost', port='8025')

CREATE STREAM example (attribute1 string, attribute2 int);
```
