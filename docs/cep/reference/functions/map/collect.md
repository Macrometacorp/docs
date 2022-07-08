---
title: collect (Aggregate Function)
---

Collect multiple key-value pairs to construct a map. Only distinct keys are collected, if a duplicate key arrives, it overrides the old value

Syntax

    <OBJECT> map:collect(<INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

## Query Parameters

| Name  | Description            | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------|------------------------|---------------|------------------------------------------|----------|---------|
| key   | Key of the map entry   |               | INT LONG FLOAT DOUBLE FLOAT BOOL STRING  | No       | Yes     |
| value | Value of the map entry |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

## Example 1

    insert into OutputStream
    select map:collect(symbol, price) as stockDetails
    from StockStream WINDOW TUMBLING_LENGTH(10);

For the window expiration of 10 events, the collect() function will collectattributes of `key` and `value` to a single map and return as stockDetails.
