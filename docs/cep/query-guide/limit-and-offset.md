---
sidebar_position: 110
title: LIMIT and OFFSET
---

`LIMIT` and `OFFSET` provide a way to select the number of events (via limit) from the desired index (by specifying an offset) from the output event chunks produced by the query.

## Purpose

`LIMIT` and `OFFSET` helps to output only the selected set of events from large event batches. This will be more useful with `ORDER BY` clause where you can order the output for topK, bottomK, or even to paginate through the dataset by obtaining a set of events from the middle.

## Syntax

The syntax for the `LIMIT` and `OFFSET` clauses is as follows:

```sql
INSERT INTO <output stream>
SELECT <aggregate function>( <parameter>, <parameter>, ...) AS <attribute1 name>, <attribute2 name>, ...
FROM <input stream> WINDOW <window name>( ... )
GROUP BY <attribute1 name>, <attribute2 name> ...
HAVING <condition>
ORDER BY <attribute1 name> (asc | desc)?, <attribute2 name> (<ascend/descend>)?, ...
LIMIT <positive integer>?
OFFSET <positive integer>?;
```

Both `LIMIT` and `OFFSET` are optional.

- When `LIMIT` is omitted, the query outputs all the events.
- When `OFFSET` is omitted, `0` is taken as the default offset value.

## Example 1

```sql
INSERT INTO HighestAvgTempStream
SELECT roomNo, deviceID, avg(temp) AS avgTemp
FROM TempStream WINDOW TUMBLING_TIME(10 min)
GROUP BY roomNo, deviceID
ORDER BY avgTemp desc
LIMIT 2;
```

Query to calculate the average `temp` per `roomNo` and `deviceID` combination for every 10 minutes in batches from the events arriving at the `TempStream`. It emits only the two events with the highest `avgTemp` value.

## Example 2

```sql
INSERT INTO HighestAvgTempStream
SELECT roomNo, deviceID, avg(temp) AS avgTemp
FROM TempStream WINDOW TUMBLING_TIME(10 min)
GROUP BY roomNo, deviceID
ORDER BY avgTemp desc
LIMIT 3
OFFSET 2;
```

Query to calculate the average `temp` per `roomNo` and `deviceID` combination for every 10 minutes batches, for events that arrive at the `TempStream`. It emits only the third, fourth, and fifth events when sorted in descending order based on their `avgTemp` value.
