---
title: remove (Function)
---

Function returns the updated list after removing the element with the specified value.

Syntax

    <OBJECT> list:remove(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

## Query Parameters

| Name  | Description                                     | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------|-------------------------------------------------|---------------|------------------------------------------|----------|---------|
| list  | The list that needs to be updated.              |               | OBJECT                                   | No       | Yes     |
| value | The value of the element that needs to removed. |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

## Example 1

    list:remove(stockSymbols, 'IBM')

This returns the updated list, stockSymbols after stockSymbols the value `IBM`.
