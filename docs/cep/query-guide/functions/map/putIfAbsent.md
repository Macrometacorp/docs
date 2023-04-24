---
title: putIfAbsent (Function)
---

Function returns the updated map after adding the given key-value pair if key is absent.

## Syntax

```sql
<OBJECT> map:putIfAbsent(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> key, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)
```

## Query Parameters

| Name  | Description | Default Value | Possible Data Types  | Optional | Dynamic |
|-------|-------------|---------------|----------------------|----------|---------|
| map   | The map to which the value should be added. |               | OBJECT  | No | Yes |
| key   | The key to be added.  |         | INT LONG FLOAT DOUBLE BOOL STRING | No  | Yes |
| value | The value to be added.  |       | INT LONG FLOAT DOUBLE BOOL STRING | No  | Yes |

## Example 1

```sql
@info(name = 'query1')
map:putIfAbsent(stockDetails , 1234 , 'IBM')
```

The `map:putIfAbsent(stockDetails, 1234, 'IBM')` function takes a map named `stockDetails`, a key `1234`, and a value `'IBM'`. If the key `1234` is not already present in the `stockDetails` map, then it adds the key-value pair (1234, 'IBM') to the map. If the key `1234` is already present in the map, then the function will not change the map. The function returns the updated `stockDetails` map.
