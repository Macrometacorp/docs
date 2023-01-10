---
sidebar_position: 20
title: Inner Stream
---

Queries inside a partition block can use inner streams to communicate with each other while preserving partition isolation. These streams cannot be accessed outside a partition block.

## Purpose

Inner streams allow you to connect queries within the partition block so that the output of a query can be used as an input only by another query within the same partition. You do not need to repartition the streams if they are communicating within the partition.

## Example

This partition calculates the average temperature of every 10 events for each sensor, and sends an output to the `DeviceTempIncreasingStream` stream if the consecutive average temperature values increase by more than five degrees.

```sql
partition with (deviceID of TempStream)
begin
    insert into AvgTempStream
    select roomNo, deviceID, avg(temp) as avgTemp
    from TempStream window lengthBatch(10);

    insert into DeviceTempIncreasingStream
    select e1.deviceID, e1.avgTemp as initialAvgTemp, e2.avgTemp as finalAvgTemp
    from every e1=AvgTempStream,e2=AvgTempStream[e1.avgTemp + 5 < avgTemp];
end;
```
