---
sidebar_position: 40
title: Table (Collection)
---

A table is a stored version of an stream or a table of events. Its schema is defined via the _table definition_ that is similar to a stream definition. These events are stored in database.

## Table Purpose

Tables allow the stream processor to work with stored events. By defining a schema for tables, the stream processor enables them to be processed by queries using their defined attributes with the streaming data. You can also interactively query the state of the stored events in the table.

### Table Syntax

The syntax for a new table definition is as follows:

```
CREATE TABLE <table name> (<attribute name> <attribute type>, <attribute name> <attribute type>, ... );
```

The following parameters are configured in a table definition:

| Parameter     | Description |
| ------------- |-------------|
| `table name`      | The name of the table defined. (`PascalCase` is used for table name as a convention.) |
| `attribute name`   | The schema of the table is defined by its attributes with uniquely identifiable attribute names (`camelCase` is used for attribute names as a convention.)|    |
| `attribute type`   | The type of each attribute defined in the schema.  This can be `STRING`, `INT`, `LONG`, `DOUBLE`, `FLOAT`, `BOOL` or `OBJECT`.     |

**Example**

The following defines a table named `RoomTypeTable` with `roomNo` and `type` attributes of data types `int` and `string` respectively.

```
CREATE TABLE RoomTypeTable (roomNo int, type string);
```

## Indexes

Indexes allow tables to be searched/modified much faster.

Indexes can be configured together with primary keys.

When more than one attribute is used for index, each one of them is used to index the table for fast access to the data.

**Example 1**

```
CREATE SOURCE StockTable WITH (type='database',collection='StockTable',PrimaryKey='symbol', Index='key1', Index='key2') (symbol string, price float, volume long);
```

**Example 2**

```js
-- Creates a persistent index named `SamplePersistentIndex` on `SampleGDNTable` with following properties {unique=true, sparse=true, deduplicate=true}.
CREATE UNIQUE INDEX SamplePersistentIndex ON TABLE SampleGDNTable WITH(type="persistent", sparse="true", deduplicate="true") (sensorId);

-- Creates a hash index named `SampleHashIndex` on `SampleGDNTable` with following properties {unique=true, sparse=true, deduplicate=true}.
CREATE UNIQUE INDEX SampleHashIndex ON TABLE SampleGDNTable WITH(type="hash", sparse="true", deduplicate="true") (sensorId);

-- Creates a skiplist index named `SampleSkiplistIndex` on `SampleGDNTable` with following properties {unique=true, sparse=true, deduplicate=true}.
CREATE UNIQUE INDEX SampleSkiplistIndex ON TABLE SampleGDNTable WITH(type="skiplist", sparse="true", deduplicate="true") (sensorId);

-- Creates a fulltext index named `SampleFullTextIndex` on `SampleGDNTable` with following properties {minLength=3}.
CREATE INDEX SampleFullTextIndex ON TABLE SampleGDNTable WITH(type="fulltext", minLength="3") (sensorId);

-- Creates a geo index named `SampleGeoIndex` on `SampleGDNTable` with following properties {geoJson=false}.
CREATE INDEX SampleGeoIndex ON TABLE SampleGDNTable WITH(type="geo", geoJson="false") (sensorId);

-- Creates a ttl index named `SampleTTLIndex` on `SampleGDNTable` with following properties {expireAfter=3600}.
CREATE INDEX SampleTTLIndex ON TABLE SampleGDNTable WITH(type="ttl", expireAfter="3600") (sensorId);
```

## Store

Store is a table that refers to data/events stored in data stores outside of stream. Store is defined via the `@store` annotation, and the store schema is defined via a **table definition** associated with it.

**Purpose**

Store allows the stream processor to search, retrieve and manipulate data stored in database through stream queries.

**Syntax**

The syntax for a defining store and it's associated table definition is as follows:

```
CREATE SOURCE TableName WITH (type='store_type', static.option.key1='static_option_value1', static.option.keyN='static_option_valueN') (attribute1 Type1, attributeN TypeN);
```

**Example**

The following defines a database having a table `RoomTypeTable` with columns `roomNo` of `INTEGER` and `type` of `VARCHAR(255)` mapped to Stream data types `int` and `string` respectively.

```
CREATE SOURCE RoomTypeTable WITH (type="database", collection="RoomTypeTable") (roomNo int, type string);
```

**Operators on Table**

The following operators can be performed on tables.

## Insert

This allows events to be inserted into tables. This is similar to inserting events into streams.

:::warning
If the table is defined with primary keys, and if you insert duplicate data, primary key constrain violations can occur.
In such cases use the `update or insert into` operation.
:::
**Syntax**

```
INSERT INTO <table>
SELECT <attribute name>, <attribute name>, ...
FROM <input stream>
```

Similar to streams, you need to use the `current events`, `expired events` or the `all events` keyword between `insert` and `into` keywords in order to insert only the specific event types.

For more information, see [Event Type](#event-type)

**Example**

This query inserts all the events from the `TempStream` stream to the `TempTable` table.

```
INSERT INTO TempTable
SELECT *
FROM TempStream;
```

## Join (Table)

This allows a stream to retrieve information from a table in a streaming manner.

:::note
Joins can also be performed with [two streams](#join-stream), [aggregation](#join-aggregation) or against externally [named windows](#join-window).
:::

**Syntax**

```
INSERT INTO <output stream>
SELECT (<input stream>|<table>).<attribute name>, (<input stream>|<table>).<attribute name>, ...
FROM <input stream> JOIN <table>
ON <condition>
```

:::note
A table can only be joint with a stream. Two tables cannot be joint because there must be at least one active
entity to trigger the join operation.
:::

**Example**

This Stream App performs a join to retrieve the room type from `RoomTypeTable` table based on the room number, so that it can filter the events related to `server-room`s.

```
CREATE TABLE RoomTypeTable (roomNo int, type string);
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

INSERT INTO ServerRoomTempStream
SELECT deviceID, RoomTypeTable.type as roomType, type, temp
FROM TempStream JOIN RoomTypeTable
ON RoomTypeTable.roomNo == TempStream.roomNo
HAVING roomType == 'server-room';
```

**Supported join types**

Table join supports following join operations.

- **Inner join (join)**

    This is the default behavior of a join operation. `join` is used as the keyword to join the stream with the table. The output is generated only if there is a matching event in both the stream and the table.

- **Left outer join**

    The `left outer join` operation allows you to join a stream on left side with a table on the right side based on a condition.
    Here, it returns all the events of left stream even if there are no matching events in the right table by
    having null values for the attributes of the right table.

- **Right outer join**

    This is similar to a `left outer join`. `right outer join` is used as the keyword to join a stream on right side with a table on the left side based on a condition.
    It returns all the events of the right stream even if there are no matching events in the left table.

## Delete

To delete selected events that are stored in a table.

**Syntax**

```
DELETE <table> (for <event type>)?
ON <condition>
FROM <input stream>;
```

The `condition` element specifies the basis on which events are selected to be deleted. When specifying the condition, table attributes should be referred to with the table name.

To execute delete for specific event types, use the `current events`, `expired events` or the `all events` keyword with `for` as shown in the syntax. For more information, see [Event Type](#event-type)

:::note
Table attributes must be always referred to with the table name as follows:
`<table name>.<attibute name>`
:::

**Example**

In this example, the script deletes a record in the `RoomTypeTable` table if it has a value for the `roomNo` attribute that matches the value for the `roomNumber` attribute of an event in the `DeleteStream` stream.

```
CREATE TABLE RoomTypeTable (roomNo int, type string);
CREATE STREAM DeleteStream (roomNumber int);

DELETE RoomTypeTable
ON RoomTypeTable.roomNo == roomNumber
FROM DeleteStream;
```

## Update

This operator updates selected event attributes stored in a table based on a condition.

**Syntax**

```
UPDATE <table> (for <event type>)?
SET <table>.<attribute name> = (<attribute name>|<expression>)?, <table>.<attribute name> = (<attribute name>|<expression>)?, ...
ON <condition>

SELECT <attribute name>, <attribute name>, ...
FROM <input stream>;
```

The `condition` element specifies the basis on which events are selected to be updated. When specifying the `condition`, table attributes must be referred to with the table name.

You can use the `set` keyword to update selected attributes from the table. Here, for each assignment, the attribute specified in the left must be the table attribute, and the one specified in the right can be a stream/table attribute a mathematical operation, or other. When the `set` clause is not provided, all the attributes in the table are updated.

To execute an update for specific event types use the `current events`, `expired events` or the `all events` keyword with `for` as shown in the syntax. For more information, see [Event Type](#event-type).

:::note
Table attributes must be always referred to with the table name as shown below:
`<table name>.<attibute name>`.
:::

**Example**

This stream application updates the room occupancy in the `RoomOccupancyTable` table for each room number based on new arrivals and exits from the `UpdateStream` stream.

```
CREATE TABLE RoomOccupancyTable (roomNo int, people int);
CREATE STREAM UpdateStream (roomNumber int, arrival int, exit int);

UPDATE RoomOccupancyTable
SET RoomOccupancyTable.people = RoomOccupancyTable.people
ON RoomOccupancyTable.roomNo == roomNumber

SELECT * 
FROM UpdateStream;
```

## Update or Insert

This allows you update if the event attributes already exist in the table based on a condition, or else insert the entry as a new attribute.

**Syntax**

```
UPDATE or INSERT INTO <table> (for <event type>)?
SET <table>.<attribute name> = <expression>, <table>.<attribute name> = <expression>, ...
ON <condition>
    
SELECT <attribute name>, <attribute name>, ...
FROM <input stream>;
```

The `condition` element specifies the basis on which events are selected for update. When specifying the `condition`, table attributes should be referred to with the table name. If a record that matches the condition does not already exist in the table, the arriving event is inserted into the table.

The `set` clause is only used when an update is performed during the insert/update operation. When `set` clause is used, the attribute to the left is always a table attribute, and the attribute to the right can be a stream/table attribute, mathematical operation or other. The attribute to the left (i.e., the attribute in the event table) is updated with the value of the attribute to the right if the given condition is met. When the `set` clause is not provided, all the attributes in the table are updated.

:::note
When the attribute to the right is a table attribute, the operations supported differ based on the database type.
:::

To execute update upon specific event types use the `current events`, `expired events` or the `all events` keyword with `for` as shown in the syntax. To understand more see [Event Type](#event-type).

:::note
Table attributes should be always referred to with the table name as `<table name>.<attibute name>`.
:::

**Example**

The following query update for events in the `UpdateTable` event table that have room numbers that match the same in the `UpdateStream` stream. When such events are found in the event table, they are updated. When a room number available in the stream is not found in the event table, it is inserted from the stream.

```
CREATE TABLE RoomAssigneeTable (roomNo int, type string, assignee string);
CREATE STREAM RoomAssigneeStream (roomNumber int, type string, assignee string);

UPDATE or INSERT INTO RoomAssigneeTable
SET RoomAssigneeTable.assignee = assignee
ON RoomAssigneeTable.roomNo == roomNo
    
SELECT roomNumber as roomNo, type, assignee
FROM RoomAssigneeStream;
```

## In

This allows the stream to check whether the expected value exists in the table as a part of a conditional operation.

**Syntax**

```
INSERT INTO <output stream>
FROM <input stream>[<condition> IN <table>]
```

The `condition` element specifies the basis on which events are selected to be compared. When constructing the `condition`, the table attribute must be always referred to with the table name as shown below:

```
<table>.<attibute name>
```

**Example**

This Stream application filters only room numbers that are listed in the `ServerRoomTable` table.

```
CREATE TABLE ServerRoomTable (roomNo int);
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

INSERT INTO ServerRoomTempStream
FROM TempStream[ServerRoomTable.roomNo == roomNo in ServerRoomTable];
```
