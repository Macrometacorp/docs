---
sidebar_position: 50
title: Filters
---

Filters provide a way of filtering input stream events based on a specified condition. It accepts any type of condition including a combination of functions and/or attributes  that produces a Boolean result. Filters allow events to passthrough if the condition results in `true`, and drops if it results in a `false`.  

## Purpose

Filter helps to select the events that are relevant for the processing and omit the ones that are not.

## Syntax

Filter conditions should be defined in square brackets (`[]`) next to the input stream as shown below.

```sql
INSERT INTO <output stream>
SELECT <attribute name>, <attribute name>, ...
FROM <input stream>[<filter condition>] ;
```

## Example

Query to filter `TempStream` stream events, having `roomNo` within the range of 100-210 and temperature greater than 40 degrees,
and insert them into `HighTempStream` stream.

```sql
INSERT INTO HighTempStream
SELECT roomNo, temp
FROM TempStream[(roomNo >= 100 and roomNo < 210) and temp > 40];
```
