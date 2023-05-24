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
map:get(companyMap, 1)
```

The `map:get(companyMap, 1)` function retrieves the value associated with the key `1` from `companyMap`. If `companyMap` includes the key `1` and its value is `ABC`, the function returns `ABC`. If the key is not present in `companyMap`, the function returns `null`.

## Example 2

```sql
map:get(companyMap, 2)
```

The `map:get(companyMap, 2)` function retrieves the value associated with the key `2` from `companyMap`. If `companyMap` includes the key `2`, it returns the corresponding value. If the key `2` does not exist in `companyMap` or doesn't have an associated value, the function returns `null`.

## Example 3

```sql
map:get(companyMap, 2, 'two')
```

The `map:get(companyMap, 2, 'two')` function retrieves the value associated with the key `2` from `companyMap`. If `companyMap` includes the key `2`, it returns the corresponding value. If the key `2` does not exist in `companyMap` or doesn't have an associated value, the function returns the provided default value `'two'`.

## Example 4

```sql
CREATE STREAM InputStream (companyMap map<string, string>, searchKey string);
CREATE SINK STREAM OutputStream (companyValue string);

@info(name = 'CompanyMapLookup')
INSERT INTO OutputStream
SELECT map:get(companyMap, searchKey) AS companyValue
FROM InputStream;
```

In this stream worker, the `CompanyMapLookup` query processes events from the `InputStream`, each event comprising a `companyMap` and a `searchKey`. The query applies the `map:get(companyMap, searchKey)` function to each event in `InputStream` to retrieve the value associated with `searchKey` from `companyMap`. The resultant value is then inserted into the `OutputStream` for each processed event.
