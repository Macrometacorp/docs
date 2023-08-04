---
title: create (Function)
---

Function creates a list containing all values provided.

## Syntax

```sql
<OBJECT> list:create()
<OBJECT> list:create(<OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value1)
<OBJECT> list:create(<OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value1, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> ...)
```

## Query Parameters

| Name   | Description | Default Value | Possible Data Types | Optional | Dynamic |
|--------|-------------|---------------|------------------|----------|---------|
| value1 | Value 1     |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | Yes      | Yes     |

## Example 1

```sql
list:create(1, 2, 3, 4, 5, 6)
```

The `list:create(1, 2, 3, 4, 5, 6)` function creates a new list with the specified values. In this case, it returns a list containing the values `1`, `2`, `3`, `4`, `5`, and `6`.

## Example 2

```sql
list:create()
```

The `list:create()` function creates a new empty list. In this case, it returns an empty list with no values.

## Example 3

```sql
CREATE STREAM InputStream (value1 INT, value2 INT, value3 INT);
CREATE SINK STREAM OutputStream (createdList OBJECT);

@info(name = 'CreateList')
INSERT INTO OutputStream
SELECT list:create(value1, value2, value3) AS createdList
FROM InputStream;
```

In this stream worker example, a query named `CreateList` processes events from the `InputStream`, which contains three integer values (`value1`, `value2`, `value3`). The `list:create(value1, value2, value3)` function creates a new list containing these values. The created list is output as `createdList` for each event to the `OutputStream`.
