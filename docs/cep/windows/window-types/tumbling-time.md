---
title: TUMBLING_TIME()
---

A _tumbling time batch window_ holds and processes events that arrive during the `time` period as a batch.

## Syntax

    WINDOW TUMBLING_TIME(time <INT|LONG|TIME>)
    WINDOW TUMBLING_TIME(time <INT|LONG|TIME>, start <INT|LONG>)
    WINDOW TUMBLING_TIME(time <INT|LONG|TIME>, current.event <BOOL>)
    WINDOW TUMBLING_TIME(time <INT|LONG|TIME>, start <INT|LONG>, current.event <BOOL>)

## Query Parameters

| Name              | Description       | Default Value            | Possible Data Types | Optional | Dynamic |
|--------------|----------------------------------------------------|----------------|----------------|----------|---------|
| time      | The batch time period in which the window process the events.       |          | INT LONG TIME       | No       | No      |
| start      | This specifies an offset in milliseconds in order to start the window at a time different to the standard time.    | Timestamp of first event | INT LONG      | Yes      | No      |
| current.event | Let the window stream the current events out as and when they arrive to the window while expiring them in batches. | false     | BOOL     | Yes      | No      |

## Example 1

```sql
CREATE STREAM InputEventStream (symbol string, price float, volume int);
CREATE SINK STREAM OutputStream (symbol string, price double);

@info(name = 'query1')
INSERT INTO OutputStream
SELECT symbol, sum(price) AS price
FROM InputEventStream WINDOW TUMBLING_TIME(20 sec);
```

This window collects and processes incoming events as a batch every 20 seconds and then outputs them to a stream.

## Example 2

```sql
CREATE STREAM InputEventStream (symbol string, price float, volume int);
CREATE SINK STREAM OutputStream (symbol string, sumPrice double);

@info(name = 'query1')
INSERT INTO OutputStream
SELECT symbol, sum(price) AS sumPrice
FROM InputEventStream WINDOW TUMBLING_TIME(20 sec, true);
```

This window sends the arriving events directly to the output letting the `sumPrice` to increase gradually and on every 20 second interval it clears the window as a batch resetting the `sumPrice` to zero.

## Example 3

```sql
CREATE STREAM InputEventStream (symbol string, price float, volume int);
CREATE WINDOW StockEventWindow (symbol string, price float, volume int) TUMBLING_TIME(20 sec) output all events;
CREATE SINK STREAM OutputStream (symbol string, price double);


@info(name = 'query0')
INSERT INTO StockEventWindow
FROM InputEventStream;

@info(name = 'query1')
INSERT all events INTO OutputStream 
SELECT symbol, sum(price) AS price
FROM StockEventWindow;
```

This uses a defined window to process events arrived every 20 seconds as a batch and output all events.

## Example 4

This example shows aggregating events over time in a batch (tumbling) manner.

### Stream Worker Code

```sql
CREATE STREAM TemperatureStream(sensorId string, temperature double);

CREATE SINK STREAM OverallTemperatureStream(avgTemperature double, maxTemperature double, numberOfEvents long);
CREATE SINK STREAM SensorIdTemperatureStream(sensorId string, avgTemperature double, maxTemperature double);

@info(name = 'Overall-analysis')
-- Calculate average, maximum, and count for `temperature` attribute.
INSERT INTO OverallTemperatureStream
SELECT avg(temperature) AS avgTemperature,
       max(temperature) AS maxTemperature,
       count() AS numberOfEvents
-- Aggregate events every `1 minute`, from the arrival of the first event.
FROM TemperatureStream WINDOW TUMBLING_TIME(1 min);


@info(name = 'SensorId-analysis')
INSERT INTO SensorIdTemperatureStream
SELECT sensorId,
-- Calculate average, and maximum for `temperature`, by grouping events by `sensorId`.
       avg(temperature) AS avgTemperature,
       max(temperature) AS maxTemperature
-- Aggregate events every `30 seconds` from epoch timestamp `0`.
FROM TemperatureStream WINDOW TUMBLING_TIME(30 sec, 0)
GROUP BY sensorId
-- Output events only when `avgTemperature` is greater than `20.0`.
WHERE avgTemperature > 20.0;
```

### Batch Time Aggregation Behavior

When events are sent to `TemperatureStream`, the following events are emitted at `OverallTemperatureStream` via the `Overall-analysis` query, and `SensorIdTemperatureStream` via the `SensorId-analysis` query.

|Time | Input to `TemperatureStream` | Output at `OverallTemperatureStream` | Output at `SensorIdTemperatureStream` |
|---|---|---|---|
| 9:00:10 | [`'1001'`, `21.0`] | - | - |
| 9:00:20 | [`'1002'`, `25.0`] | - | - |
| 9:00:30 | -                  | - | [`'1001'`, `21.0`, `21.0`],[`'1002'`, `25.0`, `25.0`] |
| 9:00:35 | [`'1002'`, `26.0`] | - | - |
| 9:00:40 | [`'1002'`, `27.0`] | - | - |
| 9:00:55 | [`'1001'`, `19.0`] | - | - |
| 9:00:00 | -                  | - | [`'1002'`, `26.5`, `26.0`] |
| 9:01:10 | -                  | [`23.6`, `27.0`, `5`]  | - |
| 9:01:20 | [`'1001'`, `21.0`] | - | - |
| 9:01:30 | -                  | - | [`'1001'`, `21.0`, `21.0`] |
| 9:02:10 | -                  | [`21.0`, `21.0`, `1`]  | - |
