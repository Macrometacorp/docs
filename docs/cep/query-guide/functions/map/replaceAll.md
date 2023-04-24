---
title: replaceAll (Function)
---

Function returns the updated map after replacing all the key-value pairs from another map, if keys are present.

## Syntax

```sql
<OBJECT> map:replaceAll(<OBJECT> to.map, <OBJECT> from.map)
```

## Query Parameters

| Name     | Description   | Default Value | Possible Data Types | Optional | Dynamic |
|----------|---------------|---------------|---------------------|----------|---------|
| to.map   | The map into which the key-values need to copied. |       | OBJECT | No | Yes |
| from.map | The map from which the key-values are copied.  |         | OBJECT | No | Yes |

## Example 1

```sql
@info(name = 'query1')
map:replaceAll(toMap, fromMap)
```

The `map:replaceAll(toMap, fromMap)` function takes two maps: `toMap` and `fromMap`. If `toMap` contains key-value pairs (`symbol`: `gdn`), (`volume`: 100), and if `fromMap` contains key-value pairs (`symbol`: `IBM`), (`price` : 12), the function replaces the values in the `toMap` with values from the `fromMap` if the keys are present in both maps. In this example, it returns an updated `toMap` with key-value pairs (`symbol`: `IBM`), (`volume`: 100).
