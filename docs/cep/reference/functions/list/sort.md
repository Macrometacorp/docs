---
title: sort (Function)
---

Function returns lists sorted in ascending or descending order.

Syntax

    <OBJECT> list:sort(<OBJECT> list)
    <OBJECT> list:sort(<OBJECT> list, <STRING> order)

## Query Parameters

| Name  | Description                                                | Default Value | Possible Data Types | Optional | Dynamic |
|-------|------------------------------------------------------------|---------------|---------------------|----------|---------|
| list  | The list which should be sorted.                           |               | OBJECT              | No       | Yes     |
| order | Order in which the list needs to be sorted (ASC/DESC/REV). | REV           | STRING              | Yes      | No      |

## Example 1

    list:sort(stockSymbols)

Function returns the sorted list in ascending order.

## Example 2

    list:sort(stockSymbols, 'DESC')

Function returns the sorted list in descending order.
