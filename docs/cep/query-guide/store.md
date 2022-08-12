---
sidebar_position: 100
title: Store
---

Stream store queries are a set of on-demand queries that can be used to perform operations on Stream tables, windows, and aggregators.

**Purpose**

Store queries allow you to execute the following operations on Stream tables, windows, and aggregators without the intervention of streams.

Queries supported for tables:

- INSERT
- SELECT
- DELETE
- UPDATE
- UPDATE OR INSERT

Queries supported for windows and aggregators:

- SELECT

This is be done by submitting the store query to the Stream application runtime using its `query()` method.

In order to execute store queries, the Stream application of the Stream application runtime you are using, should have a store defined, which contains the table that needs to be queried.

**Example**

If you need to query the table named `RoomTypeTable` the it should have been defined in the Stream application.

In order to execute a store query on `RoomTypeTable`, you need to submit the store query using `query()` method.

### _(Table/Window)_ Select

The `SELECT` store query retrieves records from the specified table or window, based on the given condition.

**Syntax**

```
from <table/window>
<on condition>?
select <attribute name>, <attribute name>, ...
<group by>?
<having>?
<order by>?
<limit>?
```

**Example**

This query retrieves room numbers and types of the rooms starting from room no 10.

```
select roomNo, type
from roomTypeTable
on roomNo >= 10;
```

### _(Aggregation)_ Select

The `SELECT` store query retrieves records from the specified aggregation, based on the given condition, time range,
and granularity.

**Syntax**

```
from <aggregation>
<on condition>?
within <time range>
per <time granularity>
select <attribute name>, <attribute name>, ...
<group by>?
<having>?
<order by>?
<limit>?
```

**Example**

Following aggregation definition will be used for the examples.

```
CREATE STREAM TradeStream (symbol string, price double, volume long, timestamp long);

CREATE AGGREGATION TradeAggregation
  select symbol, avg(price) as avgPrice, sum(price) as total
    group by symbol
    aggregate by timestamp every sec ... year
  from TradeStream;
```

This query retrieves daily aggregations within the time range `"2014-02-15 00:00:00 +05:30", "2014-03-16 00:00:00 +05:30"` (Please note that +05:30 can be omitted if timezone is GMT)

```
select symbol, total, avgPrice 
from TradeAggregation
  within "2014-02-15 00:00:00 +05:30", "2014-03-16 00:00:00 +05:30"
  per "days";
```

This query retrieves hourly aggregations of "FB" symbol within the day `2014-02-15`.

```
select symbol, total, avgPrice
from TradeAggregation
  on symbol == "FB"
  within "2014-02-15 **:**:** +05:30"
  per "hours";
```

### Insert

This allows you to insert a new record to the table with the attribute values you define in the `select` section.

**Syntax**

```
insert into <table>
select <attribute name>, <attribute name>, ...;
```

**Example**

This store query inserts a new record to the table `RoomOccupancyTable`, with the specified attribute values.

```
insert into RoomOccupancyTable
select 10 as roomNo, 2 as people
```

### Delete

The `DELETE` store query deletes selected records from a specified table.

**Syntax**

```
<select>?  
delete <table>  
on <conditional expresssion>
```

The `condition` element specifies the basis on which records are selected to be deleted.

:::note
Table attributes must always be referred to with the table name as shown below:
`<table name>.<attibute name>`.
:::

**Example**

In this example, query deletes a record in the table named `RoomTypeTable` if it has value for the `roomNo` attribute that matches the value for the `roomNumber` attribute of the selection which has 10 as the actual value.

```
select 10 as roomNumber
delete RoomTypeTable
on RoomTypeTable.roomNo == roomNumber;
```

```
delete RoomTypeTable
on RoomTypeTable.roomNo == 10;
```

### Update

The `UPDATE` store query updates selected attributes stored in a specific table, based on a given condition.

**Syntax**

```
select <attribute name>, <attribute name>, ...?
update <table>
    set <table>.<attribute name> = (<attribute name>|<expression>)?, <table>.<attribute name> = (<attribute name>|<expression>)?, ...
    on <condition>
```

The `condition` element specifies the basis on which records are selected to be updated. When specifying the `condition`, table attributes must be referred to with the table name.

You can use the `set` keyword to update selected attributes from the table. Here, for each assignment, the attribute specified in the left must be the table attribute, and the one specified in the right can be a stream/table attribute a mathematical operation, or other. When the `set` clause is not provided, all the attributes in the table are updated.

:::note
Table attributes must always be referred to with the table name as shown below:
`<table name>.<attibute name>`.
:::

**Example**

The following query updates the room occupancy by increasing the value of `people` by 1, in the `RoomOccupancyTable` table for each room number greater than 10.

```
select 10 as roomNumber, 1 as arrival
update RoomTypeTable
    set RoomTypeTable.people = RoomTypeTable.people + arrival
    on RoomTypeTable.roomNo == roomNumber;
```

```
update RoomTypeTable
    set RoomTypeTable.people = RoomTypeTable.people + 1
    on RoomTypeTable.roomNo == 10;
```

### Update or Insert

This allows you to update selected attributes if a record that meets the given conditions already exists in the specified  table.
If a matching record does not exist, the entry is inserted as a new record.

**Syntax**

```
select <attribute name>, <attribute name>, ...
update or insert into <table>
    set <table>.<attribute name> = <expression>, <table>.<attribute name> = <expression>, ...
    on <condition>
```

The `condition` element specifies the basis on which records are selected for update. When specifying the `condition`, table attributes should be referred to with the table name. If a record that matches the condition does not already exist in the table, the arriving event is inserted into the table.

The `set` clause is only used when an update is performed during the insert/update operation. When `set` clause is used, the attribute to the left is always a table attribute, and the attribute to the right can be a stream/table attribute, mathematical operation or other. The attribute to the left (i.e., the attribute in the event table) is updated with the value of the attribute to the right if the given condition is met. When the `set` clause is not provided, all the attributes in the table are updated.

:::note
Table attributes must always be referred to with the table name as shown below:
`<table name>.<attibute name>`.
:::

**Example**

The following query tries to update the records in the `RoomAssigneeTable` table that have room numbers that match the same in the selection. If such records are not found, it inserts a new record based on the values provided in the selection.

```
select 10 as roomNo, "single" as type, "abc" as assignee
update or insert into RoomAssigneeTable
    set RoomAssigneeTable.assignee = assignee
    on RoomAssigneeTable.roomNo == roomNo;
```

### Event Playback

When `@app:playback` annotation is added to the app, the timestamp of the event (specified via an attribute) is treated as the current time. This results in events being processed faster.

The following elements are configured with this annotation.

|Annotation| Description|
| ------------- |-------------|
|`idle.time`|If no events are received during a time interval specified (in milliseconds) via this element, the Stream system time is incremented by a number of seconds specified via the `increment` element.|
|`increment`|The number of seconds by which the Stream system time must be incremented if no events are received during the time interval specified via the `idle.time` element.|

e.g., In the following example, the Stream system time is incremented by two seconds if no events arrive for a time interval of 100 milliseconds.

```
@app:playback(idle.time = '100 millisecond', increment = '2 sec') 
```
