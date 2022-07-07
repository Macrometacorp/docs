---
title: add (Function)
---

Function returns the updated list after adding the given value.

Syntax

    <OBJECT> list:add(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)
    <OBJECT> list:add(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value, <INT> index)

## Query Parameters

| Name  | Description                                      | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------|--------------------------------------------------|---------------|------------------------------------------|----------|---------|
| list  | The list to which the value should be added.     |               | OBJECT                                   | No       | Yes     |
| value | The value to be added.                           |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |
| index | The index in which the value should to be added. | last          | INT                                      | Yes      | Yes     |

## Example 1

    list:add(stockSymbols, 'IBM')

Function returns the updated list after adding the value `IBM` in the last index.

## Example 2

    list:add(stockSymbols, 'IBM', 0)

Function returns the updated list after adding the value `IBM` in the 0th index`.
