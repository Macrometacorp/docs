---
title: CREATE STREAM as Source
sidebar_position: 40
---

A stream is a logical series of events ordered in time. Its schema is defined via the _stream definition_. A stream definition contains the stream name and a set of attributes with specific types and uniquely identifiable names within the stream. All events associated to the stream will have the same schema (i.e., have the same attributes in the same order).

The stream processor groups common types of events together with a schema. This helps in various ways such as, processing all events together in queries and performing data format transformations together when they are consumed and published via sources and sinks.

## Syntax

By default, all streams created by stream workers are sources. The syntax for defining a new stream in a stream worker is:

```sql
CREATE STREAM (GLOBAL|LOCAL)? <stream_name> (<attribute_name> <attribute_type>,
                             <attribute_name> <attribute_type>, ... );
```

## Parameters

The following parameters are used to configure a stream definition.

| Parameter     | Description |
| ------------- |-------------|
 GLOBAL or LOCAL      | Whether the stream is globally or locally replicated. Default is `LOCAL`. |
| stream name      | The name of the stream created. (By convention, stream names use `PascalCase`.) |
| attribute name   | Uniquely identifiable name of the stream attribute. (By convention, attribute names are defined in `camelCase`.)|     |
| attribute type   | The type of each attribute defined in the schema. This can be `STRING`, `INT`, `LONG`, `DOUBLE`, `FLOAT`, `BOOL`, or `OBJECT`.     |

To use and refer stream and attribute names that do not follow `[a-zA-Z_][a-zA-Z_0-9]*` format, enclose them in ``` ` ```. For example: ``` `$test(0)` ```

To make the stream process events with multi-threading and asynchronously, add `Async` to the `WITH()` property. For example: `WITH(async='true')`

## Example

This example creates a stream called `TempStream` with the following attributes:

- `deviceID` of type `long`
- `roomNo` of type `int`
- `temp` of type `double`

```sql
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);
```
