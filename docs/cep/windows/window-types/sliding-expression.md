---
title: SLIDING_EXPRESSION()
---

A sliding window that holds the last number of events defined by an expression at a given time, and gets updated for each arrival and expiration.

## Syntax

    WINDOW SLIDING_EXPRESSION(expression <STR>)

## Query Parameters

| Name          | Description     | Default Value | Possible Data Types | Optional | Dynamic |
|----------|---------------------------------------|-------------|-----------------|----------|---------|
| expression | An expression that defines what events should be included in the sliding window. All possible expressions are allowed. |          | STR        | No       | No      |

## Example

```sql
CREATE STREAM cseEventStream (symbol string, price float, volume int);
CREATE WINDOW StockEventWindow (symbol string, price float, volume int) EXPRESSION('count()<40');

@info(name = 'query1')
INSERT INTO OutputStream
SELECT symbol, sum(price) AS price
FROM StockEventWindow WINDOW SLIDING_EXPRESSION('count()<=20');
```

This query holds a number of events less than or equal to 20.
