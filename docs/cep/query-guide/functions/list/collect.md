---
title: collect (Aggregate Function)
---

Collects multiple values to construct a list.

## Syntax

```sql
<OBJECT> list:collect(<OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)
<OBJECT> list:collect(<OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value, <BOOL> is.distinct)
```

## Query Parameters

| Name   | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|--------|--------------|---------------|-----------------------|----------|---------|
| value       | Value of the list element   |        | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No   | Yes |
| is.distinct | If `true` only distinct elements are collected | false  | BOOL | Yes | Yes |

## Example 1

```sql
@info(name = 'query1')
INSERT INTO OutputStream
SELECT list:collect(symbol) AS stockSymbols
FROM StockStream WINDOW TUMBLING_LENGTH(10);
```

In this query, the `list:collect(symbol)` function is used within a tumbling window of 10 events. As events enter the `StockStream`, the function collects the `symbol` attributes from each event into a single list. When the window reaches its expiration (10 events), the list of collected `symbol` attributes is output as `stockSymbols` in the `OutputStream`.
