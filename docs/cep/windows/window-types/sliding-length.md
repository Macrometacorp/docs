---
title: WINDOW SLIDING_LENGTH()
---

A _sliding length window_ that holds the last `window.length` events at a given time, and gets updated for each arrival and expiration.

## Syntax

    WINDOW SLIDING_LENGTH()(<INT> window.length)

## Query Parameters

| Name          | Description     | Default Value | Possible Data Types | Optional | Dynamic |
|----------|---------------------------------------|-------------|-----------------|----------|---------|
| window.length | The number of events that should be included in a sliding length window. |          | INT        | No       | No      |

## Example

    CREATE WINDOW StockEventWindow (symbol string, price float, volume int) WINDOW SLIDING_LENGTH(10) output all events;

    @info(name = 'query0')
    INSERT INTO StockEventWindow
    FROM StockEventStream;

    @info(name = 'query1')
    INSERT all events INTO outputStream 
    SELECT symbol, sum(price) AS price
    FROM StockEventWindow;

This query processes the last 10 events in a sliding manner.
