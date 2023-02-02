---
title: Google Pubsub
---

The Google PubSub source receives events to be processed by Macrometa from a topic in a Google PubSub server. Here, a subscriber client creates a subscription to that topic and consumes messages via the subscription. The subscription applications receive only the messages that are published after the subscription is created.

A subscription connects a topic to a subscriber application, enabling the application to receive and process messages from that topic. A topic can have multiple subscriptions, but a given subscription belongs only to a single topic.

## Syntax

```js
CREATE SOURCE <name> WITH (type="googlepubsub", project.id="<STRING>", topic.id="<STRING>", subscription.id="<STRING>", credential.id="<STRING>", map.type="<STRING>")
```

## Query Parameters

| Name | Description |	Default Value |	Possible Data Types	| Optional | Dynamic |
|------|-------------|----------------|---------------------| -------- |---------|
| project.id | The unique ID of the GCP console project within which the topic is created. | | STRING | No | No |
| topic.id | The ID of the topic to which the messages that are processed by Macrometa are published. | | STRING | No | No |
| subscription.id | The unique ID of the subscription from which messages must be retrieved. | | STRING | No | No |
| credential.id |  The unique ID of the service account credentials. | | STRING | No | No |

## Example 1

```js
CREATE SOURCE OutputStream WITH (type='googlepubsub', map.type='text', topic.id='topicA', project.id='sp-path-1547649404768', credential.id = 'PUB_SUB_FAST', subscription.id='subA') (message String);
```

This query shows how to subscribe to a google pubsub topic. Here, a google pubsub source subscribes to the `topicA` topic that resides in the `sp-path-1547649404768` project within a google pubsub instance. The events are received in the text format, mapped to a event, and then sent to a stream named OutputStream.
