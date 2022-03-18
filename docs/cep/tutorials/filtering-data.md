---
sidebar_position: 6
---

# Filtering Data

## Introduction

When you receive input data, it may consist of data that is not required to generate the required output, null values for certain attributes, etc.  You can filter data to refine the received data. 

## Filtering data based on Conditions

To understand the different ways you can filter the specific data you need to transform and enrich in order to generate the required output, follow the procedures below:
    

### Filtering based on exact match of attribute
 
1. Start creating a new stream application. For more information, see [Creating a Stream Application](./create-stream-app.md).

1. Enter a name for the stream application via the `@App:name` annotation. In this example, let's name it `TemperatureApp`.

1. Define an input stream to specify the schema based on which events are selected.

    ```
    CREATE STREAM `InputTempStream` (deviceID long, roomNo string, temp double);
    ```

    :::info
        For more information about defining input streams to receive events, see the [Consuming Data](./consuming-data.md).
    :::
1. Define an output stream `Room2233AnalysisStream` to emit the result

    ```
	CREATE STREAM Room2233AnalysisStream WITH (type='stream', stream='Room2233AnalysisStream', map.type='json') (deviceID long, roomNo string, temp double);
    ```

1. Add a query to generate filtered temperature readings as follows. For this example, let's assume that you want to filter only temperature readings for a specific room number (e.g., room no `2233`).

    1. Add the `from` clause and enter `InputTempStream` as the input stream from which the input data. However, because you only need to extract readings for room no `2233`, include a filter in the `from` clause as shown below:

        ```
        from InputTempStream [roomNo=='2233']
        ```

    2. Add the `select` clause with `*` to indicate that all the attributes should be selected without any changes.
        ```
        select *
        from InputTempStream [roomNo=='2233']
        ```

    3. Add the `insert into` clause and direct the output to a stream named `Room2233AnalysisStream`.

        ```
        insert into Room2233AnalysisStream
        select *
        from InputTempStream [roomNo=='2233']
        ```

        :::tip
            As a best practice, name your queries using the `@info` annotation. In this example, you can name the query `Filtering` as follows.
        :::
        ```
        @info(name = 'Filtering2233')
        insert into Room2233AnalysisStream
        select *
        from InputTempStream [roomNo=='2233']
        ```

1. The saved stream application is as follows:

    ```
    @App:name("TemperatureApp")
    @App:description("Description of the plan")
    @App:qlVersion("2")

    CREATE STREAM InputTempStream (deviceID long, roomNo string, temp double);

	CREATE STREAM Room2233AnalysisStream WITH (type='stream', stream='Room2233AnalysisStream', map.type='json') (deviceID long, roomNo string, temp double);

    @info(name = 'Filtering2233')
    select *
    from InputTempStream [roomNo=='2233']
    insert into Room2233AnalysisStream
    ```
        
### Filtering based on regex pattern
 
You can filter events by providing a condition where only events that match a specific Regex pattern are taken for further processing.
 
For this purpose, you can use the `TemperatureApp` stream application that you created in the previous example. However, instead of filtering the readings for a specific room no, you can filter the readings for many rooms of which the room number matches a specific regex pattern.
     
Assume that you want to filter the temperature readings for a specific rage of rooms located in the Southern wing and used for purpose B. Also assume that this can be derived from the room number because the first three characters of the room no represent the wing, and the eighth character represents the purpose. e.g., in room no `SOU5438B765`, the first three characters `SOU` represent the Southern wing, and the eighth character `B` represents purpose B.
    
To filter events as described, follow the procedure below.
    
1. Open the `TemperatureApp` stream application.
2. Create a new query named `FilteredRoomRange` as follows:

    1. Add `select` statement to project the fields:

        ```
        select deviceID, roomNo, temp
        ```
    
    1. Add a `from` clause as follows to get the required events from the `InputTempStream` stream.

        ```
        from InputTempStream[regex:find('SOU*B*', roomNo)]
        ```

    1. Add the `insert to` clause as follows to insert the results into a stream named `FilteredResultsStream`.

        ```
        insert into FilteredResultsStream
        ```

        The completed query is as follows.

        ```
        @info(name = 'FilteredRoomRange')
        insert into FilteredResultsStream
        select deviceID, roomNo, temp
        from InputTempStream[regex:find('SOU*B*', roomNo)];
        ```

3. Save the stream application.

1. The completed stream application looks as follows.

    ```
    @App:name("TemperatureApp1")
    @App:description("Description of the plan")
    @App:qlVersion("2")

    CREATE STREAM InputTempStream (deviceID long, roomNo string, temp double);

	CREATE STREAM Room2233AnalysisStream WITH (type='stream', stream='Room2233AnalysisStream', map.type='json') (deviceID long, roomNo string, temp double);

	CREATE STREAM FilteredResultsStream WITH (type='stream', stream='FilteredResultsStream', map.type='json') (deviceID long, roomNo string, temp double);

    @info(name = 'Filtering2233')
    insert into Room2233AnalysisStream
    select *
    from InputTempStream [roomNo=='2233'];

    @info(name = 'FilteredRoomRange')
    insert into FilteredResultsStream
    select deviceID, roomNo, temp
    from InputTempStream[regex:find('SOU*B*', roomNo)];
    ```
    
### Filtering based on multiple criteria

For this purpose, you can use the `TemperatureApp` stream application that you created in the example under **Filtering based on exact match of attribute** section. However, instead of filtering only readings for room No `2233`, assume that you need to filter the readings for a range of rooms (e.g., rooms 100-210) where the temperature is greater than 40. For this, you can update the filter as follows.

```
[(roomNo >= 100 and roomNo < 210) or temp < 40]
```
    
Here, the `and` logical expression is used to indicate that both the filter conditions provided need to be considered.
    

## Modifying, removing and replacing attributes

The input data may include attributes that are not required in order to generate the required output, attributes with values that need to be updated or replaced before further processing. 
 
Assume that in the previous example, you do not need the device ID for further processing, and you need to remove some unnecessary white spaces from the `roomNo` before sending the input data for further processing. To do this, follow the procedure below:

1. Open the `TemperatureApp` stream application that you previously created in the [Filtering data based on conditions](##filtering-data-based-on-conditions) section and start adding a new query. You can name it as `CleaningData` as shown below.

    ```
    @info(name = 'CleaningData')
    ```
   
2. Add the `from` clause and enter `FilteredResultsStream` as the input stream from which the input data is taken.

    ```
    from FilteredResultsStream
    ```

3. Let's create the `select` statement as follows.

    1. To select only the `roomNo` and `temp` attributes for further processing and remove the `deviceID` attribute, add them as follows.

        ```
        select deviceID, roomNo, temp
        ```

    2. To remove the unnecessary white spaces from the room number, add the `trim()` function as shown below.

        ```
        str:trim(roomNo) as roomNo
        ```
        
    3. Now the completed `select` statement is as follows.

        ```
        select str:trim(roomNo) as roomNo, temp
        ```
   
4. Insert the results into an output stream as follows.

    ```
    insert into CleansedDataStream
    ```
   
5. The completed query is as follows:

    ```
    @info(name = 'CleaningData')
    insert into CleansedDataStream
    select deviceID, str:trim(roomNo) as roomNo, temp
    from FilteredResultsStream;
    ```

Modifying and replacing is also demonstrated in the [Enriching Data](enriching-data.md) and [Transforming Data](transforming-data.md) pages.

## Handling attributes with `null` values

To understand this section, you can reuse the `TemperatureApp` stream application that you created in the [Filtering data based on conditions](##filtering-data-based-on-conditions).

Assume that some events arrive with null values for the `roomNo` attribute, and you want to assign the value `unknown` in such scenarios.

To do this, follow the procedure below:

1. Start adding a new query to the `TemperatureApp` stream application. You can name it `AddingMissingValues` as follows.

    ```
    @info(name = 'AddingMissingValues')
    ```
    
2. Add the `from` clause and enter `FilteredResultsStream` as the input stream from which the input data is taken.

    ```
    from FilteredResultsStream
    ```

    :::note
        Here, we are using the inferred output stream of the previous query as the input stream for this query. As a 
        result, the changes made via this query are applied to the filtered data.
    :::
    
3. Add the `select` clause. To assign `unknown` as the value for the `roomNo` attribute when it has a null value, you 
   need to use the `ifThenElse` function as shown below.

    ```
    ifThenElse(roomNo is null, "UNKNOWN", str:trim(roomNo)) as roomNo
    ```

    Select the `deviceID` and `temp` attributes can be selected without any changes. The query updated with the `select` clause now looks as follows.

    ```
    select deviceID, ifThenElse(roomNo is null, "UNKNOWN", str:trim(roomNo)) as roomNo, temp
    ```
   
 4. Insert the results into an output stream as follows.

    `insert into CleansedDataStream`
    
    The completed query now looks as follows.
    
    ```
    @info(name = 'AddingMissingValues')
    insert into CleansedDataStream
    select deviceID, ifThenElse(roomNo is null, "UNKNOWN", str:trim(roomNo)) as roomNo, temp
    from FilteredResultsStream;
    ```
    
 5. Save the stream application. 
