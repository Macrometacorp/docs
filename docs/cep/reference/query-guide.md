---
sidebar_position: 11
---

# Stream Query Guide

## Introduction

Macrometa Stream QL is designed to process streams of events. It can be used to implement streaming data integration, streaming analytics, rule based and
adaptive decision making use cases. It is an evolution of Complex Event Processing (CEP) and Stream Processing systems, hence it can also be used to process stateful computations, detecting of complex event patterns, and sending notifications in real-time.

Stream QL uses SQL like syntax, and annotations to consume events from diverse event sources with various data formats, process then using stateful and stateless operators and send outputs to multiple endpoints according to their accepted event formats. It also supports exposing rule based and adaptive decision making as service endpoints such that external programs and systems can synchronously get decision support form Stream.  

The following sections explains how to write processing logic using Stream QL.

## Stream Application

The processing logic for your program can be written using the Streaming SQL and put together as a single declarative spec called as the `Stream Application` or the `StreamApp`.

StreamApps are named by adding `@app:name('<name>')` annotation on the top of the StreamApp spec. When the annotation is not added stream processor assigns a random UUID as the name of the StreamApp.

### Purpose

StreamApp provides an isolated execution environment for your processing logic that allows you to deploy and execute processing logic independent of other StreamApps in the system. Therefore it's always recommended to have a processing logic related to single use case in a single StreamApp. This will help you to group processing logic and easily manage addition and removal of various use cases.

The following diagram depicts some of the key Stream QL elements of Stream Application and how **event flows** through the elements.

:::tip 
"Have different business use cases in separate Stream Applications."
This is recommended as it allows users to selectively deploy the applications based their on business needs. It is also recommended to move the repeated steam processing logic that exist in multiple Stream Applications such as message retrieval and preprocessing, to a common Stream Application, whereby reducing code duplication and improving maintainability. In this case, to pass the events from one Stream App to another, configure them using a common stream or collection using `stream` Sink and `stream` Source.
:::
![Event Flow](/img/event-flow.png?raw=true "Event Flow")

Below table provides brief description of a few key elements in the Stream QL Language.

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

For example, this stream application with name `Temperature-Analytics` creates a stream named `TempStream` and a query named `5minAvgQuery`.

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

## Stream

A stream is a logical series of events ordered in time. Its schema is defined via the *stream definition*. A stream definition contains the stream name and a set of attributes with specific types and uniquely identifiable names within the stream. All events associated to the stream will have the same schema (i.e., have the same attributes in the same order).

Stream processor groups common types of events together with a schema. This helps in various ways such as, processing all events together in queries and performing data format transformations together when they are consumed and published via sources and sinks.

### Syntax

The syntax for defining a new stream is as follows.

```sql
CREATE STREAM <stream_name> (<attribute_name> <attribute_type>,
                             <attribute_name> <attribute_type>, ... );
```

The following parameters are used to configure a stream definition.

| Parameter     | Description |
| ------------- |-------------|
| `stream name`      | The name of the stream created. (It is recommended to define a stream name in `PascalCase`.) |
| `attribute name`   | Uniquely identifiable name of the stream attribute. (It is recommended to define attribute names in `camelCase`.)|    |
| `attribute type`   | The type of each attribute defined in the schema.  This can be `STRING`, `INT`, `LONG`, `DOUBLE`, `FLOAT`, `BOOL` or `OBJECT`.     |

To use and refer stream and attribute names that do not follow `[a-zA-Z_][a-zA-Z_0-9]*` format enclose them in ``` ` ```. E.g. ``` `$test(0)` ```.

To make the stream process events with multi-threading and asynchronously, we add `Async` to the `WITH()` property. For example: `WITH(async='true')`

This example creates a stream called `TempStream` with the following attributes:

+ `deviceID` of type `long`
+ `roomNo` of type `int`
+ `temp` of type `double`

```sql
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);
```


### Source

Sources receive events via multiple transports and in various data formats, and direct them into streams for processing.

A source configuration allows to define a mapping in order to convert each incoming event from its native data format to a stream event. When customizations to such mappings are not provided, stream processor assumes that the arriving event adheres to the predefined format based on the stream definition and the configured message mapping type.

**Purpose**

Source provides a way to consume events from internal & external services and convert them to be processed by the associated stream.


**Syntax**

To configure a stream that consumes events via a source, add the source configuration to a stream definition by adding the `source.type` annotation with the required parameter values.

The source syntax is as follows:

```sql
CREATE SOURCE <source_name> WITH (type = 'source_type', <static_key>='<value>', map.type='json') (<attribute1>='<attribute mapping>', <attribute2>='<attribute mapping>')
```

This syntax includes the following annotations.

**Source**

The `type` parameter of `CREATE SOURCE` annotation defines the source type that receives events. The other parameters of `source.type` annotation depends upon the selected source type, and here some of its parameters can be optional.

The following is the list of source types supported by Stream:

|Source type | Description|
| ------------- |-------------|
| `database` | Allow stream app to consume events from collections (doc, graphs) running in the same or different geo fabric. |
| `stream` | Allow stream app to consume events from streams (local, geo-replicated) running in the same or different geo fabric. |
| `Kafka` | Subscribe to Kafka topic to consume events.|

#### Source Mapper

Each `source.type` configuration can have a mapping denoted by the `map.type` annotation that defines how to convert the incoming event format to Stream events.

The `type` parameter of the `map.type` defines the map type to be used in converting the incoming events. The other parameters of `map.type` annotation depends on the mapper selected, and some of its parameters can be optional.

For detailed information about the parameters see the documentation of the relevant mapper.

**Map Attributes**

`attributes` is an optional annotation used with `map.type` to define custom mapping. When `attributes` is not provided, each mapper assumes that the incoming events adheres to its own default message format and attempt to convert the events from that format. By adding the `attributes` annotation, users can selectively extract data from the incoming message and assign them to the attributes.

There are two ways to configure `attributes`. In both cases, add the attributes in parentheses after the query:

* Define attribute names as keys, and mapping configurations as values:
  ```
  ... ( <attribute1>='<mapping>', <attributeN>='<mapping>')
  ```

* Define the mapping configurations in the same order as the attributes defined in stream definition:
  ```
  ... ( '<mapping for attribute1>', '<mapping for attributeN>')
  ```

**Supported Source Mapping Types**

The following is the list of source mapping types supported by Stream:

|Source mapping type | Description|
| ------------- |-------------|
| PassThrough | Omits data conversion on Stream events.|
| JSON | Converts JSON messages to Stream events.|
| XML | Converts XML messages to Stream events.|
| TEXT | Converts plain text messages to Stream events.|
| Key Value | Converts key-value HashMaps to Stream events.|
| CSV | Converts CSV like delimiter separated events to Stream events.|

:::tip
When the `map.type` annotation is not provided `map.type='passThrough'` is used as default, that passes the consumed stream events directly to the streams without any data conversion.
:::
**Example 1**

Receive `JSON` messages via `stream`, and direct them to `InputStream` stream for processing. The stream expects the `JSON` messages to be on the default data format that's supported by the `JSON` mapper as follows.

```json
{
  "name":"Paul",
  "age":20,
  "country":"UK"
}
```

The configuration of the `stream` source and `JSON` source mapper to achieve the above is as follows.

```sql
CREATE SOURCE InputStream WITH (source.type='stream', streams.list='foo', map.type='json') (name string, age int, country string);
```

**Example 2**

Receive `JSON` messages via `database`, and direct them to `StockStream` stream for processing. Here the incoming `JSON`, as given below, do not adhere to the default data format that's supported by the `JSON` mapper.

```json
{
  "portfolio":{
    "stock":{
      "volume":100,
      "company":{
        "symbol":"FB"
      },
      "price":55.6
    }
  }
}
```

The configuration of the `database` source and the custom `JSON` source mapping to achieve the above is as follows.

```
CREATE SOURCE StockStream WITH (source.type='database', collection='foo', map.type='json', enclosing.element="$.portfolio",) (symbol = "stock.company.symbol", price = "stock.price", volume = "stock.volume");
```

The same can also be configured by omitting the attribute names as below.

```
CREATE SOURCE StockStream WITH (source.type='database', collection='foo', map.type='json', enclosing.element="$.portfolio",) ("stock.company.symbol", "stock.price", "stock.volume");
```

### Sink

Sinks consumes events from streams and publish them via multiple transports to external endpoints in various data formats.

A sink configuration allows users to define a mapping to convert the Stream events in to the required output data format (such as `JSON`, `TEXT`, `XML`, etc.) and publish the events to the configured endpoints. When customizations to such mappings are not provided, Stream converts events to the predefined event format based on the stream definition and the configured message mapper type before publishing the events.

**Purpose**

Sink provides a way to publish stream events of a stream to external systems by converting events to their supported format.

**Syntax**

To configure a stream to publish events via a sink, add the sink configuration to a stream definition by adding the `sink.type` annotation with the required parameter values.

The sink syntax is as follows:

```
CREATE SINK <stream name> WITH (sink.type='<sink type>', <static.key>='<value>', <dynamic.key>='{{<value>}}', map.type='<map type>', <static.key>='<value>', <dynamic.key>='{{<value>}}', map.payload'<payload mapping>')) (<attribute1> <type>, <attributeN> <type>);
```

:::note 
"Dynamic Properties"
The sink and sink mapper properties that are categorized as `dynamic` have the ability to absorb attribute values
dynamically from the Stream events of their associated streams. This can be configured by enclosing the relevant
attribute names in double curly braces as`{{...}}`, and using it within the property values.

Some valid dynamic properties values are:

* `'{{attribute1}}'`
* `'This is {{attribute1}}'`
* `{{attribute1}} > {{attributeN}}`  

Here the attribute names in the double curly braces will be replaced with the values from the events before they are published.
:::

This syntax includes the following annotations.

**Sink**

The `type` parameter of the `sink.type` annotation defines the sink type that publishes the events. The other parameters of the `sink.type` annotation depends upon the selected sink type, and here some of its parameters can be optional and/or dynamic.

The following is a list of sink types supported by stream processor:

|Source type | Description|
| ------------- |-------------|
| database | Allow StreamApp to publish events to collections (doc, graphs) in the same or different geofabric. |
| HTTP| Publish events to an HTTP endpoint.|
| Kafka | Publish events to Kafka topic. |
| TCP | Publish events to a TCP service. |
| Email | Send emails via SMTP protocols.|
| Web Socket | Publish events to a Web Socket |

#### Distributed Sink

Distributed Sinks publish events from a defined stream to multiple endpoints using load balancing or partitioning strategies.

Any sink can be used as a distributed sink. A distributed sink configuration allows users to define a common mapping to convert
and send the Stream events for all its destination endpoints.

**Purpose**

Distributed sink provides a way to publish Stream events to multiple endpoints in the configured event format.

**Syntax**

To configure distributed sink add the sink configuration to a stream definition by adding the `sink.type` property and add the configuration parameters that are common of all the destination endpoints inside it, along with the common parameters also add the `distribution.strategy` property specifying the distribution strategy (i.e. `roundRobin` or `partitioned`) and `destination` properties providing each endpoint specific configurations.

The distributed sink syntax is as follows:

**_RoundRobin Distributed Sink_**

Publishes events to defined destinations in a round robin manner.

```
CREATE SINK <stream name> WITH (sink.type='<sink type>', <common.static.key>='<value>', <common.dynamic.key>='{{<value>}}', map.type='<map type>', <static.key>='<value>', <dynamic.key>='{{<value>}}', map.payload='<payload mapping>' distribution.strategy='roundRobin', destination.<key>='<value>', destination.<key>='<value>') (<attribute1> <type>, <attributeN> <type>);
```

**_Partitioned Distributed Sink_**

Publishes events to defined destinations by partitioning them based on the partitioning key.

```

CREATE SINK <stream name> WITH (sink.type='<sink type>', <common.static.key>='<value>', <common.dynamic.key>='{{<value>}}', map.type='<map type>', <static.key>='<value>', <dynamic.key>='{{<value>}}', map.payload='<payload mapping>', distribution.strategy='partitioned', partitionKey='<partition key>', destination.<key>='<value>', destination.<key>='<value>') (<attribute1> <type>, <attributeN> <type>);
```

#### Sink Mapper

Each `sink.type` configuration can have a mapping denoted by the `map.type` annotation that defines how to convert Stream events to outgoing messages with the defined format.

The `type` parameter of the `map.type` defines the map type to be used in converting the outgoing events. The other parameters of `map.type` annotation depends on the mapper selected, and some of its parameters can be optional and/or dynamic.

For detailed information about the parameters see the documentation of the relevant mapper.

**Map Payload**

`map.payload` is an optional annotation used with `map.type` to define custom mapping. When the `map.payload` annotation is not provided, each mapper maps the outgoing events to its own default event format. The `map.payload` annotation allow users to configure mappers to produce the output payload of their choice, and by using dynamic properties within the payload they can selectively extract and add data from the published Stream events.

There are two ways you to configure `map.payload` annotation.

1. Some mappers such as `XML`, `JSON`, and `Test` only accept one output payload: 
  ```
  map.payload='This is a test message from {{user}}.'
  ```
2. Some mappers such `key-value` accept series of mapping values: 
  ```
  map.payload= key1='mapping_1', 'key2'='user : {{user}}'
  ```
  Here, the keys of payload mapping can be defined using the dot notation as ```a.b.c```, or using any constant string value as `'$abc'`.

**Supported Sink Mapping Types**

The following is a list of sink mapping types supported by Stream:

|Sink mapping type | Description|
| ------------- |-------------|
| PassThrough | Omits data conversion on Stream events.|
| JSON | Converts JSON messages to Stream events.|
| XML | Converts XML messages to Stream events.|
| TEXT | Converts plain text messages to Stream events.|
| Key Value | Converts key-value HashMaps to Stream events.|
| CSV | Converts CSV like delimiter separated events to Stream events.|

:::tip
When the `map.type` annotation is not provided `map.type='passThrough'` is used as default, that passes the outgoing Stream events directly to the sinks without any data conversion.
:::
**Example 1**

Publishes `OutputStream` events by converting them to `JSON` messages with the default format, and by sending to an `HTTP` endpoint `http://localhost:8005/endpoint1`, using `POST` method, `Accept` header, and basic authentication having `admin` is both username and password.

The configuration of the `HTTP` sink and `JSON` sink mapper to achieve the above is as follows.

```

CREATE SINK OutputStream WITH (sink.type='http', publisher.url='http://localhost:8005/endpoint', method='POST', headers='Accept-Date:20/02/2017', basic.auth.enabled='true', basic.auth.username='admin', basic.auth.password='admin', map.type='json') (name string, age int, country string);
```

This will publish a `JSON` message on the following format:

```json
{
  "event":{
    "name":"Paul",
    "age":20,
    "country":"UK"
  }
}
```

**Example 2**

Publishes `StockStream` events by converting them to user defined `JSON` messages, and by sending to an `HTTP` endpoint `http://localhost:8005/stocks`.

The configuration of the `HTTP` sink and custom `JSON` sink mapping to achieve the above is as follows.

```
CREATE SINK StockStream WITH (sink.type='http', publisher.url='http://localhost:8005/stocks', map.type='json', validate.json='true', enclosing.element='$.Portfolio', map.payload="""{"StockData":{ "Symbol":"{{symbol}}", "Price":{{price}} }}""") (symbol string, price float, volume long);
```

This will publish a single event as the `JSON` message on the following format:

```json
{
  "Portfolio":{
    "StockData":{
      "Symbol":"GOOG",
      "Price":55.6
    }
  }
}
```

This can also publish multiple events together as a `JSON` message on the following format:

```json
{
  "Portfolio":[
    {
      "StockData":{
        "Symbol":"GOOG",
        "Price":55.6
      }
    },
    {
      "StockData":{
        "Symbol":"FB",
        "Price":57.0
      }
    }
  ]  
}
```

**Example 3**

Publishes events from the `OutputStream` stream to multiple the `HTTP` endpoints using a partitioning strategy. Here the events are sent to either `http://localhost:8005/endpoint1` or `http://localhost:8006/endpoint2` based on the partitioning key `country`. It uses default `JSON` mapping, `POST` method, and used `admin` as both the username and the password when publishing to both the endpoints.

The configuration of the distributed `HTTP` sink and `JSON` sink mapper to achieve the above is as follows.

```
CREATE SINK OutputStream WITH (sink.type='http', method='POST', basic.auth.enabled='true', basic.auth.username='admin', basic.auth.password='admin', map.type='json', distribution.strategy='partitioned', partitionKey='country', destination.publisher.url='http://localhost:8005/endpoint1', destination.publisher.url='http://localhost:8006/endpoint2') (name string, age int, country string);
```

This will partition the outgoing events and publish all events with the same country attribute value to the same endpoint. The `JSON` message published will be on the following format:

```json
{
  "event":{
    "name":"Paul",
    "age":20,
    "country":"UK"
  }
}
```

### Error Handling

Errors in Stream can be handled at the Streams and in Sinks.

#### Error Handling at Stream

When errors are thrown by Stream elements subscribed to the stream, the error gets propagated up to the stream that delivered the event to those Stream elements. By default the error is logged and dropped at the stream, but this behavior can be altered by by adding `OnError` property to the corresponding stream definition.

`OnError` property can help users to capture the error and the associated event, and handle them gracefully by sending them to a fault stream.

The `OnError` property and the required `action` to be specified as below.

```
CREATE SOURCE <stream name> WITH (OnError.action='<action>') (<attribute name> <attribute type>, <attribute name> <attribute type>, ... );
```

The `action` parameter of the `OnError` property defines the action to be executed during failure scenarios.

The following actions can be specified to `OnError` property to handle erroneous scenarios.

* `STREAM`: Creates a fault stream and redirects the event and the error to it. The created fault stream will have all the attributes defined in the base stream to capture the error causing event, and in addition it also contains `_error` attribute of type `object` to containing the error information. The fault stream can be referred by adding `!` in front of the base stream name as `!<stream name>`.

**Example**

Handle errors in `TempStream` by redirecting the errors to a fault stream.

The configuration of `TempStream` stream and `OnError` property is as follows.

```
CREATE STREAM TempStream WITH(OnError.action="STREAM") (deviceID long, roomNo int, temp double;
```

Stream infers and automatically defines the fault stream of `TempStream` as given below.


```
CREATE STREAM !TempStream (deviceID long, roomNo int, temp double, _error object);
```

The StreamApp extending the above the use-case by adding failure generation and error handling with the use of [queries](#query) is as follows.

Note: Details on writing processing logics via [queries](#query) will be explained in later sections.

```
-- Define fault stream to handle error occurred at TempStream subscribers

CREATE STREAM TempStream WITH(OnError.action="STREAM") (deviceID long, roomNo int, temp double;

-- Error generation through a custom function `createError()`
@name('error-generation')
insert into IgnoreStream1
from TempStream#custom:createError();

-- Handling error by simply logging the event and error.
@name('handle-error')
insert into IgnoreStream2
select deviceID, roomNo, temp, _error
from !TempStream#log("Error Occurred!");
```

#### Error Handling at Sink

There can be cases where external systems becoming unavailable or coursing errors when the events are published to them. By default sinks log and drop the events causing event losses, and this can be handled gracefully by configuring `on.error` parameter of the `sink.type` annotation.

The `on.error` parameter of the `sink.type` annotation can be specified as below.

```
CREATE SINK <stream name> WITH (sink.type='<sink type>', on.error.action='<on error action>', <key>='<value>', ...) (<attribute name> <attribute type>, <attribute name> <attribute type>, ... );
```  

The following actions can be specified to `on.error` parameter of `sink.type` annotation to handle erroneous scenarios.

* `WAIT` : Publishing threads wait in `back-off and re-trying` mode, and only send the events when the connection is re-established. During this time the threads will not consume any new messages causing the systems to introduce back pressure on the systems that publishes to it.

* `STREAM`: Pushes the failed events with the corresponding error to the associated fault stream the sink belongs to.

**Example 1**

Introduce back pressure on the threads who bring events via `TempStream` when the system cannot connect to Kafka.

The configuration of `TempStream` stream and `sink.type` Kafka annotation with `on.error` property is as follows.

```
CREATE SINK TempStream WITH (sink.type='kafka', on.error.action='WAIT', topic='{{roomNo}}', bootstrap.servers='localhost:9092', map.type='xml') (deviceID long, roomNo int, temp double);
```

**Example 2**

Send events to the fault stream of `TempStream` when the system cannot connect to Kafka.

The configuration of `TempStream` stream with associated fault stream, `sink.type` Kafka annotation with `on.error` property and a [queries](#query) to handle the error is as follows.

Note: Details on writing processing logics via [queries](#query) will be explained in later sections.

```
CREATE SINK TempStream WITH (sink.type='kafka', on.error.action='STREAM', topic='{{roomNo}}', bootstrap.servers='localhost:9092', map.type='xml') (deviceID long, roomNo int, temp double);

-- Handling error by simply logging the event and error.
@name('handle-error')
insert into IgnoreStream;
select deviceID, roomNo, temp, _error
from !TempStream#log("Error Occurred!")
```

## Query

Query defines the processing logic in Stream. It consumes events from one or more streams, [named-windows](#named-window), [tables](#table), and/or [named-aggregations](#named-aggregation), process the events in a streaming manner, and generate output events into a [stream](#stream), [named-window](#named-window), or [table](#table).

**Purpose**

A query provides a way to process the events in the order they arrive and produce output using both stateful and stateless complex event processing and stream processing operations.

**Syntax**

The high level query syntax for defining processing logics is as follows:

```
@name('<query name>')
<output action>
<projection>
from <input>
```

The following parameters are used to configure a stream definition.

| Parameter&nbsp;&nbsp;&nbsp;&nbsp;| Description |
|----------------|-------------|
| `query name`   | The name of the query. Since naming the query (i.e the `@name('<query name>')` annotation) is optional, when the name is not provided Stream assign a system generated name for the query. |
| `input`        | Defines the means of event consumption via [streams](#stream), [named-windows](#named-window), [tables](#table), and/or [named-aggregations](#named-aggregations), and defines the processing logic using [filters](#filter), [windows](#window), [stream-functions](#stream-function), [joins](#join), [patterns](#pattern) and [sequences](#sequence). |
| `projection`   | Generates output event attributes using [select](#select), [functions](#function), [aggregation-functions](#aggregation-function), and [group by](#group-by) operations, and filters the generated the output using [having](#having), [limit & offset](#limit-offset), [order by](#order-by), and [output rate limiting](#output-rate-limiting) operations before sending them out. Here the projection is optional and when it is omitted all the input events will be sent to the output as it is. |
| `output action`| Defines output action (such as `insert into`, `update`, `delete`, etc) that needs to be performed by the generated events on a [stream](#stream), [named-window](#named-window), or [table](#table)  |

### Example

A query consumes events from the `TempStream` stream and output only the `roomNo` and `temp` attributes to the `RoomTempStream` stream, from which another query consumes the events and sends all its attributes to `AnotherRoomTempStream` stream.

```
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

insert into RoomTempStream
select roomNo, temp
from TempStream;

insert into AnotherRoomTempStream
from RoomTempStream;
```

:::tip "Inferred Stream"
Here, the `RoomTempStream` and `AnotherRoomTempStream` streams are an inferred streams, which means their stream definitions are inferred from the queries and they can be used same as any other defined stream without any restrictions.  
:::
### Value

Values are typed data, that can be manipulated, transferred and stored. Values can be referred by the attributes defined in definitions such as streams, and tables.

Stream supports values of type `STRING`, `INT` (Integer), `LONG`, `DOUBLE`, `FLOAT`, `BOOL` (Boolean) and `OBJECT`.

The syntax of each type and their example use as a constant value is as follows,

<table style={{ width:100 + "%" }}>
    <tr>
        <th style={{ width:10 + "%" }}>Attribute Type</th>
        <th style={{ width:50 + "%" }}>Format</th>
        <th style={{ width:40 + "%" }}>Example</th>
    </tr>
    <tr>
        <td>int</td>
        <td>`&ltdigit&gt+`</td>
        <td>`123`, `-75`, `+95`</td>
    </tr>
    <tr>
        <td>long</td>
        <td>`&ltdigit&gt+L`</td>
        <td>`123000L`, `-750l`, `+154L`</td>
    </tr>
    <tr>
        <td>float</td>
        <td>`(&ltdigit&gt+)?('.'&ltdigit&gt*)?(E(-|+)?&ltdigit&gt+)?F`</td>
        <td>`123.0f`, `-75.0e-10F`,`+95.789f`</td>
    </tr>
    <tr>
        <td>double</td>
        <td>`(&ltdigit&gt+)?('.'&ltdigit&gt*)?(E(-|+)?&ltdigit&gt+)?D?`</td>
        <td>`123.0`,`123.0D`,`-75.0e-10D`,`+95.789d`</td>
    </tr>
    <tr>
        <td>bool</td>
        <td>`(true|false)`</td>
        <td>`true`, `false`, `TRUE`, `FALSE`</td>
    </tr>
    <tr>
        <td>string</td>
        <td>`'(&lt;char&gt;* !('|"|"""|&ltnew line&gt))'` or  `"(&lt;char&gt;* !("|"""|&ltnew line&gt))"` or `"""(&lt;char&gt;* !("""))"""` </td>
        <td>`'Any text.'`, `"Text with 'single' quotes."`, <pre>"""
Text with 'single' quotes,
"double" quotes, and new lines.
"""</pre></td>
    </tr>
</table>

**_Time_**

Time is a special type of `LONG` value that denotes time using digits and their unit in the format `(<digit>+ <unit>)+`. At execution, the `time` gets converted into **milliseconds** and returns a `LONG` value.

<table style={{ width:100 + "%" }}>
    <tr>
        <th>
            Unit  
        </th>
        <th>
            Syntax
        </th>
    </tr>
    <tr>
        <td>
            Year
        </td>
        <td>
            `year` | `years`
        </td>
    </tr>
    <tr>
        <td>
            Month
        </td>
        <td>
            `month` | `months`
        </td>
    </tr>
    <tr>
        <td>
            Week
        </td>
        <td>
            `week` | `weeks`
        </td>
    </tr>
    <tr>
        <td>
            Day
        </td>
        <td>
            `day` | `days`
        </td>
    </tr>
    <tr>
        <td>
            Hour
        </td>
        <td>
           `hour` | `hours`
        </td>
    </tr>
    <tr>
        <td>
           Minutes
        </td>
        <td>
           `minute` | `minutes` | `min`
        </td>
    </tr>
    <tr>
        <td>
           Seconds
        </td>
        <td>
           `second` | `seconds` | `sec`
        </td>
    </tr>
    <tr>
        <td>
           Milliseconds
        </td>
        <td>
           `millisecond` | `milliseconds`
        </td>
    </tr>
</table>

**Example**

1 hour and 25 minutes can by written as `1 hour and 25 minutes` which is equal to the `LONG` value `5100000`.

### Select

The select clause in stream query defines the output event attributes of the query. Following are some basic query projection operations supported by select.


### Function

Function are pre-configured operations that can consumes zero, or more parameters and always produce a single value as result. It can be used anywhere an attribute can be used.

**Purpose**

Functions encapsulate pre-configured reusable execution logic allowing users to execute the logic anywhere just by calling the function. This also make writing StreamApps simple and easy to understand.

**Syntax**

The syntax of function is as follows,

```sql
<function name>( <parameter>* )
```

Here `<function name>` uniquely identifies the function. The `<parameter>` defined input parameters the function can accept. The input parameters can be attributes, constant values, results of other functions, results of mathematical or logical expressions, or time values. The number and type of parameters a function accepts depend on the function itself.

:::note
Functions, mathematical expressions, and logical expressions can be used in a nested manner.
:::

**Example 1**

Function name `add` accepting two input parameters, is called with an attribute named `input` and a constant value `75`.  

```
add(input, 75)
```

**Example 2**

Function name `alertAfter` accepting two input parameters, is called with a time value of `1 hour and 25 minutes` and a mathematical addition operation of `startTime` + `56`.

```
add(1 hour and 25 minutes, startTime + 56)
```

**Inbuilt functions**

Following are some inbuilt Stream functions, for more functions refer [Functions](functions.md) .

|Inbuilt function | Description|
| ------------- |-------------|
| <a target="_blank" href="../api/latest/#eventtimestamp-function">eventTimestamp</a> | Returns event's timestamp. |
| <a target="_blank" href="../api/latest/#currenttimemillis-function">currentTimeMillis</a> | Returns current time of StreamApp runtime. |
| <a target="_blank" href="../api/latest/#default-function">default</a> | Returns a default value if the parameter is null. |
| <a target="_blank" href="../api/latest/#ifthenelse-function">ifThenElse</a> | Returns parameters based on a conditional parameter. |
| <a target="_blank" href="../api/latest/#uuid-function">UUID</a> | Generates a UUID. |
| <a target="_blank" href="../api/latest/#cast-function">cast</a> | Casts parameter type. |
| <a target="_blank" href="../api/latest/#convert-function">convert</a> | Converts parameter type. |
| <a target="_blank" href="../api/latest/#coalesce-function">coalesce</a> | Returns first not null input parameter. |
| <a target="_blank" href="../api/latest/#maximum-function">maximum</a> | Returns the maximum value of all parameters. |
| <a target="_blank" href="../api/latest/#minimum-function">minimum</a> | Returns the minimum value of all parameters. |
| <a target="_blank" href="../api/latest/#instanceofboolean-function">instanceOfBoolean</a> | Checks if the parameter is an instance of Boolean. |
| <a target="_blank" href="../api/latest/#instanceofdouble-function">instanceOfDouble</a> | Checks if the parameter is an instance of Double. |
| <a target="_blank" href="../api/latest/#instanceoffloat-function">instanceOfFloat</a> | Checks if the parameter is an instance of Float. |
| <a target="_blank" href="../api/latest/#instanceofinteger-function">instanceOfInteger</a> | Checks if the parameter is an instance of Integer. |
| <a target="_blank" href="../api/latest/#instanceoflong-function">instanceOfLong</a> | Checks if the parameter is an instance of Long. |
| <a target="_blank" href="../api/latest/#instanceofstring-function">instanceOfString</a> | Checks if the parameter is an instance of String. |
| <a target="_blank" href="../api/latest/#createset-function">createSet</a> | Creates  HashSet with given input parameters. |
| <a target="_blank" href="../api/latest/#minimum-function">sizeOfSet</a> | Returns number of items in the HashSet, that's passed as a parameter. |

**Example**

Query that converts the `roomNo` to `string` using `convert` function, finds the maximum temperature reading with `maximum` function, and adds a unique `messageID` using the `UUID` function.

```
insert into RoomTempStream
select convert(roomNo, 'string') as roomNo,
       maximum(tempReading1, tempReading2) as temp,
       UUID() as messageID
from TempStream;
```

### Filter

Filters provide a way of filtering input stream events based on a specified condition. It accepts any type of condition including a combination of functions and/or attributes  that produces a Boolean result. Filters allow events to passthrough if the condition results in `true`, and drops if it results in a `false`.  

**Purpose**

Filter helps to select the events that are relevant for the processing and omit the ones that are not.

**Syntax**

Filter conditions should be defined in square brackets (`[]`) next to the input stream as shown below.

```
insert into <output stream>
select <attribute name>, <attribute name>, ...
from <input stream>[<filter condition>] ;
```

**Example**

Query to filter `TempStream` stream events, having `roomNo` within the range of 100-210 and temperature greater than 40 degrees,
and insert them into `HighTempStream` stream.

```
insert into HighTempStream
select roomNo, temp
from TempStream[(roomNo >= 100 and roomNo < 210) and temp > 40];
```

### Window

Window provides a way to capture a subset of events from an input stream and retain them for a period of time based on a specified criterion. The criterion defines when and how the events should be evicted from the windows. Such as events getting evicted from the window based on the time duration, or number of events and they events are evicted in a sliding (one by one) or tumbling (batch) manner.

Within a query, each input stream can at most have only one window associated with it.

**Purpose**

Windows help to retain events based on a criterion, such that the values of those events can be aggregated, or checked if an event of interest is within the window or not.

**Syntax**

Window should be defined by using the `#window` prefix next to the input stream as shown below.

```
insert <ouput event type>? into <output stream>
select <attribute name>, <attribute name>, ...
from <input stream>#window.<window name>(<parameter>, <parameter>, ... );
```

:::note
Filter conditions can be applied both before and/or after the window.
:::

**Inbuilt windows**

Following are some inbuilt Stream windows, for more windows refer [execution extensions](../extensions/).

|Inbuilt function | Description|
| ------------- |-------------|
| <a target="_blank" href="../api/latest/#time-window">time</a> | Retains events based on time in a sliding manner.|
| <a target="_blank" href="../api/latest/#timebatch-window">timeBatch</a> | Retains events based on time in a tumbling/batch manner. |
| <a target="_blank" href="../api/latest/#length-window">length</a> | Retains events based on number of events in a sliding manner. |
| <a target="_blank" href="../api/latest/#lengthbatch-window">lengthBatch</a> | Retains events based on number of events in a tumbling/batch manner. |
| <a target="_blank" href="../api/latest/#timelength-window">timeLength</a> | Retains events based on time and number of events in a sliding manner. |
| <a target="_blank" href="../api/latest/#session-window">session</a> | Retains events for each session based on session key. |
| <a target="_blank" href="../api/latest/#batch-window">batch</a> | Retains events of last arrived event chunk. |
| <a target="_blank" href="../api/latest/#sort-window">sort</a> | Retains top-k or bottom-k events based on a parameter value. |
| <a target="_blank" href="../api/latest/#cron-window">cron</a> | Retains events based on cron time in a tumbling/batch manner. |
| <a target="_blank" href="../api/latest/#externaltime-window">externalTime</a> | Retains events based on event time value passed as a parameter in a sliding manner.|
| <a target="_blank" href="../api/latest/#externaltimebatch-window">externalTimeBatch</a> | Retains events based on event time value passed as a parameter in a a tumbling/batch manner.|
| <a target="_blank" href="../api/latest/#delay-window">delay</a> | Retains events and delays the output by the given time period in a sliding manner.|


**Example 1**

Query to find out the maximum temperature out of the **last 10 events**, using the window of `length` 10 and `max()` aggregation function, from the `TempStream` stream and insert the results into the `MaxTempStream` stream.

```
select max(temp) as maxTemp
from TempStream#window.length(10)
insert into MaxTempStream;
```

Here, the `length` window operates in a sliding manner where the following 3 event subsets are calculated and outputted when a list of 12 events are received in sequential order.

|Subset|Event Range|
|------|-----------|
| 1 | 1 - 10 |
| 2 | 2 - 11 |
| 3 | 3 - 12 |

**Example 2**

Query to find out the maximum temperature out of the **every 10 events**, using the window of `lengthBatch` 10 and `max()` aggregation function, from the `TempStream` stream and insert the results into the `MaxTempStream` stream.

```
insert into MaxTempStream
select max(temp) as maxTemp
from TempStream#window.lengthBatch(10);
```

Here, the window operates in a batch/tumbling manner where the following 3 event subsets are calculated and outputted when a list of 30 events are received in a sequential order.

|Subset|Event Range|
|------|-----------|
| 1    | 1 - 10      |
| 2    | 11 - 20     |
| 3    | 21 - 30     |

**Example 3**

Query to find out the maximum temperature out of the events arrived **during last 10 minutes**, using the window of `time` 10 minutes and `max()` aggregation function, from the `TempStream` stream and insert the results into the `MaxTempStream` stream.

```
insert into MaxTempStream
select max(temp) as maxTemp
from TempStream#window.time(10 min);
```

Here, the `time` window operates in a sliding manner with millisecond accuracy, where it will process events in the following 3 time durations and output aggregated events when a list of events are received in a sequential order.

|Subset|Time Range (in ms)|
|------|-----------|
| 1 | 1:00:00.001 - 1:10:00.000 |
| 2 | 1:00:01.001 - 1:10:01.000 |
| 3 | 1:00:01.033 - 1:10:01.034 |

**Example 4**

Query to find out the maximum temperature out of the events arriving **every 10 minutes**, using the window of `timeBatch` 10 and `max()` aggregation function, from the `TempStream` stream and insert the results into the `MaxTempStream` stream.

```
insert into MaxTempStream
select max(temp) as maxTemp
from TempStream#window.timeBatch(10 min);
```

Here, the window operates in a batch/tumbling manner where the window will process evetns in the following 3 time durations and output aggregated events when a list of events are received in a sequential order.

|Subset|Time Range (in ms)|
|------|-----------|
| 1 | 1:00:00.001 - 1:10:00.000 |
| 2 | 1:10:00.001 - 1:20:00.000 |
| 3 | 1:20:00.001 - 1:30:00.000 |

### Event Type

Query output depends on the `current` and `expired` event types it produces based on its internal processing state. By default all queries produce `current` events upon event arrival to the query. The queries containing windows additionally produce `expired` events when events expire from the windows.

**Purpose**

Event type helps to specify when a query should output events to the stream, such as output upon current events, expired events or upon both current and expired events.

**Syntax**

Event type should be defined in between `insert` and `into` keywords for insert queries as follows.

```
insert <event type> into <output stream>
select <attribute name>, <attribute name>, ...
from <input stream>#window.<window name>(<parameter>, <parameter>, ... )
```

Event type should be defined next to the `for` keyword for delete queries as follows.

```
select <attribute name>, <attribute name>, ...
from <input stream>#window.<window name>(<parameter>, <parameter>, ... )
delete <table> (for <event type>)?
    on <condition>
```

Event type should be defined next to the `for` keyword for update queries as follows.

```
select <attribute name>, <attribute name>, ...
from <input stream>#window.<window name>(<parameter>, <parameter>, ... )
update <table> (for <event type>)?
    set <table>.<attribute name> = (<attribute name>|<expression>)?, <table>.<attribute name> = (<attribute name>|<expression>)?, ...
    on <condition>
```

Event type should be defined next to the `for` keyword for update or insert queries as follows.

```
select <attribute name>, <attribute name>, ...
from <input stream>#window.<window name>(<parameter>, <parameter>, ... )
update or insert into <table> (for <event type>)?
    set <table>.<attribute name> = <expression>, <table>.<attribute name> = <expression>, ...
    on <condition>
```

:::note
Controlling query output based on the event types neither alters query execution nor its accuracy.  
:::

The event types can be defined using the following keywords to manipulate query output.

| Event types | Description |
|-------------------|-------------|
| `current events` | Outputs events only when incoming events arrive to be processed by the query.  This is default behavior when no specific event type is specified.|
| `expired events` | Outputs events only when events expires from the window. |
| `all events` | Outputs events when incoming events arrive to be processed by the query as well as  when events expire from the window. |

**Example**

Query to output only the expired events from a 1 minute time window to the `DelayedTempStream` stream. This can be used for delaying the events by a minute.

```
insert expired events into DelayedTempStream
select *
from TempStream#window.time(1 min)
```

:::note
This is just to illustrate how expired events work, it is recommended to use [delay](../api/latest/#delay-window) window for usecases where we need to delay events by a given time period.
:::

### Aggregate Function

Aggregate functions are pre-configured aggregation operations that can consumes zero, or more parameters from multiple events and always produce a single value as result. They can be only used in the query projection (as part of the `select` clause). When a query comprises a window, the aggregation will be contained to the events in the window, and when it does not have a window, the aggregation is performed from the first event the query has received.

**Purpose**

Aggregate functions encapsulate pre-configured reusable aggregate logic allowing users to aggregate values of multiple events together. When used with batch/tumbling windows this can also help to reduce the number of output events produced.  

**Syntax**

Aggregate function can be used in query projection (as part of the `select` clause) alone or as a part of another expression. In all cases, the output produced by the query should be properly mapped to the output stream attribute using the `as` keyword.

The syntax of aggregate function is as follows,

```
insert into <output stream>
select <aggregate function>(<parameter>, <parameter>, ... ) as <attribute name>, <attribute2 name>, ...
from <input stream>#window.<window name>(<parameter>, <parameter>, ... );
```

Here `<aggregate function>` uniquely identifies the aggregate function. The `<parameter>` defined input parameters the aggregate function can accept. The input parameters can be attributes, constant values, results of other functions or aggregate functions, results of mathematical or logical expressions, or time values. The number and type of parameters an aggregate function accepts depend on the function itself.

**Inbuilt aggregate functions**

Following are some inbuilt aggregation functions.

|Inbuilt aggregate function | Description|
| ------------- |-------------|
| <a target="_blank" href="../api/latest/#sum-aggregate-function">sum</a> | Calculates the sum from a set of values. |
| <a target="_blank" href="../api/latest/#count-aggregate-function">count</a> | Calculates the count from a set of values. |
| <a target="_blank" href="../api/latest/#distinctcount-aggregate-function">distinctCount</a> | Calculates the distinct count based on a parameter from a set of values. |
| <a target="_blank" href="../api/latest/#avg-aggregate-function">avg</a> | Calculates the average from a set of values.|
| <a target="_blank" href="../api/latest/#max-aggregate-function">max</a> | Finds the maximum value from a set of values. |
| <a target="_blank" href="../api/latest/#min-aggregate-function">max</a> | Finds the minimum value from a set of values. |

| <a target="_blank" href="../api/latest/#maxforever-aggregate-function">maxForever</a> | Finds the maximum value from all events throughout its lifetime irrespective of the windows. |
| <a target="_blank" href="../api/latest/#minforever-aggregate-function">minForever</a> | Finds the minimum value from all events throughout its lifetime irrespective of the windows. |
| <a target="_blank" href="../api/latest/#stddev-aggregate-function">stdDev</a> | Calculates the standard deviation from a set of values. |
| <a target="_blank" href="../api/latest/#and-aggregate-function">and</a> | Calculates boolean and from a set of values. |
| <a target="_blank" href="../api/latest/#or-aggregate-function">or</a> | Calculates boolean or from a set of values. |
| <a target="_blank" href="../api/latest/#unionset-aggregate-function">unionSet</a> | Calculates union as a Set from a set of values. |

**Example**

Query to calculate average, maximum, and minimum values on `temp` attribute of the `TempStream` stream in a sliding manner, from the events arrived over the last 10 minutes and to produce outputs `avgTemp`, `maxTemp` and `minTemp` respectively to the `AvgTempStream` output stream.

```
insert into AvgTempStream
select avg(temp) as avgTemp, max(temp) as maxTemp, min(temp) as minTemp
from TempStream#window.time(10 min);
```

### Group By

Group By provides a way of grouping events based on one or more specified attributes to perform aggregate operations.

**Purpose**

Group By allows users to aggregate values of multiple events based on the given group-by fields.

**Syntax**

The syntax for the Group By with aggregate function is as follows.

```
insert into <output stream>
select <aggregate function>( <parameter>, <parameter>, ...) as <attribute1 name>, <attribute2 name>, ...
from <input stream>#window.<window name>(...)
group by <attribute1 name>, <attribute2 name>, ...;
```

Here the group by attributes should be defined next to the `group by` keyword separating each attribute by a comma.

**Example**

Query to calculate the average `temp` per `roomNo` and `deviceID` combination, from the events arrived from `TempStream` stream, during the last 10 minutes time-window in a sliding manner.

```
insert into AvgTempStream
select roomNo, deviceID, avg(temp) as avgTemp
from TempStream#window.time(10 min)
group by roomNo, deviceID;
```

### Having

Having provide a way of filtering events based on a specified condition of the query output stream attributes. It accepts any type of condition including a combination of functions and/or attributes that produces a Boolean result. Having, allow events to passthrough if the condition results in `true`, and drops if it results in a `false`.  

**Purpose**

Having helps to select the events that are relevant for the output based on the attributes those are produced by the `select` clause and omit the ones that are not.

**Syntax**

The syntax for the Having clause is as follows.

```
insert into <output stream>
select <aggregate function>( <parameter>, <parameter>, ...) as <attribute1 name>, <attribute2 name>, ...
from <input stream>#window.<window name>( ... )
group by <attribute1 name>, <attribute2 name> ...
having <condition>;
```

Here the having `<condition>` should be defined next to the `having` keyword and having can be used with or without `group by` clause.

**Example**

Query to calculate the average `temp` per `roomNo` for the last 10 minutes, and alerts if the `avgTemp` exceeds 30 degrees.

```
insert into AlertStream
select roomNo, avg(temp) as avgTemp
from TempStream#window.time(10 min)
group by roomNo
having avgTemp > 30;
```

### Order By

Order By, orders the query results in ascending and or descending order based on one or more specified attributes. When an attribute is used for order by, by default Stream orders the events in ascending order of that attribute's value, and by adding `desc` keyword, the events can be ordered in descending order. When more than one attribute is defined the attributes defined towards the left will have more precedence in ordering than the ones defined in right.  

**Purpose**

Order By helps to sort the events in the outputs chunks produced by the query. Order By will be more helpful for batch windows, and queries where they output many of event together then for sliding window use cases where the output will be one or few events at a time.

**Syntax**

The syntax for the Order By clause is as follows:

```
insert into <output stream>
select <aggregate function>( <parameter>, <parameter>, ...) as <attribute1 name>, <attribute2 name>, ...
from <input stream>#window.<window name>( ... )
group by <attribute1 name>, <attribute2 name> ...
having <condition>
order by <attribute1 name> (asc|desc)?, <attribute2 name> (asc|desc)?, ...;
```

Here the order by attributes should be defined next to the `order by` keyword separating each by a comma, and optionally specifying the event ordering using `asc` (default) or `desc` keywords.

**Example**

Query to calculate the average `temp` per `roomNo` and `deviceID` combination on every 10 minutes batches, and order the generated output events in ascending order by `avgTemp` and then by descending order of `roomNo` (if the more than one event have the same `avgTemp` value).

```
insert into AvgTempStream
select roomNo, deviceID, avg(temp) as avgTemp
from TempStream#window.timeBatch(10 min)
group by roomNo, deviceID
order by avgTemp, roomNo desc;
```

### Limit & Offset

These provide a way to select the number of events (via limit) from the desired index (by specifying an offset) from the output event chunks produced by the query.

**Purpose**

Limit & Offset helps to output only the selected set of events from large event batches. This will be more useful with `Order By` clause where one can order the output for topK, bottomK, or even to paginate through the dataset by obtaining a set of events from the middle.   

**Syntax**

The syntax for the Limit & Offset clauses is as follows:

```
insert into <output stream>
select <aggregate function>( <parameter>, <parameter>, ...) as <attribute1 name>, <attribute2 name>, ...
from <input stream>#window.<window name>( ... )
group by <attribute1 name>, <attribute2 name> ...
having <condition>
order by <attribute1 name> (asc | desc)?, <attribute2 name> (<ascend/descend>)?, ...
limit <positive integer>?
offset <positive integer>?;
```

Here both `limit` and `offset` are optional, when `limit` is omitted the query will output all the events, and when `offset` is omitted `0` is taken as the default offset value.

**Example 1**

Query to calculate the average `temp` per `roomNo` and `deviceID` combination for every 10 minutes batches, from the events arriving at the `TempStream` stream, and emit only two events having the highest `avgTemp` value.

```
insert into HighestAvgTempStream
select roomNo, deviceID, avg(temp) as avgTemp
from TempStream#window.timeBatch(10 min)
group by roomNo, deviceID
order by avgTemp desc
limit 2;
```

**Example 2**
Query to calculate the average `temp` per `roomNo` and `deviceID` combination for every 10 minutes batches, for events that arriving at the `TempStream` stream, and emits only the third, forth and fifth events when sorted in descending order based on their `avgTemp` value.

```
insert into HighestAvgTempStream
select roomNo, deviceID, avg(temp) as avgTemp
from TempStream#window.timeBatch(10 min)
group by roomNo, deviceID
order by avgTemp desc
limit 3
offset 2;
```

### Join (Stream)

Joins allow you to get a combined result from two streams in real-time based on a specified condition.

**Purpose**

Streams are stateless. Therefore, in order to join two streams, they need to be connected to a window so that there is a pool of events that can be used for joining. Joins also accept conditions to join the appropriate events from each stream.

During the joining process each incoming event of each stream is matched against all the events in the other
stream's window based on the given condition, and the output events are generated for all the matching event pairs.

:::note
Join can also be performed with [stored data](#join-table), [aggregation](#join-aggregation) or externally [named windows](#join-window).
:::

**Syntax**

The syntax for a join is as follows:

```
insert into <output stream>
select <attribute name>, <attribute name>, ...
from <input stream>#window.<window name>(<parameter>, ... ) {unidirectional} {as <reference>}
         join <input stream>#window.<window name>(<parameter>,  ... ) {unidirectional} {as <reference>}
    on <join condition>
```

Here, the `<join condition>` allows you to match the attributes from both the streams.

**Unidirectional join operation**

By default, events arriving at either stream can trigger the joining process. However, if you want to control the
join execution, you can add the `unidirectional` keyword next to a stream in the join definition as depicted in the
syntax in order to enable that stream to trigger the join operation. Here, events arriving at other stream only update the
 window of that stream, and this stream does not trigger the join operation.

:::note
The `unidirectional` keyword cannot be applied to both the input streams because the default behaviour already allows both streams to trigger the join operation.
:::

**Example**

Assuming that the temperature of regulators are updated every minute.
Following is a Stream App that controls the temperature regulators if they are not already `on` for all the rooms with a room temperature greater than 30 degrees.  

```
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);
CREATE STREAM RegulatorStream (deviceID long, roomNo int, isOn bool);

insert into RegulatorActionStream
select T.roomNo, R.deviceID, 'start' as action
from TempStream[temp > 30.0]#window.time(1 min) as T
  join RegulatorStream[isOn == false]#window.length(1) as R
  on T.roomNo == R.roomNo;
```

**Supported join types**

Following are the supported operations of a join clause.

 *  **Inner join (join)**

    This is the default behaviour of a join operation. `join` is used as the keyword to join both the streams. The output is generated only if there is a matching event in both the streams.

 *  **Left outer join**

    The `left outer join` operation allows you to join two streams to be merged based on a condition. `left outer join` is used as the keyword to join both the streams.

    Here, it returns all the events of left stream even if there are no matching events in the right stream by
    having null values for the attributes of the right stream.

     **Example**

    The following query generates output events for all events from the `StockStream` stream regardless of whether a matching
    symbol exists in the `TwitterStream` stream or not.

    <pre>
    select S.symbol as symbol, T.tweet, S.price
    from StockStream#window.time(1 min) as S
      left outer join TwitterStream#window.length(1) as T
      on S.symbol== T.symbol
    insert into outputStream ;    </pre>

 *  **Right outer join**

    This is similar to a left outer join. `Right outer join` is used as the keyword to join both the streams.
    It returns all the events of the right stream even if there are no matching events in the left stream.

 *  **Full outer join**

    The full outer join combines the results of left outer join and right outer join. `full outer join` is used as the keyword to join both the streams.
    Here, output event are generated for each incoming event even if there are no matching events in the other stream.

    **Example**

    The following query generates output events for all the incoming events of each stream regardless of whether there is a
    match for the `symbol` attribute in the other stream or not.

    <pre>
    insert into outputStream 
    select S.symbol as symbol, T.tweet, S.price
    from StockStream#window.time(1 min) as S
      full outer join TwitterStream#window.length(1) as T
      on S.symbol== T.symbol;    </pre>


### Patterns

This is a state machine implementation that allows you to detect patterns in the events that arrive over time. This can correlate events within a single stream or between multiple streams.

**Purpose**

Patterns allow you to identify trends in events over a time period.

**Syntax**

The following is the syntax for a pattern query:

```
select <event reference>.<attribute name>, <event reference>.<attribute name>, ...
from (every)? <event reference>=<input stream>[<filter condition>] ->
    (every)? <event reference>=<input stream [<filter condition>] ->
    ...
    (within <time gap>)?     
insert into <output stream>
```

| Items| Description |
|-------------------|-------------|
| `->` | This is used to indicate an event that should be following another event. The subsequent event does not necessarily have to occur immediately after the preceding event. The condition to be met by the preceding event should be added before the sign, and the condition to be met by the subsequent event should be added after the sign. |
| `<event reference>` | This allows you to add a reference to the the matching event so that it can be accessed later for further processing. |
| `(within <time gap>)?` | The `within` clause is optional. It defines the time duration within which all the matching events should occur. |
| `every` | `every` is an optional keyword. This defines whether the event matching should be triggered for every event arrival in the specified stream with the matching condition.  When this keyword is not used, the matching is carried out only once. |

Stream also supports pattern matching with counting events and matching events in a logical order such as (`and`, `or`, and `not`). These are described in detail further below in this guide.

**Example**

This query sends an alert if the temperature of a room increases by 5 degrees within 10 min.

```
insert into AlertStream
select e1.roomNo, e1.temp as initialTemp, e2.temp as finalTemp
from every( e1=TempStream ) -> e2=TempStream[ e1.roomNo == roomNo and (e1.temp + 5) <= temp ]
    within 10 min;
```

Here, the matching process begins for each event in the `TempStream` stream (because `every` is used with `e1=TempStream`),
and if  another event arrives within 10 minutes with a value for the `temp` attribute that is greater than or equal to `e1.temp + 5`
of the event e1, an output is generated via the `AlertStream`.

#### Counting Pattern

Counting patterns allow you to match multiple events that may have been received for the same matching condition.
The number of events matched per condition can be limited via condition postfixes.

**Syntax**

Each matching condition can contain a collection of events with the minimum and maximum number of events to be matched as shown in the syntax below.

```
insert into <output stream>
select <event reference>([event index])?.<attribute name>, ...
from (every)? <event reference>=<input stream>[<filter condition>] (<<min count>:<max count>>)? ->  
    ...
    (within <time gap>)?     
```

|Postfix|Description|Example
---------|---------|---------
|`<n1:n2>`|This matches `n1` to `n2` events (including `n1` and not more than `n2`).|`1:4` matches 1 to 4 events.
|`<n:>`|This matches `n` or more events (including `n`).|`<2:>` matches 2 or more events.
|`<:n>`|This matches up to `n` events (excluding `n`).|`<:5>` matches up to 5 events.
|`<n>`|This matches exactly `n` events.|`<5>` matches exactly 5 events.

Specific occurrences of the event in a collection can be retrieved by using an event index with its reference.
Square brackets can be used to indicate the event index where `1` can be used as the index of the first event and `last` can be used as the index
 for the `last` available event in the event collection. If you provide an index greater then the last event index,
 the system returns `null`. The following are some valid examples.

+ `e1[3]` refers to the 3rd event.
+ `e1[last]` refers to the last event.
+ `e1[last - 1]` refers to the event before the last event.

**Example**

The following Stream App calculates the temperature difference between two regulator events.

```
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);
CREATE STREAM RegulatorStream (deviceID long, roomNo int, tempSet double, isOn bool);

insert into TempDiffStream
select e1.roomNo, e2[0].temp - e2[last].temp as tempDiff
from every( e1=RegulatorStream) -> e2=TempStream[e1.roomNo==roomNo]<1:> -> e3=RegulatorStream[e1.roomNo==roomNo];
```

#### Logical Patterns

Logical patterns match events that arrive in temporal order and correlate them with logical relationships such as `and`,
`or` and `not`.

**Syntax**

```
insert into <output stream>
select <event reference>([event index])?.<attribute name>, ...
from (every)? (not)? <event reference>=<input stream>[<filter condition>]
          ((and|or) <event reference>=<input stream>[<filter condition>])? (within <time gap>)? ->  
    ...
```

Keywords such as `and`, `or`, or `not` can be used to illustrate the logical relationship.

Key Word|Description
---------|---------
`and`|This allows both conditions of `and` to be matched by two events in any order.
`or`|The state succeeds if either condition of `or` is satisfied. Here the event reference of the other condition is `null`.
`not <condition1> and <condition2>`| When `not` is included with `and`, it identifies the events that match `<condition2>` arriving before any event that match `<condition1>`.
`not <condition> for <time period>`| When `not` is included with `for`, it allows you to identify a situation where no event that matches `<condition1>` arrives during the specified `<time period>`.  e.g.,`from not TemperatureStream[temp > 60] for 5 sec`.

Here the `not` pattern can be followed by either an `and` clause or the effective period of `not` can be concluded after a given `<time period>`. Further in Stream more than two streams cannot be matched with logical conditions using `and`, `or`, or `not` clauses at this point.

#### Detecting Non-occurring Events

Stream allows you to detect non-occurring events via multiple combinations of the key words specified above as shown in the table below.

In the patterns listed, P* can be either a regular event pattern, an absent event pattern or a logical pattern.

Pattern|Detected Scenario
---------|---------
`not A for <time period>`|The non-occurrence of event A within `<time period>` after system start up. e.g., Generating an alert if a taxi has not reached its destination within 30 minutes, to indicate that the passenger might be in danger.
`not A for <time period> and B`|After system start up, event A does not occur within `time period`, but event B occurs at some point in time.  e.g., Generating an alert if a taxi has not reached its destination within 30 minutes, and the passenger marked that he/she is in danger at some point in time.
`not A for <time period 1> and not B for <time period 2>`|After system start up, event A doess not occur within `time period 1`, and event B also does not occur within `<time period 2>`.  e.g., Generating an alert if the driver of a taxi has not reached the destination within 30 minutes, and the passenger has not marked himself/herself to be in danger within that same time period.
`not A for <time period> or B`|After system start up, either event A does not occur within `<time period>`, or event B occurs at some point in time.  e.g., Generating an alert if the taxi has not reached its destination within 30 minutes, or if the passenger has marked that he/she is in danger at some point in time.
`not A for <time period 1> or not B for <time period 2>`|After system start up, either event A does not occur within `<time period 1>`, or event B occurs within `<time period 2>`.  e.g., Generating an alert to indicate that the driver is not on an expected route if the taxi has not reached destination A within 20 minutes, or reached destination B within 30 minutes.
`A → not B for <time period>`|Event B does not occur within `<time period>` after the occurrence of event A. e.g., Generating an alert if the taxi has reached its destination, but this was not followed by a payment record.
`P* → not A for <time period> and B`|After the occurrence of P*, event A does not occur within `<time period>`, and event B occurs at some point in time. 
`P* → not A for <time period 1> and not B for <time period 2>`|After the occurrence of P*, event A does not occur within `<time period 1>`, and event B does not occur within `<time period 2>`.
`P* → not A for <time period> or B`|After the occurrence of P*, either event A does not occur within `<time period>`, or event B occurs at some point in time.
`P* → not A for <time period 1> or not B for <time period 2>`|After the occurrence of P*, either event A does not occur within `<time period 1>`, or event B does not occur within `<time period 2>`.
`not A for <time period> → B`|Event A does occur within `<time period>` after the system start up, but event B occurs after that `<time period>` has elapsed.
`not A for <time period> and B → P*`|Event A does not occur within `<time period>`, and event B occurs at some point in time. Then P* occurs after the `<time period>` has elapsed, and after B has occurred.
`not A for <time period 1> and not B for <time period 2> → P*`|After system start up, event A does not occur within `<time period 1>`, and event B does not occur within `<time period 2>`. However, P* occurs after both A and B.
`not A for <time period> or B → P*`|After system start up, event A does not occur within `<time period>` or event B occurs at some point in time. The P* occurs after `<time period>` has elapsed, or after B has occurred.
`not A for <time period 1> or not B for <time period 2> → P*`|After system start up, either event A does not occur within `<time period 1>`, or event B does not occur within `<time period 2>`. Then P*  occurs after both `<time period 1>` and `<time period 2>` have elapsed.
`not A and B`|Event A does not occur before event B.
`A and not B`|Event B does not occur before event A.


**Example**

Following Stream App, sends the `stop` control action to the regulator when the key is removed from the hotel room.

```
CREATE STREAM RegulatorStateChangeStream (deviceID long, roomNo int, tempSet double, action string);
CREATE STREAM RoomKeyStream (deviceID long, roomNo int, action string);

insert into RegulatorActionStream
select e1.roomNo, ifThenElse( e2 is null, 'none', 'stop' ) as action
from every( e1=RegulatorStateChangeStream[ action == 'on' ] ) ->
      e2=RoomKeyStream[ e1.roomNo == roomNo and action == 'removed' ] or e3=RegulatorStateChangeStream[ e1.roomNo == roomNo and action == 'off']
having action != 'none';
```

This Stream Application generates an alert if we have switch off the regulator before the temperature reaches 12 degrees.  

```
CREATE STREAM RegulatorStateChangeStream (deviceID long, roomNo int, tempSet double, action string);
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

insert into AlertStream
select e1.roomNo as roomNo
from e1=RegulatorStateChangeStream[action == 'start'] -> not TempStream[e1.roomNo == roomNo and temp < 12] and e2=RegulatorStateChangeStream[action == 'off'];
```

This Stream Application generates an alert if the temperature does not reduce to 12 degrees within 5 minutes of switching on the regulator.  

```
CREATE STREAM RegulatorStateChangeStream (deviceID long, roomNo int, tempSet double, action string);
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

insert into AlertStream
select e1.roomNo as roomNo
from e1=RegulatorStateChangeStream[action == 'start'] -> not TempStream[e1.roomNo == roomNo and temp < 12] for '5 min';
```

### Sequence

Sequence is a state machine implementation that allows you to detect the sequence of event occurrences over time.
Here **all matching events need to arrive consecutively** to match the sequence condition, and there cannot be any non-matching events arriving within a matching sequence of events.
This can correlate events within a single stream or between multiple streams.

**Purpose**

This allows you to detect a specified event sequence over a specified time period.

**Syntax**

The syntax for a sequence query is as follows:

```
insert into <output stream>
select <event reference>.<attribute name>, <event reference>.<attribute name>, ...
from (every)? <event reference>=<input stream>[<filter condition>],
    <event reference>=<input stream [<filter condition>],
    ...
    (within <time gap>)?     
```

| Items | Description |
|-------------------|-------------|
| `,` | This represents the immediate next event i.e., when an event that matches the first condition arrives, the event that arrives immediately after it should match the second condition. |
| `<event reference>` | This allows you to add a reference to the the matching event so that it can be accessed later for further processing. |
| `(within <time gap>)?` | The `within` clause is optional. It defines the time duration within which all the matching events should occur. |
| `every` | `every` is an optional keyword. This defines whether the matching event should be triggered for every event that arrives at the specified stream with the matching condition.  When this keyword is not used, the matching is carried out only once. |


**Example**

This query generates an alert if the increase in the temperature between two consecutive temperature events exceeds one degree.

```sql
insert into AlertStream
select e1.temp as initialTemp, e2.temp as finalTemp
from every e1=TempStream, e2=TempStream[e1.temp + 1 < temp];
```

#### Counting Sequence

Counting sequences allow you to match multiple events for the same matching condition.
The number of events matched per condition can be limited via condition postfixes such as **Counting Patterns**, or by using the
`*`, `+`, and `?` operators.

The matching events can also be retrieved using event indexes, similar to how it is done in **Counting Patterns**.

**Syntax**

Each matching condition in a sequence can contain a collection of events as shown below.

```
insert into <output stream>
select <event reference>.<attribute name>, <event reference>.<attribute name>, ...
from (every)? <event reference>=<input stream>[<filter condition>](+|*|?)?,
    <event reference>=<input stream [<filter condition>](+|*|?)?,
    ...
    (within <time gap>)?     
```

|Postfix symbol|Required/Optional |Description|
|---------|---------|---------|
| `+` | Optional |This matches **one or more** events to the given condition. |
| `*` | Optional |This matches **zero or more** events to the given condition. |
| `?` | Optional |This matches **zero or one** events to the given condition. |


**Example**

This Stream application identifies temperature peeks.

```
CREATE STREAM TempStream(deviceID long, roomNo int, temp double);

insert into PeekTempStream
select e1.temp as initialTemp, e2[last].temp as peakTemp
from every e1=TempStream, e2=TempStream[e1.temp <= temp]+, e3=TempStream[e2[last].temp > temp];
```

#### Logical Sequence

Logical sequences identify logical relationships using `and`, `or` and `not` on consecutively arriving events.

**Syntax**
The syntax for a logical sequence is as follows:

```
insert into <output stream>
select <event reference>([event index])?.<attribute name>, ...
from (every)? (not)? <event reference>=<input stream>[<filter condition>]
          ((and|or) <event reference>=<input stream>[<filter condition>])? (within <time gap>)?,
    ...
```

Keywords such as `and`, `or`, or `not` can be used to illustrate the logical relationship, similar to how it is done in **Logical Patterns**.

**Example**

This Stream application notifies the state when a regulator event is immediately followed by both temperature and humidity events.

```
CREATE STREAM TempStream(deviceID long, temp double);
CREATE STREAM HumidStream(deviceID long, humid double);
CREATE STREAM RegulatorStream(deviceID long, isOn bool);

insert into StateNotificationStream
select e2.temp, e3.humid
from every e1=RegulatorStream, e2=TempStream and e3=HumidStream;
```

### Output rate limiting

Output rate limiting allows queries to output events periodically based on a specified condition.

**Purpose**

This allows you to limit the output to avoid overloading the subsequent executions, and to remove unnecessary information.

**Syntax**

The syntax of an output rate limiting configuration is as follows:

```
insert into <output stream>
select <attribute name>, <attribute name>, ...
from <input stream> ...
output <rate limiting configuration>
```

Stream supports three types of output rate limiting configurations as explained in the following table:

Rate limiting configuration|Syntax| Description
---------|---------|--------
Based on time | `<output event> every <time interval>` | This outputs `<output event>` every `<time interval>` time interval.
Based on number of events | `<output event> every <event interval> events` | This outputs `<output event>` for every `<event interval>` number of events.
Snapshot based output | `snapshot every <time interval>`| This outputs all events in the window (or the last event if no window is defined in the query) for every given `<time interval>` time interval.

Here the `<output event>` specifies the event(s) that should be returned as the output of the query.
The possible values are as follows:
* `first` : Only the first event processed by the query during the specified time interval/sliding window is emitted.
* `last` : Only the last event processed by the query during the specified time interval/sliding window is emitted.
* `all` : All the events processed by the query during the specified time interval/sliding window are emitted. **When no `<output event>` is defined, `all` is used by default.**

**Examples**

+ Returning events based on the number of events

    Here, events are emitted every time the specified number of events arrive. You can also specify whether to emit only the first event/last event, or all the events out of the events that arrived.

    In this example, the last temperature per sensor is emitted for every 10 events.

    <pre>
    insert into LowRateTempStream
    select temp, deviceID
    from TempStreamselect
    group by deviceID
    output last every 10 events;    </pre>

+ Returning events based on time

    Here events are emitted for every predefined time interval. You can also specify whether to emit only the first event, last event, or all events out of the events that arrived during the specified time interval.

    In this example, emits all temperature events every 10 seconds  

    <pre>
    insert into LowRateTempStream
    from TempStreamoutput
    output every 10 sec;    </pre>

+ Returning a periodic snapshot of events

    This method works best with windows. When an input stream is connected to a window, snapshot rate limiting emits all the current events that have arrived and do not have corresponding expired events for every predefined time interval.
    If the input stream is not connected to a window, only the last current event for each predefined time interval is emitted.

    This query emits a snapshot of the events in a time window of 5 seconds every 1 second.

    <pre>
    insert into SnapshotTempStream
    from TempStream#window.time(5 sec)
    output snapshot every 1 sec;    </pre>


## Partition

Partitions divide streams and queries into isolated groups in order to process them in parallel and in isolation. A partition can contain one or more queries and there can be multiple instances where the same queries and streams are replicated for each partition.

Each partition is tagged with a partition key. Those partitions only process the events that match the corresponding partition key.

**Purpose**

Partitions allow you to process the events groups in isolation so that event processing can be performed using the same set of queries for each group.

**Partition key generation**

A partition key can be generated in the following two methods:

* Partition by value

    This is created by generating unique values using input stream attributes.

    **Syntax**

    <pre>
    partition with ( &lt;expression> of &lt;stream name>, 
                     &lt;expression> of &lt;stream name>, ... )
    begin
        &lt;query>
        &lt;query>
        ...
    end; </pre>

    **Example**

    This query calculates the maximum temperature recorded within the last 10 events per `deviceID`.

    <pre>
    partition with ( deviceID of TempStream )
    begin
        insert into DeviceTempStream
        select roomNo, deviceID, max(temp) as maxTemp
        from TempStream#window.length(10);
    end;
    </pre>

* Partition by range

    This is created by mapping each partition key to a range condition of the input streams numerical attribute.

    **Syntax**
    <pre>
    partition with ( &lt;condition> as &lt;partition key> or 
                     &lt;condition> as &lt;partition key> or ... of &lt;stream name>,
                     ... )
    begin
        &lt;query>
        &lt;query>
        ...
    end;
    </pre>

    **Example**

    This query calculates the average temperature for the last 10 minutes per office area.

    ```
    partition with ( roomNo >= 1030 as 'serverRoom' or
                     roomNo < 1030 and roomNo >= 330 as 'officeRoom' or
                     roomNo < 330 as 'lobby' of TempStream)
    begin
        insert into AreaTempStream
        select roomNo, deviceID, avg(temp) as avgTemp
        from TempStream#window.time(10 min)
    end;
    ```  

### Inner Stream

Queries inside a partition block can use inner streams to communicate with each other while preserving partition isolation. Inner streams are denoted by a "#" placed before the stream name, and these streams cannot be accessed outside a partition block.

**Purpose**

Inner streams allow you to connect queries within the partition block so that the output of a query can be used as an input only by another query
within the same partition. Therefore, you do not need to repartition the streams if they are communicating within the partition.

**Example**

This partition calculates the average temperature of every 10 events for each sensor, and sends an output to the `DeviceTempIncreasingStream` stream if the consecutive average temperature values increase by more than
5 degrees.

```
partition with ( deviceID of TempStream )
begin
    insert into #AvgTempStream
    select roomNo, deviceID, avg(temp) as avgTemp
    from TempStream#window.lengthBatch(10)

    insert into DeviceTempIncreasingStream
    select e1.deviceID, e1.avgTemp as initialAvgTemp, e2.avgTemp as finalAvgTemp
    from every (e1=#AvgTempStream),e2=#AvgTempStream[e1.avgTemp + 5 < avgTemp]
end;
```

### Purge Partition

Based on the partition key used for the partition, multiple instances of streams and queries will be generated. When an extremely large number of unique partition keys are used there is a possibility of very high instances of streams and queries getting generated and eventually system going out of memory. In order to overcome this, users can define a purge interval to clean partitions that will not be used anymore.

**Purpose**

`@purge` allows you to clean the partition instances that will not be used anymore.

**Syntax**

The syntax of partition purge configuration is as follows:

```sql
@purge(enable='true', interval='<purge interval>', idle.period='<idle period of partition instance>')
partition with ( <partition key> of <input stream> )
begin
    insert into <output stream>
    select <attribute name>, <attribute name>, ...
    from <input stream> ...
end;
```

When using purge with an Aggregation, use a `WITH()` property instead. For example:

```

```

Partition purge configuration| Description
---------|--------
Purge interval | The periodic time interval to purge the purgeable partition instances.
Idle period of partition instance| The period, a particular partition instance (for a given partition key) needs to be idle before it becomes purgeable.

**Examples**

Mark partition instances eligible for purging, if there are no events from a particular deviceID for 15 seconds, and periodically purge those partition instances every 1 second.

```sql
@purge(enable='true', interval='1 sec', idle.period='15 sec')
partition with ( deviceID of TempStream )
begin
    insert into #AvgTempStream
    select roomNo, deviceID, avg(temp) as avgTemp
    from TempStream#window.lengthBatch(10)

    insert into DeviceTempIncreasingStream
    select e1.deviceID, e1.avgTemp as initialAvgTemp, e2.avgTemp as finalAvgTemp
    from every (e1=#AvgTempStream),e2=#AvgTempStream[e1.avgTemp + 5 < avgTemp]
end;
```

## Table (Collection)

A table is a stored version of an stream or a table of events. Its schema is defined via the **table definition** that is similar to a stream definition. These events are stored in database.

**Purpose**

Tables allow stream processor to work with stored events. By defining a schema for tables stream processor enables them to be processed by queries using their defined attributes with the streaming data. You can also interactively query the state of the stored events in the table.

**Syntax**

The syntax for a new table definition is as follows:

```
CREATE TABLE <table name> (<attribute name> <attribute type>, <attribute name> <attribute type>, ... );
```

The following parameters are configured in a table definition:

| Parameter     | Description |
| ------------- |-------------|
| `table name`      | The name of the table defined. (`PascalCase` is used for table name as a convention.) |
| `attribute name`   | The schema of the table is defined by its attributes with uniquely identifiable attribute names (`camelCase` is used for attribute names as a convention.)|    |
| `attribute type`   | The type of each attribute defined in the schema.  This can be `STRING`, `INT`, `LONG`, `DOUBLE`, `FLOAT`, `BOOL` or `OBJECT`.     |


**Example**

The following defines a table named `RoomTypeTable` with `roomNo` and `type` attributes of data types `int` and `string` respectively.

```
CREATE TABLE RoomTypeTable ( roomNo int, type string );
```

### Primary Keys

Tables can be configured with primary keys to avoid the duplication of data.

Primary keys are configured by including the `PrimaryKey` property to the table definition. Each event table configuration can have only one `PrimaryKey` property. The number of attributes supported differ based on the table implementations. When more than one attribute is used for the primary key, the uniqueness of the events stored in the table is determined based on the combination of values for those attributes.

**Examples**

This query creates an event table with the `symbol` attribute as the primary key. Therefore each entry in this table must have a unique value for `symbol` attribute.

```
CREATE TABLE StockTable WITH (PrimaryKey='symbol', Index='key1', Index='key2') (symbol string, price float, volume long);
```

### Indexes

Indexes allow tables to be searched/modified much faster.

Indexes are configured by including the `@Index( 'key1', 'key2' )` annotation to the table definition. Each event table configuration can have 0-1 `@Index` annotations. Support for the `@Index` annotation and the number of attributes supported differ based on the table type i.e., `doc collection` or `edge collection`. When more then one attribute is used for index, each one of them is used to index the table for fast access of the data.

Indexes can be configured together with primary keys.

**Examples**

This query creates an indexed event table named `RoomTypeTable` with the `roomNo` attribute as the index key.

```
@Index('roomNo')
CREATE TABLE RoomTypeTable (roomNo int, type string);
```

### Store

Store is a table that refers to data/events stored in data stores outside of stream. Store is defined via the `@store` annotation, and the store schema is defined via a **table definition** associated with it.

**Purpose**

Store allows stream processor to search, retrieve and manipulate data stored in database through stream queries.

**Syntax**

The syntax for a defining store and it's associated table definition is as follows:

```
CREATE TABLE TableName WITH (store.type='store_type', static.option.key1='static_option_value1', static.option.keyN='static_option_valueN') (attribute1 Type1, attributeN TypeN);
```

**Example**

The following defines a database having a table `RoomTypeTable` with columns `roomNo` of `INTEGER` and `type` of `VARCHAR(255)` mapped to Stream data types `int` and `string` respectively.

```
CREATE TABLE RoomTypeTable WITH (Store.type="database", collection="RoomTypeTable") ( roomNo int, type string );
```

**Operators on Table**

The following operators can be performed on tables.

### Insert

This allows events to be inserted into tables. This is similar to inserting events into streams.

:::warning
If the table is defined with primary keys, and if you insert duplicate data, primary key constrain violations can occur.
In such cases use the `update or insert into` operation.
:::
**Syntax**

```
insert into <table>
select <attribute name>, <attribute name>, ...
from <input stream>
```

Similar to streams, you need to use the `current events`, `expired events` or the `all events` keyword between `insert` and `into` keywords in order to insert only the specific event types.

For more information, see [Event Type](#event-type)

**Example**

This query inserts all the events from the `TempStream` stream to the `TempTable` table.

```
insert into TempTable
select *
from TempStream;
```

### Join (Table)

This allows a stream to retrieve information from a table in a streaming manner.

:::note
Joins can also be performed with [two streams](#join-stream), [aggregation](#join-aggregation) or against externally [named windows](#join-window).
:::

**Syntax**

```
insert into <output stream>
select (<input stream>|<table>).<attribute name>, (<input stream>|<table>).<attribute name>, ...
from <input stream> join <table>
    on <condition>
```

:::note
A table can only be joint with a stream. Two tables cannot be joint because there must be at least one active
entity to trigger the join operation.
:::

**Example**

This Stream App performs a join to retrieve the room type from `RoomTypeTable` table based on the room number, so that it can filter the events related to `server-room`s.

```
CREATE TABLE RoomTypeTable (roomNo int, type string);
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

insert into ServerRoomTempStream
select deviceID, RoomTypeTable.type as roomType, type, temp
    having roomType == 'server-room'
from TempStream join RoomTypeTable
    on RoomTypeTable.roomNo == TempStream.roomNo;
```

**Supported join types**

Table join supports following join operations.

 *  **Inner join (join)**

    This is the default behaviour of a join operation. `join` is used as the keyword to join the stream with the table. The output is generated only if there is a matching event in both the stream and the table.

 *  **Left outer join**

    The `left outer join` operation allows you to join a stream on left side with a table on the right side based on a condition.
    Here, it returns all the events of left stream even if there are no matching events in the right table by
    having null values for the attributes of the right table.

 *  **Right outer join**

    This is similar to a `left outer join`. `right outer join` is used as the keyword to join a stream on right side with a table on the left side based on a condition.
    It returns all the events of the right stream even if there are no matching events in the left table.

### Delete

To delete selected events that are stored in a table.

**Syntax**

```
select <attribute name>, <attribute name>, ...
from <input stream>
delete <table> (for <event type>)?
    on <condition>
```

The `condition` element specifies the basis on which events are selected to be deleted. When specifying the condition, table attributes should be referred to with the table name.

To execute delete for specific event types, use the `current events`, `expired events` or the `all events` keyword with `for` as shown in the syntax. For more information, see [Event Type](#event-type)

:::note
Table attributes must be always referred to with the table name as follows:
`<table name>.<attibute name>`
:::

**Example**

In this example, the script deletes a record in the `RoomTypeTable` table if it has a value for the `roomNo` attribute that matches the value for the `roomNumber` attribute of an event in the `DeleteStream` stream.

```
CREATE TABLE RoomTypeTable (roomNo int, type string);

CREATE STREAM DeleteStream (roomNumber int);

from DeleteStream
delete RoomTypeTable
    on RoomTypeTable.roomNo == roomNumber;
```

### Update

This operator updates selected event attributes stored in a table based on a condition.

**Syntax**

```
select <attribute name>, <attribute name>, ...
from <input stream>
update <table> (for <event type>)?
    set <table>.<attribute name> = (<attribute name>|<expression>)?, <table>.<attribute name> = (<attribute name>|<expression>)?, ...
    on <condition>
```

The `condition` element specifies the basis on which events are selected to be updated. When specifying the `condition`, table attributes must be referred to with the table name.

You can use the `set` keyword to update selected attributes from the table. Here, for each assignment, the attribute specified in the left must be the table attribute, and the one specified in the right can be a stream/table attribute a mathematical operation, or other. When the `set` clause is not provided, all the attributes in the table are updated.

To execute an update for specific event types use the `current events`, `expired events` or the `all events` keyword with `for` as shown in the syntax. For more information, see [Event Type](#event-type).

:::note
Table attributes must be always referred to with the table name as shown below:
`<table name>.<attibute name>`.
:::

**Example**

This stream application updates the room occupancy in the `RoomOccupancyTable` table for each room number based on new arrivals and exits from the `UpdateStream` stream.

```
CREATE TABLE RoomOccupancyTable (roomNo int, people int);
CREATE STREAM UpdateStream (roomNumber int, arrival int, exit int);

select *
from UpdateStream
update RoomOccupancyTable
    set RoomOccupancyTable.people = RoomOccupancyTable.people + arrival - exit
    on RoomOccupancyTable.roomNo == roomNumber;
```

### Update or Insert

This allows you update if the event attributes already exist in the table based on a condition, or else insert the entry as a new attribute.

**Syntax**

```
select <attribute name>, <attribute name>, ...
from <input stream>
update or insert into <table> (for <event type>)?
    set <table>.<attribute name> = <expression>, <table>.<attribute name> = <expression>, ...
    on <condition>
```

The `condition` element specifies the basis on which events are selected for update. When specifying the `condition`, table attributes should be referred to with the table name. If a record that matches the condition does not already exist in the table, the arriving event is inserted into the table.

The `set` clause is only used when an update is performed during the insert/update operation. When `set` clause is used, the attribute to the left is always a table attribute, and the attribute to the right can be a stream/table attribute, mathematical operation or other. The attribute to the left (i.e., the attribute in the event table) is updated with the value of the attribute to the right if the given condition is met. When the `set` clause is not provided, all the attributes in the table are updated.

:::note
When the attribute to the right is a table attribute, the operations supported differ based on the database type.
:::

To execute update upon specific event types use the `current events`, `expired events` or the `all events` keyword with `for` as shown in the syntax. To understand more see [Event Type](#event-type).

:::note
Table attributes should be always referred to with the table name as `<table name>.<attibute name>`.
:::

**Example**

The following query update for events in the `UpdateTable` event table that have room numbers that match the same in the `UpdateStream` stream. When such events are found in the event table, they are updated. When a room number available in the stream is not found in the event table, it is inserted from the stream.

```
CREATE TABLE RoomAssigneeTable (roomNo int, type string, assignee string);
CREATE STREAM RoomAssigneeStream (roomNumber int, type string, assignee string);

select roomNumber as roomNo, type, assignee
from RoomAssigneeStream
update or insert into RoomAssigneeTable
    set RoomAssigneeTable.assignee = assignee
    on RoomAssigneeTable.roomNo == roomNo;
```

### In

This allows the stream to check whether the expected value exists in the table as a part of a conditional operation.

**Syntax**

```
insert into <output stream>
select <attribute name>, <attribute name>, ...
from <input stream>[<condition> in <table>]
```

The `condition` element specifies the basis on which events are selected to be compared. When constructing the `condition`, the table attribute must be always referred to with the table name as shown below:
```
<table>.<attibute name>
```

**Example**

This Stream application filters only room numbers that are listed in the `ServerRoomTable` table.

```
CREATE TABLE ServerRoomTable (roomNo int);
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

insert into ServerRoomTempStream
from TempStream[ServerRoomTable.roomNo == roomNo in ServerRoomTable];
```

## Named Aggregation

Named aggregation allows you to obtain aggregates in an incremental manner for a specified set of time periods.

This not only allows you to calculate aggregations with varied time granularity, but also allows you to access them in an interactive
 manner for reports, dashboards, and for further processing. Its schema is defined via the *aggregation definition*.

**Purpose**

Named aggregation allows you to retrieve the aggregate values for different time durations.
That is, it allows you to obtain aggregates such as `sum`, `count`, `avg`, `min`, `max`, `count` and `distinctCount`
of stream attributes for durations such as `sec`, `min`, `hour`, etc.

This is of considerable importance in many Analytics scenarios because aggregate values are often needed for several time periods.
Furthermore, this ensures that the aggregations are not lost due to unexpected system failures because aggregates can be stored in different persistence `stores`.

**Syntax**

```
CREATE AGGREGATION <aggregator name> WITH (store.type='<store type>', purge.enable='<true or false>', purge.interval='<purging interval>', purge.retention.period='<retention period>')
from <input stream>
select <attribute name>, <aggregate function>(<attribute name>) as <attribute name>, ...
    group by <attribute name>
    aggregate by <timestamp attribute> every <time periods> ;
```
The above syntax includes the following:

|Item                          |Description
---------------                |---------
|`store`                      |This annotation is used to refer to the data store where the calculated aggregate results are stored. This annotation is optional. When no annotation is provided, the data is stored in the `in-memory` store.
|`purge`                      |This annotation is used to configure purging in aggregation granularities. If this annotation is not provided, the default purging mentioned above is applied. If you want to disable automatic data purging, you can use this annotation as follows:`purge.enable='false'`/You should disable data purging if the aggregation query in included in the Stream application for read-only purposes.
|`purge.retention.Period`            |This annotation is used to specify the length of time the data needs to be retained when carrying out data purging. If this annotation is not provided, the default retention period is applied.
|`<aggregator name>`           |This specifies a unique name for the aggregation so that it can be referred when accessing aggregate results.
|`<input stream>`              |The stream that feeds the aggregation. **Note! this stream should be already defined.**
|`group by <attribute name>`   |The `group by` clause is optional. If it is included in a Stream application, aggregate values  are calculated per each `group by` attribute. If it is not used, all the events are aggregated together.
|`by <timestamp attribute>`    |This clause is optional. This defines the attribute that should be used as the timestamp. If this clause is not used, the event time is used by default. The timestamp could be given as either a `string` or a `long` value. If it is a `long` value, the unix timestamp in milliseconds is expected (e.g. `1496289950000`). If it is a `string` value, the supported formats are `<yyyy>-<MM>-<dd> <HH>:<mm>:<ss>` (if time is in GMT) and  `<yyyy>-<MM>-<dd> <HH>:<mm>:<ss> <Z>` (if time is not in GMT), here the ISO 8601 UTC offset must be provided for `<Z>` .(e.g., `+05:30`, `-11:00`).
|`<time periods>`              |Time periods can be specified as a range where the minimum and the maximum value are separated by three dots, or as comma-separated values.  e.g., A range can be specified as sec...year where aggregation is done per second, minute, hour, day, month and year. Comma-separated values can be specified as min, hour.  Skipping time durations (e.g., min, day where the hour duration is skipped) when specifying comma-separated values is supported only from v4.1.1 onwards

 Aggregation's granularity data holders are automatically purged every 15 minutes. When carrying out data purging, the retention period you have specified for each granularity in the named aggregation query is taken into account. The retention period defined for a granularity needs to be greater than or equal to its minimum retention period as specified in the table below. If no valid retention period is defined for a granularity, the default retention period (as specified in the table below) is applied.

|Granularity           |Default retention      |Minimum retention
---------------        |--------------         |------------------  
|`second`              |`120` seconds          |`120` seconds
|`minute`              |`24`  hours            |`120` minutes
|`hour`                |`30`  days             |`25`  hours
|`day`                 |`1`   year             |`32`  days
|`month`               |`All`                  |`13`  month
|`year`                |`All`                  |`none`

:::note
Aggregation is carried out at calendar start times for each granularity with the GMT timezone
:::

:::note
the aggregation input stream should only feed events to one aggregation definition).
:::

**Example**

This Stream Application defines an aggregation named `TradeAggregation` to calculate the average and sum for the `price` attribute of events arriving at the `TradeStream` stream. These aggregates are calculated per every time granularity in the second-year range.

```sql
CREATE STREAM TradeStream (symbol string, price double, volume long, timestamp long);

CREATE AGGREGATION TradeAggregation WITH (purge.enable='true', purge.interval='10 sec', purge.retentionPeriod.sec='120 sec', purge.retentionPeriod.min='24 hours', purge.retentionPeriod.hours='30 days', purge.retentionPeriod.days='1 year', purge.retentionPeriod.months='all', purge.retentionPeriod.years='all')
  from TradeStream
  select symbol, avg(price) as avgPrice, sum(price) as total
    group by symbol
    aggregate by timestamp every sec ... year;
```

### Distributed Aggregation

Distributed Aggregation allows you to partially process aggregations in different shards. This allows Stream app in one shard to be responsible only for processing a part of the aggregation.

**Syntax**

```
@store(type="<store type>", ...)
CREATE AGGREGATION <aggregator name> WITH (PartitionById.enable='false')
select <attribute name>, <aggregate function>(<attribute name>) as <attribute name>, ...
    group by <attribute name>
    aggregate by <timestamp attribute> every <time periods> ;
from <input stream>
```

Following table includes the `annotation` to be used to enable distributed aggregation,

Item | Description
------|------
`@artitionById` | If the property is given, then the distributed aggregation is enabled. Further this can be disabled by using `enable` element, `PartitionById.enable='false'`.


Further, following system properties are also available,

System Property| Description| Possible Values | Optional | Default Value
---------|---------|---------|---------|------
shardId| The id of the shard one of the distributed aggregation is running in. This should be unique to a single shard | Any string | No | <Empty_String>
partitionById| This allows user to enable/disable distributed aggregation for all aggregations running in one stream processing manager. | true/false | Yesio | false

:::note
ShardIds should not be changed after the first configuration in order to keep data consistency.
:::

### Join (Aggregation)

This allows a stream to retrieve calculated aggregate values from the aggregation.

:::note
A join can also be performed with [two streams](#join-stream), with a [table](#join-table) and a stream, or with a stream against externally [named windows](#join-window).
:::

**Syntax**

A join with aggregation is similer to the join with [table](#join-table), but with additional `within` and `per` clauses.

```
select <attribute name>, <attribute name>, ...
from <input stream> join <aggrigation>
  on <join condition>
  within <time range>
  per <time granularity>
insert into <output stream>;
```

Apart from constructs of [table join](#join-table) this includes the following. Please note that the 'on' condition is optional :

Item|Description
---------|---------
`within  <time range>`| This allows you to specify the time interval for which the aggregate values need to be retrieved. This can be specified by providing the start and end time separated by a comma as `string` or `long` values, or by using the wildcard `string` specifying the data range. For details refer examples.            
`per <time granularity>`|This specifies the time granularity by which the aggregate values must be grouped and returned. e.g., If you specify `days`, the retrieved aggregate values are grouped for each day within the selected time interval.

`within` and `per` clauses also accept attribute values from the stream.
The timestamp of the aggregations can be accessed through the `AGG_TIMESTAMP` attribute.

**Example**

Following aggregation definition will be used for the examples.

```
CREATE STREAM TradeStream (symbol string, price double, volume long, timestamp long);

CREATE AGGREGATION TradeAggregation
select AGG_TIMESTAMP, symbol, avg(price) as avgPrice, sum(price) as total
    group by symbol
    aggregate by timestamp every sec ... year
from TradeStream;
```

This query retrieves daily aggregations within the time range `"2014-02-15 00:00:00 +05:30", "2014-03-16 00:00:00 +05:30"` (Please note that +05:30 can be omitted if timezone is GMT)

```
CREATE STREAM StockStream (symbol string, value int);

insert into AggregateStockStream
select S.symbol, T.total, T.avgPrice
from StockStream as S join TradeAggregation as T
  on S.symbol == T.symbol
  within "2014-02-15 00:00:00 +05:30", "2014-03-16 00:00:00 +05:30"
  per "days";
```

This query retrieves hourly aggregations within the day `2014-02-15`.

```
CREATE STREAM StockStream (symbol string, value int);

insert into AggregateStockStream
select S.symbol, T.total, T.avgPrice
from StockStream as S join TradeAggregation as T
  on S.symbol == T.symbol
  within "2014-02-15 **:**:** +05:30"
  per "hours";
```

This query retrieves all aggregations per `perValue` stream attribute within the time period between timestamps `1496200000000` and `1596434876000`.

```
CREATE STREAM StockStream (symbol string, value int, perValue string);

insert into AggregateStockStream
select S.symbol, T.total, T.avgPrice
from StockStream as S join TradeAggregation as T
  on S.symbol == T.symbol
  within 1496200000000L, 1596434876000L
  per S.perValue;
```

**Supported join types**

Aggregation join supports following join operations.

 *  **Inner join (join)**

    This is the default behaviour of a join operation. `join` is used as the keyword to join the stream with the aggregation. The output is generated only if there is a matching event in the stream and the aggregation.

 *  **Left outer join**

    The `left outer join` operation allows you to join a stream on left side with a aggregation on the right side based on a condition.
    Here, it returns all the events of left stream even if there are no matching events in the right aggregation by
    having null values for the attributes of the right aggregation.

 *  **Right outer join**

    This is similar to a `left outer join`. `right outer join` is used as the keyword to join a stream on right side with a aggregation on the left side based on a condition.
    It returns all the events of the right stream even if there are no matching events in the left aggregation.


## Named Window

A named window is a window that can be shared across multiple queries. Events can be inserted to a named window from one or more queries and it can produce output events based on the named window type.

**Syntax**

The syntax for a named window is as follows:

```
CREATE WINDOW <window name> (<attribute name> <attribute type>, <attribute name> <attribute type>, ... ) <window type>(<parameter>, <parameter>, …) <event type>;
```

The following parameters are configured in a table definition:

| Parameter     | Description |
| ------------- |-------------|
| `window name`      | The name of the window defined. (`PascalCase` is used for window names as a convention.) |
| `attribute name`   | The schema of the window is defined by its attributes with uniquely identifiable attribute names (`camelCase` is used for attribute names as a convention.)|    |
| `attribute type`   | The type of each attribute defined in the schema.  This can be `STRING`, `INT`, `LONG`, `DOUBLE`, `FLOAT`, `BOOL` or `OBJECT`.     |
| `<window type>(<parameter>, ...)`   | The window type associated with the window and its parameters.     |
| `output <event type>` | This is optional. Keywords such as `current events`, `expired events` and `all events` (the default) can be used to specify when the window output should be exposed. For more information, see [Event Type](#event-type).


**Examples**

+ Returning all output when events arrive and when events expire from the window.

    In this query, the event type is not specified. Therefore, it returns both current and expired events as the output.

    ```
    CREATE WINDOW SensorWindow (name string, value float, roomNo int, deviceID string) timeBatch(1 second);
    ```

+ Returning an output only when events expire from the window.

    In this query, the event type of the window is `expired events`. Therefore, it only returns the events that have expired from the window as the output.

    ```
    CREATE WINDOW SensorWindow (name string, value float, roomNo int, deviceID string) timeBatch(1 second) output expired events;
    ```

**Operators on Named Windows**

The following operators can be performed on named windows.

### Insert

This allows events to be inserted into windows. This is similar to inserting events into streams.

**Syntax**

```
insert into <window>
select <attribute name>, <attribute name>, ...
from <input stream>
```

To insert only events of a specific event type, add the `current events`, `expired events` or the `all events` keyword between `insert` and `into` keywords (similar to how it is done for streams).

For more information, see [Event Type](#event-type).

**Example**

This query inserts all events from the `TempStream` stream to the `OneMinTempWindow` window.

```
CREATE STREAM TempStream(tempId string, temp double);
CREATE WINDOW OneMinTempWindow(tempId string, temp double) time(1 min);

insert into OneMinTempWindow
select *
from TempStream;
```

### Join (Window)

To allow a stream to retrieve information from a window based on a condition.

:::note
A join can also be performed with [two streams](#join-stream), [aggregation](#join-aggregation) or with tables [tables](#join-table).
:::

**Syntax**

```sql
insert into <output stream>
select (<input stream>|<window>).<attribute name>, (<input stream>|<window>).<attribute name>, ...
from <input stream> join <window>
    on <condition>
```

**Example**

This Stream Application performs a join count the number of temperature events having more then 40 degrees within the last 2 minutes.

```
CREATE WINDOW TwoMinTempWindow (roomNo int, temp double) time(2 min);
CREATE STREAM CheckStream (requestId string);

insert into HighTempCountStream
select requestId, count(T.temp) as count
from CheckStream as C join TwoMinTempWindow as T
    on T.temp > 40;
```

**Supported join types**

Window join supports following operations of a join clause.

 *  **Inner join (join)**

    This is the default behaviour of a join operation. `join` is used as the keyword to join two windows or a stream with a window. The output is generated only if there is a matching event in both stream/window.

 *  **Left outer join**

    The `left outer join` operation allows you to join two windows or a stream with a window to be merged based on a condition.
    Here, it returns all the events of left stream/window even if there are no matching events in the right stream/window by
    having null values for the attributes of the right stream/window.

 *  **Right outer join**

    This is similar to a left outer join. `Right outer join` is used as the keyword to join two windows or a stream with a window.
    It returns all the events of the right stream/window even if there are no matching events in the left stream/window.

 *  **Full outer join**

    The full outer join combines the results of `left outer join` and `right outer join`. `full outer join` is used as the keyword to join two windows or a stream with a window.
    Here, output event are generated for each incoming event even if there are no matching events in the other stream/window.

### From

A window can be an input to a query, similar to streams.

Note !!!
     When window is used as an input to a query, another window cannot be applied on top of this.

**Syntax**

```sql
insert into <output stream>
select <attribute name>, <attribute name>, ...
from <window>
```

**Example**

This Stream Application calculates the maximum temperature within the last 5 minutes.

```
CREATE WINDOW FiveMinTempWindow (roomNo int, temp double) time(5 min);

insert into MaxSensorReadingStream
select max(temp) as maxValue, roomNo
from FiveMinTempWindow;
```

## Trigger

Triggers allow events to be periodically generated. **Trigger definition** can be used to define a trigger. A trigger also works like a stream with a predefined schema.

**Purpose**

For some use cases the system should be able to periodically generate events based on a specified time interval to perform some periodic executions.

A trigger can be performed for a `'start'` operation, for a given `<time interval>`, or for a given `'<cron expression>'`.

**Syntax**

The syntax for a trigger definition is as follows.

```
CREATE TRIGGER <trigger name> at ('start'| every <time interval>| '<cron expression>');
```

Similar to streams, triggers can be used as inputs. They adhere to the following stream definition and produce the `triggered_time` attribute of the `long` type.

```
CREATE STREAM <trigger name> (triggered_time long);
```

The following types of triggeres are currently supported:

|Trigger type| Description|
|-------------|-----------|
|`'start'`| An event is triggered when Stream is started.|
|`every <time interval>`| An event is triggered periodically at the given time interval.
|`'<cron expression>'`| An event is triggered periodically based on the given cron expression. For configuration details, see <a target="_blank" href="http://www.quartz-scheduler.org/documentation/quartz-2.1.7/tutorials/tutorial-lesson-06.html">quartz-scheduler</a>.


**Examples**

+ Triggering events regularly at specific time intervals

    The following query triggers events every 5 minutes.

    ```
    CREATE TRIGGER FiveMinTriggerStream at every 5 min;
    ```

+ Triggering events at a specific time on specified days

    The following query triggers an event at 10.15 AM on every weekdays.

    ```
    CREATE TRIGGER FiveMinTriggerStream at '0 15 10 ? * MON-FRI';
    ```

## Script

Scripts allow you to write functions in other programming languages and execute them within Stream queries. Functions defined via scripts can be accessed in queries similar to any other inbuilt function. **Function definitions** can be used to define these scripts.

Function parameters are passed into the function logic as `Object[]` and with the name `data` .

**Purpose**

Scripts allow you to define a function operation that is not provided in Stream core or its extension. It is not required to write an extension to define the function logic.

**Syntax**

The syntax for a Script definition is as follows.

```
define function <function name>[<language name>] return <return type> {
    <operation of the function>
};
```

The following parameters are configured when defining a script.

| Parameter     | Description |
| ------------- |-------------|
| `function name`| 	The name of the function (`camelCase` is used for the function name) as a convention.|
|`language name`| The name of the programming language used to define the script, such as `javascript`, `r` and `scala`.|
| `return type`| The attribute type of the function’s return. This can be `int`, `long`, `float`, `double`, `string`, `bool` or `object`. Here the function implementer should be responsible for returning the output attribute on the defined return type for proper functionality.
|`operation of the function`| Here, the execution logic of the function is added. This logic should be written in the language specified under the `language name`, and it should return the output in the data type specified via the `return type` parameter.

**Examples**

This query performs concatenation using JavaScript, and returns the output as a string.

```
define function concatFn[javascript] return string {
    var str1 = data[0];
    var str2 = data[1];
    var str3 = data[2];
    var responce = str1 + str2 + str3;
    return responce;
};

CREATE STREAM TempStream(deviceID long, roomNo int, temp double);

insert into DeviceTempStream
select concatFn(roomNo,'-',deviceID) as id, temp
from TempStream;
```

## Store Query

Stream store queries are a set of on-demand queries that can be used to perform operations on Stream tables, windows, and aggregators.

**Purpose**

Store queries allow you to execute the following operations on Stream tables, windows, and aggregators without the intervention of streams.

Queries supported for tables:

* INSERT
* SELECT
* DELETE
* UPDATE
* UPDATE OR INSERT

Queries supported for windows and aggregators:

* SELECT

This is be done by submitting the store query to the Stream application runtime using its `query()` method.

In order to execute store queries, the Stream application of the Stream application runtime you are using, should have a store defined, which contains the table that needs to be queried.


**Example**

If you need to query the table named `RoomTypeTable` the it should have been defined in the Stream application.

In order to execute a store query on `RoomTypeTable`, you need to submit the store query using `query()` method.


### _(Table/Window)_ Select

The `SELECT` store query retrieves records from the specified table or window, based on the given condition.

**Syntax**

```
from <table/window>
<on condition>?
select <attribute name>, <attribute name>, ...
<group by>?
<having>?
<order by>?
<limit>?
```

**Example**

This query retrieves room numbers and types of the rooms starting from room no 10.

```
select roomNo, type
from roomTypeTable
on roomNo >= 10;
```

### _(Aggregation)_ Select

The `SELECT` store query retrieves records from the specified aggregation, based on the given condition, time range,
and granularity.

**Syntax**

```
from <aggregation>
<on condition>?
within <time range>
per <time granularity>
select <attribute name>, <attribute name>, ...
<group by>?
<having>?
<order by>?
<limit>?
```

**Example**

Following aggregation definition will be used for the examples.

```
CREATE STREAM TradeStream (symbol string, price double, volume long, timestamp long);

CREATE AGGREGATION TradeAggregation
  select symbol, avg(price) as avgPrice, sum(price) as total
    group by symbol
    aggregate by timestamp every sec ... year
  from TradeStream;
```

This query retrieves daily aggregations within the time range `"2014-02-15 00:00:00 +05:30", "2014-03-16 00:00:00 +05:30"` (Please note that +05:30 can be omitted if timezone is GMT)

```
select symbol, total, avgPrice 
from TradeAggregation
  within "2014-02-15 00:00:00 +05:30", "2014-03-16 00:00:00 +05:30"
  per "days";
```

This query retrieves hourly aggregations of "FB" symbol within the day `2014-02-15`.

```
select symbol, total, avgPrice
from TradeAggregation
  on symbol == "FB"
  within "2014-02-15 **:**:** +05:30"
  per "hours";
```

### Insert

This allows you to insert a new record to the table with the attribute values you define in the `select` section.

**Syntax**

```
insert into <table>
select <attribute name>, <attribute name>, ...;
```

**Example**

This store query inserts a new record to the table `RoomOccupancyTable`, with the specified attribute values.


```
insert into RoomOccupancyTable
select 10 as roomNo, 2 as people
```

### Delete

The `DELETE` store query deletes selected records from a specified table.

**Syntax**

```
<select>?  
delete <table>  
on <conditional expresssion>
```

The `condition` element specifies the basis on which records are selected to be deleted.

:::note
Table attributes must always be referred to with the table name as shown below: 
`<table name>.<attibute name>`.
:::

**Example**

In this example, query deletes a record in the table named `RoomTypeTable` if it has value for the `roomNo` attribute that matches the value for the `roomNumber` attribute of the selection which has 10 as the actual value.

```
select 10 as roomNumber
delete RoomTypeTable
on RoomTypeTable.roomNo == roomNumber;
```

```
delete RoomTypeTable
on RoomTypeTable.roomNo == 10;
```

### Update

The `UPDATE` store query updates selected attributes stored in a specific table, based on a given condition.

**Syntax**

```
select <attribute name>, <attribute name>, ...?
update <table>
    set <table>.<attribute name> = (<attribute name>|<expression>)?, <table>.<attribute name> = (<attribute name>|<expression>)?, ...
    on <condition>
```

The `condition` element specifies the basis on which records are selected to be updated. When specifying the `condition`, table attributes must be referred to with the table name.

You can use the `set` keyword to update selected attributes from the table. Here, for each assignment, the attribute specified in the left must be the table attribute, and the one specified in the right can be a stream/table attribute a mathematical operation, or other. When the `set` clause is not provided, all the attributes in the table are updated.


:::note
Table attributes must always be referred to with the table name as shown below: 
`<table name>.<attibute name>`.
:::

**Example**

The following query updates the room occupancy by increasing the value of `people` by 1, in the `RoomOccupancyTable` table for each room number greater than 10.

```
select 10 as roomNumber, 1 as arrival
update RoomTypeTable
    set RoomTypeTable.people = RoomTypeTable.people + arrival
    on RoomTypeTable.roomNo == roomNumber;
```

```
update RoomTypeTable
    set RoomTypeTable.people = RoomTypeTable.people + 1
    on RoomTypeTable.roomNo == 10;
```

### Update or Insert

This allows you to update selected attributes if a record that meets the given conditions already exists in the specified  table.
If a matching record does not exist, the entry is inserted as a new record.

**Syntax**

```
select <attribute name>, <attribute name>, ...
update or insert into <table>
    set <table>.<attribute name> = <expression>, <table>.<attribute name> = <expression>, ...
    on <condition>
```
The `condition` element specifies the basis on which records are selected for update. When specifying the `condition`, table attributes should be referred to with the table name. If a record that matches the condition does not already exist in the table, the arriving event is inserted into the table.

The `set` clause is only used when an update is performed during the insert/update operation. When `set` clause is used, the attribute to the left is always a table attribute, and the attribute to the right can be a stream/table attribute, mathematical operation or other. The attribute to the left (i.e., the attribute in the event table) is updated with the value of the attribute to the right if the given condition is met. When the `set` clause is not provided, all the attributes in the table are updated.

:::note
Table attributes must always be referred to with the table name as shown below: 
`<table name>.<attibute name>`.
:::

**Example**

The following query tries to update the records in the `RoomAssigneeTable` table that have room numbers that match the same in the selection. If such records are not found, it inserts a new record based on the values provided in the selection.

```
select 10 as roomNo, "single" as type, "abc" as assignee
update or insert into RoomAssigneeTable
    set RoomAssigneeTable.assignee = assignee
    on RoomAssigneeTable.roomNo == roomNo;
```

### Event Playback

When `@app:playback` annotation is added to the app, the timestamp of the event (specified via an attribute) is treated as the current time. This results in events being processed faster.

The following elements are configured with this annotation.

|Annotation| Description|
| ------------- |-------------|
|`idle.time`|If no events are received during a time interval specified (in milliseconds) via this element, the Stream system time is incremented by a number of seconds specified via the `increment` element.|
|`increment`|The number of seconds by which the Stream system time must be incremented if no events are received during the time interval specified via the `idle.time` element.|

e.g., In the following example, the Stream system time is incremented by two seconds if no events arrive for a time interval of 100 milliseconds.

```
@app:playback(idle.time = '100 millisecond', increment = '2 sec') 
```
