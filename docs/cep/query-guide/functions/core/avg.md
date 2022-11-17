---
title: avg (Aggregate Function)
---

Calculates the average for all the events.

Syntax

```js
    <DOUBLE> avg(<INT|LONG|DOUBLE|FLOAT> arg)
```

QUERY PARAMETERS

| Name | Description                         | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------|---------------|-----------------------|----------|---------|
| arg  | The value that need to be averaged. |               | INT LONG DOUBLE FLOAT | No       | Yes     |

## Example 1

```js
    insert into barStream
    select avg(temp) as avgTemp
    from fooStream WINDOW TUMBLING_TIME;
```

avg(temp) returns the average temp value for all the events based on their arrival and expiration.