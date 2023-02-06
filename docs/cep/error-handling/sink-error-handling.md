---
sidebar_position: 30
title: Error Handling at Sink
---

There can be cases where external systems becoming unavailable or coursing errors when the events are published to them. By default sinks log and drop the events causing event losses, and this can be handled gracefully by configuring `on.error` parameter of the `sink.type` annotation.

## on.error Parameter

The `on.error` parameter of the `sink.type` annotation can be specified as below.

```sql
CREATE SINK <stream name> WITH (sink.type='<sink type>', on.error.action='<on error action>', <key>='<value>', ...) (<attribute name> <attribute type>, <attribute name> <attribute type>, ... );
```  

The following actions can be specified to `on.error` parameter of `sink.type` annotation to handle erroneous scenarios.

- `WAIT` : Publishing threads wait in `back-off and re-trying` mode, and only send the events when the connection is re-established. During this time the threads will not consume any new messages causing the systems to introduce back pressure on the systems that publishes to it.

- `STREAM`: Pushes the failed events with the corresponding error to the associated fault stream the sink belongs to.

## Example 1

Introduce back pressure on the threads who bring events via `TempStream` when the system cannot connect to Kafka.

The configuration of `TempStream` stream and `sink.type` Kafka annotation with `on.error` property is as follows.

```sql
CREATE SINK TempStream WITH (sink.type='kafka', on.error.action='WAIT', topic='{{roomNo}}', bootstrap.servers='localhost:9092', map.type='json') (deviceID long, roomNo int, temp double);
```

## Example 2

Send events to the fault stream of `TempStream` when the system cannot connect to Kafka.

The configuration of `TempStream` stream with associated fault stream, `sink.type` Kafka annotation with `on.error` property and a queries to handle the error is as follows.

```sql
CREATE SINK TempStream WITH (sink.type='kafka', on.error.action='STREAM', topic='{{roomNo}}', bootstrap.servers='localhost:9092', map.type='text') (deviceID long, roomNo int, temp double);

-- Handling error by simply logging the event and error.
@name('handle-error')
insert into IgnoreStream;
select deviceID, roomNo, temp, _error
from !TempStream#log("Error Occurred!")
```
