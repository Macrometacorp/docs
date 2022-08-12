---
sidebar_position: 30
title: Partition
---

Partitions divide streams and queries into isolated groups in order to process them in parallel and in isolation. A partition can contain one or more queries and there can be multiple instances where the same queries and streams are replicated for each partition.

Each partition is tagged with a partition key. Those partitions only process the events that match the corresponding partition key.

**Purpose**

Partitions allow you to process the events groups in isolation so that event processing can be performed using the same set of queries for each group.

**Partition key generation**

A partition key can be generated in the following two methods:

- Partition by value

    This is created by generating unique values using input stream attributes.

    **Syntax**

    <pre>
    partition with ( &lt;expression> of &lt;stream name>,
                     &lt;expression> of &lt;stream name>, ... )
    begin
        &lt;query>
        &lt;query>
        ...
    end; </pre>

    **Example**

    This query calculates the maximum temperature recorded within the last 10 events per `deviceID`.

    <pre>
    partition with ( deviceID of TempStream )
    begin
        insert into DeviceTempStream
        select roomNo, deviceID, max(temp) as maxTemp
        from TempStream#window.length(10);
    end;
    </pre>

- Partition by range

    This is created by mapping each partition key to a range condition of the input streams numerical attribute.

    **Syntax**
    <pre>
    partition with ( &lt;condition> as &lt;partition key> or
                     &lt;condition> as &lt;partition key> or ... of &lt;stream name>,
                     ... )
    begin
        &lt;query>
        &lt;query>
        ...
    end;
    </pre>

    **Example**

    This query calculates the average temperature for the last 10 minutes per office area.

    ```
    partition with ( roomNo >= 1030 as 'serverRoom' or
                     roomNo < 1030 and roomNo >= 330 as 'officeRoom' or
                     roomNo < 330 as 'lobby' of TempStream)
    begin
        insert into AreaTempStream
        select roomNo, deviceID, avg(temp) as avgTemp
        from TempStream#window.time(10 min)
    end;
    ```  

### Inner Stream

Queries inside a partition block can use inner streams to communicate with each other while preserving partition isolation. Inner streams are denoted by a "#" placed before the stream name, and these streams cannot be accessed outside a partition block.

**Purpose**

Inner streams allow you to connect queries within the partition block so that the output of a query can be used as an input only by another query
within the same partition. Therefore, you do not need to repartition the streams if they are communicating within the partition.

**Example**

This partition calculates the average temperature of every 10 events for each sensor, and sends an output to the `DeviceTempIncreasingStream` stream if the consecutive average temperature values increase by more than
5 degrees.

```
partition with ( deviceID of TempStream )
begin
    insert into #AvgTempStream
    select roomNo, deviceID, avg(temp) as avgTemp
    from TempStream#window.lengthBatch(10)

    insert into DeviceTempIncreasingStream
    select e1.deviceID, e1.avgTemp as initialAvgTemp, e2.avgTemp as finalAvgTemp
    from every (e1=#AvgTempStream),e2=#AvgTempStream[e1.avgTemp + 5 < avgTemp]
end;
```

### Purge Partition

Based on the partition key used for the partition, multiple instances of streams and queries will be generated. When an extremely large number of unique partition keys are used there is a possibility of very high instances of streams and queries getting generated and eventually system going out of memory. In order to overcome this, users can define a purge interval to clean partitions that will not be used anymore.

**Purpose**

`@purge` allows you to clean the partition instances that will not be used anymore.

**Syntax**

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

When using purge with an Aggregation, use a `WITH()` property instead. For example:

```

```

Partition purge configuration| Description
---------|--------
Purge interval | The periodic time interval to purge the purgeable partition instances.
Idle period of partition instance| The period, a particular partition instance (for a given partition key) needs to be idle before it becomes purgeable.

**Examples**

Mark partition instances eligible for purging, if there are no events from a particular deviceID for 15 seconds, and periodically purge those partition instances every 1 second.

```sql
@purge(enable='true', interval='1 sec', idle.period='15 sec')
partition with ( deviceID of TempStream )
begin
    insert into #AvgTempStream
    select roomNo, deviceID, avg(temp) as avgTemp
    from TempStream#window.lengthBatch(10)

    insert into DeviceTempIncreasingStream
    select e1.deviceID, e1.avgTemp as initialAvgTemp, e2.avgTemp as finalAvgTemp
    from every (e1=#AvgTempStream),e2=#AvgTempStream[e1.avgTemp + 5 < avgTemp]
end;
```
