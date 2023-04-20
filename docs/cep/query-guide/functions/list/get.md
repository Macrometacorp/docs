---
title: get (Function)
---

Function returns the value at the specific index, null if index is out of range.

## Syntax

```sql
<OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> list:get(<OBJECT> list, <INT> index)
```

## Query Parameters

| Name  | Description | Default Value | Possible Data Types | Optional | Dynamic |
|-------|-------------|---------------|---------------------|----------|---------|
| list  | Attribute containing the list |               | OBJECT | No       | Yes |
| index | Index of the element          |               | INT    | No       | Yes |

## Example 1

```sql
@info(name = 'query1')
list:get(stockSymbols, 1)
```

The `list:get(stockSymbols, 1)` function retrieves the element at index 1 (the second element) in the `stockSymbols` list. It returns the value of the element at that position.
