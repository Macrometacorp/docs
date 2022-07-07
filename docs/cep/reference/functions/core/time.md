---
title: time (Window)
---

A sliding time window that holds events that arrived during the last windowTime period at a given time, and gets updated for each event arrival and expiration.

Syntax

    time(<INT|LONG|TIME> window.time)

## Query Parameters

| Name        | Description                                                      | Default Value | Possible Data Types | Optional | Dynamic |
|-------------|------------------------------------------------------------------|---------------|---------------------|----------|---------|
| window.time | The sliding time period for which the window should hold events. |               | INT LONG TIME       | No       | No      |

## Example 1

    CREATE WINDOW cseEventWindow (symbol string, price float, volume int) time(20) output all events;

    @info(name = 'query0')
    insert into cseEventWindow
    from cseEventStream;

    @info(name = 'query1')
    insert all events into outputStream 
    select symbol, sum(price) as price
    from cseEventWindow;

This processes events that arrived within the last 20 milliseconds.
