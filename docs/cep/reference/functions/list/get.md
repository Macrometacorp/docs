---
title: get (Function)
---

Function returns the value at the specific index, null if index is out of range.

Syntax

    <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> list:get(<OBJECT> list, <INT> index)

## Query Parameters

| Name  | Description                   | Default Value | Possible Data Types | Optional | Dynamic |
|-------|-------------------------------|---------------|---------------------|----------|---------|
| list  | Attribute containing the list |               | OBJECT              | No       | Yes     |
| index | Index of the element          |               | INT                 | No       | Yes     |

## Example 1

    list:get(stockSymbols, 1)

This returns the element in the 1st index in the stockSymbols list.
