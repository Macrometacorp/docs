---
title: retainAll (Function)
---

Function returns the updated list after retaining all the elements in the specified list.

Syntax

    <OBJECT> list:retainAll(<OBJECT> list, <OBJECT> given.list)

## Query Parameters

| Name       | Description                                            | Default Value | Possible Data Types | Optional | Dynamic |
|------------|--------------------------------------------------------|---------------|---------------------|----------|---------|
| list       | The list that needs to be updated.                     |               | OBJECT              | No       | Yes     |
| given.list | The list with all the elements that needs to reatined. |               | OBJECT              | No       | Yes     |

## Example 1

    list:retainAll(stockSymbols, latestStockSymbols)

This returns the updated list, stockSymbols after retaining all the values in latestStockSymbols.
