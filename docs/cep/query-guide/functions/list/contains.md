---
title: contains (Function)
---

Function checks whether the list contains the specific value.

## Syntax

```sql
<BOOL> list:contains(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)
```

## Query Parameters

| Name  | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|-------|--------------|---------------|---------------------|----------|---------|
| list | The list that needs to be checked on whether it contains the value or not.|      | OBJECT    | No       | Yes     |
| value | The value that needs to be checked.  |       | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No    | Yes     |

## Example 1

```sql
list:contains(stockSymbols, 'IBM')
```

This example demonstrates the usage of the `list:contains()` function. It checks if the `stockSymbols` list contains the value `'IBM'`. The function returns `true` if the string 'IBM' is found in the list, and `false` otherwise.

## Example 2

```sql
CREATE STREAM InputStream (stockSymbols OBJECT, symbol STRING);
CREATE SINK STREAM OutputStream (containsSymbol BOOL);

@info(name = 'CheckSymbolPresence')
INSERT INTO OutputStream
SELECT list:contains(stockSymbols, symbol) AS containsSymbol
FROM InputStream;
```

In this stream worker example, a query named `CheckSymbolPresence` processes events from the `InputStream`, which contains a list of stock symbols (`stockSymbols`) and a single symbol (`symbol`). The `list:contains(stockSymbols, symbol)` function checks if each `stockSymbols` list contains the given `symbol`. The query outputs the result as `containsSymbol` for each event to the `OutputStream`.
