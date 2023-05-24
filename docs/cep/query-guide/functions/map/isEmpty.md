---
title: isEmpty (Function)
---

Function checks if the map is empty.

## Syntax

```sql
<BOOL> map:isEmpty(<OBJECT> map)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| map  | The map the need to be checked whether it's empty or not. |               | OBJECT | No       | Yes     |

## Example 1

```sql
map:isEmpty(stockDetails)
```

The `map:isEmpty(stockDetails)` function evaluates whether the `stockDetails` map is empty. If the map is empty (i.e., it contains no key-value pairs), the function returns `true`. If the map contains one or more key-value pairs, then it returns `false`.

## Example 2

```sql
CREATE STREAM InputStream (stockDetails map<string, int>);
CREATE SINK STREAM OutputStream (isEmpty bool);

@info(name = 'CheckEmptyMap')
INSERT INTO OutputStream
SELECT map:isEmpty(stockDetails) AS isEmpty
FROM InputStream;
```

In this stream worker, the `CheckEmptyMap` query processes events from the `InputStream`, with each event comprising a `stockDetails` map. The query applies the `map:isEmpty(stockDetails)` function to each event in `InputStream` to determine if `stockDetails` is empty. The resultant boolean value (`true` if empty, `false` otherwise) is then inserted into the `OutputStream` for each processed event.
