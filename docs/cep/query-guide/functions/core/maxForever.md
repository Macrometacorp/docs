---
title: maxForever (Aggregate Function)
---

This is the attribute aggregator to store the maximum value for a given attribute throughout the lifetime of the query regardless of any windows in front.

## Syntax

```sql
<INT|LONG|DOUBLE|FLOAT> maxForever(<INT|LONG|DOUBLE|FLOAT> arg)
```

## Query Parameters

| Name | Description         | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------|---------------|-----------------------|----------|---------|
| arg  | The value that needs to be compared to find the maximum value. |               | INT LONG DOUBLE FLOAT | No       | Yes     |

## Example

```sql
@info(name = 'query1')
INSERT INTO outputStream
SELECT maxForever(temp) AS max
FROM inputStream;
```

This query calculates the maximum temperature (`max`) encountered in the `inputStream` since the start of the stream processing using the `maxForever(temp)` function. The resulting maximum temperature is then inserted into the `outputStream`.

Essentially, this query processes records in the `inputStream`, calculates the maximum temperature seen so far, and then creates new records in the `outputStream` with the calculated `max` value.
