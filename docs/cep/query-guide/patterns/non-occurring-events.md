---
sidebar_position: 40
title: Detecting Non-occurring Events
---

Stream workers allow you to detect non-occurring events via multiple combinations of the keywords specified above as shown in the table below.

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

This stream worker sends the `stop` control action to the regulator when the key is removed from the hotel room.

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

## Example 4

This stream worker detects non-occurrence of events using the not keyword, and its effective non-occurrence checking period is bounded either by fulfillment of a condition associated by and or via an expiry time using `<time period>`.

It sends a notification alert if the room temperature is not reduced to the expected level after the regulator is started.

### Stream Worker Code

```sql
-- Defines `RegulatorStateChangeStream` having information of regulator state change such as `deviceID`, `roomNo`, `tempSet`, and `action`.
CREATE STREAM RegulatorStateChangeStream(deviceID long, roomNo int, tempSet double, action string);

-- Defines `TemperatureStream` having information of room temperature such as `roomNo` and `temp`.
CREATE STREAM TemperatureStream (roomNo int, temp double);

-- Defines `RoomTemperatureAlertStream` which contains the temperature alerts.
CREATE SINK RoomTemperatureAlertStream WITH (type='log') (roomNo int);

-- Alerts if no temperature event having a temperature less than what is set in regulator arrives within 5 minutes after switching on the regulator.
INSERT INTO RoomTemperatureAlertStream
SELECT e1.roomNo AS roomNo
FROM e1=RegulatorStateChangeStream[action == 'on']
     -> NOT TemperatureStream[e1.roomNo == roomNo AND
        temp <= e1.tempSet] for 30 sec;
```

### Non-Occurrence Pattern Input

- First, below event is sent to `RegulatorStateChangeStream`:

    [`10`, `5`, `30`, `on`]

### Non-Occurrence Pattern Output

After processing the above input event, an alert event arrives at `RoomTemperatureAlertStream` after the 30 seconds (from the first event):

[`5`]
