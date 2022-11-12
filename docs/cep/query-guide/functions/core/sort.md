---
title: sort (Window)
---

This window holds a batch of events that equal the number specified as the windowLength and sorts them in the given order.

Syntax

    sort(<INT> window.length, <STRING|DOUBLE|INT|LONG|FLOAT|LONG> attribute)
    sort(<INT> window.length, <STRING|DOUBLE|INT|LONG|FLOAT|LONG> attribute, <STRING> order, <STRING> ...)
    sort(<INT> window.length, <STRING|DOUBLE|INT|LONG|FLOAT|LONG> attribute, <STRING> order, <STRING|DOUBLE|INT|LONG|FLOAT|LONG> attribute, <STRING|DOUBLE|INT|LONG|FLOAT|LONG> ...)

## Query Parameters

| Name          | Description                                         | Default Value                                                       | Possible Data Types               | Optional | Dynamic |
|---------------|-----------------------------------------------------|---------------------------------------------------------------------|-----------------------------------|----------|---------|
| window.length | The size of the window length.                      |                                                                     | INT                               | No       | No      |
| attribute     | The attribute that should be checked for the order. | The concatenation of all the attributes of the event is considered. | STRING DOUBLE INT LONG FLOAT LONG | No       | Yes     |
| order         | The order define as "asc" or "desc".            | asc                                                                 | STRING                            | Yes      | No      |

## Example 1

    CREATE STREAM cseEventStream (symbol string, price float, volume long);
    CREATE WINDOW cseEventWindow (symbol string, price float, volume long) sort(2,volume, 'asc');

    @info(name = 'query0')
    insert into cseEventWindow
    from cseEventStream;

    @info(name = 'query1')
    insert all events into outputStream 
    select volume
    from cseEventWindow;

sort(5, price, `asc`) keeps the events sorted by price in the ascending order. Therefore, at any given time, the window contains the 5 lowest prices.
