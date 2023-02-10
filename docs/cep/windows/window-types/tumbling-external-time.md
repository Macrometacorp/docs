---
title: TUMBLING_EXTERNAL_TIME()
---

A batch (tumbling) time window based on external time, that holds events arrived during `window.time` periods, and gets updated for every `window.time`.

## Syntax

    WINDOW TUMBLING_EXTERNAL_TIME(<LONG> timestamp, <INT|LONG|TIME> window.time)
    WINDOW TUMBLING_EXTERNAL_TIME(<LONG> timestamp, <INT|LONG|TIME> window.time, <INT|LONG|TIME> start)
    WINDOW TUMBLING_EXTERNAL_TIME(<LONG> timestamp, <INT|LONG|TIME> window.time, <INT|LONG|TIME> start, <INT|LONG|TIME> timeout)
    WINDOW TUMBLING_EXTERNAL_TIME(<LONG> timestamp, <INT|LONG|TIME> window.time, <INT|LONG|TIME> start, <INT|LONG|TIME> timeout, <BOOL> replace.with.batchtime)

## Query Parameters

| Name                   | Description        | Default Value           | Possible Data Types | Optional | Dynamic |
|--------------|---------------------------------------|--------------------------|------------------|----------|---------|
| timestamp              | The Unix timestamp in milliseconds which the window determines as current time and will act upon. The value of this parameter should be monotonically increasing. Max. int is 2^32, or 2147483647. |                        | LONG                | No       | Yes     |
| window.time            | The batch time period for which the window should hold events.    |                      | INT LONG TIME       | No       | No      |
| start             | User defined start time. This could either be a constant (of type `int`, `long`, or `time`) or an attribute of the corresponding stream (of type `long`). If an attribute is provided, initial value of attribute would be considered as startTime. | Timestamp of first event     | INT LONG TIME       | Yes      | Yes     |
| timeout      | Time to wait for arrival of new event, before flushing and giving output for events belonging to a specific batch.    | System waits till an event from next batch arrives to flush current batch | INT LONG TIME       | Yes      | No      |
| replace.with.batchtime | This indicates to replace the expired event timeStamp as the batch end timeStamp        | System waits till an event from next batch arrives to flush current batch | BOOL          | Yes      | No      |

## Example 1

```sql
CREATE STREAM cseEventStream (symbol string, price float, volume int, eventTime long);
CREATE SINK OutputStream WITH (type='stream', stream='OutputStream') (symbol string, price double);
CREATE WINDOW cseEventWindow (symbol string, price float, volume int, eventTime long) TUMBLING_EXTERNAL_TIME(eventTime, 1 sec) OUTPUT expired events;

@info(name = 'query0')
INSERT INTO cseEventWindow
FROM cseEventStream;

@info(name = 'query1')
INSERT expired events INTO OutputStream 
SELECT symbol, sum(price) AS price
FROM cseEventWindow;
```

This processes events that arrive every second from the eventTime.

## Example 2

```sql
CREATE STREAM cseEventStream (symbol string, price float, volume int, eventTime long);
CREATE WINDOW cseEventWindow (symbol string, price float, volume int, eventTime long) TUMBLING_EXTERNAL_TIME(eventTime, 20 sec, 0) OUTPUT expired events;
```

This processes events that arrive every 1 seconds from the eventTime. Starts on 0th millisecond of an hour.

## Example 3

```sql
CREATE STREAM cseEventStream (symbol string, price float, volume int, eventTime long, eventTimestamp long);
CREATE WINDOW cseEventWindow (symbol string, price float, volume int, eventTime long, eventTimestamp long) TUMBLING_EXTERNAL_TIME(eventTime, 2 sec, eventTimestamp, 100) OUTPUT expired events;
```

This processes events that arrive every two seconds from the eventTime. Considers the first event's eventTimestamp value as startTime. Waits 100 milliseconds for the arrival of a new event before flushing current batch.
