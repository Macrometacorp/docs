---
sidebar_position: 7
---

# Pattern & Trend Mining

## Simple Pattern

The pattern is a state machine implementation that detects event occurrences from events arrived via one or more event streams over time.

This example shows a simple pattern that detects high-temperature event occurrence of a continuous event stream.


```sql
-- Defines `TemperatureStream` having information of room temperature such as `roomNo` and `temp`.
CREATE STREAM TemperatureStream(roomNo int, temp double);

-- Defines `HighTempAlertStream` which contains the alerts for high temperature.
CREATE SINK HighTempAlertStream WITH (type = 'log') (roomNo int, initialTemp double, finalTemp double);


@info(name='temperature-increase-identifier')
-- Identify if the temperature of a room increases by 5 degrees within 10 min.
insert into HighTempAlertStream
select e1.roomNo, e1.temp as initialTemp, e2.temp as finalTemp
from every( e1 = TemperatureStream ) ->
    e2 = TemperatureStream[ e1.roomNo == roomNo
        and (e1.temp + 5) <= temp ]
    within 10 min;
```

This application sends an alert if the temperature of a room increases by 5 degrees within 10 min.

### Input

Below events are sent to `TemperatureStream` within 10 minutes,

[`2`, `35`]

[`2`, `37`]

[`2`, `40`]


### Output

After processing the above input events, the event arriving at `HighTempAlertStream` will be as follows:

[`2`, `35.0`, `40.0`]

## Counting Pattern

Counting patterns allow to match multiple events that may have been received for the same matching condition. The number of events matched per condition can be limited via condition postfixes.

Refer the [stream query guide](query-guide.md) for more information.


```sql
-- Defines `TemperatureStream` having information on room temperature such as `sensorID`, `roomNo` and `temp`.
CREATE STREAM TemperatureStream (sensorID long, roomNo int, temp double);


-- Defines `RegulatorStream` which contains the events from regulator with attributes `deviceID`, `roomNo`, `tempSet`, and `isOn`.
CREATE STREAM RegulatorStream (deviceID long, roomNo int, tempSet double, isOn bool);

-- Defines `TemperatureDiffStream` which contains the events related to temperature difference.
CREATE SINK TemperatureDiffStream WITH (type = 'log') (roomNo int, tempDiff double);

-- Calculates the temperature difference between two regulator events. Here, when at least one TemperatureStream event needs to arrive between two RegulatorStream events.
-- Finds the temperature difference between the first and last temperature event.
insert into TemperatureDiffStream
select e1.roomNo, e2[0].temp - e2[last].temp as tempDiff
from every( e1 = RegulatorStream)
    -> e2 = TemperatureStream[e1.roomNo == roomNo] < 1: >
    -> e3 = RegulatorStream[e1.roomNo == roomNo];
```

This application calculates the temperature difference between two regulator events. Here, when at least one TemperatureStream event occurs between two RegulatorStream events the pattern is valid and logs can be seen.

### Input

- First, below event is sent to `RegulatorStream`,

    [`21`, `2`, `25`, `true`]

- Below events are sent to `TemperatureStream`,

    [`21`, `2`, `29`]

    [`21`, `2`, `26`]

- Finally, below event is sent again to `RegulatorStream`,

    [`21`, `2`, `30`, `true`]

### Output

After processing the above input events, the event arriving at `TemperatureDiffStream` will be as follows:

[`2`, `3.0`]

## Logical Pattern

Logical patterns match events that arrive in temporal order and correlate them with logical relationships such as `and`, `or` and `not`.

Refer the [stream query guide](query-guide.md) for more information.


```sql
-- Defines `RegulatorStateChangeStream` having information of regulator state change such as `deviceID`, `roomNo`, `tempSet` and `action`.
CREATE STREAM RegulatorStateChangeStream(deviceID long, roomNo int, tempSet double, action string);

-- Defines `RoomKeyStream` which contains the events related to room key usage.
CREATE STREAM RoomKeyStream(deviceID long, roomNo int, action string);

-- Defines `RegulatorActionStream` which contains the events related to regulator state changes.
CREATE SINK RegulatorActionStream WITH (type='log') (roomNo int, action string);


-- Sends a stop action on RegulatorActionStream stream, if a removed action is triggered in the RoomKeyStream stream before the regulator state changing to off which is notified RegulatorStateChangeStream stream
insert into RegulatorActionStream
select e1.roomNo,
-- Checks whether pattern triggered due to removal of room key.
    ifThenElse( e2 is null, 'none', 'stop' ) as action
from every e1=RegulatorStateChangeStream[ action == 'on' ]
     -> e2=RoomKeyStream
            [ e1.roomNo == roomNo and action == 'removed' ]
        or e3=RegulatorStateChangeStream
            [ e1.roomNo == roomNo and action == 'off']
having action != 'none'            ;
```

This application sends a `stop` action on the regulator if a `removed` action is triggered in the RoomKeyStream stream.

### Input

- First, below event is sent to `RegulatorStateChangeStream`,

    [`10`, `5`, `30`, `on`]

- Then, send below events are sent to `RoomKeyStream`,

    [`10`, `5`, `removed`]


### Output

After processing the above input events, the event arriving at `RegulatorActionStream` will be as follows:

[`5`, `stop`]


## Non Occurrence Pattern

Non occurrence patterns identifies the absence of events when detecting a pattern.

Stream Processor detects non-occurrence of events using the not keyword, and its effective non-occurrence checking period is bounded either by fulfillment of a condition associated by and or via an expiry time using `<time period>`.

Refer the [stream query guide](query-guide.md) for more information.


```sql
-- Defines `RegulatorStateChangeStream` having information of regulator state change such as `deviceID`, `roomNo`, `tempSet` and `action`.
CREATE STREAM RegulatorStateChangeStream(deviceID long, roomNo int, tempSet double, action string);

-- Defines `TemperatureStream` having information of room temperature such as `roomNo` and `temp`.
CREATE STREAM TemperatureStream (roomNo int, temp double);

-- Defines `RoomTemperatureAlertStream` which contains the temperature alerts.
CREATE SINK RoomTemperatureAlertStream WITH (type='log') (roomNo int);


-- Alerts if no temperature event having a temperature less than what is set in regulator arrives within 5 minutes after switching on the regulator.
insert into RoomTemperatureAlertStream
select e1.roomNo as roomNo
from e1=RegulatorStateChangeStream[action == 'on']
     -> not TemperatureStream[e1.roomNo == roomNo and
        temp <= e1.tempSet] for 30 sec;
```

This application sends a notification alert if the room temperature is not reduced to the expected level after the regulator is started.

### Input

- First, below event is sent to `RegulatorStateChangeStream`,

    [`10`, `5`, `30`, `on`]

### Output

After processing the above input event, there will be an alert event arriving at `RoomTemperatureAlertStream` after the 30 seconds (from the first event):

[`5`]

## Simple Sequence

Sequence is a state machine implementation that detects consecutive event occurrences from events arrived via one or more event streams over time. Here all matching events need to arrive consecutively, and there should not be any non-matching events in between the matching sequence of events.

Refer the [stream query guide](query-guide.md) for more information.


```sql
-- Defines `StockRateStream` having information on stock rate such as `symbol`, `price` and `volume`.
CREATE STREAM StockRateStream (symbol string, price float, volume int);

-- Defines `PeakStockRateStream` which contains the peak stock rate.
CREATE SINK PeakStockRateStream WITH (type='log') (symbol string, rateAtPeak float);


-- Partition the `StockRateStream` events by `symbol`
partition with (symbol of StockRateStream)
begin

-- Identifies the peak stock price (top rate of the stock price trend)
    insert into PeakStockRateStream
    select e1.symbol, e2.price as rateAtPeak
    from every e1=StockRateStream,
    	e2=StockRateStream[e1.price < price],
    	e3=StockRateStream[e2.price > price]
        within 10 min;
end;
```

This application can be used to detect trends from a stock trades stream; in the above example, peak stock rate identified.

### Input
Below events are sent to `StockRateStream` within 10 minutes,

[`mint-leaves`, `35`, `20`]

[`mint-leaves`, `40`, `15`]

[`mint-leaves`, `38`, `20`]

### Output
After processing the above input events, the event arriving at `PeakStockRateStream` will be as follows:

[`mint-leaves`, `40`]

## Sequence with Count

Sequence query does expect the matching events to occur immediately after each other, and it can successfully correlate the events who do not have other events in between. Here, sequence can count event occurrences.

Refer the [stream query guide](query-guide.md) for more information.


```sql
-- Defines `TemperatureStream` having information on room temperatures such as `roomNo` and `temp`.
CREATE STREAM TemperatureStream(roomNo int, temp double);

-- Defines `PeakTemperatureStream` which contains events related to peak temperature trends.
CREATE SINK PeakTemperatureStream WITH (type='log') (roomNo int, initialTemp double, peakTemp double, firstDropTemp double);

-- Partition the `TemperatureStream` events by `roomNo`
partition with (roomNo of TemperatureStream)
begin

    @info(name = 'temperature-trend-analyzer')
    insert into PeakTemperatureStream 
-- Projects the lowest, highest and the first drop in the temperature trend
    select e1.roomNo, e1.temp as initialTemp,
        e2[last].temp as peakTemp, e3.temp as firstDropTemp

-- Identifies the trend of the temperature in a room
    from every e1=TemperatureStream,
         e2=TemperatureStream[ifThenElse(e2[last].temp is null,
                e1.temp <= temp, e2[last].temp <= temp)]+,
         e3=TemperatureStream[e2[last].temp > temp];

end;
```

This application identifies temperature peaks by monitoring continuous increases in temp attribute and alerts upon the first drop.

### Input

- Below events are sent to `TemperatureStream`,

    [`20`, `29`]
    [`10`, `28`]
    [`20`, `30`]
    [`20`, `32`]
    [`20`, `35`]
    [`20`, `33`]

### Output

After processing the above input events, the event arriving at `PeakTemperatureStream` will be as follows:

[`20`, `29.0`, `35.0`, `33.0`]

## Logical Sequence

The sequence can repetitively match event `sequences` and use logical event ordering (using `and`, `or`, and `not`).

Refer the [stream query guide](query-guide.md) for more information.


```sql
-- Defines `TempSensorStream` having information of temperature sensor device.
CREATE STREAM TempSensorStream(deviceID long, isActive bool);


-- Defines `HumidSensorStream` having information of humidity sensor device.
CREATE STREAM HumidSensorStream(deviceID long, isActive bool);


-- Defines `RegulatorStream` which contains the events from regulator with attributes `deviceID` and `isOn`.
CREATE STREAM RegulatorStream(deviceID long, isOn bool);


CREATE SINK StateNotificationStream WITH (type='log') (deviceID long, tempSensorActive bool, humidSensorActive bool);


-- Identifies a regulator activation event immediately followed by both temperature sensor and humidity sensor activation events in either order.
insert into StateNotificationStream
select e1.deviceID, e2.isActive as tempSensorActive,
    e3.isActive as humidSensorActive
from every e1=RegulatorStream[isOn == true],
    e2=TempSensorStream and e3=HumidSensorStream;
```

This application can be used identify a regulator activation event immediately followed by both temperature sensor and humidity sensor activation events in either order.

### Input

- First, below event is sent to `RegulatorStream`,

    [`2134`, `true`]

- Then, below event is sent to `HumidSensorStream`,

    [`124`, `true`]

- Then, below event is sent to `TempSensorStream`,

    [`242`, `false`]

### Output

After processing the above input events, the event arriving at `StateNotificationStream` will be as follows:

[`2134`, `false`, `true`]