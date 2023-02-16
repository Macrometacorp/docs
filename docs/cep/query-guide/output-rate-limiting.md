---
sidebar_position: 200
title: Output Rate Limiting
---

Output rate limiting allows queries to output events periodically based on a specified condition.

## Purpose

This allows you to limit the output to avoid overloading the subsequent executions, and to remove unnecessary information.

## Syntax

The syntax of an output rate limiting configuration is as follows:

```sql
INSERT INTO <output stream>
SELECT <attribute name>, <attribute name>, ...
FROM <input stream> ...
OUTPUT <rate limiting configuration>
```

## Configurations

Stream workers support three types of output rate limiting configurations as explained in the following table:

Rate-Limiting Configuration|Syntax| Description
---------|---------|--------
Based on time | `<output event> every <time interval>` | This outputs `<output event>` every `<time interval>` time interval.
Based on number of events | `<output event> every <event interval> events` | This outputs `<output event>` for every `<event interval>` number of events.
Snapshot-based output | `snapshot every <time interval>`| This outputs all events in the window (or the last event if no window is defined in the query) for every given `<time interval>`.

## Output Events

The `<output event>` specifies the events that should be returned as the output of the query. When no `<output event>` is defined, then `all` is used by default.

The possible values are as follows:

- `all`: (Default) All the events processed by the query during the specified time interval or sliding window are emitted.
- `first`: Only the first event processed by the query during the specified time interval or sliding window is emitted.
- `last`: Only the last event processed by the query during the specified time interval or sliding window is emitted.

## Examples

The following examples show different ways of limiting the output rate of a stream worker.

### Returning Events Based on the Number of Events

In this example, events are emitted every time the specified number of events arrive. You can also choose whether to emit only the first or last event, or all the events out of the events that arrived.

The last temperature per sensor is emitted for every 10 events.

```sql
    INSERT INTO LowRateTempStream
    SELECT temp, deviceID
    FROM TempStreamselect
    GROUP BY deviceID
    OUTPUT LAST every 10 events;
```

- Returning events based on time

    Here events are emitted for every predefined time interval. You can also specify whether to emit only the first event, last event, or all events out of the events that arrived during the specified time interval.

    In this example, emits all temperature events every 10 seconds  

    <pre>
    INSERT INTO LowRateTempStream
    FROM TempStreamoutput
    output every 10 sec;    </pre>

- Returning a periodic snapshot of events

    This method works best with windows. When an input stream is connected to a window, snapshot rate limiting emits all the current events that have arrived and do not have corresponding expired events for every predefined time interval.
    If the input stream is not connected to a window, only the last current event for each predefined time interval is emitted.

    This query emits a snapshot of the events in a time window of 5 seconds every 1 second.

    <pre>
    INSERT INTO SnapshotTempStream
    FROM TempStream window sliding_time(5 sec)
    OUTPUT snapshot every 1 sec;    </pre>
