---
title: create (Function)
---

Function creates a map pairing the keys and their corresponding values.

## Syntax

```sql
<OBJECT> map:create()
<OBJECT> map:create(<OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key1, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> value1)
<OBJECT> map:create(<OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key1, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> value1, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> ...)
```

## Query Parameters

| Name   | Description | Default Value | Possible Data Types  | Optional | Dynamic |
|--------|-------------|---------------|----------------------|----------|---------|
| key1   | Key 1       | \-      | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | Yes      | Yes     |
| value1 | Value 1     | \-      | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | Yes      | Yes     |

## Example 1

```sql
@info(name = 'query1')
map:create(1, 'one', 2, 'two', 3, 'three')
```

The `map:create(1, 'one', 2, 'two', 3, 'three')` function returns a map with keys `1`, `2`, and `3` mapped to their corresponding values, `one`, `two`, and `three`.

## Example 2

```sql
@info(name = 'query1')
map:create()
```

The `map:create()` function returns an empty map.
