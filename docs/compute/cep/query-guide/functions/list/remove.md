---
title: remove (Function)
---

Function returns the updated list after removing the element with the specified value.

## Syntax

```sql
<OBJECT> list:remove(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)
```

## Query Parameters

| Name  | Description   | Default Value | Possible Data Types  | Optional | Dynamic |
|-------|---------------|---------------|----------------------|----------|---------|
| list  | The list that needs to be updated. |       | OBJECT  | No    | Yes    |
| value | The value of the element that needs to removed. |        | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No  | Yes  |

## Example 1

```sql
list:remove(stockSymbols, 'IBM')
```

The `list:remove(stockSymbols, 'IBM')` function removes the element `IBM` from the `stockSymbols` list and returns the updated list.

## Example 2

```sql
CREATE STREAM StockStream (symbols OBJECT, symbolToRemove STRING);
CREATE SINK STREAM OutputStream (updatedSymbols OBJECT);

@info(name = 'RemoveSymbol')
INSERT INTO OutputStream
SELECT list:remove(symbols, symbolToRemove) AS updatedSymbols
FROM StockStream;
```

In this stream worker, an input stream `StockStream` is defined, which includes a list of stock symbols (`symbols`) and a symbol to remove (`symbolToRemove`). The function `list:remove(symbols, symbolToRemove)` operates on each event in the `StockStream`. This function processes the `symbols` attribute from each event and removes the specified `symbolToRemove` from the list. The updated list is then aliased as `updatedSymbols` and inserted into the `OutputStream`. Consequently, `OutputStream` contains the updated lists with the specified symbol removed from each event in the `StockStream`.
