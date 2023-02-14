---
title: SLIDING_TIME() 
---

A _sliding time window_ that holds events that arrived during the last window time period at a given time, and gets updated for each event arrival and expiration.

## Syntax

    WINDOW SLIDING_TIME(time <INT|LONG|TIME>)

## Query Parameters

| Name        | Description           | Default Value | Possible Data Types | Optional | Dynamic |
|-------------|-----------------------|---------------|---------------------|----------|---------|
| time | The sliding time period for which the window should hold events. |               | INT LONG TIME       | No       | No      |

## Example 1

```sql
CREATE STREAM cseEventStream (symbol string, price float, volume int);
CREATE WINDOW cseEventWindow (symbol string, price float, volume int) SLIDING_TIME(20) output all events;
CREATE SINK STREAM OutputStream (symbol string, price double);

@info(name = 'query0')
INSERT INTO cseEventWindow
FROM cseEventStream;

@info(name = 'query1')
INSERT all events INTO OutputStream 
SELECT symbol, sum(price) AS price
FROM cseEventWindow;
```

This query processes events that arrived within the last 20 milliseconds.

## Example 2

This example shows aggregating events over time in a sliding manner.

### Stream Worker Code

```sql
CREATE STREAM TemperatureStream(sensorId string, temperature double);

CREATE SINK STREAM OverallTemperatureStream(avgTemperature double, maxTemperature double, numberOfEvents long);
CREATE SINK STREAM SensorIdTemperatureStream(sensorId string, avgTemperature double, maxTemperature double);

@info(name = 'Overall-analysis')
INSERT ALL events INTO OverallTemperatureStream
-- Calculate average, maximum, and count for `temperature` attribute.
SELECT avg(temperature) AS avgTemperature,
       max(temperature) AS maxTemperature,
       count() AS numberOfEvents
-- Aggregate events over `1 minute` sliding window
FROM TemperatureStream WINDOW SLIDING_TIME(1 min);
-- Output when events are added, and removed (expired) from `window time()`.


@info(name = 'SensorId-analysis')
INSERT INTO SensorIdTemperatureStream
SELECT sensorId,
-- Calculate average, and maximum for `temperature`, by grouping events by `sensorId`.
       avg(temperature) AS avgTemperature,
       max(temperature) AS maxTemperature
-- Aggregate events over `30 seconds` sliding window
FROM TemperatureStream WINDOW SLIDING_TIME(30 sec)       
GROUP BY sensorId
-- Output events only when `avgTemperature` is greater than `20.0`.
WHERE avgTemperature > 20.0;
-- Output only when events are added to `window time()`.
```

### Sliding Time Aggregation Behavior

When events are sent to `TemperatureStream`, the following events are emitted at `OverallTemperatureStream` via the `Overall-analysis` query, and `SensorIdTemperatureStream` via the `SensorId-analysis` query.

|Time | Input to `TemperatureStream` | Output at `OverallTemperatureStream` | Output at `SensorIdTemperatureStream` |
|---|---|---|---|
| 9:00:00 | [`'1001'`, `18.0`] | [`18.0`, `18.0`, `1`]  | No events, as having <br/>condition not satisfied.|
| 9:00:10 | [`'1002'`, `23.0`] | [`20.5`, `23.0`, `2`]  | [`'1002'`, `23.0`, `23.0`] |
| 9:00:20 | [`'1002'`, `22.0`] | [`21.0`, `23.0`, `3`]  | [`'1002'`, `22.5`, `22.0`] |
| 9:00:40 | -                  | - | No events, as expired <br/>events are not emitted. |
| 9:00:50 | -                  | - | No events, as expired <br/>events are not emitted. |
| 9:00:00 | -                  | [`22.5`, `23.0`, `2`]  | - |
| 9:01:10 | [`'1001'`, `17.0`] | [`19.5`, `22.0`, `2`]  | - |
| 9:01:20 | -                  | [`17.0`, `17.0`, `1`]  | - |
| 9:02:10 | -                  | [`null`, `null`, `0`]  | - |
