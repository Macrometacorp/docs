---
sidebar_position: 60
title: Collection (database) Source
---

You can create collections with your stream worker, and store incoming data in it for further processing.

This page explains how to use collections as sources. For information about using collections as stores, refer to [Tables (Collections)](../table/).

:::note
If you want to use an existing Macrometa collection as a source, then you still need to define it in the stream worker and you must enable streaming on the collection.
:::

Got it. Here is the updated content with the new parameter:

---

## Syntax

```sql
CREATE SOURCE SourceName WITH (type="database", collection="STRING", replication.type="STRING", collection.type="STRING", map.type='type', skip.event.with.delete='BOOLEAN') (strings);
```

## Parameters

| Parameter             | Description               | Default Value | Possible Data Types | Optional |
| ---------------- | ------------------------------ | ------------- | ------------------- | -------- |
| collection       | Specifies the name of the collection to which the source must listen.  |               | STRING              | No       |
| replication.type | Specifies the replication type of the collection. Must be `global` as local collections are not allowed. | local         | STRING              | No       |
| collection.type  | Specifies the type of data the collection contains. Possible values are `doc` and `edge`.                         | doc           | STRING              | Yes      |
| skip.event.with.delete | Determines whether to skip processing messages with the field `_delete`. If `false`, all messages are processed; if `true`, only the keys of deleted messages are returned. | true | BOOLEAN | Yes |

## Example 1

```sql
CREATE SOURCE SweetProductionStream WITH (type='database', collection='SweetProductionData', collection.type='doc', replication.type='GLOBAL', map.type='json', skip.event.with.delete='false') (name string, amount double);
```

## Example 2

```sql
CREATE SOURCE account WITH (type='database', collection='account', collection.type='doc', replication.type='GLOBAL', map.type='json', skip.event.with.delete='false') (contact object, created_at string);
```

## Example 3

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
