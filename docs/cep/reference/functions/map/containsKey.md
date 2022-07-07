---
title: containsKey (Function)
---

Function checks if the map contains the key.

Syntax

    <BOOL> map:containsKey(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> key)

## Query Parameters

| Name | Description                                                   | Default Value | Possible Data Types               | Optional | Dynamic |
|------|---------------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| map  | The map the needs to be checked on containing the key or not. |               | OBJECT                            | No       | Yes     |
| key  | The key to be checked.                                        |               | INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

## Example 1

    map:containsKey(stockDetails, '1234')

Returns `true` if the stockDetails map contains key `1234` else it returns `false`.
