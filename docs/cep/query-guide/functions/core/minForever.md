---
title: minForever (Aggregate Function)
---

This is the attribute aggregator to store the minimum value for a given attribute throughout the lifetime of the query regardless of any windows.

## Syntax

```sql
<INT|LONG|DOUBLE|FLOAT> minForever(<INT|LONG|DOUBLE|FLOAT> arg)
```

## Query Parameters

| Name | Description         | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------|---------------|-----------------------|----------|---------|
| arg  | The value that needs to be compared to find the minimum value. |        | INT LONG DOUBLE FLOAT | No       | Yes     |

## Example

```sql
@info(name = 'query1')
INSERT INTO outputStream
SELECT minForever(temp) AS min
FROM inputStream;
```

This query, named 'query1', calculates the minimum temperature (`min`) encountered in the `inputStream` since the start of the stream processing using the `minForever(temp)` function. The resulting minimum temperature is then inserted into the `outputStream`.

Essentially, this query processes records in the `inputStream`, calculates the minimum temperature seen so far, and then creates new records in the `outputStream` with the calculated `min` value.
