---
title: MQTT
---

The MQTT sink publishes messages to a topic in the MQTT server. If the required topic does not exist, then the MQTT sink creates the topic and publishes messages to it.

## MQTT Sink Syntax

```sql
CREATE SINK <name> WITH (type="mqtt", url="<STRING>", topic="<STRING>", map.type="<STRING>", username="<STRING>", password="<STRING>", client.id="<STRING>", quality.of.service="<STRING>", clean.session="<BOOL>", message.retain="<STRING>", keep.alive="<INT>", connection.timeout="<INT>");
```

## MQTT Sink Query Parameters

| Name | Description |	Default Value |	Possible Data Types	| Optional | Dynamic |
|------|-------------|----------------|---------------------| -------- |---------|
| url | The URL of the MQTT broker. It is used to connect to the MQTT broker. | | STRING	| No | No |
| topic | The ID of the topic to which the messages that are processed by Macrometa are published. | | STRING | No | No |
| username | The username to be provided when the MQTT client is authenticated by the broker. | | STRING | Yes | No |
| password | The password to be provided when the MQTT client is authenticated by the broker. | | STRING | Yes | No |
| client.id | A unique ID for the MQTT client. The server uses this to identify the client when it reconnects. | System generated | STRING | Yes | No |
| clean.session | This is an optional parameter. If this parameter is set to `true`, the subscriptions made by the MQTT client during a session expire when the session ends and they need to be recreated for the next session. | true | BOOL | Yes | No |
| message.retain | If this parameter is set to true, the last message sent from the topic is retained until the next message is sent. | false | STRING | Yes | No |
| keep.alive | The maximum number of seconds the connection between the MQTT client and the broker should be maintained without any events being transferred. | 60 | INT | Yes | No |
| connection.timeout | The maximum number of seconds that the MQTT client should spend attempting to connect to the MQTT broker. | 30 | INT | Yes | No |
| quality.of.service | The quality of service provided by the MQTT client. | 1 | STRING | Yes | No |

## MQTT Sink Example

```sql
CREATE SINK SinkStream WITH (type="mqtt", url="tcp://test.mosquitto.org:1883", topic="topicA", map.type="json", clean.session="true", message.retain="false", quality.of.service= "1", keep.alive= "60",connection.timeout="30") (startTime long);
```

This query publishes messages to a topic in the MQTT server. Here, the messages are published to `topicA` topic.
