---
sidebar_position: 60
title: Collection (database) Source
---

You can create collections with your stream worker, and store incoming data in it for further processing.

This page explains how to use collections as sources. For information about using collections as stores, refer to [Tables (Collections)](../table/).

## Syntax

```sql
CREATE SOURCE SourceName WITH (type="database", collection="STRING", replication.type="STRING", collection.type="STRING", map.type='type') (strings);
```

## Parameters

| Parameter             | Description               | Default Value | Possible Data Types | Optional |
| ---------------- | ------------------------------ | ------------- | ------------------- | -------- |
| collection       | This specifies the name of the collection to which the source must listen.  |               | STRING              | No       |
| replication.type | Specifies if the replication type of the collection. At the moment local collections are not allowed, type must be `global`. | local         | STRING              | No       |
| collection.type  | This specifies the type of the data collection contains. Possible values can be `doc` and `edge`.                         | doc           | STRING              | Yes      |

## Example 1

```sql
CREATE SOURCE SweetProductionStream WITH (type = 'database', collection='SweetProductionData', collection.type='doc', replication.type='GLOBAL',  map.type='json') (name string, amount double);
```

## Example 2

```sql
-- Create Table SampleCargoAppInputTable to process events.
CREATE SOURCE SampleCargoAppInputTable WITH (type = 'database', collection ="SampleCargoAppInputTable", collection.type="doc", replication.type="global", map.type='json') (weight int);

-- Create Stream SampleCargoAppDestStream
CREATE SINK SampleCargoAppDestStream WITH (type = 'stream', stream ="SampleCargoAppDestStream", replication.type="local") (weight int);

-- Data Processing
@info(name='Query')
INSERT INTO SampleCargoAppDestStream
SELECT weight
FROM SampleCargoAppInputTable;
```
