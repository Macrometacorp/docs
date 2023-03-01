---
sidebar_position: 1
title: Sequences
---

_Sequences_ are a state machine implementation that allow you to detect the sequence of event occurrences over time.
Here all matching events must arrive consecutively to match the sequence condition, and there cannot be any non-matching events arriving within a matching sequence of events. This can correlate events within a single stream or between multiple streams.

## Purpose

Sequences allows you to detect a specified event sequence over a specified time period.

## Syntax

The syntax for a sequence query is:

```sql
INSERT INTO <output stream>
SELECT <event reference>.<attribute name>, <event reference>.<attribute name>, ...
FROM (every)? <event reference>=<input stream>[<filter condition>],
    <event reference>=<input stream [<filter condition>],
    ...
    (WITHIN <time gap>)?     
```

## Query Parameters

| Items | Description |
|-------------------|-------------|
| `,` | This represents the immediate next event i.e., when an event that matches the first condition arrives, the event that arrives immediately after it should match the second condition. |
| `<event reference>` | This allows you to add a reference to the the matching event so that it can be accessed later for further processing. |
| `(within <time gap>)?` | The `within` clause is optional. It defines the time duration within which all the matching events should occur. |
| `every` | `every` is an optional keyword. This defines whether the matching event should be triggered for every event that arrives at the specified stream with the matching condition.  When this keyword is not used, the matching is carried out only once. |

## Example

```sql
INSERT INTO AlertStream
SELECT e1.temp AS initialTemp, e2.temp AS finalTemp
FROM every e1=TempStream, e2=TempStream[e1.temp + 1 < temp];
```

This query generates an alert if the increase in the temperature between two consecutive temperature events exceeds one degree.
