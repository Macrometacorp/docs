---
title: merge (Aggregate Function)
---

Collects multiple lists to merge as a single list.

Syntax

    <OBJECT> list:merge(<OBJECT> list)
    <OBJECT> list:merge(<OBJECT> list, <BOOL> is.distinct)

## Query Parameters

| Name        | Description                                 | Default Value | Possible Data Types | Optional | Dynamic |
|-------------|---------------------------------------------|---------------|---------------------|----------|---------|
| list        | List to be merged                           |               | OBJECT              | No       | Yes     |
| is.distinct | Whether to return list with distinct values | false         | BOOL                | Yes      | Yes     |

## Example 1

    insert into OutputStream
    select list:merge(list) as stockSymbols
    from StockStream WINDOW TUMBLING_LENGTH(2);

For the window expiration of 2 events, the merge() function collects attributes of `list` and merge them to a single list, returned as stockSymbols.
