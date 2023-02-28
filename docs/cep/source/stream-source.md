---
title: Stream Source
sidebar_position: 40
---

A stream is a logical series of events ordered in time. Its schema is defined via the _stream definition_. A stream definition contains the stream name and a set of attributes with specific types and uniquely identifiable names within the stream. All events associated to the stream will have the same schema (i.e., have the same attributes in the same order).

The stream processor groups common types of events together with a schema. This helps in various ways such as, processing all events together in queries and performing data format transformations together when they are consumed and published via sources and sinks.

## Syntax

By default, all streams created by stream workers are sources.

### CREATE STREAM

The syntax for defining a new stream in a stream worker is:

```sql
CREATE STREAM (GLOBAL|LOCAL)? <stream_name> (<attribute_name> <attribute_type>,
                             <attribute_name> <attribute_type>, ... );
```

### CREATE STREAM AS SELECT

The `CREATE STREAM AS SELECT` statement creates a new stream by selecting data from an existing stream and applying filters or transformations. The new stream can be used for further processing, analysis, or visualization.

```sql
CREATE STREAM <stream_name> (<attribute_name> <attribute_type>, ...)
[WITH ( property_name = expression [, ...] )]
  AS SELECT  select_expr [, ...]
FROM from_stream … ;
```

## Parameters

The following parameters are used to configure a stream definition.

| Parameter     | Description |
| ------------- |-------------|
 GLOBAL or LOCAL      | Whether the stream is globally or locally replicated. Default is `LOCAL`. |
| stream name      | The name of the stream created. (By convention, stream names use `PascalCase`.) |
| attribute name   | Uniquely identifiable name of the stream attribute. (By convention, attribute names are defined in `camelCase`.)|     |
| attribute type   | The type of each attribute defined in the schema. This can be `STRING`, `INT`, `LONG`, `DOUBLE`, `FLOAT`, `BOOL`, or `OBJECT`.     |
| [WITH (property_name = expression [, ...])] | Optional properties for the new stream, such as a time-to-live or a partition key. |
| SELECT select_expr [, ...] | The selection criteria for the new stream. |
| FROM from_stream … | The name of the existing stream to select data from. This can include a window or aggregation. |

To use and refer stream and attribute names that do not follow `[a-zA-Z_][a-zA-Z_0-9]*` format, enclose them in ``` ` ```. For example: ``` `$test(0)` ```

To make the stream process events with multi-threading and asynchronously, add `Async` to the `WITH()` property. For example: `WITH(async='true')`

## Example 1

```sql
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);
```

This example creates a stream called `TempStream` with the following attributes:

- `deviceID` of type `long`
- `roomNo` of type `int`
- `temp` of type `double`

## Example 2

```sql
CREATE STREAM StockStream (symbol string, price float, volume long)
AS SELECT symbol, price, volume
FROM InputStream[price > 500] WINDOW SLIDING_LENGTH(1);
```

In this example, `StockStream` is created with three attributes: `symbol`, `price`, and `volume`. The new stream is created by selecting data from `InputStream`, where the price is greater than 500, and applying a [SLIDING_LENGTH window](../windows/window-types/sliding-length) with a length of 1. The resulting stream will contain only those tuples from `InputStream` where the price is greater than 500, and will have the attributes `symbol`, `price`, and `volume`.
