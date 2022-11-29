---
title: removeAll (Function)
---

Function returns the updated list after removing all the element with the specified list.

Syntax

    <OBJECT> list:removeAll(<OBJECT> list, <OBJECT> given.list)

## Query Parameters

| Name       | Description                                           | Default Value | Possible Data Types | Optional | Dynamic |
|------------|-------------------------------------------------------|---------------|---------------------|----------|---------|
| list       | The list that needs to be updated.                    |               | OBJECT              | No       | Yes     |
| given.list | The list with all the elements that needs to removed. |               | OBJECT              | No       | Yes     |

## Example 1

    list:removeAll(stockSymbols, latestStockSymbols)

This returns the updated list, stockSymbols after removing all the values in latestStockSymbols.
