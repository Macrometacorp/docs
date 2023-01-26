---
title: Ad Hoc Queries
sidebar_position: 1
---

Ad hoc queries are on-demand queries that can be used to perform operations on tables (stores or collections), named windows, and named aggregations. You can send ad hoc queries and fetch data from stores and named windows.

## Purpose

Ad hoc queries allow you to execute the following operations on tables (collections), windows, and aggregators without the intervention of streams.

Queries supported for tables:

- INSERT
- SELECT
- DELETE
- UPDATE
- UPDATE OR INSERT

Queries supported for windows and aggregators:

- SELECT

## Syntax

Ad hoc queries use the following syntax:

```js
	select * from SampleAdhocQueryInputTableOneMinTimeWindow;
	
	SELECT * FROM SampleAdhocQueryTable;
```

In order to execute ad hoc queries, the stream worker you are using should have a sink or defined that contains the table, window, or aggregator to be queried.

## Examples

This section shows examples for each type of ad hoc query.

### (Aggregation) Select

The `SELECT` store query retrieves records from the specified aggregation, based on the given condition, time range,
and granularity.

#### Aggregation Select Syntax

```sql
select <attribute name>, <attribute name>, ...
from <aggregation>
<on condition>?
within <time range>
per <time granularity>
<group by>?
<having>?
<order by>?
<limit>?
```

#### Aggregation Select Example

The following aggregation definition will be used for the examples:

```sql
CREATE STREAM TradeStream (symbol string, price double, volume long, timestamp long);

CREATE AGGREGATION TradeAggregation
select symbol, avg(price) as avgPrice, sum(price) as total
from TradeStream
  group by symbol
  aggregate by timestamp every sec ... year;
```

This query retrieves daily aggregations within the time range `"2014-02-15 00:00:00 +05:30", "2014-03-16 00:00:00 +05:30"` (Note that +05:30 can be omitted if timezone is GMT.)

```sql
select symbol, total, avgPrice 
from TradeAggregation
  within "2014-02-15 00:00:00 +05:30", "2014-03-16 00:00:00 +05:30"
  per "days";
```

This query retrieves hourly aggregations of "FB" symbol within the day `2014-02-15`:

```sql
select symbol, total, avgPrice
from TradeAggregation
  on symbol == "FB"
  within "2014-02-15 **:**:** +05:30"
  per "hours";
```

### (Table/Window) Select

The `SELECT` store query retrieves records from the specified table or window, based on the given condition.

#### Table Select Syntax

```sql
select <attribute name>, <attribute name>, ...
from <table/window>
<on condition>?
<group by>?
<having>?
<order by>?
<limit>?
```

#### Table Select Example

Assume that you have a stream worker that defines a table named `RoomTypeTable`. This ad hoc query retrieves room numbers and types of the rooms starting from room 10.

```sql
select roomNo, type
from roomTypeTable
on roomNo >= 10;
```

### Insert

This allows you to insert a new record to the table with the attribute values you define in the `select` section.

#### Insert Syntax

```sql
insert into <table>
select <attribute name>, <attribute name>, ...;
```

#### Insert Example

This ad hoc query inserts a new record to the table `RoomOccupancyTable`, with the specified attribute values.

```sql
insert into RoomOccupancyTable
select 10 as roomNo, 2 as people
```

### Delete

The `DELETE` ad hoc query deletes selected records from a specified table.

#### Delete Syntax

```sql
<select>?  
delete <table>  
on <conditional expression>
```

The `condition` element specifies the basis on which records are selected to be deleted.

:::note
Table attributes must always be referred to with the table name as:
`<table name>.<attibute name>`.
:::

#### Delete Example

In this example, the ad hoc query deletes a record in the table named `RoomTypeTable` if it has value for the `roomNo` attribute that matches the value for the `roomNumber` attribute of the selection, which has 10 as the actual value.

```sql
select 10 as roomNumber
delete RoomTypeTable
on RoomTypeTable.roomNo == roomNumber;
```

```sql
delete RoomTypeTable
on RoomTypeTable.roomNo == 10;
```

### Update

The `UPDATE` ad hoc query updates selected attributes stored in a specific table based on a given condition.

#### Update Syntax

```sql
update <table>
    set <table>.<attribute name> = (<attribute name>|<expression>)?, <table>.<attribute name> = (<attribute name>|<expression>)?, ...
    on <condition>
select <attribute name>, <attribute name>, ...?
```

The `condition` element specifies the basis on which records are selected to be updated. When specifying the `condition`, table attributes must be referred to with the table name.

You can use the `set` keyword to update selected attributes from the table. Here, for each assignment, the attribute specified in the left must be the table attribute, and the one specified in the right can be a stream/table attribute a mathematical operation, or other. When the `set` clause is not provided, all the attributes in the table are updated.

:::note
Table attributes must always be referred to with the table name as:
`<table name>.<attibute name>`.
:::

#### Update Example

The following query updates the room occupancy by declaring the value of `people`, in the `RoomTypeTable` table for each room number equal to 10.

```sql
update RoomTypeTable
   set RoomTypeTable.people = people
    on RoomTypeTable.roomNo == roomNumber
select 10 as roomNumber, arrival - exit as people
  from UpdateStream;
```

### Update or Insert

This ad hoc query allows you to update selected attributes if a record that meets the given conditions already exists in the specified table. If a matching record does not exist, then the entry is inserted as a new record.

#### Update or Insert Syntax

```sql
update or insert into <table>
    set <table>.<attribute name> = <expression>, <table>.<attribute name> = <expression>, ...
    on <condition>
select <attribute name>, <attribute name>, ...
```

The `condition` element specifies the basis on which records are selected for update. When specifying the `condition`, table attributes should be referred to with the table name. If a record that matches the condition does not already exist in the table, then the arriving event is inserted into the table.

The `set` clause is only used when an update is performed during the insert/update operation. When `set` is used, the attribute to the left is always a table attribute, and the attribute to the right can be a stream/table attribute, mathematical operation or other. The attribute to the left (i.e., the attribute in the event table) is updated with the value of the attribute to the right if the given condition is met. When the `set` clause is not provided, all the attributes in the table are updated.

:::note
Table attributes must always be referred to with the table name as:
`<table name>.<attibute name>`.
:::

#### Update or Insert Example

The following query tries to update the records in the `RoomAssigneeTable` table that have room numbers that match the same in the selection. If such records are not found, it inserts a new record based on the values provided in the selection.

```sql
update or insert into RoomAssigneeTable
    set RoomAssigneeTable.assignee = assignee
    on RoomAssigneeTable.roomNo == roomNo
select 10 as roomNo, "single" as type, "abc" as assignee
from RoomAssigneeStream;
```

### Event Playback

When `@app:playback` annotation is added to the stream worker, the timestamp of the event (specified via an attribute) is treated as the current time. This results in events being processed faster.

The following elements are configured with this annotation.

|Annotation| Description|
| ------------- |-------------|
|`idle.time`|If no events are received during a time interval specified (in milliseconds) via this element, the source system time is incremented by a number of seconds specified via the `increment` element.|
|`increment`|The number of seconds by which the source system time must be incremented if no events are received during the time interval specified via the `idle.time` element.|

e.g., In the following example, the Stream system time is incremented by two seconds if no events arrive for a time interval of 100 milliseconds.

```
@app:playback(idle.time = '100 millisecond', increment = '2 sec') 
```
