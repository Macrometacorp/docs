---
title: convert (Function)
---

Converts the first input parameter according to the `convertedTo` parameter.

Syntax

```js
    <INT|LONG|DOUBLE|FLOAT|STRING|BOOL> convert(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> to.be.converted, <STRING> converted.to)
```

QUERY PARAMETERS

| Name            | Description                                                                                                                                                                             | Default Value | Possible Data Types                      | Optional | Dynamic |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|------------------------------------------|----------|---------|
| to.be.converted | This specifies the value to be converted.                                                                                                                                               |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |
| converted.to    | A string constant parameter to which type the attribute need to be converted using one of the following strings values: `int`, `long`, `float`, `double`, `string`, `bool`. |               | STRING                                   | No       | Yes     |

## Example 1

```js
    insert into barStream
    select convert(temp, 'double') as temp
    from fooStream;
```

This converts fooStream temp value into `double`.

## Example 2

```js
    insert into barStream
    select convert(temp, 'int') as temp
    from fooStream;
```

This converts fooStream temp value into `int` (value = "convert(45.9, `int`) and returns 46.