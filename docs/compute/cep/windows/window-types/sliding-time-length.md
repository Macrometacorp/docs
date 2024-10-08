---
title: SLIDING_TIME_LENGTH()
---

A _sliding time window_ that at a given time holds the last `length` events that arrived during last `time` period, and gets updated for every event arrival and expiration.

## Syntax

    WINDOW SLIDING_TIME_LENGTH(time <INT|LONG|TIME>, length <INT>)

## Query Parameters

| Name          | Description      | Default Value | Possible Data Types | Optional | Dynamic |
|------------|-------------------------------------|---------------|---------------------|----------|---------|
| time   | The sliding time period for which the window should hold events.   |               | INT LONG TIME       | No       | No      |
| length | The number of events that should be be included in a sliding length window. |      | INT                 | No       | No      |

## Example

```sql
CREATE STREAM cseEventStream (symbol string, price float, volume int);
CREATE WINDOW cseEventWindow (symbol string, price float, volume int) SLIDING_TIME_LENGTH(2 sec, 10);
CREATE SINK STREAM OutputStream (symbol string, price float, volume int);

@info(name = 'query0')
INSERT INTO cseEventWindow
FROM cseEventStream;

@info(name = 'query1')
INSERT all events INTO OutputStream
SELECT symbol, price, volume
FROM cseEventWindow;
```

This window holds the last 10 events that arrived during the last two seconds and gets updated for every event arrival and expiration.
