---
sidebar_position: 60
title: Event Types
---

Query output depends on the `current` and `expired` event types it produces based on its internal processing state. By default all queries produce `current` events upon event arrival to the query. The queries containing windows additionally produce `expired` events when events expire from the windows.

## Purpose

Event type helps to specify when a query should output events to the stream, such as output upon current events, expired events or upon both current and expired events.

## Syntax

Syntax for event types varies on what keywords you are using.

### INSERT INTO

Event type should be defined in between `INSERT` and `INTO` keywords for insert queries as follows.

```sql
INSERT <event type> INTO <output stream>
select <attribute name>, <attribute name>, ...
from <input stream> window <window name>(<parameter>, <parameter>, ... )
```

### DELETE

Event type should be defined next to the `FOR` keyword for delete queries as follows.

```sql
DELETE <table> (for <event type>)?
    ON <condition>
SELECT <attribute name>, <attribute name>, ...
FROM <input stream> WINDOW <window name>(<parameter>, <parameter>, ... )
```

### UPDATE

Event type should be defined next to the `FOR` keyword for update queries as follows.

```sql
UPDATE <table> (for <event type>)?
    SET <table>.<attribute name> = (<attribute name>|<expression>)?, <table>.<attribute name> = (<attribute name>|<expression>)?, ...
    ON <condition>
SELECT <attribute name>, <attribute name>, ...
FROM <input stream> WINDOW <window name>(<parameter>, <parameter>, ... )
```

### UPDATE OR INSERT

Event type should be defined next to the `FOR` keyword for update or insert queries as follows.

```sql
UPDATE OR INSERT INTO <table> (for <event type>)?
    SET <table>.<attribute name> = <expression>, <table>.<attribute name> = <expression>, ...
    ON <condition>
SELECT <attribute name>, <attribute name>, ...
FROM <input stream> WINDOW <window name>(<parameter>, <parameter>, ... )
```

:::note
Controlling query output based on the event types neither alters query execution nor its accuracy.  
:::

## Parameters

The event types can be defined using the following keywords to manipulate query output.

| Event types | Description |
|-------------------|-------------|
| `current events` | Outputs events only when incoming events arrive to be processed by the query.  This is default behavior when no specific event type is specified.|
| `expired events` | Outputs events only when events expires from the window. |
| `all events` | Outputs events when incoming events arrive to be processed by the query as well as  when events expire from the window. |

## Example

Query to output only the expired events from a one-minute time window to `DelayedTempStream`. This can be used for delaying the events by a minute.

```sql
INSERT expired events INTO DelayedTempStream
SELECT *
FROM TempStream WINDOW SLIDING_TIME(1)
```

:::note
This is just to illustrate how expired events work. Use the [DELAY](../windows/window-types/delay) window for use cases where we need to delay events by a given time period.
:::
