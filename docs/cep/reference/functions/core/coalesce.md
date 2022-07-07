---
title: coalesce (Function)
---

Returns the value of the first input parameter that is not null, and all input parameters have to be on the same type.

Syntax

```js
    <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> coalesce(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg, <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> ...)
```

QUERY PARAMETERS

| Name | Description                                                                                                                                               | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|------------------------------------------|----------|---------|
| arg  | This function accepts one or more parameters. They can belong to any one of the available types. All the specified parameters should be of the same type. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

## Example 1

```js
    insert into barStream
    select coalesce('123', null, '789') as value
    from fooStream;
```

This returns first value `123`.


## Example 2

```js
    insert into barStream
    select coalesce(null, 76, 567) as value
    from fooStream;
```

This returns first value `76`.

## Example 3

```js
    insert into barStream
    select coalesce(null, null, null) as value
    from fooStream;
```

This returns null as there are no valid values.