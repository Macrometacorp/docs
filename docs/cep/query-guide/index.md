---
sidebar_position: 10
title: Stream Worker Query Guide
---

Macrometa Stream QL is designed to process streams of events. It can be used to implement streaming data integration, streaming analytics, rule based and
adaptive decision making use cases. It is an evolution of Complex Event Processing (CEP) and Stream Processing systems, hence it can also be used to process stateful computations, detecting of complex event patterns, and sending notifications in real-time.

Stream QL uses SQL like syntax, and annotations to consume events from diverse event sources with various data formats, process them using stateful and stateless operators and send outputs to multiple endpoints according to their accepted event formats. It also supports exposing rule based and adaptive decision making as service endpoints so that external programs and systems can synchronously get decision support from streams.  

The following sections explains how to write processing logic using Stream QL.

## Stream Application

The processing logic for your program can be written using the Streaming SQL and put together as a single declarative spec called as the `Stream Application` or the `StreamApp`.

StreamApps are named by adding `@app:name('<name>')` annotation on the top of the StreamApp spec. When the annotation is not added, the stream processor assigns a random UUID as the name of the StreamApp.

## StreamApp Purpose

StreamApp provides an isolated execution environment for your processing logic that allows you to deploy and execute processing logic independent of other StreamApps in the system. Therefore, it's always recommended to have processing logic related to a single use case in a single StreamApp. This will help you to group processing logic and easily manage addition and removal of various use cases.

The following diagram depicts some of the key Stream QL elements of Stream Application and how **events flow** through the elements.

:::tip
"Have different business use cases in separate Stream Applications."
This is recommended as it allows users to selectively deploy the applications based their on business needs. It is also recommended to move the repeated steam processing logic that exists in multiple Stream Applications, such as message retrieval and preprocessing, to a common Stream Application, whereby reducing code duplication and improving maintainability. In this case, to pass the events from one Stream App to another, configure them using a common stream or collection using `stream` Sink and `stream` Source.
:::
![Event Flow](/img/event-flow.png?raw=true "Event Flow")

The table below provides a brief description of a few key elements in the Stream QL Language.

| Elements     | Description |
| ------------- |-------------|
| Stream    | A logical series of events ordered in time with a uniquely identifiable name, and a defined set of typed attributes defining its schema. |
| Event     | An event is a single event object associated with a stream. All events of a stream contains a timestamp and an identical set of typed attributes based on the schema of the stream they belong to.|
| Table     | A structured representation of data stored with a defined schema. Stored data is backed by C8DB. The tables (aka collections) can be `local` or `geo-replicated`. Similarly the tables can be `document` or `graph` collections. The tables can be accessed and manipulated at runtime. |
| Named Window     | A structured representation of data stored with a defined schema and eviction policy. Window data is stored `In-Memory` and automatically cleared by the named window constrain. Other stream processor elements can only query the values in windows at runtime but they cannot modify them.
| Named Aggregation     | A structured representation of data that's incrementally aggregated and stored with a defined schema and aggregation granularity such as seconds, minutes, hours, etc. Aggregation data is stored in `database`. Other stream processor elements can only query the values in windows at runtime but they cannot modify them. |
| Query	    | A logical construct that processes events in streaming manner by by consuming data from one or more streams, tables, windows and aggregations, and publishes output events into a stream, table or a window. |
| Source    | A construct that consumes data from external sources (such as `database`, `stream`, `TCP`, `Kafka`, `HTTP`, etc) with various event formats such as `XML`, `JSON`, `binary`, etc, convert then to stream events, and passes into streams for processing.
| Sink      | A construct that consumes events arriving at a stream, maps them to a predefined data format (such as `XML`, `JSON`, `binary`, etc), and publishes them to external endpoints (such as `E-mail`, `TCP`, `Kafka`, `HTTP`, etc). |
| Stream/Query Callback | A mechanism to programmatically consume output events from streams or queries. |
| Partition	| A logical container that isolates the processing of queries based on the partition keys derived from the events. |
| Inner Stream | A positionable stream that connects portioned queries with each other within the partition. |

#### Syntax

StreamApp is a collection of Stream QL elements composed together as a script. Here each stream query element must be separated by a semicolon `;`.

High level syntax of StreamApp is as follows.

```js
<stream app>  :
        <app annotation> *
        ( <stream definition> | <table definition> | ... ) +
        ( <query> | <partition> ) +
        ;
```

For example, this stream application with the name `Temperature-Analytics` creates a stream named `TempStream` and a query named `5minAvgQuery`.

```js
@app:name('Temperature-Analytics')
@App:qlVersion("2")

CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

@name('5minAvgQuery')
insert into OutputStream
select roomNo, avg(temp) as avgTemp
from TempStream#window.time(5 min)
group by roomNo;
```
