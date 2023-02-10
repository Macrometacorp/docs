---
sidebar_position: 40
title:  Stream Worker Elements
---

The page below provides a brief description of all the potential parts of a stream worker.

## Event

An event is a single event object associated with a stream. All events of a stream contains a timestamp and an identical set of typed attributes based on the schema of the stream they belong to.

Events are part of a stream worker definition, they are what a stream worker consumes and processes.

## Metadata (Required)



## Source (Required)
[
[Source](../source/)    | A construct that consumes data from external sources (such as `database`, `stream`, `TCP`, `Kafka`, `HTTP`, etc) with various event formats such as `JSON`, `binary`, etc, convert then to stream events, and passes into streams for processing.

## Trigger
Trigger](../source/trigger)     | Triggers allow events to be periodically generated based on time or other conditions.

## Sink (Required)
[Sink](../sink/)      | A construct that consumes events arriving at a stream, maps them to a predefined data format (such as `JSON`, `binary`, etc), and publishes them to external endpoints (such as `E-mail`, `TCP`, `Kafka`, `HTTP`, etc).

## Stream

[Stream](../source/source-types/stream-source)   | A logical series of events ordered in time with a uniquely identifiable name, and a defined set of typed attributes defining its schema. Streams can be sources or sinks.

## Query (Required)
[Query](../query-guide/query)	    | A logical construct that processes events in a streaming manner by consuming data from one or more streams, tables, windows and aggregations, and publishes output events into a stream, table or a window.

Queries use functions and partitions
### Functions
### Partition

[Inner Stream](../query-guide/partition/inner-stream) | A positionable stream that connects portioned queries with each other within the partition.
[Partition](../query-guide/partition/)	| A logical container that isolates the processing of queries based on the partition keys derived from the events.

## Query Worker

## Named Window

[Named Window](../windows/)     | A structured representation of data stored with a defined schema and eviction policy. Window data is stored `In-Memory` and automatically cleared by the named window constrain. Other stream processor elements can only query the values in windows at runtime but they cannot modify them. 

## Named Aggregation

[Named Aggregation](../aggregations/)     | A structured representation of data that's incrementally aggregated and stored with a defined schema and aggregation granularity such as seconds, minutes, hours, etc. Aggregation data is stored in `database`. Other stream processor elements can only query the values in windows at runtime but they cannot modify them.

## Table

Collection and store

[Table](../query-guide/table-collection)     | A structured representation of data stored with a defined schema. Stored data is backed by C8DB. The tables (aka collections) can be `local` or `geo-replicated`. Similarly the tables can be `document` or `graph` collections. The tables can be accessed and manipulated at runtime.

Stream/Query Callback | A mechanism to programmatically consume output events from streams or queries. |
