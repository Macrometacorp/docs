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

## Example 1

```sql
CREATE STREAM TempStream(deviceID long, temp double);
CREATE STREAM HumidStream(deviceID long, humid double);
CREATE STREAM RegulatorStream(deviceID long, isOn bool);

INSERT INTO StateNotificationStream
SELECT e2.temp, e3.humid
FROM every e1=RegulatorStream, e2=TempStream AND e3=HumidStream;
```

This stream worker notifies the state when a regulator event is immediately followed by both temperature and humidity events.

## Example 2

The sequence can repetitively match event `sequences` and use logical event ordering (using `AND`, `OR`, and `NOT`).

### Logical Sequence Example

This stream worker can be used identify a regulator activation event immediately followed by both temperature sensor and humidity sensor activation events in either order.

```sql
-- Defines `TempSensorStream` having information of temperature sensor device.
CREATE STREAM TempSensorStream(deviceID long, isActive bool);

-- Defines `HumidSensorStream` having information of humidity sensor device.
CREATE STREAM HumidSensorStream(deviceID long, isActive bool);

-- Defines `RegulatorStream` which contains the events from regulator with attributes `deviceID` and `isOn`.
CREATE STREAM RegulatorStream(deviceID long, isOn bool);

-- Defines `StateNotificationStream`, which logs changes.
CREATE SINK StateNotificationStream WITH (type='log') (deviceID long, tempSensorActive bool, humidSensorActive bool);


-- Identifies a regulator activation event immediately followed by both temperature sensor and humidity sensor activation events in either order.
INSERT INTO StateNotificationStream
SELECT e1.deviceID, e2.isActive AS tempSensorActive,
    e3.isActive AS humidSensorActive
FROM every e1=RegulatorStream[isOn == true],
    e2=TempSensorStream and e3=HumidSensorStream;
```

### Logical Sequence Input

- First, below event is sent to `RegulatorStream`:

    [`2134`, `true`]

- Then, below event is sent to `HumidSensorStream`:

    [`124`, `true`]

- Then, below event is sent to `TempSensorStream`:

    [`242`, `false`]

### Logical Sequence Output

After processing the above input events, the event arriving at `StateNotificationStream` is:

[`2134`, `false`, `true`]
