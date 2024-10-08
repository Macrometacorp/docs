---
title: sort (Function)
---

Function returns lists sorted in ascending or descending order.

## Syntax

```sql
<OBJECT> list:sort(<OBJECT> list)
<OBJECT> list:sort(<OBJECT> list, <STRING> order)
```

## Query Parameters

| Name  | Description | Default Value | Possible Data Types | Optional | Dynamic |
|-------|-------------|---------------|---------------------|----------|---------|
| list  | The list which should be sorted.     |               | OBJECT   | No  | Yes  |
| order | Order in which the list needs to be sorted (ASC/DESC/REV). | REV  | STRING | Yes   | No    |

## Example 1

```sql
list:sort(stockSymbols)
```

The `list:sort(stockSymbols)` function receives the list named `stockSymbols` and generates a new list containing the sorted elements of `stockSymbols` in ascending order.

## Example 2

```sql
list:sort(stockSymbols, 'DESC')
```

The `list:sort(stockSymbols, 'DESC')` function receives the list named `stockSymbols` and produces a new list containing the sorted elements of `stockSymbols` in descending order.

## Example 3

```sql
CREATE STREAM StockStream (symbols OBJECT);
CREATE SINK STREAM OutputStream (sortedSymbols OBJECT);

@info(name = 'SymbolSort')
INSERT INTO OutputStream
SELECT list:sort(symbols, 'DESC') AS sortedSymbols
FROM StockStream;
```

In this stream worker, an input stream named `StockStream` is defined, which contains a list of stock symbols (`symbols`). The function `list:sort(symbols, 'DESC')` is applied on each event in the `StockStream`. This function sorts the `symbols` list in descending order and returns this sorted list. The sorted list is then aliased as `sortedSymbols` and inserted into the `OutputStream`. As a result, the `OutputStream` will contain sorted lists of symbols from each event in the `StockStream`.
