---
sidebar_position: 1
title: Named Windows
---

A _named window_ is a window that can be shared across multiple queries. Events can be inserted to a named window from one or more queries, and it can produce output events based on the named window type.

Window provides a way to capture a subset of events from an input stream and retain them for a period of time based on a specified criterion. The criterion defines when and how the events should be evicted from the windows. Such as events getting evicted from the window based on the time duration, or number of events and they events are evicted in a sliding (one by one) or tumbling (batch) manner.

A window can be an input to a query, similar to streams. For more information, refer to [Window Queries](windows-queries) and [Window Operators](window-operators).

:::note
When window is used as an input to a query, another window cannot be applied on top of it.
:::

## Purpose

Windows help to retain events based on a criterion, such that the values of those events can be aggregated, or checked if an event of interest is within the window or not.

## Syntax

The syntax for a named window is as follows:

```sql
CREATE WINDOW <window name> (<attribute name> <attribute type>, <attribute name> <attribute type>, ... ) <window type>(<parameter>, <parameter>, …) <event type>;
```

## Query Parameters

The following parameters are configured in a named window definition:

| Parameter     | Description |
| ------------- |-------------|
| window name      | The name of the window defined. (`CamelCase` is used for window names as a convention.) |
| attribute name   | The schema of the window is defined by its attributes with uniquely identifiable attribute names (`camelCase` is used for attribute names as a convention.)|    |
| attribute type   | The type of each attribute defined in the schema. This can be `STRING`, `INT`, `LONG`, `DOUBLE`, `FLOAT`, `BOOL`, or `OBJECT`.     |
| `<window type>(<parameter>, ...)`   | The window type associated with the window and its parameters. Refer to [Window Types](#window-types).     |
| `output <event type>` | This is optional. Keywords such as `current events`, `expired events`, and `all events` (the default) can be used to specify when the window output should be exposed. |

## Window Types

Macrometa supports the following window types:

| Window Type     | Description |
| ------------- |-------------|
| [CRON()](window-types/cron)     | Retains events based on cron time in a tumbling (batch) manner.   |
| [DELAY()](window-types/delay)     | Retains events and delays the output by the given time period in a sliding manner.   |
| [SESSION()](window-types/session)    | Retains events for each session based on session key.   |
| [SORT()](window-types/sort)     | Retains top-k or bottom-k events based on a parameter value.   |
| [TUMBLING()](window-types/tumbling)     | Retains events of last arrived event batch.   |
| [SLIDING_EXPRESSION()](window-types/sliding-expression)     | Retains events based on an expression in a sliding manner.   |
| [TUMBLING_EXPRESSION()](window-types/tumbling-expression)     | Retains events based on an expression in a tumbling (batch) manner.   |
| [SLIDING_EXTERNAL_TIME()](window-types/sliding-external-time)     | Retains events based on event time value passed as a parameter in a sliding manner.   |
| [TUMBLING_EXTERNAL_TIME()](window-types/tumbling-external-time)     | Retains events based on event time value passed as a parameter in a a tumbling (batch) manner.   |
| [SLIDING_LENGTH()](window-types/sliding-length) | Retains events based on number of events in a sliding manner.   |
| [TUMBLING_LENGTH()](window-types/tumbling-length)     | Retains events based on number of events in a tumbling (batch) manner.   |
| [SLIDING_TIME()](window-types/sliding-time)    | Retains events based on time in a sliding manner.   |
| [SLIDING_TIME_LENGTH()](window-types/sliding-time-length)     | Retains events based on time and number of events in a sliding manner.   |
| [TUMBLING_TIME()](window-types/tumbling-time)   | Retains events based on time in a tumbling (batch) manner.   |

## Example 1

```sql
CREATE WINDOW SensorWindow (name string, value float, roomNo int, deviceID string) TUMBLING_TIME(1 second);
```

This query returns all output when events arrive and when events expire from the window. The event type is not specified, so the stream worker returns both current and expired events as the output. This example uses the [TUMBLING_TIME window](window-types/tumbling-time.md).

## Example 2

```sql
CREATE WINDOW SensorWindow (name string, value float, roomNo int, deviceID string) TUMBLING_TIME(1 second) output expired events;
```

This query returns an output only when events expire from the window. The event type of the window is `expired events`, so the stream worker only returns the events that have expired from the window as the output. This example uses the [TUMBLING_TIME window](window-types/tumbling-time.md).

## Example 3

This example shows a stream worker that defines a named window and summarizes data based on the window. This example uses the [SLIDING_TIME window](window-types/sliding-time.md) as the named window, but any window can be defined and used as a named window.

### Stream Worker Code

```sql
CREATE STREAM TemperatureStream (sensorId string, temperature double);

CREATE SINK STREAM MinMaxTemperatureOver1MinStream(minTemperature double, maxTemperature double);
CREATE SINK STREAM AvgTemperaturePerSensorStream(sensorId string, avgTemperature double);

-- Define a named window with name `OneMinTimeWindow` to retain events over `1 minute` in a sliding manner.
CREATE WINDOW OneMinTimeWindow (sensorId string, temperature double) SLIDING_TIME(1 min) ;

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
       avg(temperature) AS avgTemperature
FROM OneMinTimeWindow
GROUP BY sensorId;
```

### Named Window Aggregation Behavior

When events are sent to `TemperatureStream` stream, the following events are emitted at `MinMaxTemperatureOver1MinStream` via `Min-max-analysis` query, and `AvgTemperaturePerSensorStream` via `Per-sensor-analysis` query.

|Time | Input to `TemperatureStream` | Output at `MinMaxTemperatureOver1MinStream` | Output at `AvgTemperaturePerSensorStream` |
|---|---|---|---|
| 9:00:10 | [`'1001'`, `21.0`] | [`21.0`, `21.0`] | [`'1001'`, `21.0`] |
| 9:00:20 | [`'1002'`, `25.0`] | [`21.0`, `25.0`] | [`'1002'`, `25.0`] |
| 9:00:35 | [`'1002'`, `26.0`] | [`21.0`, `26.0`] | [`'1002'`, `25.5`] |
| 9:00:40 | [`'1002'`, `27.0`] | [`21.0`, `27.0`] | [`'1002'`, `26.0`] |
| 9:00:55 | [`'1001'`, `19.0`] | [`19.0`, `27.0`] | [`'1001'`, `20.0`] |
| 9:01:30 | [`'1002'`, `22.0`] | [`19.0`, `27.0`] | [`'1002'`, `25.0`] |
| 9:02:10 | [`'1001'`, `18.0`] | [`18.0`, `22.0`] | [`'1001'`, `18.0`] |
