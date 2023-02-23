---
sidebar_position: 30
title: Table Indexes
---

Macrometa stream workers provide various indexing options to help you efficiently search and modify data in tables (collections). This page explains how to create indexes using `CREATE INDEX` in Macrometa stream workers.

## Purpose

Indexes allow tables to be searched and modified much faster. Indexes can be configured together with primary keys. When more than one attribute is used for index, each one of them is used to index the table for fast access to the data.

For more information about indexing tables (collections), refer to [Indexing](../../collections/indexing/).

## Syntax

There are two ways to create an index.

### CREATE INDEX

You can use the `CREATE INDEX` command:

```sql
CREATE (UNIQUE)? INDEX index-name ON TABLE table-name [WITH (type="<type>", optional properties...)] (fields_to_index...)
```

### CREATE SOURCE

You can incorporate it into a source definition for a `database` source. For more information about source definitions, refer to [Sources](../source/index.md).

```sql
CREATE SOURCE StockTable WITH (type='database',collection='StockTable',PrimaryKey='symbol', Index='key1', Index='key2') (symbol string, price float, volume long);
```

## Parameters

The following parameters are configured in an index definition:

| Parameter | Description |
| --------- | ----------- |
|           |             |
|           |             |
|           |             |
|           |             |

## Properties

The following properties can be configured in an index definition. Available properties vary depending on the index `type`.

| Property | Description |
| --------- | ----------- |
| type          | Index type. This field is required. Options are: [fulltext](../../collections/indexing/fulltext-indexes), [geo](../../collections/indexing/geo-indexes), [hash](../../collections/indexing/index#hash-index), [persistent](../../collections/indexing/persistent-indexes), [skiplist](../../collections/indexing/index#skiplist-index), [ttl](../../collections/indexing/ttl-indexes).            |

### Hash Index Properties



```sql
-- Creates a hash index named `SampleHashIndex` on `SampleGDNTable` with properties {unique=true, sparse=true, deduplicate=true}.
CREATE UNIQUE INDEX SampleHashIndex ON TABLE SampleGDNTable WITH(type="hash", sparse="true", deduplicate="true") (sensorId);
```


## Example 2

```sql
-- Creates a persistent index named `SamplePersistentIndex` on `SampleGDNTable` with following properties {unique=true, sparse=true, deduplicate=true}.
CREATE UNIQUE INDEX SamplePersistentIndex ON TABLE SampleGDNTable WITH(type="persistent", sparse="true", deduplicate="true") (sensorId);
```



```sql
-- Creates a skiplist index named `SampleSkiplistIndex` on `SampleGDNTable` with properties {unique=true, sparse=true, deduplicate=true}.
CREATE UNIQUE INDEX SampleSkiplistIndex ON TABLE SampleGDNTable WITH(type="skiplist", sparse="true", deduplicate="true") (sensorId);
```

```sql
-- Creates a fulltext index named `SampleFullTextIndex` on `SampleGDNTable` with property {minLength=3}.
CREATE INDEX SampleFullTextIndex ON TABLE SampleGDNTable WITH(type="fulltext", minLength="3") (sensorId);
```

```sql
-- Creates a geo index named `SampleGeoIndex` on `SampleGDNTable` with property {geoJson=false}.
CREATE INDEX SampleGeoIndex ON TABLE SampleGDNTable WITH(type="geo", geoJson="false") (sensorId);
```

```sql
-- Creates a ttl index named `SampleTTLIndex` on `SampleGDNTable` with property {expireAfter=3600}.
CREATE INDEX SampleTTLIndex ON TABLE SampleGDNTable WITH(type="ttl", expireAfter="3600") (sensorId);
```

## Example

```sql
CREATE TABLE SampleGDNTable (sensorId string, temperature double);
CREATE UNIQUE INDEX SamplePersistentIndex ON TABLE SampleGDNTable WITH(type="persistent", sparse="true") (sensorId);
```

This creates a table with a unique, persistent index that is sparse.
