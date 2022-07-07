---
title: remove (Function)
---

Function returns the updated map after removing the element with the specified key.

Syntax

    <OBJECT> map:remove(<OBJECT> map, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key)

## Query Parameters

| Name | Description                                   | Default Value | Possible Data Types                            | Optional | Dynamic |
|------|-----------------------------------------------|---------------|------------------------------------------------|----------|---------|
| map  | The map that needs to be updated.             |               | OBJECT                                         | No       | Yes     |
| key  | The key of the element that needs to removed. |               | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | No       | Yes     |

## Example 1

    map:remove(stockDetails, 1234)

This returns the updated map, stockDetails after removing the key-value pair corresponding to the key `1234`.
