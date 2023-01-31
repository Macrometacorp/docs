---
sidebar_position: 40
title: Windows in Queries
---

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
