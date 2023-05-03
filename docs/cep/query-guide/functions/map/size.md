---
title: size (Function)
---

Function to return the size of the map.

## Syntax

```sql
<INT> map:size(<OBJECT> map)
```

## Query Parameters

| Name | Description    | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------|---------------|---------------------|----------|---------|
| map  | The map for which size should be returned. |               | OBJECT              | No       | Yes     |

## Example 1

```sql
@info(name = 'query1')
map:size(stockDetails)
```

The `map:size(stockDetails)` function returns the number of key-value pairs in the `stockDetails` map.
