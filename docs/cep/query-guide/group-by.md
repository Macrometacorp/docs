---
sidebar_position: 90
title: GROUP BY
---

`GROUP BY` provides a way of grouping events based on one or more specified attributes to perform aggregate operations.

## Purpose

`GROUP BY` allows users to aggregate values of multiple events based on the given group-by fields.

## Syntax

The syntax for the group by with aggregate function is:

```sql
INSERT INTO <output stream>
SELECT <aggregate function>( <parameter>, <parameter>, ...) as <attribute1 name>, <attribute2 name>, ...
FROM <input stream> WINDOW <window name>(...)
GROUP BY <attribute1 name>, <attribute2 name>, ...;
```

Here the group by attributes should be defined next to the `GROUP BY` keyword separating each attribute by a comma.

## Example

Query to calculate the average `temp` per `roomNo` and `deviceID` combination, from the events arrived from `TempStream`, during the last 10 minutes time-window in a sliding manner.

```sql
INSERT INTO AvgTempStream
SELECT roomNo, deviceID, avg(temp) AS avgTemp
FROM TempStream WINDOW SLIDING_TIME(10 min)
GROUP BY roomNo, deviceID;
```
