---
sidebar_position: 50
title: Named Aggregation
---

Named aggregation allows you to obtain aggregates in an incremental manner for a specified set of time periods.

This not only allows you to calculate aggregations with varied time granularity, but also allows you to access them in an interactive
 manner for reports, dashboards, and for further processing. Its schema is defined via the _aggregation definition_.

**Purpose**

Named aggregation allows you to retrieve the aggregate values for different time durations.
That is, it allows you to obtain aggregates such as `sum`, `count`, `avg`, `min`, `max`, `count` and `distinctCount`
of stream attributes for durations such as `sec`, `min`, `hour`, etc.

This is of considerable importance in many Analytics scenarios because aggregate values are often needed for several time periods.
Furthermore, this ensures that the aggregations are not lost due to unexpected system failures because aggregates can be stored in different persistence `stores`.

**Syntax**

```
CREATE AGGREGATION <aggregator name> WITH (store.type='<store type>', purge.enable='<true or false>', purge.interval='<purging interval>', purge.retention.period='<retention period>')
from <input stream>
select <attribute name>, <aggregate function>(<attribute name>) as <attribute name>, ...
    group by <attribute name>
    aggregate by <timestamp attribute> every <time periods> ;
```

The above syntax includes the following:

|Item                          |Description
---------------                |---------
|`store`                      |This annotation is used to refer to the data store where the calculated aggregate results are stored. This annotation is optional. When no annotation is provided, the data is stored in the `in-memory` store.
|`purge`                      |This annotation is used to configure purging in aggregation granularities. If this annotation is not provided, the default purging mentioned above is applied. If you want to disable automatic data purging, you can use this annotation as follows:`purge.enable='false'`/You should disable data purging if the aggregation query in included in the Stream application for read-only purposes.
|`purge.retention.Period`            |This annotation is used to specify the length of time the data needs to be retained when carrying out data purging. If this annotation is not provided, the default retention period is applied.
|`<aggregator name>`           |This specifies a unique name for the aggregation so that it can be referred when accessing aggregate results.
|`<input stream>`              |The stream that feeds the aggregation. **Note! this stream should be already defined.**
|`group by <attribute name>`   |The `group by` clause is optional. If it is included in a Stream application, aggregate values  are calculated per each `group by` attribute. If it is not used, all the events are aggregated together.
|`by <timestamp attribute>`    |This clause is optional. This defines the attribute that should be used as the timestamp. If this clause is not used, the event time is used by default. The timestamp could be given as either a `string` or a `long` value. If it is a `long` value, the unix timestamp in milliseconds is expected (e.g. `1496289950000`). If it is a `string` value, the supported formats are `<yyyy>-<MM>-<dd> <HH>:<mm>:<ss>` (if time is in GMT) and  `<yyyy>-<MM>-<dd> <HH>:<mm>:<ss> <Z>` (if time is not in GMT), here the ISO 8601 UTC offset must be provided for `<Z>` .(e.g., `+05:30`, `-11:00`).
|`<time periods>`              |Time periods can be specified as a range where the minimum and the maximum value are separated by three dots, or as comma-separated values.  e.g., A range can be specified as sec...year where aggregation is done per second, minute, hour, day, month and year. Comma-separated values can be specified as min, hour.  Skipping time durations (e.g., min, day where the hour duration is skipped) when specifying comma-separated values is supported only from v4.1.1 onwards

 Aggregation's granularity data holders are automatically purged every 15 minutes. When carrying out data purging, the retention period you have specified for each granularity in the named aggregation query is taken into account. The retention period defined for a granularity needs to be greater than or equal to its minimum retention period as specified in the table below. If no valid retention period is defined for a granularity, the default retention period (as specified in the table below) is applied.

|Granularity           |Default retention      |Minimum retention
---------------        |--------------         |------------------  
|`second`              |`120` seconds          |`120` seconds
|`minute`              |`24`  hours            |`120` minutes
|`hour`                |`30`  days             |`25`  hours
|`day`                 |`1`   year             |`32`  days
|`month`               |`All`                  |`13`  month
|`year`                |`All`                  |`none`

:::note
Aggregation is carried out at calendar start times for each granularity with the GMT timezone
:::

:::note
the aggregation input stream should only feed events to one aggregation definition).
:::

**Example**

This Stream Application defines an aggregation named `TradeAggregation` to calculate the average and sum for the `price` attribute of events arriving at the `TradeStream` stream. These aggregates are calculated per every time granularity in the second-year range.

```sql
CREATE STREAM TradeStream (symbol string, price double, volume long, timestamp long);

CREATE AGGREGATION TradeAggregation WITH (purge.enable='true', purge.interval='10 sec', purge.retentionPeriod.sec='120 sec', purge.retentionPeriod.min='24 hours', purge.retentionPeriod.hours='30 days', purge.retentionPeriod.days='1 year', purge.retentionPeriod.months='all', purge.retentionPeriod.years='all')
  from TradeStream
  select symbol, avg(price) as avgPrice, sum(price) as total
    group by symbol
    aggregate by timestamp every sec ... year;
```

### Distributed Aggregation

Distributed Aggregation allows you to partially process aggregations in different shards. This allows Stream app in one shard to be responsible only for processing a part of the aggregation.

**Syntax**

```
@store(type="<store type>", ...)
CREATE AGGREGATION <aggregator name> WITH (PartitionById.enable='false')
select <attribute name>, <aggregate function>(<attribute name>) as <attribute name>, ...
    group by <attribute name>
    aggregate by <timestamp attribute> every <time periods> ;
from <input stream>
```

Following table includes the `annotation` to be used to enable distributed aggregation,

Item | Description
------|------
`@artitionById` | If the property is given, then the distributed aggregation is enabled. Further this can be disabled by using `enable` element, `PartitionById.enable='false'`.

Further, following system properties are also available,

System Property| Description| Possible Values | Optional | Default Value
---------|---------|---------|---------|------
shardId| The id of the shard one of the distributed aggregation is running in. This should be unique to a single shard | Any string | No | <Empty_String>
partitionById| This allows user to enable/disable distributed aggregation for all aggregations running in one stream processing manager. | true/false | Yesio | false

:::note
ShardIds should not be changed after the first configuration in order to keep data consistency.
:::

### Join (Aggregation)

This allows a stream to retrieve calculated aggregate values from the aggregation.

:::note
A join can also be performed with [two streams](#join-stream), with a [table](#join-table) and a stream, or with a stream against externally [named windows](#join-window).
:::

**Syntax**

A join with aggregation is similer to the join with [table](#join-table), but with additional `within` and `per` clauses.

```
select <attribute name>, <attribute name>, ...
from <input stream> join <aggrigation>
  on <join condition>
  within <time range>
  per <time granularity>
insert into <output stream>;
```

Apart from constructs of [table join](#join-table) this includes the following. Please note that the 'on' condition is optional :

Item|Description
---------|---------
`within  <time range>`| This allows you to specify the time interval for which the aggregate values need to be retrieved. This can be specified by providing the start and end time separated by a comma as `string` or `long` values, or by using the wildcard `string` specifying the data range. For details refer examples.
`per <time granularity>`|This specifies the time granularity by which the aggregate values must be grouped and returned. e.g., If you specify `days`, the retrieved aggregate values are grouped for each day within the selected time interval.

`within` and `per` clauses also accept attribute values from the stream.
The timestamp of the aggregations can be accessed through the `AGG_TIMESTAMP` attribute.

**Example**

Following aggregation definition will be used for the examples.

```
CREATE STREAM TradeStream (symbol string, price double, volume long, timestamp long);

CREATE AGGREGATION TradeAggregation
select AGG_TIMESTAMP, symbol, avg(price) as avgPrice, sum(price) as total
    group by symbol
    aggregate by timestamp every sec ... year
from TradeStream;
```

This query retrieves daily aggregations within the time range `"2014-02-15 00:00:00 +05:30", "2014-03-16 00:00:00 +05:30"` (Please note that +05:30 can be omitted if timezone is GMT)

```
CREATE STREAM StockStream (symbol string, value int);

insert into AggregateStockStream
select S.symbol, T.total, T.avgPrice
from StockStream as S join TradeAggregation as T
  on S.symbol == T.symbol
  within "2014-02-15 00:00:00 +05:30", "2014-03-16 00:00:00 +05:30"
  per "days";
```

This query retrieves hourly aggregations within the day `2014-02-15`.

```
CREATE STREAM StockStream (symbol string, value int);

insert into AggregateStockStream
select S.symbol, T.total, T.avgPrice
from StockStream as S join TradeAggregation as T
  on S.symbol == T.symbol
  within "2014-02-15 **:**:** +05:30"
  per "hours";
```

This query retrieves all aggregations per `perValue` stream attribute within the time period between timestamps `1496200000000` and `1596434876000`.

```
CREATE STREAM StockStream (symbol string, value int, perValue string);

insert into AggregateStockStream
select S.symbol, T.total, T.avgPrice
from StockStream as S join TradeAggregation as T
  on S.symbol == T.symbol
  within 1496200000000L, 1596434876000L
  per S.perValue;
```

**Supported join types**

Aggregation join supports following join operations.

- **Inner join (join)**

    This is the default behaviour of a join operation. `join` is used as the keyword to join the stream with the aggregation. The output is generated only if there is a matching event in the stream and the aggregation.

- **Left outer join**

    The `left outer join` operation allows you to join a stream on left side with a aggregation on the right side based on a condition.
    Here, it returns all the events of left stream even if there are no matching events in the right aggregation by
    having null values for the attributes of the right aggregation.

- **Right outer join**

    This is similar to a `left outer join`. `right outer join` is used as the keyword to join a stream on right side with a aggregation on the left side based on a condition.
    It returns all the events of the right stream even if there are no matching events in the left aggregation.
