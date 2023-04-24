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
@info(name = 'query1')
INSERT INTO OutputStream
SELECT map:merge(map) AS stockDetails
FROM StockStream WINDOW TUMBLING_LENGTH(2);
```

For the window expiration of two events, the `map:merge(map)` function collects attributes of the `map` from the `StockStream` and merges them into a single map. The merged map is returned as `stockDetails` in the `OutputStream`.
