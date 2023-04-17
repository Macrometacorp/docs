---
sidebar_position: 20
title: Error Handling at Source
---

When errors are thrown by elements subscribed to the source, the error is propagated up to the source that delivered the event to those stream worker. By default, the error is logged and dropped at the source, but this behavior can be altered by by adding `OnError` property to the corresponding source definition.

## OnError Property

The `OnError` property can help users to capture the error and the associated event, and handle them gracefully by sending them to a fault stream.

The `OnError` property and the required `action` must be specified as below.

```sql
@OnError(action='<action>')
CREATE SOURCE <stream name> (<attribute name> <attribute type>, <attribute name> <attribute type>, ... );
```

The `action` parameter of the `OnError` property defines the action to be executed during failure scenarios.

The following actions can be specified to `OnError` property to handle erroneous scenarios.

- `STREAM`: Creates a fault stream and redirects the event and the error to it. The created fault stream will have all the attributes defined in the base stream to capture the error causing event, and in addition it also contains `_error` attribute of type `object` to containing the error information. The fault stream can be referred by adding `!` in front of the base stream name as `!<stream name>`.

## Example 1

Handle errors in `TempStream` by redirecting the errors to a fault stream.

The configuration of `TempStream` stream and `OnError` property is as follows:

```sql
@OnError.action="STREAM"
CREATE STREAM TempStream (deviceID long, roomNo int, temp double;
```

The stream infers and automatically defines the fault stream of `TempStream` as given below.

```sql
CREATE STREAM !TempStream (deviceID long, roomNo int, temp double, _error object);
```

The stream worker extends the above use case by adding failure generation and error handling with the use of queries is as follows.

```sql
-- Define fault stream to handle error occurred at TempStream subscribers
@OnError(action="STREAM")
CREATE STREAM TempStream (deviceID long, roomNo int, temp double;

-- Handling error by simply logging the event and error.
@name('handle-error')
insert into IgnoreStream
select deviceID, roomNo, temp, _error
from !TempStream#log("Error Occurred!");
```

## Example 2

This stream worker creates a stream when it detects an error and sends the error to the stream it creates.

```sql
@App:name('sw-error-handling1')
@App:qlVersion('2')

@OnError(action='stream')
CREATE SOURCE Stream1
WITH (type='stream', stream.list='Stream1', replication.type='local', map.type='json')
(v int);

CREATE SINK STREAM Stream1Error (v int, _error object);

CREATE SINK Stream2
WITH (type='stream', stream='Stream2', replication.type='local', map.type='json')
(v int);

-- Data Processing
@info(name='Query1')
INSERT INTO Stream2 SELECT v as v FROM Stream1;

@info(name='Error handling')
INSERT INTO Stream1Error SELECT v, _error  FROM !Stream1#log("Error handling");
```
