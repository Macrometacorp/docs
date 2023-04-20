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
@info(name = 'query1')
list:isList(stockSymbols)
```

The `list:isList(stockSymbols)` function returns `true` if the `stockSymbols` is an instance of `java.util.List`; otherwise, it returns `false`.
