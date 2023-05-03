---
title: removeByIndex (Function)
---

Function returns the updated list after removing the element with the specified index.

## Syntax

```sql
<OBJECT> list:removeByIndex(<OBJECT> list, <INT> index)
```

## Query Parameters

| Name  | Description | Default Value | Possible Data Types | Optional | Dynamic |
|-------|-------------|---------------|---------------------|----------|---------|
| list  | The list that needs to be updated. |               | OBJECT | No   | Yes  |
| index | The index of the element that needs to removed. |            | INT  | No  | Yes |

## Example 1

```sql
@info(name = 'query1')
list:removeByIndex(stockSymbols, 0)
```

The `list:removeByIndex(stockSymbols, 0)` function takes the list named `stockSymbols` and removes the element at the 0th index. The function then returns the updated `stockSymbols` list with the specified element removed.
