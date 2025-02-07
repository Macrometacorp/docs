---
sidebar_position: 1
title: Stream Workers
---

A _stream worker_ performs complex event processing on data in motion, also called [streams](../../streams/index.md). Macrometa GDN allows you to integrate streaming data and take appropriate actions.

## Stream Processing

Most stream processing use cases involve collecting, analyzing, and integrating or acting on data generated during business activities by various sources.

| Stage | Description |
|-------|-------------|
| _Collect_ | Receive or capture data from various data sources. |
| _Analyze_ | Analyze data to identify interesting patterns and extract information. |
| _Act_ | Take actions based on the findings. For example, running simple code, calling an external service, or triggering a complex integration. |
| _Integrate_ | Provide processed data for consumer consumption. |

![GDN Essentials](/img/gdn-cep-overview.png)

## Stream Processing Actions

You can process streams to perform the following actions with your data:

- Transform data from one format to another. For example, from text to JSON.
- Enrich data received from a specific source by combining it with databases and services.
- Correlate data by joining multiple streams to create an aggregate stream.
- [Filter](query-guide/query.md#filter) data and events based on conditions such as value ranges and string matching.
- Clean data by filtering it and by modifying the content in messages. For example, obfuscating sensitive information.
- Derive insights by identifying event patterns in data streams.
- Summarize data with time windows and incremental aggregations.
- Extract, transform, and load (ETL) collections, tailing files, and scraping HTTP endpoints.
- Integrating stream data and trigger actions based on the data. This can be a single service request or a complex enterprise integration flow.
- Consume and publish events.
- Run pre-made and custom [functions](query-guide/functions/).
- Write custom [JavaScript functions](query-guide/custom-script-functions.md) to interact with your streams.
- Query, modify, and join the data stored in [tables](table/index.md) which support primary key constraints and indexing.
- Rule processing based on single event using [`filter`](query-guide/query.md#filter) operator, `if-then-else` and `match` [functions](query-guide/query.md#function), and many others.

These actions allow you to build robust global data processing and integration pipelines at the edge by combining powerful stream processing, multi-model database and geo-replicated streams capabilities.