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
INSERT INTO OutputStream
SELECT list:merge(list) AS stockSymbols
FROM StockStream WINDOW TUMBLING_LENGTH(2);
```

In this query, the `StockStream` contains events with an attribute `list` of type `ARRAY<string>`. The query processes events using a tumbling window of length 2, which means that it groups events in non-overlapping sets of two.

For each set of two events within the tumbling window, the `list:merge(list)` function is applied. This function takes the `list` attributes from both events and merges their elements into a single, combined list.

The merged list is then aliased as `stockSymbols` and inserted into the `OutputStream`. As a result, the `OutputStream` will contain events with combined lists from every pair of consecutive events in the `StockStream`.

## Example 2

```sql
CREATE STREAM StockStream (list OBJECT);
CREATE SINK STREAM OutputStream (stockSymbols OBJECT);

@info(name = 'MergeList')
INSERT INTO OutputStream
SELECT list:merge(list) AS stockSymbols
FROM StockStream WINDOW TUMBLING_LENGTH(2);
```

In this stream worker, an input stream `StockStream` is defined, which contains a list of stock symbols. The function `list:merge(list)` operates on a tumbling window of length 2 on the `StockStream`. This function processes the `list` attribute from every two events and merges them into a single list. The merged list is then aliased as `stockSymbols` and inserted into the `OutputStream`. Consequently, `OutputStream` contains combined lists from every pair of consecutive events in the `StockStream`.
