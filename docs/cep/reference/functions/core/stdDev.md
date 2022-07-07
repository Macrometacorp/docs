---
title: stdDev (Aggregate Function)
---

Returns the calculated standard deviation for all the events.

Syntax

```js
    <DOUBLE> stdDev(<INT|LONG|DOUBLE|FLOAT> arg)
```

QUERY PARAMETERS

| Name | Description                                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| arg  | The value that should be used to calculate the standard deviation. |               | INT LONG DOUBLE FLOAT | No       | Yes     |

## Example 1

```js
    insert into outputStream
    select stddev(temp) as stdTemp
    from inputStream;
```

stddev(temp) returns the calculated standard deviation of temp for all the events based on their arrival and expiration.