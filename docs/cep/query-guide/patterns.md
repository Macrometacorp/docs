---
sidebar_position: 130
title: Patterns
---

_Patterns_ are a state machine implementation that allows you to detect patterns in the events that arrive over time. This can correlate events within a single stream or between multiple streams.

## Purpose

Patterns allow you to identify trends in events over a time period.

## Syntax

The following is the syntax for a pattern query:

```sql
INSERT INTO <output stream>
SELECT <event reference>.<attribute name>, <event reference>.<attribute name>, ...
FROM (every)? <event reference>=<input stream>[<filter condition>] ->
    (every)? <event reference>=<input stream [<filter condition>] ->
    ...
    (WITHIN <time gap>)?
```

## Query Parameters

| Items| Description |
|-------------------|-------------|
| `->` | This is used to indicate an event that should be following another event. The subsequent event does not necessarily have to occur immediately after the preceding event. The condition to be met by the preceding event should be added before the sign, and the condition to be met by the subsequent event should be added after the sign. |
| `<event reference>` | This allows you to add a reference to the the matching event so that it can be accessed later for further processing. |
| `(within <time gap>)?` | The `WITHIN` clause is optional. It defines the time duration within which all the matching events should occur. |
| `every` | `every` is an optional keyword. This defines whether the event matching should be triggered for every event arrival in the specified stream with the matching condition.  When this keyword is not used, the matching is carried out only once. |

Stream also supports pattern matching with counting events and matching events in a logical order such as (`and`, `or`, and `not`).

## Example

This query sends an alert if the temperature of a room increases by 5 degrees within 10 min.

```sql
INSERT INTO AlertStream
SELECT e1.roomNo, e1.temp AS initialTemp, e2.temp AS finalTemp
FROM every( e1=TempStream ) -> e2=TempStream[ e1.roomNo == roomNo and (e1.temp + 5) <= temp ]
    WITHIN 10 min;
```

Here, the matching process begins for each event in the `TempStream` stream (because `every` is used with `e1=TempStream`),
and if  another event arrives within 10 minutes with a value for the `temp` attribute that is greater than or equal to `e1.temp + 5` of the event e1, an output is sent to `AlertStream`.

## Counting Pattern

Counting patterns allow you to match multiple events that may have been received for the same matching condition.
The number of events matched per condition can be limited via condition postfixes.

### Syntax

Each matching condition can contain a collection of events with the minimum and maximum number of events to be matched as shown in the syntax below.

```sql
INSERT INTO <output stream>
SELECT <event reference>([event index])?.<attribute name>, ...
FROM (every)? <event reference>=<input stream>[<filter condition>] (<<min count>:<max count>>)? ->  
    ...
    (WITHIN <time gap>)?     
```

### Postfix Expressions

These postfix expressions are used to specify the number of times a pattern or sub-pattern should match in regular expressions.

|Postfix|Description|Example
---------|---------|---------
|`<n1:n2>`|This matches `n1` to `n2` events (including `n1` and not more than `n2`).|`1:4` matches 1 to 4 events.
|`<n:>`|This matches `n` or more events (including `n`).|`<2:>` matches 2 or more events.
|`<:n>`|This matches up to `n` events (excluding `n`).|`<:5>` matches up to 5 events.
|`<n>`|This matches exactly `n` events.|`<5>` matches exactly 5 events.

Specific occurrences of the event in a collection can be retrieved by using an event index with its reference.
Square brackets can be used to indicate the event index where `1` can be used as the index of the first event and `last` can be used as the index for the `last` available event in the event collection. If you provide an index greater then the last event index, the system returns `null`. The following are some valid examples.

- `e1[3]` refers to the 3rd event.
- `e1[last]` refers to the last event.
- `e1[last - 1]` refers to the event before the last event.

### Counting Pattern Example

The following stream worker calculates the temperature difference between two regulator events.

```sql
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);
CREATE STREAM RegulatorStream (deviceID long, roomNo int, tempSet double, isOn bool);

INSERT INTO TempDiffStream
SELECT e1.roomNo, e2[0].temp - e2[last].temp as tempDiff
FROM every( e1=RegulatorStream) -> e2=TempStream[e1.roomNo==roomNo]<1:> -> e3=RegulatorStream[e1.roomNo==roomNo];
```

## Logical Patterns

Logical patterns match events that arrive in temporal order and correlate them with logical relationships such as `and`,
`or` and `not`.

### Syntax

```sql
INSERT INTO <output stream>
SELECT <event reference>([event index])?.<attribute name>, ...
FROM (every)? (not)? <event reference>=<input stream>[<filter condition>]
          ((and|or) <event reference>=<input stream>[<filter condition>])? (within <time gap>)? ->  
    ...
```

### Logical Pattern Keywords

Keywords such as `and`, `or`, or `not` can be used to illustrate the logical relationship.

|Keyword|Description|
---------|---------
|`and`|This allows both conditions of `and` to be matched by two events in any order.|
|`or`|The state succeeds if either condition of `or` is satisfied. Here the event reference of the other condition is `null`.|
`not <condition1> and <condition2>`| When `not` is included with `and`, it identifies the events that match `<condition2>` arriving before any event that match `<condition1>`.|
|`not <condition> for <time period>`| When `not` is included with `for`, it allows you to identify a situation where no event that matches `<condition1>` arrives during the specified `<time period>`.  e.g.,`from not TemperatureStream[temp > 60] for 5 sec`.|

Here the `not` pattern can be followed by either an `and` clause or the effective period of `not` can be concluded after a given `<time period>`. Further in Stream more than two streams cannot be matched with logical conditions using `and`, `or`, or `not` clauses at this point.

## Detecting Non-occurring Events

Stream allows you to detect non-occurring events via multiple combinations of the keywords specified above as shown in the table below.

### Non-occurring Event Patterns

In the patterns listed, P* can be either a regular event pattern, an absent event pattern or a logical pattern.

|Pattern|Detected Scenario
---------|---------
|`not A for <time period>`|The non-occurrence of event A within `<time period>` after system start up. e.g., Generating an alert if a taxi has not reached its destination within 30 minutes, to indicate that the passenger might be in danger.|
|`not A for <time period> and B`|After system start up, event A does not occur within `time period`, but event B occurs at some point in time.  e.g., Generating an alert if a taxi has not reached its destination within 30 minutes, and the passenger marked that he/she is in danger at some point in time.|
|`not A for <time period 1> and not B for <time period 2>`|After system start up, event A does not occur within `time period 1`, and event B also does not occur within `<time period 2>`.  e.g., Generating an alert if the SDK of a taxi has not reached the destination within 30 minutes, and the passenger has not marked himself/herself to be in danger within that same time period.|
|`not A for <time period> or B`|After system start up, either event A does not occur within `<time period>`, or event B occurs at some point in time.  e.g., Generating an alert if the taxi has not reached its destination within 30 minutes, or if the passenger has marked that he/she is in danger at some point in time.|
|`not A for <time period 1> or not B for <time period 2>`|After system start up, either event A does not occur within `<time period 1>`, or event B occurs within `<time period 2>`.  e.g., Generating an alert to indicate that the SDK is not on an expected route if the taxi has not reached destination A within 20 minutes, or reached destination B within 30 minutes.|
|`A → not B for <time period>`|Event B does not occur within `<time period>` after the occurrence of event A. e.g., Generating an alert if the taxi has reached its destination, but this was not followed by a payment record.|
|`P* → not A for <time period> and B`|After the occurrence of P*, event A does not occur within `<time period>`, and event B occurs at some point in time.|
|`P* → not A for <time period 1> and not B for <time period 2>`| After the occurrence of P*, event A does not occur within `<time period 1>`, and event B does not occur within `<time period 2>`.|
|`P* → not A for <time period> or B`|After the occurrence of P*, either event A does not occur within `<time period>`, or event B occurs at some point in time.|
|`P* → not A for <time period 1> or not B for <time period 2>`|After the occurrence of P*, either event A does not occur within `<time period 1>`, or event B does not occur within `<time period 2>`.|
|`not A for <time period> → B`|Event A does occur within `<time period>` after the system start up, but event B occurs after that `<time period>` has elapsed.|
|`not A for <time period> and B → P*`|Event A does not occur within `<time period>`, and event B occurs at some point in time. Then P* occurs after the `<time period>` has elapsed, and after B has occurred.|
|`not A for <time period 1> and not B for <time period 2> → P*`|After system start up, event A does not occur within `<time period 1>`, and event B does not occur within `<time period 2>`. However, P* occurs after both A and B.|
|`not A for <time period> or B → P*`|After system start up, event A does not occur within `<time period>` or event B occurs at some point in time. The P* occurs after `<time period>` has elapsed, or after B has occurred.|
|`not A for <time period 1> or not B for <time period 2> → P*`|After system start up, either event A does not occur within `<time period 1>`, or event B does not occur within `<time period 2>`. Then P*  occurs after both `<time period 1>` and `<time period 2>` have elapsed.|
|`not A and B`|Event A does not occur before event B.|
|`A and not B`|Event B does not occur before event A.|

### Example 1

```sql
CREATE STREAM RegulatorStateChangeStream (deviceID long, roomNo int, tempSet double, action string);
CREATE STREAM RoomKeyStream (deviceID long, roomNo int, action string);

INSERT INTO RegulatorActionStream
SELECT e1.roomNo, ifThenElse( e2 is null, 'none', 'stop' ) AS action
FROM every( e1=RegulatorStateChangeStream[ action == 'on' ] ) ->
      e2=RoomKeyStream[ e1.roomNo == roomNo and action == 'removed' ] OR e3=RegulatorStateChangeStream[ e1.roomNo == roomNo and action == 'off']
HAVING action != 'none';
```

Following stream worker, sends the `stop` control action to the regulator when the key is removed from the hotel room.

### Example 2

```sql
CREATE STREAM RegulatorStateChangeStream (deviceID long, roomNo int, tempSet double, action string);
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

INSERT INTO AlertStream
SELECT e1.roomNo AS roomNo
FROM e1=RegulatorStateChangeStream[action == 'start'] -> NOT TempStream[e1.roomNo == roomNo and temp < 12] AND e2=RegulatorStateChangeStream[action == 'off'];
```

This stream worker generates an alert if we have switch off the regulator before the temperature reaches 12 degrees.  

### Example 3

```sql
CREATE STREAM RegulatorStateChangeStream (deviceID long, roomNo int, tempSet double, action string);
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

INSERT INTO AlertStream
SELECT e1.roomNo AS roomNo
FROM e1=RegulatorStateChangeStream[action == 'start'] -> NOT TempStream[e1.roomNo == roomNo and temp < 12] for 5 min;
```

This stream worker generates an alert if the temperature does not reduce to 12 degrees within five minutes of switching on the regulator.  
