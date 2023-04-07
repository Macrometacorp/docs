---
title: instanceOfFloat (Function)
---

Checks if the parameter is an instance of float or not.

## Syntax

    <BOOL> instanceOfFloat(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg)

## Query Parameters

| Name | Description                  | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|------------------------------|---------------|------------------------------------------|----------|---------|
| arg  | The parameter to be checked. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

## Example 1

```sql
insert into barStream
select instanceOfFloat(value) as state
from fooStream;
```

This returns `true` if the value field format is float ex: 56.45f.

## Example 2

```sql
insert into barStream
select instanceOfFloat(switchState) as state
from fooStream;
```

If the `switchState = true`, then this returns `false` as the value is not a float.
