---
sidebar_position: 1
title: Tables (Collections)
---

A _table_ is a stored version of an stream or a table of events. Its schema is defined in the _table definition_ that is similar to a stream definition. These events are stored in database. In Macrometa GDN, tables are called [collections](../../collections/).

:::note
If you want to use an existing Macrometa collection as a store, then you must define it in the stream worker.
:::

## Purpose

Tables allow the stream worker to work with stored events. By defining a schema for tables, the stream processor enables them to be processed by queries using their defined attributes with the streaming data. You can also query the state of the stored events in the table.

Any table defined in a stream worker is automatically a store for that stream worker. Tables can be stores or [sinks](../sink/).

You can query table contents using [Table Operators](table-operators).

You can speed up reference time by creating one or more [Table Indexes](table-indexes).

## Syntax

There are several ways to define tables.

### CREATE TABLE

The syntax for a new table definition is as follows:

```sql
CREATE TABLE (GLOBAL|LOCAL)? <table_name> (<attribute_name> <attribute_type>, ...);
```

For example, this statement creates a global collection:

```sql
CREATE TABLE SensorTable (sensorId string, temperature double);
```

### CREATE TABLE AS SELECT

The `CREATE TABLE AS SELECT` statement creates a new table by selecting data from an existing stream and applying filters or transformations. The new table can be used for persistent storage, querying, and analysis.

The syntax for `CREATE TABLE AS SELECT` is as follows:

```sql
CREATE TABLE <table_name> (<attribute_name> <attribute_type>, ...)
[WITH ( property_name = expression [, ...] )]
  AS SELECT  select_expr [, ...]
FROM from_stream … ;
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
| [WITH (property_name = expression [, ...])] | Optional properties for the new table, such as a time-to-live or a partition key. |
| SELECT select_expr [, ...] | The selection criteria for the new table. |
| FROM from_stream … | The name of the existing stream to select data from. |

## Example 1

The following defines a local table named `RoomTypeTable` with `roomNo` and `type` attributes of data types `int` and `string` respectively.

```sql
CREATE TABLE RoomTypeTable (roomNo int, type string);
```

## Example 2

The following defines a global table named `SweetProductionCollection` with `name` and `amount` attributes of data types `string` and `double`.

```sql
CREATE TABLE GLOBAL SweetProductionCollection (name string, amount double);
```

## Example 3

```sql
CREATE TABLE StockTable (symbol string, price float, volume long)
AS SELECT symbol, price, volume
FROM InputStream[price > 500] WINDOW SLIDING_LENGTH(1);
```

In this example, `StockTable` is created with three attributes: `symbol`, `price`, and `volume`. The new table is created by selecting data from `InputStream`, where the price is greater than 500, and applying a [SLIDING_LENGTH window](../windows/window-types/sliding-length) with a length of 1. The resulting table will contain only those tuples from `InputStream` where the price is greater than 500, and will have the attributes `symbol`, `price`, and `volume`.
