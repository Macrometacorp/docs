---
sidebar_position: 80
title: Script
---

Scripts allow you to write functions in other programming languages and execute them within Stream queries. Functions defined via scripts can be accessed in queries similar to any other inbuilt function. **Function definitions** can be used to define these scripts.

Function parameters are passed into the function logic as `Object[]` and with the name `data` .

**Purpose**

Scripts allow you to define a function operation that is not provided in Stream core or its extension. It is not required to write an extension to define the function logic.

**Syntax**

The syntax for a Script definition is as follows.

```
define function <function name>[<language name>] return <return type> {
    <operation of the function>
};
```

The following parameters are configured when defining a script.

| Parameter     | Description |
| ------------- |-------------|
| `function name`| 	The name of the function (`camelCase` is used for the function name) as a convention.|
|`language name`| The name of the programming language used to define the script, such as `javascript`, `r` and `scala`.|
| `return type`| The attribute type of the function’s return. This can be `int`, `long`, `float`, `double`, `string`, `bool` or `object`. Here the function implementer should be responsible for returning the output attribute on the defined return type for proper functionality.
|`operation of the function`| Here, the execution logic of the function is added. This logic should be written in the language specified under the `language name`, and it should return the output in the data type specified via the `return type` parameter.

**Examples**

This query performs concatenation using JavaScript, and returns the output as a string.

```
define function concatFn[javascript] return string {
    var str1 = data[0];
    var str2 = data[1];
    var str3 = data[2];
    var responce = str1 + str2 + str3;
    return responce;
};

CREATE STREAM TempStream(deviceID long, roomNo int, temp double);

insert into DeviceTempStream
select concatFn(roomNo,'-',deviceID) as id, temp
from TempStream;
```
