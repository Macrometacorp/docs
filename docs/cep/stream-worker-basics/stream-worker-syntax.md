---
sidebar_position: 20
title: Stream Worker Syntax
---

This page explains the most basic syntax of stream workers and provides examples.

## High-Level Syntax

The high-level syntax of stream worker is as follows:

```js
<stream worker>  :
        <worker annotation> *
        ( <stream definition> | <table definition> | ... ) +
        ( <query> | <partition> ) +
        ;
```

## Required Elements

There are four elements required in a stream worker. For more information about stream worker elements, refer to [Stream Worker Elements](stream-worker-elements).

- _Metadata_ to provide information like the stream worker name.
- At least one [source](../source/) of incoming events, such as a [stream](../source/stream-source), [kafka](../source/source-types/kafka), or [http](../source/source-types/http).
- At least one [sink](../sink/) to receive processed data, such as a [stream](../sink/sink-types/stream-sink), [http](../sink/sink-types/http), or [s3](../sink/sink-types/s3).
- At least one query to process incoming events. For more information about queries, refer to [Stream Worker Queries](../query-guide/).

## Syntax Example

In this example, a stream worker with the name `Temperature-Analytics` creates a stream named `TempStream` and a query named `5minAvgQuery`.

Stream workers are named by adding `@app:name('<name>')` annotation on the top of the stream worker spec. When the annotation is not added, Macrometa assigns a random UUID as the name of the stream worker.

Each required element is labeled with comments.

```sql
-- Metadata with name, description, and query language version.
@App:name("Temperature-Analytics")
@App:description("This stream worker creates a stream and query.")
@App:qlVersion("2")

-- Source is a stream.
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

-- Sink is a stream.
CREATE SINK STREAM OutputStream (roomNo int, avgTemp double);

-- Query for processing events.
@name('5minAvgQuery')
INSERT INTO OutputStream
SELECT roomNo, avg(temp) as avgTemp
FROM TempStream WINDOW SLIDING_TIME(5 min)
GROUP BY roomNo;
```
