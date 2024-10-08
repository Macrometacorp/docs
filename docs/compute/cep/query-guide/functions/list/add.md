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
list:add(stockSymbols, 'IBM')
```

This function call adds the string 'IBM' to the list `stockSymbols`. The `add` function appends 'IBM' to the end of the list, because no index is specified. The resulting list, which includes the new element, is then returned.

## Example 2

```sql
list:add(stockSymbols, 'IBM', 0)
```

This function call adds the string 'IBM' to the list `stockSymbols` at index 0. Because an index is specified, the `add` function inserts 'IBM' at the beginning of the list. The updated list is then returned with 'IBM' as the first element.

## Example 3

```sql
CREATE STREAM InputListStream (stockSymbols OBJECT);
CREATE SINK STREAM OutputListStream (updatedList OBJECT);

@info(name = 'AddToListStreamWorker')
INSERT INTO OutputListStream
SELECT list:add(stockSymbols, 'GOOG') AS updatedList
FROM InputListStream;
```

The `AddToListStreamWorker` processes events from the `InputListStream`, which includes a list attribute `stockSymbols`. The function `list:add(stockSymbols, 'GOOG')` appends 'GOOG' to the end of the `stockSymbols` list. The updated list, now including 'GOOG', is output as the `updatedList` attribute for each event to the `OutputListStream`.
