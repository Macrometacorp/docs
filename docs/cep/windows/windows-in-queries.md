---
sidebar_position: 40
title: Windows in Queries
---

A window can be an input to a query, similar to streams.

:::note
When window is used as an input to a query, another window cannot be applied on top of it.
:::

## Syntax

```sql
INSERT INTO <output stream>
SELECT <attribute name>, <attribute name>, ...
FROM <window>
```

## Example

```sql
CREATE WINDOW FiveMinTempWindow (roomNo int, temp double) time(5 min);

INSERT INTO MaxSensorReadingStream
SELECT max(temp) as maxValue, roomNo
FROM FiveMinTempWindow;
```

This stream worker calculates the maximum temperature within the last five minutes.
