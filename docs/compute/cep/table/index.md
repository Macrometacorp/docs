---
sidebar_position: 1
title: Tables (Collections)
---

A _table_ is a stored version of an stream or a table of events. Its schema is defined in the _table definition_ that is similar to a stream definition. These events are stored in database. In Macrometa GDN, tables are called [collections](../../../database/collections/).

:::note
If you want to use an existing Macrometa collection as a store, then you must define it in the stream worker.
:::

## Purpose

Tables allow the stream worker to work with stored events. By defining a schema for tables, the stream processor enables them to be processed by queries using their defined attributes with the streaming data. You can also query the state of the stored events in the table.

Any table defined in a stream worker is automatically a store for that stream worker. Tables can be stores or [sinks](../sink/).

You can query table contents using [Table Operators](table-operators).

You can speed up reference time by creating one or more [Table Indexes](table-indexes).

## Syntax

There are several ways to define tables and stores. Tables are always document collections, but stores can be any collection type.

### CREATE TABLE

The syntax for a new table definition is as follows:

```sql
CREATE TABLE (GLOBAL|LOCAL)? <table_name> (<attribute_name> <attribute_type>, ...);
```

For example, this statement creates a global document collection:

```sql
CREATE TABLE SensorTable (sensorId string, temperature double);
```

### CREATE TABLE AS SELECT

The `CREATE TABLE AS SELECT` statement creates a new document collection by selecting data from an existing stream and applying filters or transformations. The new table can be used for persistent storage, querying, and analysis.

The syntax for `CREATE TABLE AS SELECT` is as follows:

```sql
CREATE TABLE <table_name> (<attribute_name> <attribute_type>, ...)
[WITH ( property_name = expression [, ...] )]
  AS SELECT  select_expr [, ...]
FROM from_stream … ;
```

### CREATE STORE

You can also use general store syntax, which allows you to create any type of collection:

```sql
CREATE STORE <collection_name> 
  WITH (type="database", propKey=”propVal”, … )
       (<attribute_name> <attribute_type>, ...);
```

- _WITH (propKey = propVal [, ...])_ - Optional properties for the new table or store, such as a time-to-live or a partition key.
- _attribute name_ - The schema of the table or store is defined by its attributes with uniquely identifiable attribute names (`camelCase` is used for attribute names as a convention.)
- _attribute type_ - The type of each attribute defined in the schema.  This can be `STRING`, `INT`, `LONG`, `DOUBLE`, `FLOAT`, `BOOL`, or `OBJECT`.  

### Store Parameters

The following table outlines parameters for `CREATE STORE` definitions. Some parameters are universal, while others apply only to specific collection types.

| Parameter          | Description | Applicable Collection Types |
| ------------------ | ----------- | --------------------------- |
| type               | The store type, currently supporting `database`. | All |
| collection         | The name of the collection. | All |
| collection.type    | The type of collection, either `doc`, `edge`, `kv`, `redis`, or `dynamo`. Default is `doc`. | All |
| replication.type   | Either `local` or `global`. Default is `global`. | All |
| map.type           | Specifies the data format for publishing and configures mapping parameters. See [Sink Mapping](../sink/sink-mapping/index.md) for supported types. | All |
| batch.size         | Accumulates documents until the batch size is reached for processing. Use for high data flow. Default is 1. | All |
| batch.flush.time.ms| Accumulates documents until the batch time is reached for processing. Use for high data flow. Default is 0 (processes documents on arrival). | All |
| from               | For `edge` collections, specifies the source node field of the edge. | `edge` |
| to                 | For `edge` collections, specifies the destination node field of the edge. | `edge` |
| kv.expiration      | Optional for `kv` collections, specifies if items expire (`true` or `false`). Default is `true`. | `kv` |
| partition.key      | Required for `dynamo` collections, specifies the primary key. | `dynamo` |
| partition.key.type | Optional for `dynamo` collections, specifies the data type of the partition key. Possible types are `string`, `number`, or `binary`. Default is `string`. | `dynamo` |
| sorting.key        | Optional for `dynamo` collections, specifies the sorting key. | `dynamo` |
| sorting.key.type   | Optional for `dynamo` collections, specifies the data type of the sorting key. Default is `string`. | `dynamo` |

### Secondary Indexes for DynamoDB Tables

Secondary indexes for DynamoDB tables can be created with the following syntax:

```sql
CREATE SECONDARY INDEX <index_name> ON STORE <collection_name> WITH (type='global|local') (<attribute_name>, ...);
```

- _type_ - Specifies the type of secondary index, either `global` or `local`.
- _partition.key.type_ and _sorting.key.type_ - Optional types for the partition and sorting keys of the secondary index.

## Example 1: Defining a Local Room Type Table

```sql
CREATE TABLE RoomTypeTable (roomNo int, type string);
```

In this example, `RoomTypeTable` is defined as a local table within the database. It is structured with two columns: `roomNo` as an integer representing the room number and `type` as a string indicating the type of room. This table structure allows for the organization and retrieval of room types based on their numbers.

## Example 2: Creating a Global Sweet Production Table

```sql
CREATE TABLE GLOBAL SweetProductionCollection (name string, amount double);
```

This statement creates a global table named `SweetProductionCollection`, which consists of two columns: `name` for the name of the sweet, as a string, and `amount` for the quantity of production, as a double. Being global, this table is designed to be replicated across multiple regions for distributed access.

## Example 3: Selective Stock Table Creation with Windowing

```sql
CREATE TABLE StockTable (symbol string, price float, volume long)
AS SELECT symbol, price, volume
FROM InputStream[price > 500] WINDOW SLIDING_LENGTH(1);
```

Here, the `StockTable` is created to store financial stock data with attributes `symbol`, `price`, and `volume`. The data is populated by selecting records from an `InputStream` where the stock price exceeds 500. A sliding window of length 1 is applied, ensuring that the table captures the most recent qualifying data points.

## Example 4: Configuring a Sensor Data Store

```sql
CREATE STORE SensorTable WITH(type='database', collection='SampleTable', map.type='json') (sensorId string, temperature double);
```

`SensorTable` is a document collection configured to hold sensor data, with `sensorId` representing a unique identifier for each sensor and `temperature` recording its readings as a double. The store is set up within a database, with data serialized in JSON format, facilitating easy integration and retrieval of sensor measurements.

## Example 5: KV Store with Expiration

```sql
CREATE STORE SampleKV WITH (type = 'database', collection = "SampleKV", collection.type="kv", kv.expiration='true') (_key string, value object, expireAt long);
```

In this example, a key-value collection named `SampleKV` is created with an expiration policy. It includes attributes `_key` which is a string representing the unique identifier for the key-value pair, `value` which is an object representing the data stored, and `expireAt` which is a long integer representing the expiration time in UNIX timestamp. When `kv.expiration` is set to `true`, each key-value pair will have a specified lifetime after which it will expire.

## Example 6: Redis Store

```sql
CREATE STORE SampleRedis WITH (type='database', collection='SampleRedis', collection.type='redis', map.type='json') (value string);
```

This example defines a Redis collection called `SampleRedis`. It only includes one attribute: `value`, which is of type string. The store captures data in JSON format, which allows for flexible data structures and easy integration with various applications. This Redis store is configured for global replication, ensuring the data is consistent across different regions.

## Example 7: Dynamo Store with Partition and Sorting Keys

```sql
CREATE STORE SampleDynamo WITH (type = 'database', collection = 'SampleDynamo', collection.type='dynamo', partition.key='part', sorting.key='sort') (part string, sort string);
```

In this example, `SampleDynamo` is a Dynamo collection with specified partition and sorting keys. The `part` attribute serves as the partition key and is of type string, which is used to distribute the data across nodes. The `sort` attribute is the sorting key, also of type string, which determines the order of data retrieval. This setup is crucial for efficient querying and scalability in a distributed database system.
