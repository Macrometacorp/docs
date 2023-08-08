---
title: lastIndexOf (Function)
---

Function returns the index of the given value.

## Syntax

```sql
<INT> list:lastIndexOf(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)
```

## Query Parameters

| Name  | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|-------|--------------|---------------|---------------------|----------|---------|
| list  | The list to be checked to get index of an element. |        | OBJECT | No       | Yes     |
| value | Value for which last index needs to be identified. |        | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No     | Yes    |

## Example 1

```sql
list:lastIndexOf(stockSymbols, 'IBM')
```

The `list:lastIndexOf(stockSymbols, 'IBM')` function checks the `stockSymbols` list for the last occurrence of the value 'IBM'. It returns the index of the last occurrence if found; otherwise, it returns -1.

## Example 2

```sql
CREATE STREAM InputStream (stockList OBJECT, symbol STRING);
CREATE SINK STREAM OutputStream (symbolIndex INT);

@info(name = 'SymbolSearch')
INSERT INTO OutputStream
SELECT list:lastIndexOf(stockList, symbol) AS symbolIndex
FROM InputStream;
```

In this stream worker example, a query named `SymbolSearch` processes events from the `InputStream`, which contains a list of stock symbols (`stockList`) and a target stock symbol (`symbol`). The `list:lastIndexOf(stockList, symbol)` function checks the `stockList` for the last occurrence of the target `symbol`. If the target `symbol` is found, the function outputs the index of its last occurrence to `symbolIndex` for each event to the `OutputStream`. If the target `symbol` is not found, the function outputs `-1` to `symbolIndex`.
