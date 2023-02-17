---
title: timeLengthBatch
---

This is a batch or tumbling time length window that is updated with the latest events based on a unique key parameter. The window tumbles upon the elapse of the time window, or when a number of unique events have arrived. If a new event that arrives within the period of the window has a value for the key parameter which matches the value of an existing event, the existing event expires and it is replaced by the new event.

## Syntax

```sql
    WINDOW UNIQUE:timeLengthBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time, <INT> window.length)
    WINDOW UNIQUE:timeLengthBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time, <INT|LONG> start.time, <INT> window.length)
```

## Query Parameters

| Name          | Description   | Default Value            | Possible Data Types | Optional | Dynamic |
|-------------|-----------------------------------------------|-------------------|-----------------------|----------|---------|
| unique.key    | The attribute that should be checked for uniqueness.    |            | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| window.time   | The sliding time period for which the window should hold the events.  |            | INT LONG            | No       | No      |
| start.time    | This specifies an offset in milliseconds in order to start the window at a time different to the standard time. | Timestamp of first event | INT LONG            | Yes      | No      |
| window.length | The number of events the window should tumble.          |            | INT   | No       | No      |

## Example 1

```sql
    CREATE STREAM CseEventStream (symbol string, price float, volume int)

    FROM CseEventStream WINDOW UNIQUE:timeLengthBatch(symbol, 1 sec, 20)
    SELECT symbol, price, volume
    INSERT all events INTO OutputStream;
```

This window holds the latest unique events that arrive from the `CseEventStream` at a given time, and returns all the events to the `OutputStream`. It is updated every second based on the latest values for the `symbol` attribute.
