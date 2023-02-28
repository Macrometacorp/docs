---
title: Stream Sink
---

Stream sinks consume events from streams and publish them using multiple transports to external endpoints in various data formats.

## Purpose

Stream sinks provides a way to publish the events of a stream to external systems by converting events to their supported format.

## Syntax

The stream sink syntax is as follows:

```sql
   CREATE SINK SinkName WITH (type="stream", stream="STRING", replication.type="STRING", map.type='type') (strings);
```

Or you can use the syntax shortcut `CREATE SINK STREAM`:

```sql
CREATE SINK STREAM SampleStreamSink (data string);
```

## Query Parameters

| Name             | Description         | Default Value | Possible Data Types | Optional |
|------------------|----------------------------------|---------------|---------------------|----------|
| stream      | The streams to which the sink needs to publish events.|     | STRING        | No                  |
| replication.type | Specifies if the replication type of the streams. Possible values can be `local` and `global`      | local         | STRING         | Yes      |

## Example 1

```sql
CREATE SINK ProductionAlertStream WITH (type= 'stream', stream='ProductionAlertStream', map.type='json') (name string, amount double);
```

## Example 2

```sql
CREATE SINK STREAM UserIdPurchaseStream(userId string, totalItems long, totalPrice double);
```
