---
sidebar_position: 1
title: Basic Stream Worker Example
---

This example provides an introduction to the concept of a stream worker.

A stream worker provides an isolated execution environment for processing the execution logic. It can be deployed and processed independently of other stream workers in the system. Stream workers can use `inMemory`, `c8db`, and `c8stream` sources and sinks to communicate between each other.

## Example

This example creates a Macrometa data stream to consume events from stream workers:

```sql
CREATE STREAM TemperatureStream (sensorId string, temperature double);
```

This example creates a sink to publish events from stream workers:

```sql
CREATE SINK TemperatureOnlyStream WITH (type='inMemory', topic='Temperature') (temperature double);

@info(name = 'Simple-selection')
insert into TemperatureOnlyStream
select temperature
from TemperatureStream;
```

## Input

When an event [`'aq-14'`, `35.4`] is pushed via the `SensorDetail` topic of the `inMemory` transport from another stream worker, the event is consumed and mapped to the `TemperatureStream` stream.

## Output

After processing, the event [`35.4`] arriving at `TemperatureOnlyStream` is emitted via `Temperature` topic of the `inMemory` transport to other subscribed stream workers.
