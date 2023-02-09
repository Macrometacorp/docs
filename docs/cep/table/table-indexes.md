---
sidebar_position: 30
title: Table Indexes
---

Indexes allow tables to be searched/modified much faster. For more information about indexing tables (collections), refer to [Indexing](../../collections/indexing/index.md).

Indexes can be configured together with primary keys. When more than one attribute is used for index, each one of them is used to index the table for fast access to the data.

## Example 1

```sql
CREATE SOURCE StockTable WITH (type='database',collection='StockTable',PrimaryKey='symbol', Index='key1', Index='key2') (symbol string, price float, volume long);
```

## Example 2

```sql
-- Creates a persistent index named `SamplePersistentIndex` on `SampleGDNTable` with following properties {unique=true, sparse=true, deduplicate=true}.
CREATE UNIQUE INDEX SamplePersistentIndex ON TABLE SampleGDNTable WITH(type="persistent", sparse="true", deduplicate="true") (sensorId);

-- Creates a hash index named `SampleHashIndex` on `SampleGDNTable` with properties {unique=true, sparse=true, deduplicate=true}.
CREATE UNIQUE INDEX SampleHashIndex ON TABLE SampleGDNTable WITH(type="hash", sparse="true", deduplicate="true") (sensorId);

-- Creates a skiplist index named `SampleSkiplistIndex` on `SampleGDNTable` with properties {unique=true, sparse=true, deduplicate=true}.
CREATE UNIQUE INDEX SampleSkiplistIndex ON TABLE SampleGDNTable WITH(type="skiplist", sparse="true", deduplicate="true") (sensorId);

-- Creates a fulltext index named `SampleFullTextIndex` on `SampleGDNTable` with property {minLength=3}.
CREATE INDEX SampleFullTextIndex ON TABLE SampleGDNTable WITH(type="fulltext", minLength="3") (sensorId);

-- Creates a geo index named `SampleGeoIndex` on `SampleGDNTable` with property {geoJson=false}.
CREATE INDEX SampleGeoIndex ON TABLE SampleGDNTable WITH(type="geo", geoJson="false") (sensorId);

-- Creates a ttl index named `SampleTTLIndex` on `SampleGDNTable` with property {expireAfter=3600}.
CREATE INDEX SampleTTLIndex ON TABLE SampleGDNTable WITH(type="ttl", expireAfter="3600") (sensorId);
```
