---
title: instanceOfLong (Function)
---

Checks whether the parameter is an instance of Long or not.

## Syntax

    <BOOL> instanceOfLong(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg)

## Query Parameters

| Name | Description                  | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|------------------------------|---------------|------------------------------------------|----------|---------|
| arg  | The parameter to be checked. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

## Example 1

```sql
insert into barStream
select instanceOfLong(value) as state
from fooStream;
```

This returns `true` if the value field format is long ex: 56456l.

## Example 2

```sql
insert into barStream
select instanceOfLong(switchState) as state
from fooStream;
```

If the `switchState` is `true`, this returns `false` because the value is a Boolean and not a long.
