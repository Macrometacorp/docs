---
sidebar_position: 50
title: Distributed Sinks
---

Distributed sinks publish events from a defined sink to multiple endpoints using load balancing or partitioning strategies.

Any sink can be used as a distributed sink. A distributed sink configuration allows users to define a common mapping to convert
and send the stream events for all its destination endpoints.

## Purpose

Distributed sink provides a way to publish Stream events to multiple endpoints in the configured event format.

## Syntax

To configure a distributed sink, add the sink configuration to a stream definition by adding the `sink.type` property and add the configuration parameters that are common of all the destination endpoints inside it, along with the common parameters also add the `distribution.strategy` property specifying the distribution strategy (i.e. `roundRobin` or `partitioned`) and `destination` properties providing each endpoint specific configurations.

The distributed sink syntax is as follows:

### RoundRobin Distributed Sink

Publishes events to defined destinations in a round robin manner.

```sql
CREATE SINK <stream name> WITH (sink.type='<sink type>', <common.static.key>='<value>', <common.dynamic.key>='{{<value>}}', map.type='<map type>', <static.key>='<value>', <dynamic.key>='{{<value>}}', map.payload='<payload mapping>' distribution.strategy='roundRobin', destination.<key>='<value>', destination.<key>='<value>') (<attribute1> <type>, <attributeN> <type>);
```

### Partitioned Distributed Sink

Publishes events to defined destinations by partitioning them based on the partitioning key.

```sql
CREATE SINK <stream name> WITH (sink.type='<sink type>', <common.static.key>='<value>', <common.dynamic.key>='{{<value>}}', map.type='<map type>', <static.key>='<value>', <dynamic.key>='{{<value>}}', map.payload='<payload mapping>', distribution.strategy='partitioned', partitionKey='<partition key>', destination.<key>='<value>', destination.<key>='<value>') (<attribute1> <type>, <attributeN> <type>);
```
