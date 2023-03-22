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
CREATE SINK <stream name> WITH (
   type='<sink type>', 
   <static.key>='<value>', 
   <dynamic.key>='{{<value>}}', 
   map.type='<map type>', 
   <static.key>='<value>', 
   <dynamic.key>='{{<value>}}', 
   map.payload'<payload mapping>'
 )) (
     <attribute1> <type>, 
     <attributeN> <type>);
```

A sink configuration consists of three parts.

### Sink Type

The `type` parameter defines the sink type that publishes the events. The other parameters of the `sink.type` annotation depends upon the selected sink type, and here some of its parameters can be optional and dynamic.

For a full list of sink types supported by Macrometa stream workers, refer to [Sink Types](sink-types/index.md) and to [Tables](../table/).

### Map Type

The `map.type` parameter specifies the format in which the data is published and allows you to configure the mapping parameters, which change based of the mapping type/format selected.

For the complete list of supported mapping types, see [Sink Mapping](sink-mapping/index.md).

### Attributes

The `attributes` parameter specifies a custom mapping based on which events in the streaming integration flow that need to be published are identified. This is useful when the attributes of the output messages you want the stream worker to publish are different to the corresponding attribute name in the stream definition.

For example, in a scenario where the stream worker is publishing the average temperature per second, the temperature can be referred to as  `avgTemp` in the output stream definition in your stream worker. However, you want to publish it with the `Temperature` to the streaming application to which you are publishing. In this instance, you need a custom mapping to indicate that `Temperature` is the same as `avgTemp`.

## Dynamic Properties

The sink and sink mapper properties that are categorized as `dynamic` have the ability to absorb attribute values
dynamically from the events of their associated streams. This can be configured by enclosing the relevant
attribute names in double curly braces as`{{...}}`, and using it within the property values.

Some valid dynamic properties values are:

- `'{{attribute1}}'`
- `'This is {{attribute1}}'`
- `{{attribute1}} > {{attributeN}}`  

The attribute names in the double curly braces are replaced with the values from the events before they are published.

## Example Stream Sink

```sql
   CREATE SINK ProductionAlertStream WITH (type= 'stream', stream='ProductionAlertStream', map.type='json') (name string, amount double);
```

## Example MQTT Sink

```sql
CREATE SINK SinkStream WITH (
   type="mqtt", 
   url="tcp://test.mosquitto.org:1883", 
   topic="topicA", 
   map.type="json", 
   clean.session="true", 
   message.retain="false", 
   quality.of.service= "1", 
   keep.alive= "60",
   connection.timeout="30"
) (
    startTime long
);
```
