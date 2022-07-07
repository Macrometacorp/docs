---
title: externalTimeBatch (Window)
---

This is a batch (tumbling) time window that is determined based on an
external time, i.e., time stamps that are specified via an attribute in
the events. It holds the latest unique events that arrived during the
last window time period. The unique events are determined based on the
value for a specified unique key parameter. When a new event arrives
within the time window with a value for the unique key parameter that is
the same as that of an existing event in the window, the existing event
expires and it is replaced by the new event.

Syntax

    unique:externalTimeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <LONG> time.stamp, <INT|LONG> window.time)
    unique:externalTimeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <LONG> time.stamp, <INT|LONG> window.time, <INT> start.time)
    unique:externalTimeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <LONG> time.stamp, <INT|LONG> window.time, <INT> start.time, <INT|LONG> time.out)
    unique:externalTimeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <LONG> time.stamp, <INT|LONG> window.time, <INT> start.time, <INT|LONG> time.out, <BOOL> replace.time.stamp.with.batch.end.time)

## Query Parameters

| Name                                   | Description                                                                                                                             | Default Value                                                                         | Possible Data Types               | Optional | Dynamic |
|----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|-----------------------------------|----------|---------|
| unique.key                             | The attribute that should be checked for uniqueness.                                                                                    |                                                                                       | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| time.stamp                             | The time which the window determines as the current time and acts upon. The value of this parameter should be monotonically increasing. |                                                                                       | LONG                              | No       | Yes     |
| window.time                            | The sliding time period for which the window should hold events.                                                                        |                                                                                       | INT LONG                          | No       | No      |
| start.time                             | This specifies an offset in milliseconds in order to start the window at a time different to the standard time.                         | Timestamp of first event                                                              | INT                               | Yes      | No      |
| time.out                               | Time to wait for arrival of a new event, before flushing and returning the output for events belonging to a specific batch.             | The system waits till an event from the next batch arrives to flush the current batch | INT LONG                          | Yes      | No      |
| replace.time.stamp.with.batch.end.time | Replaces the `timestamp` value with the corresponding batch end time stamp.                                                           | false                                                                                 | BOOL                              | Yes      | No      |

## Example 1

    CREATE STREAM LoginEvents (timestamp long, ip string);

    insert into UniqueIps 
    select timestamp, ip, count() as total
    from LoginEvents WINDOW UNIQUE:externalTimeBatch(ip, timestamp, 1 sec, 0, 2 sec);

In this query, the window holds the latest unique events that arrive
from the `LoginEvent` stream during each second. The latest events are
determined based on the external time stamp. At a given time, all the
events held in the window have unique values for the `ip` and
monotonically increasing values for `timestamp` attributes. The events
in the window are inserted into the `UniqueIps` output stream. The
system waits for 2 seconds for the arrival of a new event before
flushing the current batch.
