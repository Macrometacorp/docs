---
title: sum (Aggregate Function)
---

Returns the sum for all the events.

## Syntax

```sql
<LONG|DOUBLE> sum(<INT|LONG|DOUBLE|FLOAT> arg)
```

## Query Parameters

| Name | Description                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------|---------------|-----------------------|----------|---------|
| arg  | The value that needs to be summed. |               | INT LONG DOUBLE FLOAT | No       | Yes     |

## Example

```sql
@info(name = 'query1')
INSERT INTO outputStream
SELECT sum(volume) AS sumOfVolume
FROM inputStream;
```

This query, named 'query1', processes records from the `inputStream` and calculates the sum of the `volume` values using the `sum(volume)` function. The resulting value, named `sumOfVolume`, represents the total volume and is inserted into the `outputStream`.

Essentially, this query processes records in the `inputStream` and creates new records in the `outputStream` containing the sum of the volume values.
