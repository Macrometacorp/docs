---
title: putIfAbsent (Function)
---

Function returns the updated map after adding the given key-value pair if key is absent.

Syntax

    <OBJECT> map:putIfAbsent(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> key, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

## Query Parameters

| Name  | Description                                 | Default Value | Possible Data Types               | Optional | Dynamic |
|-------|---------------------------------------------|---------------|-----------------------------------|----------|---------|
| map   | The map to which the value should be added. |               | OBJECT                            | No       | Yes     |
| key   | The key to be added.                        |               | INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |
| value | The value to be added.                      |               | INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

## Example 1

    map:putIfAbsent(stockDetails , 1234 , 'IBM')

Function returns the updated map named stockDetails after adding the value `IBM` with the key `1234` if key is absent from the original map.
