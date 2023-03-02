---
sidebar_position: 40
title: Aggregation Example
---

You can use aggregations to summarize data. In this context, summarizing data refers to obtaining aggregates in an incremental manner for a specified set of time periods.

## Summarization by Clock-time

Performing clock-time based based summarization involves calculating, storing, and then retrieving aggregations for a selected range of time granularities. This process is carried out in two parts:

1. Calculate the aggregations for the selected time granularities and storing the results.
2. Retrieve previously calculated aggregations for selected time granularities.

To understand data summarization further, consider the scenario where a business that sells multiple brands stores its sales data in a physical database for the purpose of retrieving them later to perform sales analysis. Each sales transaction is received with the following details:

- `symbol`: The symbol that represents the brand of the items sold.
- `price`: the price at which each item was sold.
- `amount`: The number of items sold.

The sales analyst needs to retrieve the total number of items sold of each brand per month, per week, per day etc., and then retrieve these totals for specific time durations to prepare sales analysis reports.

:::info
It is not always required to maintain a physical database for incremental analysis, but it enables you to try out your aggregations with ease.
:::

The following sections explain how to calculate and store time-based aggregations for this scenarios, and then retrieve them.

## Calculate and Store clock-time-based Aggregate Values

You could use this stream worker to calculate and store time-based aggregation values for the scenario explained above.

```sql
@App:name("TradeApp")
@App:qlVersion("2")

-- Input stream to capture the input events based on which the aggregations are calculated.
CREATE STREAM TradeStream (symbol string, price double, quantity long, timestamp long);

CREATE AGGREGATION TradeAggregation WITH(store.type='database', store.replication.type='global')
SELECT symbol, AVG(price) AS avgPrice, SUM(quantity) AS total
FROM TradeStream
    GROUP BY symbol
    AGGREGATE BY timestamp EVERY hour;
```

### Input

In addition to the `symbol`, `price`, and `quantity` attributes to capture the input details, the input stream definition includes an attribute named timestamp to capture the time at which the sales transaction occurs. The aggregations are executed based on this time. This attribute's value could either be a long value (reflecting the Unix timestamp in milliseconds), or a string value adhering to one of the following formats.

- `<YYYY>-<MM>-<dd> <HH>:<mm>:<ss> <Z>`: This format can be used if the timezone needs to be specified explicitly. Here the ISO 8601 UTC offset must be provided for <Z> . e.g., +05:30 reflects the India Time Zone. If time is not in GMT, this value must be provided.)
- `<yyyy>-<MM>-<dd> <HH>:<mm>:<ss>`: This format can be used if the timezone is in GMT.

### Output and Store

The system uses the aggregation name you define here as part of the table (collection) name. The table name is `<StreamWorker_Name>-<Aggregation_Name>_<Granularity>`.

Macrometa automatically creates a collection `TradeApp-TradeAggregation_HOUR`, as the stream worker calculates the aggregation hourly.

In the query, the `avg()` function is applied to the `price` attribute to derive the average price. The `sum()` function is applied to the `quantity` attribute to derive the total quantity. The `FROM` clause gets the input events from `TradeStream` and the `GROUP BY` clause groups the output by symbol.

The timestamp included in each input event allows you to calculate aggregates for the range of time granularities from seconds to years. In this query, you aggregate it by hour.

## Retrieve Stored Aggregate Values

This section involves retrieving the aggregate values that you calculated and persisted in the [Calculate and Store clock-time-based Aggregate Values](#calculate-and-store-clock-time-based-aggregate-values).

To do this, you can add the definitions and queries required for retrieval to the `TradeApp` stream worker from the previous section.

```sql
@App:name("TradeApp")
@App:qlVersion("2")

CREATE STREAM TradeStream (symbol string, price double, quantity long, timestamp long);

CREATE SINK STREAM TradeSummaryStream (symbol string, total long, avgPrice double);

CREATE AGGREGATION TradeAggregation
SELECT symbol, AVG(price) AS avgPrice, SUM(quantity) AS total
FROM TradeStream
GROUP BY symbol
AGGREGATE BY timestamp EVERY hour;

@INFO(name = 'RetrievingAggregates') 
INSERT INTO TradeSummaryStream
SELECT a.symbol, a.total, a.avgPrice 
FROM TradeStream AS b JOIN TradeAggregation AS a
    ON a.symbol = b.symbol 
    WITHIN "2014-02-15 00:00:00 +05:30", "2014-03-16 00:00:00 +05:30" 
    PER "days" ;
```
