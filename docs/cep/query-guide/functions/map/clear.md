---
title: clear (Function)
---

Function returns the cleared map.

## Syntax

```sql
<OBJECT> map:clear(<OBJECT> map)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| map  | The map which needs to be cleared |       | OBJECT  | No  | Yes |

## Example 1

```sql
map:clear(stockDetails)
```

The `map:clear(stockDetails)` function is used to remove all key-value pairs from the map named `stockDetails`, leaving it empty. `stockDetails` is a map object and after the operation, it will be devoid of any elements.

## Example 2

```sql
CREATE STREAM InputDataStream (stockDetails map<string, int>);
CREATE SINK STREAM OutputDataStream (clearedMap map<string, int>);

@info(name = 'ClearMapQuery')
INSERT INTO OutputDataStream
SELECT map:clear(stockDetails) AS clearedMap
FROM InputDataStream;
```

In this stream worker example, events from the `InputDataStream`, which includes a map named `stockDetails`, are processed. The function `map:clear(stockDetails)` is used to remove all key-value pairs from `stockDetails` for each event. The resulting empty map is then inserted into `OutputDataStream`. This operation can be useful in scenarios where you need to reset the state of a map for each event or at regular intervals.
