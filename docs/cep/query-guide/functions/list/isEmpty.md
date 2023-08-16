---
title: isEmpty (Function)
---

Function checks if the list is empty.

## Syntax

```sql
<BOOL> list:isEmpty(<OBJECT> list)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| list | The list that needs to be checked whether it's empty or not. |    | OBJECT | No  | Yes |

## Example 1

```sql
@info(name = 'query1')
list:isEmpty(stockSymbols)
```

The `list:isEmpty(stockSymbols)` function returns `true` if the `stockSymbols` list is empty; otherwise, it returns `false`.
