---
sidebar_position: 1
title: Sink
---

The pages in this section show you how to use various sinks in Macrometa GDN stream workers, including streams, HTTP, and Kafka.

Sinks are used to publish events to an external source after being processed. Sinks consume events from streams and publish them via multiple transports to external endpoints in various data formats.

### Sink Configuration

A sink configuration allows users to define a mapping to convert the stream events into the required output data format, such as `JSON`, `TEXT`, and so on, and publish the events to the configured endpoints. When customizations to such mappings are not provided, the stream converts events to the predefined event format based on the stream definition and the configured message mapper type before publishing the events.

### Syntax

General syntax for creating a sink requires a sink name and definition of the `type` of sink. There are other parameters that depend on the type of sink you are using. For more information, refer to the pages in this section.

```sql
CREATE SINK <stream name> WITH (sink.type='<sink type>', <static.key>='<value>', <dynamic.key>='{{<value>}}', map.type='<map type>', <static.key>='<value>', <dynamic.key>='{{<value>}}', map.payload'<payload mapping>')) (<attribute1> <type>, <attributeN> <type>);
```

### Dynamic Properties

The sink and sink mapper properties that are categorized as `dynamic` have the ability to absorb attribute values
dynamically from the events of their associated streams. This can be configured by enclosing the relevant
attribute names in double curly braces as`{{...}}`, and using it within the property values.

Some valid dynamic properties values are:

- `'{{attribute1}}'`
- `'This is {{attribute1}}'`
- `{{attribute1}} > {{attributeN}}`  

Here the attribute names in the double curly braces will be replaced with the values from the events before they are published.

### Example Stream Sink

```sql
   CREATE SINK ProductionAlertStream WITH (type= 'stream', stream='ProductionAlertStream', map.type='json') (name string, amount double);
```

### Example HTTP Sink

```sql
CREATE SINK <NAME> WITH (type="http", map.type="<STRING>" publisher.url="<STRING>", basic.auth.username="<STRING>", basic.auth.password="<STRING>", https.truststore.file="<STRING>", https.truststore.password="<STRING>", oauth.username="<STRING>", oauth.password="<STRING>", consumer.key="<STRING>", consumer.secret="<STRING>", token.url="<STRING>", refresh.token="<STRING>", headers="<STRING>", method="<STRING>", socket.idle.timeout="<INT>", chunk.disabled="<BOOL>", ssl.protocol="<STRING>", ssl.verification.disabled="<BOOL>", tls.store.type="<STRING>", ssl.configurations="<STRING>", proxy.host="<STRING>", proxy.port="<STRING>", proxy.username="<STRING>", proxy.password="<STRING>", client.bootstrap.configurations="<STRING>", max.pool.active.connections="<INT>", min.pool.idle.connections="<INT>", max.pool.idle.connections="<INT>", min.evictable.idle.time="<STRING>", time.between.eviction.runs="<STRING>", max.wait.time="<STRING>", test.on.borrow="<BOOL>", test.while.idle="<BOOL>", exhausted.action="<INT>", hostname.verification.enabled="<BOOL>")
```

## Sink Types

The `type` parameter of the `sink.type` annotation defines the sink type that publishes the events. The other parameters of the `sink.type` annotation depends upon the selected sink type, and here some of its parameters can be optional and/or dynamic.

The following is a list of some of the sink types supported by stream workers:

|Source type | Description|
| ------------- |-------------|
| [database](../query-guide/table-collection.md) | Allow the stream worker to publish events to collections (doc, graphs) in the same or different geofabric. |
| [email](email.md) | Send emails via SMTP protocols.|
| [HTTP](http.md| Publish events to an HTTP endpoint.|
| [Kafka](kafka.md) | Publish events to Kafka topic. |
| [TCP](tcp.md) | Publish events to a TCP service. |


## Error Handling at Stream Sink

There can be cases where external systems becoming unavailable or coursing errors when the events are published to them. By default sinks log and drop the events causing event losses, and this can be handled gracefully by configuring `on.error` parameter of the `sink.type` annotation.

### on.error Parameter

The `on.error` parameter of the `sink.type` annotation can be specified as below.

```sql
CREATE SINK <stream name> WITH (sink.type='<sink type>', on.error.action='<on error action>', <key>='<value>', ...) (<attribute name> <attribute type>, <attribute name> <attribute type>, ... );
```  

The following actions can be specified to `on.error` parameter of `sink.type` annotation to handle erroneous scenarios.

- `WAIT` : Publishing threads wait in `back-off and re-trying` mode, and only send the events when the connection is re-established. During this time the threads will not consume any new messages causing the systems to introduce back pressure on the systems that publishes to it.

- `STREAM`: Pushes the failed events with the corresponding error to the associated fault stream the sink belongs to.

### Example 1

Introduce back pressure on the threads who bring events via `TempStream` when the system cannot connect to Kafka.

The configuration of `TempStream` stream and `sink.type` Kafka annotation with `on.error` property is as follows.

```sql
CREATE SINK TempStream WITH (sink.type='kafka', on.error.action='WAIT', topic='{{roomNo}}', bootstrap.servers='localhost:9092', map.type='xml') (deviceID long, roomNo int, temp double);
```

### Example 2

Send events to the fault stream of `TempStream` when the system cannot connect to Kafka.

The configuration of `TempStream` stream with associated fault stream, `sink.type` Kafka annotation with `on.error` property and a queries to handle the error is as follows.

```sql
CREATE SINK TempStream WITH (sink.type='kafka', on.error.action='STREAM', topic='{{roomNo}}', bootstrap.servers='localhost:9092', map.type='xml') (deviceID long, roomNo int, temp double);

-- Handling error by simply logging the event and error.
@name('handle-error')
insert into IgnoreStream;
select deviceID, roomNo, temp, _error
from !TempStream#log("Error Occurred!")
```
