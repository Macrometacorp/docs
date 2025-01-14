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
list:get(stockSymbols, 1)
```

The `list:get(stockSymbols, 1)` function retrieves the element at index 1 (the second element) in the `stockSymbols` list. If the index is valid, it returns the value of the element at that position. If the index is out of range, the function returns `null`.

## Example 2

```sql
CREATE STREAM InputStream (list OBJECT, index INT);
CREATE SINK STREAM OutputStream (listElement OBJECT);

@info(name = 'ListElementGetter')
INSERT INTO OutputStream
SELECT list:get(list, index) AS listElement
FROM InputStream;
```

In this stream worker example, a query named `ListElementGetter` processes events from the `InputStream`, which contains a list (`list`) and an index (`index`). The `list:get(list, index)` function retrieves the list element at the specified index. If the index is valid, the element value is output as `listElement` for each event to the `OutputStream`. If the index is out of range, the function outputs `null` to `listElement`.
