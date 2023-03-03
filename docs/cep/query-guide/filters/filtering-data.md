---
sidebar_position: 6
---

# Filtering Data

When you receive input data, it may consist of data that is not required to generate the required output, null values for certain attributes, etc.  You can filter data to refine the received data. 

## Filtering data based on Conditions

To understand the different ways you can filter the specific data you need to transform and enrich in order to generate the required output, follow the procedures below:

### Filtering based on exact match of attribute

 
1. Start creating a new stream worker.

2. Enter a name for the stream worker via the `@App:name` annotation. In this example, let's name it `TemperatureApp`.

3. Define an input stream to specify the schema based on which events are selected.

    ```sql
    CREATE STREAM InputTempStream (deviceID long, roomNo string, temp double);
    ```

4. Define an output stream `Room2233Stream` to emit the result

    ```sql
	  CREATE SINK Room2233Stream WITH (type='stream', stream='Room2233Stream', map.type='json') (deviceID long, roomNo string, temp double);
    ```

5. Add a query to generate filtered temperature readings as follows. For this example, let's assume that you want to filter only temperature readings for a specific room number (e.g., room no `2233`).

    1. Add the `from` clause and enter `InputTempStream` as the input stream from which the input data. However, because you only need to extract readings for room no `2233`, include a filter in the `from` clause as shown below:

        ```sql
        FROM InputTempStream [roomNo=='2233']
        ```

    2. Add the `select` clause with `*` to indicate that all the attributes should be selected without any changes.
        ```sql
        SELECT *
        FROM InputTempStream [roomNo=='2233']
        ```

    3. Add the `insert into` clause and direct the output to a stream named `Room2233Stream`.

        ```sql
        INSERT INTO Room2233Stream
        SELECT *
        FROM InputTempStream [roomNo=='2233']
        ```

        :::tip
        As a best practice, name your queries using the `@info` annotation. In this example, you can name the query `Filtering` as follows.
        :::

        ```sql
        @info(name = 'Get temperature for roomNo: 2233')
        INSERT INTO Room2233Stream
        SELECT *
        FROM InputTempStream [roomNo=='2233']
        ```

6. The saved stream worker is as follows:

    ```sql
    @App:name("TemperatureApp")
    @App:description("This stream worker receives an object with properties 'deviceID', 'roomNo', and 'temp' in InputTempStream, if the roomNo is '2233', the query will send the object to Room2233Stream")
    @App:qlVersion("2")
    
    CREATE STREAM InputTempStream (deviceID long, roomNo string, temp double);
    
    CREATE SINK Room2233Stream WITH (type='stream', stream='Room2233Stream', map.type='json') (deviceID long, roomNo string, temp double);
    
    @info(name = 'Get temperature for roomNo: 2233')
    INSERT INTO Room2233Stream
    SELECT *
    FROM InputTempStream [roomNo=='2233'];
    ```

### Filtering based on regex pattern

You can filter events by providing a condition where only events that match a specific Regex pattern are taken for further processing.

For this purpose, you can use the `TemperatureApp` stream worker that you created in the previous example. However, instead of filtering the readings for a specific room no, you can filter the readings for many rooms of which the room number matches a specific regex pattern.

Assume that you want to filter the temperature readings for a specific rage of rooms located in the Southern wing and used for purpose B. Also assume that this can be derived from the room number because the first three characters of the room no represent the wing, and the eighth character represents the purpose. e.g., in room no `SOU5438B765`, the first three characters `SOU` represent the Southern wing, and the eighth character `B` represents purpose B.
    
To filter events as described, follow the procedure below.
    
1. Open the `TemperatureApp` stream worker.
2. Create a new query named `FilteredRoomRange` as follows:

    1. Add `select` statement to project the fields:

        ```sql
        SELECT deviceID, roomNo, temp
        ```
    
    1. Add a `from` clause as follows to get the required events from the `InputTempStream` stream.

        ```sql
        FROM InputTempStream[regex:matches('SOU(.*)B(.*)', roomNo)];
        ```

    1. Add the `insert to` clause as follows to insert the results into a stream named `FilteredResultsStream`.

        ```sql
        INSERT INTO FilteredResultsStream
        ```

        The completed query is as follows.

        ```sql
        @info(name = 'Southern wing room range filter')
        INSERT INTO FilteredResultsStream
        SELECT deviceID, roomNo, temp
        FROM InputTempStream[regex:matches('SOU(.*)B(.*)', roomNo)];
        ```

3. Save the stream worker.

1. The completed stream worker looks as follows.

    ```sql
    @App:name("TemperatureApp1")
    @App:description("Streams Room2233Stream and FilteredResultsStream are waiting for results from queries 'Get temperature for roomNo: 2233' and 'Southern wing room range filter'")
    @App:qlVersion("2")
    
    /*
    
    Part-1: This stream worker receives an object with properties 'deviceID', 'roomNo', and 'temp' in InputTempStream. If the roomNo is '2233', the query will send the object to Room2233Stream 
    
    Part 2: The FilteredRoomRange query will filter values using a regular expression. In this case, any roomNo starting with 'SOU' with some random characters plus a 'B' plus some random character will match the pattern, and the object that matches that expression will be sent to 'FilteredResultsStream'
    
    */
    
    CREATE STREAM InputTempStream (deviceID long, roomNo string, temp double);
    
    CREATE SINK Room2233Stream WITH (type='stream', stream='Room2233Stream', map.type='json') (deviceID long, roomNo string, temp double);
    
    CREATE SINK FilteredResultsStream WITH (type='stream', stream='FilteredResultsStream', map.type='json') (deviceID long, roomNo string, temp double);
    
    @info(name = 'Get temperature for roomNo: 2233')
    INSERT INTO Room2233Stream
    SELECT *
    FROM InputTempStream [roomNo=='2233'];
    
    @info(name = 'Southern wing room range filter')
    INSERT INTO FilteredResultsStream
    SELECT deviceID, roomNo, temp
    FROM InputTempStream[regex:matches('SOU(.*)B(.*)', roomNo)];
    ```
    
### Filtering based on multiple criteria

For this purpose, you can use the `TemperatureApp` stream worker that you created in the example under **Filtering based on exact match of attribute** section. However, instead of filtering only readings for room No `2233`, assume that you need to filter the readings for a range of rooms (e.g., rooms 100-210) where the temperature is greater than 40. For this, you can update the filter as follows.

```sql
@App:name("TemperatureApp2")
@App:description("This stream worker receives a object with properties 'deviceID', 'roomNo', and 'temp' in InputTempStream, If roomNo is 2233, and temperature is more than 20 and less than 50 degrees, and where deviceID is more than 1 and less than 9, send the object to the stream")
@App:qlVersion("2")

CREATE STREAM InputTempStream (deviceID long, roomNo string, temp double);
    
CREATE SINK Room2233Stream WITH (type='stream', stream='Room2233Stream', map.type='json') (deviceID long, roomNo string, temp double);
    
@info(name = 'Get temperature for roomNo: 2233')
INSERT INTO Room2233Stream
SELECT *
FROM InputTempStream [(temp > 20 AND temp < 50) AND (deviceID > 1 AND deviceID < 9) AND roomNo == "2233"];
```
    
Here, the `AND` logical expression is used to indicate that both the filter conditions provided need to be considered.
    

## Modifying, removing and replacing attributes

The input data may include attributes that are not required in order to generate the required output, attributes with values that need to be updated or replaced before further processing. 
 
Assume that in the previous example, you do not need the device ID for further processing, and you need to remove some unnecessary white spaces from the `roomNo` before sending the input data for further processing. To do this, follow the procedure below:

1. Open the `TemperatureApp` stream worker that you previously created in the [Filtering data based on conditions](##filtering-data-based-on-conditions) section and start adding a new query. You can name it as `CleaningData` as shown below.

    ```sql
    @info(name = 'CleaningData')
    ```
   
2. Add the `from` clause and enter `FilteredResultsStream` as the input stream from which the input data is taken.

    ```sql
    FROM FilteredResultsStream
    ```

3. Let's create the `select` statement as follows.

    1. To select only the `roomNo` and `temp` attributes for further processing and remove the `deviceID` attribute, add them as follows.

        ```sql
        SELECT str:trim(roomNo) AS roomNo, temp
        ```

    2. To remove the unnecessary white spaces from the room number, add the `trim()` function as shown below.

        ```sql
        str:trim(roomNo) AS roomNo
        ```
        
    3. Now the completed `select` statement is as follows.

        ```sql
        SELECT str:trim(roomNo) AS roomNo, temp
        ```
   
4. Insert the results into an output stream as follows.

    ```sql
    INSERT INTO CleansedDataStream
    ```
   
5. The completed query is as follows:

    ```sql
    @info(name = 'CleaningData')
    INSERT INTO CleansedDataStream
    SELECT str:trim(roomNo) AS roomNo, temp
    FROM FilteredResultsStream;
    ```

6. The complete stream worker looks as follows

    ```sql
    @App:name("TemperatureApp3")
    @App:description("")
    @App:qlVersion("2")
    
    /*
    
    Part 1: The  'Southern wing room range filter' query will filter values using a regular expression. In this case, any roomNo starting with 'SOU' with some random characters plus a 'B' plus some random character will match the pattern, and the object that matches that expression will be sent to 'FilteredResultsStream'
    
    Part 2: The query 'CleaningData' eliminates the deviceID property and any unnecessary white spaces
    
    */
    
    CREATE STREAM InputTempStream (deviceID long, roomNo string, temp double);
    
    CREATE SINK FilteredResultsStream WITH (type='stream', stream='FilteredResultsStream', map.type='json') (deviceID long, roomNo string, temp double);
    
    CREATE SINK CleansedDataStream WITH (type='stream', stream='CleansedDataStream', map.type='json') (roomNo string, temp double);
    
    @info(name = 'Southern wing room range filter')
    INSERT INTO FilteredResultsStream
    SELECT deviceID, roomNo, temp
    FROM InputTempStream[regex:matches('SOU(.*)B(.*)', roomNo)];
    
    @info(name = 'CleaningData')
    INSERT INTO CleansedDataStream
    SELECT str:trim(roomNo) AS roomNo, temp
    FROM FilteredResultsStream;
    ```

## Handling attributes with `null` values

To understand this section, you can reuse the `TemperatureApp` stream worker that you created in the [Filtering data based on conditions](##filtering-data-based-on-conditions).

Assume that some events arrive with null values for the `roomNo` attribute, and you want to assign the value `unknown` in such scenarios.

To do this, follow the procedure below:

1. Start adding a new query to the `TemperatureApp` stream worker. You can name it `AddingMissingValues` as follows.

    ```sql
    @info(name = 'AddingMissingValues')
    ```
    
2. Add the `from` clause and enter `FilteredResultsStream` as the input stream from which the input data is taken.

    ```sql
    FROM FilteredResultsStream
    ```

>* Here, we are using the inferred output stream of the previous query as the input stream for this query. As a 
        result, the changes made via this query are applied to the filtered data.
    
3. Add the `select` clause. To assign `unknown` as the value for the `roomNo` attribute when it has a null value, you 
   need to use the `ifThenElse` function as shown below.

    ```sql
    ifThenElse(roomNo is null, "UNKNOWN", str:trim(roomNo)) as roomNo
    ```

    Select the `deviceID` and `temp` attributes can be selected without any changes. The query updated with the `select` clause now looks as follows.

    ```sql
    SELECT deviceID, ifThenElse(roomNo is null, "UNKNOWN", str:trim(roomNo)) AS roomNo, temp
    ```
   
 4. Insert the results into an output stream as follows. `insert into CleansedDataStream`. The completed query now looks as follows.
    
    ```sql
    @info(name = 'AddingMissingValues')
    INSERT INTO CleansedDataStream
    SELECT ifThenElse(roomNo is null, "UNKNOWN", str:trim(roomNo)) as roomNo, temp
    FROM FilteredResultsStream;
    ```
6. The complete stream worker looks as follows.

    ```sql
    @App:name("TemperatureApp3")
    @App:description("")
    @App:qlVersion("2")
    
    /*
    
    Part 1: The  'Southern wing room range filter' query will filter values using a regular expression. In this case, any roomNo starting with 'SOU' with some random characters plus a 'B' plus some random character will match the pattern, and the object that matches that expression will be sent to 'FilteredResultsStream'
    
    Part 2: The query 'CleaningData' eliminates the deviceID property and any unnecessary white spaces
    
    */
    
    CREATE STREAM InputTempStream (deviceID long, roomNo string, temp double);
    
    CREATE SINK FilteredResultsStream WITH (type='stream', stream='FilteredResultsStream', map.type='json') (deviceID long, roomNo string, temp double);
    
    CREATE SINK CleansedDataStream WITH (type='stream', stream='CleansedDataStream', map.type='json') (roomNo string, temp double);
    
    @info(name = 'Southern wing room range filter')
    INSERT INTO FilteredResultsStream
    SELECT deviceID, roomNo, temp
    FROM InputTempStream[regex:matches('SOU(.*)B(.*)', roomNo)];
    
    @info(name = 'AddingMissingValues')
    INSERT INTO CleansedDataStream
    SELECT ifThenElse(roomNo is null, "UNKNOWN", str:trim(roomNo)) as roomNo, temp
    FROM FilteredResultsStream;
    ```
    
 5. Save the stream worker.
