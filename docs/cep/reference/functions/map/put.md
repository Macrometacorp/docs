---
title: put (Function)
---

Function returns the updated map after adding the given key-value pair. If the key already exist in the map the key is updated with the new value.

Syntax

    <OBJECT> map:put(<OBJECT> map, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> value)

## Query Parameters

| Name  | Description                                 | Default Value | Possible Data Types                            | Optional | Dynamic |
|-------|---------------------------------------------|---------------|------------------------------------------------|----------|---------|
| map   | The map to which the value should be added. |               | OBJECT                                         | No       | Yes     |
| key   | The key to be added.                        |               | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | No       | Yes     |
| value | The value to be added.                      |               | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | No       | Yes     |

## Example 1

    map:put(stockDetails , 'IBM' , '200')

Function returns the updated map named stockDetails after adding the  value `200` with the key `IBM`.
