---
sidebar_position: 20
title: Error Handling at Source
---

Errors from stream elements that subscribe to a source are propagated to the source that emitted the event. This behavior can now be modified by implementing the `OnError.action` property within the stream definition.

The following actions are supported for error handling at source:

- `log` - Logs the error, and drops the message.
- `stream` - Forward the error and the event to fault stream. This stream, indicated as `!<StreamName>`, is created implicitly and captures both the event that led to the error and the error details. A fault stream will be composed of the base stream’s attributes, plus an `_error` attribute containing error details.

## OnError.action Property

Apply the `OnError.action` property to a source to handle errors.
```sql
CREATE SOURCE <stream name> WITH (type='<source type>', OnError.action='<action>', <other properties>) (<attribute name> <attribute type>, ...);
```

## Fault Stream Details

The fault stream automatically captures errors from the associated base stream. The system generates this stream without explicit user definition.

## Example: Source with Fault Stream

```sql
-- Stream definition with OnError.action='stream' to capture errors
CREATE SOURCE CountStream WITH (type='inMemory', map.type='passthrough', OnError.action='stream') (c long, t long);

-- Automatically created fault stream schema
CREATE STREAM !CountStream (c long, t long, _error object);

-- Insert logic for the main stream
INSERT INTO CountStream
SELECT count() as c, eventTimestamp() as t
FROM EventTrigger;

-- Error handling by redirection to the fault stream
INSERT INTO CountStreamErrorStream
SELECT c, t, convert(_error, 'string') as error
FROM !CountStream;
```

The provided example illustrates the application of `OnError.action='stream'` to a stream source, which directs error handling to a fault stream.
