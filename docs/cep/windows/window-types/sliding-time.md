---
title: SLIDING_TIME() 
---

A _sliding time window_ that holds events that arrived during the last window time period at a given time, and gets updated for each event arrival and expiration.

## Syntax

    WINDOW SLIDING_TIME(time <INT|LONG|TIME>)

## Query Parameters

| Name        | Description           | Default Value | Possible Data Types | Optional | Dynamic |
|-------------|-----------------------|---------------|---------------------|----------|---------|
| time | The sliding time period for which the window should hold events. |               | INT LONG TIME       | No       | No      |

## Example

```sql
CREATE STREAM cseEventStream (symbol string, price float, volume int);
CREATE WINDOW cseEventWindow (symbol string, price float, volume int) SLIDING_TIME(20) output all events;

@info(name = 'query0')
INSERT INTO cseEventWindow
FROM cseEventStream;

@info(name = 'query1')
INSERT all events INTO outputStream 
SELECT symbol, sum(price) AS price
FROM cseEventWindow;
```

This query processes events that arrived within the last 20 milliseconds.
