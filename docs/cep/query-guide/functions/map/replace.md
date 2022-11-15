---
title: replace (Function)
---

Function returns the updated map after replacing the given key-value pair only if key is present.

Syntax

    <OBJECT> map:replace(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

## Query Parameters

| Name  | Description                                        | Default Value | Possible Data Types                     | Optional | Dynamic |
|-------|----------------------------------------------------|---------------|-----------------------------------------|----------|---------|
| map   | The map to which the key-value should be replaced. |               | OBJECT                                  | No       | Yes     |
| key   | The key to be replaced.                            |               | INT LONG FLOAT DOUBLE FLOAT BOOL STRING | No       | Yes     |
| value | The value to be replaced.                          |               | INT LONG FLOAT DOUBLE BOOL STRING       | No       | Yes     |

## Example 1

    map:replace(stockDetails , 1234 , 'IBM')

Function returns the updated map named stockDetails after replacing the value `IBM` with the key `1234` if present.
