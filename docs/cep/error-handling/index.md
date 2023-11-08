---
sidebar_position: 1
title: Error Handling
---

Stream workers in Macrometa Global Data Network handle errors at the source, in the stream processing, and at the sink.

## Errors at Source

Errors emitted by stream elements are managed by the `OnError.action='stream'` property within the stream definition. This property ensures that errors, along with the events that caused them, are sent to a fault stream, named using the `!<StreamName>` syntax.

For more information, refer to [Error Handling at Source](source-error-handling.md).

## Errors at Sink

For sinks, the same `OnError.action='stream'` property can be used to capture and handle errors. This ensures that any issues during the event publication process are properly logged and managed.

For more information, refer to [Error Handling at Sink](sink-error-handling.md).

## Errors in Stream Processing

The `OnError.action='stream'` property is also applicable to errors that occur within stream processing. It automatically redirects errors to a fault stream.

For more information, refer to [Error Handling in Stream Processing](stream-processing-error-handling.md).

## Errors in Table Operations

Errors that occur during table operations, such as insertions, deletions, or updates, are now handled by the `OnError.action='stream'` property. This ensures that any issues encountered during table operations are captured and directed to a fault stream specific to that table, indicated by `!<TableName>`.

For more information, refer to [Error Handling with Tables](table-error-handling.md).
