---
title: SLIDING_LENGTH()
---

A _sliding length window_ that holds the last `length` events at a given time, and gets updated for each arrival and expiration.

## Syntax

    WINDOW SLIDING_LENGTH(length <INT>)

## Query Parameters

| Name          | Description     | Default Value | Possible Data Types | Optional | Dynamic |
|----------|---------------------------------------|-------------|-----------------|----------|---------|
| length | The number of events that should be included in a sliding length window. |          | INT        | No       | No      |

## Example

```sql
CREATE STREAM cseEventStream (symbol string, price float, volume int);
CREATE WINDOW StockEventWindow (symbol string, price float, volume int) SLIDING_LENGTH(10) output all events;

@info(name = 'query0')
INSERT INTO StockEventWindow
FROM StockEventStream;

@info(name = 'query1')
INSERT all events INTO outputStream 
SELECT symbol, sum(price) AS price
FROM StockEventWindow;
```

This query processes the last 10 events in a sliding manner.
