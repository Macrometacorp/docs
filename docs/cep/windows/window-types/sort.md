---
title: SORT()
---

This window holds a batch of events that equal the number specified as the window `length` and sorts them in the given order.

## Syntax

    WINDOW SORT(<INT> length, <STRING|DOUBLE|INT|LONG|FLOAT|LONG> attribute)
    WINDOW SORT(<INT> length, <STRING|DOUBLE|INT|LONG|FLOAT|LONG> attribute, <STRING> order, <STRING> ...)
    WINDOW SORT(<INT> length, <STRING|DOUBLE|INT|LONG|FLOAT|LONG> attribute, <STRING> order, <STRING|DOUBLE|INT|LONG|FLOAT|LONG> attribute, <STRING|DOUBLE|INT|LONG|FLOAT|LONG> ...)

## Query Parameters

| Name          | Description        | Default Value      | Possible Data Types       | Optional | Dynamic |
|-----------|-------------------|---------------------------|----------------------------|----------|---------|
| length | The size of the window length. | INT     | No       | No      |
| attribute     | The attribute that should be checked for the order. | The concatenation of all the attributes of the event is considered. | STRING DOUBLE INT LONG FLOAT LONG | No       | Yes     |
| order         | The order define as "asc" or "desc".    | asc     | STRING   | Yes      | No      |

## Example

```sql
CREATE STREAM cseEventStream (symbol string, price float, volume long);
CREATE WINDOW cseEventWindow (symbol string, price float, volume long) SORT(2,volume, 'asc');
CREATE SINK STREAM OutputStream (volume long);

@info(name = 'query0')
INSERT INTO cseEventWindow
FROM cseEventStream;

@info(name = 'query1')
INSERT all events INTO OutputStream 
SELECT volume
FROM cseEventWindow;
```

SORT(5, price, `asc`) keeps the events sorted by price in the ascending order. At any given time, the window contains the five lowest prices.
