---
title: lastIndexOf (Function)
---

Function returns the index of the given value.

## Syntax

```sql
<INT> list:lastIndexOf(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)
```

## Query Parameters

| Name  | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|-------|--------------|---------------|---------------------|----------|---------|
| list  | The list to be checked to get index of an element. |        | OBJECT | No       | Yes     |
| value | Value for which last index needs to be identified. |        | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No     | Yes    |

## Example 1

```sql
@info(name = 'query1')
list:lastIndexOf(stockSymbols. `IBM`)
```

The `list:lastIndexOf(stockSymbols, 'IBM')` function returns the last index of the element `IBM` in the `stockSymbols` list if present; otherwise, it returns -1.
