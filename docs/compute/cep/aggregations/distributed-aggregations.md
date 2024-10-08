---
sidebar_position: 20
title: Distributed Aggregations
---

A _distributed aggregation_ allows you to partially process aggregations in different shards. This allows a stream worker in one shard to be responsible only for processing a part of the aggregation.

## Syntax

```sql
CREATE AGGREGATION <aggregator name> WITH (store.type='database', store.replication.type='global', PartitionById.enable='false')
select <attribute name>, <aggregate function>(<attribute name>) as <attribute name>, ...
from <input stream>
    group by <attribute name>
    aggregate by <timestamp attribute> every <time periods> ;
```

## Parameters

|Item | Description|
|------|------|
@partitionById | If the property is given, then the distributed aggregation is enabled. This can be disabled by using `enable` element, `PartitionById.enable='false'`.|

## System Properties

System Property| Description| Possible Values | Optional | Default Value
---------|---------|---------|---------|------
shardId| The ID of the shard one of the distributed aggregation is running in. This should be unique to a single shard. | Any string | No | <Empty_String>
partitionById| This allows user to enable/disable distributed aggregation for all aggregations running in one stream processing manager. | true/false | Yes | false

:::note
ShardIds should not be changed after the first configuration in order to keep data consistency.
:::
