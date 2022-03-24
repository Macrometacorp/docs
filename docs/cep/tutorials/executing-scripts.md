---
sidebar_position: 10
---

# Executing Scripts

The script provides the ability to write custom functions in other programming languages and execute them within Stream applications. The custom functions using scripts can be defined via the function definitions and accessed in queries similar to any other inbuilt functions.

Scripts help to define custom functions in other programming languages such as javascript. This can eliminate the need for writing extensions to fulfill the functionalities that are not provided in Stream Applications or by its extension.

## Syntax

The syntax for defining the script is as follows.

```js
define function <function name>[<language name>] return <return type> {
    <function logic>
};
```
    
The defined function can be used in the queries similar to inbuilt functions as follows.

```json
<function name>( (<function parameter>(, <function parameter>)*)? )
```
    
Here, the `&lt;function parameter&gt;`'s are passed into the `&lt;function logic&gt;` of the definition as an `Object[]` with the name `data`.

The functions defined via the function definitions have higher precedence compared to inbuilt functions and the functions provided via extensions.

The following parameters are used to configure the function definition:

<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>`&lt;function name&gt;`</td>
<td>The name of the function created. (It is recommended to define a function name in `camelCase`.)</td>
</tr>
<tr class="even">
<td>`&lt;language name&gt;`</td>
<td>Name of the programming language used to define the script, such as `javascript`, `r`, or `scala`</td>
</tr>
<tr class="odd">
<td>`&lt;return type&gt;`</td>
<td>The return type of the function. This can be `int, long, float, double, string, bool` or `object`. Here, the function implementer is responsible for returning the output according on the defined return type to ensure proper functionality.</td>
</tr>
<tr class="even">
<td>`&lt;language name&gt;`</td>
<td>The execution logic that is written in the language specified under the `&lt;language name&gt;`, where it consumes the `&lt;function parameter&gt;`'s through the `data` variable and returns the output in the type specified via the `&lt;return type&gt;` parameter.
</td>
</tr>
</tbody>
</table>

## Transform data using Custom Functions

To write custom function calls, follow the procedure below:

1. Open the GUI. Click on `Stream Apps` tab.

1. Click **New** to start defining a new stream application.

1. Type a **Name** as `TemperatureProcessing` or feel free to chose any other name for the stream application.

1. Type a **Description**.
    
1. In the `TemperatureProcessing` stream application, define a source stream as follows.

    ```sql
    CREATE STREAM TempStream (deviceID long, roomNo int, temp double);
    ```

1. Add sink stream to send results of script function

    ```sql
	CREATE SINK DeviceTempStream WITH (type= 'stream', stream='DeviceTempStream', map.type='json') (id string, temp double);
    ```

1. In this example, you can write a function that can be used to concatenate the room number and device ID as follows.
    
    ```js
    define function concatFn[javascript] return string {
        var str1 = data[0];
        var str2 = data[1];
        var str3 = data[2];
        var responce = str1 + str2 + str3;
        return responce;
    };
    ```

1. Add stream query to apply the script you wrote to the relevant attributes of the input stream definition.

    ```sql
    insert into DeviceTempStream
    select concatFn(roomNo,'-',deviceID) as id, temp
    from TempStream;
    ```
    
1. Save the stream application. The completed stream application is as follows.
    
    ```sql
    @App:name("TemperatureProcessing")
    @App:description("Calculate an average temperature of the room")
    @App:qlVersion("2")
    
    CREATE STREAM TempStream (deviceID long, roomNo int, temp double);
    
	CREATE SINK DeviceTempStream WITH (type= 'stream', stream='DeviceTempStream', map.type='json') (id string, temp double);

    CREATE FUNCTION concatFn[javascript] return string {
            var str1 = data[0];
            var str2 = data[1];
            var str3 = data[2];
            var responce = str1 + str2 + str3;
            return responce;
    };
    
    insert into DeviceTempStream
    select concatFn(roomNo,'-',deviceID) as id, temp
    from TempStream;
    ```
   
## Transform complex json data using Custom Functions

Parsing complex JSON data would be good application to write custom functions. Consider that nested json data is received over an input stream. Defining a message schema while defining a stream as explained in [Consuming Data - Introduction](./consuming-data.md#introduction) can be cumbersome or error prone.

In the below example we will see how complex data can be parsed using custom javascript function.

To write custom function calls, follow the procedure below:

1. Open the GUI. Click on `Stream Apps` tab.

1. Click on **New** to start defining a new stream application.

1. Enter a **Name** as `ProcessEmployeeData` or feel free to chose any other name for the stream application.

1. Enter a **Description**.

1. Define an input C8DB collection

    ```sql
	CREATE SOURCE STREAM CompanyXInputStream WITH (type = 'database', collection = "CompanyXInputStream", collection.type="doc" , replication.type="global", map.type='json') (seqNo string, name string, address string);
    ```
   
1. Define an output stream   

    ```sql
	CREATE SINK CompanyXProfessionalInfo WITH (type = 'c8streams', stream = "CompanyXProfessionalInfo", replication.type="local") (name string, workAddress string);
    ```   

1. Consider that `CompanyXInputStream` will receive employee data in below format.

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

1. Consider that we want to convert `address.work` in the well formatted string.

1. Define a javascript function to process `address` field.

    ```js
    define function getWorkAddress[javascript] return string {
        work_address = JSON.parse(data[0]).work

        // Concatenate all the address fields as a single string
        formatted_address =  work_address.street + ", " + work_address.city + ", " + work_address.state + ", " + work_address.country + ", " + work_address.zip;
        return formatted_address
    };
    ```
   
1. Write a Stream Query to transfom data using `getWorkAddress` function.

    ```sql
    -- Data Processing
    @info(name='Query')
    insert into CompanyXProfessionalInfo
    select name, getWorkAddress(address) as workAddress
    from CompanyXInputStream;
    ```

1. Save the stream application. The completed stream application is as follows.

    ```sql
    @App:name('ProcessEmployeeData')
    @App:qlVersion("2")
    
	CREATE SOURCE CompanyXInputStream WITH (type = 'database', collection = "CompanyXInputStream", collection.type="doc" , replication.type="global", map.type='json') (seqNo string, name string, address string);
    
	CREATE SINK CompanyXProfessionalInfo WITH (type = 'c8streams', stream = "CompanyXProfessionalInfo", replication.type="local") (name string, workAddress string);
    
    CREATE FUNCTION getWorkAddress[javascript] return string {
        work_address = JSON.parse(data[0]).work
        formatted_address =  work_address.street + ", " + work_address.city + ", " + work_address.state + ", " + work_address.country + ", " + work_address.zip;
        return formatted_address
    };
    
    -- Data Processing
    @info(name='Query')
    insert into CompanyXProfessionalInfo
    select name, getWorkAddress(address) as workAddress
    from CompanyXInputStream;
    ```