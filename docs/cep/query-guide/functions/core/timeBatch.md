---
title: timeBatch (Window)
---

A batch (tumbling) time window that holds and process events that arrive during `window.time` period as a batch.

Syntax

    timeBatch(<INT|LONG|TIME> window.time)
    timeBatch(<INT|LONG|TIME> window.time, <INT|LONG> start.time)
    timeBatch(<INT|LONG|TIME> window.time, <BOOL> stream.current.event)
    timeBatch(<INT|LONG|TIME> window.time, <INT|LONG> start.time, <BOOL> stream.current.event)

## Query Parameters

| Name                 | Description                                                                                                        | Default Value            | Possible Data Types | Optional | Dynamic |
|----------------------|--------------------------------------------------------------------------------------------------------------------|--------------------------|---------------------|----------|---------|
| window.time          | The batch time period in which the window process the events.                                                      |                          | INT LONG TIME       | No       | No      |
| start.time           | This specifies an offset in milliseconds in order to start the window at a time different to the standard time.    | Timestamp of first event | INT LONG            | Yes      | No      |
| stream.current.event | Let the window stream the current events out as and when they arrive to the window while expiring them in batches. | false                    | BOOL                | Yes      | No      |

## Example 1

    CREATE STREAM InputEventStream (symbol string, price float, volume int);

    @info(name = 'query1')
    insert into OutputStream
    select symbol, sum(price) as price
    from InputEventStream#timeBatch(20 sec);

This collect and process incoming events as a batch every 20 seconds and output them.

## Example 2

    CREATE STREAM InputEventStream (symbol string, price float, volume int);

    @info(name = 'query1')
    insert into OutputStream
    select symbol, sum(price) as sumPrice
    from InputEventStream#timeBatch(20 sec, true);

This window sends the arriving events directly to the output letting the `sumPrice` to increase gradually and on every 20 second interval it clears the window as a batch resetting the `sumPrice` to zero.

## Example 3

    CREATE STREAM InputEventStream (symbol string, price float, volume int);
    CREATE WINDOW StockEventWindow (symbol string, price float, volume int) timeBatch(20 sec) output all events;

    @info(name = 'query0')
    insert into StockEventWindow
    from InputEventStream;

    @info(name = 'query1')
    insert all events into OutputStream 
    select symbol, sum(price) as price
    from StockEventWindow;

This uses a defined window to process events arrived every 20 seconds as a batch and output all events.
