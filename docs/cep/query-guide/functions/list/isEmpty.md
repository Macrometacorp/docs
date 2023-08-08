---
title: isEmpty (Function)
---

Function checks if the list is empty.

## Syntax

```sql
<BOOL> list:isEmpty(<OBJECT> list)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| list | The list that needs to be checked whether it's empty or not. |    | OBJECT | No  | Yes |

## Example 1

```sql
list:isEmpty(stockSymbols)
```

The `list:isEmpty(stockSymbols)` function checks if the `stockSymbols` list is empty. It returns `true` if the `stockSymbols` list is empty; otherwise, it returns `false`.

## Example 2

```sql
CREATE STREAM InputStream (list OBJECT);
CREATE SINK STREAM OutputStream (isEmpty BOOL);

@info(name = 'EmptyChecker')
INSERT INTO OutputStream
SELECT list:isEmpty(list) AS isEmpty
FROM InputStream;
```

In this stream worker example, a query named `EmptyChecker` processes events from the `InputStream`, which contains a list (`list`). The `list:isEmpty(list)` function checks if the list is empty. If the list is empty, then the function outputs `true` to `isEmpty` for each event to the `OutputStream`. If the list is not empty, then the function outputs `false` to `isEmpty`.
