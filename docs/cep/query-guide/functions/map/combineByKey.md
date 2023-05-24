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
map:combineByKey(map1, map2)
```

In this example, the `map:combineByKey(map1, map2)` function is used to combine two maps, `map1` and `map2`, into a single map. The resulting map contains all the keys from both input maps. If a key exists in both maps, its value in the combined map is an ArrayList containing values from both input maps. If a key is only present in one map, the value in the combined map is an ArrayList that includes the value from the map where the key exists and `null` for the map where the key doesn't exist.

For instance, if `map1` has key-value pairs (`symbol`: `gdn`, `volume`: 100), and `map2` has key-value pairs (`symbol`: `IBM`, `price`: 12), the combined map would look like this:

- `symbol`: ArrayList(`gdn`, `IBM`)
- `volume`: ArrayList(100, null)
- `price`: ArrayList(null, 12)

## Example 2

```sql
CREATE STREAM InputMapStream (id string, map1 map<string, double>, map2 map<string, double>);
CREATE SINK STREAM OutputCombinedMapStream (id string, combinedMap map<string, ArrayList<double>>);

@info(name = 'CombineMapsByKey')
INSERT INTO OutputCombinedMapStream
SELECT id, map:combineByKey(map1, map2)
FROM InputMapStream;
```

In this stream worker example, a stream named `InputMapStream` is created to provide input to the query, which consists of an identifier (`id`), and two maps (`map1` and `map2`). A sink stream, `OutputCombinedMapStream`, is created to collect the output, which consists of the identifier and a combined map.

The `CombineMapsByKey` query processes events from `InputMapStream`. It uses the `map:combineByKey(map1, map2)` function to combine the two maps in each event by creating an ArrayList for each key and combining the values of the same keys from both maps. The resulting combined map, along with the identifier, is then inserted into `OutputCombinedMapStream`.
