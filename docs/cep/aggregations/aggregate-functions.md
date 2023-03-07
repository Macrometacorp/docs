---
sidebar_position: 30
title: Aggregate Functions
---

Aggregate functions are pre-configured aggregation operations that can consumes zero, or more parameters from multiple events and always produce a single value as result. They can be only used in the query projection as part of the `SELECT` clause.

When a query includes a window, the aggregation will be contained to the events in the window, and when it does not have a window, the aggregation is performed from the first event the query has received.

## Purpose

Aggregate functions encapsulate pre-configured reusable aggregate logic allowing users to aggregate values of multiple events together. When used with batch (tumbling) windows, this can also help to reduce the number of output events produced.  

## Syntax

Aggregate function can be used in query projection (as part of the `SELECT` clause) alone or as a part of another expression. In all cases, the output produced by the query should be properly mapped to the output stream attribute using the `AS` keyword.

The syntax of an aggregate function is:

```sql
INSERT INTO <output stream>
SELECT <aggregate function>(<parameter>, <parameter>, ... ) AS <attribute name>, <attribute2 name>, ...
FROM <input stream> WINDOW <window name>(<parameter>, <parameter>, ... );
```

Here `<aggregate function>` uniquely identifies the aggregate function. The `<parameter>` defines input parameters the aggregate function can accept. The input parameters can be attributes, constant values, results of other functions or aggregate functions, results of mathematical or logical expressions, or time values. The number and type of parameters an aggregate function accepts depend on the function itself.

You can also create _named aggregations_. For more information, refer to [Named Aggregations](../aggregations/).

## Aggregate Functions

This table provides links to some built-in aggregation functions:

| Aggregate Function | Description |
| --- | --- |
| and | Calculates boolean and from a set of values. |
| avg | Calculates the average from a set of values. |
| count | Calculates the count from a set of values. |
| distinctcount | Calculates the distinct count based on a parameter from a set of values. |
| max | Finds the maximum value from a set of values. |
| maxForever | Finds the maximum value from all events throughout its lifetime irrespective of the windows. |
| min | Finds the minimum value from a set of values. |
| minForever | Finds the minimum value from all events throughout its lifetime irrespective of the windows. |
| or | Calculates boolean or from a set of values. |
| stddev | Calculates the standard deviation from a set of values. |
| sum | Calculates the sum from a set of values. |
| unionSet | Calculates union as a Set from a set of values. |

## Example

```sql
INSERT INTO AvgTempStream
SELECT avg(temp) AS avgTemp, max(temp) AS maxTemp, min(temp) AS minTemp
FROM TempStream WINDOW sliding_time(10 min);
```

Query to calculate the average, maximum, and minimum values on `temp` attribute of the `TempStream` in a sliding manner, from the events arrived over the last 10 minutes and to produce outputs `avgTemp`, `maxTemp`, and `minTemp` respectively to the `AvgTempStream` output stream.
