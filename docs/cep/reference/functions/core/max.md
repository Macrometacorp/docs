---
title: max (Aggregate Function)
---

Returns the maximum value for all the events.

Syntax

```js
    <INT|LONG|DOUBLE|FLOAT> max(<INT|LONG|DOUBLE|FLOAT> arg)
```

QUERY PARAMETERS

| Name | Description                                                    | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| arg  | The value that needs to be compared to find the maximum value. |               | INT LONG DOUBLE FLOAT | No       | Yes     |

## Example 1

```js
    insert into barStream
    select max(temp) as maxTemp
    from fooStream WINDOW TUMBLING_TIME(10 sec);
```

max(temp) returns the maximum temp value recorded for all the events based on their arrival and expiration.