---
title: firstTimeBatch (Window)
---

A batch-time or tumbling window that holds the unique events according to the unique key parameters that have arrived within the time period of that window and gets updated for each such time window. When a new event arrives with a key which is already in the window, that event is not processed by the window.

Syntax

    unique:firstTimeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time)
    unique:firstTimeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time, <INT|LONG> start.time)

## Query Parameters

| Name        | Description                                                                                                     | Default Value                 | Possible Data Types               | Optional | Dynamic |
|-------------|-----------------------------------------------------------------------------------------------------------------|-------------------------------|-----------------------------------|----------|---------|
| unique.key  | The attribute that should be checked for uniqueness.                                                            |                               | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| window.time | The sliding time period for which the window should hold events.                                                |                               | INT LONG                          | No       | No      |
| start.time  | This specifies an offset in milliseconds in order to start the window at a time different to the standard time. | Timestamp of the first event. | INT LONG                          | Yes      | No      |

## Example 1

    CREATE STREAM CseEventStream (symbol string, price float, volume int)

    from CseEventStream WINDOW UNIQUE:firstTimeBatch(symbol,1 sec)
     select symbol, price, volume
    insert all events into OutputStream ;

This holds the first unique events that arrive from the `cseEventStream` input stream during each second, based on the symbol,as a batch, and returns all the events to the `OutputStream`.
