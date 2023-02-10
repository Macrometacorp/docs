---
sidebar_position: 40
title: Elements of Stream Workers
---

## Elements of a Stream Worker

The table below provides a brief description of a the potential parts of a stream worker.

| Elements     | Description |
| ------------- |-------------|
| Event     | An event is a single event object associated with a stream. All events of a stream contains a timestamp and an identical set of typed attributes based on the schema of the stream they belong to.|
| [Inner Stream](../query-guide/partition/inner-stream) | A positionable stream that connects portioned queries with each other within the partition. |
| [Named Aggregation](../aggregations/)     | A structured representation of data that's incrementally aggregated and stored with a defined schema and aggregation granularity such as seconds, minutes, hours, etc. Aggregation data is stored in `database`. Other stream processor elements can only query the values in windows at runtime but they cannot modify them. |
| [Named Window](../windows/)     | A structured representation of data stored with a defined schema and eviction policy. Window data is stored `In-Memory` and automatically cleared by the named window constrain. Other stream processor elements can only query the values in windows at runtime but they cannot modify them. |
| [Partition](../query-guide/partition/)	| A logical container that isolates the processing of queries based on the partition keys derived from the events. |
| [Query](../query-guide/query)	    | A logical construct that processes events in a streaming manner by consuming data from one or more streams, tables, windows and aggregations, and publishes output events into a stream, table or a window. |
| [Sink](../sink/)      | A construct that consumes events arriving at a stream, maps them to a predefined data format (such as `JSON`, `binary`, etc), and publishes them to external endpoints (such as `E-mail`, `TCP`, `Kafka`, `HTTP`, etc). |
| [Source](../source/)    | A construct that consumes data from external sources (such as `database`, `stream`, `TCP`, `Kafka`, `HTTP`, etc) with various event formats such as `JSON`, `binary`, etc, convert then to stream events, and passes into streams for processing. |
| [Stream](../source/source-types/stream-source)   | A logical series of events ordered in time with a uniquely identifiable name, and a defined set of typed attributes defining its schema. |
| Stream/Query Callback | A mechanism to programmatically consume output events from streams or queries. |
| [Table](../query-guide/table-collection)     | A structured representation of data stored with a defined schema. Stored data is backed by C8DB. The tables (aka collections) can be `local` or `geo-replicated`. Similarly the tables can be `document` or `graph` collections. The tables can be accessed and manipulated at runtime. |
| [Trigger](../source/trigger)     | Triggers allow events to be periodically generated based on time or other conditions. |