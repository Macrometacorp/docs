---
title: min (Aggregate Function)
---

Returns the minimum value for all the events.

## Syntax

```sql
<INT|LONG|DOUBLE|FLOAT> min(<INT|LONG|DOUBLE|FLOAT> arg)
```

## Query Parameters

| Name | Description         | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------|---------------|-----------------------|----------|---------|
| arg  | The value that needs to be compared to find the minimum value. |       | INT LONG DOUBLE FLOAT | No   | Yes  |

## Example

```sql
@info(name = 'query1')
INSERT INTO outputStream
SELECT min(temp) AS minTemp
FROM inputStream;
```

This query, named 'query1', calculates the minimum temperature (`minTemp`) from the `inputStream` using the `min(temp)` function. The resulting minimum temperature is then inserted into the `outputStream`.

Essentially, this query processes records in the `inputStream`, calculates the minimum temperature, and then creates new records in the `outputStream` with the calculated `minTemp` value.
