---
sidebar_position: 90
title: HAVING | WHERE
---

`HAVING` and `WHERE` provide a way of filtering events based on a specified condition of the query output stream attributes. It accepts any type of condition including a combination of functions and attributes that produces a Boolean result. They allow events to passthrough if the condition results in `true`, and drops if it results in a `false`.  

## Purpose

`HAVING` and `WHERE` help to select the events that are relevant for the output based on the attributes those are produced by the `SELECT` clause and omit the ones that are not.

## Syntax

The syntax for the `HAVING`  and `WHERE` clauses is:

```sql
INSERT INTO <output stream>
SELECT <attribute1 name>, <attribute2 name>, …
FROM <input stream> WINDOW <window name>( ... )
WHERE|HAVING <condition>;
```

Another syntax example:

```sql
INSERT INTO <output stream>
SELECT <aggregate function>( <parameter>, <parameter>, ...) AS <attribute1 name>, <attribute2 name>, ...
FROM <input stream> WINDOW <window name>( ... )
GROUP BY <attribute1 name>, <attribute2 name> ...
HAVING <condition>;
```

Here the having `<condition>` should be defined next to the `HAVING` keyword and having can be used with or without `GROUP BY` clause.

## Example 1

```sql
INSERT INTO AlertStream
SELECT roomNo, avg(temp) AS avgTemp
FROM TempStream WINDOW SLIDING_TIME(10 min)
GROUP BY roomNo
HAVING avgTemp > 30;
```

Query to calculate the average `temp` per `roomNo` for the last 10 minutes, and alerts if the `avgTemp` exceeds 30 degrees.

## Example 2

```sql
INSERT INTO AlertStream
SELECT roomNo, avg(temp) AS avgTemp
FROM TempStream WINDOW SLIDING_TIME(10 min)
GROUP BY roomNo
WHERE avgTemp > 30;
```

Same as the previous example, but with `WHERE`.
