---
title: firstLengthBatch (Window)
---

This is a batch (tumbling) window that holds a specific number of unique events (depending on which events arrive first). The unique events are selected based on a specific parameter that is considered as the unique key. When a new event arrives with a value for the unique key parameter that matches the same of an existing event in the window, that event is not processed by the window.

Syntax

    unique:firstLengthBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT> window.length)

## Query Parameters

| Name          | Description                                          | Default Value | Possible Data Types               | Optional | Dynamic |
|---------------|------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| unique.key    | The attribute that should be checked for uniqueness. |               | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| window.length | The number of events the window should tumble.       |               | INT                               | No       | No      |

## Example 1

    CREATE WINDOW CseEventWindow (symbol string, price float, volume int);

    from CseEventStream WINDOW UNIQUE:firstLengthBatch(symbol, 10)
    select symbol, price, volume
    insert all events into OutputStream ;

The window in this configuration holds the first unique events from the `CseEventStream` stream every second, and outputs them all into the the `OutputStream` stream. All the events in a window during a given second should have a unique value for the `symbol` attribute.
