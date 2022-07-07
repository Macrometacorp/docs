---
title: lengthBatch (Window)
---

A batch (tumbling) length window that holds and process a number of events as specified in the window.length.

Syntax

    lengthBatch(<INT> window.length)
    lengthBatch(<INT> window.length, <BOOL> stream.current.event)

## Query Parameters

| Name                 | Description                                                                                                        | Default Value | Possible Data Types | Optional | Dynamic |
|----------------------|--------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| window.length        | The number of events the window should tumble.                                                                     |               | INT                 | No       | No      |
| stream.current.event | Let the window stream the current events out as and when they arrive to the window while expiring them in batches. | false         | BOOL                | Yes      | No      |

## Example 1

    CREATE STREAM InputEventStream (symbol string, price float, volume int);

    @info(name = 'query1')
    insert into OutputStream
    select symbol, sum(price) as price
    from InputEventStream#lengthBatch(10);

This collect and process 10 events as a batch and output them.

## Example 2

    CREATE STREAM InputEventStream (symbol string, price float, volume int);

    @info(name = 'query1')
    insert into OutputStream
    select symbol, sum(price) as sumPrice
    from InputEventStream#lengthBatch(10, true);

This window sends the arriving events directly to the output letting the `sumPrice` to increase gradually, after every 10 events it clears the window as a batch and resets the `sumPrice` to zero.

## Example 3

    CREATE STREAM InputEventStream (symbol string, price float, volume int);
    CREATE WINDOW StockEventWindow (symbol string, price float, volume int) lengthBatch(10) output all events;

    @info(name = 'query0')
    insert into StockEventWindow
    from InputEventStream;

    @info(name = 'query1')
    insert all events into OutputStream 
    select symbol, sum(price) as price
    from StockEventWindow;

This uses a defined window to process 10 events as a batch and output all events.
