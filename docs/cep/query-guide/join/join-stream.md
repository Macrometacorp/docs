---
title: JOIN (Stream)
---

Joining streams allows you to get a combined result from two streams in real-time based on a specified condition.

## Purpose

Streams are stateless. Therefore, in order to join two streams, they must be connected to a window so that there is a pool of events that can be used for joining. Joins also accept conditions to join the appropriate events from each stream.

During the joining process each incoming event of each stream is matched against all the events in the other
stream's window based on the given condition, and the output events are generated for all the matching event pairs.

## Syntax

The syntax for a join is as follows:

  ```sql
  INSERT INTO <output stream>
  SELECT <attribute name>, <attribute name>, ...
  FROM <input stream> WINDOW <window type>(<parameter>, ... ) {unidirectional} {as <reference>}
           JOIN <input stream> WINDOW <window type>(<parameter>,  ... ) {unidirectional} {as <reference>}
      ON <join condition>
  ```

Here, the `<join condition>` allows you to match the attributes from both the streams.

## Unidirectional JOIN Operation

By default, events arriving at either stream can trigger the joining process. However, if you want to control the
join execution, then you can add the `unidirectional` keyword next to a stream in the join definition as shown in the
syntax in order to enable that stream to trigger the join operation. Here, events arriving at other stream only update the window of that stream, and this stream does not trigger the join operation.

:::note
The `unidirectional` keyword cannot be applied to both the input streams, because the default behavior already allows both streams to trigger the join operation.
:::

## Example

Assuming that the temperature of regulators are updated every minute. The following is a stream worker that controls the temperature regulators if they are not already `on` for all the rooms with a room temperature greater than 30 degrees.  

```sql
@App:name("tempRegulator")
@App:qlVersion("2")
/*
1. Payload to send to TempStream: {"deviceID":12,"roomNo": 1,"temp": 34}

2. Payload to send to RegulatorStream: {"deviceID":12,"roomNo": 1,"isOn": false}

3. Result in RegulatorActionStream :{"roomNo":1,"action":"start","deviceID":12}

This stream worker joins TempStream and RegulatorStream and if the temperature ingested in TempStream is greater than 30.0 and if the isOn property is equal to false in Regulator stream, produces this output in RegulatorActionStream {"roomNo":1,"action":"start","deviceID":12}
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

## Supported JOIN Types

Following are the supported operations of a join clause.

### INNER JOIN (JOIN)

This is the default behavior of a join operation. `JOIN` is used as the keyword to join both the streams. The output is generated only if there is a matching event in both the streams.

### LEFT OUTER JOIN

The `LEFT OUTER JOIN` operation allows you to join two streams to be merged based on a condition. `LEFT OUTER JOIN` is used as the keyword to join both the streams.

Here, it returns all the events of left stream even if there are no matching events in the right stream by
having null values for the attributes of the right stream.

#### LEFT OUTER JOIN Example

The following query generates output events for all events from the `StockStream` stream regardless of whether a matching
symbol exists in the `TwitterStream` stream or not.

```sql
INSERT INTO outputStream 
SELECT S.symbol AS symbol, T.tweet, S.price
FROM StockStream WINDOW SLIDING_TIME(1 min) AS S
    LEFT OUTER JOIN TwitterStream WINDOW SLIDING_LENGTH(1) AS T
    ON S.symbol== T.symbol;
```

### RIGHT OUTER JOIN

`RIGHT OUTER JOIN` is used as the keyword to join both the streams. It returns all the events of the right stream even if there are no matching events in the left stream.

### FULL OUTER JOIN

The full outer join combines the results of `LEFT OUTER JOIN` and `RIGHT OUTER JOIN`. `FULL OUTER JOIN` is used as the keyword to join both the streams. Output event are generated for each incoming event even if there are no matching events in the other stream.

#### FULL OUTER JOIN Example

The following query generates output events for all the incoming events of each stream regardless of whether there is a
match for the `symbol` attribute in the other stream or not.

```sql
INSERT INTO outputStream
SELECT S.symbol AS symbol, T.tweet, S.price
FROM StockStream WINDOW SLIDING_TIME(1 min) AS S
    FULL OUTER JOIN TwitterStream WINDOW SLIDING_LENGTH(1) AS T
    ON S.symbol== T.symbol;
```
