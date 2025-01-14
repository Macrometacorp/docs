---
title: isList (Function)
---

Function checks if the object is type of a list.

## Syntax

```sql
<BOOL> list:isList(<OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> arg)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|--------------------|----------|---------|
| arg | The argument the need to be determined whether it`s a list or not.|      | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No    | Yes     |

## Example 1

```sql
list:isList(stockSymbols)
```

The `list:isList(stockSymbols)` function checks if `stockSymbols` is a list. It returns `true` if `stockSymbols` is an instance of `java.util.List`; otherwise, it returns `false`.

## Example 2

```sql
CREATE STREAM InputStream (potentialList OBJECT);
CREATE SINK STREAM OutputStream (isList BOOL);

@info(name = 'ListChecker')
INSERT INTO OutputStream
SELECT list:isList(potentialList) AS isList
FROM InputStream;
```

In this stream worker example, a query named `ListChecker` processes events from the `InputStream`, which contains an object `potentialList`. The `list:isList(potentialList)` function checks if the object is a list. If `potentialList` is a list, the function outputs `true` to `isList` for each event to the `OutputStream`. If `potentialList` is not a list, the function outputs `false` to `isList`.
