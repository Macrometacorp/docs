---
sidebar_position: 8
---

# Correlating Data

The stream processor can correlate data in order to detect patterns and trends in streaming data. Correlating can be done via patterns and sequences.

The difference between patterns and sequence is that sequences require all the matching events to arrive consecutively to
 match the sequence condition, whereas patterns identify events that match the pattern condition irrespective of the order in which they arrive.





## Correlating events to find a trend(sequence)

This section explains how you can use sequences to detect trends in events that arrive in a specific order. There are two types of sequences as follows:

- Counting Sequences: These count the number of instances that match the given sequence condition.
- Logical Sequences: These identify logical relationships between events.

### Count and match multiple events for a given trend

Counting and matching multiple events over a given period is done via sequences when you need to identify trends in events that occur in a specific order. To understand how this is done, consider a scenario where the temperature is read from a sensor and you need to identify the peaks in temperature. If an event (i.e., a single reading) is a peak, it should report a temperaature greater than that reported by the event that occured immediately before it as well as the event that occurred immediately after it. Therefore, to identify the peaks, follow the procedure below:

1. Start creating a new stream application and add the QL version. You can name it `TemperaturePeaksApp`.

    ```sql
    @App:name("TemperaturePeaksApp")
    @App:qlVersion("2")
    ```

2. To capture the temperature readings, define an input stream as follows.

    ```sql
    CREATE STREAM TempStream(deviceID long, roomNo int, temp double);
    ```

3. To report the peaks once they are identified, define an output stream as follows.

    ```sql
	CREATE SINK PeakTempStream WITH (type='stream', stream.list='TemperaturePeak]:') (initialTemp double, peakTemp double);
    ```

   The output directed to this stream is published via a sink of the `stream` type. For more information about publishing data via sinks, see the [Publishing Data](publishing-data.md).

4. To specify how to identify the peaks, add a `from` clause as follows.

    ```sql
    from every e1=TempStream, e2=TempStream[e1.temp <= temp]+, e3=TempStream[e2[last].temp > temp]
    ```

    :::note
    Note the following about the `from` clause:<br/>

    - `every` indicates that all the events in the `TempStream` must be checked for the given conditions.<br/>

    - Here, `e2` is the reference for the event identified as the peak temperature. The `e2=TempStream[e1.temp <= temp]+` condition specifies that to be identified as an event reporting a peak temperature, an event should have one or more preceding events that reports a lower or an equal temperature.<br/>

    - The `e3=TempStream[e2[last].temp > temp]` condition specifies a condition for `e3` which is the event that follows `e2`. It indicates that `e2`, the peak temperature event should be the last event before `e3`, and that the temperature reported by `e2` must be greater than the temperature reported by `e3`.
    :::  

5. To specify how to derive the values for the attributes in the `PeakTempStream` output stream are derived, add a `select` clause as follows.

    ```sql
    select e1.temp as initialTemp, e2[last].temp as peakTemp
    ```

    Here, the temperature reported by `e2` event is selected to be output as `peakTemp` because it is greater than the temperatures reported by events occuring before and after `e2`. The temperature reported by the event immediately before `e2` is selected as `initialTemp`.

6. To insert the output generated into the `PeakTempStream` output stream, add an `insert into` clause as follows.

    ```sql
    insert into PeakTempStream;
    ```

The completed stream application is as follows.

```sql
@App:name("TemperaturePeaksApp")
@App:qlVersion("2")

CREATE STREAM TempStream(deviceID long, roomNo int, temp double);

CREATE SINK PeakTempStream WITH (type='stream', stream.list='TemperaturePeak]:') (initialTemp double, peakTemp double);

insert into PeakTempStream
select e1.temp as initialTemp, e2[last].temp as peakTemp
from every e1=TempStream, e2=TempStream[e1.temp <= temp]+, e3=TempStream[e2[last].temp > temp];
```

### Combine several trends logically and match events

Logical sequences are used to identify logical relationships between events that occur in a specific order. To understand this consider a scenario where an application is able to notify the state only when the event that notifies that the regulator is switched on is immediately followed by two other events to report the temperature and humidity. To create such a stream application, follow the procedure below.

1. Start creating a new stream application and add the QL version. You can name it `RoomStateApp`.

    ```sql
    @App:name("RoomStateApp")
    @App:qlVersion("2")
    ```

2. You need three input streams to capture information about the state of the regulator, the temperature, and humidity.

    1. Define the input stream that captures the state of the regulator as follows.

        ```sql
        CREATE STREAM RegulatorStream (deviceID long, isOn bool);
        ```

    2. Define the input stream that captures the temperature as follows.

        ```sql
        CREATE STREAM TempStream (deviceID long, temp double);
        ```

    3. Define the input stream that captures the humidity as follows.

		```sql
		CREATE STREAM HumidStream (deviceID long, humid double);
 		```

       The output directed to this stream is published via a sink of the `stream` type. For more information about publishing data via sinks, see the [Publishing Data guide](publishing-data.md).

3. Now let's define an output stream to publish the temperature and humidity.

	```sql
	CREATE SINK StateNotificationStream WITH (type='c8streams', stream.list='RoomState]:') (temp double, humid double);
	```

4. To apply the logical sequence to derive the output, add the `from` clause as follows.

    ```sql
    from every e1=RegulatorStream, e2=TempStream and e3=HumidStream
    ```

    Here, the unique references `e1`, `e2`, and `e3` are assigned to the first, second, and thid events respectively. `e1` must arrive at the `RegulatorStream` stream, `e2` must arrive at the `TempStream` stream, and `e3` must arrive at the `HumidStream` stream in that order. The output event is generated only after all three of these input events have arrived.

5. To derive values for the attributes of the `StateNotificationStream` output stream, add a `select` clause as follows.

    ```sql
    select e2.temp, e3.humid
    ```

    To generate the output event, the value for the `temp` attribute must be taken from the `e2` (second) event, and the value for the `humid` attribute must be taken from the `e3` (third) event.

6. To direct the output to the `StateNotificationStream` output stream so that it can be logged, add an `insert into` clause as follows.

    ```sql
    insert into StateNotificationStream;
    ```

7. The completed stream application is as follows.

    ```sql
    @App:name("RoomStateApp")
    @App:qlVersion("2")
    
	CREATE STREAM RegulatorStream (deviceID long, isOn bool);
	CREATE STREAM TempStream (deviceID long, temp double);
	CREATE STREAM HumidStream (deviceID long, humid double);

	CREATE SINK StateNotificationStream WITH (type='c8streams', stream.list='RoomState]:') (temp double, humid double);
    
    insert into StateNotificationStream
    select e2.temp, e3.humid
    from every e1=RegulatorStream, e2=TempStream and e3=HumidStream;
    ```
