---
title: retainAll (Function)
---

Function returns the updated list after retaining all the elements in the specified list.

## Syntax

```sql
<OBJECT> list:retainAll(<OBJECT> list, <OBJECT> given.list)
```

## Query Parameters

| Name   | Description | Default Value | Possible Data Types | Optional | Dynamic |
|--------|-------------|---------------|---------------------|----------|---------|
| list       | The list that needs to be updated.  |          | OBJECT  | No    | Yes     |
| given.list | The list with all the elements that needs to retained. |          | OBJECT | No  | Yes |

## Example 1

```sql
list:retainAll(stockSymbols, latestStockSymbols)
```

The `list:retainAll(stockSymbols, latestStockSymbols)` function retains only the elements in the `stockSymbols` list that are also present in the `latestStockSymbols` list. It then returns the updated `stockSymbols` list containing only these common elements.

## Example 2

```sql
CREATE STREAM StockStream (symbols OBJECT, symbolsToRetain OBJECT);
CREATE SINK STREAM OutputStream (updatedSymbols OBJECT);

@info(name = 'RetainSymbols')
INSERT INTO OutputStream
SELECT list:retainAll(symbols, symbolsToRetain) AS updatedSymbols
FROM StockStream;
```

In this stream worker, the `StockStream` input stream is defined, which includes a list of stock symbols (`symbols`) and a list of symbols to retain (`symbolsToRetain`). The function `list:retainAll(symbols, symbolsToRetain)` operates on each event in the `StockStream`. It processes the `symbols` attribute from each event and retains only the elements that are also present in `symbolsToRetain`. The updated list is then aliased as `updatedSymbols` and inserted into the `OutputStream`. As a result, `OutputStream` contains updated lists from each event in the `StockStream`, with only common elements retained.
