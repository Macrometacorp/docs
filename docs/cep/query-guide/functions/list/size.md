---
title: size (Function)
---

Function to return the size of the list.

## Syntax

```sql
<INT> list:size(<OBJECT> list)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| list | The list for which size should be returned. |         | OBJECT | No | Yes |

## Example 1

```sql
@info(name = 'query1')
list:size(stockSymbols)
```

The `list:size(stockSymbols)` function takes the list named `stockSymbols` and returns the size (number of elements) of the `stockSymbols` list.
