---
title: maxForever (Aggregate Function)
---

This is the attribute aggregator to store the maximum value for a given attribute throughout the lifetime of the query regardless of any windows in-front.

## Syntax

```sql
    <INT|LONG|DOUBLE|FLOAT> maxForever(<INT|LONG|DOUBLE|FLOAT> arg)
```

## Query Parameters

| Name | Description                                                    | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| arg  | The value that needs to be compared to find the maximum value. |               | INT LONG DOUBLE FLOAT | No       | Yes     |

## Example

```sql
    INSERT INTO outputStream
    SELECT maxForever(temp) AS max
    FROM inputStream;
```

`maxForever(temp)` returns the maximum temp value recorded for all the events throughout the lifetime of the query.
