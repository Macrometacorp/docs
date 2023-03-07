---
sidebar_position: 2
title: Streams and Queries Example
---

This page provides an example of streams and queries, and how multiple queries can be chained to one another.

There are multiple type of queries such as window query, join query, pattern query, and so on. Below example explains how pass-through and selection queries work. For more information, refer the [Stream Query Guide](../query-guide/).

## Example

The following is an example annotated with descriptive comments.

```sql
-- Defines `InputTemperatureStream` stream to pass events having `sensorId` and `temperature` attributes of types `string` and `double`.
CREATE STREAM InputTemperatureStream (sensorId string, temperature double);

-- Optional `@info` annotation to name the query.
@info(name = 'Pass-through')

-- Query to consume events from `InputTemperatureStream`, produce new events by selecting all the attributes from the incoming events, and outputs them to `TemperatureStream`.
INSERT INTO TemperatureAndSensorStream
SELECT *
FROM InputTemperatureStream;

@info(name = 'Simple-selection')

-- Selects only the `temperature` attribute from events, and outputs to `TemperatureOnlyStream`.
-- Consumes events from `TemperatureAndSensorStream`. The schema of the stream is inferred from the previous query, hence no need to be defined.
INSERT INTO TemperatureOnlyStream
SELECT temperature
FROM TemperatureAndSensorStream;
```

## Events at Each Stream

When an event with values [`'aq-14'`, `35.4`] is sent to `InputTemperatureStream` stream, it is converted and travels through the streams as below.

- InputTemperatureStream : [`'aq-14'`, `35.4`]
- TemperatureAndSensorStream : ['aq-14', `35.4`]
- TemperatureOnlyStream : [`35.4`]
