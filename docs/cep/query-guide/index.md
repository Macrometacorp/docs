---
sidebar_position: 10
title: Stream Worker Query Guide
---

Macrometa Stream QL is designed to process streams of events. It can be used to implement streaming data integration, streaming analytics, rule based and adaptive decision making use cases. It is an evolution of Complex Event Processing (CEP) and Stream Processing systems, hence it can also be used to process stateful computations, detecting of complex event patterns, and sending notifications in real-time.

Stream QL uses SQL-like syntax, and annotations to consume events from diverse event sources with various data formats, process them using stateful and stateless operators, and send outputs to multiple endpoints according to their accepted event formats. It also supports exposing rule based and adaptive decision making as service endpoints so that external programs and systems can synchronously get decision support from streams.  

The following sections explains how to write processing logic using Stream QL.

## Stream Worker Syntax

StreamApp is a collection of Stream QL elements composed together as a script. Here each stream query element must be separated by a semicolon `;`.

### High-Level Syntax

High level syntax of StreamApp is as follows:

```js
<stream worker>  :
        <worker annotation> *
        ( <stream definition> | <table definition> | ... ) +
        ( <query> | <partition> ) +
        ;
```

### Syntax Example

For example, this stream application with the name `Temperature-Analytics` creates a stream named `TempStream` and a query named `5minAvgQuery`.

Stream workers are named by adding `@app:name('<name>')` annotation on the top of the stream worker spec. When the annotation is not added, Macrometa assigns a random UUID as the name of the stream worker.

```js
@App:name("Temperature-Analytics")
@App:description("This stream worker creates a stream and query.")
@App:qlVersion("2")

CREATE STREAM TempStream (deviceID long, roomNo int, temp double);
CREATE SINK STREAM OutputStream (roomNo int, avgTemp double);

@name('5minAvgQuery')
insert into OutputStream
select roomNo, avg(temp) as avgTemp
from TempStream window sliding_time(5 min)
group by roomNo;
```

## Stream Worker Flow Diagram

The following diagram depicts some of the key Stream QL elements of Stream Application and how events flow through the elements.

![Event Flow](/img/event-flow.png?raw=true "Event Flow")

## Elements of a Stream Worker

The table below provides a brief description of a the potential parts of a stream worker.

| Elements     | Description |
| ------------- |-------------|
| Event     | An event is a single event object associated with a stream. All events of a stream contains a timestamp and an identical set of typed attributes based on the schema of the stream they belong to.|
| [Inner Stream](partition/inner-stream.md) | A positionable stream that connects portioned queries with each other within the partition. |
| [Named Aggregation](../aggregations/index.md)     | A structured representation of data that's incrementally aggregated and stored with a defined schema and aggregation granularity such as seconds, minutes, hours, etc. Aggregation data is stored in `database`. Other stream processor elements can only query the values in windows at runtime but they cannot modify them. |
| [Named Window](../windows/index.md)     | A structured representation of data stored with a defined schema and eviction policy. Window data is stored `In-Memory` and automatically cleared by the named window constrain. Other stream processor elements can only query the values in windows at runtime but they cannot modify them. |
| [Partition](partition/index.md)	| A logical container that isolates the processing of queries based on the partition keys derived from the events. |
| [Query](query.md)	    | A logical construct that processes events in a streaming manner by consuming data from one or more streams, tables, windows and aggregations, and publishes output events into a stream, table or a window. |
| [Sink](../sink/index.md)      | A construct that consumes events arriving at a stream, maps them to a predefined data format (such as `JSON`, `binary`, etc), and publishes them to external endpoints (such as `E-mail`, `TCP`, `Kafka`, `HTTP`, etc). |
| [Source](../source/index.md)    | A construct that consumes data from external sources (such as `database`, `stream`, `TCP`, `Kafka`, `HTTP`, etc) with various event formats such as `JSON`, `binary`, etc, convert then to stream events, and passes into streams for processing. |
| [Stream](../source/source-types/stream-source.md)   | A logical series of events ordered in time with a uniquely identifiable name, and a defined set of typed attributes defining its schema. |
| Stream/Query Callback | A mechanism to programmatically consume output events from streams or queries. |
| [Table](../table/index.md)     | A structured representation of data stored with a defined schema. Stored data is backed by Macrometa collections. The tables (aka collections) can be `local` or `geo-replicated`. Similarly the tables can be `document` or `graph` collections. The tables can be accessed and manipulated at runtime. |
| [Trigger](../source/trigger.md)     | Triggers allow events to be periodically generated based on time or other conditions. |
