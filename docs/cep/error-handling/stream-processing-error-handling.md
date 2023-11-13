---
sidebar_position: 40
title: Stream Processing Error Handling
---

By implementing the `OnError.action` property in a stream definition, any errors that occur during the processing of events can be captured and redirected to a fault stream automatically.

The following actions are supported for error handling at stream:

- `log` - Logs the error, and drops the message.
- `stream` - Forward the error and the event to fault stream. This stream, indicated as `!<StreamName>`, is created implicitly and captures both the event that led to the error and the error details. A fault stream will be composed of the base stream’s attributes, plus an `_error` attribute containing error details.

## Fault Stream Concept

A fault stream is an implicit stream created when the `OnError.action='stream'` property is applied. This fault stream captures both the event and the error details, allowing for further processing or logging.

```sql
CREATE STREAM <stream name> WITH (type='<source type>', OnError.action='<action>', <other properties>) (<attribute name> <attribute type>, ...);
```

## Example: Stream Function Error Handling

```sql
-- Stream definition with error handling property
CREATE STREAM ProcessingStream WITH (type='inMemory', map.type='passthrough', OnError.action='stream') (data string);

-- Implicitly created fault stream for error capture
CREATE STREAM !ProcessingStream (data string, _error object);

-- Sample function that could generate an error
CREATE FUNCTION ProcessData[dataType] return string {
    // Processing logic here
};

-- Inserting into the processing stream
INSERT INTO ProcessingStream
SELECT payload
FROM InputStream;

-- Applying the function and handling errors
INSERT INTO OutputStream
SELECT ProcessData(data)
FROM ProcessingStream;

-- Redirecting errors to the fault stream
INSERT INTO ErrorStream
SELECT data, _error
FROM !ProcessingStream;
```

In this example, the `OnError.action='stream'` property is set for the `ProcessingStream`, which ensures that any errors in the `ProcessData` function result in the event being redirected to `!ProcessingStream`, the fault stream.
