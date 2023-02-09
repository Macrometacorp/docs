---
title: TUMBLING_EXPRESSION()
---

A batch (tumbling) length window that holds and process a number of events as specified in the `length`.

## Syntax

    WINDOW TUMBLING_EXPRESSION(expression <STR>)
    WINDOW TUMBLING_EXPRESSION(expression <STR>, current.event <BOOL>)

## Query Parameters

| Name      | Description       | Default Value | Possible Data Types | Optional | Dynamic |
|-----------|---------------------|------------|--------------|----------|---------|
| expression        | An expression that defines what events the window should tumble. All possible expressions are allowed.         |      | STR  | No       | No      |
| current.event | Let the window stream the current events out as and when they arrive to the window while expiring them in batches. | false | BOOL    | Yes      | No      |

## Example 1

```sql
CREATE STREAM InputEventStream (symbol string, price float, volume int);
CREATE WINDOW StockEventWindow (symbol string, price float, volume int) TUMBLING_EXPRESSION(num <3000) OUTPUT all events;

@info(name = 'query1')
INSERT INTO OutputStream
SELECT symbol, sum(price) AS price
FROM StockEventWindow WINDOW TUMBLING_EXPRESSION('sum(price) < 100 and eventTimestamp(last) - eventTimestamp(first) < 3000');
```

This collects and processes the events that meet the expression criteria and outputs them.
