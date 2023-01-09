---
title: Stream Sink
---

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
| database | Allow the stream worker to publish events to collections (doc, graphs) in the same or different geofabric. |
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

###Syntax

To configure a distributed sink, add the sink configuration to a stream definition by adding the `sink.type` property and add the configuration parameters that are common of all the destination endpoints inside it, along with the common parameters also add the `distribution.strategy` property specifying the distribution strategy (i.e. `roundRobin` or `partitioned`) and `destination` properties providing each endpoint specific configurations.

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

Publishes events from the `OutputStream` stream to multiple `HTTP` endpoints using a partitioning strategy. Here the events are sent to either `http://localhost:8005/endpoint1` or `http://localhost:8006/endpoint2` based on the partitioning key `country`. It uses default `JSON` mapping, `POST` method, and used `admin` as both the username and the password when publishing to both the endpoints.

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

The stream worker extends the above use-case by adding failure generation and error handling with the use of [queries](#query) is as follows.

:::note
Details on writing processing logics via [queries](#query) will be explained in later sections.
:::

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
