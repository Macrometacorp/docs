---
title: contains (Function)
---

Function checks whether the list contains the specific value.

Syntax

    <BOOL> list:contains(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

## Query Parameters

| Name  | Description                                                                | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------|----------------------------------------------------------------------------|---------------|------------------------------------------|----------|---------|
| list  | The list that needs to be checked on whether it contains the value or not. |               | OBJECT                                   | No       | Yes     |
| value | The value that needs to be checked.                                        |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

## Example 1

    list:contains(stockSymbols, 'IBM')

Returns `true` if the stockSymbols list contains value `IBM` else it returns `false`.
