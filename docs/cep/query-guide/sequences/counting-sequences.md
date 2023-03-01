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

## Example

This stream worker identifies temperature peaks.

```sql
CREATE STREAM TempStream(deviceID long, roomNo int, temp double);

INSERT INTO PeekTempStream
SELECT e1.temp AS initialTemp, e2[last].temp AS peakTemp
FROM every e1=TempStream, e2=TempStream[e1.temp <= temp]+, e3=TempStream[e2[last].temp > temp];
```
