---
title: SLIDING_TIME
---

This is a sliding time window that holds the latest unique events that arrived during the previous time window. The unique events are determined based on the value for a specified unique key parameter. The window is updated with the arrival and expiration of each event. When a new event that arrives within a window time period has the same value for the unique key parameter as an existing event in the window, the previous event is replaced by the new event.

## Syntax

```sql
    WINDOW UNIQUE:SLIDING_TIME(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time)
```

## Query Parameters

| Name        | Description            | Default Value | Possible Data Types | Optional | Dynamic |
|-------------|---------------------------------|---------------|----------------------|----------|---------|
| unique.key  | The attribute that should be checked for uniqueness.             | | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| window.time | The sliding time period for which the window should hold events. | | INT LONG            | No       | No      |

## Example 1

```sql
    CREATE STREAM CseEventStream (symbol string, price float, volume int)

    INSERT expired events INTO OutputStream
    SELECT symbol, price, volume    
    FROM CseEventStream WINDOW UNIQUE:SLIDING_TIME(symbol, 1 sec)
```

In this query, the window holds the latest unique events that arrived within the last second from the `CseEventStream`, and returns the expired events to the `OutputStream`. During any given second, each event in the window should have a unique value for the `symbol` attribute. If a new event that arrives within the same second has the same value for the symbol attribute as an existing event in the window, the existing event expires.
