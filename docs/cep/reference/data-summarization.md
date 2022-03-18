---
sidebar_position: 6
---

# Data Summarizations (Aggregations)

## Sliding Time

This example shows aggregating events over time in a sliding manner.

To aggregate events in batches, based on events, or by session, refer other the examples in Data Summarization section. For more information on [windows](query-guide#window) refer to [stream query guide](query-guide.md).


```
CREATE STREAM TemperatureStream(sensorId string, temperature double);

@info(name = 'Overall-analysis')
insert all events into OverallTemperatureStream
-- Calculate average, maximum, and count for `temperature` attribute.
select avg(temperature) as avgTemperature,
       max(temperature) as maxTemperature,
       count() as numberOfEvents
-- Aggregate events over `1 minute` sliding window
from TemperatureStream#window.time(1 min);
-- Output when events are added, and removed (expired) from `window.time()`.


@info(name = 'SensorId-analysis')
insert into SensorIdTemperatureStream
select sensorId,
-- Calculate average, and minimum for `temperature`, by grouping events by `sensorId`.
       avg(temperature) as avgTemperature,
       min(temperature) as maxTemperature
-- Aggregate events over `30 seconds` sliding window
from TemperatureStream#window.time(30 sec)       
group by sensorId
-- Output events only when `avgTemperature` is greater than `20.0`.
having avgTemperature > 20.0;
-- Output only when events are added to `window.time()`.
```

### Aggregation Behavior

When events are sent to `TemperatureStream` stream, following events will get emitted at `OverallTemperatureStream` stream via `Overall-analysis` query, and `SensorIdTemperatureStream` stream via `SensorId-analysis` query.


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

To aggregate events in a sliding manner, based on events, or by session, refer other the examples in Data Summarization section. For more information information on [windows](query-guide#window) refer to [stream query guide](query-guide.md).


```
CREATE STREAM TemperatureStream(sensorId string, temperature double);

@info(name = 'Overall-analysis')
-- Calculate average, maximum, and count for `temperature` attribute.
insert into OverallTemperatureStream
select avg(temperature) as avgTemperature,
       max(temperature) as maxTemperature,
       count() as numberOfEvents
-- Aggregate events every `1 minute`, from the arrival of the first event.
from TemperatureStream#window.timeBatch(1 min);


@info(name = 'SensorId-analysis')
insert into SensorIdTemperatureStream
select sensorId,
-- Calculate average, and minimum for `temperature`, by grouping events by `sensorId`.
       avg(temperature) as avgTemperature,
       min(temperature) as maxTemperature

-- Aggregate events every `30 seconds` from epoch timestamp `0`.
from TemperatureStream#window.timeBatch(30 sec, 0)

group by sensorId

-- Output events only when `avgTemperature` is greater than `20.0`.
having avgTemperature > 20.0;
```

### Aggregation Behavior

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

To aggregate events in batches, based on time, or by session, refer other the examples in Data Summarization section. For more information information on [windows](query-guide#window) refer to [stream query guide](query-guide.md).


```
CREATE STREAM TemperatureStream(sensorId string, temperature double);

@info(name = 'Overall-analysis')
insert into OverallTemperatureStream
-- Calculate average, maximum, and count for `temperature` attribute.
select avg(temperature) as avgTemperature,
       max(temperature) as maxTemperature,
       count() as numberOfEvents
-- Aggregate last `4` events in a sliding manner.
from TemperatureStream#window.length(4);


@info(name = 'SensorId-analysis')
insert into SensorIdTemperatureStream
select sensorId,
-- Calculate average, and minimum for `temperature`, by grouping events by `sensorId`.
       avg(temperature) as avgTemperature,
       min(temperature) as maxTemperature

-- Aggregate last `5` events in a sliding manner.
from TemperatureStream#window.length(5)
group by sensorId
-- Output events only when `avgTemperature` is greater than or equal to `20.0`.
having avgTemperature >= 20.0;
```

### Aggregation Behavior

When events are sent to `TemperatureStream` stream, following events will get emitted at `OverallTemperatureStream` stream via `Overall-analysis` query, and `SensorIdTemperatureStream` stream via `SensorId-analysis` query.

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

To aggregate events in a sliding manner, based on time, or by session, refer other the examples in Data Summarization section. For more information information on [windows](query-guide#window) refer to [stream query guide](query-guide.md).

### Example

```
CREATE STREAM TemperatureStream(sensorId string, temperature double);

@info(name = 'Overall-analysis')
insert into OverallTemperatureStream
-- Calculate average, maximum, and count for `temperature` attribute.
select avg(temperature) as avgTemperature,
       max(temperature) as maxTemperature,
       count() as numberOfEvents
-- Aggregate every `4` events in a batch (tumbling) manner.
from TemperatureStream#window.lengthBatch(4);

@info(name = 'SensorId-analysis')
insert into SensorIdTemperatureStream
select sensorId,
-- Calculate average, and minimum for `temperature`, by grouping events by `sensorId`.
       avg(temperature) as avgTemperature,
       min(temperature) as maxTemperature
-- Aggregate every `5` events in a batch (tumbling) manner.
from TemperatureStream#window.lengthBatch(5)
group by sensorId
-- Output events only when `avgTemperature` is greater than or equal to `20.0`.
having avgTemperature >= 20.0;
```

### Aggregation Behavior

When events are sent to `TemperatureStream` stream, following events will get emitted at `OverallTemperatureStream` stream via `Overall-analysis` query, and `SensorIdTemperatureStream` stream via `SensorId-analysis` query.

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

To aggregate events in batches, or based on events, refer other the examples in Data Summarization section. For more information information on [windows](query-guide#window) refer to [stream query guide](query-guide.md).

```
CREATE STREAM PurchaseStream(userId string, item string, price double);

@info(name = 'Session-analysis')
-- Calculate count and sum of `price` per `userId` during the session.
insert into OutOfOrderUserIdPurchaseStream
select userId,
       count() as totalItems,
       sum(price) as totalPrice
-- Aggregate events over a `userId` based session window with `1 minute` session gap.
from PurchaseStream#window.session(1 min, userId)
group by userId
-- Output when events are added to the session.
insert into UserIdPurchaseStream;

@info(name = 'Session-analysis-with-late-event-arrivals')
-- Calculate count and sum of `price` per `userId` during the session.
select userId,
       count() as totalItems,
       sum(price) as totalPrice
-- Aggregate events over a `userId` based session window with `1 minute` session gap,
-- and `20 seconds` of allowed latency to capture late event arrivals.
from PurchaseStream#window.session(1 min, userId, 20 sec)
group by userId;
-- Output when events are added to the session.
```

### Aggregation Behavior

When events are sent to `PurchaseStream` stream, following events will get emitted at `UserIdPurchaseStream` stream via `Session-analysis` query, and `OutOfOrderUserIdPurchaseStream` stream via `Session-analysis-with-late-event-arrivals` query.

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

This example shows defining a named window and summarizing data based on the window. This example uses `time` window as the named window, but any window can be defined and used as a name window. For more information information on [named windows](query-guide#named-window) refer to [stream query guide](query-guide.md).


```
CREATE STREAM TemperatureStream (sensorId string, temperature double);

-- Define a named window with name `OneMinTimeWindow` to retain events over `1 minute` in a sliding manner.
define window OneMinTimeWindow (sensorId string, temperature double) time(1 min) ;

@info(name = 'Insert-to-window')
-- Insert events in to the named time window.
insert into OneMinTimeWindow
from TemperatureStream;

@info(name = 'Min-max-analysis')
-- Calculate minimum and maximum of `temperature` on events in `OneMinTimeWindow` window.
insert into MinMaxTemperatureOver1MinStream
select min(temperature) as minTemperature,
       max(temperature) as maxTemperature
from OneMinTimeWindow;

@info(name = 'Per-sensor-analysis')
-- Calculate average of `temperature`, by grouping events by `sensorId`, on the `OneMinTimeWindow` window.
insert into AvgTemperaturePerSensorStream
select sensorId,
       avg(temperature) as avgTemperature
from OneMinTimeWindow
group by sensorId;
```

### Aggregation Behavior

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