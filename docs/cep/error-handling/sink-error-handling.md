---
sidebar_position: 30
title: Error Handling at Sink
---

Handling errors in sinks is crucial when external systems become unavailable or errors occur during event publication. The `OnError.action='stream'` property provides a standardized approach to manage these errors.

## OnError.action Property

Apply the `OnError.action='stream'` property to a sink to redirect errors to a fault stream. This stream, indicated as `!<StreamName>`, is created implicitly and captures both the event that led to the error and the error details.

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

Refer to [Wait and Retry Example](wait-and-retry-example.md) for a scenario where this property is implemented to handle connection interruptions.
