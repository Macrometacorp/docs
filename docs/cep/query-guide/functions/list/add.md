---
title: add (Function)
---

Function returns the updated list after adding the given value.

## Syntax

```sql
<OBJECT> list:add(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)
<OBJECT> list:add(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value, <INT> index)
```

## Query Parameters

| Name  | Description  | Default Value | Possible Data Types  | Optional | Dynamic |
|-------|--------------|---------------|----------------------|----------|---------|
| list  | The list to which the value should be added.     |               | OBJECT    | No       | Yes     |
| value | The value to be added.   |           | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |
| index | The index in which the value should to be added. | last      | INT     | Yes      | Yes     |

## Example 1

```sql
@info(name = 'query1')
list:add(stockSymbols, 'IBM')
```

The `list:add(stockSymbols, 'IBM')` function takes the list named `stockSymbols` as input and adds the value 'IBM' to the last index of the list. The updated list is then returned with the new element included.

## Example 2

```sql
@info(name = 'query1')
list:add(stockSymbols, 'IBM', 0)
```

The `list:add(stockSymbols, 'IBM', 0)` function takes the list named `stockSymbols` as input and adds the value 'IBM' to the 0th index of the list. The updated list is then returned with the new element included at the specified position.
