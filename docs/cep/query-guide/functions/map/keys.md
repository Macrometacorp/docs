---
title: keys (Function)
---

Function to return the keys of the map as a list.

## Syntax

```sql
<OBJECT> map:keys(<OBJECT> map)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| map  | The map from which list of keys to be returned. |         | OBJECT | No   | Yes |

## Example 1

```sql
map:keys(stockDetails)
```

The `map:keys(stockDetails)` function evaluates the `stockDetails` map and returns a list containing all the keys present in this map.

## Example 2

```sql
CREATE STREAM InputStream (stockDetails object);
CREATE SINK STREAM OutputStream (stockKeys object);

@info(name = 'FetchKeys')
INSERT INTO OutputStream
SELECT map:keys(stockDetails) AS stockKeys
FROM InputStream;
```

In this stream worker, the `FetchKeys` query processes events from the `InputStream`. Each event carries a `stockDetails` object. The query applies the `map:keys(stockDetails)` function to retrieve a list of keys present in the `stockDetails` map. This list is then inserted into the `OutputStream` as part of each resulting event.
