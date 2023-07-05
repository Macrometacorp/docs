---
title: clear (Function)
---

Function returns the cleared list.

## Syntax

```sql
<OBJECT> list:clear(<OBJECT> list)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| list | The list which needs to be cleared |        | OBJECT   | No  | Yes |

## Example 1

```sql
list:clear(stockDetails)
```

This function call takes `stockDetails`, a list, as input and removes all elements from it. The `clear` function results in an empty list.

## Example 2

```sql
CREATE STREAM InputListStream (stockDetails OBJECT);
CREATE SINK STREAM OutputListStream (clearedList OBJECT);

@info(name = 'ClearListStreamWorker')
INSERT INTO OutputListStream
SELECT list:clear(stockDetails) AS clearedList
FROM InputListStream;
```

The `ClearListStreamWorker` processes events from the `InputListStream`, which includes a list attribute named `stockDetails`. It uses the `list:clear(stockDetails)` function to remove all elements from `stockDetails`. The cleared list, now empty, is output as the `clearedList` attribute for each event to the `OutputListStream`.
