---
title: default (Function)
---

Checks if the `attribute` parameter is null and if so returns the value of the `default` parameter

Syntax

```js
    <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> default(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> attribute, <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> default)
```

## Query Parameters

| Name      | Description                                                              | Default Value | Possible Data Types                      | Optional | Dynamic |
|-----------|--------------------------------------------------------------------------|---------------|------------------------------------------|----------|---------|
| attribute | The attribute that could be null.                                        |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |
| default   | The default value that will be used when `attribute` parameter is null |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

## Example 1

```js
    insert into StandardTempStream
    select default(temp, 0.0) as temp, roomNum
    from TempStream;
```

This replaces TempStream's temp attribute with default value if the temp is null.