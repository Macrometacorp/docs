---
sidebar_position: 20
title: Counting Sequences
---

Counting sequences allow you to match multiple events for the same matching condition. The number of events matched per condition can be limited with condition postfixes such as counting patterns, or by using the `*`, `+`, and `?` operators.

The matching events can also be retrieved using event indexes, similar to how it is done in counting patterns.

## Counting Sequence Syntax

Each matching condition in a sequence can contain a collection of events as shown below.

```sql
INSERT INTO <output stream>
SELECT <event reference>.<attribute name>, <event reference>.<attribute name>, ...
FROM (every)? <event reference>=<input stream>[<filter condition>](+|*|?)?,
    <event reference>=<input stream [<filter condition>](+|*|?)?,
    ...
    (WITHIN <time gap>)?     
```

## Postfix Symbols

|Postfix Symbol|Required/Optional |Description|
|---------|---------|---------|
| `+` | Optional |This matches **one or more** events to the given condition. |
| `*` | Optional |This matches **zero or more** events to the given condition. |
| `?` | Optional |This matches **zero or one** events to the given condition. |

## Example 1

```sql
CREATE STREAM TempStream(deviceID long, roomNo int, temp double);

INSERT INTO PeekTempStream
SELECT e1.temp AS initialTemp, e2[last].temp AS peakTemp
FROM every e1=TempStream, e2=TempStream[e1.temp <= temp]+, e3=TempStream[e2[last].temp > temp];
```

This stream worker identifies temperature peaks.

## Example 2

Sequence query does expect the matching events to occur immediately after each other, and it can successfully correlate the events who do not have other events in between. Here, sequence can count event occurrences.

### Sequence with Count Example

This stream worker identifies temperature peaks by monitoring continuous increases in temp attribute and alerts upon the first drop.

```sql
-- Defines `TemperatureStream` having information on room temperatures such as `roomNo` and `temp`.
CREATE STREAM TemperatureStream(roomNo int, temp double);

-- Defines `PeakTemperatureStream` which contains events related to peak temperature trends.
CREATE SINK PeakTemperatureStream WITH (type='log') (roomNo int, initialTemp double, peakTemp double, firstDropTemp double);

-- Partition the `TemperatureStream` events by `roomNo`
partition with (roomNo of TemperatureStream)
begin

    @info(name = 'temperature-trend-analyzer')
    INSERT INTO PeakTemperatureStream 
-- Projects the lowest, highest and the first drop in the temperature trend
    SELECT e1.roomNo, e1.temp AS initialTemp,
        e2[last].temp AS peakTemp, e3.temp AS firstDropTemp

-- Identifies the trend of the temperature in a room
    FROM every e1=TemperatureStream,
         e2=TemperatureStream[ifThenElse(e2[last].temp is null,
                e1.temp <= temp, e2[last].temp <= temp)]+,
         e3=TemperatureStream[e2[last].temp > temp];

end;
```

### Sequence with Count Input

- Below events are sent to `TemperatureStream`:

    [`20`, `29`]
    [`10`, `28`]
    [`20`, `30`]
    [`20`, `32`]
    [`20`, `35`]
    [`20`, `33`]

### Sequence with Count Output

After processing the above input events, the event arriving at `PeakTemperatureStream` is:

[`20`, `29.0`, `35.0`, `33.0`]
