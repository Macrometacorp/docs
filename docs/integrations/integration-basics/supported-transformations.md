---
title: Supported Transformations
sidebar_position: 30
---

When you create a connection to a Macrometa collection, you can add a _transformation_. These transformations are similar to Macrometa [stream workers](../../cep/), which help you work with data streams and change your data using stream worker queries.

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

## Supported Transformations

We Support:
- Inline Windows.
- All the Functions mentioned in [2]
- Filters[3]
- Simple Aggregate Functions[4]
- HAVING|WHERE|GROUP BY|ORDER BY|LIMIT|OFFSET|OUTPUT Rate limit [5][6][7][8]&[9]


## Unsupported Transformations

We don’t Support:
- Creation of any element such as TABLES, SOURCES, SINKS, TRIGGERS, and etc...
- Named Windows
- Named Aggregations
- Custom-script-functions.
- Any sort of joins
- Partitioning
- Ad Hoc Queries

[1] <https://www.macrometa.com/docs/cep/query-guide/query#syntax>
[2] <https://www.macrometa.com/docs/cep/query-guide/functions/>
[3] <https://www.macrometa.com/docs/cep/query-guide/filters/>
[4] <https://www.macrometa.com/docs/cep/query-guide/aggregate-functions>
[5] <https://www.macrometa.com/docs/cep/query-guide/having-where>
[6] <https://www.macrometa.com/docs/cep/query-guide/group-by>
[7] <https://www.macrometa.com/docs/cep/query-guide/order-by>
[8] <https://www.macrometa.com/docs/cep/query-guide/limit-and-offset>
[9] <https://www.macrometa.com/docs/cep/query-guide/output-rate-limiting>
