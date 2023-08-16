---
title: clone (Function)
---

Function returns the cloned list.

## Syntax

```sql
<OBJECT> list:clone(<OBJECT> list)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| list | The list which needs to be cloned. |               | OBJECT  | No  | Yes |

## Example 1

```sql
@info(name = 'query1')
list:clone(stockSymbols)
```

The `list:clone(stockSymbols)` function takes a list named `stockSymbols` as input and creates a new list that is an exact copy of the original list, containing all the elements in the same order. The function returns the cloned list as a result.
