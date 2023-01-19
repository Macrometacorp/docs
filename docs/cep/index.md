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


## Stream Worker Explanation

This section explains the parts of this stream worker and what they are doing.

### Metadata

This information defines basic information about the stream worker. Every stream worker must have at least a name and query language version in order to be valid.

- **Name** - `@App:name("ExampleApp")`
- **Query language version (optional)** - @App:qlVersion("2")
- **Description (optional)** - @App:description('An application for enriching transactions.')
- **Other information (optional)** - By convention, you can enter a comment with testing information, update logs, or other useful information at the beginning of the stream worker definition between `/**` and `**/`. This is similar to a docstring in functions.

:::note
`qlVersion` is only used for backwards compatibility with deprecated stream workers.
:::

### Input and Output

Define the input stream and the Macrometa collection that need to be joined as follows. If the stream or collection do not exist, then Macrometa creates them when you publish the stream worker.

#### Define the Source Stream

This stream is where the data is coming from. For more information about defining a STREAM in a stream worker, refer to [STREAM](../query-guide/stream.md) in the [Query Guide](../query-guide/index.md). For more information about streams in general, refer to [Streams](../../streams/index.md).

```sql
CREATE STREAM TransactionStream (userId long, transactionAmount double, location string);
```

#### Define the Table (Collection)

`CREATE TABLE` defines where the stream worker stores your data. In this case, it will be a [Document Store Collection](../../collections/documents/index.md) For more information about defining a TABLE in a stream worker, refer to [Table (Collection)](../query-guide/table-collection.md). For more information about collections in general, refer to [Collections](../../collections/index.md).

```sql
CREATE TABLE GLOBAL UserTable (userId long, firstName string, lastName string);
```

#### Define the Sink

The sink is where the stream worker sends your data.

```sql
CREATE SINK EnrichedTransactionStream WITH (type='stream', stream='EnrichedTransactionStream', map.type='json') (userId long, userName string, transactionAmount double, location string);
```

### Data Enrichment Query

Define the query for a stream to join the stream and the table, and then handle the result. This section examines the query line by line.

#### Insert Data

The `insert into` clause defines an output stream into which the enriched data is directed.

```sql
insert into EnrichedTransactionStream;
```

#### Select Data

A `select` clause specifies how the value for each attribute in the output stream is derived. The variables used for the attributes are defined in the next line where you [join data](#join-data).

```sql
select u.userId, str:concat( u.firstName, " ", u.lastName) as userName, transactionAmount, location
```

Note the following in the `select` statement:

- The `userId` attribute name is common to both the stream and the table. Therefore, you need to specify from where this attribute needs to be taken. Here, you can also specify `t.userId` instead of `u.userId`.
- You are specifying the output generated to include an attribute named `userName`. The value for that is derived
by concatenating the values of the `firstName` and `lastName` attributes in the `UserTable` table using the `str:concat()` function.
- You can apply any of the range of streams functions available to further enrich the joined output.

#### Join Data

The `from` clause together with the `join` keyword join the table and the stream.

```sql
from UserTable as u join TransactionStream as t on u.userId == t.userId
```

Note the following about the `from` clause:

- The input data is taken from both a stream and a table. You need to assign a unique reference for each of them to allow the query to differentiate between the common attributes. In this example, `TransactionStream` stream is referred to as `t`, and the `UserTable` table is referred to as `u`.
- The `join` keyword joins the stream and the table together and defines the unique references.
- The condition for the stream and the table to be joined is `t.userId == u.userId`, which means that for an event to be taken from the `TransactionStream` for the join, one or more events that have the same value for the `userId` must exist in the `UserTable` table and vice versa.



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