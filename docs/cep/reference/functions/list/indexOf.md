---
title: indexOf (Function)
---

Function returns the last index of the given element.

Syntax

    <INT> list:indexOf(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

## Query Parameters

| Name  | Description                                        | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------|----------------------------------------------------|---------------|------------------------------------------|----------|---------|
| list  | The list to be checked to get index of an element. |               | OBJECT                                   | No       | Yes     |
| value | Value for which last index needs to be identified. |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

## Example 1

    list:indexOf(stockSymbols. `IBM`)

Returns the last index of the element `IBM` if present else it returns -1.
