---
sidebar_position: 10
title: How Stream Workers Work
---

## Architecture

The architecture of Macrometa stream processing engine fits this natural flow. Following are the major components of our stream processing engine.

![Stream Processing Architecture](/img/cep-overview.png)

The stream processing engine receives data event-by-event and processes them in real-time to produce meaningful information i.e.,

- Accept event inputs from many different types of sources.
- Process them to transform, enrich, and generate insights.
- Publish them to multiple types of sinks.

To use stream processor, you need to write the processing logic as a stream application using streaming SQL language which is discussed in the [Stream Query Guide](../query-guide/).

When the stream application is published, it:

1. Consumes data one-by-one as events.
2. Pipe the events to queries through various streams for processing.
3. Generates new events based on the processing done at the queries.
4. Finally, sends newly-generated events through output to streams.

Best practice is to keep stream worker functionality limited to one business use case per stream worker. Additionally, stream workers can use shared sinks and sources to reduce code duplication and improve maintainability.

## Stream Worker Flow Diagram

The following diagram depicts some of the key Stream QL elements of Stream Application and how events flow through the elements.

![Event Flow](/img/event-flow.png?raw=true "Event Flow")