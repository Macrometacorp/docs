---
title: removeByIndex (Function)
---

Function returns the updated list after removing the element with the specified index.

## Syntax

```sql
<OBJECT> list:removeByIndex(<OBJECT> list, <INT> index)
```

## Query Parameters

| Name  | Description | Default Value | Possible Data Types | Optional | Dynamic |
|-------|-------------|---------------|---------------------|----------|---------|
| list  | The list that needs to be updated. |               | OBJECT | No   | Yes  |
| index | The index of the element that needs to removed. |            | INT  | No  | Yes |

## Example 1

```sql
list:removeByIndex(stockSymbols, 0)
```

The `list:removeByIndex(stockSymbols, 0)` function removes the element at the 0th index from the `stockSymbols` list and then returns the updated list.

## Example 2

```sql
CREATE STREAM StockStream (symbols OBJECT, indexToRemove INT);
CREATE SINK STREAM OutputStream (updatedSymbols OBJECT);

@info(name = 'RemoveSymbolAtIndex')
INSERT INTO OutputStream
SELECT list:removeByIndex(symbols, indexToRemove) AS updatedSymbols
FROM StockStream;
```

In this stream worker, an input stream `StockStream` is defined, which includes a list of stock symbols (`symbols`) and an index (`indexToRemove`). The function `list:removeByIndex(symbols, indexToRemove)` operates on each event in the `StockStream`. It processes the `symbols` attribute from each event and removes the symbol at the `indexToRemove` index. The updated list is then aliased as `updatedSymbols` and inserted into the `OutputStream`. As a result, `OutputStream` contains the updated lists from each event in the `StockStream`, with the specified index removed.
