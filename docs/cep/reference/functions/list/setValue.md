---
title: setValue (Function)
---

Function returns the updated list after replacing the element in the given index by the given value.

Syntax

    <OBJECT> list:setValue(<OBJECT> list, <INT> index, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

## Query Parameters

| Name  | Description                                        | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------|----------------------------------------------------|---------------|------------------------------------------|----------|---------|
| list  | The list to which the value should be updated.     |               | OBJECT                                   | No       | Yes     |
| index | The index in which the value should to be updated. |               | INT                                      | No       | Yes     |
| value | The value to be updated with.                      |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

## Example 1

    list:set(stockSymbols, 0, 'IBM')

Function returns the updated list after replacing the value at 0th index with the value `IBM`
