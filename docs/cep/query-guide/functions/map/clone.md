---
title: clone (Function)
---

Function returns the cloned map.

## Syntax

```sql
<OBJECT> map:clone(<OBJECT> map)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| map  | The map to which needs to be cloned. |               | OBJECT  | No   | Yes   |

## Example 1

```sql
@info(name = 'query1')
map:clone(stockDetails)
```

The `map:clone(stockDetails)` function takes a map named `stockDetails` and creates a deep copy of it. The function returns the cloned map.
