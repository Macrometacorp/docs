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
@info(name = 'query1')
list:create(1, 2, 3, 4, 5, 6)
```

The `list:create(1, 2, 3, 4, 5, 6)` function creates a new list with the specified values. In this case, it returns a list containing the values `1`, `2`, `3`, `4`, `5`, and `6`.

## Example 2

```sql
@info(name = 'query1')
list:create()
```

The `list:create()` function creates a new empty list. In this case, it returns an empty list with no values.
