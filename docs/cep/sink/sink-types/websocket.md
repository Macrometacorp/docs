---
title: websocket
---

The WebSocket sink sends events to be processed by Macrometa from a topic in a [WebSocket server](websocket-server.md).

All events delivered to `example` stream are also sent to the WebSocket server.

Configure the server before using the following procedure.

## Syntax

```sql
CREATE SINK <NAME> WITH (type="websocket", url="<SERVER URL>", map.type="<STRING>", sub.protocol="<STRING>", headers="<STRING>", idle.timeout="<INT>", truststore.path="<STRING>", truststore.password="<STRING>"))
```

## Query Parameters

| Name | Description      | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------|---------------|---------------------|----------|---------|
| url   | The URL of the remote endpoint. Must be `ws` or `wss`. | - | STRING | No | No |
| sub.protocol | The negotiable sub-protocol if required by server. Use format `subprotocol1, subprotocol2,...` | `null` | STRING | Yes | No |
| headers | Any specific headers which need to send to the server. Use format `'key1:value1', 'key2:value2',...` | `null` | Yes | No |
| idle.timeout | Idle timeout of the connection | `-1` | INT | Yes | No |
| truststore.path | The file path to the location of the truststore. If a custom truststore is not specified, then the system uses the default truststore file - wso2carbon.jks in the `${carbon.home}/resources/security` directory. | `${carbon.home}/resources/security/client-truststore.jks` | STRING | Yes | No |
| truststore.password | The password for the truststore. A custom password can be specified if required. | `wso2carbon` | STRING | Yes | No |

## Example

```sql
CREATE SINK <NAME> WITH (type='websocket', url ='ws://localhost:8025/websockets/abc', map.type='json')

CREATE STREAM example (attribute1 string, attribute2 int);
```
