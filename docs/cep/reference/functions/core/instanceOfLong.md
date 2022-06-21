---
title: instanceOfLong (Function)
---

Checks whether the parameter is an instance of Long or not.

Syntax

    <BOOL> instanceOfLong(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg)

## Query Parameters

| Name | Description                  | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|------------------------------|---------------|------------------------------------------|----------|---------|
| arg  | The parameter to be checked. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

## Example 1

```js
    insert into barStream
    select instanceOfLong(value) as state
    from fooStream;
```
This returns true if the value field format is long ex : 56456l.

## Example 2
```js
    insert into barStream
    select instanceOfLong(switchState) as state
    from fooStream;
```

If the switchState is True, this returns False because the value is a Boolean and not a Long.