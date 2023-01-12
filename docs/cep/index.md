---
sidebar_position: 1
title: Stream Workers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Source - 

Sink - 


Macrometa stream workers enable you to integrate streaming data and take appropriate actions. Most stream processing use cases involve collecting, analyzing, and integrating or acting on data generated during business activities by various sources.

| Stage | Description |
|-------|-------------|
| _Collect_ | Receive or capture data from various data sources. |
| _Analyze_ | Analyze data to identify interesting patterns and extract information. |
| _Act_ | Take actions based on the findings. For example, running simple code, calling an external service, or triggering a complex integration. |
| _Integrate_ | Provide processed data for consumer consumption. |

![GDN Essentials](/img/gdn-cep-overview.png)

You can process streams to perform the following actions with your data:

- Transform data from one format to another. For example, from XML to JSON.
- Enrich data received from a specific source by combining it with databases and services.
- Correlate data by joining multiple streams to create an aggregate stream.
- [Filter](query-guide/query.md#filter) data and events based on conditions such as value ranges and string matching.
- Clean data by filtering it and by modifying the content in messages. For example, obfuscating sensitive information.
- Derive insights by identifying event patterns in data streams.
- Summarize data with time windows and incremental aggregations.
- Extract, transform, and load (ETL) collections, tailing files, and scraping HTTP endpoints.
- Integrating stream data and trigger actions based on the data. This can be a single service request or a complex enterprise integration flow.
- [Consume](query-guide/stream.md#source) and [publish](query-guide/stream.md#sink) events.
- Run premade and custom [functions](query-guide/functions/index.md).
- Write custom [JavaScript functions](query-guide/script.md) to interact with your streams.


## Architecture

The architecture of Macrometa stream processing engine fits this natural flow. Following are the major components of our stream processing engine.

![Stream Processing Architecture](/img/cep-overview.png)

The stream processing engine receives data event-by-event and processes them in real-time to produce meaningful information i.e.,

- Accept event inputs from many different types of sources.
- Process them to transform, enrich, and generate insights.
- Publish them to multiple types of sinks.

To use stream processor, you need to write the processing logic as a stream application using streaming SQL language which is discussed in the [Stream Query Guide](query-guide/index.md).

When the stream application is published, it:

1. Consumes data one-by-one as events.
2. Pipe the events to queries through various streams for processing.
3. Generates new events based on the processing done at the queries.
4. Finally, sends newly generated events through output to streams.





| Data Summarization | [Aggregate data](query-guide/query.md#aggregate-function) using `sum`, `count`, average (`avg`), `min`, `max`, `distinctCount`, and standard deviation (`StdDev`) operators. Summarize events based on time intervals like `sliding time`, `tumbling/batch time` [windows](query-guide/query.md#window) and based on number of events like `sliding length`, and `tumbling/batch length` [windows](query-guide/query.md#window). Support for data summarization based on `sessions` and `uniqueness`. Support for `named aggregation` and aggregation of data based on `group by fields`, `having` conditions. Sort & limit the aggregated output using `order by` and `limit` keywords.|
| Pattern & Trend Mining |  Identifies event `occurrence patterns` among streams over time. Identify `non occurrence` of events. Supports `repetitive matches` of event pattern occurrences with logical conditions and time bound. |
| Sequence Processing | Identifies continuous sequence of events from streams. Supports `zero to many`, `one to many`, and `zero to one` event matching conditions. |
| Scatter-Gather | Process complex messages by dividing them into simple messages using `tokenize` function, process or transform them in isolation, and group them back using the `batch` window and `group` aggregation. Ability to modularize the execution logic of each use case to build a composite event-driven applications. Provide execution isolation and parallel processing by `partitioning` the events using keys or value ranges. |
| Data Pipelines | Periodically trigger data pipelines based on time intervals, and cron expression using `triggers`. Support for calling `HTTP`services in a non-blocking manner to fetch data and enrich events. Handle responses accordingly for different response status codes. Divert the events to error stream to handle the errors gracefully.|
| Geo Replicated Data Store | Query, modify, and join the data stored in [tables](query-guide/table-collection.md) which support primary key constraints and indexing. |
| Rule Processing | Execution of rules based on single event using [`filter`](query-guide/query.md#filter) operator, `if-then-else` and `match` [functions](query-guide/query.md#function), and many others. Rules based on collection of events using [data summarization](query-guide/query.md#aggregate-function), and joins with [streams](query-guide/query.md#join-stream), [tables](query-guide/table-collection.md#join-table), [windows](query-guide/query.md#join-named-window) or [aggregations](query-guide/named-aggregation.md#join-aggregation). Rules to detect event occurrence patterns, trends, or non-occurrence of a critical events using complex event processing constructs such as [`pattern`](query-guide/query.md#patterns), and [`sequence`](query-guide/query.md#sequence). |
| Real-time Decisions as Service | Provide REST APIs to [query](query-guide/query.md) `multi-modal geo-replicated tables`, `windows` and `named-aggregations` to make decisions based on the state of the system. |