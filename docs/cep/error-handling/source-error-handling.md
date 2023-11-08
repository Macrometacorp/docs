---
sidebar_position: 20
title: Error Handling at Source
---

Errors from stream elements that subscribe to a source are propagated to the source that emitted the event. This behavior can now be modified by implementing the `OnError.action='stream'` property within the stream definition.

## Applying OnError.action Property

The `OnError.action` property redirects errors and their associated events to a fault stream. This stream is identified by the prefix `!` followed by the name of the original stream.

```sql
CREATE SOURCE <stream name> WITH (type='<source type>', OnError.action='stream', <other properties>) (<attribute name> <attribute type>, ...);
```

A fault stream inherits all attributes from the base stream, with the addition of an `_error` attribute, which is an object containing the error details.

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
