---
sidebar_position: 1
title: Patterns
---

_Patterns_ are a state machine implementation that allows you to detect patterns in the events that arrive over time. This can correlate events within a single stream or between multiple streams.

## Purpose

Patterns allow you to identify trends in events over a time period.

## Syntax

The following is the syntax for a pattern query:

```sql
INSERT INTO <output stream>
SELECT <event reference>.<attribute name>, <event reference>.<attribute name>, ...
FROM (every)? <event reference>=<input stream>[<filter condition>] ->
    (every)? <event reference>=<input stream [<filter condition>] ->
    ...
    (WITHIN <time gap>)?
```

## Query Parameters

| Items| Description |
|-------------------|-------------|
| `->` | This is used to indicate an event that should be following another event. The subsequent event does not necessarily have to occur immediately after the preceding event. The condition to be met by the preceding event should be added before the sign, and the condition to be met by the subsequent event should be added after the sign. |
| `<event reference>` | This allows you to add a reference to the the matching event so that it can be accessed later for further processing. |
| `(within <time gap>)?` | The `WITHIN` clause is optional. It defines the time duration within which all the matching events should occur. |
| `every` | `every` is an optional keyword. This defines whether the event matching should be triggered for every event arrival in the specified stream with the matching condition.  When this keyword is not used, the matching is carried out only once. |

Stream also supports pattern matching with counting events and matching events in a logical order such as (`and`, `or`, and `not`).

## Example 1

This query sends an alert if the temperature of a room increases by 5 degrees within 10 min.

```sql
INSERT INTO AlertStream
SELECT e1.roomNo, e1.temp AS initialTemp, e2.temp AS finalTemp
FROM every( e1=TempStream ) -> e2=TempStream[ e1.roomNo == roomNo and (e1.temp + 5) <= temp ]
    WITHIN 10 min;
```

Here, the matching process begins for each event in the `TempStream` stream (because `every` is used with `e1=TempStream`),
and if  another event arrives within 10 minutes with a value for the `temp` attribute that is greater than or equal to `e1.temp + 5` of the event e1, an output is sent to `AlertStream`.

## Example 2

This stream worker shows a simple pattern that detects high-temperature event occurrence of a continuous event stream. The application sends an alert if the temperature of a room increases by five degrees within ten minutes.

### Stream Worker Code

```sql
-- Defines `TemperatureStream` having information of room temperature such as `roomNo` and `temp`.
CREATE STREAM TemperatureStream(roomNo int, temp double);

-- Defines `HighTempAlertStream` which contains the alerts for high temperature.
CREATE SINK HighTempAlertStream WITH (type = 'log') (roomNo int, initialTemp double, finalTemp double);

@info(name='temperature-increase-identifier')
-- Identify if the temperature of a room increases by 5 degrees within 10 min.
INSERT INTO HighTempAlertStream
SELECT e1.roomNo, e1.temp AS initialTemp, e2.temp AS finalTemp
FROM every( e1 = TemperatureStream ) ->
    e2 = TemperatureStream[ e1.roomNo == roomNo
        AND (e1.temp + 5) <= temp ]
    WITHIN 10 min;
```

### Simple Pattern Input

Below events are sent to `TemperatureStream` within 10 minutes:

[`2`, `35`]

[`2`, `37`]

[`2`, `40`]

### Simple Pattern Output

After processing the above input events, the event arriving at `HighTempAlertStream` is:

[`2`, `35.0`, `40.0`]
