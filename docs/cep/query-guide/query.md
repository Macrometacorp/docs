---
sidebar_position: 20
title: Query
---

A _stream worker query_ defines the processing logic in stream workers. A query consumes events from one or more:

- [Sources](../source/)
- [Named Windows](../windows/)
- [Tables](../table/)
- [Named Aggregations](../aggregations/)

The query then processes the events in a streaming manner and generates output events into one or more:

- [Sinks](../sink/)
- [Named Windows](../windows/)
- [Tables](../table/)

## Purpose

A query provides a way to process the events in the order they arrive and produce output using both stateful and stateless complex event processing and stream processing operations.

## Syntax

The high-level query syntax for defining processing logics is as follows:

```sql
@name('<query name>')
<OUTPUT ACTION>
<projection>
FROM <input>
<grouping clauses>
```

## Query Parameters

The following parameters are used to configure a stream definition.

| Parameter  | Description |
|----------------|-------------|
| `query name`   | The name of the query. Since naming the query (i.e the `@name('<query name>')` annotation) is optional, when the name is not provided, Macrometa assigns a system-generated name for the query. |
| `OUTPUT ACTION` | Defines output action (such as `INSERT INTO`, `UPDATE`, `DELETE`, and so on) that needs to be performed by the generated events on a stream, named window, or table.  |
| `projection`   | Generates output event attributes using `SELECT`, functions, and aggregation functions, and filters the generated the output operations before sending them out. The projection is optional, and when it is left out, all the input events are sent to the output as-is. |
| `FROM <input>`        | Defines the means of event consumption via streams, named windows, tables, and/or named-aggregations, and defines the processing logic. |
| `grouping clauses` | `GROUP BY` functions to group and organize output.  |

## Example 1

A query consumes events from the `TempStream` stream and output only the `roomNo` and `temp` attributes to the `RoomTempStream` stream, from which another query consumes the events and sends all its attributes to `AnotherRoomTempStream` stream.

```sql
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

INSERT INTO RoomTempStream
SELECT roomNo, temp
FROM TempStream;

INSERT INTO AnotherRoomTempStream
FROM RoomTempStream;
```

In this example, the `RoomTempStream` and `AnotherRoomTempStream` streams are an inferred streams, which means their stream definitions are inferred from the queries and they can be used same as any other defined stream without any restrictions.  

## Example 2

```sql
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

CREATE SINK OutputStream WITH (type='stream', stream='OutputStream', map.type='json') (roomNo int, avgTemp double);

INSERT INTO OutputStream
SELECT roomNo, avg(temp) AS avgTemp
FROM TempStream
GROUP BY roomNo;
```

This query takes the `roomNo` and `temp` values from TempStream, averages the temperatures, groups them by room number, outputs them into OutputStream.
