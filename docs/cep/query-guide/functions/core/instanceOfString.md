---
title: instanceOfString (Function)
---

Checks whether the parameter is an instance of String or not.

Syntax

    <BOOL> instanceOfString(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg)

## Query Parameters

| Name | Description                  | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|------------------------------|---------------|------------------------------------------|----------|---------|
| arg  | The parameter to be checked. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

## Example 1

```js
    insert into barStream
    select instanceOfString(value) as state
    from fooStream;
```

This returns true if the value field format is string ex : `test`.

## Example 2

```js
    insert into barStream
    select instanceOfString(switchState) as state
    from fooStream;
```

If the switchState is True, this returns False because the value is not a string.