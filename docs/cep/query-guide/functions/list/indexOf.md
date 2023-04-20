---
title: indexOf (Function)
---

Function returns the last index of the given element.

## Syntax

```sql
<INT> list:indexOf(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| list | The list to be checked to get index of an element. |         | OBJECT | No  | Yes |
| value | Value for which last index needs to be identified. |     | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No  | Yes |

## Example 1

```sql
@info(name = 'query1')
list:indexOf(stockSymbols. `IBM`)
```

The `list:indexOf(stockSymbols, 'IBM')` function returns the index of the last occurrence of the element 'IBM' in the `stockSymbols` list. If the element is not found in the list, then it returns -1.
