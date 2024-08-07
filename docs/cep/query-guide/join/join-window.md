---
title: JOIN (Window)
---

To allow a stream to retrieve information from a window based on a condition.

## JOIN Syntax

```sql
insert into <output stream>
select (<input stream>|<window>).<attribute name>, (<input stream>|<window>).<attribute name>, ...
from <input stream> join <window>
    on <condition>
```

## JOIN Example

This stream worker performs a JOIN that counts the number of temperature events that were higher than 40 degrees within the last two minutes.

```sql
CREATE WINDOW TwoMinTempWindow (roomNo int, temp double) time(2 min);
CREATE STREAM CheckStream (requestId string);

INSERT INTO HighTempCountStream
SELECT requestId, count(T.temp) as count
FROM CheckStream as C JOIN TwoMinTempWindow as T
    on T.temp > 40;
```

## Supported JOIN Types

Window JOIN supports following operations of a JOIN clause.

### INNER JOIN (JOIN)

This is the default behavior of a join operation. `JOIN` is used as the keyword to join two windows or a stream with a window. The output is generated only if there is a matching event in both the stream and the window.

### LEFT OUTER JOIN

The `LEFT OUTER JOIN` operation allows you to join two windows or a stream with a window to be merged based on a condition.
It returns all the events of left stream or window even if there are no matching events in the right stream or window by
having null values for the attributes of the right stream or window.

### RIGHT OUTER JOIN

The `RIGHT OUTER JOIN` operation allows you to join two windows or a stream with a window. It returns all the events of the right stream or window even if there are no matching events in the left stream or window.

### FULL OUTER JOIN

The `FULL OUTER JOIN` operation combines the results of `LEFT OUTER JOIN` and `RIGHT OUTER JOIN`. `FULL OUTER JOIN` is used as the keyword to join two windows or a stream with a window. Output event are generated for each incoming event even if there are no matching events in the other stream or window.
