---
sidebar_position: 1
title: Create Named Window
---

A named window is a window that can be shared across multiple queries. Events can be inserted to a named window from one or more queries and it can produce output events based on the named window type.

**Syntax**

The syntax for a named window is as follows:

```
CREATE WINDOW <window name> (<attribute name> <attribute type>, <attribute name> <attribute type>, ... ) <window type>(<parameter>, <parameter>, …) <event type>;
```

The following parameters are configured in a table definition:

| Parameter     | Description |
| ------------- |-------------|
| `window name`      | The name of the window defined. (`PascalCase` is used for window names as a convention.) |
| `attribute name`   | The schema of the window is defined by its attributes with uniquely identifiable attribute names (`camelCase` is used for attribute names as a convention.)|    |
| `attribute type`   | The type of each attribute defined in the schema.  This can be `STRING`, `INT`, `LONG`, `DOUBLE`, `FLOAT`, `BOOL` or `OBJECT`.     |
| `<window type>(<parameter>, ...)`   | The window type associated with the window and its parameters.     |
| `output <event type>` | This is optional. Keywords such as `current events`, `expired events` and `all events` (the default) can be used to specify when the window output should be exposed. For more information, see [Event Type](#event-type).

**Examples**

- Returning all output when events arrive and when events expire from the window.

    In this query, the event type is not specified. Therefore, it returns both current and expired events as the output.

    ```
    CREATE WINDOW SensorWindow (name string, value float, roomNo int, deviceID string) timeBatch(1 second);
    ```

- Returning an output only when events expire from the window.

    In this query, the event type of the window is `expired events`. Therefore, it only returns the events that have expired from the window as the output.

    ```
    CREATE WINDOW SensorWindow (name string, value float, roomNo int, deviceID string) timeBatch(1 second) output expired events;
    ```

**Operators on Named Windows**

The following operators can be performed on named windows.

### Insert

This allows events to be inserted into windows. This is similar to inserting events into streams.

**Syntax**

```
insert into <window>
select <attribute name>, <attribute name>, ...
from <input stream>
```

To insert only events of a specific event type, add the `current events`, `expired events` or the `all events` keyword between `insert` and `into` keywords (similar to how it is done for streams).

For more information, see [Event Type](#event-type).

**Example**

This query inserts all events from the `TempStream` stream to the `OneMinTempWindow` window.

```
CREATE STREAM TempStream(tempId string, temp double);
CREATE WINDOW OneMinTempWindow(tempId string, temp double) time(1 min);

insert into OneMinTempWindow
select *
from TempStream;
```
