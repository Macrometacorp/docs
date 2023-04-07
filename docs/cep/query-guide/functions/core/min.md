---
title: min (Aggregate Function)
---

Returns the minimum value for all the events.

## Syntax

```sql
    <INT|LONG|DOUBLE|FLOAT> min(<INT|LONG|DOUBLE|FLOAT> arg)
```

## Query Parameters

| Name | Description                                                    | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| arg  | The value that needs to be compared to find the minimum value. |               | INT LONG DOUBLE FLOAT | No       | Yes     |

## Example

```sql
insert into outputStream
select min(temp) as minTemp
from inputStream;
```

`min(temp)` returns the minimum temp value recorded for all the events based on their arrival and expiry.
