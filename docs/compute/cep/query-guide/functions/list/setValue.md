---
title: setValue (Function)
---

Function returns the updated list after replacing the element in the given index by the given value.

## Syntax

```sql
<OBJECT> list:setValue(<OBJECT> list, <INT> index, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)
```

## Query Parameters

| Name  | Description | Default Value | Possible Data Types  | Optional | Dynamic |
|-------|-------------|---------------|----------------------|----------|---------|
| list | The list to which the value should be updated. |          | OBJECT  | No  | Yes   |
| index | The index in which the value should to be updated. |          | INT  | No | Yes |
| value | The value to be updated with.  |      | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No   | Yes  |

## Example 1

```sql
list:set(stockSymbols, 0, 'IBM')
```

The `list:set(stockSymbols, 0, 'IBM')` function updates the `stockSymbols` list by replacing the value at the 0th index with `IBM`. The updated `stockSymbols` list is then returned, containing the new value at the specified index.

## Example 2

```sql
CREATE STREAM StockStream (symbols OBJECT, index INT, newSymbol STRING);
CREATE SINK STREAM OutputStream (updatedSymbols OBJECT);

@info(name = 'SetSymbol')
INSERT INTO OutputStream
SELECT list:setValue(symbols, index, newSymbol) AS updatedSymbols
FROM StockStream;
```

This stream worker defines the `StockStream` input stream, which includes a list of stock symbols (`symbols`), an index (`index`), and a new symbol (`newSymbol`). The function `list:setValue(symbols, index, newSymbol)` operates on each event in the `StockStream`. It processes the `symbols` attribute from each event, replaces the value at the specified `index` with `newSymbol`, and returns the updated list. The updated list is then aliased as `updatedSymbols` and inserted into the `OutputStream`. Consequently, `OutputStream` contains updated lists from each event in the `StockStream`, with the value at the specified index replaced.
