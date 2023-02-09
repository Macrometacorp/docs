---
title: WINDOW TUMBLING_TIME()
---

A _tumbling time batch window_ holds and processes events that arrive during the `time` period as a batch.

## Syntax

    WINDOW TUMBLING_TIME(time <INT|LONG|TIME>)
    WINDOW TUMBLING_TIME(time <INT|LONG|TIME>, start <INT|LONG>)
    WINDOW TUMBLING_TIME(time <INT|LONG|TIME>, current.event <BOOL>)
    WINDOW TUMBLING_TIME(time <INT|LONG|TIME>, start <INT|LONG>, current.event <BOOL>)

## Query Parameters

| Name              | Description       | Default Value            | Possible Data Types | Optional | Dynamic |
|--------------|----------------------------------------------------|----------------|----------------|----------|---------|
| time      | The batch time period in which the window process the events.       |          | INT LONG TIME       | No       | No      |
| start      | This specifies an offset in milliseconds in order to start the window at a time different to the standard time.    | Timestamp of first event | INT LONG      | Yes      | No      |
| current.event | Let the window stream the current events out as and when they arrive to the window while expiring them in batches. | false     | BOOL     | Yes      | No      |

## Example 1

```sql
CREATE STREAM InputEventStream (symbol string, price float, volume int);

@info(name = 'query1')
INSERT INTO OutputStream
SELECT symbol, sum(price) AS price
FROM InputEventStream WINDOW TUMBLING_TIME(20 sec);
```

This window collects and processes incoming events as a batch every 20 seconds and then outputs them to a stream.

## Example 2

```sql
CREATE STREAM InputEventStream (symbol string, price float, volume int);

@info(name = 'query1')
INSERT INTO OutputStream
SELECT symbol, sum(price) AS sumPrice
FROM InputEventStream WINDOW TUMBLING_TIME(20 sec, true);
```

This window sends the arriving events directly to the output letting the `sumPrice` to increase gradually and on every 20 second interval it clears the window as a batch resetting the `sumPrice` to zero.

## Example 3

```sql
CREATE STREAM InputEventStream (symbol string, price float, volume int);
CREATE WINDOW StockEventWindow (symbol string, price float, volume int) TUMBLING_TIME(20 sec) output all events;

@info(name = 'query0')
INSERT INTO StockEventWindow
FROM InputEventStream;

@info(name = 'query1')
INSERT all events INTO OutputStream 
SELECT symbol, sum(price) AS price
FROM StockEventWindow;
```

This uses a defined window to process events arrived every 20 seconds as a batch and output all events.
