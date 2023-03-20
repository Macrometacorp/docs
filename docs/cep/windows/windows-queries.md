---
sidebar_position: 50
title: Window Queries
---

This page explains how to use windows in queries.

To learn about different types of windows, refer to [Window Types](window-types/)

## Syntax

If you are using a named window defined with a CREATE statement, then you can use the following syntax:

```sql
INSERT INTO <output stream>
SELECT <attribute name>, <attribute name>, ...
FROM <window>
```

You can also define the window by using the `window <window-name>` next to the input stream:

```sql
INSERT <output event type>? INTO <output stream>
SELECT <attribute name>, <attribute name>, ...
FROM <input stream> WINDOW <window name>(<parameter>, <parameter>, ... );
```

:::note
Filter conditions can be applied both before and/or after the window.
:::

## Example 1

```sql
CREATE WINDOW FiveMinTempWindow (roomNo int, temp double) time(5 min);

INSERT INTO MaxSensorReadingStream
SELECT max(temp) as maxValue, roomNo
FROM FiveMinTempWindow;
```

This stream worker calculates the maximum temperature within the last five minutes.

## Example 2

Query to find out the maximum temperature out of the last 10 events, using the window of `SLIDING_LENGTH` 10 and `max()` aggregation function, from the `TempStream` stream and insert the results into the `MaxTempStream` stream.

```sql
INSERT INTO MaxTempStream
SELECT max(temp) AS maxTemp
FROM TempStream WINDOW SLIDING_LENGTH(10);
```

Here, the `SLIDING_LENGTH` window operates in a sliding manner where the following three event subsets are calculated and outputted when a list of 12 events are received in sequential order.

|Subset|Event Range|
|------|-----------|
| 1 | 1 - 10 |
| 2 | 2 - 11 |
| 3 | 3 - 12 |

## Example 3

Query to find out the maximum temperature out of the every 10 events, using the window of `TUMBLING_LENGTH` 10 and `max()` aggregation function, from the `TempStream` stream and insert the results into the `MaxTempStream` stream.

```sql
INSERT INTO MaxTempStream
SELECT max(temp) AS maxTemp
FROM TempStream WINDOW TUMBLING_LENGTH(10);
```

Here, the window operates in a batch (tumbling) manner where the following three event subsets are calculated and outputted when a list of 30 events are received in a sequential order.

|Subset|Event Range|
|------|-----------|
| 1    | 1 - 10      |
| 2    | 11 - 20     |
| 3    | 21 - 30     |

## Example 4

Query to find out the maximum temperature out of the events arrived during last 10 minutes, using the window of `SLIDING_TIME` 10 minutes and `max()` aggregation function, from the `TempStream` stream and insert the results into the `MaxTempStream` stream.

```sql
INSERT INTO MaxTempStream
SELECT max(temp) AS maxTemp
FROM TempStream WINDOW SLIDING_TIME(10 min);
```

Here, the `time` window operates in a sliding manner with millisecond accuracy, where it will process events in the following three time durations and output aggregated events when a list of events are received in a sequential order.

|Subset|Time Range (in ms)|
|------|-----------|
| 1 | 1:00:00.001 - 1:10:00.000 |
| 2 | 1:00:01.001 - 1:10:01.000 |
| 3 | 1:00:01.033 - 1:10:01.034 |

## Example 5

Query to find out the maximum temperature out of the events arriving every 10 minutes, using the window of `TUMBLING_TIME` 10 and `max()` aggregation function, from the `TempStream` stream and insert the results into the `MaxTempStream` stream.

```sql
INSERT INTO MaxTempStream
SELECT max(temp) AS maxTemp
FROM TempStream WINDOW TUMBLING_TIME(10 min);
```

Here, the window operates in a batch (tumbling) manner where the window will process events in the following three time durations and output aggregated events when a list of events are received in a sequential order.

|Subset|Time Range (in ms)|
|------|-----------|
| 1 | 1:00:00.001 - 1:10:00.000 |
| 2 | 1:10:00.001 - 1:20:00.000 |
| 3 | 1:20:00.001 - 1:30:00.000 |
