---
sidebar_position: 4
---

# Transforming Data

## Introduction

The stream processor allows you to perform a wide range of transformations to the input data received. The transformations are carried out via operators that are defined inline within the stream application.

## Transform data using Operators

The operators that you can configure inline within Stream applications in order to carry out data transformations are listed in the [Stream Processor Query Guide - Inbuild Aggregation Functions section](../reference/query-guide.md).

To show how an inline operators are configured, let's consider an example where readings from a sensor that indicates 
the temperature of a room every second are transformed to indicate the average temperature and the average humidity as at each second.

1. Open the GUI. Click the **Stream Apps** tab.
1. Click **New** to define a new stream application.
1. Type a **Name**. For example, `TemperatureApp`.
1. Type a **Description**.
1. Add the following sample stream application.
1. Let's define the input stream to define the schema based on which data is selected to the streaming integration flow.

    In this example, let's assume that each event indicates the device ID, the room ID, and the temperature. Therefore, let's define an input stream as follows:

    ```sql
	CREATE STREAM TempStream (deviceID long, roomNo int, temp double);
    ```
       
    !!!info
        For more information about defining input streams to receive events, see the [Consuming Data page](consuming-data.md).
           
          
4. To do the required transformation, let's add the query as follows:

    1. Add a `select` to select the fields required to calculate the average temperature. Apply the `avg()` to the `temp` attribute, and then specify `avgTemp` as the name with which the result should be output. 
    
        ```sql
        select roomNo, avg(temp) as avgTemp
        ```

    1. Add the `from` clause with the name of the input stream to indicate that the events to be processed are taken from the input stream.

        ```sql
        from TempStream
        ```

    1. To group by a specific attribute (by the `roomNo` attribute in this example), specify it via the `group by` clause as shown below.

        ```sql
        insert into OutputStream
        select roomNo, avg(temp) as avgTemp
        from TempStream
        group by roomNo;
        ```

    1. Add the `insert into` clause with the name of the output stream to indicate that the processed events are directed to that stream.

        ```sql
        insert into OutputStream
        from TempStream;
        ```
      
    1. To group by a specific attribute (by the `roomNo` attribute in this example), specify it via the `group by` clause as shown below.

        ```sql
        insert into OutputStream
        select roomNo, deviceID, avg(temp) as avgTemp
        from TempStream
        group by roomNo;
        ```

1. Save the stream application. The completed stream application is as follows.

    ```sql
    @App:name("TemperatureApp")
    @App:description("Calculate an average temperature of the room")
    @App:qlVersion("2")

	CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

	CREATE STREAM OutputStream WITH (type='stream', stream='OutputStream', map.type='json') (roomNo int, avgTemp double);

    insert into OutputStream
    select roomNo, avg(temp) as avgTemp
    from TempStream
    group by roomNo;
    ```

## Transform data using Plugins

The stream processor offers a variety of options to carry out data transformations via in-built plugins. The following table describes the complete list of plugins that provide data transformation functionality.

|Plugin|Description|
|--- |--- |
| math   |Transforms data by performing mathematical operations.|
| unitconversion|Performs unit conversions ranging from length, weight, volume, etc.|
| string |Performs string manipulations.|
| time   |Performs time-based transformations such as converting time zones.|
| map    |Converts events into maps and performs transformations such as concatenating and removing attributes.|
| reorder| Rearranges the order of the incoming event flow.|
| json   |Performs manipulations to JSON strings.|

## Transforming message formats

These transformations involve converting the message format to a different format after a the message is received, or 
converting the format before publishing the message. This is managed via mapping. For detailed instructions to convert message formats via mapping, see the following guides:
 
 - [Consuming Messages - Supported Message Formats](consuming-data.md#supported-message-formats)
 - [Publishing Messages - Supported Message Formats](publishing-data.md#supported-message-formats)
