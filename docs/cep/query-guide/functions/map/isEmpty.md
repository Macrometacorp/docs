---
title: isEmpty (Function)
---

Function checks if the map is empty.

## Syntax

```sql
<BOOL> map:isEmpty(<OBJECT> map)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| map  | The map the need to be checked whether it's empty or not. |               | OBJECT | No       | Yes     |

## Example 1

```sql
@info(name = 'query1')
map:isEmpty(stockDetails)
```

The `map:isEmpty(stockDetails)` function checks if the `stockDetails` map is empty or not. If the map is empty, it returns `true`, otherwise, it returns `false`.
