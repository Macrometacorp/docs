---
title: clone (Function)
---

Function returns the cloned map.

## Syntax

```sql
<OBJECT> map:clone(<OBJECT> map)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| map  | The map to which needs to be cloned. |               | OBJECT  | No   | Yes   |

## Example 1

```sql
map:clone(stockDetails)
```

In this example, the `map:clone(stockDetails)` function is used to create a deep copy of the map named `stockDetails`. This means that it creates a new map with the same key-value pairs as `stockDetails`, and returns this new map. If any modifications are made to the original map after this operation, they will not affect the cloned map, and vice versa.

## Example 2

```sql
CREATE STREAM InputDataStream (stockDetails object);
CREATE SINK STREAM OutputDataStream (clonedMap object);

@info(name = 'CloneMap')
INSERT INTO OutputDataStream
SELECT map:clone(stockDetails) AS clonedMap
FROM InputDataStream;
```

In this stream worker example named 'CloneMap', events from the `InputDataStream`, which includes a map named `stockDetails`, are processed. The function `map:clone(stockDetails)` is used to create a deep copy of `stockDetails` for each event. The resulting cloned map is then inserted into `OutputDataStream`. This operation can be useful when you need to maintain a copy of a map for further processing or analysis, while the original map continues to be updated.
