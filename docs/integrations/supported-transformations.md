---
title: Supported Transformations
sidebar_position: 30
---

When you create a connection to a Macrometa collection, you can add a _transformation_. These transformations are similar to Macrometa [stream workers](../../cep/), which help you change your data using Stream QL in stream worker queries.

Stream QL is documented in [Stream Worker Queries](../../cep/query-guide/), but only portions of that section apply to transformations.

This page explains the difference between transformations and stream workers and lists the portions of Stream QL (the language used in stream worker queries) you can and cannot use in transformations.

## Transformations vs. Stream Workers

You can think of transformations as lightweight stream workers. You can use either one depending on your data pipeline and processing needs.

### Input and Output

Transformations have input and output defined automatically, and you cannot change them.

You can define multiple inputs and outputs for stream workers, but you must set them up yourself.

### Queries

Transformations allow you to write one query, while stream workers allow you to write several queries. For more information about stream worker queries, refer to [Stream Worker Queries](../../cep/query-guide/).

### Workflow

Transformations only process, or transform, content going into or out of Macrometa collections via a connection.

Stream workers process data streams, which can include Macrometa collections, but also support a variety of different [sources](../../cep/source/) and [sinks](../../cep/sink/).

## Supported Stream QL

Stream QL is documented in [Stream Worker Queries](../../cep/query-guide/), but only the following portions of that documentation apply to transformations. If your data pipeline needs are met by the following functionality, then a transformation might be the best solution:

- [Query](../../cep/query-guide/query), except for the joins and stream worker examples.
- [Values](../../cep/query-guide/value)
- [Event Types](../../cep/query-guide/event-types)
- [Functions](../../cep/query-guide/functions/)
- [Filters](../../cep/query-guide/filters/)
- [Aggregate Functions](../../cep/query-guide/aggregate-functions)
- [HAVING|WHERE](../../cep/query-guide/having-where)
- [GROUP BY](../../cep/query-guide/group-by)
- [ORDER BY](../../cep/query-guide/order-by)
- [LIMIT and OFFSET](../../cep/query-guide/limit-and-offset)
- [Output Rate Limiting](../../cep/query-guide/output-rate-limiting)
- [In-line Windows](../../cep/windows/windows-queries), which are windows defined in the query.

## Unsupported Stream QL

The following Stream QL and stream worker elements are not supported. If you need to use them in your data pipeline, then you might need to create a stream worker:

- [Custom Script Functions](../../cep/query-guide/custom-script-functions)
- [JOIN](../../cep/query-guide/join/)
- [Partitions](../../cep/query-guide/partition/)
- [Named Windows](../../cep/windows/)
- [Named Aggregations](../../cep/aggregations/)
- [Ad Hoc Queries](../../cep/ad-hoc-queries/)
- Creating any other elements, including [Tables](../../cep/table/), [Sources](../../cep/source/), and [SINKS](../../cep/sink/).

## Syntax

For more information about query syntax, refer to [Query Syntax](../../cep/query-guide/query#syntax).

```sql
OUTPUT ACTION (INSERT INTO, UPDATE, DELETE, etc.)
SELECT
    < expressions >
FROM
    Input
WHERE
    < condition > -- optional
GROUP BY
    < fields >
HAVING
    < condition > -- optional
```

## Example 1

```sql
INSERT INTO Output
SELECT "Coinbase Pro" as exchange, 
       "USA" as quote_region,
        "BTC/USD" as symbol, 
        avg(convert(price, 'double')) as ma, 
        convert(price, 'double') as close,
        time:timestampInMilliseconds()/1000 as timestamp
FROM  Input;
```

This transformation calculates the average price, converts the price to a double data type, and adjusts the timestamp for a specific input.

1. `"Coinbase Pro" as exchange, "USA" as quote_region, "BTC/USD" as symbol`: These sections are hardcoding the values for `exchange`, `quote_region`, and `symbol` fields to "Coinbase Pro", "USA", and "BTC/USD", respectively.

2. `avg(convert(price, 'double')) as ma`: This takes the average of the `price` field, which is first converted to a `double` data type. The result will be aliased as `ma`.

3. `convert(price, 'double') as close`: Here, the `price` is simply converted to a `double` data type, and the result is aliased as `close`.

4. `time:timestampInMilliseconds()/1000 as timestamp`: The timestamp is converted from milliseconds to seconds and then renamed as `timestamp`.

This transformation runs on all the documents from your `Input` collection and inserts the transformed documents into the `Output` collection.

## Example 2

```sql
INSERT INTO Output
SELECT exchange, 
       quote_region, 
       symbol, 
       timestamp, 
       trade_location,
	     trade_price, 
       trade_strategy, 
       trade_type
FROM Input
WHERE
	symbol == "MBDX" AND
  trade_location == "CA";
```

This transformation query performs the following operations:

1. `SELECT exchange, quote_region, symbol, timestamp, trade_location, trade_price, trade_strategy, trade_type`: This part of the query specifies the fields from the `Input` collection that should be included in the `Output` collection. These are: `exchange`, `quote_region`, `symbol`, `timestamp`, `trade_location`, `trade_price`, `trade_strategy`, and `trade_type`.

2. `WHERE symbol == "MBDX" AND trade_location = "CA"`: This condition filters the data from the `Input` collection to only include documents where the `symbol` field is equal to "MBDX" and the `trade_location` field is equal to "CA".

As a result, the `Output` collection will contain only the documents from the `Input` collection that satisfy the specified condition, and each document in the `Output` collection will include only the fields specified in the `SELECT` clause.

## Example 3 - Rollup

```sql
INSERT INTO Output
SELECT productId, 
       region, 
       sum(convert(amount, 'double')) as totalAmount
FROM Input
GROUP BY productId, region;
```

This transformation query, known as a "rollup," executes the following actions:

1. `SELECT productId, region, sum(convert(amount, 'double')) as totalAmount`: This part of the query instructs the transformation to include `productId` and `region` fields in the `Output` collection. Furthermore, it computes the sum of the `amount` field, after converting it to a `double` data type, and labels the result as `totalAmount`.

2. `GROUP BY productId, region`: This section groups the data from the `Input` collection based on the `productId` and `region` fields. For each unique combination of `productId` and `region`, it calculates the total sales `amount`.

In summary, this transformation collects documents from the `Input` collection, groups them by `productId` and `region`, and calculates the total `amount` for each group. The transformed data, which includes `productId`, `region`, and `totalAmount` for each group, is then inserted into the `Output` collection. This allows for an efficient rollup of sales data by product and region.
