---
title: instanceOfDouble (Function)
---

Checks whether the parameter is an instance of Double or not.

Syntax

    <BOOL> instanceOfDouble(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg)

## Query Parameters

| Name | Description                  | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|------------------------------|---------------|------------------------------------------|----------|---------|
| arg  | The parameter to be checked. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

## Example 1
    insert into barStream
    select instanceOfDouble(value) as state
    from fooStream;

This returns true if the value field format is double ex : 56.45.

## Example 2

```js
    insert into barStream
    select instanceOfDouble(switchState) as state
    from fooStream;
```

If the switchState = true then this returns false as the value is not an instance of the double.