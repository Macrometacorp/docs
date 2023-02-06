---
sidebar_position: 1
title: Source Mapping
---

Each `source.type` configuration can have a mapping denoted by the `map.type` annotation that defines how to convert the incoming event format to Stream events.

The `type` parameter of the `map.type` defines the map type to be used in converting the incoming events. The other parameters of `map.type` annotation depends on the mapper selected, and some of its parameters can be optional.

For detailed information about the parameters see the documentation of the relevant mapper.

## Map Attributes

`attributes` is an optional annotation used with `map.type` to define custom mapping. When `attributes` is not provided, each mapper assumes that the incoming events adheres to its own default message format and attempt to convert the events from that format. By adding the `attributes` annotation, you can selectively extract data from the incoming message and assign them to the attributes.

There are two ways to configure `attributes`. In both cases, add the attributes in parentheses after the query:

- Define attribute names as keys, and mapping configurations as values:

  ```js
  ... ( <attribute1>='<mapping>', <attributeN>='<mapping>')
  ```

- Define the mapping configurations in the same order as the attributes defined in stream definition:

  ```js
  ... ( '<mapping for attribute1>', '<mapping for attributeN>')
  ```

## Supported Source Mapping Types

The following is the list of some source mapping types supported by stream.

|Source Mapping Type | Description|
| ------------- |-------------|
| [CSV](csv.md) | Converts CSV-like delimiter separated events to stream events.|
| [JSON](json.md) | Converts JSON messages to stream events.|
| [Key-Value](keyvalue.md) | Converts key-value hash maps to stream events.|
| [PassThrough](passThrough.md) | Omits data conversion on stream events.|
| [Text](text.md) | Converts plain text messages to stream events.|

:::tip
When the `map.type` annotation is not provided `map.type='passThrough'` is used as default, that passes the consumed stream events directly to the stream worker without any data conversion.
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

The configuration of the `stream` source and `JSON` source mapper to achieve the above is:

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

The configuration of the `database` source and the custom `JSON` source mapping to achieve the above is:

```sql
CREATE SOURCE StockStream WITH (source.type='database', collection='foo', map.type='json', enclosing.element="$.portfolio",) (symbol = "stock.company.symbol", price = "stock.price", volume = "stock.volume");
```

The same can also be configured by omitting the attribute names as below:

```sql
CREATE SOURCE StockStream WITH (source.type='database', collection='foo', map.type='json', enclosing.element="$.portfolio",) ("stock.company.symbol", "stock.price", "stock.volume");
```
