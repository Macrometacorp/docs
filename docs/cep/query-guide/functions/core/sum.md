---
title: sum (Aggregate Function)
---

Returns the sum for all the events.

## Syntax

    <LONG|DOUBLE> sum(<INT|LONG|DOUBLE|FLOAT> arg)

## Query Parameters

| Name | Description                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------|---------------|-----------------------|----------|---------|
| arg  | The value that needs to be summed. |               | INT LONG DOUBLE FLOAT | No       | Yes     |

## Example

```sql
insert into outputStream
select sum(volume) as sumOfVolume
from inputStream;
```

This returns the sum of volume values as a long value for each event arrival and expiration.
