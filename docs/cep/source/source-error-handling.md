---
sidebar_position: 40
title: Error Handling at Source
---

When errors are thrown by elements subscribed to the source, the error is propagated up to the source that delivered the event to those stream worker. By default, the error is logged and dropped at the source, but this behavior can be altered by by adding `OnError` property to the corresponding source definition.

### OnError Property

The `OnError` property can help users to capture the error and the associated event, and handle them gracefully by sending them to a fault stream.

The `OnError` property and the required `action` must be specified as below.

```sql
CREATE SOURCE <stream name> WITH (OnError.action='<action>') (<attribute name> <attribute type>, <attribute name> <attribute type>, ... );
```

The `action` parameter of the `OnError` property defines the action to be executed during failure scenarios.

The following actions can be specified to `OnError` property to handle erroneous scenarios.

- `STREAM`: Creates a fault stream and redirects the event and the error to it. The created fault stream will have all the attributes defined in the base stream to capture the error causing event, and in addition it also contains `_error` attribute of type `object` to containing the error information. The fault stream can be referred by adding `!` in front of the base stream name as `!<stream name>`.

### Example

Handle errors in `TempStream` by redirecting the errors to a fault stream.

The configuration of `TempStream` stream and `OnError` property is as follows:

```sql
CREATE STREAM TempStream WITH(OnError.action="STREAM") (deviceID long, roomNo int, temp double;
```

Stream infers and automatically defines the fault stream of `TempStream` as given below.

```sql
CREATE STREAM !TempStream (deviceID long, roomNo int, temp double, _error object);
```

The stream worker extends the above use case by adding failure generation and error handling with the use of queries is as follows.

```sql
-- Define fault stream to handle error occurred at TempStream subscribers

CREATE STREAM TempStream WITH(OnError.action="STREAM") (deviceID long, roomNo int, temp double;

-- Handling error by simply logging the event and error.
@name('handle-error')
insert into IgnoreStream
select deviceID, roomNo, temp, _error
from !TempStream#log("Error Occurred!");
```
