---
sidebar_position: 4
title: Source and Sink Example
---

Sources and sinks are used to consume and publish events to external systems.

There are multiple source and sink types, but this example only explains Macrometa source with a stream sink. For more info refer to [Sources](../../source/) and [Sinks](../../sink/).

## Example

This example creates a source from which a stream consumes JSON messages:

```sql
-- Macrometa collection source to consume `JSON` messages from.
CREATE SOURCE TemperatureStream WITH (type='database', collection='TemperatureStream', collection.type="doc", replication.type="global", map.type='json') (sensorId string, temperature double);
```

This example creates a sink to log events that arrive from a stream called `TemperatureOnlyStream` with the `temperature` attribute of type `double`:

```sql
CREATE SINK TemperatureOnlyStream WITH (type='stream', stream="TemperatureOnlyStream", replication.type="local", map.type='json') (temperature double);

@info(name = 'Simple-selection')
INSERT INTO TemperatureOnlyStream
SELECT temperature
FROM TemperatureStream;
```

## Input

When a JSON message is written to the collection `TemperatureStream`, it automatically gets mapped to an event in the `TemperatureStream` stream.

```json
{
    "sensorId":"aq-14",
    "temperature":35.4
}
```

To process custom input messages, refer to [Sink Mapping](../../sink/sink-mapping/index.md).

## Output

After processing, the event arriving at `TemperatureOnlyStream` will be emitted via `c8stream` sink.

The message is published to `TemperatureOnlyStream` as

```json
{"temperature":"35.4"}
```

To output messages using other message formats, refer to [Source Mapping](../../source/source-mapping/index.md).
