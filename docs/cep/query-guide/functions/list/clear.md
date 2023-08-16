---
title: clear (Function)
---

Function returns the cleared list.

## Syntax

```sql
<OBJECT> list:clear(<OBJECT> list)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| list | The list which needs to be cleared |        | OBJECT   | No  | Yes |

## Example 1

```sql
@info(name = 'query1')
list:clear(stockDetails)
```

The `list:clear(stockDetails)` function takes a list named `stockDetails` as input and clears all elements from the list. The function returns an empty list as a result.
