---
title: combineByKey (Function)
---

Function returns the map after combining all the maps given as parameters, such that the keys, of all the maps will be matched with an Array list of values from each map respectively.

Syntax

    <OBJECT> map:combineByKey(<OBJECT> map, <OBJECT> map)
    <OBJECT> map:combineByKey(<OBJECT> map, <OBJECT> map, <OBJECT> ...)

## Query Parameters

| Name | Description                                       | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------------------|---------------|---------------------|----------|---------|
| map  | The map into which the key-values need to copied. |               | OBJECT              | No       | Yes     |

## Example 1

    map:combineByKey(map1, map2)

If `map2` contains key-value pairs (`symbol`: `gdn`), (`volume` :100), and if `map2` contains key-value pairs (`symbol`: `IBM`),(`price` : 12), then the function returns the map with key value pairs as follows, (symbol: ArrayList(`gdn`, `IBM`)), (volume: ArrayList(100, null)) and (price: ArrayList(null, 12))
