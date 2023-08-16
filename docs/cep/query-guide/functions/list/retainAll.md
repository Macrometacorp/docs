---
title: retainAll (Function)
---

Function returns the updated list after retaining all the elements in the specified list.

## Syntax

```sql
<OBJECT> list:retainAll(<OBJECT> list, <OBJECT> given.list)
```

## Query Parameters

| Name   | Description | Default Value | Possible Data Types | Optional | Dynamic |
|--------|-------------|---------------|---------------------|----------|---------|
| list       | The list that needs to be updated.  |          | OBJECT  | No    | Yes     |
| given.list | The list with all the elements that needs to retained. |          | OBJECT | No  | Yes |

## Example 1

```sql
@info(name = 'query1')
list:retainAll(stockSymbols, latestStockSymbols)
```

The `list:retainAll(stockSymbols, latestStockSymbols)` function takes the list named `stockSymbols` and retains only the elements that are also present in the `latestStockSymbols` list. The function returns the updated `stockSymbols` list containing only the elements found in both `stockSymbols` and `latestStockSymbols`.
