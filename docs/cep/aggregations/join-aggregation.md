---
sidebar_position: 30
title: Join (Aggregation)
---

### Join (Aggregation)

This allows a stream to retrieve calculated aggregate values from the aggregation.

:::note
A join can also be performed with [two streams](#join-stream), with a [table](#join-table) and a stream, or with a stream against externally [named windows](#join-window).
:::

**Syntax**

A join with aggregation is similer to the join with [table](#join-table), but with additional `within` and `per` clauses.

```
insert into <output stream>
select <attribute name>, <attribute name>, ...
from <input stream> join <aggrigation>
  on <join condition>
  within <time range>
  per <time granularity>;
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

CREATE AGGREGATION TradeAggregation WITH (store.type='database', store.replication.type='global')
select symbol, avg(price) as avgPrice, sum(volume) as total
from TradeStream
    group by symbol
    aggregate by timestamp every sec ... year;
```

This query retrieves daily aggregations within the time range `"2014-02-15 00:00:00 +05:30", "2014-03-16 00:00:00 +05:30"` (Please note that +05:30 can be omitted if timezone is GMT)

```
CREATE SINK STREAM TradeSummaryStream (symbol string, total long, avgPrice double);

@info(name = 'RetrievingAggregates')
insert into TradeSummaryStream
select a.symbol, a.total, a.avgPrice 
from TradeStream as b join TradeAggregation as a
    on a.symbol == b.symbol 
    within "2014-02-15 00:00:00 +05:30", "2014-03-16 00:00:00 +05:30" 
    per "days";
```

This query retrieves hourly aggregations within the day `2014-02-15`.

```
CREATE SINK STREAM TradeSummaryStream (symbol string, total long, avgPrice double);

@info(name = 'RetrievingHourlyAggregates')
insert into TradeSummaryStream
select a.symbol, a.total, a.avgPrice 
from TradeStream as b join TradeAggregation as a
    on a.symbol == b.symbol 
    within "2014-02-15 **:**:** +05:30"
    per "hours";
```

This query retrieves all aggregations per `perValue` stream attribute within the time period between timestamps `1496200000000` and `1596434876000`.

```
CREATE STREAM TradeStream (symbol string, price double, volume long, timestamp long, perValue string);
CREATE SINK STREAM TradeSummaryStream (symbol string, total long, avgPrice double);

@info(name = 'RetrievingPervalueAggregates')
insert into TradeSummaryStream
select a.symbol, a.total, a.avgPrice 
from TradeStream as b join TradeAggregation as a
    on a.symbol == b.symbol 
    within 1496200000000L, 1596434876000L
    per b.perValue;
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
