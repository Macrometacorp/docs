---
title: isMap (Function)
---

Function checks if the object is type of a map.

Syntax

    <BOOL> map:isMap(<OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> arg)

## Query Parameters

| Name | Description                                                        | Default Value | Possible Data Types                            | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|------------------------------------------------|----------|---------|
| arg  | The argument the need to be determined whether it's a map or not. |               | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | No       | Yes     |

## Example 1

    map:isMap(stockDetails)

Returns `true` if the stockDetails is and an instance of `java.util.Map` else it returns `false`.
