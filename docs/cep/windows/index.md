---
sidebar_position: 1
title: Named Windows
---

A _named window_ is a window that can be shared across multiple queries. Events can be inserted to a named window from one or more queries, and it can produce output events based on the named window type.

## Syntax

The syntax for a named window is as follows:

```sql
CREATE WINDOW <window name> (<attribute name> <attribute type>, <attribute name> <attribute type>, ... ) <window type>(<parameter>, <parameter>, …) <event type>;
```

## Query Parameters

The following parameters are configured in a named window definition:

| Parameter     | Description |
| ------------- |-------------|
| window name      | The name of the window defined. (`CamelCase` is used for window names as a convention.) |
| attribute name   | The schema of the window is defined by its attributes with uniquely identifiable attribute names (`camelCase` is used for attribute names as a convention.)|    |
| attribute type   | The type of each attribute defined in the schema. This can be `STRING`, `INT`, `LONG`, `DOUBLE`, `FLOAT`, `BOOL`, or `OBJECT`.     |
| `<window type>(<parameter>, ...)`   | The window type associated with the window and its parameters. Refer to [Window Types](#window-types).     |
| `output <event type>` | This is optional. Keywords such as `current events`, `expired events`, and `all events` (the default) can be used to specify when the window output should be exposed. |

## Window Types

Macrometa supports the following window types:

| Window Type     | Description |
| ------------- |-------------|
| [WINDOW SLIDING_TIME()](window-types/sliding-time)    | Retains events based on time in a sliding manner.   |
| [WINDOW TUMBLING_TIME()](window-types/tumbling-time)   | Retains events based on time in a tumbling (batch) manner.   |
| [WINDOW SLIDING_LENGTH()](window-types/sliding-length) | Retains events based on number of events in a sliding manner.   |
| [WINDOW TUMBLING_LENGTH()](window-types/tumbling-length.md)     | Retains events based on number of events in a tumbling (batch) manner.   |
|      |    |
|      |    |
|      |    |



WINDOW SLIDING_TIME_LENGTH()
WINDOW SESSION()
WINDOW TUMBLING()
WINDOW SORT()
WINDOW CRON()
WINDOW SLIDING_EXTERNAL_TIME()
WINDOW TUMBLING_EXTERNAL_TIME()
WINDOW DELAY()
WINDOW SLIDING_EXPRESSION()
WINDOW TUMBLING_EXPRESSION()

#window.lengthBatch()
#window.timeLength()
#window.session()
#window.batch()
#window.sort()
#window.cron()
#window.externalTime()
#window.externalTimeBatch()
#window.delay()
#window.expression()
#window.expressionBatch()



## Example 1

```sql
CREATE WINDOW SensorWindow (name string, value float, roomNo int, deviceID string) timeBatch(1 second);
```

This query returns all output when events arrive and when events expire from the window. The event type is not specified, so the stream worker returns both current and expired events as the output.

## Example 2

```sql
CREATE WINDOW SensorWindow (name string, value float, roomNo int, deviceID string) timeBatch(1 second) output expired events;
```

This query returns an output only when events expire from the window. The event type of the window is `expired events`, so the stream worker only returns the events that have expired from the window as the output.
