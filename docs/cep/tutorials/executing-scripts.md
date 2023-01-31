---
title: Executing Scripts
sidebar_position: 10
---

The script provides the ability to write custom functions in other programming languages and execute them within stream workers. The custom functions using scripts can be defined via the function definitions and accessed in queries similar to any other inbuilt functions.

Scripts help to define custom functions in other programming languages such as JavaScript. This can eliminate the need for writing extensions to fulfill the functionalities that are not provided in stream workers or by its extension.

## Transform data using Custom Functions

To write custom function calls, follow the procedure below:

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click the **Stream Workers** tab.

1. Click **New** to start defining a new stream worker.

1. Type a **Name** as `TemperatureProcessing` or feel free to chose any other name for the stream worker.

1. Type a **Description**.
    
1. In the `TemperatureProcessing` stream worker, define a source stream as follows.

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

1. Add a query to a stream to apply the script you wrote to the relevant attributes of the input stream definition.

    ```sql
    insert into DeviceTempStream
    select concatFn(roomNo,'-',deviceID) as id, temp
    from TempStream;
    ```
    
1. Save the stream worker. The completed stream worker is as follows.
    
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

1. Open the GUI. Click on `Stream Workers` tab.

1. Click on **New** to start defining a new stream worker.

1. Enter a **Name** as `ProcessEmployeeData` or feel free to chose any other name for the stream worker.

1. Enter a **Description**.

1. Define an input collection:

    ```sql
	CREATE SOURCE CompanyXInputStream WITH (type = 'database', collection = "CompanyXInputStream", collection.type="doc" , replication.type="global", map.type='json') (seqNo string, name string, address string);
    ```
   
1. Define an output stream:

    ```sql
	CREATE SINK CompanyXProfessionalInfo WITH (type = 'stream', stream = "CompanyXProfessionalInfo", replication.type="local") (name string, workAddress string);

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
   
1. Write a query to a stream to transfom data using `getWorkAddress` function.

    ```sql
    -- Data Processing
    @info(name='Query')
    insert into CompanyXProfessionalInfo
    select name, getWorkAddress(address) as workAddress
    from CompanyXInputStream;
    ```

1. Save the stream worker. The completed stream worker is as follows.

    ```sql
	@App:name("ProcessEmployeeData")
	@App:qlVersion("2")

	CREATE SOURCE CompanyXInputStream WITH (type = 'database', collection = "CompanyXInputStream", collection.type="doc" , replication.type="global", map.type='json') (seqNo string, name string, address string);

	CREATE SINK CompanyXProfessionalInfo WITH (type = 'stream', stream = "CompanyXProfessionalInfo", replication.type="local", map.type='json') (name string, workAddress string);

	CREATE FUNCTION getWorkAddress[javascript] return string {
	    var work_address = JSON.parse(data[0]).work
	    var formatted_address =  work_address.street + ", " + work_address.city + ", " + work_address.state + ", " + work_address.country + ", " + work_address.zip;
	    return formatted_address
	};

	-- Data Processing
	@info(name='Query')
	insert into CompanyXProfessionalInfo
	select name, getWorkAddress(address) as workAddress
	from CompanyXInputStream;
    ```
