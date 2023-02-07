---
sidebar_position: 1
title: Stores
---

A _store_ is a place to keep your data. Stores allow creating, reading, updating, and deleting events or records stored on external data stores. This is useful for use cases when there is a need to access a common database used by various other systems, to retrieve and transfer data.

Macrometa allows you to use [Macrometa collections](../../collections/index) (also called tables) as stores.

## Store Syntax

Stores can be created as part of your stream worker using one of the following syntaxes.

### General Store Syntax

You can create any store with the following syntax.

```sql
CREATE STORE <table_name> WITH(type="<store_type>", propKey=”propVal”, … , PrimaryKey='<attribute_name>', Index='<attribute_name>')(<attribute_name> <attribute_type>, ...);
```

For example:

```sql
CREATE STORE SensorTable WITH(type=’database’, collection=’SampleTable’, map.type=’json’) (sensorId string, temperature double);
```

### Table Store Syntax

You can also create a table, which is a Macrometa [collection](../../collections/index) that is automatically a store for the stream worker that defines it.

```sql
CREATE TABLE (GLOBAL|SPOT)? <table_name> (<attribute_name> <attribute_type>, ...);
```

For example:

```sql
CREATE TABLE SensorTable (sensorId string, temperature double);
```

## Sample Store Queries

This section shows some of the queries that you might use on a stream worker store.

### Insert into a Store

```sql
INSERT INTO SensorTable
SELECT *
FROM SampleStream;
```

### Join with a Store

```sql
INSERT INTO OutputStream
SELECT st.sensorId, st.temperature, ts.type AS type
FROM TempStream AS ts JOIN SensorTable AS st
    ON ts.sensorId == st.sensorId;
```

### Delete from a Store

```sql
DELETE SensorTable
	ON SensorTable.sensorId == sensorId
FROM DeleteStream;
```

### Update in a Store

```sql
UPDATE SensorTable
	SET SensorTable.temperature = temperature
	ON SensorTable.sensorId == sensorId
FROM TemperatureStream;
```

### Look Up in a Store

```sql
INSERT INTO ExistingSensorStream
FROM SensorStream[SensorTable.sensorId == sensorId in SensorTable]
```
