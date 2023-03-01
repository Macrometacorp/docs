---
sidebar_position: 30
title: Logical Sequences
---

Logical sequences identify logical relationships using `and`, `or` and `not` on consecutively arriving events.

## Logical Sequence Syntax

The syntax for a logical sequence is:

```sql
INSERT INTO <output stream>
SELECT <event reference>([event index])?.<attribute name>, ...
FROM (every)? (NOT)? <event reference>=<input stream>[<filter condition>]
          ((AND|OR) <event reference>=<input stream>[<filter condition>])? (WITHIN <time gap>)?,
    ...
```

Keywords such as `AND`, `OR`, or `NOT` can be used to illustrate the logical relationship, similar to how it is done in [logical patterns](patterns#logical-patterns).

## Example

This stream worker notifies the state when a regulator event is immediately followed by both temperature and humidity events.

```sql
CREATE STREAM TempStream(deviceID long, temp double);
CREATE STREAM HumidStream(deviceID long, humid double);
CREATE STREAM RegulatorStream(deviceID long, isOn bool);

INSERT INTO StateNotificationStream
SELECT e2.temp, e3.humid
FROM every e1=RegulatorStream, e2=TempStream AND e3=HumidStream;
```
