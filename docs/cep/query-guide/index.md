---
sidebar_position: 10
title: Query Guide
---

Macrometa Stream QL is designed to process streams of events. It can be used to implement streaming data integration, streaming analytics, rule based and
adaptive decision making use cases. It is an evolution of Complex Event Processing (CEP) and Stream Processing systems, hence it can also be used to process stateful computations, detecting of complex event patterns, and sending notifications in real-time.

Stream QL uses SQL like syntax, and annotations to consume events from diverse event sources with various data formats, process then using stateful and stateless operators and send outputs to multiple endpoints according to their accepted event formats. It also supports exposing rule based and adaptive decision making as service endpoints such that external programs and systems can synchronously get decision support form Stream.  

The following sections explains how to write processing logic using Stream QL.

## Stream Application

The processing logic for your program can be written using the Streaming SQL and put together as a single declarative spec called as the `Stream Application` or the `StreamApp`.

StreamApps are named by adding `@app:name('<name>')` annotation on the top of the StreamApp spec. When the annotation is not added stream processor assigns a random UUID as the name of the StreamApp.

## StreamApp Purpose

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

A stream is a logical series of events ordered in time. Its schema is defined via the _stream definition_. A stream definition contains the stream name and a set of attributes with specific types and uniquely identifiable names within the stream. All events associated to the stream will have the same schema (i.e., have the same attributes in the same order).

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

- `deviceID` of type `long`
- `roomNo` of type `int`
- `temp` of type `double`

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

- Define attribute names as keys, and mapping configurations as values:

  ```
  ... ( <attribute1>='<mapping>', <attributeN>='<mapping>')
  ```

- Define the mapping configurations in the same order as the attributes defined in stream definition:

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

- `'{{attribute1}}'`
- `'This is {{attribute1}}'`
- `{{attribute1}} > {{attributeN}}`  

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

- `STREAM`: Creates a fault stream and redirects the event and the error to it. The created fault stream will have all the attributes defined in the base stream to capture the error causing event, and in addition it also contains `_error` attribute of type `object` to containing the error information. The fault stream can be referred by adding `!` in front of the base stream name as `!<stream name>`.

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

- `WAIT` : Publishing threads wait in `back-off and re-trying` mode, and only send the events when the connection is re-established. During this time the threads will not consume any new messages causing the systems to introduce back pressure on the systems that publishes to it.

- `STREAM`: Pushes the failed events with the corresponding error to the associated fault stream the sink belongs to.

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


## Named Aggregation

Named aggregation allows you to obtain aggregates in an incremental manner for a specified set of time periods.

This not only allows you to calculate aggregations with varied time granularity, but also allows you to access them in an interactive
 manner for reports, dashboards, and for further processing. Its schema is defined via the _aggregation definition_.

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

- **Inner join (join)**

    This is the default behaviour of a join operation. `join` is used as the keyword to join the stream with the aggregation. The output is generated only if there is a matching event in the stream and the aggregation.

- **Left outer join**

    The `left outer join` operation allows you to join a stream on left side with a aggregation on the right side based on a condition.
    Here, it returns all the events of left stream even if there are no matching events in the right aggregation by
    having null values for the attributes of the right aggregation.

- **Right outer join**

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

- Returning all output when events arrive and when events expire from the window.

    In this query, the event type is not specified. Therefore, it returns both current and expired events as the output.

    ```
    CREATE WINDOW SensorWindow (name string, value float, roomNo int, deviceID string) timeBatch(1 second);
    ```

- Returning an output only when events expire from the window.

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

- **Inner join (join)**

    This is the default behaviour of a join operation. `join` is used as the keyword to join two windows or a stream with a window. The output is generated only if there is a matching event in both stream/window.

- **Left outer join**

    The `left outer join` operation allows you to join two windows or a stream with a window to be merged based on a condition.
    Here, it returns all the events of left stream/window even if there are no matching events in the right stream/window by
    having null values for the attributes of the right stream/window.

- **Right outer join**

    This is similar to a left outer join. `Right outer join` is used as the keyword to join two windows or a stream with a window.
    It returns all the events of the right stream/window even if there are no matching events in the left stream/window.

- **Full outer join**

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

- Triggering events regularly at specific time intervals

    The following query triggers events every 5 minutes.

    ```
    CREATE TRIGGER FiveMinTriggerStream at every 5 min;
    ```

- Triggering events at a specific time on specified days

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
