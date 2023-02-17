---
sidebar_position: 45
title: Custom Script Functions
---

Scripts enable you to write functions in JavaScript and execute them within queries for a stream. A query can access these custom functions the same way as pre-built functions. Use function definitions to define these scripts.

Function parameters are passed into the function logic as an `Object[]` with the name `data`.

## Purpose

Scripts enable you to define a function that is not built into stream workers. You do not need to write an extension to define the function logic.

## Syntax

The syntax for a script definition is:

```js
define function <function name>[<javascript>] return <return type> {
    <operation of the function>
};
```

The defined function can be used in the queries similar to built-in functions:

```js
<function name>( (<function parameter>(, <function parameter>)*)? )
```

The custom functions have higher precedence than built-in functions.

## Parameters

The following parameters are configured when defining a script.

| Parameter     | Description |
| ------------- |-------------|
| function name | 	The name of the function. By convention, `camelCase` is used for the function name.|
| language name | The name of the programming language used to define the script. Macrometa supports `javascript`.|
| return type | The attribute type of the function’s return. This can be `int`, `long`, `float`, `double`, `string`, `bool`, or `object`. Here the function implementer should be responsible for returning the output attribute on the defined return type for proper functionality.
| operation of the function| The running logic of the function. This logic should be written in the language specified under the `language name`, and it should return the output in the data type specified in the `return type` parameter.

## Example 1

This stream worker uses a function to perform concatenation using JavaScript and return the output as a string.

```sql
@App:name("TemperatureProcessing")
@App:description("Calculate an average temperature of the room.")
@App:qlVersion("2")

-- Define the source stream.
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

-- Define the sink stream to receive results of the function.
CREATE SINK DeviceTempStream WITH (type= 'stream', stream='DeviceTempStream', map.type='json') (id string, temp double);

-- Define the function that concatenates the room number and device ID.
CREATE FUNCTION concatFn[javascript] return string {
        var str1 = data[0];
        var str2 = data[1];
        var str3 = data[2];
        var response = str1 + str2 + str3;
        return response;
};

-- Query to apply the custom function to the relevant attributes of the input stream definition.
INSERT INTO DeviceTempStream
SELECT concatFn(roomNo,'-',deviceID) AS id, temp
FROM TempStream;
```

## Example 2

Parsing complex JSON data is a good use case for writing custom functions. Consider an example where nested JSON data is received over an input stream. Defining a message schema while defining a stream can be cumbersome or error-prone, so creating a custom function would allow fine-grained control over how the message is parsed.

This example demonstrates how complex data can be parsed using a custom JavaScript function.

### Input

`CompanyXInputStream` receives employee data in JSON format as shown below.

```json
{
    "seqNo": "1200001",
    "name": "Raleigh McGilvra",
    "address": {
    "permanent": {
        "street": "236  Pratt Avenue",
        "city": "Orchards",
        "state": "Washington",
        "country": "USA",
        "zip": "98662"
    },
    "work": {
        "street": "1746  Rosebud Avenue",
        "city": "Little Rock",
        "state": "Arkansas",
        "country": "USA",
        "zip": "72212"
    }
    }
}
```

### Custom Function

Write a JavaScript function to convert `address.work` into a well-formatted string.

```js
define function getWorkAddress[javascript] return string {
    work_address = JSON.parse(data[0]).work

    // Concatenate all the address fields as a single string
    formatted_address =  work_address.street + ", " + work_address.city + ", " + work_address.state + ", " + work_address.country + ", " + work_address.zip;
    return formatted_address
};
```

### Stream Worker

This stream worker defines the function, then a query uses it to process information from the source and send it to the sink.

```sql
@App:name("ProcessEmployeeData")
@App:qlVersion("2")

-- The source is a Macrometa collection with stream enabled, receiving JSON messages.
CREATE SOURCE CompanyXInputStream WITH (type = 'database', collection = "CompanyXInputStream", collection.type="doc" , replication.type="global", map.type='json') (seqNo string, name string, address string);

--The sink is a stream, mapping messages to JSON.
CREATE SINK CompanyXProfessionalInfo WITH (type = 'stream', stream = "CompanyXProfessionalInfo", replication.type="local", map.type='json') (name string, workAddress string);

-- Define a JavaScript function to process `address` field
CREATE FUNCTION getWorkAddress[javascript] return string {
    var work_address = JSON.parse(data[0]).work
    var formatted_address =  work_address.street + ", " + work_address.city + ", " + work_address.state + ", " + work_address.country + ", " + work_address.zip;
    return formatted_address
};

-- Data processing query to the stream to transform data using the `getWorkAddress` function.
@info(name='Query')
INSERT INTO CompanyXProfessionalInfo
SELECT name, getWorkAddress(address) AS workAddress
FROM CompanyXInputStream;
```
