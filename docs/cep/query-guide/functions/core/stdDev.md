---
title: stdDev (Aggregate Function)
---

Returns the calculated standard deviation for all the events.

## Syntax

```sql
<DOUBLE> stdDev(<INT|LONG|DOUBLE|FLOAT> arg)
```

## Query Parameters

| Name | Description                                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| arg  | The value that should be used to calculate the standard deviation. |               | INT LONG DOUBLE FLOAT | No       | Yes     |

## Example

```sql
INSERT INTO outputStream
SELECT stddev(temp) AS stdTemp
FROM inputStream;
```

`stddev(temp)` returns the calculated standard deviation of temp for all the events based on their arrival and expiration.
