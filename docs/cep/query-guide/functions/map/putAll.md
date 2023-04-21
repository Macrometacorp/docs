---
title: putAll (Function)
---

Function returns the updated map after adding all the key-value pairs from another map. If there are duplicate keys, the key will be assigned new values from the map that's being copied.

## Syntax

```sql
<OBJECT> map:putAll(<OBJECT> to.map, <OBJECT> from.map)
```

## Query Parameters

| Name     | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|----------|--------------|---------------|---------------------|----------|---------|
| to.map   | The map into which the key-values need to copied. |               | OBJECT  | No       | Yes     |
| from.map | The map from which the key-values are copied.   |               | OBJECT | No       | Yes     |

## Example 1

```sql
@info(name = 'query1')
map:putAll(toMap, fromMap)
```

The `map:putAll(toMap, fromMap)` function takes two maps, `toMap` and `fromMap`. It adds all key-value pairs from the `fromMap` to the `toMap`. If a key in `toMap` already exists in `fromMap`, then the value in `toMap` will be replaced by the value in `fromMap`. In the example given, `toMap` contains key-value pairs (`symbol`: `gdn`) and (`volume`: 100), and `fromMap` contains key-value pairs (`symbol`: `IBM`) and (`price` : 12). After executing the function, the updated `toMap` will have key-value pairs (`symbol`: `IBM`), (`price` : 12), and (`volume` :100).
