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
CREATE STORE <collection_name> 
  WITH (type="database", propKey=”propVal”, … )
       (<attribute_name> <attribute_type>, ...);
```
- *WITH (propKey = propVal [, ...])* - Optional properties for the new table or store, such as a time-to-live or a partition key. 
- *attribute name*  - The schema of the table or store is defined by its attributes with uniquely identifiable attribute names (`camelCase` is used for attribute names as a convention.)
- *attribute type*   - The type of each attribute defined in the schema.  This can be `STRING`, `INT`, `LONG`, `DOUBLE`, `FLOAT`, `BOOL`, or `OBJECT`.  

## Store Parameters

The following parameters apply only to `CREATE STORE` definitions:

| Parameter | Description |
| --------- | ----------- |
|  type    | The only supported store type at this time is `database`.        |
|  collection      | The name of the collection.        |
| collection.type  |  The type of collection, either `doc` or `edge`. Default is `doc`.       |
| from        | If `collection.type` is specified as `edge`, this field indicates which field to be considered as a source node of the edge.      |
| to          | If `collection.type` is specified as `edge`, this field indicates which field to be considered as a destination node of the edge. |
| replication.type    | Either `local` or `global`. Default is `global`.        |
| map.type  | The `map.type` parameter specifies the format in which the data is published and allows you to configure the mapping parameters, which change based of the mapping type/format selected. For the complete list of supported mapping types, see [Sink Mapping](../sink/sink-mapping/index.md).        |
| batch.size | Macrometa persists documents until the batch size is reached, then processes all accumulated documents. Use this parameter if you have a high data flow. Default value is 1.     |
| batch.flush.time.ms | Macrometa persists documents until the batch time is reached, then processes all accumulated documents. Use this parameter if you have a high data flow. Default value 0, meaning Macrometa processes documents as soon as they arrive.            |

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
## Example 4

```sql
CREATE STORE SensorTable WITH(type=’database’, collection=’SampleTable’, map.type=’json’) (sensorId string, temperature double);
```

In this example, `StockTable` is created with three attributes: `symbol`, `price`, and `volume`. The new table is created by selecting data from `InputStream`, where the price is greater than 500, and applying a [SLIDING_LENGTH window](../windows/window-types/sliding-length) with a length of 1. The resulting table will contain only those tuples from `InputStream` where the price is greater than 500, and will have the attributes `symbol`, `price`, and `volume`.
