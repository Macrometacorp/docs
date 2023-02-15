---
sidebar_position: 40
title:  Stream Worker Elements
---

The page below provides a brief description of all the potential parts of a stream worker. Items marked as _required_ are necessary components for every stream worker. For example, every stream worker needs a [source](#source-required), but not all stream workers need an [aggregation](#named-aggregation).

## Event

An _event_ is a single event object associated with a stream. All events of a stream contains a timestamp and an identical set of typed attributes based on the schema of the stream they belong to.

Events are part of a stream worker definition, they are what a stream worker consumes and processes.

## Stream

A _stream_ is a logical series of events ordered in time with a uniquely identifiable name and a defined set of typed attributes defining its schema. Streams can be used in stream workers as sources or sinks.

For more information about streams in general, refer to [Streams](../../streams/).

For more information about using streams in stream workers, refer to [Stream Source](../source/source-types/stream-source) and [Stream Sink](../sink/sink-types/stream-sink).

## Metadata (Required)

_Metadata_ includes some required elements, such as the name and the query language version, and some items that are just helpful, like descriptions. Metadata is always listed first in the stream worker order.

## Source (Required)

In the simplest termers, a _source_ is where the events the stream worker processes come from; the source of events. Stream workers can have multiple sources.

In more technical terms, a source is a construct that consumes data from external sources (such as `database`, `stream`, `TCP`, `Kafka`, `HTTP`, and so on) with various event formats such as `JSON` or `binary`, converts then to stream events, and then passes into streams for processing.

For more information about sources, refer to [Sources](../source/).

### Trigger

_Triggers_ allow events to be periodically generated based on time or other conditions. You can use a trigger as a stream worker source.

For more information about metadata, refer to [Trigger](../source/trigger).

### Query Worker

You can access your Macrometa data collections by writing a _query_ in [SQL](../../queryworkers/sql/) or [C8QL](../../queryworkers/c8ql/). GDN stores named and parameterized queries as _query workers_ that you can run from a dedicated REST endpoint.

You can use a query worker as a stream worker source or to process stream events. Stream workers can either create new stream workers or use existing ones.

For more information about query workers in general, refer to [Queries and Query Workers](../../queryworkers/).

## Sink (Required)

In the simplest terms, a _sink_ is where the stream worker sends processed events. If the source is the origin, then the sink is the destination. Stream workers can have multiple sinks.

In more technical terms, a sink is a construct that consumes events arriving at a stream, maps them to a predefined data format (such as `JSON`, `binary`, and so on), and then publishes them to external endpoints (such as`TCP`, `Kafka`, `HTTP`, and so on).

For more information about sinks, refer to [Sinks](../sink/).

## Query (Required)

A _query_ is a stream worker is a logical construct that processes events in a streaming manner by consuming data from one or more streams, tables, windows, and aggregations, and then publishes output events into a stream, table, or a window.

Queries often use functions and partitions as part of their processing.

You can use queries to query windows, aggregations, and tables.

For more information about queries in stream workers, refer to [Stream Worker Queries](../query-guide/).

### Functions

_Functions_ enhance Macrometa Stream QL, the language used to write stream workers, by incorporating additional capabilities such as math, geospatial, and sentiment analysis. Functions can accept zero or more parameters, perform actions, and return the result.

For more information about using functions, refer to [Functions](../query-guide/functions/).

### Partition

A _partition_ is a logical container that isolates the processing of queries based on the partition keys derived from the events.

For more information about using partitions, refer to [Partition](../query-guide/partition/).

### Inner Stream

An _inner stream_ is a positionable stream that connects portioned queries with each other within the partition.

For more information about using inner streams, refer to [Inner Stream](../query-guide/partition/inner-stream).

## Named Aggregation

A _named aggregation_ is the structured representation of data that's incrementally aggregated and stored with a defined schema and aggregation granularity such as seconds, minutes, hours, and so on. Aggregation data is stored in a Macrometa collection (`database`). Other stream processor elements can query the values in aggregation windows at runtime, but they cannot modify them.

For more information about aggregations, refer to [Named Aggregation](../aggregations/).

## Named Window

A _named window_ is the structured representation of data stored with a defined schema and eviction policy. Window data is stored in memory and is automatically cleared by the named window constrain. Other stream processor elements can query the values in windows at runtime, but they cannot modify them.

For more information about windows, refer to [Named Windows](../windows).

## Table (Collection)

A _table_ is the structured representation of data stored with a defined schema. Stored data is backed by Macrometa collections. The tables (collections) can be `local` or `geo-replicated`. Similarly, the tables can be `document` or `graph` collections. Tables can be accessed and manipulated at runtime.

For more information about tables, refer to [Table](../table/).
