---
title: WINDOW SLIDING_EXTERNAL_TIME()
---

A sliding time window based on external time. It holds events that arrived during the last window `time` period from the external timestamp, and gets updated on every monotonically increasing timestamp.

## Syntax

    WINDOW SLIDING_EXTERNAL_TIME(<LONG> timestamp, <INT|LONG|TIME> time)

## Query Parameters

| Name        | Description            | Default Value | Possible Data Types | Optional | Dynamic |
|-------------|------------------------|---------------|---------------------|----------|---------|
| timestamp   | The time which the window determines as current time and will act upon. The value of this parameter should be monotonically increasing. |               | LONG     | No       | Yes     |
| time | The sliding time period for which the window should hold events.      |          | INT LONG TIME    | No      | No      |

## Example

```sql
CREATE STREAM StockEventStream (symbol string, price float, volume int);
CREATE WINDOW cseEventWindow (symbol string, price float, volume int) SLIDING_EXTERNAL_TIME(eventTime, 20 sec) OUTPUT expired events;

@info(name = 'query0')
INSERT INTO cseEventWindow
FROM cseEventStream;

@info(name = 'query1')
INSERT expired events INTO outputStream
SELECT symbol, sum(price) AS price
FROM cseEventWindow;
```

Processing events arrived within the last 20 seconds from the eventTime and output expired events.
