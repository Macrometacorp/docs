---
title: containsAll (Function)
---

Function checks whether the list contains all the values in the given list.

Syntax

    <BOOL> list:containsAll(<OBJECT> list, <OBJECT> given.list)

## Query Parameters

| Name       | Description                                                                     | Default Value | Possible Data Types | Optional | Dynamic |
|------------|---------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| list       | The list that needs to be checked on whether it contains all the values or not. |               | OBJECT              | No       | Yes     |
| given.list | The list which contains all the values to be checked.                           |               | OBJECT              | No       | Yes     |

## Example 1

    list:containsAll(stockSymbols, latestStockSymbols)

Returns `true` if the stockSymbols list contains values in latestStockSymbols else it returns `false`.
