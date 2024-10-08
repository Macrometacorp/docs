---
sidebar_position: 1
title: Stream Worker Basics
---

Stream workers are complex event processors that allow you to process streams of events and query them in real time.

If you are new to stream workers, this section explains in basic terms what stream workers are, how they work, and what the required and optional parts of a stream worker are.

If you haven't already, check out [Getting Started with Stream Workers](../getting-started-stream-workers.md) for a quick introduction.

## Unique Name Requirements

All the elements such as streams, tables, triggers, functions, window, sink, sources, query workers, and indexes must be defined with unique names.

For example, If you want to create two separate indexes with the same name in for different tables, the stream workers will not allow it, informing you that there’s another index element with the same name.

## Best Practices

Best practice is to keep stream worker functionality limited to one business use case per stream worker. Additionally, stream workers can use shared sinks and sources to reduce code duplication and improve maintainability.

<DocCardList />
