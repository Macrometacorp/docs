---
title: Google Pub-Sub
---

The Google PubSub sink publishes messages to a topic in the Google PubSub server. If the required topic does not exist, Google PubSub Sink creates the topic and publishes messages to it.

## Syntax

```sql
CREATE SINK <name> WITH (type="googlepubsub", project.id="<STRING>", topic.id="<STRING>", credential.path="<STRING>", map.type=<"STRING>")
```

## Query Parameters

| Name | Description |	Default Value |	Possible Data Types	| Optional | Dynamic |
|------|-------------|----------------|---------------------| -------- |---------|
| project.id | The unique ID of the GCP console project within which the topic is created. | | STRING	| No | No |
| topic.id | The ID of the topic to which the messages that are processed by Macrometa are published. | | STRING | No | No |
| credential.path | The path to the service account credentials. | | STRING | No | No |

## Example 1

```sql
CREATE SINK InputStream WITH (type = 'googlepubsub', map.type= 'text', project.id = 'sp-path-1547649404768', credential.path = '<path-to-credentials>', topic.id ='topicA') (message string);
```

This query publishes messages to a topic in the Google PubSub server. Here, the messages are published to `topicA` topic in the `sp-path-1547649404768` project. If the `topicA` topic already exists in the `sp-path-1547649404768` project, messages are directly published to that topic.

If it does not exist, a topic with that ID is newly created in the project and then, the messages are published to that topic.
