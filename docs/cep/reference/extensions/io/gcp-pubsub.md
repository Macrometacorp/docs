# Google Pub-Sub

This an extension that receives and publishes events from/to Google Pub/Sub.

## Features

* **[Google pubsub (Sink)](#google-pubsub-sink)**

    This sends messages to a topic in google pubsub server.

* **[Google pubsub (Source)](#google-pubsub-source)**

   This receives messages from a topic in google pubsub server.


## Google Pubsub Sink

The Google PubSub sink publishes messages to a topic in the Google PubSub server. If the required topic does not exist, Google PubSub Sink creates the topic and publishes messages to it.

Syntax:

```js
@sink(type="googlepubsub", project.id="<STRING>", topic.id="<STRING>", credential.id="<STRING>", @map(...)))
```

QUERY PARAMETERS:

| Name | Description |	Default Value |	Possible Data Types	| Optional | Dynamic |
|------|-------------|----------------|---------------------| -------- |---------|
| project.id | The unique ID of the GCP console project within which the topic is created. | | STRING	| No | No |
| topic.id | The ID of the topic to which the messages that are processed by Macrometa are published. | | STRING | No | No |
| credential.id | The unique ID of the service account credentials. | | STRING | No | No |


EXAMPLE 1:

```js
@sink(type = 'googlepubsub', @map(type= 'text'),
project.id = 'sp-path-1547649404768', 
credential.id = 'PUB_SUB_FAST',
topic.id ='topicA')
define stream InputStream(message string);
```

This query publishes messages to a topic in the Google PubSub server. Here, the messages are published to `topicA` topic in the `sp-path-1547649404768` project. If the `topicA` topic already exists in the `sp-path-1547649404768` project, messages are directly published to that topic. 

If it does not exist, a topic with that ID is newly created in the project and then, the messages are published to that topic.

## Google Pubsub Source

The Google PubSub source receives events to be processed by Macrometa from a topic in a Google PubSub server. Here, a subscriber client creates a subscription to that topic and consumes messages via the subscription. The subscription applications receive only the messages that are published after the subscription is created. 

A subscription connects a topic to a subscriber application, enabling the application to receive and process messages from that topic. A topic can have multiple subscriptions, but a given subscription belongs only to a single topic.

Syntax:

```js
@source(type="googlepubsub", project.id="<STRING>", topic.id="<STRING>", subscription.id="<STRING>", credential.id="<STRING>", @map(...)))
```

QUERY PARAMETERS:

| Name | Description |	Default Value |	Possible Data Types	| Optional | Dynamic |
|------|-------------|----------------|---------------------| -------- |---------|
| project.id | The unique ID of the GCP console project within which the topic is created. | | STRING | No | No |
| topic.id | The ID of the topic to which the messages that are processed by Macrometa are published. | | STRING | No | No |
| subscription.id | The unique ID of the subscription from which messages must be retrieved. | | STRING | No | No |
| credential.id |  The unique ID of the service account credentials. | | STRING | No | No |


EXAMPLE 1:

```js
@source(type='googlepubsub',@map(type='text'),
topic.id='topicA',
project.id='sp-path-1547649404768',
credential.id = 'PUB_SUB_FAST',
subscription.id='subA')
define stream OutputStream(message String);
```

This query shows how to subscribe to a google pubsub topic. Here, a google pubsub source subscribes to the `topicA` topic that resides in the `sp-path-1547649404768` project within a google pubsub instance. The events are received in the text format, mapped to a event, and then sent to a stream named OutputStream.