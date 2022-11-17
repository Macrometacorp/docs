---
title: putAll (Function)
---

Function returns the updated map after adding all the key-value pairs from another map. If there are duplicate keys, the key will be assignedn new values from the map that's being copied.

Syntax

    <OBJECT> map:putAll(<OBJECT> to.map, <OBJECT> from.map)

## Query Parameters

| Name     | Description                                       | Default Value | Possible Data Types | Optional | Dynamic |
|----------|---------------------------------------------------|---------------|---------------------|----------|---------|
| to.map   | The map into which the key-values need to copied. |               | OBJECT              | No       | Yes     |
| from.map | The map from which the key-values are copied.     |               | OBJECT              | No       | Yes     |

## Example 1

    map:putAll(toMap, fromMap)

If `toMap` contains key-value pairs (`symbol`: `gdn`), (`volume`: 100), and if `fromMap` contains key-value pairs (`symbol`: `IBM`),(`price` : 12), then the function returns updated `toMap` with key-value pairs (`symbol`: `IBM`), (`price` : 12), (`volume` :100).
