---
title: containsAll (Function)
---

Function checks whether the list contains all the values in the given list.

## Syntax

```sql
<BOOL> list:containsAll(<OBJECT> list, <OBJECT> given.list)
```

## Query Parameters

| Name       | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------------|--------------|---------------|---------------------|----------|---------|
| list | The list that needs to be checked on whether it contains all the values or not. |          | OBJECT    | No       | Yes     |
| given.list | The list which contains all the values to be checked. |        | OBJECT | No | Yes |

## Example 1

```sql
list:containsAll(stockSymbols, latestStockSymbols)
```

In this example, the `list:containsAll(stockSymbols, latestStockSymbols)` function checks if the `stockSymbols` list contains all the values present in the `latestStockSymbols` list. It returns `true` if all the values from `latestStockSymbols` are found in the `stockSymbols` list, otherwise, it returns `false`.

## Example 2

```sql
CREATE STREAM InputStream (stockSymbols OBJECT, latestStockSymbols OBJECT);
CREATE SINK STREAM OutputStream (containsAllSymbols BOOL);

@info(name = 'CheckAllSymbolsPresence')
INSERT INTO OutputStream
SELECT list:containsAll(stockSymbols, latestStockSymbols) AS containsAllSymbols
FROM InputStream;
```

In this stream worker example, a query named `CheckAllSymbolsPresence` processes events from the `InputStream`, which contains a list of stock symbols (`stockSymbols`) and a list of latest stock symbols (`latestStockSymbols`). The `list:containsAll(stockSymbols, latestStockSymbols)` function checks if each `stockSymbols` list contains all the symbols from the corresponding `latestStockSymbols` list. The result of this check, a boolean value, is output as `containsAllSymbols` for each event to the `OutputStream`.
