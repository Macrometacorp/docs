---
sidebar_position: 1
title: Tables (Collections)
---

A _table_ is a stored version of an stream or a table of events. Its schema is defined in the _table definition_ that is similar to a stream definition. These events are stored in database. In Macrometa GDN, tables are called [collections](../../collections/).

## Purpose

Tables allow the stream worker to work with stored events. By defining a schema for tables, the stream processor enables them to be processed by queries using their defined attributes with the streaming data. You can also query the state of the stored events in the table.

Any table defined in a stream worker is automatically a store for that stream worker. Tables can be stores or [sinks](../sink/).

You can query table contents using [Table Operators](table-operators).

You can speed up reference time by creating one or more [Table Indexes](table-indexes).

## Syntax

There are two ways to define tables.

### CREATE TABLE

The syntax for a new table definition is as follows:

```sql
CREATE TABLE (GLOBAL|LOCAL)? <table_name> (<attribute_name> <attribute_type>, ...);
```

For example, this statement creates a global collection:

```sql
CREATE TABLE SensorTable (sensorId string, temperature double);
```

### CREATE STORE

You can also use general store syntax:

```sql
CREATE STORE (GLOBAL|LOCAL)? <table_name> WITH(type="<store_type>", propKey=”propVal”, … , PrimaryKey='<attribute_name>', Index='<attribute_name>')(<attribute_name> <attribute_type>, ...);
```

For example, this statement creates a global collection:

```sql
CREATE STORE SensorTable WITH(type=’database’, collection=’SampleTable’, map.type=’json’) (sensorId string, temperature double);
```

## Parameters

The following parameters are configured in a table definition:

| Parameter     | Description |
| ------------- |-------------|
| table name      | The name of the table defined. (`PascalCase` is used for table name as a convention.) |
| GLOBAL or LOCAL      | Whether the table is globally or locally replicated. Default is `GLOBAL`. |
| attribute name   | The schema of the table is defined by its attributes with uniquely identifiable attribute names (`camelCase` is used for attribute names as a convention.)|    |
| attribute type   | The type of each attribute defined in the schema.  This can be `STRING`, `INT`, `LONG`, `DOUBLE`, `FLOAT`, `BOOL`, or `OBJECT`.     |
| from        | If `collection.type` is specified as `edge`, this field indicates which field to be considered as a source node of the edge.      | _from         | STRING              | Yes      |
| to          | If `collection.type` is specified as `edge`, this field indicates which field to be considered as a destination node of the edge. | _to      | STRING              | Yes      |

## Examples

The following defines a local table named `RoomTypeTable` with `roomNo` and `type` attributes of data types `int` and `string` respectively.

```sql
CREATE TABLE RoomTypeTable (roomNo int, type string);
```

The following defines a global table named `SweetProductionCollection` with `name` and `amount` attributes of data types `string` and `double`.

```sql
CREATE TABLE GLOBAL SweetProductionCollection (name string, amount double);
```
