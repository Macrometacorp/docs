---
title: removeAll (Function)
---

Function returns the updated list after removing all the element with the specified list.

## Syntax

```sql
<OBJECT> list:removeAll(<OBJECT> list, <OBJECT> given.list)
```

## Query Parameters

| Name   | Description | Default Value | Possible Data Types | Optional | Dynamic |
|--------|------------|---------------|---------------------|----------|---------|
| list  | The list that needs to be updated.   |               | OBJECT  | No    | Yes  |
| given.list | The list with all the elements that needs to removed. |               | OBJECT   | No    | Yes  |

## Example 1

```sql
list:removeAll(stockSymbols, latestStockSymbols)
```

The `list:removeAll(stockSymbols, latestStockSymbols)` function removes all elements from the `stockSymbols` list that are also present in the `latestStockSymbols` list. It then returns the updated `stockSymbols` list.

## Example 2

```sql
CREATE STREAM StockStream (symbols OBJECT, symbolsToRemove OBJECT);
CREATE SINK STREAM OutputStream (updatedSymbols OBJECT);

@info(name = 'RemoveAllSymbols')
INSERT INTO OutputStream
SELECT list:removeAll(symbols, symbolsToRemove) AS updatedSymbols
FROM StockStream;
```

In this stream worker, an input stream `StockStream` is defined, which includes a list of stock symbols (`symbols`) and a list of symbols to remove (`symbolsToRemove`). The function `list:removeAll(symbols, symbolsToRemove)` operates on each event in the `StockStream`.

This function processes the `symbols` attribute from each event and removes all symbols that are present in the `symbolsToRemove` list. The updated list is then aliased as `updatedSymbols` and inserted into the `OutputStream`. Consequently, `OutputStream` contains the updated lists with the specified symbols removed from each event in the `StockStream`.
