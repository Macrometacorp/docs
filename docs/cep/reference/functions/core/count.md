---
title: count (Aggregate Function)
---

Returns the count of all the events.

Syntax

```js
    <LONG> count()
    <LONG> count(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg)
```

QUERY PARAMETERS

| Name | Description                                                                           | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|---------------------------------------------------------------------------------------|---------------|------------------------------------------|----------|---------|
| arg  | This function accepts one parameter. It can belong to any one of the available types. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | Yes      | Yes     |

## Example 1

```js
    insert into barStream
    select count() as count
    from fooStream WINDOW TUMBLING_TIME(10 sec);
```

This returns the count of all the events for time batch in 10 seconds.