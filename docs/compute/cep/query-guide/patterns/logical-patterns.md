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

## Example

This stream worker  sends a `stop` action on the regulator if a `removed` action is triggered in the `RoomKeyStream` stream.

### Stream Worker Code

```sql
-- Defines `RegulatorStateChangeStream` having information of regulator state change such as `deviceID`, `roomNo`, `tempSet`, and `action`.
CREATE STREAM RegulatorStateChangeStream(deviceID long, roomNo int, tempSet double, action string);

-- Defines `RoomKeyStream` which contains the events related to room key usage.
CREATE STREAM RoomKeyStream(deviceID long, roomNo int, action string);

-- Defines `RegulatorActionStream` which contains the events related to regulator state changes.
CREATE SINK RegulatorActionStream WITH (type='log') (roomNo int, action string);

-- Sends a stop action on RegulatorActionStream stream, if a removed action is triggered in RoomKeyStream before the regulator state changing to off which is notified in RegulatorStateChangeStream.
INSERT INTO RegulatorActionStream
SELECT e1.roomNo,
-- Checks whether pattern triggered due to removal of room key.
    ifThenElse( e2 is null, 'none', 'stop' ) AS action
FROM every e1=RegulatorStateChangeStream[ action == 'on' ]
     -> e2=RoomKeyStream
            [ e1.roomNo == roomNo AND action == 'removed' ]
        OR e3=RegulatorStateChangeStream
            [ e1.roomNo == roomNo AND action == 'off']
HAVING action != 'none'            ;
```

### Logical Pattern Input

- First, below event is sent to `RegulatorStateChangeStream`:

    [`10`, `5`, `30`, `on`]

- Then, send below events are sent to `RoomKeyStream`:

    [`10`, `5`, `removed`]

### Logical Pattern Output

After processing the above input events, the event arriving at `RegulatorActionStream` is:

[`5`, `stop`]
