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
| key1   | Key 1       | -      | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | Yes      | Yes     |
| value1 | Value 1     | -      | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | Yes      | Yes     |

## Example 1

```sql
map:create(1, 'one', 2, 'two', 3, 'three')
```

In this example, the `map:create(1, 'one', 2, 'two', 3, 'three')` function is used to create a new map. The function takes an even number of arguments where each pair of arguments represents a key-value pair. Here, the keys `1`, `2`, and `3` are mapped to their corresponding values, `one`, `two`, and `three`. This results in a map `{1='one', 2='two', 3='three'}`.

## Example 2

```sql
map:create()
```

In this example, the `map:create()` function is used without any arguments. This results in the creation of an empty map `{}`.

## Example 3

```sql
CREATE STREAM InputDataStream (id string, key1 string, value1 string, key2 string, value2 string);
CREATE SINK STREAM OutputMapStream (id string, mappedData object);

@info(name = 'MapCreation')
INSERT INTO OutputMapStream
SELECT id, map:create(key1, value1, key2, value2) AS mappedData
FROM InputDataStream WINDOW SLIDING_LENGTH(1);
```

In this example, the `InputDataStream` stream is modified to include individual keys and values instead of a single `keyValuePairs` string. A stream worker named `MapCreation` uses the input from `InputDataStream`, which includes an identifier (`id`) and individual keys and values (`key1`, `value1`, `key2`, `value2`).

The query uses the `map:create(key1, value1, key2, value2)` function to create a new map from the provided key-value pairs. This new map, along with the identifier, is inserted into `OutputMapStream`.
