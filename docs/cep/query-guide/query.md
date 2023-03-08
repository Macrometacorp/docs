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
| `projection`   | Generates output event attributes using `SELECT`, functions, and aggregation functions, and filters the generated the output operations before sending them out. The projection is optional, and when it is left out, all the input events are sent to the output as-is. For more information, refer to [Query Projections](#query-projections). |
| `FROM <input>`        | Defines the means of event consumption via streams, named windows, tables, and/or named-aggregations, and defines the processing logic. |
| `grouping clauses` | `GROUP BY` functions to group and organize output. For more information, refer to [GROUP BY](group-by).  |

## Query Output

Order of queries based on their output can drastically affect how your stream worker behaves.

In general, have queries that insert data into windows or aggregations before queries that insert data into tables.

## Query Projections

Query projection allow you to filter and transform streaming data by choosing which fields or attributes of a data stream you want to include or exclude in query results. By selecting only the necessary fields and performing any necessary calculations or aggregations, query projection can help to reduce the amount of data that needs to be processed and improve the overall performance of streaming applications.

In Macrometa stream worker queries, projection is specified using the `SELECT` clause. This clause is used to select a subset of fields from the incoming data stream and return them in the query results. The `SELECT` clause can also be used to perform transformations on the selected fields, such as aggregations or calculations.

Here are some examples things you can do with query projections in Macrometa stream workers.

### Select All Fields or Specific Fields

Select some or all fields from the input stream to be inserted into an output stream.

For example, to select only the `name` and `age` fields from a stream of customer data, you could use the following query:

```sql
INSERT INTO OutputStream
SELECT name, age
FROM customers;
```

You can select all attributes in an input stream by using an asterisk (*) wildcard or by omitting the `SELECT` statement.

```sql
INSERT INTO OutputStream
SELECT *
FROM InputStream;
```

Or use:

```sql
INSERT INTO OutputStream
FROM InputStream;
```

### Rename Attributes

Select attributes from an input stream and insert them into the output stream with different names.

For example, this query renames `roomNo` to `roomNumber` and `temp` to `temperature`.

```sql
INSERT INTO OutputStream
SELECT roomNo AS roomNumber, temp AS temperature
FROM InputStream;
```

### Introduce Constant Values

You can add constant values by assigning them to an attribute using `as`.

For example, this query specifies `C` to be used as the constant value for `scale` attribute.

```sql
INSERT INTO OutputStream
SELECT roomNo, temp, 'C' AS scale
FROM InputStream;
```

### Filter by Field Value

You can use the `WHERE` or `HAVING` clauses to filter the incoming data stream based on a specific field value.

For example, to select only customer data where the `age` field is greater than 30, you could use the following query:

```sql
INSERT INTO OutputStream
SELECT * 
FROM InputStream 
WHERE age > 30;
```

For more information, refer to [HAVING | WHERE](having-where.md).

### Use Expressions

You can use attributes with mathematical and logical expressions in the precedence order given below, and assigns them to the output attribute using `AS`.

#### Expression Example

Convert Celsius to Fahrenheit and identify rooms with room numbers between 10 and 15 as server rooms.

```sql
INSERT INTO OutputStream
SELECT roomNo, temp * 9/5 + 32 AS temp, 'F' AS scale, roomNo > 10 AND roomNo < 15 AS isServerRoom
FROM InputStream;
```

#### Operator Precedence Order

| Operator  | Distribution      | Example              |
| --------- | ----------------- | -------------------- |
| ()        | Scope                   | (cost + tax) \* 0.05                            |
| IS NULL   | Null check              | deviceID is null                                |
| NOT       | Logical NOT             | not (price > 10)                                |
| \* / %    | Multiplication, division, modulo                                          | temp \* 9/5 + 32                                |
| \+ -      | Addition, subtraction  | temp \* 9/5 - 32                                |
| < <= > >= | Comparators: less-than, greater-than-equal, greater-than, less-than-equal | totalCost >= price \* quantity                  |
| \== !=    | Comparisons: equal, not equal                                             | totalCost !=  price \* quantity                 |
| IN        | Contains in table       | roomNo in ServerRoomsTable                      |
| AND       | Logical AND             | temp < 40 and (humidity < 40 or humidity >= 60) |
| OR        | Logical OR              | temp < 40 or (humidity < 40 and humidity >= 60) |

### Aggregate Data

You can use aggregation functions like `sum`, `avg`, `min`, and `max` to perform calculations on the incoming data stream. 

For example, to calculate the average age of customers in the stream, you could use the following query:

```sql
INSERT INTO OutputStream
SELECT AVG(age)
FROM customers;
```

For more information about aggregating data, refer to [Named Aggregations](../aggregations/) and [Windows](../windows/).

### Perform Joins

Joining multiple streams: You can use the "JOIN" clause to combine data from multiple streams into a single query result. For example, to join a stream of customer data with a stream of sales data, you could use the following query:

SELECT * FROM customers JOIN sales ON customers.id = sales.customer_id;

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

## Example 3

This example provides an example of streams and queries, and how multiple queries can be chained to one another.

### Stream Worker Code

```sql
-- Defines `InputTemperatureStream` stream to pass events having `sensorId` and `temperature` attributes of types `string` and `double`.
CREATE STREAM InputTemperatureStream (sensorId string, temperature double);

-- Optional `@info` annotation to name the query.
@info(name = 'Pass-through')

-- Query to consume events from `InputTemperatureStream`, produce new events by selecting all the attributes from the incoming events, and outputs them to `TemperatureStream`.
INSERT INTO TemperatureAndSensorStream
SELECT *
FROM InputTemperatureStream;

@info(name = 'Simple-selection')

-- Selects only the `temperature` attribute from events, and outputs to `TemperatureOnlyStream`.
-- Consumes events from `TemperatureAndSensorStream`. The schema of the stream is inferred from the previous query, hence no need to be defined.
INSERT INTO TemperatureOnlyStream
SELECT temperature
FROM TemperatureAndSensorStream;
```

### Events at Each Stream

When an event with values [`'aq-14'`, `35.4`] is sent to `InputTemperatureStream` stream, it is converted and travels through the streams as below.

- InputTemperatureStream : [`'aq-14'`, `35.4`]
- TemperatureAndSensorStream : ['aq-14', `35.4`]
- TemperatureOnlyStream : [`35.4`]