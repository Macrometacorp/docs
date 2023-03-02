---
sidebar_position: 1
title: Sources
---

Sources receive events from multiple transports and in various data formats, and direct them into streams for processing. A source is the stream of data that the stream worker processes with queries and sends to one or more sinks.

A source configuration allows you to define a mapping in order to convert each incoming event from its native data format to a stream event. When customizations to such mappings are not provided, the stream processor assumes that the arriving event adheres to the predefined format based on the stream definition and the configured message mapping type.

## Purpose

Stream source provides a way to consume events from internal and external services and convert them to be processed by the associated stream.

## Syntax

To configure a stream that consumes events via a source, add the source configuration to a stream definition by adding the `source.type` annotation with the required parameter values.

The source syntax is as follows:

```sql
CREATE SOURCE <source_name> WITH (type = 'source_type', <static_key>='<value>', map.type='json') (<attribute1>='<attribute mapping>', <attribute2>='<attribute mapping>')
```

## Source Type

The `type` parameter of `CREATE SOURCE` annotation defines the source type that receives events. The other parameters of `source.type` annotation depends upon the selected source type, and here some of its parameters can be optional.

All source types supported by Macrometa stream workers are documented in [Source Types](source-types/index.md).

## Map Type

The `map.type` parameter specifies the format in which messages are consumed, and allows you to configure the mapping parameters, which change based of the mapping type/format selected.

For more information about the `map.type` annotation and source mapping, refer to [Source Mapping](source-mapping/index.md).

## Attributes

The `attributes` are a custom mapping based on which events to be selected into the stream processing flow are identified. This is useful when the attributes of the incoming messages you want the stream processor to consume are different to the corresponding attribute name in the stream definition.
