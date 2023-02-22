---
sidebar_position: 20
title: Query
---

A _stream worker query_ defines the processing logic in stream workers. A query consumes events from one or more:

- [streams](../source/source-types/stream-source)
- [named windows](../windows/)
- [tables](../table/)
- [named aggregations](../aggregations/)

The query then processes the events in a streaming manner and generates output events into one or more:

- [streams](../sink/sink-types/stream-sink)
- [named windows](../windows/)
- [tables](../table/)

## Purpose

A query provides a way to process the events in the order they arrive and produce output using both stateful and stateless complex event processing and stream processing operations.

## Syntax

The high-level query syntax for defining processing logics is as follows:

```sql
@name('<query name>')
<OUTPUT ACTION>
<projection>
FROM <input>
<grouping clauses>
```

## Parameters

The following parameters are used to configure a stream definition.

| Parameter  | Description |
|----------------|-------------|
| `query name`   | The name of the query. Since naming the query (i.e the `@name('<query name>')` annotation) is optional, when the name is not provided, Macrometa assigns a system-generated name for the query. |
| `OUTPUT ACTION` | Defines output action (such as `INSERT INTO`, `UPDATE`, `DELETE`, and so on) that needs to be performed by the generated events on a stream, named window, or table.  |
| `projection`   | Generates output event attributes using `SELECT`, functions, and aggregation functions, and filters the generated the output operations before sending them out. The projection is optional, and when it is left out, all the input events are sent to the output as-is. |
| `FROM <input>`        | Defines the means of event consumption via streams, named windows, tables, and/or named-aggregations, and defines the processing logic. |
| `grouping clauses` | `GROUP BY` functions to group and organize output.  |

## Example 1

A query consumes events from the `TempStream` stream and output only the `roomNo` and `temp` attributes to the `RoomTempStream` stream, from which another query consumes the events and sends all its attributes to `AnotherRoomTempStream` stream.

```sql
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

INSERT INTO RoomTempStream
SELECT roomNo, temp
FROM TempStream;

INSERT INTO AnotherRoomTempStream
FROM RoomTempStream;
```

In this example, the `RoomTempStream` and `AnotherRoomTempStream` streams are an inferred streams, which means their stream definitions are inferred from the queries and they can be used same as any other defined stream without any restrictions.  

## Example 2

```sql
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

CREATE SINK OutputStream WITH (type='stream', stream='OutputStream', map.type='json') (roomNo int, avgTemp double);

INSERT INTO OutputStream
SELECT roomNo, avg(temp) AS avgTemp
FROM TempStream
GROUP BY roomNo;
```

This query takes the `roomNo` and `temp` values from TempStream, averages the temperatures, groups them by room number, outputs them into OutputStream.

## Aggregate Function

Aggregate functions are pre-configured aggregation operations that can consumes zero, or more parameters from multiple events and always produce a single value as result. They can be only used in the query projection (as part of the `SELECT` clause). When a query comprises a window, the aggregation will be contained to the events in the window, and when it does not have a window, the aggregation is performed from the first event the query has received.

**Purpose**

Aggregate functions encapsulate pre-configured reusable aggregate logic allowing users to aggregate values of multiple events together. When used with batch/tumbling windows this can also help to reduce the number of output events produced.  

**Syntax**

Aggregate function can be used in query projection (as part of the `SELECT` clause) alone or as a part of another expression. In all cases, the output produced by the query should be properly mapped to the output stream attribute using the `as` keyword.

The syntax of aggregate function is as follows,

```sql
INSERT INTO <output stream>
SELECT <aggregate function>(<parameter>, <parameter>, ... ) as <attribute name>, <attribute2 name>, ...
from <input stream> window <window name>(<parameter>, <parameter>, ... );
```

Here `<aggregate function>` uniquely identifies the aggregate function. The `<parameter>` defines input parameters the aggregate function can accept. The input parameters can be attributes, constant values, results of other functions or aggregate functions, results of mathematical or logical expressions, or time values. The number and type of parameters an aggregate function accepts depend on the function itself.

### Built-In Aggregate Functions

Following are some inbuilt aggregation functions.

| Aggregate Function | Description|
| ------------- |-------------|
| [sum](functions#sum-aggregate-function) | Calculates the sum from a set of values. |
| [count](functions#count-aggregate-function) | Calculates the count from a set of values. |
| [distinctcount](functions#distinctcount-aggregate-function) | Calculates the distinct count based on a parameter from a set of values. |
| [avg](functions#avg-aggregate-function) | Calculates the average from a set of values.|
| [max](functions#max-aggregate-function) | Finds the maximum value from a set of values. |
| [min](functions#min-aggregate-function) | Finds the minimum value from a set of values. |
| [maxForever](functions#maxForever-aggregate-function) | Finds the maximum value from all events throughout its lifetime irrespective of the windows. |
| [minForever](functions#minForever-aggregate-function) | Finds the minimum value from all events throughout its lifetime irrespective of the windows. |
| [stddev](functions#stdDev-aggregate-function) | Calculates the standard deviation from a set of values. |
| [and](functions#and-aggregate-function) | Calculates boolean and from a set of values. |
| [or](functions#or-aggregate-function) | Calculates boolean or from a set of values. |
| [unionSet](functions#unionSet-aggregate-function) | Calculates union as a Set from a set of values. |

**Example**

Query to calculate average, maximum, and minimum values on `temp` attribute of the `TempStream` stream in a sliding manner, from the events arrived over the last 10 minutes and to produce outputs `avgTemp`, `maxTemp` and `minTemp` respectively to the `AvgTempStream` output stream.

```
INSERT INTO AvgTempStream
SELECT avg(temp) as avgTemp, max(temp) as maxTemp, min(temp) as minTemp
from TempStream window sliding_time(10 min);
```

## Group By

Group By provides a way of grouping events based on one or more specified attributes to perform aggregate operations.

**Purpose**

Group By allows users to aggregate values of multiple events based on the given group-by fields.

**Syntax**

The syntax for the Group By with aggregate function is as follows.

```sql
INSERT INTO <output stream>
SELECT <aggregate function>( <parameter>, <parameter>, ...) as <attribute1 name>, <attribute2 name>, ...
FROM <input stream> WINDOW <window name>(...)
GROUP BY <attribute1 name>, <attribute2 name>, ...;
```

Here the group by attributes should be defined next to the `group by` keyword separating each attribute by a comma.

**Example**

Query to calculate the average `temp` per `roomNo` and `deviceID` combination, from the events arrived from `TempStream` stream, during the last 10 minutes time-window in a sliding manner.

```sql
INSERT INTO AvgTempStream
SELECT roomNo, deviceID, avg(temp) as avgTemp
FROM TempStream WINDOW SLIDING_TIME(10 min)
GROUP BY roomNo, deviceID;
```

## Having

Having provide a way of filtering events based on a specified condition of the query output stream attributes. It accepts any type of condition including a combination of functions and/or attributes that produces a Boolean result. Having, allow events to passthrough if the condition results in `true`, and drops if it results in a `false`.  

**Purpose**

Having helps to SELECT the events that are relevant for the output based on the attributes those are produced by the `SELECT` clause and omit the ones that are not.

**Syntax**

The syntax for the Having clause is as follows.

```sql
INSERT INTO <output stream>
SELECT <aggregate function>( <parameter>, <parameter>, ...) AS <attribute1 name>, <attribute2 name>, ...
FROM <input stream> WINDOW <window name>( ... )
GROUP BY <attribute1 name>, <attribute2 name> ...
HAVING <condition>;
```

Here the having `<condition>` should be defined next to the `having` keyword and having can be used with or without `group by` clause.

**Example**

Query to calculate the average `temp` per `roomNo` for the last 10 minutes, and alerts if the `avgTemp` exceeds 30 degrees.

```sql
INSERT INTO AlertStream
SELECT roomNo, avg(temp) AS avgTemp
FROM TempStream WINDOW SLIDING_TIME(10 min)
GROUP BY roomNo
HAVING avgTemp > 30;
```

## Order By

Order By, orders the query results in ascending and or descending order based on one or more specified attributes. When an attribute is used for order by, by default Stream orders the events in ascending order of that attribute's value, and by adding `desc` keyword, the events can be ordered in descending order. When more than one attribute is defined the attributes defined towards the left will have more precedence in ordering than the ones defined in right.  

**Purpose**

Order By helps to sort the events in the outputs chunks produced by the query. Order By will be more helpful for batch windows, and queries where they output many of event together then for sliding window use cases where the output will be one or few events at a time.

**Syntax**

The syntax for the Order By clause is as follows:

```sql
INSERT INTO <output stream>
SELECT <aggregate function>( <parameter>, <parameter>, ...) AS <attribute1 name>, <attribute2 name>, ...
FROM <input stream> WINDOW <window name>( ... )
GROUP BY <attribute1 name>, <attribute2 name> ...
HAVING <condition>
ORDER BY <attribute1 name> (asc|desc)?, <attribute2 name> (asc|desc)?, ...;
```

Here the order by attributes should be defined next to the `order by` keyword separating each by a comma, and optionally specifying the event ordering using `asc` (default) or `desc` keywords.

**Example**

Query to calculate the average `temp` per `roomNo` and `deviceID` combination on every 10 minutes batches, and order the generated output events in ascending order by `avgTemp` and then by descending order of `roomNo` (if the more than one event have the same `avgTemp` value).

```sql
INSERT INTO AvgTempStream
SELECT roomNo, deviceID, avg(temp) as avgTemp
FROM TempStream WINDOW TUMBLING_TIME(10 min)
GROUP BY roomNo, deviceID
ORDER BY avgTemp, roomNo desc;
```

## Limit and Offset

These provide a way to select the number of events (via limit) from the desired index (by specifying an offset) from the output event chunks produced by the query.

**Purpose**

Limit & Offset helps to output only the selected set of events from large event batches. This will be more useful with `Order By` clause where one can order the output for topK, bottomK, or even to paginate through the dataset by obtaining a set of events from the middle.

**Syntax**

The syntax for the Limit & Offset clauses is as follows:

```sql
INSERT INTO <output stream>
SELECT <aggregate function>( <parameter>, <parameter>, ...) AS <attribute1 name>, <attribute2 name>, ...
FROM <input stream> WINDOW <window name>( ... )
GROUP BY <attribute1 name>, <attribute2 name> ...
HAVING <condition>
ORDER BY <attribute1 name> (asc | desc)?, <attribute2 name> (<ascend/descend>)?, ...
LIMIT <positive integer>?
OFFSET <positive integer>?;
```

Here both `limit` and `offset` are optional, when `limit` is omitted the query will output all the events, and when `offset` is omitted `0` is taken as the default offset value.

**Example 1**

Query to calculate the average `temp` per `roomNo` and `deviceID` combination for every 10 minutes batches, from the events arriving at the `TempStream` stream, and emit only two events having the highest `avgTemp` value.

```sql
INSERT INTO HighestAvgTempStream
SELECT roomNo, deviceID, avg(temp) as avgTemp
FROM TempStream WINDOW TUMBLING_TIME(10 min)
GROUP BY roomNo, deviceID
ORDER BY avgTemp desc
LIMIT 2;
```

**Example 2**
Query to calculate the average `temp` per `roomNo` and `deviceID` combination for every 10 minutes batches, for events that arriving at the `TempStream` stream, and emits only the third, forth and fifth events when sorted in descending order based on their `avgTemp` value.

```sql
INSERT INTO HighestAvgTempStream
SELECT roomNo, deviceID, avg(temp) as avgTemp
FROM TempStream WINDOW TUMBLING_TIME(10 min)
GROUP BY roomNo, deviceID
ORDER BY avgTemp desc
LIMIT 3
OFFSET 2;
```

## Join (Stream)

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

## Patterns

This is a state machine implementation that allows you to detect patterns in the events that arrive over time. This can correlate events within a single stream or between multiple streams.

**Purpose**

Patterns allow you to identify trends in events over a time period.

**Syntax**

The following is the syntax for a pattern query:

```sql
INSERT INTO <output stream>
SELECT <event reference>.<attribute name>, <event reference>.<attribute name>, ...
FROM (every)? <event reference>=<input stream>[<filter condition>] ->
    (every)? <event reference>=<input stream [<filter condition>] ->
    ...
    (WITHIN <time gap>)?
```

| Items| Description |
|-------------------|-------------|
| `->` | This is used to indicate an event that should be following another event. The subsequent event does not necessarily have to occur immediately after the preceding event. The condition to be met by the preceding event should be added before the sign, and the condition to be met by the subsequent event should be added after the sign. |
| `<event reference>` | This allows you to add a reference to the the matching event so that it can be accessed later for further processing. |
| `(within <time gap>)?` | The `within` clause is optional. It defines the time duration within which all the matching events should occur. |
| `every` | `every` is an optional keyword. This defines whether the event matching should be triggered for every event arrival in the specified stream with the matching condition.  When this keyword is not used, the matching is carried out only once. |

Stream also supports pattern matching with counting events and matching events in a logical order such as (`and`, `or`, and `not`). These are described in detail further below in this guide.

**Example**

This query sends an alert if the temperature of a room increases by 5 degrees within 10 min.

```sql
INSERT INTO AlertStream
SELECT e1.roomNo, e1.temp AS initialTemp, e2.temp AS finalTemp
FROM every( e1=TempStream ) -> e2=TempStream[ e1.roomNo == roomNo and (e1.temp + 5) <= temp ]
    WITHIN 10 min;
```

Here, the matching process begins for each event in the `TempStream` stream (because `every` is used with `e1=TempStream`),
and if  another event arrives within 10 minutes with a value for the `temp` attribute that is greater than or equal to `e1.temp + 5`
of the event e1, an output is generated via the `AlertStream`.

### Counting Pattern

Counting patterns allow you to match multiple events that may have been received for the same matching condition.
The number of events matched per condition can be limited via condition postfixes.

**Syntax**

Each matching condition can contain a collection of events with the minimum and maximum number of events to be matched as shown in the syntax below.

```sql
INSERT INTO <output stream>
SELECT <event reference>([event index])?.<attribute name>, ...
FROM (every)? <event reference>=<input stream>[<filter condition>] (<<min count>:<max count>>)? ->  
    ...
    (WITHIN <time gap>)?     
```

|Postfix|Description|Example
---------|---------|---------
|`<n1:n2>`|This matches `n1` to `n2` events (including `n1` and not more than `n2`).|`1:4` matches 1 to 4 events.
|`<n:>`|This matches `n` or more events (including `n`).|`<2:>` matches 2 or more events.
|`<:n>`|This matches up to `n` events (excluding `n`).|`<:5>` matches up to 5 events.
|`<n>`|This matches exactly `n` events.|`<5>` matches exactly 5 events.

Specific occurrences of the event in a collection can be retrieved by using an event index with its reference.
Square brackets can be used to indicate the event index where `1` can be used as the index of the first event and `last` can be used as the index
 for the `last` available event in the event collection. If you provide an index greater then the last event index,
 the system returns `null`. The following are some valid examples.

- `e1[3]` refers to the 3rd event.
- `e1[last]` refers to the last event.
- `e1[last - 1]` refers to the event before the last event.

**Example**

The following stream worker calculates the temperature difference between two regulator events.

```sql
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);
CREATE STREAM RegulatorStream (deviceID long, roomNo int, tempSet double, isOn bool);

INSERT INTO TempDiffStream
SELECT e1.roomNo, e2[0].temp - e2[last].temp as tempDiff
FROM every( e1=RegulatorStream) -> e2=TempStream[e1.roomNo==roomNo]<1:> -> e3=RegulatorStream[e1.roomNo==roomNo];
```

### Logical Patterns

Logical patterns match events that arrive in temporal order and correlate them with logical relationships such as `and`,
`or` and `not`.

**Syntax**

```sql
INSERT INTO <output stream>
SELECT <event reference>([event index])?.<attribute name>, ...
FROM (every)? (not)? <event reference>=<input stream>[<filter condition>]
          ((and|or) <event reference>=<input stream>[<filter condition>])? (within <time gap>)? ->  
    ...
```

Keywords such as `and`, `or`, or `not` can be used to illustrate the logical relationship.

Key Word|Description
---------|---------
`and`|This allows both conditions of `and` to be matched by two events in any order.
`or`|The state succeeds if either condition of `or` is satisfied. Here the event reference of the other condition is `null`.
`not <condition1> and <condition2>`| When `not` is included with `and`, it identifies the events that match `<condition2>` arriving before any event that match `<condition1>`.
`not <condition> for <time period>`| When `not` is included with `for`, it allows you to identify a situation where no event that matches `<condition1>` arrives during the specified `<time period>`.  e.g.,`from not TemperatureStream[temp > 60] for 5 sec`.

Here the `not` pattern can be followed by either an `and` clause or the effective period of `not` can be concluded after a given `<time period>`. Further in Stream more than two streams cannot be matched with logical conditions using `and`, `or`, or `not` clauses at this point.

### Detecting Non-occurring Events

Stream allows you to detect non-occurring events via multiple combinations of the key words specified above as shown in the table below.

In the patterns listed, P* can be either a regular event pattern, an absent event pattern or a logical pattern.

Pattern|Detected Scenario
---------|---------
`not A for <time period>`|The non-occurrence of event A within `<time period>` after system start up. e.g., Generating an alert if a taxi has not reached its destination within 30 minutes, to indicate that the passenger might be in danger.
`not A for <time period> and B`|After system start up, event A does not occur within `time period`, but event B occurs at some point in time.  e.g., Generating an alert if a taxi has not reached its destination within 30 minutes, and the passenger marked that he/she is in danger at some point in time.
`not A for <time period 1> and not B for <time period 2>`|After system start up, event A doess not occur within `time period 1`, and event B also does not occur within `<time period 2>`.  e.g., Generating an alert if the SDK of a taxi has not reached the destination within 30 minutes, and the passenger has not marked himself/herself to be in danger within that same time period.
`not A for <time period> or B`|After system start up, either event A does not occur within `<time period>`, or event B occurs at some point in time.  e.g., Generating an alert if the taxi has not reached its destination within 30 minutes, or if the passenger has marked that he/she is in danger at some point in time.
`not A for <time period 1> or not B for <time period 2>`|After system start up, either event A does not occur within `<time period 1>`, or event B occurs within `<time period 2>`.  e.g., Generating an alert to indicate that the SDK is not on an expected route if the taxi has not reached destination A within 20 minutes, or reached destination B within 30 minutes.
`A → not B for <time period>`|Event B does not occur within `<time period>` after the occurrence of event A. e.g., Generating an alert if the taxi has reached its destination, but this was not followed by a payment record.
`P* → not A for <time period> and B`|After the occurrence of P*, event A does not occur within `<time period>`, and event B occurs at some point in time.
`P* → not A for <time period 1> and not B for <time period 2>`|After the occurrence of P*, event A does not occur within `<time period 1>`, and event B does not occur within `<time period 2>`.
`P* → not A for <time period> or B`|After the occurrence of P*, either event A does not occur within `<time period>`, or event B occurs at some point in time.
`P* → not A for <time period 1> or not B for <time period 2>`|After the occurrence of P*, either event A does not occur within `<time period 1>`, or event B does not occur within `<time period 2>`.
`not A for <time period> → B`|Event A does occur within `<time period>` after the system start up, but event B occurs after that `<time period>` has elapsed.
`not A for <time period> and B → P*`|Event A does not occur within `<time period>`, and event B occurs at some point in time. Then P* occurs after the `<time period>` has elapsed, and after B has occurred.
`not A for <time period 1> and not B for <time period 2> → P*`|After system start up, event A does not occur within `<time period 1>`, and event B does not occur within `<time period 2>`. However, P* occurs after both A and B.
`not A for <time period> or B → P*`|After system start up, event A does not occur within `<time period>` or event B occurs at some point in time. The P* occurs after `<time period>` has elapsed, or after B has occurred.
`not A for <time period 1> or not B for <time period 2> → P*`|After system start up, either event A does not occur within `<time period 1>`, or event B does not occur within `<time period 2>`. Then P*  occurs after both `<time period 1>` and `<time period 2>` have elapsed.
`not A and B`|Event A does not occur before event B.
`A and not B`|Event B does not occur before event A.

**Example**

Following stream worker, sends the `stop` control action to the regulator when the key is removed from the hotel room.

```sql
CREATE STREAM RegulatorStateChangeStream (deviceID long, roomNo int, tempSet double, action string);
CREATE STREAM RoomKeyStream (deviceID long, roomNo int, action string);

INSERT INTO RegulatorActionStream
SELECT e1.roomNo, ifThenElse( e2 is null, 'none', 'stop' ) as action
FROM every( e1=RegulatorStateChangeStream[ action == 'on' ] ) ->
      e2=RoomKeyStream[ e1.roomNo == roomNo and action == 'removed' ] or e3=RegulatorStateChangeStream[ e1.roomNo == roomNo and action == 'off']
HAVING action != 'none';
```

This stream worker generates an alert if we have switch off the regulator before the temperature reaches 12 degrees.  

```sql
CREATE STREAM RegulatorStateChangeStream (deviceID long, roomNo int, tempSet double, action string);
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

INSERT INTO AlertStream
SELECT e1.roomNo as roomNo
FROM e1=RegulatorStateChangeStream[action == 'start'] -> not TempStream[e1.roomNo == roomNo and temp < 12] and e2=RegulatorStateChangeStream[action == 'off'];
```

This stream worker generates an alert if the temperature does not reduce to 12 degrees within five minutes of switching on the regulator.  

```sql
CREATE STREAM RegulatorStateChangeStream (deviceID long, roomNo int, tempSet double, action string);
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

INSERT INTO AlertStream
SELECT e1.roomNo as roomNo
FROM e1=RegulatorStateChangeStream[action == 'start'] -> not TempStream[e1.roomNo == roomNo and temp < 12] for 5 min;
```

## Sequence

Sequence is a state machine implementation that allows you to detect the sequence of event occurrences over time.
Here all matching events must arrive consecutively to match the sequence condition, and there cannot be any non-matching events arriving within a matching sequence of events.
This can correlate events within a single stream or between multiple streams.

**Purpose**

This allows you to detect a specified event sequence over a specified time period.

**Syntax**

The syntax for a sequence query is as follows:

```sql
INSERT INTO <output stream>
SELECT <event reference>.<attribute name>, <event reference>.<attribute name>, ...
FROM (every)? <event reference>=<input stream>[<filter condition>],
    <event reference>=<input stream [<filter condition>],
    ...
    (WITHIN <time gap>)?     
```

| Items | Description |
|-------------------|-------------|
| `,` | This represents the immediate next event i.e., when an event that matches the first condition arrives, the event that arrives immediately after it should match the second condition. |
| `<event reference>` | This allows you to add a reference to the the matching event so that it can be accessed later for further processing. |
| `(within <time gap>)?` | The `within` clause is optional. It defines the time duration within which all the matching events should occur. |
| `every` | `every` is an optional keyword. This defines whether the matching event should be triggered for every event that arrives at the specified stream with the matching condition.  When this keyword is not used, the matching is carried out only once. |

**Example**

This query generates an alert if the increase in the temperature between two consecutive temperature events exceeds one degree.

```sql
INSERT INTO AlertStream
SELECT e1.temp as initialTemp, e2.temp as finalTemp
FROM every e1=TempStream, e2=TempStream[e1.temp + 1 < temp];
```

### Counting Sequence

Counting sequences allow you to match multiple events for the same matching condition.
The number of events matched per condition can be limited via condition postfixes such as **Counting Patterns**, or by using the
`*`, `+`, and `?` operators.

The matching events can also be retrieved using event indexes, similar to how it is done in **Counting Patterns**.

**Syntax**

Each matching condition in a sequence can contain a collection of events as shown below.

```sql
INSERT INTO <output stream>
SELECT <event reference>.<attribute name>, <event reference>.<attribute name>, ...
FROM (every)? <event reference>=<input stream>[<filter condition>](+|*|?)?,
    <event reference>=<input stream [<filter condition>](+|*|?)?,
    ...
    (WITHIN <time gap>)?     
```

|Postfix symbol|Required/Optional |Description|
|---------|---------|---------|
| `+` | Optional |This matches **one or more** events to the given condition. |
| `*` | Optional |This matches **zero or more** events to the given condition. |
| `?` | Optional |This matches **zero or one** events to the given condition. |

**Example**

This stream worker identifies temperature peeks.

```
CREATE STREAM TempStream(deviceID long, roomNo int, temp double);

INSERT INTO PeekTempStream
SELECT e1.temp as initialTemp, e2[last].temp as peakTemp
FROM every e1=TempStream, e2=TempStream[e1.temp <= temp]+, e3=TempStream[e2[last].temp > temp];
```

### Logical Sequence

Logical sequences identify logical relationships using `and`, `or` and `not` on consecutively arriving events.

**Syntax**
The syntax for a logical sequence is as follows:

```
INSERT INTO <output stream>
SELECT <event reference>([event index])?.<attribute name>, ...
FROM (every)? (not)? <event reference>=<input stream>[<filter condition>]
          ((and|or) <event reference>=<input stream>[<filter condition>])? (within <time gap>)?,
    ...
```

Keywords such as `and`, `or`, or `not` can be used to illustrate the logical relationship, similar to how it is done in **Logical Patterns**.

**Example**

This stream worker notifies the state when a regulator event is immediately followed by both temperature and humidity events.

```sql
CREATE STREAM TempStream(deviceID long, temp double);
CREATE STREAM HumidStream(deviceID long, humid double);
CREATE STREAM RegulatorStream(deviceID long, isOn bool);

INSERT INTO StateNotificationStream
SELECT e2.temp, e3.humid
FROM every e1=RegulatorStream, e2=TempStream and e3=HumidStream;
```
