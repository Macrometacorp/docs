---
title: externalTimeBatch (Window)
---

A batch (tumbling) time window based on external time, that holds events arrived during windowTime periods, and gets updated for every windowTime.

Syntax

    externalTimeBatch(<LONG> timestamp, <INT|LONG|TIME> window.time)
    externalTimeBatch(<LONG> timestamp, <INT|LONG|TIME> window.time, <INT|LONG|TIME> start.time)
    externalTimeBatch(<LONG> timestamp, <INT|LONG|TIME> window.time, <INT|LONG|TIME> start.time, <INT|LONG|TIME> timeout)
    externalTimeBatch(<LONG> timestamp, <INT|LONG|TIME> window.time, <INT|LONG|TIME> start.time, <INT|LONG|TIME> timeout, <BOOL> replace.with.batchtime)

## Query Parameters

| Name                   | Description                                                                                                                                                                                                                                | Default Value                                                             | Possible Data Types | Optional | Dynamic |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|---------------------|----------|---------|
| timestamp              | The time which the window determines as current time and will act upon. The value of this parameter should be monotonically increasing.                                                                                                    |                                                                           | LONG                | No       | Yes     |
| window.time            | The batch time period for which the window should hold events.                                                                                                                                                                             |                                                                           | INT LONG TIME       | No       | No      |
| start.time             | User defined start time. This could either be a constant (of type int, long or time) or an attribute of the corresponding stream (of type long). If an attribute is provided, initial value of attribute would be considered as startTime. | Timestamp of first event                                                  | INT LONG TIME       | Yes      | Yes     |
| timeout                | Time to wait for arrival of new event, before flushing and giving output for events belonging to a specific batch.                                                                                                                         | System waits till an event from next batch arrives to flush current batch | INT LONG TIME       | Yes      | No      |
| replace.with.batchtime | This indicates to replace the expired event timeStamp as the batch end timeStamp                                                                                                                                                           | System waits till an event from next batch arrives to flush current batch | BOOL                | Yes      | No      |

## Example 1

    CREATE WINDOW cseEventWindow (symbol string, price float, volume int) externalTimeBatch(eventTime, 1 sec) output expired events;
    @info(name = 'query0')
    insert into cseEventWindow
    from cseEventStream;

    @info(name = 'query1')
    insert expired events into outputStream 
    select symbol, sum(price) as price
    from cseEventWindow;

This will processing events that arrive every 1 seconds from the eventTime.

## Example 2

    CREATE WINDOW cseEventWindow (symbol string, price float, volume int) externalTimeBatch(eventTime, 20 sec, 0) output expired events;

This processes events that arrive every 1 seconds from the eventTime. Starts on 0th millisecond of an hour.

## Example 3

    CREATE WINDOW cseEventWindow (symbol string, price float, volume int) externalTimeBatch(eventTime, 2 sec, eventTimestamp, 100) output expired events;

This processes events that arrive every 2 seconds from the eventTim. Considers the first event's eventTimestamp value as startTime. Waits 100 milliseconds for the arrival of a new event before flushing current batch.
