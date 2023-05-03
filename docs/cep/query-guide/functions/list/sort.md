---
title: sort (Function)
---

Function returns lists sorted in ascending or descending order.

## Syntax

```sql
<OBJECT> list:sort(<OBJECT> list)
<OBJECT> list:sort(<OBJECT> list, <STRING> order)
```

## Query Parameters

| Name  | Description | Default Value | Possible Data Types | Optional | Dynamic |
|-------|-------------|---------------|---------------------|----------|---------|
| list  | The list which should be sorted.     |               | OBJECT   | No  | Yes  |
| order | Order in which the list needs to be sorted (ASC/DESC/REV). | REV  | STRING | Yes   | No    |

## Example 1

```sql
@info(name = 'query1')
list:sort(stockSymbols)
```

The `list:sort(stockSymbols)` function takes the list named `stockSymbols` and returns a new list containing the sorted elements of `stockSymbols` in ascending order.

## Example 2

```sql
@info(name = 'query1')
list:sort(stockSymbols, 'DESC')
```

The `list:sort(stockSymbols, 'DESC')` function takes the list named `stockSymbols` and returns a new list containing the sorted elements of `stockSymbols` in descending order.
