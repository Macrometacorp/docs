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
   CREATE SOURCE (GLOBAL|LOCAL)? StreamName WITH (
      type="stream", 
      stream.list="STRING[STRING,]", 
      replication.type="STRING", 
      subscription.initial.position="STRING",
      subscription.type="STRING",
      num.consumers="INT",
      num.listener.threads="INT",
      num.io.threads="INT",
      receiver.queue.size="INT",
      stream.url="STRING",
      stream.admin.url="STRING",
      auth.plugin="STRING",
      auth.params="STRING",
      map.type='type')  
    (<attribute_name> <attribute_type>[,
     <attribute_name> <attribute_type>] );
```

Or you can use the syntax shortcut `CREATE STREAM`:

```sql
CREATE STREAM <stream_name> <GLOBAL | LOCAL> (<attribute_name> <attribute_type>,
                             <attribute_name> <attribute_type>, ... );
```

Or you can use the syntax shortcut for local stream `CREATE STREAM`:

```sql
CREATE SINK STREAM  SampleStreamSink (data string);
```

## Query Parameters

The following parameters are used to configure a stream definition.

| Parameter     | Description | Default Value | Possible Data Types | Optional |
| ------------- |-------------| ------------- | ------------------- | -------- |
| GLOBAL or LOCAL      | Whether the stream is globally or locally replicated. Default is `LOCAL`. |
| stream.list | The list of streams the sources will consume events. | -    | STRING        | No                  |
| replication.type | Specifies if the replication type of the streams. Possible values can be `LOCAL` and `GLOBAL`.      | LOCAL         | STRING         | Yes      |
| subscription.initial.position | Subscription's initial position in the stream. Possible values: [Earliest,Latest]. | Latest | STRING | Yes|
| subscription.type | Stream subscription type. Possible Values: [Exclusive, Shared, Failover, Key_Shared]. | Shared | STRING | Yes|
| subscription.mode | In `Durable` subscription mode, the cursor is durable, which retains events and persists the current position. If a stream worker is updated, re-published, or restarts from a failure, then it can recover so that events can continue to be consumed from the last consumed position.<br /> If the subscription mode is `NonDurable` and a stream worker is updated, re-published, or restarts from a failure, then the cursor is lost and can never be recovered, so that events can not continue to be consumed from the last consumed position. Possible Values: [Durable, NonDurable]. | Durable | STRING | Yes|
| num.consumers | Number of consumers. | 1 | INT | Yes |
| num.listener.threads | The number of listener threads. | 1 | INT | Yes |
| num.io.threads | The number of listener threads. | 1 | INT | Yes |
| receiver.queue.size | The number of messages accumulated by a consumer before an application calls. | 1000 | INT | Yes |
| stream.url | The URL of the Pulsar broker, e.g. pulsar_ssl://my-broker:6651. | NULL | STRING | Yes |
| stream.admin.url | The admin URL of the Pulsar broker, e.g. https://my-broker:443. | NULL | STRING | Yes |
| auth.plugin | The required autentication plugin, e.g. org.apache.pulsar.client.impl.auth.AuthenticationToken. | NULL | STRING | Yes |
| auth.params | The required autentication parameters, e.g. JWT in case auth.plugin="org.apache.pulsar.client.impl.auth.AuthenticationToken". | NULL | STRING | Yes |
| [WITH (property_name = expression [, ...])] | Optional properties for the new stream, such as a time-to-live or a partition key. |
| SELECT select_expr [, ...] | The selection criteria for the new stream. |
| FROM from_stream … | The name of the existing stream to select data from. This can include a window or aggregation. |

To use and refer stream and attribute names that do not follow `[a-zA-Z_][a-zA-Z_0-9]*` format, enclose them in ``` ` ```. For example: ``` `$test(0)` ```

## Example 1

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
