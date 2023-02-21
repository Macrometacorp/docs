---
sidebar_position: 140
title: Sequences
---

Sequence is a state machine implementation that allows you to detect the sequence of event occurrences over time.
Here all matching events must arrive consecutively to match the sequence condition, and there cannot be any non-matching events arriving within a matching sequence of events.
This can correlate events within a single stream or between multiple streams.

**Purpose**

This allows you to detect a specified event sequence over a specified time period.

**Syntax**

The syntax for a sequence query is as follows:

```sql
INSERT INTO <output stream>
SELECT <event reference>.<attribute name>, <event reference>.<attribute name>, ...
FROM (every)? <event reference>=<input stream>[<filter condition>],
    <event reference>=<input stream [<filter condition>],
    ...
    (WITHIN <time gap>)?     
```

| Items | Description |
|-------------------|-------------|
| `,` | This represents the immediate next event i.e., when an event that matches the first condition arrives, the event that arrives immediately after it should match the second condition. |
| `<event reference>` | This allows you to add a reference to the the matching event so that it can be accessed later for further processing. |
| `(within <time gap>)?` | The `within` clause is optional. It defines the time duration within which all the matching events should occur. |
| `every` | `every` is an optional keyword. This defines whether the matching event should be triggered for every event that arrives at the specified stream with the matching condition.  When this keyword is not used, the matching is carried out only once. |

**Example**

This query generates an alert if the increase in the temperature between two consecutive temperature events exceeds one degree.

```sql
INSERT INTO AlertStream
SELECT e1.temp as initialTemp, e2.temp as finalTemp
FROM every e1=TempStream, e2=TempStream[e1.temp + 1 < temp];
```

### Counting Sequence

Counting sequences allow you to match multiple events for the same matching condition.
The number of events matched per condition can be limited via condition postfixes such as **Counting Patterns**, or by using the
`*`, `+`, and `?` operators.

The matching events can also be retrieved using event indexes, similar to how it is done in **Counting Patterns**.

**Syntax**

Each matching condition in a sequence can contain a collection of events as shown below.

```sql
INSERT INTO <output stream>
SELECT <event reference>.<attribute name>, <event reference>.<attribute name>, ...
FROM (every)? <event reference>=<input stream>[<filter condition>](+|*|?)?,
    <event reference>=<input stream [<filter condition>](+|*|?)?,
    ...
    (WITHIN <time gap>)?     
```

|Postfix symbol|Required/Optional |Description|
|---------|---------|---------|
| `+` | Optional |This matches **one or more** events to the given condition. |
| `*` | Optional |This matches **zero or more** events to the given condition. |
| `?` | Optional |This matches **zero or one** events to the given condition. |

**Example**

This stream worker identifies temperature peeks.

```
CREATE STREAM TempStream(deviceID long, roomNo int, temp double);

INSERT INTO PeekTempStream
SELECT e1.temp as initialTemp, e2[last].temp as peakTemp
FROM every e1=TempStream, e2=TempStream[e1.temp <= temp]+, e3=TempStream[e2[last].temp > temp];
```

### Logical Sequence

Logical sequences identify logical relationships using `and`, `or` and `not` on consecutively arriving events.

**Syntax**
The syntax for a logical sequence is as follows:

```
INSERT INTO <output stream>
SELECT <event reference>([event index])?.<attribute name>, ...
FROM (every)? (not)? <event reference>=<input stream>[<filter condition>]
          ((and|or) <event reference>=<input stream>[<filter condition>])? (within <time gap>)?,
    ...
```

Keywords such as `and`, `or`, or `not` can be used to illustrate the logical relationship, similar to how it is done in **Logical Patterns**.

**Example**

This stream worker notifies the state when a regulator event is immediately followed by both temperature and humidity events.

```sql
CREATE STREAM TempStream(deviceID long, temp double);
CREATE STREAM HumidStream(deviceID long, humid double);
CREATE STREAM RegulatorStream(deviceID long, isOn bool);

INSERT INTO StateNotificationStream
SELECT e2.temp, e3.humid
FROM every e1=RegulatorStream, e2=TempStream and e3=HumidStream;
```
