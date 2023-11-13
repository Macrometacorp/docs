---
sidebar_position: 30
title: Error Handling at Sink
---

Handling errors in sinks is crucial when external systems become unavailable or errors occur during event publication. The `OnError.action` property provides a standardized approach to manage these errors.

The following actions are supported for error handling at sink:

- `log` - Logs the error, and drops the message.
- `stream` - Forward the error and the event to fault stream.
- `wait` - Wait for some time (i.e. 5 seconds) and then retry.

## OnError.action Property

Apply the `OnError.action` property to a sink to redirect errors to a fault stream. This stream, indicated as `!<StreamName>`, is created implicitly and captures both the event that led to the error and the error details.

```sql
CREATE SINK <stream name> WITH (type='<sink type>', OnError.action='stream', <other properties>) (<attribute name> <attribute type>, ...);
```

A fault stream will be composed of the base stream’s attributes, plus an `_error` attribute containing error details.

## Supported Sink Types

The `OnError.action='stream'` property is supported by various sink types including:

- database
- stream
- table
- jms
- http
- queryworker

## Example: Sink with Fault Stream

```sql
-- Sink definition with OnError.action='stream' to manage errors
CREATE SINK HTTPSink WITH (
    type='http', 
    publisher.url='http://example.com/endpoint', 
    map.type='json',
    OnError.action='stream'
) (status string, count long, time long);

-- Automatically created fault stream schema
CREATE STREAM !HTTPSink (status string, count long, time long, _error object);

-- Error handling by inserting into the fault stream
INSERT INTO HTTPSinkErrorStream
SELECT status, count, time, convert(_error, 'string') as error
FROM !HTTPSink;
```

This example shows how to apply the `OnError.action='stream'` property to a sink, directing any errors encountered during event publication to a fault stream.
