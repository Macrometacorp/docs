---
title: size (Function)
---

Function to return the size of the list.

## Syntax

```sql
<INT> list:size(<OBJECT> list)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| list | The list for which size should be returned. |         | OBJECT | No | Yes |

## Example 1

```sql
list:size(stockSymbols)
```

The `list:size(stockSymbols)` function calculates and returns the size (number of elements) of the `stockSymbols` list.

## Example 2

```sql
CREATE STREAM StockStream (symbols OBJECT);
CREATE SINK STREAM OutputStream (symbolCount INT);

@info(name = 'SymbolCount')
INSERT INTO OutputStream
SELECT list:size(symbols) AS symbolCount
FROM StockStream;
```

In this stream worker, an input stream named `StockStream` is defined, containing a list of stock symbols (`symbols`). The function `list:size(symbols)` operates on each event in the `StockStream`. This function counts the number of elements in the `symbols` list and returns this count. This count is then aliased as `symbolCount` and inserted into the `OutputStream`. As a result, the `OutputStream` contains the counts of symbols from each event in the `StockStream`.
