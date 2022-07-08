---
title: removeByIndex (Function)
---

Function returns the updated list after removing the element with the specified index.

Syntax

    <OBJECT> list:removeByIndex(<OBJECT> list, <INT> index)

## Query Parameters

| Name  | Description                                     | Default Value | Possible Data Types | Optional | Dynamic |
|-------|-------------------------------------------------|---------------|---------------------|----------|---------|
| list  | The list that needs to be updated.              |               | OBJECT              | No       | Yes     |
| index | The index of the element that needs to removed. |               | INT                 | No       | Yes     |

## Example 1

    list:removeByIndex(stockSymbols, 0)

This returns the updated list, stockSymbols after removing value at 0 th index.
