---
sidebar_position: 100
title: Order By
---

`ORDER BY` orders the query results in ascending and or descending order based on one or more specified attributes. When an attribute is used for order by, by default Stream orders the events in ascending order of that attribute's value, and by adding `desc` keyword, the events can be ordered in descending order. When more than one attribute is defined the attributes defined towards the left will have more precedence in ordering than the ones defined in right.  

## Purpose

`ORDER BY` helps to sort the events in the outputs chunks produced by the query. `ORDER BY` is more helpful for batch windows, and queries where they output many of event together then for sliding window use cases where the output will be one or few events at a time.

## Syntax

The syntax for the `ORDER BY` clause is:

```sql
INSERT INTO <output stream>
SELECT <aggregate function>( <parameter>, <parameter>, ...) AS <attribute1 name>, <attribute2 name>, ...
FROM <input stream> WINDOW <window name>( ... )
GROUP BY <attribute1 name>, <attribute2 name> ...
HAVING <condition>
ORDER BY <attribute1 name> (asc|desc)?, <attribute2 name> (asc|desc)?, ...;
```

Here the order by attributes should be defined next to the `ORDER BY` keyword separating each by a comma, and optionally specifying the event ordering using `asc` (default) or `desc` keywords.

## Example

Query to calculate the average `temp` per `roomNo` and `deviceID` combination on every 10 minutes batches, and order the generated output events in ascending order by `avgTemp` and then by descending order of `roomNo` (if the more than one event have the same `avgTemp` value).

```sql
INSERT INTO AvgTempStream
SELECT roomNo, deviceID, avg(temp) AS avgTemp
FROM TempStream WINDOW TUMBLING_TIME(10 min)
GROUP BY roomNo, deviceID
ORDER BY avgTemp, roomNo desc;
```
