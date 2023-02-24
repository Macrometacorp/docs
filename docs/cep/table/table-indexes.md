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

You can use the `CREATE INDEX` command on a Macrometa table (collection) that your stream worker uses as a source or store:

```sql
CREATE (UNIQUE)? INDEX index-name ON TABLE table-name [WITH (type="<type>", optional properties...)] (fields_to_index...)
```

The following parameters are configured in an index definition:

| Parameter       | Description                                               |
|-----------------|-----------------------------------------------------------|
| (UNIQUE)?       | Optional flag to create unique indexes.                   |
| index-name      | Name for the index.                                       |
| table-name      | Name of the table to create indexes.                      |
| fields_to_index | Comma separated list of 1:* index fields without types (i.e id, name). |

### CREATE SOURCE with an Index

You can incorporate it into a source definition for a `database` (Macrometa collection) source. For more information about source definitions, refer to [Sources](../source/index.md).

```sql
CREATE SOURCE <source_name> WITH (type="database", collection="<collection>", PrimaryKey="<primary-key-field>", Index="<index-name-1>", Index="<index-name-2>"...) (<attribute_name> <attribute_type>, <attribute_name> <attribute_type>...);
```

| Parameter           | Description                 |
|---------------------|---------------------------------|
| source_name         | The name of the source to be created.               |
| type                | The type of the source (e.g. 'database', 'kafka', 's3', etc.). In this case, it must be `database`        |
| collection          | The name of the collection or table containing the source data.              |
| PrimaryKey          | The name of the primary key field for the source.          |
| Index               | One or more comma-separated index names to be created for the source.            |
| attribute_name          | The name of the field to be included in the source.            |
| attribute_type     | The data type of the field, specified as a string (e.g. 'string', 'integer', 'float', etc.).  |

## Properties

The following properties can be configured in an index definition. Available properties vary depending on the index `type`.

| Property | Description |
| --------- | ----------- |
| type          | Index type. This field is required. Options are: [fulltext](../../collections/indexing/fulltext-indexes), [geo](../../collections/indexing/geo-indexes), [hash](../../collections/indexing/index#hash-index), [persistent](../../collections/indexing/persistent-indexes), [skiplist](../../collections/indexing/index#skiplist-index), [ttl](../../collections/indexing/ttl-indexes).            |

### Fulltext Index Properties

The following properties apply to [fulltext indexes](../../collections/indexing/fulltext-indexes). They are all optional.

| Property    | Description                                                | Default Value |
| ----------- | ---------------------------------------------------------- | ------------- |
| minLength      | Minimum character length of words to index. Defaults to 5. Best practice is to set this value explicitly when creating a fulltext index.                       | 5         |

Example:

```sql
-- Creates a fulltext index named `SampleFullTextIndex` on `SampleGDNTable` with property {minLength=3}.
CREATE INDEX SampleFullTextIndex ON TABLE SampleGDNTable WITH(type="fulltext", minLength="3") (sensorId);
```

### Geo Index Properties

The following properties apply to [geo indexes](../../collections/indexing/geo-indexes). They are all optional.

| Property    | Description                                                | Default Value |
| ----------- | ---------------------------------------------------------- | ------------- |
| geoJson      | If a geo-spatial index on a location is constructed and geoJson is `true`, then the order within the array is longitude followed by latitude.                    | false        |

Example:

```sql
-- Creates a geo index named `SampleGeoIndex` on `SampleGDNTable` with property {geoJson=false}.
CREATE INDEX SampleGeoIndex ON TABLE SampleGDNTable WITH(type="geo", geoJson="false") (sensorId);
```

### Hash Index Properties

The following properties apply to [hash indexes](../../collections/indexing/index#hash-index). They are all optional.

| Property    | Description                                                | Default Value |
| ----------- | ---------------------------------------------------------- | ------------- |
| unique      | If true, then create a unique index.                       | false         |
| sparse      | If true, then create a sparse index.                       | false         |
| deduplicate | If false, the deduplication of array values is turned off. | false         |

Example:

```sql
-- Creates a hash index named `SampleHashIndex` on `SampleGDNTable` with properties {unique=true, sparse=true, deduplicate=true}.
CREATE UNIQUE INDEX SampleHashIndex ON TABLE SampleGDNTable WITH(type="hash", sparse="true", deduplicate="true") (sensorId);
```

### Persistent Index Properties

The following properties apply to [persistent indexes](../../collections/indexing/persistent-indexes). They are all optional.

| Property    | Description                                                | Default Value |
| ----------- | ---------------------------------------------------------- | ------------- |
| unique      | If true, then create a unique index.                       | false         |
| sparse      | If true, then create a sparse index.                       | false         |
| deduplicate | If false, the deduplication of array values is turned off. | false         |

Example:

```sql
-- Creates a persistent index named `SamplePersistentIndex` on `SampleGDNTable` with following properties {unique=true, sparse=true, deduplicate=true}.
CREATE UNIQUE INDEX SamplePersistentIndex ON TABLE SampleGDNTable WITH(type="persistent", sparse="true", deduplicate="true") (sensorId);
```

### Skiplist Index Properties

The following properties apply to [skiplist indexes](../../collections/indexing/index#skiplist-index). They are all optional.

| Property    | Description                                                | Default Value |
| ----------- | ---------------------------------------------------------- | ------------- |
| unique      | If true, then create a unique index.                       | false         |
| sparse      | If true, then create a sparse index.                       | false         |
| deduplicate | If false, the deduplication of array values is turned off. | false         |

Example:

```sql
-- Creates a skiplist index named `SampleSkiplistIndex` on `SampleGDNTable` with properties {unique=true, sparse=true, deduplicate=true}.
CREATE UNIQUE INDEX SampleSkiplistIndex ON TABLE SampleGDNTable WITH(type="skiplist", sparse="true", deduplicate="true") (sensorId);
```

### TTL Index Properties

The following properties apply to [ttl indexes](../../collections/indexing/ttl-indexes). They are all optional.

| Property    | Description                                                | Default Value |
| ----------- | ---------------------------------------------------------- | ------------- |
| expireAfter      | The number of seconds time after which the documents count as expired. The countdown starts at document creation.                     | 3600         |

Example:

```sql
-- Creates a ttl index named `SampleTTLIndex` on `SampleGDNTable` with property {expireAfter=3600}.
CREATE INDEX SampleTTLIndex ON TABLE SampleGDNTable WITH(type="ttl", expireAfter="3600") (sensorId);
```

## Example 1

```sql
CREATE TABLE SampleGDNTable (sensorId string, temperature double);
CREATE UNIQUE INDEX SamplePersistentIndex ON TABLE SampleGDNTable WITH(type="persistent", sparse="true") (sensorId);
```

This example creates a table named `SampleGDNTable` with two fields: `sensorId` of type `string` and `temperature` of type `double`. The second statement creates a unique, persistent index named `SamplePersistentIndex` on the `SampleGDNTable` table with `sensorId` as the field to index.

## Example 2

```sql
CREATE SOURCE StockTable WITH (type='database',collection='StockTable',PrimaryKey='symbol', Index='key1', Index='key2') (symbol string, price float, volume long);
```

This example creates a source named `StockTable` of type `'database'` and connects to a collection with the same name. The `PrimaryKey` parameter specifies the primary key field for the source, which is symbol in this case. The `Index` parameters specify one or more index names to be created for the source. In this example, the indexes `key1` and `key2` are created for the source.

After the index parameters, you can include a list of fields for the source, each followed by its data type. In this example, the source has three fields: `symbol` of type `string`, `price` of type `float`, and `volume` of type `long`.
