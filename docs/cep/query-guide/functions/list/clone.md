---
title: clone (Function)
---

Function returns the cloned list.

## Syntax

```sql
<OBJECT> list:clone(<OBJECT> list)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| list | The list which needs to be cloned. |               | OBJECT  | No  | Yes |

## Example 1

```sql
list:clone(stockSymbols)
```

This function call takes `stockSymbols`, a list, as input and creates an identical copy of it. The `clone` function generates a new list with all elements from `stockSymbols` in the same order, returning this new list.

## Example 2

```sql
CREATE STREAM InputListStream (stockSymbols OBJECT);
CREATE SINK STREAM OutputListStream (clonedList OBJECT);

@info(name = 'CloneListStreamWorker')
INSERT INTO OutputListStream
SELECT list:clone(stockSymbols) AS clonedList
FROM InputListStream;
```

The `CloneListStreamWorker` handles events from the `InputListStream`, which includes a list attribute named `stockSymbols`. It employs the `list:clone(stockSymbols)` function to generate an identical copy of `stockSymbols`. The cloned list, maintaining the same order of elements as the original, is output as the `clonedList` attribute for each event to the `OutputListStream`.
