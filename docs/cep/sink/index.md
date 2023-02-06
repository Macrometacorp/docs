---
sidebar_position: 1
title: Sinks
---

The pages in this section show you how to use various sinks in Macrometa GDN stream workers, including streams, HTTP, and Kafka.

Sinks are used to publish events to an external source after being processed. Sinks consume events from streams and publish them via multiple transports to external endpoints in various data formats.

## Sink Configuration

A sink configuration allows users to define a mapping to convert the stream events into the required output data format, such as `JSON`, `TEXT`, and so on, and publish the events to the configured endpoints. When customizations to such mappings are not provided, the stream converts events to the predefined event format based on the stream definition and the configured message mapper type before publishing the events.

## Syntax

General syntax for creating a sink requires a sink name and definition of the `type` of sink. There are other parameters that depend on the type of sink you are using. For more information, refer to the pages in this section.

```sql
CREATE SINK <stream name> WITH (sink.type='<sink type>', <static.key>='<value>', <dynamic.key>='{{<value>}}', map.type='<map type>', <static.key>='<value>', <dynamic.key>='{{<value>}}', map.payload'<payload mapping>')) (<attribute1> <type>, <attributeN> <type>);
```

## Dynamic Properties

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
| [Kafka](sink-types/kafka.md) | Publish events to Kafka topic. |
| [stream](sink-types/stream-sink.md) | Publish events to a stream. |
| [TCP](sink-types/tcp.md) | Publish events to a TCP service. |

## Sink Mappers

You can map different sink formats using sink mappers. For more information, refer to [Sink Mapping](sink-mapping/index.md).

## Example Stream Sink

```sql
   CREATE SINK ProductionAlertStream WITH (type= 'stream', stream='ProductionAlertStream', map.type='json') (name string, amount double);
```

## Example MQTT Sink

```sql
CREATE SINK SinkStream WITH (type="mqtt", url="tcp://test.mosquitto.org:1883", topic="topicA", map.type="json", clean.session="true", message.retain="false", quality.of.service= "1", keep.alive= "60",connection.timeout="30") (startTime long);
```
