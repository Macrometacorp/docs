---
sidebar_position: 8
---

# Correlating Data

The stream processor can correlate data in order to detect patterns and trends in streaming data. Correlating can be done via patterns and sequences.

The difference between patterns and sequence is that sequences require all the matching events to arrive consecutively to
 match the sequence condition, whereas patterns identify events that match the pattern condition irrespective of the order in which they arrive.

## Correlating events to find a pattern

This section explains how you can detect trends and patterns in the streams. There are two types of patterns as follows:

- Counting Patterns: These count the number of instances that match the given pattern condition.
- Logical Patterns: These identify logical relationships between events.

### Count and match multiple events for a given pattern condition

To understand how to count and match multiple events that match a specific condition, consider the example where a store 
wants to check the frequency with which a specific product needs to be repaired within two months after it is purchased. 
If a specific product is brought back for repairs within two months more than five times, the manager of purchases needs 
to be notified via a mail. To do this, create a Stream application as follows.

1. Start creating a new stream application and add the QL version. You can name it `DefectDetectionApp`. For instructions, see [Creating a Stream Application](create-stream-app.md).

    ```
    @App:name("DefectDetectionApp")
	@App:qlVersion("2")
    ```
    
2. Define the input streams into which the events compared are received.
    1. To capture information about purchases, define a stream as follows.
        ```
        CREATE STREAM PurchasesStream (productName string, custID string);
        ```
    2. To capture information about repairs, define a stream as follows.
        ```
        CREATE STREAM RepairsStream (productName string, custID string);
        ```
        
3. To notify the purchase manager that the threshold is reached define an output sink with an email sink attached as follows:

    ```
	CREATE STREAM DefectiveProductsStream WITH (sink.type='email', sink.address='storemanager@abc.com', sink.username='storemanager', sink.password='secret_password', sink.subject='Defective Product Alert', sink.to='purchasemanager@headoffice.com', sink.map.type = 'text', sink.map.payload = ("Hello,The product {{productName}} is identified as defective.\n\nThis message was generated automatically."))

    ```
    
4. To count occurrences where a product is brought back for repairs within two months following its purchase, and identify products where the threshold for such occurrences is reached, create a query as follows.

    1. To specify how the value for each attribute in the `DefectiveProductsStream` output stream is defined, add the `select` clause as follows.
        ```
        select e1.productName
        ```
        The output should only consist of the product identified to be possibly defective. Therefore, only the `productName` attribute is selected.

    2. To specify the input streams from which the input events to be analyzed for pattern detection are taken, add a `from` clause as follows.

        ```
        from every (e1=PurchasesStream) -> e2=RepairsStream[e1.productName==e2.productName and e1.custID==e2.custID]<5:> within 2 months
        ```

        :::note
            Note the following about the above `from` clause:
        :::
            * The input is derived from two streams. Therefore, first, both streams considered are specified and a unique reference is assigned to each stream. The `PurchasesStream` is referred to as `e1` and the `RepairsStream` is referred to as `e2`.

            * The matching condition to be met is that both streams should have an event where the values for both `productName` and `custID` attributes are the same.

            * The event in the `PurchasesStream` stream need to arrive before the matching event in the `RepairsStream` stream.

            * The matching event in the `RepairsStream` stream should arrive within two months after the arrival of the event in the `PurchasesStream` stream.

            * `<5:>` indicates that an output is generated only when the matching condition is met five times.

            * A time window of `2 months` is added to consider only a period of two months in a sliding manner when counting the number of times the matching condition for the pattern is met. For more information about time windows, see [Summarizing Data - Calculate and store clock-time based aggregate values](summarizing-data.md#calculate-and-store-clock-time-based-aggregate-values)
              
    3. To specify that the output has to directed to the `DefectiveProductsStream`, add the `insert into` clause as follows.
        ```
        insert into DefectiveProductsStream
        ```
        
    4. The completed stream application is as follows.

        ```
        @App:name("DefectDetectionApp")
        @App:qlVersion("2")
        
        CREATE STREAM PurchasesStream (productName string, custID string);
        
        CREATE STREAM RepairsStream (productName string, custID string);
        
        CREATE STREAM DefectiveProductsStream WITH (sink.type='email', sink.address='storemanager@abc.com', sink.username='storemanager', sink.password='secret_password', sink.subject='Defective Product Alert', sink.to='purchasemanager@headoffice.com', sink.map.type = 'text', sink.map.payload = ("Hello,The product {{productName}} is identified as defective.\n\nThis message was generated automatically."))
        
        insert into DefectiveProductsStream
        select e1.productName
        from every (e1=PurchasesStream) -> e2=RepairsStream[e1.productName==e2.productName and e1.custID==e2.custID]<5:> within 2 months
        ```

### Combine several patterns logically and match events

To understand how to combine several patterns logically and match events, consider an example of a factory foreman who 
needs to observe the factory output, identify any production decreases and check whether those decreases have reached 
maximum threshold which requires him to take action. To do this, you can create a Stream application as follows:

1. Start creating a new stream application and add the QL version. You can name it `ProductionDecreaseDetectionApp` For instructions, see [Creating a Stream Application](create-stream-app.md).

    ```
    @App:name("ProductionDecreaseDetectionApp")
    @App:qlVersion("2")
    ```

2. Define an input stream as follows to capture the factory output.
    ```
    CREATE STREAM ProductionStream(productName string, factoryBranch string, productionAmount long);
    ```

3. Now define an output stream as follows to present the observed production trend after applying the logical pattern.
    ```
	CREATE SINK ProductionDecreaseAlertStream WITH (type='log', prefix='Decrease in production detected:') (productName string, originalAmount long, laterAmount long, factoryBranch string);
    ```

    The output directed to this stream is published via a sink of the `c8streams` type. For more information about publishing data via sinks, see the [Publishing Data](publishing-data.md).

4. To apply the pattern so that the production trend can be observed, add the `from` clause as follows.

    ```
    from every (e1=ProductionStream) -> e2=ProductionStream[e1.productName == e2.productName and e1.productionAmount - e2.productionAmount > 10]
         within 10 min
    ```

    :::note
        Note the following about the `from`clause:<br/>

        - Here, two events from the same stream are compared to identify whether the production has decreased. The unique reference for the first event is `e1`, and the unique reference for the second event is `e2`.

        - `e2` arrives after `e1`, but it is not necessarily the event that arrives immediately after `e1`.

        - The condition that should be met for `e1` and `e2` to be compared is `e1.productName == e2.productName and e1.productionAmount - e2.productionAmount > 10`. This means, both the events should report the production of the same product, and there should be a decrease in production that is greater than 10 between the `e1` and `e2` events.

        - A `10 min` time window is included to indicate that an output event is generated only if the decrease in production by 10 or more units takes place every ten minutes in a sliding manner. For more information about time windows, see [Calculate and store clock time-based aggregate values](summarizing-data.md#calculate-and-store-clock-time-based-aggregate-values).
    :::

5. To present the required output by deriving values for the attributes of the `ProductionDecreaseAlertStream` output stream you created, add the `select` clause as follows.

    ```
    select e1.productName, e1.productionAmount as originalAmount, e2.productionAmount as laterAmount, e1.factoryBranch
    ```
    
    Here, the production amount of the first event is presented as `originalAmount`, and the amount of the second event is presented as `laterAmount`.

6. To insert the output into the `ProductionDecreaseAlertStream` output stream, add the `insert into` clause as follows.
    ```
    insert into ProductionDecreaseAlertStream;
    ```
    
The completed stream application is as follows.

```
@App:name("ProductionDecreaseDetectionApp")
@App:qlVersion("2")


CREATE STREAM ProductionStream(productName string, factoryBranch string, productionAmount long);

CREATE SINK ProductionDecreaseAlertStream WITH (type='log', prefix='Decrease in production detected:') (productName string, originalAmount long, laterAmount long, factoryBranch string);

insert into ProductionDecreaseAlertStream
select e1.productName, e1.productionAmount as originalAmount, e2.productionAmount as laterAmount, e1.factoryBranch
from every (e1=ProductionStream) -> e2=ProductionStream[e1.productName == e2.productName and e1.productionAmount - e2.productionAmount > 10] within 10 min;
```

## Find non-occurrence of events

This section explains how to analyze data by observing scenarios where events do not occur. To understand how this is done, consider a taxi service company that tracks the movements of the taxis it runs and wants to be notified of unexpected delays. Consider a specific scenario where the manager needs to contact the driver if the taxi has not reached either of two specified locations within 15 minutes. For this, you can create a stream application as follows:

1. Start creating a new stream application and add the QL version. You can name it `DelayDetectionApp` For instructions, see [Creating a Stream Application](create-stream-app.md).
    ```
    @App:name("DelayDetectionApp")
    @App:qlVersion("2")
    ```
    
2. To receive information about the location of taxis, define an input stream as follows.
    ```
    CREATE STREAM LocationStream (taxiID string, driverID string, latitude double, longitude double);
    ```

3. To publish delay notification as a message, define an output stream as follows.

    ```
	CREATE SINK AlertStream WITH (type='http', publisher.url='http://headoffice:8080/endpoint', map.type = 'json') (taxiID string, driverID string, message string);

    ```

    The output directed to this stream is published via a sink of the `http` type. For more information about publishing data via sinks, see the [Publishing Data](publishing-data.md).

4. To specify the pattern to be used to detect the delays, add the `from` clause as follows.

    ```
    from not LocationStream[latitude == 44.0096 and longitude == 81.2735] for 15 minutes or not LocationStream[latitude == 43.0096 and longitude == 81.2737] for 15 minutes
    ```
            
	- The `not` keyword is added to indicate that the SI should look for instances where an event has *not* occurred when the given conditions are met.
        
	- Two conditions are given. The alert is generated when either of the two conditions has not occurred. To indicate this, the `or` keyword is used between the two conditions.
        
	- The given conditions indicate that the taxi should have reached either the `latitude == 44.0096 and longitude == 81.2735` location or the `latitude == 43.0096 and longitude == 81.2737` location. Either of the locations should be reached within 15 minutes. Therefore, each location is specified as a separate condition and a time window of 15 minutes is applied to each condition in a sliding manner. For more information about time windows, see the [Stream Query Guide - Calculate and store clock time-based aggregate values](summarizing-data/#calculate-and-store-clock-time-based-aggregate-values).

5. To derive the information relating to the delay to be published as the output, add the `select` clause as follows.
    ```
    select LocationStream.taxiID, LocationStream.driverID, 'Unexpected Delay' as message
    ```
    
   The alert message is a standard message that is assigned as a static value to the `message` attribute.

6. To insert the results into the `AlertStream` so that the message about the delay can be published, add the `insert into` clause as follows.
    ```
    insert into AlertStream;
    ```
    
The completed stream application is as follows.

```
@App:name("DelayDetectionApp")
@App:qlVersion("2")

CREATE STREAM LocationStream (taxiID string, driverID string, latitude double, longitude double);

CREATE SINK AlertStream WITH (type='http', publisher.url='http://headoffice:8080/endpoint', map.type = 'json') (taxiID string, driverID string, message string);

insert into AlertStream
select LocationStream.taxiID, LocationStream.driverID, 'Unexpected Delay' as message
from not LocationStream[latitude == 44.0096 and longitude == 81.2735] for 15 minutes or not LocationStream[latitude == 43.0096 and longitude == 81.2737] for 15 minutes;
```

For the complete list of methods in which you can apply patterns to detect non occuring events, see [Stream Query Guide - Detecting Non-Occurring Events](../reference/query-guide#detecting-non-occurring-events).

## Correlating events to find a trend(sequence)

This section explains how you can use sequences to detect trends in events that arrive in a specific order. There are two types of sequences as follows:

- Counting Sequences: These count the number of instances that match the given sequence condition.
- Logical Sequences: These identify logical relationships between events.

### Count and match multiple events for a given trend

Counting and matching multiple events over a given period is done via sequences when you need to identify trends in events that occur in a specific order. To understand how this is done, consider a scenario where the temperature is read from a sensor and you need to identify the peaks in temperature. If an event (i.e., a single reading) is a peak, it should report a temperaature greater than that reported by the event that occured immediately before it as well as the event that occurred immediately after it. Therefore, to identify the peaks, follow the procedure below:

1. Start creating a new stream application and add the QL version. You can name it `TemperaturePeaksApp` For instructions, see [Creating a Stream Application](create-stream-app.md).

    ```
    @App:name("TemperaturePeaksApp")
    @App:qlVersion("2")
    ```
    
2. To capture the temperature readings, define an input stream as follows.

    ```
    CREATE STREAM TempStream(deviceID long, roomNo int, temp double);
    ```

3. To report the peaks once they are identified, define an output stream as follows.

    ```
	CREATE SINK PeakTempStream WITH (type='stream', stream.list='TemperaturePeak]:') (initialTemp double, peakTemp double);
    ```

   The output directed to this stream is published via a sink of the `stream` type. For more information about publishing data via sinks, see the [Publishing Data](publishing-data.md).

4. To specify how to identify the peaks, add a `from` clause as follows.

    ```
    from every e1=TempStream, e2=TempStream[e1.temp <= temp]+, e3=TempStream[e2[last].temp > temp]
    ```
    
    :::note
        Note the following about the `from` clause:<br/>
        
        - `every` indicates that all the events in the `TempStream` must be checked for the given conditions.<br/>
        
        - Here, `e2` is the reference for the event identified as the peak temperature. The `e2=TempStream[e1.temp <= temp]+` condition specifies that to be identified as an event reporting a peak temperature, an event should have one or more preceding events that reports a lower or an equal temperature.<br/>
        
        - The `e3=TempStream[e2[last].temp > temp]` condition specifies a condition for `e3` which is the event that follows `e2`. It indicates that `e2`, the peak temperature event should be the last event before `e3`, and that the temperature reported by `e2` must be greater than the temperature reported by `e3`.
    :::  

5. To specify how to derive the values for the attributes in the `PeakTempStream` output stream are derived, add a `select` clause as follows.

    ```
    select e1.temp as initialTemp, e2[last].temp as peakTemp
    ```
    
    Here, the temperature reported by `e2` event is selected to be output as `peakTemp` because it is greater than the temperatures reported by events occuring before and after `e2`. The temperature reported by the event immediately before `e2` is selected as `initialTemp`.

6. To insert the output generated into the `PeakTempStream` output stream, add an `insert into` clause as follows.
    ```
    insert into PeakTempStream;
    ```

The completed stream application is as follows.

```
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
    ```
    @App:name("RoomStateApp")
    @App:qlVersion("2")
    ```
    
2. You need three input streams to capture information about the state of the regulator, the temperature, and humidity.

    1. Define the input stream that captures the state of the regulator as follows.
        ```
        CREATE STREAM RegulatorStream (deviceID long, isOn bool);
        ```
    
    2. Define the input stream that captures the temperature as follows.
        ```
        CREATE STREAM TempStream (deviceID long, temp double);
        ```
    
    3. Define the input stream that captures the humidity as follows.
		```
		CREATE STREAM HumidStream (deviceID long, humid double);
 		```

       The output directed to this stream is published via a sink of the `stream` type. For more information about publishing data via sinks, see the [Publishing Data guide](publishing-data.md).
       

3. Now let's define an output stream to publish the temperature and humidity.

	```
	CREATE SINK StateNotificationStream WITH (type='c8streams', stream.list='RoomState]:') (temp double, humid double);
	```

4. To apply the logical sequence to derive the output, add the `from` clause as follows.
    ```
    from every e1=RegulatorStream, e2=TempStream and e3=HumidStream
    ```
    
    Here, the unique references `e1`, `e2`, and `e3` are assigned to the first, second, and thid events respectively. `e1` must arrive at the `RegulatorStream` stream, `e2` must arrive at the `TempStream` stream, and `e3` must arrive at the `HumidStream` stream in that order. The output event is generated only after all three of these input events have arrived.

5. To derive values for the attributes of the `StateNotificationStream` output stream, add a `select` clause as follows.
    ```
    select e2.temp, e3.humid
    ```
    
    To generate the output event, the value for the `temp` attribute must be taken from the `e2` (second) event, and the value for the `humid` attribute must be taken from the `e3` (third) event. 

6. To direct the output to the `StateNotificationStream` output stream so that it can be logged, add an `insert into` clause as follows.
    ```
    insert into StateNotificationStream;
    ```
    
7. The completed stream application is as follows.

    ```
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

## Correlating two streams of data and unify

For a detailed explanation, see [Enrich data by connecting with another stream of data](enriching-data.md#enrich-data-by-connecting-with-another-stream-of-data)

## Correlate a stream and a static datasource to enrich

For a detailed explanation, see [Enrich data by connecting with a data store](enriching-data.md#enrich-data-by-connecting-with-a-data-store)
