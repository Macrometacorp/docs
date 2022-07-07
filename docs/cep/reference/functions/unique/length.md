---
title: length (Window)
---

This is a sliding length window that holds the events of the latest window length with the unique key and gets updated for the expiration and arrival of each event. When a new event arrives with the key that is already there in the window, then the previous event expires and new event is kept within the window.

Syntax

    unique:length(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT> window.length)

## Query Parameters

| Name          | Description                                                              | Default Value | Possible Data Types               | Optional | Dynamic |
|---------------|--------------------------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| unique.key    | The attribute that should be checked for uniqueness.                     |               | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| window.length | The number of events that should be included in a sliding length window. |               | INT                               | No       | No      |

## Example 1

    CREATE STREAM CseEventStream (symbol string, price float, volume int)

    from CseEventStream WINDOW UNIQUE:length(symbol,10)
    select symbol, price, volume
    insert all events into OutputStream;

In this configuration, the window holds the latest 10 unique events. The latest events are selected based on the symbol attribute. If the `CseEventStream` receives an event for which the value for the symbol attribute is the same as that of an existing event in the window, the existing event is replaced by the new event. All the events are returned to the `OutputStream` event stream once an event expires or is added to the window.
