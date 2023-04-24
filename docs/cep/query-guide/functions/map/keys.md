---
title: keys (Function)
---

Function to return the keys of the map as a list.

## Syntax

```sql
<OBJECT> map:keys(<OBJECT> map)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| map  | The map from which list of keys to be returned. |         | OBJECT | No   | Yes |

## Example 1

```sql
@info(name = 'query1')
map:keys(stockDetails)
```

The `map:keys(stockDetails)` function returns a list of the keys present in the `stockDetails` map.
