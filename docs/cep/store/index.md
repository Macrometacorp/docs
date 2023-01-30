---
sidebar_position: 1
title: Create Stores
---

A _store_ is a place to keep your data. Stores allow creating, reading, updating, and deleting events or records stored on external data stores. This is useful for use cases when there is a need to access a common database used by various other systems, to retrieve and transfer data.

## Store Syntax

You can create any store with the following syntax:

```sql
CREATE STORE <table_name> WITH(type="<store_type>", propKey=”propVal”, … , PrimaryKey='<attribute_name>', Index='<attribute_name>')(<attribute_name> <attribute_type>, ...);
```

You can also create a table, which is a Macrometa [collection](../../collections/index.md) that is automatically a store for the stream worker that defines it.

```sql
CREATE TABLE (GLOBAL|SPOT)? <table_name> (<attribute_name> <attribute_type>, ...);
```

## Supported Stores

Supported stores include:

- [Macrometa collections](../../collections/index.md) (also called tables)
- [MongoDB](mongodb.md)
- [Redis](redis.md)
- [RDBMS](rdbms.md)

## Sample Store Queries

Create Stores
CREATE STORE SensorTable WITH(type=’database’, collection=’SampleTable’, map.type=’json’) (sensorId string, temperature double);
CREATE TABLE SensorTable (sensorId string, temperature double);

Insert into a Store
INSERT INTO SensorTable 
SELECT * 
FROM SampleStream;

Join with a Store
INSERT INTO OutputStream 
SELECT st.sensorId, st.temperature, ts.type AS type
FROM TempStream AS ts JOIN SensorTable AS st
    ON ts.sensorId == st.sensorId;

Delete from a Store
DELETE SensorTable
	ON SensorTable.sensorId == sensorId
FROM DeleteStream;

Update in a Store
UPDATE SensorTable
	SET SensorTable.temperature = temperature
	ON SensorTable.sensorId == sensorId
FROM TemperatureStream;

Lookup in a Store
INSERT INTO ExistingSensorStream
FROM SensorStream[SensorTable.sensorId == sensorId in SensorTable]
