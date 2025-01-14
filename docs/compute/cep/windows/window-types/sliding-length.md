---
title: SLIDING_LENGTH()
---

A _sliding length window_ that holds the last `length` events at a given time, and gets updated for each arrival and expiration.

## Syntax

    WINDOW SLIDING_LENGTH(length <INT>)

## Query Parameters

| Name          | Description     | Default Value | Possible Data Types | Optional | Dynamic |
|----------|---------------------------------------|-------------|-----------------|----------|---------|
| length | The number of events that should be included in a sliding length window. |          | INT        | No       | No      |

## Example 1

```sql
CREATE STREAM cseEventStream (symbol string, price float, volume int);
CREATE WINDOW StockEventWindow (symbol string, price float, volume int) SLIDING_LENGTH(10) output all events;
CREATE SINK STREAM OutputStream (symbol string, price double);

@info(name = 'query0')
INSERT INTO StockEventWindow
FROM cseEventStream;

@info(name = 'query1')
INSERT all events INTO OutputStream 
SELECT symbol, sum(price) AS price
FROM StockEventWindow;
```

This query processes the last 10 events in a sliding manner.

## Example 2

This example shows aggregating events based on event count in a sliding manner.

### Stream Worker Code

```sql
CREATE STREAM TemperatureStream(sensorId string, temperature double);

CREATE SINK STREAM OverallTemperatureStream(avgTemperature double, maxTemperature double, numberOfEvents long);
CREATE SINK STREAM SensorIdTemperatureStream(sensorId string, avgTemperature double, maxTemperature double);

@info(name = 'Overall-analysis')
INSERT INTO OverallTemperatureStream
-- Calculate average, maximum, and count for `temperature` attribute.
SELECT avg(temperature) AS avgTemperature,
       max(temperature) AS maxTemperature,
       count() as numberOfEvents
-- Aggregate last `4` events in a sliding manner.
FROM TemperatureStream WINDOW SLIDING_LENGTH(4);


@info(name = 'SensorId-analysis')
INSERT INTO SensorIdTemperatureStream
SELECT sensorId,
-- Calculate average, and maximum for `temperature`, by grouping events by `sensorId`.
       avg(temperature) AS avgTemperature,
       max(temperature) AS maxTemperature
-- Aggregate last `5` events in a sliding manner.
FROM TemperatureStream WINDOW SLIDING_LENGTH(5)
GROUP BY sensorId
-- Output events only when `avgTemperature` is greater than or equal to `20.0`.
WHERE avgTemperature >= 20.0;
```

### Sliding Event Count Aggregation Behavior

When events are sent to `TemperatureStream`, the following events are emitted at `OverallTemperatureStream` via the `Overall-analysis` query, and `SensorIdTemperatureStream` via the `SensorId-analysis` query.

| Input to `TemperatureStream` | Output at `OverallTemperatureStream` | Output at `SensorIdTemperatureStream` |
|---|---|---|
| [`'1001'`, `19.0`] | [`19.0`, `19.0`, `1`]  | No events, as having <br/>condition not satisfied <br/>for `'1001'`. |
| [`'1002'`, `26.0`] | [`22.5`, `26.0`, `2`]  | [`'1002'`, `26.0`, `26.0`] |
| [`'1002'`, `24.0`] | [`23.0`, `26.0`, `3`]  | [`'1002'`, `25.5`, `24.0`] |
| [`'1001'`, `20.0`] | [`22.5`, `26.0`, `4`]  | No events, as having <br/>condition not satisfied <br/>for `'1001'`. |
| [`'1001'`, `21.0`] | [`22.75`, `26.0`, `4`] | [`'1001'`, `20.0`, `19.0`] |
| [`'1001'`, `22.0`] | [`21.75`, `24.0`, `4`]  | [`'1001'`, `21.0`, `20.0`] |
