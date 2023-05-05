---
title: clear (Function)
---

Function returns the cleared map.

## Syntax

```sql
<OBJECT> map:clear(<OBJECT> map)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| map  | The map which needs to be cleared |       | OBJECT  | No  | Yes |

## Example 1

```sql
@info(name = 'query1')
map:clear(stockDetails)
```

The `map:clear(stockDetails)` function takes a map named `stockDetails` and removes all its key-value pairs. The function returns an empty map.
