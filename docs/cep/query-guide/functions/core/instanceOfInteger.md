---
title: instanceOfInteger (Function)
---

Checks whether the parameter is an instance of Integer or not.

Syntax

    <BOOL> instanceOfInteger(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg)

## Query Parameters

| Name | Description                  | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|------------------------------|---------------|------------------------------------------|----------|---------|
| arg  | The parameter to be checked. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

## Example 1

```js
    insert into barStream
    select instanceOfInteger(value) as state
    from fooStream;
```

This returns true if the value field format is integer.

## Example 2

```js
    insert into barStream
    select instanceOfInteger(switchState) as state
    from fooStream;
```

If switchState is True, this returns false as the value is not an integer.