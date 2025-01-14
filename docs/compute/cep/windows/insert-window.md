---
sidebar_position: 40
title: INSERT (Window)
---

This allows events to be inserted into named windows. This is similar to inserting events into streams.

## INSERT Syntax

```sql
INSERT INTO <window>
SELECT <attribute name>, <attribute name>, ...
FROM <input stream>
```

To insert only events of a specific event type, add the `current events`, `expired events`, or the `all events` keyword between the `INSERT` and `INTO` keywords.

## INSERT Example

This query inserts all events from the `TempStream` stream to the `OneMinTempWindow` window.

```sql
CREATE STREAM TempStream(tempId string, temp double);
CREATE WINDOW OneMinTempWindow(tempId string, temp double) time(1 min);

INSERT INTO OneMinTempWindow
SELECT *
FROM TempStream;
```
