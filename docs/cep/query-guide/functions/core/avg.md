---
title: avg (Aggregate Function)
---

Calculates the average for all the events.

## Syntax

```sql
<DOUBLE> avg(<INT|LONG|DOUBLE|FLOAT> arg)
```

## Query Parameters

| Name | Description       | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------|---------------|-----------------------|----------|---------|
| arg  | The value that need to be averaged. |             | INT LONG DOUBLE FLOAT | No       | Yes     |

## Example

```sql
@info(name = 'query1')
INSERT INTO barStream
SELECT AVG(temp) AS avgTemp
FROM fooStream WINDOW TUMBLING_TIME;
```

This query processes records from the `fooStream` collection using a tumbling time-based window. For each window, it calculates the average of the `temp` values using the `AVG` function. The result is aliased as `avgTemp` and inserted into the `barStream`.

Essentially, this query computes the average temperature for each time-based window of records in the `fooStream` and inserts the resulting average value into the `barStream`.
