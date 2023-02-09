---
sidebar_position: 60
title: Data Summarizations (Aggregations) Examples
---

This page explains ways to aggregate or transform your data. For more information information on [windows](../query-guide/query.md#window) refer to [Stream Worker Query Guide](../query-guide/index.md).

## Sliding Time

This example shows aggregating events over time in a sliding manner.

### Sliding Time Example

```sql
CREATE STREAM TemperatureStream(sensorId string, temperature double);

CREATE SINK STREAM OverallTemperatureStream(avgTemperature double, maxTemperature double, numberOfEvents long);
CREATE SINK STREAM SensorIdTemperatureStream(sensorId string, avgTemperature double, maxTemperature double);

@info(name = 'Overall-analysis')
INSERT ALL events INTO OverallTemperatureStream
-- Calculate average, maximum, and count for `temperature` attribute.
SELECT avg(temperature) AS avgTemperature,
       max(temperature) AS maxTemperature,
       count() as numberOfEvents
-- Aggregate events over `1 minute` sliding window
FROM TemperatureStream window time(1 min);
-- Output when events are added, and removed (expired) from `window time()`.


@info(name = 'SensorId-analysis')
INSERT INTO SensorIdTemperatureStream
SELECT sensorId,
-- Calculate average, and maximum for `temperature`, by grouping events by `sensorId`.
       avg(temperature) as avgTemperature,
       max(temperature) as maxTemperature
-- Aggregate events over `30 seconds` sliding window
FROM TemperatureStream window time(30 sec)       
GROUP BY sensorId
-- Output events only when `avgTemperature` is greater than `20.0`.
HAVING avgTemperature > 20.0;
-- Output only when events are added to `window time()`.
```

### Sliding Time Aggregation Behavior

When events are sent to `TemperatureStream` stream, following events are emitted at `OverallTemperatureStream` via `Overall-analysis` query, and `SensorIdTemperatureStream` via `SensorId-analysis` query.

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

## Batch (Tumbling) Time

This example shows aggregating events over time in a batch (tumbling) manner.

### Batch Time Example

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
FROM TemperatureStream window timeBatch(1 min);


@info(name = 'SensorId-analysis')
INSERT INTO SensorIdTemperatureStream
SELECT sensorId,
-- Calculate average, and maximum for `temperature`, by grouping events by `sensorId`.
       avg(temperature) AS avgTemperature,
       max(temperature) AS maxTemperature
-- Aggregate events every `30 seconds` from epoch timestamp `0`.
FROM TemperatureStream window timeBatch(30 sec, 0)
GROUP BY sensorId
-- Output events only when `avgTemperature` is greater than `20.0`.
HAVING avgTemperature > 20.0;
```

### Batch Time Aggregation Behavior

When events are sent to `TemperatureStream` stream, following events will get emitted at `OverallTemperatureStream` stream via `Overall-analysis` query, and `SensorIdTemperatureStream` stream via `SensorId-analysis` query.

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

## Sliding Event Count

This example shows aggregating events based on event count in a sliding manner.

### Sliding Event Count Example

```sql
CREATE STREAM TemperatureStream(sensorId string, temperature double);

CREATE SINK STREAM OverallTemperatureStream(avgTemperature double, maxTemperature double, numberOfEvents long);
CREATE SINK STREAM SensorIdTemperatureStream(sensorId string, avgTemperature double, maxTemperature double);

@info(name = 'Overall-analysis')
INSERT INTO OverallTemperatureStream
-- Calculate average, maximum, and count for `temperature` attribute.
SELECT avg(temperature) as avgTemperature,
       max(temperature) as maxTemperature,
       count() as numberOfEvents
-- Aggregate last `4` events in a sliding manner.
FROM TemperatureStream window length(4);


@info(name = 'SensorId-analysis')
INSERT INTO SensorIdTemperatureStream
SELECT sensorId,
-- Calculate average, and maximum for `temperature`, by grouping events by `sensorId`.
       avg(temperature) as avgTemperature,
       max(temperature) as maxTemperature
-- Aggregate last `5` events in a sliding manner.
FROM TemperatureStream window length(5)
GROUP BY sensorId
-- Output events only when `avgTemperature` is greater than or equal to `20.0`.
HAVING avgTemperature >= 20.0;
```

### Sliding Event Count Aggregation Behavior

When events are sent to `TemperatureStream` stream, the following events are emitted at `OverallTemperatureStream` via `Overall-analysis` query, and `SensorIdTemperatureStream` via `SensorId-analysis` query.

| Input to `TemperatureStream` | Output at `OverallTemperatureStream` | Output at `SensorIdTemperatureStream` |
|---|---|---|
| [`'1001'`, `19.0`] | [`19.0`, `19.0`, `1`]  | No events, as having <br/>condition not satisfied <br/>for `'1001'`. |
| [`'1002'`, `26.0`] | [`22.5`, `26.0`, `2`]  | [`'1002'`, `26.0`, `26.0`] |
| [`'1002'`, `24.0`] | [`23.0`, `26.0`, `3`]  | [`'1002'`, `25.5`, `24.0`] |
| [`'1001'`, `20.0`] | [`22.5`, `26.0`, `4`]  | No events, as having <br/>condition not satisfied <br/>for `'1001'`. |
| [`'1001'`, `21.0`] | [`22.75`, `26.0`, `4`] | [`'1001'`, `20.0`, `19.0`] |
| [`'1001'`, `22.0`] | [`21.75`, `24.0`, `4`]  | [`'1001'`, `21.0`, `20.0`] |

## Batch (Tumbling) Event Count

This example shows aggregating events based on event count in a batch (tumbling) manner.

### Batch Event Count Example

```sql
CREATE STREAM TemperatureStream(sensorId string, temperature double);

CREATE SINK STREAM OverallTemperatureStream(avgTemperature double, maxTemperature double, numberOfEvents long);
CREATE SINK STREAM SensorIdTemperatureStream(sensorId string, avgTemperature double, maxTemperature double);

@info(name = 'Overall-analysis')
INSERT INTO OverallTemperatureStream
-- Calculate average, maximum, and count for `temperature` attribute.
SELECT avg(temperature) as avgTemperature,
       max(temperature) as maxTemperature,
       count() as numberOfEvents
-- Aggregate every `4` events in a batch manner.
FROM TemperatureStream window lengthBatch(4);

@info(name = 'SensorId-analysis')
INSERT INTO SensorIdTemperatureStream
SELECT sensorId,
-- Calculate average, and maximum for `temperature`, by grouping events by `sensorId`.
       avg(temperature) AS avgTemperature,
       max(temperature) AS maxTemperature
-- Aggregate every `5` events in a batch manner.
FROM TemperatureStream window lengthBatch(5)
GROUP BY sensorId
-- Output events only when `avgTemperature` is greater than or equal to `20.0`.
HAVING avgTemperature >= 20.0;
```

### Batch Event Count Aggregation Behavior

When events are sent to `TemperatureStream` stream, following events are emitted at `OverallTemperatureStream` via `Overall-analysis` query, and `SensorIdTemperatureStream` via `SensorId-analysis` query.

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

## Session

This example shows aggregating events over continuous activity sessions in a sliding manner.

### Session Example

```sql
CREATE STREAM PurchaseStream(userId string, item string, price double);

CREATE SINK STREAM OutOfOrderUserIdPurchaseStream(userId string, totalItems long, totalPrice double);
CREATE SINK STREAM UserIdPurchaseStream(userId string, totalItems long, totalPrice double);

@info(name = 'Session-analysis')
-- Calculate count and sum of `price` per `userId` during the session.
INSERT INTO OutOfOrderUserIdPurchaseStream
SELECT userId,
       count() as totalItems,
       sum(price) as totalPrice
-- Aggregate events over a `userId` based session window with `1 minute` session gap.
FROM PurchaseStream window session(1 min, userId)
GROUP BY userId;
-- Output when events are added to the session.

@info(name = 'Session-analysis-with-late-event-arrivals')
-- Calculate count and sum of `price` per `userId` during the session.
INSERT INTO UserIdPurchaseStream
SELECT userId,
       count() AS totalItems,
       sum(price) AS totalPrice
-- Aggregate events over a `userId` based session window with `1 minute` session gap,
-- and `20 seconds` of allowed latency to capture late event arrivals.
FROM PurchaseStream window session(1 min, userId, 20 sec)
GROUP BY userId;
-- Output when events are added to the session.
```

### Session Aggregation Behavior

When events are sent to `PurchaseStream` stream, following events will get emitted at `UserIdPurchaseStream` via `Session-analysis` query, and `OutOfOrderUserIdPurchaseStream` via `Session-analysis-with-late-event-arrivals` query.

| Time |Event Timestamp | Input to `PurchaseStream` | Output at `UserIdPurchaseStream` | Output at `OutOfOrderUserIdPurchaseStream` |
|---|---|---|---|---|
| 9:00:00 | 9:00:00 | [`'1001'`, `'cake'`, `18.0`]        | [`'1001'`, `1`, `18.0`]  | [`'1001'`, `1`, `18.0`]|
| 9:00:20 | 9:00:20 | [`'1002'`, `'croissant'`, `23.0`]   | [`'1002'`, `1`, `23.0`]  | [`'1002'`, `1`, `23.0`] |
| 9:00:40 | 9:00:40 | [`'1002'`, `'cake'`, `22.0`]        | [`'1002'`, `2`, `45.0`]  | [`'1002'`, `2`, `45.0`]  |
| 9:01:05 | **9:00:50** | [`'1001'`, `'pie'`, `22.0`]         |  No events, as event arrived late, and did not fall into a session.|[`'1001'`, `2`, `40.0`] |
| 9:01:10 | 9:01:10 | [`'1001'`, `'cake'`, `10.0`]        | [`'1001'`, `1`, `10.0`]  | [`'1001'`, `3`, `50.0`]|
| 9:01:50 | 9:01:50 | [`'1002'`, `'cake'`, `20.0`]        | [`'1002'`, `1`, `20.0`]  | [`'1002'`, `1`, `23.0`] |
| 9:02:40 | 9:02:40 | [`'1001'`, `'croissant'`, `23.0`]   | [`'1001'`, `1`, `23.0`]  | [`'1001'`, `1`, `23.0`] |

## Named Window

This example shows defining a named window and summarizing data based on the window. This example uses `time` window as the named window, but any window can be defined and used as a named window.

### Named Window Example

```sql
CREATE STREAM TemperatureStream (sensorId string, temperature double);

CREATE SINK STREAM MinMaxTemperatureOver1MinStream(minTemperature double, maxTemperature double);
CREATE SINK STREAM AvgTemperaturePerSensorStream(sensorId string, avgTemperature double);

-- Define a named window with name `OneMinTimeWindow` to retain events over `1 minute` in a sliding manner.
CREATE WINDOW OneMinTimeWindow (sensorId string, temperature double) time(1 min) ;

@info(name = 'Insert-to-window')
-- Insert events in to the named time window.
INSERT INTO OneMinTimeWindow
FROM TemperatureStream;

@info(name = 'Min-max-analysis')
-- Calculate minimum and maximum of `temperature` on events in `OneMinTimeWindow` window.
INSERT INTO MinMaxTemperatureOver1MinStream
SELECT min(temperature) AS minTemperature,
       max(temperature) AS maxTemperature
FROM OneMinTimeWindow;

@info(name = 'Per-sensor-analysis')
-- Calculate average of `temperature`, by grouping events by `sensorId`, on the `OneMinTimeWindow` window.
INSERT INTO AvgTemperaturePerSensorStream
SELECT sensorId,
       avg(temperature) as avgTemperature
FROM OneMinTimeWindow
GROUP BY sensorId;
```

### Named Window Aggregation Behavior

When events are sent to `TemperatureStream` stream, following events will get emitted at `MinMaxTemperatureOver1MinStream` stream via `Min-max-analysis` query, and `AvgTemperaturePerSensorStream` stream via `Per-sensor-analysis` query.

|Time | Input to `TemperatureStream` | Output at `MinMaxTemperatureOver1MinStream` | Output at `AvgTemperaturePerSensorStream` |
|---|---|---|---|
| 9:00:10 | [`'1001'`, `21.0`] | [`21.0`, `21.0`] | [`'1001'`, `21.0`] |
| 9:00:20 | [`'1002'`, `25.0`] | [`21.0`, `25.0`] | [`'1002'`, `25.0`] |
| 9:00:35 | [`'1002'`, `26.0`] | [`21.0`, `26.0`] | [`'1002'`, `25.5`] |
| 9:00:40 | [`'1002'`, `27.0`] | [`21.0`, `27.0`] | [`'1002'`, `26.0`] |
| 9:00:55 | [`'1001'`, `19.0`] | [`19.0`, `27.0`] | [`'1001'`, `20.0`] |
| 9:01:30 | [`'1002'`, `22.0`] | [`19.0`, `27.0`] | [`'1002'`, `25.0`] |
| 9:02:10 | [`'1001'`, `18.0`] | [`18.0`, `22.0`] | [`'1001'`, `18.0`] |
