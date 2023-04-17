---
title: stdDev (Aggregate Function)
---

Returns the calculated standard deviation for all the events.

## Syntax

```sql
<DOUBLE> stdDev(<INT|LONG|DOUBLE|FLOAT> arg)
```

## Query Parameters

| Name | Description           | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------|---------------|-----------------------|----------|---------|
| arg  | The value that should be used to calculate the standard deviation. |               | INT LONG DOUBLE FLOAT | No       | Yes     |

## Example

```sql
@info(name = 'query1')
INSERT INTO outputStream
SELECT stddev(temp) AS stdTemp
FROM inputStream;
```

This query, named 'query1', processes records from the `inputStream` and calculates the standard deviation of the `temp` values using the `stddev(temp)` function. The resulting value, named `stdTemp`, represents the standard deviation of the temperature and is inserted into the `outputStream`.

Essentially, this query processes records in the `inputStream` and creates new records in the `outputStream` containing the standard deviation of the temperature values.
