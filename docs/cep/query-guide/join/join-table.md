---
title: JOIN (Table)
---

This operator allows a stream to retrieve information from a table in a streaming manner.

## JOIN Syntax

```sql
INSERT INTO <output stream>
SELECT (<input stream>|<table>).<attribute name>, (<input stream>|<table>).<attribute name>, ...
FROM <input stream> JOIN <table>
ON <condition>
```

:::note
A table (collection) can only be joined with a stream. Two tables cannot be joined, because there must be at least one active
entity to trigger the join operation.
:::

## JOIN Examples

This query joins a stream with a table and outputs the sensor data into an `OutputStream`.

```sql
INSERT INTO OutputStream
SELECT st.sensorId, st.temperature, ts.type AS type
FROM TempStream AS ts JOIN SensorTable AS st
    ON ts.sensorId == st.sensorId;
```

This stream worker performs a join to retrieve the room type from `RoomTypeTable` table based on the room number, so that it can filter the events related to `server-room`s.

```sql
CREATE TABLE RoomTypeTable (roomNo int, type string);
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

INSERT INTO ServerRoomTempStream
SELECT deviceID, RoomTypeTable.type as roomType, type, temp
FROM TempStream JOIN RoomTypeTable
ON RoomTypeTable.roomNo == TempStream.roomNo
HAVING roomType == 'server-room';
```

## Supported JOIN Types

Table join supports the following join operations.

### INNER JOIN (JOIN)

This is the default behavior of a join operation. `JOIN` is used as the keyword to join a stream with a table. Output is generated only if there is a matching event in both the stream and the table.

### LEFT OUTER JOIN

The `LEFT OUTER JOIN` operation allows you to join a stream on the left side with a table on the right side based on a condition.
It returns all the events of the left stream even if there are no matching events in the right table by
having null values for the attributes of the right table.

### RIGHT OUTER JOIN

The `RIGHT OUTER JOIN` operation allows you to join a stream on right side with a table on the left side based on a condition.
It returns all the events of the right stream even if there are no matching events in the left table.
