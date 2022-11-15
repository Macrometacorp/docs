---
title: collect (Aggregate Function)
---

Collects multiple values to construct a list.

Syntax

    <OBJECT> list:collect(<OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)
    <OBJECT> list:collect(<OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value, <BOOL> is.distinct)

## Query Parameters

| Name        | Description                                    | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------------|------------------------------------------------|---------------|------------------------------------------|----------|---------|
| value       | Value of the list element                      |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |
| is.distinct | If `true` only distinct elements are collected | false         | BOOL                                     | Yes      | Yes     |

## Example 1

    insert into OutputStream
    select list:collect(symbol) as stockSymbols
    from StockStream WINDOW TUMBLING_LENGTH(10);

For the window expiration of 10 events, the collect() function collects attributes of `symbol` to a single list and return as stockSymbols.
