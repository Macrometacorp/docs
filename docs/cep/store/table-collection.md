---
sidebar_position: 40
title: Table (Collection)
---

A table is a stored version of an stream or a table of events. Its schema is defined via the _table definition_ that is similar to a stream definition. These events are stored in database. In Macrometa GDN, tables are called [collections](../../collections/index.md).

## Table Purpose

Tables allow the stream worker to work with stored events. By defining a schema for tables, the stream processor enables them to be processed by queries using their defined attributes with the streaming data. You can also query the state of the stored events in the table.

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



TAKEN FROM CREATE STREAM WORKERS

## Table

Table is similar to collection, is a structured representation of data with a defined schema.

Syntax:

```sql
   CREATE TABLE GLOBAL TableName(property type);
```
Example:
```sql
   CREATE TABLE GLOBAL SweetProductionCollection(name string, amount double);
```

Or equivalent using STORE:
```sql
   CREATE STORE SweetProductionCollection WITH (type="database", collection="SweetProductionCollection", replication.type="global", collection.type="DOC", map.type='json') (name string, amount double);
```

The stream worker will use the Macrometa collections with the default query parameters explained in the chart below.

| Name     | Description            | Default Value | Possible Data Types | Optional |
|----------|------------------------|---------------|---------------------|----------|
| collection    | This specifies the name of the collection to which events must written.    | STRING        | No         |
| replication.type | Specifies if the replication type of the collection. Note: Type must be `global`. Local collections are not currently allowed.    | local         | STRING              | No       |
| collection.type  | This specifies the type of the data collection contains. Possible values can be `doc` and `edge`.      | doc           | STRING              | Yes      |
| from        | If `collection.type` is specified as `edge`, this field indicates which field to be considered as a source node of the edge.      | _from         | STRING              | Yes      |
| to          | If `collection.type` is specified as `edge`, this field indicates which field to be considered as a destination node of the edge. | _to      | STRING              | Yes      |
