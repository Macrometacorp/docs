---
title: removeAll (Function)
---

Function returns the updated list after removing all the element with the specified list.

## Syntax

```sql
<OBJECT> list:removeAll(<OBJECT> list, <OBJECT> given.list)
```

## Query Parameters

| Name   | Description | Default Value | Possible Data Types | Optional | Dynamic |
|--------|------------|---------------|---------------------|----------|---------|
| list  | The list that needs to be updated.   |               | OBJECT  | No    | Yes  |
| given.list | The list with all the elements that needs to removed. |               | OBJECT   | No    | Yes  |

## Example 1

```sql
@info(name = 'query1')
list:removeAll(stockSymbols, latestStockSymbols)
```

The `list:removeAll(stockSymbols, latestStockSymbols)` function takes the list named `stockSymbols` and removes all the elements that are present in the `latestStockSymbols` list. The function then returns the updated `stockSymbols` list with those elements removed.
