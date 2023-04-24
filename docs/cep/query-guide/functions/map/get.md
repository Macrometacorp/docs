---
title: get (Function)
---

Function returns the value corresponding to the given key from the map.

## Syntax

```sql
<OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> map:get(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key)
<OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> map:get(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> default.value)
```

## Query Parameters

| Name    | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|---------|--------------|---------------|-----------------------|----------|---------|
| map    | The map from where the value should be obtained.  |           | OBJECT     | No   | Yes  |
| key           | The key to fetch the value.  |               | INT LONG FLOAT DOUBLE FLOAT BOOL STRING   | No       | Yes     |
| default.value | The value to be returned if the map does not have the key. |   | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | Yes   | Yes    |

## Example 1

```sql
@info(name = 'query1')
map:get(companyMap, 1)
```

The `map:get(companyMap, 1)` function checks if the `companyMap` has a key `1`. If the key `1` exists in `companyMap` and its value is `ABC`, then the function returns `ABC`.

## Example 2

```sql
@info(name = 'query1')
map:get(companyMap, 2)
```

The `map:get(companyMap, 2)` function checks if the `companyMap` has a key `2`. If the key `2` does not exist in `companyMap` or has no associated value, then the function returns `null`.

## Example 3

```sql
@info(name = 'query1')
map:get(companyMap, 2, 'two')
```

The `map:get(companyMap, 2, 'two')` function checks if the `companyMap` has a key `2`. If the key `2` does not exist in `companyMap` or has no associated value, then the function returns the default value `'two'`.
