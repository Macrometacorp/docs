---
title: CRON()
---

This window outputs the arriving events as and when they arrive and resets (expires) the window periodically based on the given cron expression.

## Syntax

    WINDOW CRON(<STRING> expression)

## Query Parameters

| Name            | Description                                 | Default Value | Possible Data Types | Optional | Dynamic |
|-----------------|---------------------------------------------|---------------|---------------------|----------|---------|
| expression | The cron expression that resets the window. |               | STRING              | No       | No      |

## Example 1

```sql
CREATE STREAM InputEventStream (symbol string, price float, volume int);
CREATE SINK STREAM OutputStream (symbol string, totalPrice double);

@info(name = 'query1')
INSERT INTO OutputStream
SELECT symbol, sum(price) AS totalPrice
FROM InputEventStream WINDOW CRON('*/5 * * * * ?');
```

This lets the `totalPrice` gradually increase and resets to zero as a batch every five seconds.

## Example 2

```sql
CREATE STREAM StockEventStream (symbol string, price float, volume int);
CREATE WINDOW StockEventWindow (symbol string, price float, volume int) CRON('*/5 * * * * ?');
CREATE SINK STREAM OutputStream (symbol string, totalPrice double);

@info(name = 'query0')
INSERT INTO StockEventWindow
FROM StockEventStream;

@info(name = 'query1')
INSERT INTO OutputStream 
SELECT symbol, sum(price) AS totalPrice
FROM StockEventWindow;
```

The defined window enables the `totalPrice` to gradually increase and resets to zero as a batch every five seconds.
