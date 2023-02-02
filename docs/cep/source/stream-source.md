---
title: Stream Source
---

GENERIC SOURCE CONTENT

Streams used as sources receive events via multiple transports and in various data formats, and direct them into streams for processing.

A source configuration allows to define a mapping in order to convert each incoming event from its native data format to a stream event. When customizations to such mappings are not provided, stream processor assumes that the arriving event adheres to the predefined format based on the stream definition and the configured message mapping type.

## Purpose

Stream source provides a way to consume events from internal and external services and convert them to be processed by the associated stream.

## Syntax

To configure a stream that consumes events via a source, add the source configuration to a stream definition by adding the `source.type` annotation with the required parameter values.

The source syntax is as follows:

```sql
CREATE SOURCE <source_name> WITH (type = 'source_type', <static_key>='<value>', map.type='json') (<attribute1>='<attribute mapping>', <attribute2>='<attribute mapping>')
```

This syntax includes the following annotations.

### Source

The `type` parameter of `CREATE SOURCE` annotation defines the source type that receives events. The other parameters of `source.type` annotation depends upon the selected source type, and here some of its parameters can be optional.

### Supported Stream Source Types

The following is the list of some source types supported by stream workers. For a full list, refer to [Source Types](source-types/index.md).

|Source type | Description|
| ------------- |-------------|
| `database` | Allow the stream worker to consume events from collections (doc, graphs) running in the same or different geo fabric. |
| `stream` | Allow the stream worker to consume events from streams (local, geo-replicated) running in the same or different geo fabric. |
| `kafka` | Subscribe to Kafka topic to consume events.|

### Source Mapper

Each `source.type` configuration can have a mapping denoted by the `map.type` annotation that defines how to convert the incoming event format to Stream events.

The `type` parameter of the `map.type` defines the map type to be used in converting the incoming events. The other parameters of `map.type` annotation depends on the mapper selected, and some of its parameters can be optional.

For detailed information about the parameters see the documentation of the relevant mapper.

### Map Attributes

`attributes` is an optional annotation used with `map.type` to define custom mapping. When `attributes` is not provided, each mapper assumes that the incoming events adheres to its own default message format and attempt to convert the events from that format. By adding the `attributes` annotation, users can selectively extract data from the incoming message and assign them to the attributes.

There are two ways to configure `attributes`. In both cases, add the attributes in parentheses after the query:

- Define attribute names as keys, and mapping configurations as values:

  ```js
  ... ( <attribute1>='<mapping>', <attributeN>='<mapping>')
  ```

- Define the mapping configurations in the same order as the attributes defined in stream definition:

  ```js
  ... ( '<mapping for attribute1>', '<mapping for attributeN>')
  ```

### Supported Source Mapping Types

The following is the list of source mapping types supported by stream.

|Source mapping type | Description|
| ------------- |-------------|
| [CSV](source-mapping/csv.md) | Converts CSV-like delimiter separated events to stream events.|
| [JSON](source-mapping/json.md) | Converts JSON messages to stream events.|
| [Key-Value](source-mapping/keyvalue.md) | Converts key-value hash maps to stream events.|
| [PassThrough](source-mapping/passThrough.md) | Omits data conversion on stream events.|
| [Text](source-mapping/text.md) | Converts plain text messages to stream events.|

:::tip
When the `map.type` annotation is not provided `map.type='passThrough'` is used as default, that passes the consumed stream events directly to the streams without any data conversion.
:::

## Example 1

Receive `JSON` messages via `stream`, and direct them to `InputStream` stream for processing. The stream expects the `JSON` messages to be on the default data format that's supported by the `JSON` mapper as follows.

```json
{
  "name":"Paul",
  "age":20,
  "country":"UK"
}
```

The configuration of the `stream` source and `JSON` source mapper to achieve the above is as follows.

```sql
CREATE SOURCE InputStream WITH (source.type='stream', streams.list='foo', map.type='json') (name string, age int, country string);
```

## Example 2

Receive `JSON` messages via `database`, and direct them to `StockStream` stream for processing. Here the incoming `JSON`, as given below, do not adhere to the default data format that's supported by the `JSON` mapper.

```json
{
  "portfolio":{
    "stock":{
      "volume":100,
      "company":{
        "symbol":"FB"
      },
      "price":55.6
    }
  }
}
```

The configuration of the `database` source and the custom `JSON` source mapping to achieve the above is as follows.

```sql
CREATE SOURCE StockStream WITH (source.type='database', collection='foo', map.type='json', enclosing.element="$.portfolio",) (symbol = "stock.company.symbol", price = "stock.price", volume = "stock.volume");
```

The same can also be configured by omitting the attribute names as below.

```sql
CREATE SOURCE StockStream WITH (source.type='database', collection='foo', map.type='json', enclosing.element="$.portfolio",) ("stock.company.symbol", "stock.price", "stock.volume");
```

## Error Handling at Stream Source

When errors are thrown by stream elements subscribed to the stream, the error gets propagated up to the stream that delivered the event to those stream elements. By default the error is logged and dropped at the stream, but this behavior can be altered by by adding `OnError` property to the corresponding stream definition.

### OnError Property

`OnError` property can help users to capture the error and the associated event, and handle them gracefully by sending them to a fault stream.

The `OnError` property and the required `action` to be specified as below.

```sql
CREATE SOURCE <stream name> WITH (OnError.action='<action>') (<attribute name> <attribute type>, <attribute name> <attribute type>, ... );
```

The `action` parameter of the `OnError` property defines the action to be executed during failure scenarios.

The following actions can be specified to `OnError` property to handle erroneous scenarios.

- `STREAM`: Creates a fault stream and redirects the event and the error to it. The created fault stream will have all the attributes defined in the base stream to capture the error causing event, and in addition it also contains `_error` attribute of type `object` to containing the error information. The fault stream can be referred by adding `!` in front of the base stream name as `!<stream name>`.

### Example

Handle errors in `TempStream` by redirecting the errors to a fault stream.

The configuration of `TempStream` stream and `OnError` property is as follows:

```sql
CREATE STREAM TempStream WITH(OnError.action="STREAM") (deviceID long, roomNo int, temp double;
```

Stream infers and automatically defines the fault stream of `TempStream` as given below.

```sql
CREATE STREAM !TempStream (deviceID long, roomNo int, temp double, _error object);
```

The stream worker extends the above use case by adding failure generation and error handling with the use of queries is as follows.

```sql
-- Define fault stream to handle error occurred at TempStream subscribers

CREATE STREAM TempStream WITH(OnError.action="STREAM") (deviceID long, roomNo int, temp double;

-- Handling error by simply logging the event and error.
@name('handle-error')
insert into IgnoreStream
select deviceID, roomNo, temp, _error
from !TempStream#log("Error Occurred!");
```
