---
sidebar_position: 30
title: Error Handling at Sink
---

There can be cases where external systems becoming unavailable or coursing errors when the events are published to them. By default sinks log and drop the events causing event losses, and this can be handled gracefully by configuring `on.error` parameter of the `sink.type` annotation.

## Supported Sink Types

The following sinks support error handling:

- database
- stream
- table
- jms
- http
- queryworker

## on.error Parameter

The `on.error` parameter of the `sink.type` annotation can be specified as below.

```sql
@OnError(action='on error action')
CREATE SINK <stream name> WITH (sink.type='<sink type>', on.error='<on error action>', <key>='<value>', ...) (<attribute name> <attribute type>, <attribute name> <attribute type>, ... );
```  

The following actions can be specified to `on.error` parameter of `sink.type` annotation to handle erroneous scenarios.

- `WAIT` : Publishing threads wait in `back-off and re-trying` mode, and only send the events when the connection is re-established. During this time the threads will not consume any new messages causing the systems to introduce back pressure on the systems that publishes to it.
- `STREAM`: Pushes the failed events with the corresponding error to the associated fault stream the sink belongs to.

## Example 1

Introduce back pressure on the threads who bring events via `TempStream` when the system cannot connect to Kafka.

The configuration of `TempStream` stream and `sink.type` Kafka annotation with `on.error` property is as follows.

```sql
@OnError(action='on error action')
CREATE SINK TempStream WITH (sink.type='kafka', on.error='WAIT', topic='{{roomNo}}', bootstrap.servers='localhost:9092', map.type='json') (deviceID long, roomNo int, temp double);
```

## Example 2

Send events to the fault stream of `TempStream` when the system cannot connect to Kafka.

The configuration of `TempStream` stream with associated fault stream, `sink.type` Kafka annotation with `on.error` property and a queries to handle the error is as follows.

```sql
@OnError(action='STREAM')
CREATE SINK TempStream WITH (sink.type='kafka', on.error='STREAM', topic='{{roomNo}}', bootstrap.servers='localhost:9092', map.type='text') (deviceID long, roomNo int, temp double);

-- Handling error by simply logging the event and error.
@name('handle-error')
INSERT INTO IgnoreStream;
SELECT deviceID, roomNo, temp, _error
FROM !TempStream#log("Error Occurred!")
```

## Example 3

This is a complete stream worker that demonstrates how to make a stream worker create a stream and send errors to it as they occur.

```sql
@App:name('sw-error-handling2')
@App:qlVersion('2')

CREATE SOURCE Stream1
WITH (type='stream', stream.list='Stream1', replication.type='local', map.type='json')
(v int);

@OnError(action='stream')
CREATE SINK Stream2
WITH (type='stream', stream='Stream2', replication.type='local', on.error='stream', map.type='json')
(v int);

CREATE SINK STREAM Stream2Error (v int, _error object);

-- Data Processing
@info(name='Query1')
INSERT INTO Stream2 SELECT v as v FROM Stream1;

@info(name='Error handling')
INSERT INTO Stream2Error SELECT v, _error  FROM !Stream2#log("Error handling");
```
