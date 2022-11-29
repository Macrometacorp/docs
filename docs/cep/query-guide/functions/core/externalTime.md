---
title: externalTime (Window)
---

A sliding time window based on external time. It holds events that arrived during the last windowTime period from the external timestamp, and gets updated on every monotonically increasing timestamp.

Syntax

    externalTime(<LONG> timestamp, <INT|LONG|TIME> window.time)

## Query Parameters

| Name        | Description                                                                                                                             | Default Value | Possible Data Types | Optional | Dynamic |
|-------------|-----------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| timestamp   | The time which the window determines as current time and will act upon. The value of this parameter should be monotonically increasing. |               | LONG                | No       | Yes     |
| window.time | The sliding time period for which the window should hold events.                                                                        |               | INT LONG TIME       | No       | No      |

## Example 1

    CREATE WINDOW cseEventWindow (symbol string, price float, volume int) externalTime(eventTime, 20 sec) output expired events;

    @info(name = 'query0')
    insert into cseEventWindow
    from cseEventStream;

    @info(name = 'query1')
    insert expired events into outputStream
    select symbol, sum(price) as price
    from cseEventWindow;

Processing events arrived within the last 20 seconds from the eventTime and output expired events.
