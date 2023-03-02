---
sidebar_position: 30
title: Logical Patterns
---

Logical patterns match events that arrive in temporal order and correlate them with logical relationships such as `AND`,
`OR` and `NOT`.

## Syntax

```sql
INSERT INTO <output stream>
SELECT <event reference>([event index])?.<attribute name>, ...
FROM (every)? (NOT)? <event reference>=<input stream>[<filter condition>]
          ((AND|OR) <event reference>=<input stream>[<filter condition>])? (within <time gap>)? ->  
    ...
```

## Logical Pattern Keywords

Keywords such as `AND`, `OR`, or `NOT` can be used to illustrate the logical relationship.

|Keyword|Description|
---------|---------
|`AND`|This allows both conditions of `AND` to be matched by two events in any order.|
|`OR`|The state succeeds if either condition of `OR` is satisfied. Here the event reference of the other condition is `null`.|
`NOT <condition1> AND <condition2>`| When `NOT` is included with `AND`, it identifies the events that match `<condition2>` arriving before any event that match `<condition1>`.|
|`Not <condition> FOR <time period>`| When `NOT` is included with `for`, it allows you to identify a situation where no event that matches `<condition1>` arrives during the specified `<time period>`.  e.g.,`from not TemperatureStream[temp > 60] for 5 sec`.|

Here the `NOT` pattern can be followed by either an `AND` clause or the effective period of `NOT` can be concluded after a given `<time period>`. Further in Stream more than two streams cannot be matched with logical conditions using `AND`, `OR`, or `NOT` clauses at this point.

