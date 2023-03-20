---
sidebar_position: 1
title: Create Named Aggregations
---

A _named aggregation_ allows you to obtain aggregates in an incremental manner for a specified set of time periods.

This not only allows you to calculate aggregations with varied time granularity, but also allows you to access them in an interactive  manner for reports, dashboards, and for further processing. Its schema is defined via the _aggregation definition_.

You can also create [Distributed Aggregations](distributed-aggregations.md) or [Joins](../query-guide/join/join-aggregations).

## Purpose

A named aggregation allows you to retrieve the aggregate values for different time durations.
That is, it allows you to obtain aggregates such as `sum`, `count`, `avg`, `min`, `max`, `count`, and `distinctCount`
of stream attributes for durations such as `sec`, `min`, `hour`, and so on.

This is of considerable importance in many analytics scenarios, because aggregate values are often needed for several time periods.
This also ensures that the aggregations are not lost due to unexpected system failures, because aggregates can be stored in different persistence stores.

## Syntax

```sql
CREATE AGGREGATION <aggregator name> WITH (store.type='<store type>', store.replication.type='<global or local'>, purge.enable='<true or false>', purge.interval='<purging interval>', purge.retention.period='<retention period>')
select <attribute name>, <aggregate function>(<attribute name>) as <attribute name>, ...
from <input stream>
    group by <attribute name>
    aggregate by <timestamp attribute> every <time periods> ;
```

## Parameters

| Item    | Description |
|---------------|---------|
| store                      | Used to refer to the data store where the calculated aggregate results are stored. This annotation is optional. When no annotation is provided, the data is stored in the `in-memory` store. |
| purge                      | Used to configure purging in aggregation granularities. If this annotation is not provided, then the default purging is applied. To disable automatic data purging, you can use this annotation as follows:`purge.enable='false'` You should disable data purging if the aggregation query in included in the stream worker for read-only purposes. |
| purge.retention.Period            | Used to specify the length of time the data needs to be retained when carrying out data purging. If this annotation is not provided, then the default retention period is applied. |
| aggregator name         | Specifies a unique name for the aggregation so that it can be referred when accessing aggregate results. |
| input stream             | The stream that feeds the aggregation.   |
| group by attribute name   | The `group by` clause is optional. If it is included in a stream worker, then aggregate values  are calculated per each `group by` attribute. If it is not used, then all the events are aggregated together. |
| by timestamp attribute    | This clause is optional. This defines the attribute that should be used as the timestamp. If this clause is not used, then the event time is used by default. The timestamp could be given as either a `string` or a `long` value. If it is a `long` value, then the unix timestamp in milliseconds is expected (e.g. `1496289950000`). If it is a `string` value, then the supported formats are `<yyyy>-<MM>-<dd> <HH>:<mm>:<ss>` (if time is in GMT) and  `<yyyy>-<MM>-<dd> <HH>:<mm>:<ss> <Z>` (if time is not in GMT), here the ISO 8601 UTC offset must be provided for `<Z>` .(e.g., `+05:30`, `-11:00`).
| time periods            | Time periods can be specified as a range where the minimum and the maximum value are separated by three dots, or as comma-separated values. For example, a range can be specified as sec...year where aggregation is done per second, minute, hour, day, month, and year. Comma-separated values can be specified as min, hour.

## Granularity and Retention

Aggregation granularity data holders are automatically purged every 15 minutes. When carrying out data purging, the retention period you have specified for each granularity in the named aggregation query is taken into account.

The retention period defined for a granularity needs to be greater than or equal to its minimum retention period as specified in the table below. If no valid retention period is defined for a granularity, then the default retention period is applied.

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
The aggregation input stream should only feed events to one aggregation definition.
:::

## Example

```sql
CREATE STREAM TradeStream (symbol string, price double, volume long, timestamp long);

CREATE AGGREGATION TradeAggregation WITH (store.type='database', store.replication.type='global', purge.enable='true', purge.interval='10 sec', purge.retentionPeriod.sec='120 sec', purge.retentionPeriod.min='24 hours', purge.retentionPeriod.hours='30 days', purge.retentionPeriod.days='1 year', purge.retentionPeriod.months='all', purge.retentionPeriod.years='all')
  select symbol, avg(price) as avgPrice, sum(volume) as total
  from TradeStream
    group by symbol
    aggregate by timestamp every sec ... year;
```

This stream worker defines an aggregation named `TradeAggregation` to calculate the average for the `price` attribute and sum for the `volume` attribute of events arriving at the `TradeStream` stream. These aggregates are calculated per every time granularity in the second-year range.
