---
title: TUMBLING_LENGTH()
---

A batch (tumbling) length window that holds and process a number of events as specified in the `length`.

## Syntax

    WINDOW TUMBLING_LENGTH(length <INT>)
    WINDOW TUMBLING_LENGTH(length <INT>, current.event <BOOL>)

## Query Parameters

| Name      | Description       | Default Value | Possible Data Types | Optional | Dynamic |
|-----------|---------------------|------------|--------------|----------|---------|
| length        | The number of events the window should tumble.        |      | INT  | No       | No      |
| current.event | Let the window stream the current events out as and when they arrive to the window while expiring them in batches. | false | BOOL    | Yes      | No      |

## Example 1

```sql
CREATE STREAM InputEventStream (symbol string, price float, volume int);
CREATE SINK STREAM OutputStream (symbol string, price double);

@info(name = 'query1')
INSERT INTO OutputStream
SELECT symbol, sum(price) AS price
FROM InputEventStream WINDOW TUMBLING_LENGTH(10);
```

This collect and process 10 events as a batch and output them.

## Example 2

```sql
CREATE STREAM InputEventStream (symbol string, price float, volume int);
CREATE SINK STREAM OutputStream (symbol string, sumPrice double);

@info(name = 'query1')
INSERT INTO OutputStream
SELECT symbol, sum(price) AS sumPrice
FROM InputEventStream WINDOW TUMBLING_LENGTH(10, true);
```

This window sends the arriving events directly to the output letting the `sumPrice` to increase gradually. After every 10 events, it clears the window as a batch and resets the `sumPrice` to zero.

## Example 3

```sql
CREATE STREAM InputEventStream (symbol string, price float, volume int);
CREATE WINDOW StockEventWindow (symbol string, price float, volume int) TUMBLING_LENGTH(10) OUTPUT all events;
CREATE SINK STREAM OutputStream (symbol string, price double);

@info(name = 'query0')
INSERT INTO StockEventWindow
FROM InputEventStream;

@info(name = 'query1')
INSERT all events INTO OutputStream 
SELECT symbol, sum(price) AS price
FROM StockEventWindow;
```

This uses a defined window to process 10 events as a batch and output all events.
