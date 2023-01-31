---
sidebar_position: 30
title: Join (Window)
---

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

