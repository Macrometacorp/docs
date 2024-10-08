---
sidebar_position: 30
title: Correlating Events to Find a Trend (Sequence)
---

This page explains how you can use sequences to detect trends in events that arrive in a specific order. There are two types of sequences:

- [Counting Sequences](../../query-guide/sequences/counting-sequences): These count the number of instances that match the given sequence condition.
- [Logical Sequences](../../query-guide/sequences/logical-sequences): These identify logical relationships between events.

## Count and Match Multiple Events for a Single Trend

Counting and matching multiple events over a given period is done with sequences when you need to identify trends in events that occur in a specific order. To understand how this is done, consider a scenario where the temperature is read from a sensor and you need to identify the peaks in temperature. If an event (i.e., a single reading) is a peak, then it should report a temperature greater than that reported by the event that occurred immediately before it as well as the event that occurred immediately after it.

### Single Trend Stream Worker

```sql
@App:name("TemperaturePeaksApp")
@App:qlVersion("2")

-- Input stream to capture the temperature readings.
CREATE STREAM TempStream(deviceID long, roomNo int, temp double);

-- Output stream to report the peaks once they are identified.
CREATE SINK PeakTempStream WITH (type='stream', stream.list='TemperaturePeak]:') (initialTemp double, peakTemp double);

-- Query to identify the peaks.
INSERT INTO PeakTempStream
SELECT e1.temp AS initialTemp, e2[last].temp AS peakTemp
FROM every e1=TempStream, e2=TempStream[e1.temp <= temp]+, e3=TempStream[e2[last].temp > temp];
```

### Single Trend Query Explanation

- `every` indicates that all the events in the `TempStream` must be checked for the given conditions.
- `e2` is the reference for the event identified as the peak temperature. The `e2=TempStream[e1.temp <= temp]+` condition specifies that to be identified as an event reporting a peak temperature, an event should have one or more preceding events that reports a lower or an equal temperature.
- The `e3=TempStream[e2[last].temp > temp]` condition specifies a condition for `e3` which is the event that follows `e2`. It indicates that `e2`, the peak temperature event should be the last event before `e3`, and that the temperature reported by `e2` must be greater than the temperature reported by `e3`.
- The temperature reported by `e2` event is selected to be output as `peakTemp` because it is greater than the temperatures reported by events occurring before and after `e2`. The temperature reported by the event immediately before `e2` is selected as `initialTemp`.

## Combine Several Trends Logically and Match Events

Logical sequences are used to identify logical relationships between events that occur in a specific order. To understand this, consider a scenario where an application is able to notify the state only when the event that notifies that the regulator is switched on is immediately followed by two other events to report the temperature and humidity.

### Multi-Trend Stream Worker

```sql
@App:name("RoomStateApp")
@App:qlVersion("2")

-- Input streams to capture information about the state of the regulator, the temperature, and humidity.
CREATE STREAM RegulatorStream (deviceID long, isOn bool);
CREATE STREAM TempStream (deviceID long, temp double);
CREATE STREAM HumidStream (deviceID long, humid double);

-- Output stream to publish the temperature and humidity.
CREATE SINK StateNotificationStream WITH (type='stream', stream.list='RoomState]:') (temp double, humid double);

-- Query to apply the logical sequence to derive the output.
INSERT INTO StateNotificationStream
SELECT e2.temp, e3.humid
FROM every e1=RegulatorStream, e2=TempStream AND e3=HumidStream;
```

### Multi-Trend Query Explanation

- The unique references `e1`, `e2`, and `e3` are assigned to the first, second, and third events respectively. `e1` must arrive at the `RegulatorStream` stream, `e2` must arrive at the `TempStream` stream, and `e3` must arrive at the `HumidStream` stream in that order. The output event is generated only after all three of these input events have arrived.
- To generate the output event, the value for the `temp` attribute must be taken from the `e2` (second) event, and the value for the `humid` attribute must be taken from the `e3` (third) event.
