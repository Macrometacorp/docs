---
title: length (Window)
---

A sliding length window that holds the last `window.length` events at a given time, and gets updated for each arrival and expiration.

Syntax

    length(<INT> window.length)

## Query Parameters

| Name          | Description                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|---------------|--------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| window.length | The number of events that should be included in a sliding length window. |               | INT                 | No       | No      |

## Example 1

    CREATE WINDOW StockEventWindow (symbol string, price float, volume int) length(10) output all events;

    @info(name = 'query0')
    insert into StockEventWindow
    from StockEventStream;

    @info(name = 'query1')
    insert all events into outputStream 
    select symbol, sum(price) as price
    from StockEventWindow;

This processes the last 10 events in a sliding manner.
