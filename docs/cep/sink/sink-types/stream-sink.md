---
title: Stream Sink
---

Stream sinks consume events from streams and publish them using multiple transports to external endpoints in various data formats.

## Purpose

Stream sink provides a way to publish stream events of a stream to external systems by converting events to their supported format.

## Syntax

To configure a stream to publish events via a sink, add the sink configuration to a stream definition by adding the `sink.type` annotation with the required parameter values.

The stream sink syntax is as follows:

```sql
   CREATE SINK SinkName WITH (type="stream", stream="STRING", replication.type="STRING", map.type='type') (strings);
```

## Query Parameters

| Name             | Description         | Default Value | Possible Data Types | Optional |
|------------------|----------------------------------|---------------|---------------------|----------|
| stream.list      | This specifies the list of streams to which the source must listen. This list can be provided as a set of comma-separated values e.g. `stream_one,stream_two` | STRING        | No                  |
| replication.type | Specifies if the replication type of the streams. Possible values can be `local` and `global`      | local         | STRING         | Yes      |

## Example 1

```sql
   CREATE SINK ProductionAlertStream WITH (type= 'stream', stream='ProductionAlertStream', map.type='json') (name string, amount double);
```
