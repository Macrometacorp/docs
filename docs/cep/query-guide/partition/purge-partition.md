---
sidebar_position: 30
title: Purge Partition
---

Based on the partition key used for the partition, multiple instances of streams and queries will be generated. When an extremely large number of unique partition keys are used there is a possibility of very high instances of streams and queries getting generated and eventually system going out of memory. In order to overcome this, users can define a purge interval to clean partitions that will not be used anymore.

## Purpose

`@purge` allows you to clean the partition instances that will not be used anymore.

## Syntax

The syntax of partition purge configuration is as follows:

```sql
@purge(enable='true', interval='<purge interval>', idle.period='<idle period of partition instance>')
partition with ( <partition key> of <input stream> )
begin
    insert into <output stream>
    select <attribute name>, <attribute name>, ...
    from <input stream> ...
end;
```

## Parameters

Partition Purge Configuration| Description
---------|--------
Purge interval | The periodic time interval to purge the partition instances.
Idle period of partition instance| The period that a particular partition instance for a given partition key needs to be idle before it becomes available to purge.

## Example

Mark partition instances eligible for purging, if there are no events from a particular deviceID for 15 seconds, and periodically purge those partition instances every one second.

```sql
@purge(enable='true', interval='1 sec', idle.period='15 sec')
partition with ( deviceID of TempStream )
begin
    insert into AvgTempStream
    select roomNo, deviceID, avg(temp) as avgTemp
    from TempStream window lengthBatch(10);

    insert into DeviceTempIncreasingStream
    select e1.deviceID, e1.avgTemp as initialAvgTemp, e2.avgTemp as finalAvgTemp
    from every e1=AvgTempStream,e2=AvgTempStream[e1.avgTemp + 5 < avgTemp];
end;
```
