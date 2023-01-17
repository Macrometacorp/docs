---
sidebar_position: 1
title: CREATE SINK
---

The pages in this section show you how to use various sinks in Macrometa GDN stream workers, including streams, HTTP, and Kafka.

Sinks are used to publish events to an external source after being processed. Sinks consume events from streams and publish them via multiple transports to external endpoints in various data formats.

### Sink Configuration

A sink configuration allows users to define a mapping to convert the stream events into the required output data format, such as `JSON`, `TEXT`, and so on, and publish the events to the configured endpoints. When customizations to such mappings are not provided, the stream converts events to the predefined event format based on the stream definition and the configured message mapper type before publishing the events.

### Syntax

General syntax for creating a sink requires a sink name and definition of the `type` of sink. There are other parameters that depend on the type of sink you are using. For more information, refer to the pages in this section.

```sql
CREATE SINK <stream name> WITH (sink.type='<sink type>', <static.key>='<value>', <dynamic.key>='{{<value>}}', map.type='<map type>', <static.key>='<value>', <dynamic.key>='{{<value>}}', map.payload'<payload mapping>')) (<attribute1> <type>, <attributeN> <type>);
```

### Dynamic Properties

The sink and sink mapper properties that are categorized as `dynamic` have the ability to absorb attribute values
dynamically from the events of their associated streams. This can be configured by enclosing the relevant
attribute names in double curly braces as`{{...}}`, and using it within the property values.

Some valid dynamic properties values are:

- `'{{attribute1}}'`
- `'This is {{attribute1}}'`
- `{{attribute1}} > {{attributeN}}`  

The attribute names in the double curly braces are replaced with the values from the events before they are published.

## Sink Types

The `type` parameter of the `sink.type` annotation defines the sink type that publishes the events. The other parameters of the `sink.type` annotation depends upon the selected sink type, and here some of its parameters can be optional and/or dynamic.

The following is a list of some of the sink types supported by stream workers:

|Source type | Description|
| ------------- |-------------|
| [database](../query-guide/table-collection.md) | Allow the stream worker to publish events to collections (doc, graphs) in the same or different geofabric. |
| [email](sink-types/email.md) | Send emails via SMTP protocols.|
| [HTTP](sink-types/http.md| Publish events to an HTTP endpoint.|
| [Kafka](sink-types/kafka.md) | Publish events to Kafka topic. |
| [stream](sink-types/stream-sink.md) | Publish events to a stream. |
| [TCP](sink-types/tcp.md) | Publish events to a TCP service. |

## Sink Mappers

You can map different sink formats using sink mappers. For more information, refer to [Sink Mapping](sink-mapping.md).

## Example Stream Sink

```sql
   CREATE SINK ProductionAlertStream WITH (type= 'stream', stream='ProductionAlertStream', map.type='json') (name string, amount double);
```

## Example HTTP Sink

```sql
CREATE SINK <NAME> WITH (type="http", map.type="<STRING>" publisher.url="<STRING>", basic.auth.username="<STRING>", basic.auth.password="<STRING>", https.truststore.file="<STRING>", https.truststore.password="<STRING>", oauth.username="<STRING>", oauth.password="<STRING>", consumer.key="<STRING>", consumer.secret="<STRING>", token.url="<STRING>", refresh.token="<STRING>", headers="<STRING>", method="<STRING>", socket.idle.timeout="<INT>", chunk.disabled="<BOOL>", ssl.protocol="<STRING>", ssl.verification.disabled="<BOOL>", tls.store.type="<STRING>", ssl.configurations="<STRING>", proxy.host="<STRING>", proxy.port="<STRING>", proxy.username="<STRING>", proxy.password="<STRING>", client.bootstrap.configurations="<STRING>", max.pool.active.connections="<INT>", min.pool.idle.connections="<INT>", max.pool.idle.connections="<INT>", min.evictable.idle.time="<STRING>", time.between.eviction.runs="<STRING>", max.wait.time="<STRING>", test.on.borrow="<BOOL>", test.while.idle="<BOOL>", exhausted.action="<INT>", hostname.verification.enabled="<BOOL>")
```
