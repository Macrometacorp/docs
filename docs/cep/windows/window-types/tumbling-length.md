---
title: TUMBLING_LENGTH()
---

A batch (tumbling) length window that holds and process a number of events as specified in the `length`.

## Syntax

    WINDOW TUMBLING_LENGTH(length <INT>)
    WINDOW TUMBLING_LENGTH(length <INT>, current.event <BOOL>)

## Query Parameters

| Name      | Description       | Default Value | Possible Data Types | Optional | Dynamic |
|-----------|---------------------|------------|--------------|----------|---------|
| length        | The number of events the window should tumble.        |      | INT  | No       | No      |
| current.event | Let the window stream the current events out as and when they arrive to the window while expiring them in batches. | false | BOOL    | Yes      | No      |

## Example 1

```sql
CREATE STREAM InputEventStream (symbol string, price float, volume int);
CREATE SINK STREAM OutputStream (symbol string, price double);

@info(name = 'query1')
INSERT INTO OutputStream
SELECT symbol, sum(price) AS price
FROM InputEventStream WINDOW TUMBLING_LENGTH(10);
```

This collect and process 10 events as a batch and output them.

## Example 2

```sql
CREATE STREAM InputEventStream (symbol string, price float, volume int);
CREATE SINK STREAM OutputStream (symbol string, sumPrice double);

@info(name = 'query1')
INSERT INTO OutputStream
SELECT symbol, sum(price) AS sumPrice
FROM InputEventStream WINDOW TUMBLING_LENGTH(10, true);
```

This window sends the arriving events directly to the output letting the `sumPrice` to increase gradually. After every 10 events, it clears the window as a batch and resets the `sumPrice` to zero.

## Example 3

```sql
CREATE STREAM InputEventStream (symbol string, price float, volume int);
CREATE WINDOW StockEventWindow (symbol string, price float, volume int) TUMBLING_LENGTH(10) OUTPUT all events;
CREATE SINK STREAM OutputStream (symbol string, price double);

@info(name = 'query0')
INSERT INTO StockEventWindow
FROM InputEventStream;

@info(name = 'query1')
INSERT all events INTO OutputStream 
SELECT symbol, sum(price) AS price
FROM StockEventWindow;
```

This uses a defined window to process 10 events as a batch and output all events.

## Example 4

This example shows aggregating events based on event count in a batch (tumbling) manner.

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
       count() AS numberOfEvents
-- Aggregate every `4` events in a batch manner.
FROM TemperatureStream WINDOW TUMBLING_LENGTH(4);

@info(name = 'SensorId-analysis')
INSERT INTO SensorIdTemperatureStream
SELECT sensorId,
-- Calculate average, and maximum for `temperature`, by grouping events by `sensorId`.
       avg(temperature) AS avgTemperature,
       max(temperature) AS maxTemperature
-- Aggregate every `5` events in a batch manner.
FROM TemperatureStream WINDOW TUMBLING_LENGTH(5)
-- Output events only when `avgTemperature` is greater than or equal to `20.0`.
WHERE avgTemperature >= 20.0;
GROUP BY sensorId
```

### Batch Event Count Aggregation Behavior

When events are sent to `TemperatureStream`, the following events are emitted at `OverallTemperatureStream` via the `Overall-analysis` query, and `SensorIdTemperatureStream` via the `SensorId-analysis` query.

| Input to `TemperatureStream` | Output at `OverallTemperatureStream` | Output at `SensorIdTemperatureStream` |
|---|---|---|
| [`'1001'`, `19.0`] | -  | - |
| [`'1002'`, `26.0`] | -  | -|
| [`'1002'`, `24.0`] | -  | -|
| [`'1001'`, `20.0`] | [`22.5`, `26.0`, `4`]  | - |
| [`'1001'`, `21.0`] | - | [`'1002'`, `25.5`, `24.0`], <br/>[`'1001'`, `20.0`, `19.0`] |
| [`'1002'`, `22.0`] | -  | - |
| [`'1001'`, `21.0`] | -  | - |
| [`'1002'`, `22.0`] | [`21.5`, `22.0`, `4`] | - |
