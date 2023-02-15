---
title: Stream Source
---

A stream is a logical series of events ordered in time. Its schema is defined via the _stream definition_. A stream definition contains the stream name and a set of attributes with specific types and uniquely identifiable names within the stream. All events associated to the stream will have the same schema (i.e., have the same attributes in the same order).

The stream processor groups common types of events together with a schema. This helps in various ways such as, processing all events together in queries and performing data format transformations together when they are consumed and published via sources and sinks.

## Syntax

By default, all streams created by stream workers are sources. The syntax for defining a new stream in a stream worker is:

```sql
   CREATE SOURCE SinkName WITH (
      type="stream", 
      stream.list="STRING[STRING,]", 
      replication.type="STRING", 
      subscription.initial.position="STRING",
      num.consumers="INT",
      num.listener.threads="INT",
      num.io.threads="INT",
      receiver.queue.size="INT",      
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


## Parameters

The following parameters are used to configure a stream definition.

| Parameter     | Description | Default Value | Possible Data Types | Optional |
| ------------- |-------------| ------------- | ------------------- | -------- |
| stream.list | The list of streams the sources will consume events.| -    | STRING        | No                  |
| replication.type | Specifies if the replication type of the streams. Possible values can be `LOCAL` and `GLOBAL`.      | LOCAL         | STRING         | Yes      |
| subscription.initial.position | Subscription's initial position in the stream. Possible values: [Earliest,Latest]| Latest | STRING | Yes|
| `subscription.type` | Stream subscription type. Possible Values: [Exclusive, Shared, Failover, Key_Shared]. | Shared | STRING | Yes|
| num.consumers | Number of consumers. | 1 | INT | Yes |
| `num.listener.threads` | the number of listener threads | 1 | INT | Yes |
| `num.io.threads` | The number of listener threads | 1 | INT | Yes |
| `receiver.queue.size` | The number of messages accumulated by a consumer before an application calls | 1000 | INT | Yes |

To use and refer stream and attribute names that do not follow `[a-zA-Z_][a-zA-Z_0-9]*` format, enclose them in ``` ` ```. For example: ``` `$test(0)` ```

## Example

This example creates a stream called `TempStream` with the following attributes:

- `deviceID` of type `long`
- `roomNo` of type `int`
- `temp` of type `double`

```sql
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);
```
