---
title: containsValue (Function)
---

Function checks if the map contains the value.

Syntax

    <BOOL> map:containsValue(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

## Query Parameters

| Name  | Description                                                     | Default Value | Possible Data Types               | Optional | Dynamic |
|-------|-----------------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| map   | The map the needs to be checked on containing the value or not. |               | OBJECT                            | No       | Yes     |
| value | The value to be checked.                                        |               | INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

## Example 1

    map:containsValue(stockDetails, 'IBM')

Returns `true` if the stockDetails map contains value `IBM` else it returns `false`.
