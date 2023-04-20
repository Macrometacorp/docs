---
title: combineByKey (Function)
---

Function returns the map after combining all the maps given as parameters, such that the keys, of all the maps will be matched with an array list of values from each map respectively.

## Syntax

```sql
<OBJECT> map:combineByKey(<OBJECT> map, <OBJECT> map)
<OBJECT> map:combineByKey(<OBJECT> map, <OBJECT> map, <OBJECT> ...)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| map  | The map into which the key-values need to copied. |         | OBJECT | No  | Yes |

## Example 1

```sql
@info(name = 'query1')
map:combineByKey(map1, map2)
```

If `map1` contains key-value pairs (`symbol`: `gdn`, `volume`: 100), and if `map2` contains key-value pairs (`symbol`: `IBM`, `price`: 12), then the `map:combineByKey(map1, map2)` function returns a combined map with key-value pairs as follows:

- `symbol`: ArrayList(`gdn`, `IBM`)
- `volume`: ArrayList(100, null)
- `price`: ArrayList(null, 12)

This function merges the two maps, `map1` and `map2`, by creating an ArrayList for each key and combining the values of the same keys from both maps.
