---
sidebar_position: 1
title: Error Handling
---

Errors in stream apps can be handled at the source and in the sinks.

## Errors at Source

The source requires only OnError(action='...').

### Supported Source Types

??? ask Stoyan

## Errors at Sink

The sink requires OnError(action='...'), on.error and additionally the extension has to support error handling.

Sometimes external systems become unavailable or coursing errors occur when the events are published. By default sinks log and drop the events causing event losses.

You can make a stream worker handle unexpected events gracefully by adding `@OnError(action='...')` before the sink and `on.error='action'` to the `WITH()` property for creating a sink.

### Supported Sink Types

The following sinks support error handling:

- database
- stream
- table
- jms
- http
- queryworker