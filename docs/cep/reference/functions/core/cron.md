---
title: cron (Window)
---

This window outputs the arriving events as and when they arrive, and resets (expires) the window periodically based on the given cron expression.

Syntax

    cron(<STRING> cron.expression)

## Query Parameters

| Name            | Description                                 | Default Value | Possible Data Types | Optional | Dynamic |
|-----------------|---------------------------------------------|---------------|---------------------|----------|---------|
| cron.expression | The cron expression that resets the window. |               | STRING              | No       | No      |

## Example 1

    CREATE STREAM  InputEventStream (symbol string, price float, volume int);

    @info(name = 'query1')
    insert into OutputStream
    select symbol, sum(price) as totalPrice
    from InputEventStream#cron('*/5 * * * * ?');

This let the totalPrice to gradually increase and resets to zero as a batch every 5 seconds.

## Example 2

    CREATE STREAM StockEventStream (symbol string, price float, volume int)
    CREATE WINDOW StockEventWindow (symbol string, price float, volume int) cron('*/5 * * * * ?');

    @info(name = 'query0')
    insert into StockEventWindow
    from StockEventStream;

    @info(name = 'query1')
    insert into OutputStream 
    select symbol, sum(price) as totalPrice
    from StockEventWindow;

The defined window enables the totalPrice to gradually increase and resets to zero as a batch every 5 seconds.
