---
title: timeBatch (Window)
---

This is a batch (tumbling) time window that is updated with the latest events based on a unique key parameter. If a new event that arrives within the time period of a windowhas a value for the key parameter which matches that of an existing event, the existing event expires and it is replaced by the latest event.

Syntax

    unique:timeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time)
    unique:timeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time, <INT|LONG> start.time)

## Query Parameters

| Name        | Description                                                                                                     | Default Value            | Possible Data Types               | Optional | Dynamic |
|-------------|-----------------------------------------------------------------------------------------------------------------|--------------------------|-----------------------------------|----------|---------|
| unique.key  | The attribute that should be checked for uniqueness.                                                            |                          | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| window.time | The tumbling time period for which the window should hold events.                                               |                          | INT LONG                          | No       | No      |
| start.time  | This specifies an offset in milliseconds in order to start the window at a time different to the standard time. | Timestamp of first event | INT LONG                          | Yes      | No      |

## Example 1

    CREATE STREAM CseEventStream (symbol string, price float, volume int)

    from CseEventStream WINDOW UNIQUE:timeBatch(symbol, 1 sec)
    select symbol, price, volume
    insert all events into OutputStream ;

This window holds the latest unique events that arrive from the `CseEventStream` at a given time, and returns all the events to the `OutputStream` stream. It is updated every second based on the latest values for the `symbol` attribute.
