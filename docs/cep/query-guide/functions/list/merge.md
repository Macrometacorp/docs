---
title: merge (Aggregate Function)
---

Collects multiple lists to merge as a single list.

## Syntax

```sql
<OBJECT> list:merge(<OBJECT> list)
<OBJECT> list:merge(<OBJECT> list, <BOOL> is.distinct)
```

## Query Parameters

| Name  | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|-------|--------------|---------------|---------------------|----------|---------|
| list   | List to be merged    |           | OBJECT  | No    | Yes     |
| is.distinct | Whether to return list with distinct values | false | BOOL   | Yes  | Yes |

## Example 1

```sql
@info(name = 'query1')
INSERT INTO OutputStream
SELECT list:merge(list) AS stockSymbols
FROM StockStream WINDOW TUMBLING_LENGTH(2);
```

In this query, the `StockStream` contains events with an attribute `list` of type ARRAY<string>. The query processes events using a tumbling window of length 2, which means that it groups events in non-overlapping sets of two.

For each set of two events within the tumbling window, the `list:merge(list)` function is applied. This function takes the `list` attributes from both events and merges their elements into a single, combined list.

The merged list is then aliased as `stockSymbols` and inserted into the `OutputStream`. As a result, the `OutputStream` will contain events with combined lists from every pair of consecutive events in the `StockStream`.
