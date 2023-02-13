---
title: TUMBLING_EXPRESSION()
---

A batch (tumbling) window that holds and process a number of events as specified in the `expression`.

## Syntax

    WINDOW TUMBLING_EXPRESSION(expression <STR>)
    WINDOW TUMBLING_EXPRESSION(expression <STR>, current.event <BOOL>)

## Query Parameters

| Name      | Description       | Default Value | Possible Data Types | Optional | Dynamic |
|-----------|---------------------|------------|--------------|----------|---------|
| expression        | An expression that defines what events the window should tumble. All possible valid expressions are allowed.         |      | STR  | No       | No      |
| current.event | Let the window stream the current events out as and when they arrive to the window while expiring them in batches. | false | BOOL    | Yes      | No      |

## Example 1

```sql
CREATE STREAM cseEventStream (symbol string, price float, volume int);
CREATE WINDOW cseEventWindow (symbol string, price float, volume int) TUMBLING_EXPRESSION('count() < 5');
CREATE SINK STREAM OutputStream (symbol string, price double);

@info(name = 'query0')
INSERT INTO cseEventWindow
FROM cseEventStream;

@info(name = 'query1')
INSERT INTO OutputStream
SELECT symbol, sum(price) AS price
FROM cseEventWindow;
```

This collects and processes the events and only provides output after receiving five valid messages from cseEventStream.
