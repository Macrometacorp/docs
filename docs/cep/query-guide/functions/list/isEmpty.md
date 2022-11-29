---
title: isEmpty (Function)
---

Function checks if the list is empty.

Syntax

    <BOOL> list:isEmpty(<OBJECT> list)

## Query Parameters

| Name | Description                                                   | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------------------------------|---------------|---------------------|----------|---------|
| list | The list that needs to be checked whether it's empty or not. |               | OBJECT              | No       | Yes     |

## Example 1

    list:isEmpty(stockSymbols)

Returns `true` if the stockSymbols list is empty else it returns `false`.
