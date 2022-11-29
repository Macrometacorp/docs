---
title: timeLength (Window)
---

A sliding time window that, at a given time holds the last window.length events that arrived during last window.time period, and gets updated for every event arrival and expiration.

Syntax

    timeLength(<INT|LONG|TIME> window.time, <INT> window.length)

## Query Parameters

| Name          | Description                                                                  | Default Value | Possible Data Types | Optional | Dynamic |
|---------------|------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| window.time   | The sliding time period for which the window should hold events.             |               | INT LONG TIME       | No       | No      |
| window.length | The number of events that should be be included in a sliding length window.. |               | INT                 | No       | No      |

## Example 1

    CREATE STREAM cseEventStream (symbol string, price float, volume int);
    CREATE WINDOW cseEventWindow (symbol string, price float, volume int) timeLength(2 sec, 10);

    @info(name = 'query0')
    insert into cseEventWindow
    from cseEventStream;

    @info(name = 'query1')
    insert all events into outputStream
    from cseEventWindow select symbol, price, volume;

window.timeLength(2 sec, 10) holds the last 10 events that arrived during last 2 seconds and gets updated for every event arrival and expiration.
