---
sidebar_position: 40
title: Table Operators
---

You can perform queries on tables in stream workers using the following operators.

## INSERT

This operator allows events to be inserted into tables. This is similar to inserting events into streams.

:::warning
If you insert duplicate data into a table that is defined with primary keys, then primary key constrain violations can occur.
In such cases, use the [Update or Insert Into](#update-or-insert-into) operation.
:::

### INSERT Syntax

```sql
INSERT (<parameter>)? INTO <table>
SELECT <attribute name>, <attribute name>, ...
FROM <input stream>
```

### INSERT Parameters

The following parameters allow you to select which events are inserted:

| Parameter     | Description |
| ------------- |-------------|
| all events    | Inserts events when incoming events arrive to be processed by the query as well as
when events expire from the window.  |
| current events    | Inserts events when incoming events arrive to be processed by the query.
This is default when no specific output event type is specified.     |
| expired events   | Inserts events when events expires from the window.     |

### INSERT Example

This query inserts all new events from the `TempStream` stream to the `TempTable` table.

```sql
INSERT INTO TempTable
SELECT *
FROM TempStream;
```

This query only inserts expired events:

```sql
INSERT expired events INTO TempTable
SELECT *
FROM TempStream;
```

## JOIN (Table)

This operator allows a stream to retrieve information from a table in a streaming manner.

:::note
Joins can also be performed with two [streams](../source/stream-source.md), [aggregations](../aggregations/index.md) or against externally [named windows](../windows/index.md).
:::

### JOIN Syntax

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

### JOIN Examples

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

### Supported JOIN Types

Table join supports the following join operations.

#### INNER JOIN (JOIN)

This is the default behavior of a join operation. `JOIN` is used as the keyword to join a stream with a table. Output is generated only if there is a matching event in both the stream and the table.

#### LEFT OUTER JOIN

The `LEFT OUTER JOIN` operation allows you to join a stream on the left side with a table on the right side based on a condition.
It returns all the events of the left stream even if there are no matching events in the right table by
having null values for the attributes of the right table.

#### RIGHT OUTER JOIN

The `RIGHT OUTER JOIN` operation allows you to join a stream on right side with a table on the left side based on a condition.
It returns all the events of the right stream even if there are no matching events in the left table.

## DELETE

This operator allows you to delete selected events that are stored in a table.

### DELETE Syntax

```sql
DELETE <table> (for <event type>)?
ON <condition>
FROM <input stream>;
```

The `condition` element specifies the basis on which events are selected to be deleted. When specifying the condition, table attributes should be referred to with the table name.

:::note
Table attributes must be always referred to with the table name as follows:
`<table name>.<attribute name>`
:::

### DELETE Parameters

The following parameters allow you to select which events are deleted:

| Parameter     | Description |
| ------------- |-------------|
| all events    | Deletes events when incoming events arrive to be processed by the query as well as
when events expire from the window.  |
| current events    | Deletes events when incoming events arrive to be processed by the query.
This is default when no specific output event type is specified.     |
| expired events   | Deletes events when events expires from the window.     |

### DELETE Examples

This query deletes expired events that meet certain conditions from SensorTable.

```sql
DELETE SensorTable FOR expired events
	ON SensorTable.sensorId == sensorId
FROM DeleteStream;
```

In this example, the script deletes a record in the `RoomTypeTable` table if it has a value for the `roomNo` attribute that matches the value for the `roomNumber` attribute of an event in the `DeleteStream` stream.

```sql
CREATE TABLE RoomTypeTable (roomNo int, type string);
CREATE STREAM DeleteStream (roomNumber int);

DELETE RoomTypeTable
ON RoomTypeTable.roomNo == roomNumber
FROM DeleteStream;
```

## UPDATE

This operator updates selected event attributes stored in a table based on a condition.

### UPDATE Syntax

```sql
UPDATE <table> (for <event type>)?
SET <table>.<attribute name> = (<attribute name>|<expression>)?, <table>.<attribute name> = (<attribute name>|<expression>)?, ...
ON <condition>

SELECT <attribute name>, <attribute name>, ...
FROM <input stream>;
```

#### SET What to Update

You can use the `SET` keyword to update selected attributes from the table. Here, for each assignment, the attribute specified in the left must be the table attribute, and the one specified in the right can be a stream or table attribute, a mathematical operation, or other. When the `SET` clause is not provided, all the attributes in the table are updated.

#### UPDATE Conditions

The `condition` element specifies the basis on which events are selected to be updated. When specifying the `condition`, table attributes must be referred to with the table name.

:::note
Table attributes must be always referred to with the table name as shown below:
`<table name>.<attribute name>`.
:::

### UPDATE Parameters

The following parameters allow you to select which events are updated:

| Parameter     | Description |
| ------------- |-------------|
| all events    | Updates events when incoming events arrive to be processed by the query as well as
when events expire from the window.  |
| current events    | Updates events when incoming events arrive to be processed by the query.
This is default when no specific output event type is specified.     |
| expired events   | Updates events when events expires from the window.     |

### UPDATE Examples

This query updates expired events that meet certain conditions.

```sql
UPDATE SensorTable FOR expired events
	SET SensorTable.temperature = temperature
	ON SensorTable.sensorId == sensorId
FROM TemperatureStream;
```

This stream worker updates the room occupancy in the `RoomOccupancyTable` table for each room number based on new arrivals and exits from the `UpdateStream` stream.

```sql
CREATE TABLE RoomOccupancyTable (roomNo int, people int);
CREATE STREAM UpdateStream (roomNumber int, arrival int, exit int);

UPDATE RoomOccupancyTable
SET RoomOccupancyTable.people = RoomOccupancyTable.people
ON RoomOccupancyTable.roomNo == roomNumber

SELECT * 
FROM UpdateStream;
```

## UPDATE or INSERT INTO

This allows you update if the event attributes already exist in the table based on a condition, or else insert the entry as a new attribute.

### UPDATE or INSERT INTO Syntax

```sql
UPDATE or INSERT INTO <table> (for <event type>)?
SET <table>.<attribute name> = <expression>, <table>.<attribute name> = <expression>, ...
ON <condition>
    
SELECT <attribute name>, <attribute name>, ...
FROM <input stream>;
```

The `SET` clause is only used when an update is performed during the insert/update operation. When `SET` is used, the attribute to the left is always a table attribute, and the attribute to the right can be a stream or table attribute, mathematical operation, or other. The attribute to the left (the attribute in the event table) is updated with the value of the attribute to the right if the given condition is met. When the `SET` clause is not provided, all the attributes in the table are updated.

:::note
When the attribute to the right is a table attribute, the operations supported differ based on the database type.
:::

The `condition` element specifies the basis on which events are selected for update. When specifying the `condition`, table attributes should be referred to with the table name. If a record that matches the condition does not already exist in the table, then the arriving event is inserted into the table.

:::note
Table attributes should be always referred to with the table name as `<table name>.<attribute name>`.
:::

### UPDATE or INSERT INTO Parameters

The following parameters allow you to select which events are updated or inserted:

| Parameter     | Description |
| ------------- |-------------|
| all events    | Updates or inserts events when incoming events arrive to be processed by the query as well as
when events expire from the window.  |
| current events    | Updates or inserts events when incoming events arrive to be processed by the query.
This is default when no specific output event type is specified.     |
| expired events   | Updates or inserts events when events expires from the window.     |

### UPDATE or INSERT INTO Example

The following stream worker update for events in the `UpdateTable` event table that have room numbers that match the same in the `UpdateStream` stream. When such events are found in the event table, they are updated. When a room number available in the stream is not found in the event table, it is inserted from the stream.

```sql
CREATE TABLE RoomAssigneeTable (roomNo int, type string, assignee string);
CREATE STREAM RoomAssigneeStream (roomNumber int, type string, assignee string);

UPDATE or INSERT INTO RoomAssigneeTable
SET RoomAssigneeTable.assignee = assignee
ON RoomAssigneeTable.roomNo == roomNo
    
SELECT roomNumber as roomNo, type, assignee
FROM RoomAssigneeStream;
```

## IN (Look Up)

This operator allows the stream to check whether the expected value exists in the table as a part of a conditional operation.

### IN Syntax

```sql
INSERT INTO <output stream>
FROM <input stream>[<condition> IN <table>]
```

The `condition` element specifies the basis on which events are selected to be compared. When constructing the `condition`, the table attribute must be always referred to with the table name as shown below:

```sql
<table>.<attribute name>
```

### IN Example

This query looks up sensor IDs in a sensor stream.

```sql
INSERT INTO ExistingSensorStream
FROM SensorStream[SensorTable.sensorId == sensorId in SensorTable]
```

This stream worker filters only room numbers that are listed in the `ServerRoomTable` table.

```sql
CREATE TABLE ServerRoomTable (roomNo int);
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

INSERT INTO ServerRoomTempStream
FROM TempStream[ServerRoomTable.roomNo == roomNo in ServerRoomTable];
```
