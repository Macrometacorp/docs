---
sidebar_position: 20
title: Counting Patterns
---

Counting patterns allow you to match multiple events that may have been received for the same matching condition.
The number of events matched per condition can be limited via condition postfixes.

## Syntax

Each matching condition can contain a collection of events with the minimum and maximum number of events to be matched as shown in the syntax below.

```sql
INSERT INTO <output stream>
SELECT <event reference>([event index])?.<attribute name>, ...
FROM (every)? <event reference>=<input stream>[<filter condition>] (<<min count>:<max count>>)? ->  
    ...
    (WITHIN <time gap>)?     
```

## Postfix Expressions

These postfix expressions are used to specify the number of times a pattern or sub-pattern should match in regular expressions.

|Postfix|Description|Example
---------|---------|---------
|`<n1:n2>`|This matches `n1` to `n2` events (including `n1` and not more than `n2`).|`1:4` matches 1 to 4 events.
|`<n:>`|This matches `n` or more events (including `n`).|`<2:>` matches 2 or more events.
|`<:n>`|This matches up to `n` events (excluding `n`).|`<:5>` matches up to 5 events.
|`<n>`|This matches exactly `n` events.|`<5>` matches exactly 5 events.

Specific occurrences of the event in a collection can be retrieved by using an event index with its reference.
Square brackets can be used to indicate the event index where `1` can be used as the index of the first event and `last` can be used as the index for the `last` available event in the event collection. If you provide an index greater then the last event index, the system returns `null`. The following are some valid examples.

- `e1[3]` refers to the third event.
- `e1[last]` refers to the last event.
- `e1[last - 1]` refers to the event before the last event.

## Example 1

```sql
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);
CREATE STREAM RegulatorStream (deviceID long, roomNo int, tempSet double, isOn bool);

INSERT INTO TempDiffStream
SELECT e1.roomNo, e2[0].temp - e2[last].temp AS tempDiff
FROM every( e1=RegulatorStream) -> e2=TempStream[e1.roomNo==roomNo]<1:> -> e3=RegulatorStream[e1.roomNo==roomNo];
```

This stream worker calculates the temperature difference between two regulator events.

## Example 2

This stream worker calculates the temperature difference between two regulator events. Here, when at least one `TemperatureStream` event occurs between two RegulatorStream events the pattern is valid and logs can be seen.

### Stream Worker Code

```sql
-- Defines `TemperatureStream` having information on room temperature such as `sensorID`, `roomNo` and `temp`.
CREATE STREAM TemperatureStream (sensorID long, roomNo int, temp double);


-- Defines `RegulatorStream` which contains the events from regulator with attributes `deviceID`, `roomNo`, `tempSet`, and `isOn`.
CREATE STREAM RegulatorStream (deviceID long, roomNo int, tempSet double, isOn bool);

-- Defines `TemperatureDiffStream` which contains the events related to temperature difference.
CREATE SINK TemperatureDiffStream WITH (type = 'log') (roomNo int, tempDiff double);

-- Calculates the temperature difference between two regulator events. Here, when at least one TemperatureStream event needs to arrive between two RegulatorStream events.
-- Finds the temperature difference between the first and last temperature event.
INSERT INTO TemperatureDiffStream
SELECT e1.roomNo, e2[0].temp - e2[last].temp AS tempDiff
FROM every( e1 = RegulatorStream)
    -> e2 = TemperatureStream[e1.roomNo == roomNo] < 1: >
    -> e3 = RegulatorStream[e1.roomNo == roomNo];
```

### Counting Pattern Input

- First, below event is sent to `RegulatorStream`:

    [`21`, `2`, `25`, `true`]

- Below events are sent to `TemperatureStream`:

    [`21`, `2`, `29`]

    [`21`, `2`, `26`]

- Finally, below event is sent again to `RegulatorStream`,

    [`21`, `2`, `30`, `true`]

### Counting Pattern Output

After processing the above input events, the event arriving at `TemperatureDiffStream` is:

[`2`, `3.0`]
