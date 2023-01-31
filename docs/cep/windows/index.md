---
sidebar_position: 60
title: Named Window
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

### Join (Window)

To allow a stream to retrieve information from a window based on a condition.

:::note
A join can also be performed with [two streams](#join-stream), [aggregation](#join-aggregation) or with tables [tables](#join-table).
:::

**Syntax**

```sql
insert into <output stream>
select (<input stream>|<window>).<attribute name>, (<input stream>|<window>).<attribute name>, ...
from <input stream> join <window>
    on <condition>
```

**Example**

This Stream Application performs a join count the number of temperature events having more then 40 degrees within the last 2 minutes.

```
CREATE WINDOW TwoMinTempWindow (roomNo int, temp double) time(2 min);
CREATE STREAM CheckStream (requestId string);

insert into HighTempCountStream
select requestId, count(T.temp) as count
from CheckStream as C join TwoMinTempWindow as T
    on T.temp > 40;
```

**Supported join types**

Window join supports following operations of a join clause.

- **Inner join (join)**

    This is the default behaviour of a join operation. `join` is used as the keyword to join two windows or a stream with a window. The output is generated only if there is a matching event in both stream/window.

- **Left outer join**

    The `left outer join` operation allows you to join two windows or a stream with a window to be merged based on a condition.
    Here, it returns all the events of left stream/window even if there are no matching events in the right stream/window by
    having null values for the attributes of the right stream/window.

- **Right outer join**

    This is similar to a left outer join. `Right outer join` is used as the keyword to join two windows or a stream with a window.
    It returns all the events of the right stream/window even if there are no matching events in the left stream/window.

- **Full outer join**

    The full outer join combines the results of `left outer join` and `right outer join`. `full outer join` is used as the keyword to join two windows or a stream with a window.
    Here, output event are generated for each incoming event even if there are no matching events in the other stream/window.

### From

A window can be an input to a query, similar to streams.

Note !!!
     When window is used as an input to a query, another window cannot be applied on top of this.

**Syntax**

```sql
insert into <output stream>
select <attribute name>, <attribute name>, ...
from <window>
```

**Example**

This Stream Application calculates the maximum temperature within the last 5 minutes.

```
CREATE WINDOW FiveMinTempWindow (roomNo int, temp double) time(5 min);

insert into MaxSensorReadingStream
select max(temp) as maxValue, roomNo
from FiveMinTempWindow;
```
