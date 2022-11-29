---
title: isList (Function)
---

Function checks if the object is type of a list.

Syntax

    <BOOL> list:isList(<OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> arg)

## Query Parameters

| Name | Description                                                         | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|---------------------------------------------------------------------|---------------|------------------------------------------|----------|---------|
| arg  | The argument the need to be determined whether it`s a list or not. |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

## Example 1

    list:isList(stockSymbols)

Returns `true` if the stockSymbols is and an instance of `java.util.List` else it returns `false`.
