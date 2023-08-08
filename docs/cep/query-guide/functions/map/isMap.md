---
title: isMap (Function)
---

Function checks if the object is type of a map.

## Syntax

```sql
<BOOL> map:isMap(<OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> arg)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------|---------------|-----------------------|----------|---------|
| arg | The argument the need to be determined whether it's a map or not. |       | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | No       | Yes     |

## Example 1

```sql
map:isMap(stockDetails)
```

The `map:isMap(stockDetails)` function evaluates whether the `stockDetails` object is a map. If the object is a map (i.e., it's an instance of `java.util.Map`), the function returns `true`. If the object is not a map, it returns `false`.

## Example 2

```sql
CREATE STREAM InputStream (stockDetails object);
CREATE SINK STREAM OutputStream (isMap bool);

@info(name = 'CheckIsMap')
INSERT INTO OutputStream
SELECT map:isMap(stockDetails) AS isMap
FROM InputStream;
```

In this stream worker, the `CheckIsMap` query processes events from the `InputStream`, with each event comprising a `stockDetails` object. The query applies the `map:isMap(stockDetails)` function to each event in `InputStream` to determine if `stockDetails` is a map. The resultant boolean value (`true` if it is a map, `false` otherwise) is then inserted into the `OutputStream` for each processed event.
