---
title: MQTT
---

The MQTT source receives events to be processed by Macrometa from a topic in the MQTT server.

## MQTT Source Syntax

```sql
CREATE SOURCE <name> WITH (type='mqtt', url= '<STRING>',  topic='<STRING>', map.type='<STRING>', username="<STRING>", password="<STRING>", client.id="<STRING>", quality.of.service="<STRING>", clean.session="<BOOL>", message.retain="<STRING>", keep.alive="<INT>", connection.timeout="<INT>);
```

## MQTT Source Query Parameters

| Name | Description |	Default Value |	Possible Data Types	| Optional | Dynamic |
|------|-------------|----------------|---------------------| -------- |---------|
| url | The URL of the MQTT broker. It is used to connect to the MQTT broker. | | STRING	| No | No |
| topic | The ID of the topic to which the messages that are processed by Macrometa are published. | | STRING | No | No |
| username | The username to be provided when the MQTT client is authenticated by the broker. | | STRING | Yes | No |
| password | The password to be provided when the MQTT client is authenticated by the broker. | | STRING | Yes | No |
| client.id | A unique ID for the MQTT client. The server uses this to identify the client when it reconnects. | System Generated | STRING | Yes | No |
| clean.session | This is an optional parameter. If this parameter is set to `true`, the subscriptions made by the MQTT client during a session expire when the session ends and they need to be recreated for the next session. | true | BOOL | Yes | No |
| keep.alive | The maximum number of seconds the connection between the MQTT client and the broker should be maintained without any events being transferred. | 60 | INT | Yes | No |
| connection.timeout | The maximum number of seconds that the MQTT client should spend attempting to connect to the MQTT broker. | 30 | INT | Yes | No |
| quality.of.service | The quality of service provided by the MQTT client. | 1 | STRING | Yes | No |

## Parameters Example

```sql
CREATE SOURCE SourceStream WITH (type='mqtt', url= 'tcp://test.mosquitto.org:1883',  topic='demo1', map.type='json', clean.session="true", quality.of.service= "1", keep.alive= "60",connection.timeout="30") (startTime long);
```

This query shows how to subscribe to an MQTT topic.
