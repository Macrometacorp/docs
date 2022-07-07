---
title: maximum (Function)
---

Returns the maximum value of the input parameters.

Syntax

    <INT|LONG|DOUBLE|FLOAT> maximum(<INT|LONG|DOUBLE|FLOAT> arg, <INT|LONG|DOUBLE|FLOAT> ...)

## Query Parameters

| Name | Description                                                                                                                                               | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| arg  | This function accepts one or more parameters. They can belong to any one of the available types. All the specified parameters should be of the same type. |               | INT LONG DOUBLE FLOAT | No       | Yes     |

## Example 1

```js
    @info(name = 'query1') from inputStream
    insert into outputStream
    select maximum(price1, price2, price3) as max;
```
This returns the maximum value of the input parameters price1,
price2, price3.