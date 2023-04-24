---
title: collect (Aggregate Function)
---

Collect multiple key-value pairs to construct a map. Only distinct keys are collected. If a duplicate key arrives, then it overrides the old value.

## Syntax

```sql
<OBJECT> map:collect(<INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)
```

## Query Parameters

| Name  | Description | Default Value | Possible Data Types | Optional | Dynamic |
|-------|-------------|---------------|--------------------|----------|---------|
| key  | Key of the map entry  |       | INT LONG FLOAT DOUBLE FLOAT BOOL STRING  | No | Yes |
| value | Value of the map entry |       | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No   | Yes  |

## Example 1

```sql
@info(name = 'query1')
INSERT INTO OutputStream
SELECT map:collect(symbol, price) AS stockDetails
FROM StockStream WINDOW TUMBLING_LENGTH(10);
```

In this query, a tumbling window of 10 events is applied to the `StockStream`. The `map:collect(symbol, price)` function is used to create a map for each event in the window. It collects the `symbol` attribute as the key and the `price` attribute as the value.

When the window expires (after 10 events), the query outputs a single event in the `OutputStream` with a map named `stockDetails` that contains the collected key-value pairs of symbols and their corresponding prices from the events in the window.
