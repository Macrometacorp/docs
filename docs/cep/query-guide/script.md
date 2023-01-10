---
sidebar_position: 80
title: Script Functions
---

Scripts allow you to write functions in JavaScript and execute them within queries for a stream. Functions defined with scripts can be accessed in queries similar to any other inbuilt function. You can use function definitions to define these scripts.

Function parameters are passed into the function logic as an `Object[]` and with the name `data`.

## Purpose

Scripts allow you to define a function operation that is not provided in stream worker built-in functions. You do not need to write an extension to define the function logic.

## Syntax

The syntax for a script definition is as follows.

```js
define function <function name>[<language name>] return <return type> {
    <operation of the function>
};
```

## Parameters

The following parameters are configured when defining a script.

| Parameter     | Description |
| ------------- |-------------|
| `function name`| 	The name of the function. By convention, `camelCase` is used for the function name.|
|`language name`| The name of the programming language used to define the script. Currently, Macrometa supports `javascript`.|
| `return type`| The attribute type of the function’s return. This can be `int`, `long`, `float`, `double`, `string`, `bool`, or `object`. Here the function implementer should be responsible for returning the output attribute on the defined return type for proper functionality.
|`operation of the function`| Here, the execution logic of the function is added. This logic should be written in the language specified under the `language name`, and it should return the output in the data type specified in the `return type` parameter.

## Example

This query performs concatenation using JavaScript and returns the output as a string.

```sql
CREATE function concatFn[javascript] return string {
    var str1 = data[0];
    var str2 = data[1];
    var str3 = data[2];
    var response = str1 + str2 + str3;
    return response;
};

CREATE STREAM TempStream(deviceID long, roomNo int, temp double);
CREATE STREAM DeviceTempStream (id string, temp double);

insert into DeviceTempStream
select concatFn(roomNo,'-',deviceID) as id, temp
from TempStream;
```
