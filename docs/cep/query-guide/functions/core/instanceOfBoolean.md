---
title: instanceOfBoolean (Function)
---

Checks whether the parameter is an instance of Boolean or not.

Syntax

    <BOOL> instanceOfBoolean(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg)

## Query Parameters

| Name | Description                  | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|------------------------------|---------------|------------------------------------------|----------|---------|
| arg  | The parameter to be checked. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

## Example 1

```js
    insert into barStream
    select instanceOfBoolean(switchState) as state
    from fooStream;
```
This returns true if the value of switchState is true.

## Example 2

```js
    insert into barStream
    select instanceOfBoolean(value) as state
    from fooStream;
```
if the value = 32 then this returns false as the value is not an instance of the boolean.