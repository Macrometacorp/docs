---
title: lengthBatch (Window)
---

This is a batch (tumbling) window that holds a specified number of latest unique events. The unique events are determined based on the value for a specified unique key parameter. The window is updated for every window length, i.e., for the last set of events of the specified number in a tumbling manner. When a new event arrives within the window length having the same value for the unique key parameter as an existing event in the window, the previous event is replaced by the new event.

Syntax

    unique:lengthBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT> window.length)

## Query Parameters

| Name          | Description                                          | Default Value | Possible Data Types               | Optional | Dynamic |
|---------------|------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| unique.key    | The attribute that should be checked for uniqueness. |               | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| window.length | The number of events the window should tumble.       |               | INT                               | No       | No      |

## Example 1

    CREATE WINDOW CseEventWindow (symbol string, price float, volume int);

     from CseEventStream WINDOW UNIQUE:lengthBatch(symbol, 10)
    select symbol, price, volume
    insert expired events into OutputStream ;

In this query, the window at any give time holds the last 10 unique events from the `CseEventStream` stream. Each of the 10 events within the window at a given time has a unique value for the symbol attribute. If a new event has the same value for the symbol attribute as an existing event within the window length, the existing event expires and it is replaced by the new event. The query returns expired individual events as well as expired batches of events to the `OutputStream` stream.
