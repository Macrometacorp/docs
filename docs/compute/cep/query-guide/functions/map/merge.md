---
title: merge (Aggregate Function)
---

Collect multiple maps to merge as a single map. Only distinct keys are collected. If a duplicate key arrives, then it overrides the old value.

## Syntax

```sql
<OBJECT> map:merge(<OBJECT> map)
```

## Query Parameters

| Name | Description          | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------------|---------------|---------------------|----------|---------|
| map  | Maps to be collected |               | OBJECT              | No       | Yes     |

## Example 1

```sql
map:merge(map)
```

The `map:merge(map)` function takes a collection of maps and merges them into a single map. If there are conflicting keys, the function will overwrite the values with the ones from the latest map.

## Example 2

```sql
CREATE STREAM StockInputStream (stockMap object);
CREATE SINK STREAM MergedStockStream (mergedStockDetails object);

@info(name = 'MergeMaps')
INSERT INTO MergedStockStream
SELECT map:merge(stockMap) AS mergedStockDetails
FROM StockInputStream WINDOW TUMBLING_LENGTH(5);
```

In this example, a stream named `StockInputStream` is created to provide input to the `MergeMaps` query. This stream contains events with a map named `stockMap`. A sink stream `MergedStockStream` is created to collect the output.

The `MergeMaps` query processes events from `StockInputStream` in a tumbling window of size 5. For each batch of 5 events, the query applies the `map:merge(stockMap)` function to merge all `stockMap` instances into a single map. The merged map is then inserted into the `MergedStockStream` with the attribute name `mergedStockDetails`.
