---
sidebar_position: 1
title: Error Handling
---

Errors in stream apps can be handled at the source and in the sinks.

## Errors at Source

When errors are thrown by elements subscribed to the source, the error is propagated up to the source that delivered the event to those stream worker. By default, the error is logged and dropped at the source, but this behavior can be altered by adding `@OnError(action='...')` before the source definition.

For more information, refer to [Error Handling at Source](source-error-handling.md).

## Errors at Sink

The sink requires OnError(action='...'), on.error and additionally the extension has to support error handling.

Sometimes external systems become unavailable or coursing errors occur when the events are published. By default sinks log and drop the events causing event losses.

You can make a stream worker handle unexpected events gracefully by adding `@OnError(action='...')` before the sink and `on.error='action'` to the `WITH()` property for creating a sink.

For more information, refer to [Error Handling at Sink](sink-error-handling.md).
