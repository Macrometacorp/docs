---
title: containsAll (Function)
---

Function checks whether the list contains all the values in the given list.

## Syntax

```sql
<BOOL> list:containsAll(<OBJECT> list, <OBJECT> given.list)
```

## Query Parameters

| Name       | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------------|--------------|---------------|---------------------|----------|---------|
| list | The list that needs to be checked on whether it contains all the values or not. |          | OBJECT    | No       | Yes     |
| given.list | The list which contains all the values to be checked. |        | OBJECT | No | Yes |

## Example 1

```sql
@info(name = 'query1')
list:containsAll(stockSymbols, latestStockSymbols)
```

The `list:containsAll(stockSymbols, latestStockSymbols)` function checks if the `stockSymbols` list contains all the values present in the `latestStockSymbols` list. It returns `true` if all the values from `latestStockSymbols` are found in the `stockSymbols` list, otherwise, it returns `false`.
