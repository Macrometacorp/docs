---
title: max (Aggregate Function)
---

Returns the maximum value for all the events.

## Syntax

```sql
<INT|LONG|DOUBLE|FLOAT> max(<INT|LONG|DOUBLE|FLOAT> arg)
```

## Query Parameters

| Name | Description             | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------|---------------|-----------------------|----------|---------|
| arg  | The value that needs to be compared to find the maximum value. |               | INT LONG DOUBLE FLOAT | No       | Yes     |

## Example

```sql
INSERT INTO barStream
SELECT max(temp) AS maxTemp
FROM fooStream WINDOW TUMBLING_TIME(10 sec);
```

This query calculates the maximum temperature (`maxTemp`) within a tumbling time window of 10 seconds from the `fooStream`. The tumbling time window groups records into non-overlapping, fixed-size time intervals. In this case, the time interval is 10 seconds. The maximum temperature within each interval is then inserted into the `barStream`.

Essentially, this query processes records in the `fooStream`, calculates the maximum temperature within each 10-second time window, and then creates new records in the `barStream` with the calculated `maxTemp` value.
