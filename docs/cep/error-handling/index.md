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

### Supported Sink Types

The following sinks and sources support error handling:

- database
- stream
- table
- jms
- http
- queryworker