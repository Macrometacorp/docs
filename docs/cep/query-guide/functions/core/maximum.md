---
title: maximum (Function)
---

Returns the maximum value of the input parameters.

## Syntax

```sql
<INT|LONG|DOUBLE|FLOAT> maximum(<INT|LONG|DOUBLE|FLOAT> arg, <INT|LONG|DOUBLE|FLOAT> ...)
```

## Query Parameters

| Name | Description   | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------|------------|----------------|----------|---------|
| arg  | This function accepts one or more parameters. They can belong to any one of the available types. All the specified parameters should be of the same type. |          | INT LONG DOUBLE FLOAT | No       | Yes     |

## Example

```sql
@info(name = 'query1')
FROM inputStream
INSERT INTO outputStream
SELECT maximum(price1, price2, price3) AS max;
```

This query, named 'query1', calculates the maximum value among `price1`, `price2`, and `price3` fields in each record from the `inputStream` using the `maximum(price1, price2, price3)` function. The resulting maximum value is then inserted into the `outputStream` as the `max` field.

Essentially, this query processes records in the `inputStream`, calculates the maximum value among the three price fields, and creates new records in the `outputStream` with the calculated `max` value.
