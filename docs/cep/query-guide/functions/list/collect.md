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
INSERT INTO OutputStream
SELECT list:collect(symbol) AS stockSymbols
FROM StockStream WINDOW TUMBLING_LENGTH(10);
```

This example collects `symbol` attributes from the `StockStream` into a list. The collection happens within a tumbling window of 10 events. Once 10 events have occurred, the list of collected `symbol` attributes is output as `stockSymbols` in the `OutputStream`.

## Example 2

```sql
INSERT INTO OutputStream
SELECT list:collect(symbol, true) AS distinctStockSymbols
FROM StockStream WINDOW TUMBLING_LENGTH(10);
```

This example operates within a tumbling window of 10 events from the `StockStream`. The `list:collect(symbol, true)` function collects only unique `symbol` attributes into a list. The resulting list of unique `symbol` attributes is output as `distinctStockSymbols` in the `OutputStream`.

## Example 3

```sql
CREATE STREAM InputStockStream (symbol string, price double);
CREATE SINK STREAM OutputStockStream (collectedSymbols object);

@info(name = 'CollectSymbolsWorker')
INSERT INTO OutputStockStream
SELECT list:collect(symbol) AS collectedSymbols
FROM InputStockStream WINDOW TUMBLING_LENGTH(50);
```

Two streams are created in this stream worker example: `InputStockStream` for input data and `OutputStockStream` for output. The stream worker uses the `list:collect(symbol)` function within a tumbling window of 50 events from the `InputStockStream`. The function collects `symbol` attributes from these events into a list. When 50 events have occurred, the list of collected `symbol` attributes is output as `collectedSymbols` in the `OutputStockStream`.
