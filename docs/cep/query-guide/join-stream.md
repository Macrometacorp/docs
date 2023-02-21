---
sidebar_position: 120
title: JOIN (Stream)
---

Joins allow you to get a combined result from two streams in real-time based on a specified condition.

**Purpose**

Streams are stateless. Therefore, in order to join two streams, they need to be connected to a window so that there is a pool of events that can be used for joining. Joins also accept conditions to join the appropriate events from each stream.

During the joining process each incoming event of each stream is matched against all the events in the other
stream's window based on the given condition, and the output events are generated for all the matching event pairs.

:::note
Join can also be performed with [stored data](#join-table), [aggregation](#join-aggregation) or externally [named windows](#join-window).
:::

**Syntax**

The syntax for a join is as follows:

  ```sql
  INSERT INTO <output stream>
  SELECT <attribute name>, <attribute name>, ...
  FROM <input stream> WINDOW <window type>(<parameter>, ... ) {unidirectional} {as <reference>}
           JOIN <input stream> WINDOW <window type>(<parameter>,  ... ) {unidirectional} {as <reference>}
      ON <join condition>
  ```

Here, the `<join condition>` allows you to match the attributes from both the streams.

**Unidirectional join operation**

By default, events arriving at either stream can trigger the joining process. However, if you want to control the
join execution, you can add the `unidirectional` keyword next to a stream in the join definition as depicted in the
syntax in order to enable that stream to trigger the join operation. Here, events arriving at other stream only update the
 window of that stream, and this stream does not trigger the join operation.

:::note
The `unidirectional` keyword cannot be applied to both the input streams because the default behaviour already allows both streams to trigger the join operation.
:::

**Example**

Assuming that the temperature of regulators are updated every minute.
Following is a stream worker that controls the temperature regulators if they are not already `on` for all the rooms with a room temperature greater than 30 degrees.  


```sql
@App:name("tempRegulator")
@App:qlVersion("2")
/*
1. Payload to send to TempStream: {"deviceID":12,"roomNo": 1,"temp": 34}

2. Payload to send to RegulatorStream: {"deviceID":12,"roomNo": 1,"isOn": false}

3. Result in RegulatorActionStream :{"roomNo":1,"action":"start","deviceID":12}

This stream worker joins TempStream and RegulatorStream and if the temperature ingested in TempStream is greater than 30.0 and if the isOn property is equal to false in Regulator stream, produces this output in RegulatorActionStream {"roomNo":1,"action":"start","deviceID":12}

Streams are stateless. Therefore, in order to join two streams, they need to be connected to a window so that there is a 
pool of events that can be used for joining. 

A sliding time window that, at a given time holds the last window length events that arrived during last window time period, 
and gets updated for every event arrival and expiration.

*/


CREATE STREAM TempStream (deviceID long, roomNo int, temp double);
CREATE STREAM RegulatorStream (deviceID long, roomNo int, isOn bool);
CREATE SINK RegulatorActionStream WITH (type='stream', stream='RegulatorActionStream', map.type='json',OnError.action="log")(roomNo int, deviceID long, action string);

INSERT INTO RegulatorActionStream
SELECT T.roomNo, R.deviceID, 'start' AS action
FROM TempStream[temp > 30.0] WINDOW SLIDING_LENGTH(1) AS T
  JOIN RegulatorStream[isOn == false] WINDOW SLIDING_LENGTH(1) AS R
  ON T.roomNo == R.roomNo;
```

**Supported join types**

Following are the supported operations of a join clause.

- **Inner join (join)**

    This is the default behavior of a join operation. `join` is used as the keyword to join both the streams. The output is generated only if there is a matching event in both the streams.

- **Left outer join**

    The `left outer join` operation allows you to join two streams to be merged based on a condition. `left outer join` is used as the keyword to join both the streams.

    Here, it returns all the events of left stream even if there are no matching events in the right stream by
    having null values for the attributes of the right stream.

     **Example**

    The following query generates output events for all events from the `StockStream` stream regardless of whether a matching
    symbol exists in the `TwitterStream` stream or not.

    <pre>
    SELECT S.symbol as symbol, T.tweet, S.price
    from StockStream window sliding_time(1 min) as S
      left outer join TwitterStream window sliding_length(1) as T
      on S.symbol== T.symbol
    INSERT INTO outputStream ;    </pre>

- **Right outer join**

    This is similar to a left outer join. `Right outer join` is used as the keyword to join both the streams.
    It returns all the events of the right stream even if there are no matching events in the left stream.

- **Full outer join**

    The full outer join combines the results of left outer join and right outer join. `full outer join` is used as the keyword to join both the streams.
    Here, output event are generated for each incoming event even if there are no matching events in the other stream.

    **Example**

    The following query generates output events for all the incoming events of each stream regardless of whether there is a
    match for the `symbol` attribute in the other stream or not.

    <pre>
    INSERT INTO outputStream
    SELECT S.symbol as symbol, T.tweet, S.price
    from StockStream window sliding_time(1 min) as S
      full outer join TwitterStream window sliding_length(1) as T
      on S.symbol== T.symbol;    </pre>
