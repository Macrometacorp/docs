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
list:indexOf(stockSymbols, 'IBM')
```

The `list:indexOf(stockSymbols, 'IBM')` function returns the index of the last occurrence of the element 'IBM' in the `stockSymbols` list. If the element is not found in the list, then it returns -1.

## Example 2

```sql
CREATE STREAM InputStream (list OBJECT, value STRING);
CREATE SINK STREAM OutputStream (lastIndex INT);

@info(name = 'LastIndexFinder')
INSERT INTO OutputStream
SELECT list:indexOf(list, value) AS lastIndex
FROM InputStream;
```

In this stream worker example, a query named `LastIndexFinder` processes events from the `InputStream`, which contains a list (`list`) and a value (`value`). The `list:indexOf(list, value)` function retrieves the index of the last occurrence of the specified value in the list. If the value is found in the list, the index is output as `lastIndex` for each event to the `OutputStream`. If the value is not found, the function outputs `-1` to `lastIndex`.
