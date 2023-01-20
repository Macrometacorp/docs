---
sidebar_position: 1
title: Stream Workers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A _stream worker_ performs complex event processing on data in motion, also called [streams](../streams/index.md). Macrometa GDN allows you to integrate streaming data and take appropriate actions. Most stream processing use cases involve collecting, analyzing, and integrating or acting on data generated during business activities by various sources.

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
- Query, modify, and join the data stored in [tables](query-guide/table-collection.md) which support primary key constraints and indexing.
- Rule processing based on single event using [`filter`](query-guide/query.md#filter) operator, `if-then-else` and `match` [functions](query-guide/query.md#function), and many others.

These features allows you to build robust global data processing and integration pipelines at the edge by combining powerful stream processing, multi-model database and geo-replicated streams capabilities.

:::tip
"Have different business use cases in separate stream workers."
This is recommended as it allows users to selectively deploy the applications based on their business needs. It is also recommended to move the repeated stream processing logic that exists in multiple stream workers, such as message retrieval and preprocessing, to a common stream workers, whereby reducing code duplication and improving maintainability. In this case, to pass the events from one Stream App to another, configure them using a common stream or collection using `stream` Sink and `stream` Source.

Stream workers provide an isolated execution environment for your processing logic that allows you to deploy and execute processing logic independent of other stream workers in the system. Therefore, it's always recommended to have processing logic related to a single use case in a single StreamApp. This will help you to group processing logic and easily manage addition and removal of various use cases.
:::

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