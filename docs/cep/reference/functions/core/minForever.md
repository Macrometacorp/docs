---
title: minForever (Aggregate Function)
---

This is the attribute aggregator to store the minimum value for a given attribute throughout the lifetime of the query regardless of any windows.

Syntax

```js
    <INT|LONG|DOUBLE|FLOAT> minForever(<INT|LONG|DOUBLE|FLOAT> arg)
```

QUERY PARAMETERS

| Name | Description                                                    | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| arg  | The value that needs to be compared to find the minimum value. |               | INT LONG DOUBLE FLOAT | No       | Yes     |

## Example 1

```js
    insert into outputStream
    select minForever(temp) as max
    from inputStream;
```

minForever(temp) returns the minimum temp value recorded for all the events throughout the lifetime of the query.