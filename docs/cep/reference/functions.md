---
sidebar_position: 12
---

# Functions

## Core

### and (Aggregate Function)

Returns the results of AND operation for all the events.

Syntax

```js
    <BOOL> and(<BOOL> arg)
```

QUERY PARAMETERS

| Name | Description                               | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------------------------------------|---------------|---------------------|----------|---------|
| arg  | The value that needs to be AND operation. |               | BOOL                | No       | Yes     |

EXAMPLE 1

```js
    select and(isFraud) as isFraudTransaction
    from cscStream#window.lengthBatch(10)
    insert into alertStream;
```

This will returns the result for AND operation of isFraud values as a boolean value for event chunk expiry by window length batch.

### avg (Aggregate Function)

Calculates the average for all the events.

Syntax

```js
    <DOUBLE> avg(<INT|LONG|DOUBLE|FLOAT> arg)
```

QUERY PARAMETERS

| Name | Description                         | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------|---------------|-----------------------|----------|---------|
| arg  | The value that need to be averaged. |               | INT LONG DOUBLE FLOAT | No       | Yes     |

EXAMPLE 1

```js
    select avg(temp) as avgTemp
    from fooStream#window.timeBatch
    insert into barStream;
```

avg(temp) returns the average temp value for all the events based on their arrival and expiry.

### count (Aggregate Function)

Returns the count of all the events.

Syntax

```js
    <LONG> count()
    <LONG> count(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg)
```

QUERY PARAMETERS

| Name | Description                                                                           | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|---------------------------------------------------------------------------------------|---------------|------------------------------------------|----------|---------|
| arg  | This function accepts one parameter. It can belong to any one of the available types. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | Yes      | Yes     |

EXAMPLE 1

```js
    select count() as count
    from fooStream#window.timeBatch(10 sec)
    insert into barStream;
```

This will return the count of all the events for time batch in 10 seconds.

### distinctCount (Aggregate Function)

This returns the count of distinct occurrences for a given arg.

Syntax

```js
    <LONG> distinctCount(<INT|LONG|DOUBLE|FLOAT|STRING> arg)
```

QUERY PARAMETERS

| Name | Description                                                                 | Default Value | Possible Data Types          | Optional | Dynamic |
|------|-----------------------------------------------------------------------------|---------------|------------------------------|----------|---------|
| arg  | The object for which the number of distinct occurences needs to be counted. |               | INT LONG DOUBLE FLOAT STRING | No       | Yes     |

EXAMPLE 1

```js
    select distinctcount(pageID) as count
    from fooStream
    insert into barStream;
```

distinctcount(pageID) for the following output returns `3` when the available values are as follows. Â 

* WEB_PAGE_1
* WEB_PAGE_1
* WEB_PAGE_2
* WEB_PAGE_3
* WEB_PAGE_1
* WEB_PAGE_2


The three distinct occurences identified are `WEB_PAGE_1`, `WEB_PAGE_2`, and `WEB_PAGE_3`.

### max (Aggregate Function)

Returns the maximum value for all the events.

Syntax

```js
    <INT|LONG|DOUBLE|FLOAT> max(<INT|LONG|DOUBLE|FLOAT> arg)
```

QUERY PARAMETERS

| Name | Description                                                    | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| arg  | The value that needs to be compared to find the maximum value. |               | INT LONG DOUBLE FLOAT | No       | Yes     |

EXAMPLE 1

```js
    select max(temp) as maxTemp
    from fooStream#window.timeBatch(10 sec)
    insert into barStream;
```

max(temp) returns the maximum temp value recorded for all the events based on their arrival and expiry.

### maxForever (Aggregate Function)

This is the attribute aggregator to store the maximum value for a given attribute throughout the lifetime of the query regardless of any windows in-front.

Syntax

```js
    <INT|LONG|DOUBLE|FLOAT> maxForever(<INT|LONG|DOUBLE|FLOAT> arg)
```

QUERY PARAMETERS

| Name | Description                                                    | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| arg  | The value that needs to be compared to find the maximum value. |               | INT LONG DOUBLE FLOAT | No       | Yes     |

EXAMPLE 1

```js
    select maxForever(temp) as max
    from inputStream
    insert into outputStream;
```

maxForever(temp) returns the maximum temp value recorded for all the events throughout the lifetime of the query.

### min (Aggregate Function)

Returns the minimum value for all the events.

Syntax

```js
    <INT|LONG|DOUBLE|FLOAT> min(<INT|LONG|DOUBLE|FLOAT> arg)
```

QUERY PARAMETERS

| Name | Description                                                    | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| arg  | The value that needs to be compared to find the minimum value. |               | INT LONG DOUBLE FLOAT | No       | Yes     |

EXAMPLE 1

```js
    select min(temp) as minTemp
    from inputStream
    insert into outputStream;
```

min(temp) returns the minimum temp value recorded for all the events based on their arrival and expiry.

### minForever (Aggregate Function)

This is the attribute aggregator to store the minimum value for a given attribute throughout the lifetime of the query regardless of any windows in-front.

Syntax

```js
    <INT|LONG|DOUBLE|FLOAT> minForever(<INT|LONG|DOUBLE|FLOAT> arg)
```

QUERY PARAMETERS

| Name | Description                                                    | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| arg  | The value that needs to be compared to find the minimum value. |               | INT LONG DOUBLE FLOAT | No       | Yes     |

EXAMPLE 1

```js
    select minForever(temp) as max
    from inputStream
    insert into outputStream;
```

minForever(temp) returns the minimum temp value recorded for all the events throughout the lifetime of the query.

### or (Aggregate Function)

Returns the results of OR operation for all the events.

Syntax

```js
    <BOOL> or(<BOOL> arg)
```

QUERY PARAMETERS

| Name | Description                              | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------------------------------|---------------|---------------------|----------|---------|
| arg  | The value that needs to be OR operation. |               | BOOL                | No       | Yes     |

EXAMPLE 1

```js
    select or(isFraud) as isFraudTransaction
    from cscStream#window.lengthBatch(10)
    insert into alertStream;
```

This will returns the result for OR operation of isFraud values as a boolean value for event chunk expiry by window length batch.

### stdDev (Aggregate Function)

Returns the calculated standard deviation for all the events.

Syntax

```js
    <DOUBLE> stdDev(<INT|LONG|DOUBLE|FLOAT> arg)
```

QUERY PARAMETERS

| Name | Description                                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| arg  | The value that should be used to calculate the standard deviation. |               | INT LONG DOUBLE FLOAT | No       | Yes     |

EXAMPLE 1

```js
    select stddev(temp) as stdTemp
    from inputStream
    insert into outputStream;
```

stddev(temp) returns the calculated standard deviation of temp for all the events based on their arrival and expiry.

### sum (Aggregate Function)

Returns the sum for all the events.

Syntax
```js
    <LONG|DOUBLE> sum(<INT|LONG|DOUBLE|FLOAT> arg)
```
QUERY PARAMETERS

| Name | Description                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------|---------------|-----------------------|----------|---------|
| arg  | The value that needs to be summed. |               | INT LONG DOUBLE FLOAT | No       | Yes     |

EXAMPLE 1

```js
    select sum(volume) as sumOfVolume
    from inputStream
    insert into outputStream;
```

This will returns the sum of volume values as a long value for each event arrival and expiry.

### unionSet (Aggregate Function)

Union multiple sets. Â This attribute aggregator maintains a union of sets. The given input set is put into the union set and the union set is returned.

Syntax

```js
    <OBJECT> unionSet(<OBJECT> set)
```

QUERY PARAMETERS

| Name | Description                                                         | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------------------------------------|---------------|---------------------|----------|---------|
| set  | The java.util.Set object that needs to be added into the union set. |               | OBJECT              | No       | Yes     |

EXAMPLE 1

```js
    select createSet(symbol) as initialSet
    from stockStream
    insert into initStream

    select unionSet(initialSet) as distinctSymbols
    from initStream#window.timeBatch(10 sec)
    insert into distinctStockStream;
```

`distinctStockStream` will return the set object which contains the distinct set of stock symbols received during a sliding window of 10 seconds.

### UUID (Function)

Generates a UUID (Universally Unique Identifier).

Syntax

```js
    <STRING> UUID()
```

EXAMPLE 1

```js
    select convert(roomNo, 'string') as roomNo, temp, UUID() as messageID
    from TempStream
    insert into RoomTempStream;
```

This will converts a room number to string, introducing a message ID to each event asUUID() returns `a34eec40-32c2-44fe-8075-7f4fde2e2dd8` from TempStream select convert(roomNo, `string`) as roomNo, temp, UUID() as messageID insert into RoomTempStream;

### cast (Function)

Converts the first parameter according to the cast.to parameter. Incompatible arguments cause Class Cast exceptions if further processed. This function is used with map extension that returns attributes of the object type. You can use this function to cast the object to an accurate and concrete type.

Syntax

```js
    <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> cast(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> to.be.caster, <STRING> cast.to)
```

QUERY PARAMETERS

| Name         | Description                                                                                                                                | Default Value | Possible Data Types                      | Optional | Dynamic |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------|---------------|------------------------------------------|----------|---------|
| to.be.caster | This specifies the attribute to be casted.                                                                                                 |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |
| cast.to      | A string constant parameter expressing the cast to type using one of the following strings values: int, long, float, double, string, bool. |               | STRING                                   | No       | Yes     |

EXAMPLE 1

```js
    select symbol as name, cast(temp, 'double') as temp
    from fooStream
    insert into barStream;
```

This will cast the fooStream temp field value into `double` format.

### coalesce (Function)

Returns the value of the first input parameter that is not null, and all input parameters have to be on the same type.

Syntax

```js
    <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> coalesce(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg, <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> ...)
```

QUERY PARAMETERS

| Name | Description                                                                                                                                               | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|------------------------------------------|----------|---------|
| arg  | This function accepts one or more parameters. They can belong to any one of the available types. All the specified parameters should be of the same type. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

EXAMPLE 1

```js
    select coalesce('123', null, '789') as value
    from fooStream
    insert into barStream;
```

This will returns first null value 123.

EXAMPLE 2

```js
    select coalesce(null, 76, 567) as value
    from fooStream
    insert into barStream;
```

This will returns first null value 76.

EXAMPLE 3

```js
    select coalesce(null, null, null) as value
    from fooStream
    insert into barStream;
```

This will returns null as there are no notnull values.

### convert (Function)

Converts the first input parameter according to the convertedTo parameter.

Syntax

```js
    <INT|LONG|DOUBLE|FLOAT|STRING|BOOL> convert(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> to.be.converted, <STRING> converted.to)
```

QUERY PARAMETERS

| Name            | Description                                                                                                                                                                             | Default Value | Possible Data Types                      | Optional | Dynamic |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|------------------------------------------|----------|---------|
| to.be.converted | This specifies the value to be converted.                                                                                                                                               |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |
| converted.to    | A string constant parameter to which type the attribute need to be converted using one of the following strings values: `int`, `long`, `float`, `double`, `string`, `bool`. |               | STRING                                   | No       | Yes     |

EXAMPLE 1

```js
    select convert(temp, 'double') as temp
    from fooStream
    insert into barStream;
```

This will convert fooStream temp value into `double`.

EXAMPLE 2

```js
    select convert(temp, 'int') as temp
    from fooStream
    insert into barStream;
```

This will convert fooStream temp value into `int` (value = "convert(45.9, `int`) returns 46").

### createSet (Function)

Includes the given input parameter in a java.util.HashSet and returns the set.

Syntax

```js
    <OBJECT> createSet(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL> input)
```

QUERY PARAMETERS

| Name  | Description                                    | Default Value | Possible Data Types               | Optional | Dynamic |
|-------|------------------------------------------------|---------------|-----------------------------------|----------|---------|
| input | The input that needs to be added into the set. |               | INT LONG DOUBLE FLOAT STRING BOOL | No       | Yes     |

EXAMPLE 1

```js
    select createSet(symbol) as initialSet
    from stockStream
    insert into initStream;
```

For every incoming stockStream event, the initStream stream will produce a set object having only one element: the symbol in the incoming stockStream.

### currentTimeMillis (Function)

Returns the current timestamp of stream processor application in milliseconds.

Syntax

```js
    <LONG> currentTimeMillis()
```

EXAMPLE 1

```js
    select symbol as name, currentTimeMillis() as eventTimestamp
    from fooStream
    insert into barStream;
```

This will extract current stream processor application timestamp.

### default (Function)

Checks if the `attribute` parameter is null and if so returns the value of the `default` parameter

Syntax

```js
    <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> default(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> attribute, <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> default)
```

QUERY PARAMETERS

| Name      | Description                                                              | Default Value | Possible Data Types                      | Optional | Dynamic |
|-----------|--------------------------------------------------------------------------|---------------|------------------------------------------|----------|---------|
| attribute | The attribute that could be null.                                        |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |
| default   | The default value that will be used when `attribute` parameter is null |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

EXAMPLE 1

```js
    select default(temp, 0.0) as temp, roomNum
    from TempStream
    insert into StandardTempStream;
```

This will replace TempStream's temp attribute with default value if the temp is null.

### eventTimestamp (Function)

Returns the timestamp of the processed event.

Syntax

```js
    <LONG> eventTimestamp()
```

EXAMPLE 1

```js
    select symbol as name, eventTimestamp() as eventTimestamp
    from fooStream
    insert into barStream;
```

This will extract current events timestamp.

### ifThenElse (Function)

Evaluates the `condition` parameter and returns value of the `if.expression` parameter if the condition is true, or returns value of the `else.expression` parameter if the condition is false. Here both `if.expression` and `else.expression` should be of the same type.

Syntax

```js
    <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> ifThenElse(<BOOL> condition, <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> if.expression, <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> else.expression)
```

QUERY PARAMETERS

| Name            | Description                                                                               | Default Value | Possible Data Types                      | Optional | Dynamic |
|-----------------|-------------------------------------------------------------------------------------------|---------------|------------------------------------------|----------|---------|
| condition       | This specifies the if then else condition value.                                          |               | BOOL                                     | No       | Yes     |
| if.expression   | This specifies the value to be returned if the value of the condition parameter is true.  |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |
| else.expression | This specifies the value to be returned if the value of the condition parameter is false. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

EXAMPLE 1

```js
    @info(name = 'query1')
    select sensorValue, ifThenElse(sensorValue>35,'High','Low') as status
    from sensorEventStream
    insert into outputStream;
```

This will returns High if sensorValue = 50.

EXAMPLE 2

```js
    @info(name = 'query1')
    select sensorValue, ifThenElse(voltage < 5, 0, 1) as status
    from sensorEventStream
    insert into outputStream;
```
This will returns 1 if voltage= 12.

EXAMPLE 3
```js
    @info(name = 'query1')
    select userName, ifThenElse(password == 'admin', true, false) as passwordState
    from userEventStream
    insert into outputStream;
```
This will returns passwordState as true if password = admin.

### instanceOfBoolean (Function)

Checks whether the parameter is an instance of Boolean or not.

Syntax

    <BOOL> instanceOfBoolean(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg)

QUERY PARAMETERS

| Name | Description                  | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|------------------------------|---------------|------------------------------------------|----------|---------|
| arg  | The parameter to be checked. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

EXAMPLE 1

```js
    select instanceOfBoolean(switchState) as state
    from fooStream
    insert into barStream;
```
This will return true if the value of switchState is true.

EXAMPLE 2

```js
    select instanceOfBoolean(value) as state
    from fooStream
    insert into barStream;
```
if the value = 32 then this will returns false as the value is not an instance of the boolean.

### instanceOfDouble (Function)

Checks whether the parameter is an instance of Double or not.

Syntax

    <BOOL> instanceOfDouble(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg)

QUERY PARAMETERS

| Name | Description                  | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|------------------------------|---------------|------------------------------------------|----------|---------|
| arg  | The parameter to be checked. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

EXAMPLE 1

    from fooStream
    select instanceOfDouble(value) as state
    insert into barStream;

This will return true if the value field format is double ex : 56.45.

EXAMPLE 2

```js
    select instanceOfDouble(switchState) as state
    from fooStream
    insert into barStream;
```
if the switchState = true then this will returns false as the value is not an instance of the double.

### instanceOfFloat (Function)

Checks whether the parameter is an instance of Float or not.

Syntax

    <BOOL> instanceOfFloat(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg)

QUERY PARAMETERS

| Name | Description                  | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|------------------------------|---------------|------------------------------------------|----------|---------|
| arg  | The parameter to be checked. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

EXAMPLE 1
```js
    select instanceOfFloat(value) as state
    from fooStream
    insert into barStream;
```
This will return true if the value field format is float ex : 56.45f.

EXAMPLE 2
```js
    select instanceOfFloat(switchState) as state
    from fooStream
    insert into barStream;
```
if the switchState = true then this will returns false as the value is
an instance of the boolean not a float.

### instanceOfInteger (Function)

Checks whether the parameter is an instance of Integer or not.

Syntax

    <BOOL> instanceOfInteger(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg)

QUERY PARAMETERS

| Name | Description                  | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|------------------------------|---------------|------------------------------------------|----------|---------|
| arg  | The parameter to be checked. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

EXAMPLE 1

```js
    select instanceOfInteger(value) as state
    from fooStream
    insert into barStream;
```

This will return true if the value field format is integer.

EXAMPLE 2

```js
    select instanceOfInteger(switchState) as state
    from fooStream
    insert into barStream;
```
if the switchState = true then this will returns false as the value is an instance of the boolean not a long.

### instanceOfLong (Function)

Checks whether the parameter is an instance of Long or not.

Syntax

    <BOOL> instanceOfLong(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg)

QUERY PARAMETERS

| Name | Description                  | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|------------------------------|---------------|------------------------------------------|----------|---------|
| arg  | The parameter to be checked. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

EXAMPLE 1

```js
    select instanceOfLong(value) as state
    from fooStream
    insert into barStream;
```
This will return true if the value field format is long ex : 56456l.

EXAMPLE 2
```js
    select instanceOfLong(switchState) as state
    from fooStream
    insert into barStream;
```
if the switchState = true then this will returns false as the value is an instance of the boolean not a long.

### instanceOfString (Function)

Checks whether the parameter is an instance of String or not.

Syntax

    <BOOL> instanceOfString(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg)

QUERY PARAMETERS

| Name | Description                  | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|------------------------------|---------------|------------------------------------------|----------|---------|
| arg  | The parameter to be checked. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

EXAMPLE 1

```js
    select instanceOfString(value) as state
    from fooStream
    insert into barStream;
```
This will return true if the value field format is string ex : `test`.

EXAMPLE 2

```js
    select instanceOfString(switchState) as state
    from fooStream
    insert into barStream;
```
if the switchState = true then this will returns false as the value is an instance of the boolean not a string.

### maximum (Function)

Returns the maximum value of the input parameters.

Syntax

    <INT|LONG|DOUBLE|FLOAT> maximum(<INT|LONG|DOUBLE|FLOAT> arg, <INT|LONG|DOUBLE|FLOAT> ...)

QUERY PARAMETERS

| Name | Description                                                                                                                                               | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| arg  | This function accepts one or more parameters. They can belong to any one of the available types. All the specified parameters should be of the same type. |               | INT LONG DOUBLE FLOAT | No       | Yes     |

EXAMPLE 1

```js
    @info(name = 'query1') from inputStream
    select maximum(price1, price2, price3) as max
    insert into outputStream;
```
This will returns the maximum value of the input parameters price1,
price2, price3.

### minimum (Function)

Returns the minimum value of the input parameters.

Syntax

    <INT|LONG|DOUBLE|FLOAT> minimum(<INT|LONG|DOUBLE|FLOAT> arg, <INT|LONG|DOUBLE|FLOAT> ...)

QUERY PARAMETERS

| Name | Description                                                                                                                                               | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| arg  | This function accepts one or more parameters. They can belong to any one of the available types. All the specified parameters should be of the same type. |               | INT LONG DOUBLE FLOAT | No       | Yes     |

EXAMPLE 1
```js
    @info(name = 'query1') from inputStream
    select maximum(price1, price2, price3) as max
    insert into outputStream;
```
This will returns the minimum value of the input parameters price1, price2, price3.

### sizeOfSet (Function)

Returns the size of an object of type java.util.Set.

Syntax

    <INT> sizeOfSet(<OBJECT> set)

QUERY PARAMETERS

| Name | Description                                                                                                                                | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| set  | The set object. This parameter should be of type java.util.Set. A set object may be created by the `set` attribute aggregator. |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    select initSet(symbol) as initialSet
    from stockStream
    insert into initStream;
   
    select union(initialSet) as distinctSymbols
    from initStream#window.timeBatch(10 sec)
    insert into distinctStockStream;

    select sizeOfSet(distinctSymbols) sizeOfSymbolSet
    from distinctStockStream
    insert into sizeStream;

The sizeStream stream will output the number of distinct stock symbols received during a sliding window of 10 seconds.

### pol2Cart (Stream Function)

The pol2Cart function calculating the cartesian coordinates x & y for the given theta, rho coordinates and adding them as new attributes to the existing events.

Syntax

    pol2Cart(<DOUBLE> theta, <DOUBLE> rho)
    pol2Cart(<DOUBLE> theta, <DOUBLE> rho, <DOUBLE> z)

QUERY PARAMETERS

| Name  | Description                           | Default Value                                                    | Possible Data Types | Optional | Dynamic |
|-------|---------------------------------------|------------------------------------------------------------------|---------------------|----------|---------|
| theta | The theta value of the coordinates.   |                                                                  | DOUBLE              | No       | Yes     |
| rho   | The rho value of the coordinates.     |                                                                  | DOUBLE              | No       | Yes     |
| z     | z value of the cartesian coordinates. | If z value is not given, drop the third parameter of the output. | DOUBLE              | Yes      | Yes     |

EXAMPLE 1

    select x, y
    from PolarStream#pol2Cart(theta, rho)
    insert into outputStream ;

This will return cartesian coordinates (4.99953024681082, 0.06853693328228748) for theta: 0.7854 and rho: 5.

EXAMPLE 2

    select x, y, z
    from PolarStream#pol2Cart(theta, rho, 3.4)
    insert into outputStream ;

This will return cartesian coordinates (4.99953024681082, 0.06853693328228748, 3.4)for theta: 0.7854 and rho: 5 and z: 3.4.

### log (Stream Processor)

Logs the message on the given priority with or without the processed event.

Syntax

    log()
    log(<STRING> log.message)
    log(<BOOL> is.event.logged)
    log(<STRING> log.message, <BOOL> is.event.logged)
    log(<STRING> priority, <STRING> log.message)
    log(<STRING> priority, <STRING> log.message, <BOOL> is.event.logged)

QUERY PARAMETERS

| Name            | Description                                                                          | Default Value | Possible Data Types | Optional | Dynamic |
|-----------------|--------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| priority        | The priority/type of this log message (INFO, DEBUG, WARN, FATAL, ERROR, OFF, TRACE). | INFO          | STRING              | Yes      | No      |
| log.message     | This message will be logged.                                                         | :             | STRING              | Yes      | Yes     |
| is.event.logged | To log the processed event.                                                          | true          | BOOL                | Yes      | No      |

EXAMPLE 1

    select *
    from FooStream#log()
    insert into BarStream;

Logs events with StreamApp name message prefix on default log level INFO.

EXAMPLE 2
    
    select *
    from FooStream#log("Sample Event :")
    insert into BarStream;

Logs events with the message prefix "Sample Event :" on default log level INFO.

EXAMPLE 3

    select *
    from FooStream#log("DEBUG", "Sample Event :", true)
    insert into BarStream;

Logs events with the message prefix "Sample Event :" on log level DEBUG.

EXAMPLE 4

    select *
    from FooStream#log("Event Arrived", false)
    insert into BarStream;

For each event logs a message "Event Arrived" on default log level INFO.

EXAMPLE 5

    select *
    from FooStream#log("Sample Event :", true)
    insert into BarStream;

Logs events with the message prefix "Sample Event :" on default log level INFO.

EXAMPLE 6
    
    select *
    from FooStream#log(true)
    insert into BarStream;

Logs events with on default log level INFO.

### batch (Window)

A window that holds an incoming events batch. When a new set of events arrives, the previously arrived old events will be expired. Batch window can be used to aggregate events that comes in batches. If it has the parameter length specified, then batch window process the batch as several chunks.

Syntax

    batch()
    batch(<INT> window.length)

QUERY PARAMETERS

| Name          | Description           | Default Value                                                                           | Possible Data Types | Optional | Dynamic |
|---------------|-----------------------|-----------------------------------------------------------------------------------------|---------------------|----------|---------|
| window.length | The length of a chunk | If length value was not given it assign 0 as length and process the whole batch as once | INT                 | Yes      | No      |

EXAMPLE 1

    define stream consumerItemStream (itemId string, price float)
    select price, str:groupConcat(itemId) as itemIds
    from consumerItemStream#window.batch()
    group by price
    insert into outputStream;

This will output comma separated items IDs that have the same price for each incoming batch of events.

### cron (Window)

This window outputs the arriving events as and when they arrive, and resets (expires) the window periodically based on the given cron expression.

Syntax

    cron(<STRING> cron.expression)

QUERY PARAMETERS

| Name            | Description                                 | Default Value | Possible Data Types | Optional | Dynamic |
|-----------------|---------------------------------------------|---------------|---------------------|----------|---------|
| cron.expression | The cron expression that resets the window. |               | STRING              | No       | No      |

EXAMPLE 1

    define stream InputEventStream (symbol string, price float, volume int);

    @info(name = 'query1')
    select symbol, sum(price) as totalPrice
    from InputEventStream#cron('*/5 * * * * ?')
    insert into OutputStream;

This let the totalPrice to gradually increase and resets to zero as a batch every 5 seconds.

EXAMPLE 2

    define stream StockEventStream (symbol string, price float, volume int)
    define window StockEventWindow (symbol string, price float, volume int) cron('*/5 * * * * ?');

    @info(name = 'query0')
    from StockEventStream
    insert into StockEventWindow;

    @info(name = 'query1')
    select symbol, sum(price) as totalPrice
    from StockEventWindow
    insert into OutputStream ;

The defined window will let the totalPrice to gradually increase and resets to zero as a batch every 5 seconds.

### delay (Window)

A delay window holds events for a specific time period that is regarded as a delay period before processing them.

Syntax

    delay(<INT|LONG|TIME> window.delay)

QUERY PARAMETERS

| Name         | Description                                                                               | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|-------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| window.delay | The time period (specified in sec, min, ms) for which the window should delay the events. |               | INT LONG TIME       | No       | No      |

EXAMPLE 1

    define window delayWindow(symbol string, volume int) delay(1 hour);
    define stream PurchaseStream(symbol string, volume int);
    define stream DeliveryStream(symbol string);
    define stream OutputStream(symbol string);

    @info(name='query1')
    select symbol, volume
    from PurchaseStream
    insert into delayWindow;

    @info(name='query2')
    select delayWindow.symbol
    from delayWindow join DeliveryStream
    on delayWindow.symbol == DeliveryStream.symbol
    insert into OutputStream;

In this example, purchase events that arrive in the `PurchaseStream` stream are directed to a delay window. At any given time, this delay window holds purchase events that have arrived within the last hour. These purchase events in the window are matched by the `symbol` attribute, with delivery events that arrive in the `DeliveryStream` stream. This monitors whether the delivery of products is done with a minimum delay of one hour after the purchase.

### externalTime (Window)

A sliding time window based on external time. It holds events that arrived during the last windowTime period from the external timestamp, and gets updated on every monotonically increasing timestamp.

Syntax

    externalTime(<LONG> timestamp, <INT|LONG|TIME> window.time)

QUERY PARAMETERS

| Name        | Description                                                                                                                             | Default Value | Possible Data Types | Optional | Dynamic |
|-------------|-----------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| timestamp   | The time which the window determines as current time and will act upon. The value of this parameter should be monotonically increasing. |               | LONG                | No       | Yes     |
| window.time | The sliding time period for which the window should hold events.                                                                        |               | INT LONG TIME       | No       | No      |

EXAMPLE 1

    define window cseEventWindow (symbol string, price float, volume int) externalTime(eventTime, 20 sec) output expired events;

    @info(name = 'query0')
    from cseEventStream
    insert into cseEventWindow;

    @info(name = 'query1')
    select symbol, sum(price) as price
    from cseEventWindow
    insert expired events into outputStream ;

processing events arrived within the last 20 seconds from the eventTime and output expired events.

### externalTimeBatch (Window)

A batch (tumbling) time window based on external time, that holds events arrived during windowTime periods, and gets updated for every windowTime.

Syntax

    externalTimeBatch(<LONG> timestamp, <INT|LONG|TIME> window.time)
    externalTimeBatch(<LONG> timestamp, <INT|LONG|TIME> window.time, <INT|LONG|TIME> start.time)
    externalTimeBatch(<LONG> timestamp, <INT|LONG|TIME> window.time, <INT|LONG|TIME> start.time, <INT|LONG|TIME> timeout)
    externalTimeBatch(<LONG> timestamp, <INT|LONG|TIME> window.time, <INT|LONG|TIME> start.time, <INT|LONG|TIME> timeout, <BOOL> replace.with.batchtime)

QUERY PARAMETERS

| Name                   | Description                                                                                                                                                                                                                                | Default Value                                                             | Possible Data Types | Optional | Dynamic |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|---------------------|----------|---------|
| timestamp              | The time which the window determines as current time and will act upon. The value of this parameter should be monotonically increasing.                                                                                                    |                                                                           | LONG                | No       | Yes     |
| window.time            | The batch time period for which the window should hold events.                                                                                                                                                                             |                                                                           | INT LONG TIME       | No       | No      |
| start.time             | User defined start time. This could either be a constant (of type int, long or time) or an attribute of the corresponding stream (of type long). If an attribute is provided, initial value of attribute would be considered as startTime. | Timestamp of first event                                                  | INT LONG TIME       | Yes      | Yes     |
| timeout                | Time to wait for arrival of new event, before flushing and giving output for events belonging to a specific batch.                                                                                                                         | System waits till an event from next batch arrives to flush current batch | INT LONG TIME       | Yes      | No      |
| replace.with.batchtime | This indicates to replace the expired event timeStamp as the batch end timeStamp                                                                                                                                                           | System waits till an event from next batch arrives to flush current batch | BOOL                | Yes      | No      |

EXAMPLE 1

    define window cseEventWindow (symbol string, price float, volume int) externalTimeBatch(eventTime, 1 sec) output expired events;
    @info(name = 'query0')
    from cseEventStream
    insert into cseEventWindow;
    @info(name = 'query1')
    select symbol, sum(price) as price
    from cseEventWindow
    insert expired events into outputStream ;

This will processing events that arrive every 1 seconds from the eventTime.

EXAMPLE 2

    define window cseEventWindow (symbol string, price float, volume int) externalTimeBatch(eventTime, 20 sec, 0) output expired events;

This will processing events that arrive every 1 seconds from the eventTime. Starts on 0th millisecond of an hour.

EXAMPLE 3

    define window cseEventWindow (symbol string, price float, volume int) externalTimeBatch(eventTime, 2 sec, eventTimestamp, 100) output expired events;

This will processing events that arrive every 2 seconds from the eventTim. Considers the first event's eventTimestamp value as startTime. Waits 100 milliseconds for the arrival of a new event before flushing current batch.

### ~~frequent (Window)~~

*Deprecated*

This window returns the latest events with the most frequently occurred value for a given attribute(s). Frequency calculation for this window processor is based on Misra-Gries counting algorithm.

Syntax

    frequent(<INT> event.count)
    frequent(<INT> event.count, <STRING> attribute)

QUERY PARAMETERS

| Name        | Description                                                                                                                         | Default Value                                                       | Possible Data Types | Optional | Dynamic |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|---------------------|----------|---------|
| event.count | The number of most frequent events to be emitted to the stream.                                                                     |                                                                     | INT                 | No       | No      |
| attribute   | The attributes to group the events. If no attributes are given, the concatenation of all the attributes of the event is considered. | The concatenation of all the attributes of the event is considered. | STRING              | Yes      | Yes     |

EXAMPLE 1

    @info(name = 'query1')
    select cardNo, price
    from purchase[price >= 30]#window.frequent(2)
    insert all events into PotentialFraud;

This will returns the 2 most frequent events.

EXAMPLE 2

    @info(name = 'query1')
    select cardNo, price
    from purchase[price >= 30]#window.frequent(2, cardNo)
    insert all events into PotentialFraud;

This will returns the 2 latest events with the most frequently appeared card numbers.

### length (Window)

A sliding length window that holds the last `window.length` events at a given time, and gets updated for each arrival and expiry.

Syntax

    length(<INT> window.length)

QUERY PARAMETERS

| Name          | Description                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|---------------|--------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| window.length | The number of events that should be included in a sliding length window. |               | INT                 | No       | No      |

EXAMPLE 1

    define window StockEventWindow (symbol string, price float, volume int) length(10) output all events;

    @info(name = 'query0')
    from StockEventStream
    insert into StockEventWindow;
    @info(name = 'query1')

    select symbol, sum(price) as price
    from StockEventWindow
    insert all events into outputStream ;

This will process last 10 events in a sliding manner.

### lengthBatch (Window)

A batch (tumbling) length window that holds and process a number of events as specified in the window.length.

Syntax

    lengthBatch(<INT> window.length)
    lengthBatch(<INT> window.length, <BOOL> stream.current.event)

QUERY PARAMETERS

| Name                 | Description                                                                                                        | Default Value | Possible Data Types | Optional | Dynamic |
|----------------------|--------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| window.length        | The number of events the window should tumble.                                                                     |               | INT                 | No       | No      |
| stream.current.event | Let the window stream the current events out as and when they arrive to the window while expiring them in batches. | false         | BOOL                | Yes      | No      |

EXAMPLE 1

    define stream InputEventStream (symbol string, price float, volume int);

    @info(name = 'query1')
    select symbol, sum(price) as price
    from InputEventStream#lengthBatch(10)
    insert into OutputStream;

This collect and process 10 events as a batch and output them.

EXAMPLE 2

    define stream InputEventStream (symbol string, price float, volume int);

    @info(name = 'query1')
    select symbol, sum(price) as sumPrice
    from InputEventStream#lengthBatch(10, true)
    insert into OutputStream;

This window sends the arriving events directly to the output letting the `sumPrice` to increase gradually, after every 10 events it clears the window as a batch and resets the `sumPrice` to zero.

EXAMPLE 3

    define stream InputEventStream (symbol string, price float, volume int);
    define window StockEventWindow (symbol string, price float, volume int) lengthBatch(10) output all events;

    @info(name = 'query0')
    from InputEventStream
    insert into StockEventWindow;

    @info(name = 'query1')
    select symbol, sum(price) as price
    from StockEventWindow
    insert all events into OutputStream ;

This uses an defined window to process 10 events as a batch and output all events.

### ~~lossyFrequent (Window)~~

*Deprecated*

This window identifies and returns all the events of which the current frequency exceeds the value specified for the supportThreshold parameter.

Syntax

    lossyFrequent(<DOUBLE> support.threshold)
    lossyFrequent(<DOUBLE> support.threshold, <DOUBLE> error.bound)
    lossyFrequent(<DOUBLE> support.threshold, <DOUBLE> error.bound, <STRING> attribute)

QUERY PARAMETERS

| Name              | Description                                                                                                                         | Default Value                                                       | Possible Data Types | Optional | Dynamic |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|---------------------|----------|---------|
| support.threshold | The support threshold value.                                                                                                        |                                                                     | DOUBLE              | No       | No      |
| error.bound       | The error bound value.                                                                                                              | \`support.threshold\`/10                                            | DOUBLE              | Yes      | No      |
| attribute         | The attributes to group the events. If no attributes are given, the concatenation of all the attributes of the event is considered. | The concatenation of all the attributes of the event is considered. | STRING              | Yes      | Yes     |

EXAMPLE 1

    define stream purchase (cardNo string, price float);
    define window purchaseWindow (cardNo string, price float) lossyFrequent(0.1, 0.01);
    @info(name = 'query0')
    from purchase[price >= 30]
    insert into purchaseWindow;
    @info(name = 'query1')
    select cardNo, price
    from purchaseWindow
    insert all events into PotentialFraud;

lossyFrequent(0.1, 0.01) returns all the events of which the current frequency exceeds 0.1, with an error bound of 0.01.

EXAMPLE 2

    define stream purchase (cardNo string, price float);
    define window purchaseWindow (cardNo string, price float) lossyFrequent(0.3, 0.05, cardNo);
    @info(name = 'query0')
    from purchase[price >= 30]
    insert into purchaseWindow;
    @info(name = 'query1')
    select cardNo, price
    from purchaseWindow
    insert all events into PotentialFraud;

lossyFrequent(0.3, 0.05, cardNo) returns all the events of which the cardNo attributes frequency exceeds 0.3, with an error bound of 0.05.

### session (Window)

Holds events that belong to a session. Events belong to a specific session are identified by a session key, and a session gap is determines the time period after which the session is considered to be expired. To have meaningful aggregation on session windows, the events need to be aggregated based on session key via a `group by` clause.

Syntax

    session(<INT|LONG|TIME> session.gap)
    session(<INT|LONG|TIME> session.gap, <STRING> session.key)
    session(<INT|LONG|TIME> session.gap, <STRING> session.key, <INT|LONG|TIME> allowed.latency)

QUERY PARAMETERS

| Name            | Description                                                                                                                                                                                 | Default Value | Possible Data Types | Optional | Dynamic |
|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| session.gap     | The time period after which the session is considered to be expired.                                                                                                                        |               | INT LONG TIME       | No       | No      |
| session.key     | The session identification attribute. Used to group events belonging to a specific session.                                                                                                 | default-key   | STRING              | Yes      | Yes     |
| allowed.latency | The time period for which the session window is valid after the expiration of the session, to accept late event arrivals. This time period should be less than the `session.gap` parameter. | 0             | INT LONG TIME       | Yes      | No      |

EXAMPLE 1

    define stream PurchaseEventStream (user string, item_number int, price float, quantity int);

    @info(name='query1)
    select user, sum(quantity) as totalQuantity, sum(price) as totalPrice
    from PurchaseEventStream#window.session(5 sec, user)
    group by user
    insert into OutputStream;
From the events arriving at the PurchaseEventStream, a session window with 5 seconds session gap is processed based on `user` attribute as the session group identification key. All events falling into the same session are aggregated based on `user` attribute, and outputted to the OutputStream.

EXAMPLE 2

    define stream PurchaseEventStream (user string, item_number int, price float, quantity int);

    @info(name='query2)
    select user, sum(quantity) as totalQuantity, sum(price) as totalPrice
    from PurchaseEventStream#window.session(5 sec, user, 2 sec)
    group by user
    insert into OutputStream;

From the events arriving at the PurchaseEventStream, a session window with 5 seconds session gap is processed based on `user` attribute as the session group identification key. This session window is kept active for 2 seconds after the session expiry to capture late (out of order) event arrivals. If the event timestamp falls in to the last session the session is reactivated. Then all events falling into the same session are aggregated based on `user` attribute, and outputted to the OutputStream.

### sort (Window)

This window holds a batch of events that equal the number specified as the windowLength and sorts them in the given order.

Syntax

    sort(<INT> window.length, <STRING|DOUBLE|INT|LONG|FLOAT|LONG> attribute)
    sort(<INT> window.length, <STRING|DOUBLE|INT|LONG|FLOAT|LONG> attribute, <STRING> order, <STRING> ...)
    sort(<INT> window.length, <STRING|DOUBLE|INT|LONG|FLOAT|LONG> attribute, <STRING> order, <STRING|DOUBLE|INT|LONG|FLOAT|LONG> attribute, <STRING|DOUBLE|INT|LONG|FLOAT|LONG> ...)

QUERY PARAMETERS

| Name          | Description                                         | Default Value                                                       | Possible Data Types               | Optional | Dynamic |
|---------------|-----------------------------------------------------|---------------------------------------------------------------------|-----------------------------------|----------|---------|
| window.length | The size of the window length.                      |                                                                     | INT                               | No       | No      |
| attribute     | The attribute that should be checked for the order. | The concatenation of all the attributes of the event is considered. | STRING DOUBLE INT LONG FLOAT LONG | No       | Yes     |
| order         | The order define as "asc" or "desc".            | asc                                                                 | STRING                            | Yes      | No      |

EXAMPLE 1

    define stream cseEventStream (symbol string, price float, volume long);
    define window cseEventWindow (symbol string, price float, volume long) sort(2,volume, 'asc');
    @info(name = 'query0')
    from cseEventStream
    insert into cseEventWindow;
    @info(name = 'query1')
    select volume
    from cseEventWindow
    insert all events into outputStream ;

sort(5, price, `asc`) keeps the events sorted by price in the ascending order. Therefore, at any given time, the window contains the 5 lowest prices.

### time (Window)

A sliding time window that holds events that arrived during the last windowTime period at a given time, and gets updated for each event arrival and expiry.

Syntax

    time(<INT|LONG|TIME> window.time)

QUERY PARAMETERS

| Name        | Description                                                      | Default Value | Possible Data Types | Optional | Dynamic |
|-------------|------------------------------------------------------------------|---------------|---------------------|----------|---------|
| window.time | The sliding time period for which the window should hold events. |               | INT LONG TIME       | No       | No      |

EXAMPLE 1

    define window cseEventWindow (symbol string, price float, volume int) time(20) output all events;
    @info(name = 'query0')
    from cseEventStream
    insert into cseEventWindow;
    @info(name = 'query1')
    select symbol, sum(price) as price
    from cseEventWindow
    insert all events into outputStream ;

This will processing events that arrived within the last 20 milliseconds.

### timeBatch (Window)

A batch (tumbling) time window that holds and process events that arrive during `window.time` period as a batch.

Syntax

    timeBatch(<INT|LONG|TIME> window.time)
    timeBatch(<INT|LONG|TIME> window.time, <INT|LONG> start.time)
    timeBatch(<INT|LONG|TIME> window.time, <BOOL> stream.current.event)
    timeBatch(<INT|LONG|TIME> window.time, <INT|LONG> start.time, <BOOL> stream.current.event)

QUERY PARAMETERS

| Name                 | Description                                                                                                        | Default Value            | Possible Data Types | Optional | Dynamic |
|----------------------|--------------------------------------------------------------------------------------------------------------------|--------------------------|---------------------|----------|---------|
| window.time          | The batch time period in which the window process the events.                                                      |                          | INT LONG TIME       | No       | No      |
| start.time           | This specifies an offset in milliseconds in order to start the window at a time different to the standard time.    | Timestamp of first event | INT LONG            | Yes      | No      |
| stream.current.event | Let the window stream the current events out as and when they arrive to the window while expiring them in batches. | false                    | BOOL                | Yes      | No      |

EXAMPLE 1

    define stream InputEventStream (symbol string, price float, volume int);

    @info(name = 'query1')
    select symbol, sum(price) as price
    from InputEventStream#timeBatch(20 sec)
    insert into OutputStream;

This collect and process incoming events as a batch every 20 seconds and output them.

EXAMPLE 2

    define stream InputEventStream (symbol string, price float, volume int);

    @info(name = 'query1')
    select symbol, sum(price) as sumPrice
    from InputEventStream#timeBatch(20 sec, true)
    insert into OutputStream;

This window sends the arriving events directly to the output letting the `sumPrice` to increase gradually and on every 20 second interval it clears the window as a batch resetting the `sumPrice` to zero.

EXAMPLE 3

    define stream InputEventStream (symbol string, price float, volume int);
    define window StockEventWindow (symbol string, price float, volume int) timeBatch(20 sec) output all events;

    @info(name = 'query0')
    from InputEventStream
    insert into StockEventWindow;

    @info(name = 'query1')
    select symbol, sum(price) as price
    from StockEventWindow
    insert all events into OutputStream ;

This uses an defined window to process events arrived every 20 seconds as a batch and output all events.

### timeLength (Window)

A sliding time window that, at a given time holds the last window.length events that arrived during last window.time period, and gets updated for every event arrival and expiry.

Syntax

    timeLength(<INT|LONG|TIME> window.time, <INT> window.length)

QUERY PARAMETERS

| Name          | Description                                                                  | Default Value | Possible Data Types | Optional | Dynamic |
|---------------|------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| window.time   | The sliding time period for which the window should hold events.             |               | INT LONG TIME       | No       | No      |
| window.length | The number of events that should be be included in a sliding length window.. |               | INT                 | No       | No      |

EXAMPLE 1

    define stream cseEventStream (symbol string, price float, volume int);
    define window cseEventWindow (symbol string, price float, volume int) timeLength(2 sec, 10);
    @info(name = 'query0')
    from cseEventStream
    insert into cseEventWindow;
    @info(name = 'query1')
    from cseEventWindow select symbol, price, volume
    insert all events into outputStream;

window.timeLength(2 sec, 10) holds the last 10 events that arrived during last 2 seconds and gets updated for every event arrival and expiry.

File
----

### isDirectory (Function)

This function checks for a given file path points to a directory

Syntax

    <BOOL> file:isDirectory(<STRING> uri)

QUERY PARAMETERS

| Name | Description                             | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------------|---------------|---------------------|----------|---------|
| uri  | The path to be checked for a directory. |               | STRING              | No       | Yes     |

EXAMPLE 1

    file:isDirectory(filePath) as isDirectory

Checks whether the given path is a directory. Result will be returned as an boolean.

### isExist (Function)

This function checks whether a file or a folder exists in a given path

Syntax

    <BOOL> file:isExist(<STRING> uri)

QUERY PARAMETERS

| Name | Description                       | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------|---------------|---------------------|----------|---------|
| uri  | File path to check for existence. |               | STRING              | No       | Yes     |

EXAMPLE 1

    file:isExist('/User/gdn/source/test.txt') as exists

Checks existence of a file in the given path. Result will be returned as an boolean .

EXAMPLE 2

    file:isExist('/User/gdn/source/') as exists

Checks existence of a folder in the given path. Result will be returned as an boolean .

### isFile (Function)

This function checks for a given file path points to a file

Syntax

    <BOOL> file:isFile(<STRING> file.path)

QUERY PARAMETERS

| Name      | Description                        | Default Value | Possible Data Types | Optional | Dynamic |
|-----------|------------------------------------|---------------|---------------------|----------|---------|
| file.path | The path to be checked for a file. |               | STRING              | No       | Yes     |

EXAMPLE 1

    file:isFile(filePath) as isFile

Checks whether the given path is a file. Result will be returned as an boolean.

### lastModifiedTime (Function)

Checks for the last modified time for a given file path

Syntax

    <STRING> file:lastModifiedTime(<STRING> uri)
    <STRING> file:lastModifiedTime(<STRING> uri, <STRING> datetime.format)

QUERY PARAMETERS

| Name            | Description                                          | Default Value       | Possible Data Types | Optional | Dynamic |
|-----------------|------------------------------------------------------|---------------------|---------------------|----------|---------|
| uri             | File path to be checked for te last modified time.   |                     | STRING              | No       | Yes     |
| datetime.format | Format of the last modified datetime to be returned. | MM/dd/yyyy HH:mm:ss | STRING              | Yes      | No      |

EXAMPLE 1

    file:lastModifiedTime(filePath) as lastModifiedTime

Last modified datetime of a file will be returned as an string in MM/dd/yyyy HH:mm:ss.

EXAMPLE 2

    file:lastModifiedTime(filePath, dd/MM/yyyy HH:mm:ss) as lastModifiedTime

Last modified datetime of a file will be returned as an string in `dd/MM/yyyy HH:mm:ss` format.

### size (Function)

This function checks for a given file's size

Syntax

    <LONG> file:size(<STRING> uri)

QUERY PARAMETERS

| Name | Description                                                        | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|---------------------|----------|---------|
| uri  | Absolute path to the file or directory to be checked for the size. |               | STRING              | No       | Yes     |

EXAMPLE 1

    file:size('/User/gdn/source/test.txt') as fileSize

Size of a file in a given path will be returned.

### archive (Stream Function)

Archives files and folders as a zip or in tar format that are available in the given file uri.

Syntax

    file:archive(<STRING> uri, <STRING> destination.dir.uri)
    file:archive(<STRING> uri, <STRING> destination.dir.uri, <STRING> archive.type)
    file:archive(<STRING> uri, <STRING> destination.dir.uri, <STRING> archive.type, <STRING> include.by.regexp)
    file:archive(<STRING> uri, <STRING> destination.dir.uri, <STRING> archive.type, <STRING> include.by.regexp, <BOOL> exclude.subdirectories)

QUERY PARAMETERS

| Name                   | Description                                                                                         | Default Value | Possible Data Types | Optional | Dynamic |
|------------------------|-----------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| uri                    | Absolute path of the file or the directory                                                          |               | STRING              | No       | Yes     |
| destination.dir.uri    | Absolute directory path of the the archived file.                                                   |               | STRING              | No       | Yes     |
| archive.type           | Archive type can be zip or tar                                                                      | zip           | STRING              | Yes      | No      |
| include.by.regexp      | Only the files matching the patterns will be archived. Note: Add an empty string to match all files |               | STRING              | Yes      | No      |
| exclude.subdirectories | This flag is used to exclude the subdirectories and its files without archiving.                    | false         | BOOL                | Yes      | No      |

EXAMPLE 1

    InputStream#file:archive('/User/gdn/to_be_archived', '/User/gdn/archive_destination/file.zip')

Archives to\_be\_archived folder in zip format and stores archive\_destination folder as file.zip.

EXAMPLE 2

    InputStream#file:archive('/User/gdn/to_be_archived', '/User/gdn/archive_destination/file', 'tar')

Archives to\_be\_archived folder in tar format and stores in archive\_destination folder as file.tar.

EXAMPLE 3
```js
    InputStream#file:archive('/User/gdn/to_be_archived', '/User/gdn/archive_destination/file', 'tar', '.*test3.txt$')
```

Archives files which adheres to `.\*test3.txt\$` regex in to\_be\_archived folder in tar format and stores in archive\_destination folder as file.tar.

EXAMPLE 4

    InputStream#file:archive('/User/gdn/to_be_archived', '/User/gdn/archive_destination/file', '', '', 'false')

Archives to\_be\_archived folder excluding the sub-folders in zip format and stores in archive\_destination folder as file.tar.

### copy (Stream Function)

This function performs copying file from one directory to another.

Syntax

    file:copy(<STRING> uri, <STRING> destination.dir.uri)
    file:copy(<STRING> uri, <STRING> destination.dir.uri, <STRING> include.by.regexp)
    file:copy(<STRING> uri, <STRING> destination.dir.uri, <STRING> include.by.regexp, <BOOL> exclude.root.dir)

QUERY PARAMETERS

| Name                | Description                                                                                                     | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------|-----------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| uri                 | Absolute path of the File or the directory.                                                                     |               | STRING              | No       | Yes     |
| destination.dir.uri | Absolute path of the destination directory. Note: Parent folder structure will be created if it does not exist. |               | STRING              | No       | Yes     |
| include.by.regexp   | Only the files matching the patterns will be copied. Note: Add an empty string to match all files               |               | STRING              | Yes      | No      |
| exclude.root.dir    | This flag is used to exclude parent folder when copying the content.                                            | false         | BOOL                | Yes      | No      |

Extra Return Attributes

| Name      | Description                                            | Possible Types |
|-----------|--------------------------------------------------------|----------------|
| isSuccess | Status of the file copying operation (true if success) | BOOL           |

EXAMPLE 1

    InputStream#file:copy('/User/gdn/source/test.txt', 'User/gdn/destination/')

Copies `test.txt` in `source` folder to the `destination` folder.

EXAMPLE 2

    InputStream#file:copy('/User/gdn/source/', 'User/gdn/destination/')

Copies `source` folder to the `destination` folder with all its content

EXAMPLE 3
```js
    InputStream#file:copy('/User/gdn/source/', 'User/gdn/destination/', '.*test3.txt$')
```
Copies `source` folder to the `destination` folder ignoring files doesnt adhere to the given regex.

EXAMPLE 4

    InputStream#file:copy('/User/gdn/source/', 'User/gdn/destination/', '', true)

Copies only the files resides in `source` folder to `destination` folder.

### create (Stream Function)

Create a file or a folder in the given location

Syntax

    file:create(<STRING> uri, <STRING> is.directory)

QUERY PARAMETERS

| Name         | Description                                              | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|----------------------------------------------------------|---------------|---------------------|----------|---------|
| uri          | Absolute file path which needs to be created.            |               | STRING              | No       | Yes     |
| is.directory | This flag is used when creating file path is a directory |               | STRING              | No       | Yes     |

EXAMPLE 1

    from CreateFileStream#file:create('/User/gdn/source/test.txt', false)

Creates a file in the given path with the name of `test.txt`.

EXAMPLE 2

    from CreateFileStream#file:create('/User/gdn/source/', true)

Creates a folder in the given path with the name of `source`.

### delete (Stream Function)

Deletes file/files in a particular path

Syntax

    file:delete(<STRING> uri)

QUERY PARAMETERS

| Name | Description                                               | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------------------------------|---------------|---------------------|----------|---------|
| uri  | Absolute path of the file or the directory to be deleted. |               | STRING              | No       | Yes     |

EXAMPLE 1

    from DeleteFileStream#file:delete('/User/gdn/source/test.txt')

Deletes the file in the given path.

EXAMPLE 2

    from DeleteFileStream#file:delete('/User/gdn/source/')

Deletes the folder in the given path.

### move (Stream Function)

This function performs copying file from one directory to another.

Syntax

    file:move(<STRING> uri, <STRING> destination.dir.uri)
    file:move(<STRING> uri, <STRING> destination.dir.uri, <STRING> include.by.regexp)
    file:move(<STRING> uri, <STRING> destination.dir.uri, <STRING> include.by.regexp, <BOOL> exclude.root.dir)

QUERY PARAMETERS

| Name                | Description                                                                                                          | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------|----------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| uri                 | Absolute file or directory path.                                                                                     |               | STRING              | No       | Yes     |
| destination.dir.uri | Absolute file path to the destination directory. Note: Parent folder structure will be created if it does not exist. |               | STRING              | No       | Yes     |
| include.by.regexp   | Only the files matching the patterns will be moved. Note: Add an empty string to match all files                     |               | STRING              | Yes      | No      |
| exclude.root.dir    | Exclude parent folder when moving the content.                                                                       | false         | BOOL                | Yes      | No      |

Extra Return Attributes

| Name      | Description                                           | Possible Types |
|-----------|-------------------------------------------------------|----------------|
| isSuccess | Status of the file moving operation (true if success) | BOOL           |

EXAMPLE 1

    InputStream#file:move('/User/gdn/source/test.txt', 'User/gdn/destination/')

Moves `test.txt` in `source` folder to the `destination` folder.

EXAMPLE 2

    InputStream#file:move('/User/gdn/source/', 'User/gdn/destination/')

Moves `source` folder to the `destination` folder with all its content

EXAMPLE 3
```js
    InputStream#file:move('/User/gdn/source/', 'User/gdn/destination/', '.*test3.txt$')
```
Moves `source` folder to the `destination` folder excluding files doesnt adhere to the given regex.

EXAMPLE 4

    InputStream#file:move('/User/gdn/source/', 'User/gdn/destination/', '', true)

Moves only the files resides in `source` folder to `destination` folder.

### search (Stream Function)

Searches files in a given folder and lists.

Syntax

    file:search(<STRING> uri)
    file:search(<STRING> uri, <STRING> include.by.regexp)
    file:search(<STRING> uri, <STRING> include.by.regexp, <BOOL> exclude.subdirectories)

QUERY PARAMETERS

| Name                   | Description                                                                                         | Default Value | Possible Data Types | Optional | Dynamic |
|------------------------|-----------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| uri                    | Absolute file path of the directory.                                                                |               | STRING              | No       | Yes     |
| include.by.regexp      | Only the files matching the patterns will be searched. Note: Add an empty string to match all files |               | STRING              | Yes      | Yes     |
| exclude.subdirectories | This flag is used to exclude the files un subdirectories when listing.                              | false         | BOOL                | Yes      | No      |

Extra Return Attributes

| Name         | Description                                 | Possible Types |
|--------------|---------------------------------------------|----------------|
| fileNameList | The lit file name matches in the directory. | OBJECT         |

EXAMPLE 1

    ListFileStream#file:search(filePath)

This will list all the files (also in sub-folders) in a given path.

EXAMPLE 2
```js
    ListFileStream#file:search(filePath, '.*test3.txt$')
```

This will list all the files (also in sub-folders) which adheres to a given regex file pattern in a given path.

EXAMPLE 3
```js
    ListFileStream#file:search(filePath, '.*test3.txt$', true)
```

This will list all the files excluding the files in sub-folders which adheres to a given regex file pattern in a given path.

### searchInArchive (Stream Function)

This.

Syntax

    file:searchInArchive(<STRING> uri)
    file:searchInArchive(<STRING> uri, <STRING> include.by.regexp)

QUERY PARAMETERS

| Name              | Description                                                                                         | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|-----------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| uri               | Absolute file path of the zip or tar file.                                                          |               | STRING              | No       | Yes     |
| include.by.regexp | Only the files matching the patterns will be searched. Note: Add an empty string to match all files |               | STRING              | Yes      | No      |

Extra Return Attributes

| Name         | Description                               | Possible Types |
|--------------|-------------------------------------------|----------------|
| fileNameList | The list file names in the archived file. | OBJECT         |

EXAMPLE 1

    ListArchivedFileStream#file:listFilesInArchive(filePath)

Lists the files inside the compressed file in the given path.

EXAMPLE 2
```js
    ListArchivedFileStream#file:listFilesInArchive(filePath, '.*test3.txt$')
```

Filters file names adheres to the given regex and lists the files inside the compressed file in the given path.

### unarchive (Stream Function)

This function decompresses a given file

Syntax

    file:unarchive(<STRING> uri, <STRING> destination.dir.uri)
    file:unarchive(<STRING> uri, <STRING> destination.dir.uri, <BOOL> exclude.root.dir)

QUERY PARAMETERS

| Name                | Description                                                                                                   | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------|---------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| uri                 | Absolute path of the file to be decompressed in the format of zip or tar.                                     |               | STRING              | No       | Yes     |
| destination.dir.uri | Absolute path of the destination directory. Note: If the folder structure does not exist, it will be created. |               | STRING              | No       | Yes     |
| exclude.root.dir    | This flag excludes parent folder when extracting the content.                                                 | false         | BOOL                | Yes      | No      |

EXAMPLE 1

    file:unarchive('/User/gdn/source/test.zip', '/User/gdn/destination')

Unarchive a zip file in a given path to a given destination.

EXAMPLE 2

    file:unarchive('/User/gdn/source/test.tar', '/User/gdn/destination')

Unarchive a tar file in a given path to a given destination.

EXAMPLE 3

    file:unarchive('/User/gdn/source/test.tar', '/User/gdn/destination', true)

Unarchive a tar file in a given path to a given destination excluding the root folder.

Js
--

### eval (Function)

This extension evaluates a given string and return the output according to the user specified data type.

Syntax

    <INT|LONG|DOUBLE|FLOAT|STRING|BOOL> js:eval(<STRING> expression, <STRING> return.type)

QUERY PARAMETERS

| Name        | Description                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|-------------|----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| expression  | Any single line js expression or function.                                                               |               | STRING              | No       | Yes     |
| return.type | The return type of the evaluated expression. Supported types are int\|long\|float\|double\|bool\|string. |               | STRING              | No       | No      |

EXAMPLE 1

    js:eval("700 > 800", 'bool')

In this example, the expression 700 \> 800 will be evaluated and return result as false because user specified return type as bool.

Json
----

### group (Aggregate Function)

This function aggregates the JSON elements and returns a JSON object by adding enclosing.element if it is provided. If enclosing.element is not provided it aggregate the JSON elements returns a JSON array.

Syntax

    <OBJECT> json:group(<STRING|OBJECT> json)
    <OBJECT> json:group(<STRING|OBJECT> json, <BOOL> distinct)
    <OBJECT> json:group(<STRING|OBJECT> json, <STRING> enclosing.element)
    <OBJECT> json:group(<STRING|OBJECT> json, <STRING> enclosing.element, <BOOL> distinct)

QUERY PARAMETERS

| Name              | Description                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| json              | The JSON element that needs to be aggregated.                                                            |               | STRING OBJECT       | No       | Yes     |
| enclosing.element | The JSON element used to enclose the aggregated JSON elements.                                           | EMPTY\_STRING | STRING              | Yes      | Yes     |
| distinct          | This is used to only have distinct JSON elements in the concatenated JSON object/array that is returned. | false         | BOOL                | Yes      | Yes     |

EXAMPLE 1

    select json:group("json") as groupedJSONArray
    from InputStream#window.length(5)
    input OutputStream;

When we input events having values for the `json` as
`{"date":"2013-11-19","time":"10:30"}` and
`{"date":"2013-11-19","time":"12:20"}`, it returns
`[{"date":"2013-11-19","time":"10:30"}{"date":"2013-11-19","time":"12:20"}]`
to the `OutputStream`.

EXAMPLE 2

    select json:group("json", true) as groupedJSONArray
    from InputStream#window.length(5)
    input OutputStream;

When we input events having values for the `json` as
`{"date":"2013-11-19","time":"10:30"}` and
`{"date":"2013-11-19","time":"10:30"}`, it returns
`[{"date":"2013-11-19","time":"10:30"}]` to the `OutputStream`.

EXAMPLE 3

    select json:group("json", "result") as groupedJSONArray
    from InputStream#window.length(5)
    input OutputStream;

When we input events having values for the `json` as
`{"date":"2013-11-19","time":"10:30"}` and
`{"date":"2013-11-19","time":"12:20"}`, it returns
`{"result":[{"date":"2013-11-19","time":"10:30"},{"date":"2013-11-19","time":"12:20"}}`
to the `OutputStream`.

EXAMPLE 4

    select json:group("json", "result", true) as groupedJSONArray
    from InputStream#window.length(5)
    input OutputStream;

When we input events having values for the `json` as `{"date":"2013-11-19","time":"10:30"}` and `{"date":"2013-11-19","time":"10:30"}`, it returns `{"result":[{"date":"2013-11-19","time":"10:30"}]}` to the `OutputStream`.

### groupAsObject (Aggregate Function)

This function aggregates the JSON elements and returns a JSON object by adding enclosing.element if it is provided. If enclosing.element is not provided it aggregate the JSON elements returns a JSON array.

Syntax

    <OBJECT> json:groupAsObject(<STRING|OBJECT> json)
    <OBJECT> json:groupAsObject(<STRING|OBJECT> json, <BOOL> distinct)
    <OBJECT> json:groupAsObject(<STRING|OBJECT> json, <STRING> enclosing.element)
    <OBJECT> json:groupAsObject(<STRING|OBJECT> json, <STRING> enclosing.element, <BOOL> distinct)

QUERY PARAMETERS

| Name              | Description                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| json              | The JSON element that needs to be aggregated.                                                            |               | STRING OBJECT       | No       | Yes     |
| enclosing.element | The JSON element used to enclose the aggregated JSON elements.                                           | EMPTY\_STRING | STRING              | Yes      | Yes     |
| distinct          | This is used to only have distinct JSON elements in the concatenated JSON object/array that is returned. | false         | BOOL                | Yes      | Yes     |

EXAMPLE 1

    select json:groupAsObject("json") as groupedJSONArray
    from InputStream#window.length(5)
    input OutputStream;

When we input events having values for the `json` as `{"date":"2013-11-19","time":"10:30"}` and `{"date":"2013-11-19","time":"12:20"}`, it returns `[{"date":"2013-11-19","time":"10:30"}{"date":"2013-11-19","time":"12:20"}]` to the `OutputStream`.

EXAMPLE 2

    select json:groupAsObject("json", true) as groupedJSONArray
    from InputStream#window.length(5)
    input OutputStream;

When we input events having values for the `json` as `{"date":"2013-11-19","time":"10:30"}` and `{"date":"2013-11-19","time":"10:30"}`, it returns `[{"date":"2013-11-19","time":"10:30"}]` to the `OutputStream`.

EXAMPLE 3

    select json:groupAsObject("json", "result") as groupedJSONArray
    from InputStream#window.length(5)
    input OutputStream;

When we input events having values for the `json` as `{"date":"2013-11-19","time":"10:30"}` and `{"date":"2013-11-19","time":"12:20"}`, it returns `{"result":[{"date":"2013-11-19","time":"10:30"},{"date":"2013-11-19","time":"12:20"}}` to the `OutputStream`.

EXAMPLE 4

    select json:groupAsObject("json", "result", true) as groupedJSONArray
    from InputStream#window.length(5)
    input OutputStream;

When we input events having values for the `json` as `{"date":"2013-11-19","time":"10:30"}` and `{"date":"2013-11-19","time":"10:30"}`, it returns `{"result":[{"date":"2013-11-19","time":"10:30"}]}` to the `OutputStream`.

### getBool (Function)

Function retrieves the `boolean` value specified in the given path of the JSON element.

Syntax

    <BOOL> json:getBool(<STRING|OBJECT> json, <STRING> path)

QUERY PARAMETERS

| Name | Description                               | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing boolean value.  |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to fetch the boolean value. |               | STRING              | No       | Yes     |

EXAMPLE 1

    json:getBool(json,'$.married')

If the `json` is the format `{'name' : 'John', 'married' : true}`, the function returns `true` as there is a matching boolean at `$.married`.

EXAMPLE 2

    json:getBool(json,'$.name')

If the `json` is the format `{'name' : 'John', 'married' : true}`, the function returns `null` as there is no matching boolean at `$.name`.

EXAMPLE 3

    json:getBool(json,'$.foo')

If the `json` is the format `{'name' : 'John', 'married' : true}`, the function returns `null` as there is no matching element at `$.foo`.

### getDouble (Function)

Function retrieves the `double` value specified in the given path of the JSON element.

Syntax

    <DOUBLE> json:getDouble(<STRING|OBJECT> json, <STRING> path)

QUERY PARAMETERS

| Name | Description                              | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing double value.  |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to fetch the double value. |               | STRING              | No       | Yes     |

EXAMPLE 1

    json:getDouble(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'salary' : 12000.0}`, the function returns `12000.0` as there is a matching double at `$.salary`.

EXAMPLE 2

    json:getDouble(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `null` as there are no matching element at `$.salary`.

EXAMPLE 3

    json:getDouble(json,'$.name')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `null` as there are no matching double at `$.name`.

### getFloat (Function)

Function retrieves the `float` value specified in the given path of the JSON element.

Syntax

    <FLOAT> json:getFloat(<STRING|OBJECT> json, <STRING> path)

QUERY PARAMETERS

| Name | Description                             | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing float value.  |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to fetch the float value. |               | STRING              | No       | Yes     |

EXAMPLE 1

    json:getFloat(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'salary' : 12000.0}`, th function returns `12000` as there is a matching float at `$.salary`.

EXAMPLE 2

    json:getFloat(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `null` as there are no matching element at `$.salary`.

EXAMPLE 3

    json:getFloat(json,'$.name')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `null` as there are no matching float at `$.name`.

### getInt (Function)

Function retrieves the `int` value specified in the given path of the JSON element.

Syntax

    <INT> json:getInt(<STRING|OBJECT> json, <STRING> path)

QUERY PARAMETERS

| Name | Description                           | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing int value.  |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to fetch the int value. |               | STRING              | No       | Yes     |

EXAMPLE 1

    json:getInt(json,'$.age')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `23` as there is a matching int at `$.age`.

EXAMPLE 2

    json:getInt(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `null` as there are no matching element at `$.salary`.

EXAMPLE 3

    json:getInt(json,'$.name')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `null` as there are no matching int at `$.name`.

### getLong (Function)

Function retrieves the `long` value specified in the given path of the JSON element.

Syntax

    <LONG> json:getLong(<STRING|OBJECT> json, <STRING> path)

QUERY PARAMETERS

| Name | Description                            | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing long value.  |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to fetch the long value. |               | STRING              | No       | Yes     |

EXAMPLE 1

    json:getLong(json,'$.age')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `23` as there is a matching long at `$.age`.

EXAMPLE 2

    json:getLong(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `null` as there are no matching element at `$.salary`.

EXAMPLE 3

    json:getLong(json,'$.name')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `null` as there are no matching long at `$.name`.

### getObject (Function)

Function retrieves the object specified in the given path of the JSON element.

Syntax

    <OBJECT> json:getObject(<STRING|OBJECT> json, <STRING> path)

QUERY PARAMETERS

| Name | Description                           | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing the object. |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to fetch the object.    |               | STRING              | No       | Yes     |

EXAMPLE 1

    json:getObject(json,'$.address')

If the `json` is the format `{'name' : 'John', 'address' : {'city' : 'NY', 'country' : 'USA'}}`, the function returns `{'city' : 'NY', 'country' : 'USA'}` as there is a matching object at `$.address`.

EXAMPLE 2

    json:getObject(json,'$.age')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `23` as there is a matching object at `$.age`.

EXAMPLE 3

    json:getObject(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `null` as there are no matching element at `$.salary`.

### getString (Function)

Function retrieves value specified in the given path of the JSON element as a string.

Syntax

    <STRING> json:getString(<STRING|OBJECT> json, <STRING> path)

QUERY PARAMETERS

| Name | Description                       | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing value.  |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to fetch the value. |               | STRING              | No       | Yes     |

EXAMPLE 1

    json:getString(json,'$.name')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `John` as there is a matching string at `$.name`.

EXAMPLE 2

    json:getString(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `null` as there are no matching element at `$.salary`.

EXAMPLE 3

    json:getString(json,'$.age')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `23` as a string as there is a matching element at `$.age`.

EXAMPLE 4

    json:getString(json,'$.address')

If the `json` is the format `{'name' : 'John', 'address' : {'city' : 'NY', 'country' : 'USA'}}`, the function returns `{'city' : 'NY', 'country' : 'USA'}` as a string as there is a matching element at `$.address`.

### isExists (Function)

Function checks whether there is a JSON element present in the given path or not.

Syntax

    <BOOL> json:isExists(<STRING|OBJECT> json, <STRING> path)

QUERY PARAMETERS

| Name | Description                                               | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input that needs to be searched for an elements. |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to check for the element.                   |               | STRING              | No       | Yes     |

EXAMPLE 1

    json:isExists(json, '$.name')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `true` as there is an element in the given path.

EXAMPLE 2

    json:isExists(json, '$.salary')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `false` as there is no element in the given path.

### setElement (Function)

Function sets JSON element into a given JSON at the specific path.

Syntax

    <OBJECT> json:setElement(<STRING|OBJECT> json, <STRING> path, <STRING|BOOL|DOUBLE|FLOAT|INT|LONG|OBJECT> json.element)
    <OBJECT> json:setElement(<STRING|OBJECT> json, <STRING> path, <STRING|BOOL|DOUBLE|FLOAT|INT|LONG|OBJECT> json.element, <STRING> key)

QUERY PARAMETERS

| Name         | Description                                                            | Default Value                                                                                           | Possible Data Types                      | Optional | Dynamic |
|--------------|------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|------------------------------------------|----------|---------|
| json         | The JSON to which a JSON element needs to be added/replaced.           |                                                                                                         | STRING OBJECT                            | No       | Yes     |
| path         | The JSON path where the JSON element should be added/replaced.         |                                                                                                         | STRING                                   | No       | Yes     |
| json.element | The JSON element being added.                                          |                                                                                                         | STRING BOOL DOUBLE FLOAT INT LONG OBJECT | No       | Yes     |
| key          | The key to be used to refer the newly added element in the input JSON. | Assumes the element is added to a JSON array, or the element selected by the JSON path will be updated. | STRING                                   | Yes      | Yes     |

EXAMPLE 1

    json:setElement(json, '$', "{'country' : 'USA'}", 'address')

If the `json` is the format `{'name' : 'John', 'married' : true}`,the function updates the `json` as `{'name' : 'John', 'married' : true, 'address' : {'country' : 'USA'}}` by adding `address` element and returns the updated JSON.

EXAMPLE 2

    json:setElement(json, '$', 40, 'age')

If the `json` is the format `{'name' : 'John', 'married' : true}`,the function updates the `json` as `{'name' : 'John', 'married' : true, 'age' : 40}` by adding `age` element and returns the updated JSON.

EXAMPLE 3

    json:setElement(json, '$', 45, 'age')

If the `json` is the format `{'name' : 'John', 'married' : true, 'age' : 40}`, the function updates the `json` as `{'name' : 'John', 'married' : true, 'age' : 45}` by replacing `age` element and returns the updated JSON.

EXAMPLE 4

    json:setElement(json, '$.items', 'book')

If the `json` is the format `{'name' : 'Stationary', 'items' : ['pen', 'pencil']}`, the function updates the `json` as `{'name' : 'John', 'items' : ['pen', 'pencil', 'book']}` by adding `book` in the items array and returns the updated JSON.

EXAMPLE 5

    json:setElement(json, '$.item', 'book')

If the `json` is the format `{'name' : 'Stationary', 'item' : 'pen'}`, the function updates the `json` as `{'name' : 'John', 'item' : 'book'}` by replacing `item` element and returns the updated JSON.

EXAMPLE 6

    json:setElement(json, '$.address', 'city', 'SF')

If the `json` is the format `{'name' : 'John', 'married' : true}`,the function will not update, but returns the original JSON as there are no valid path for `$.address`.

### toObject (Function)

Function generate JSON object from the given JSON string.

Syntax

    <OBJECT> json:toObject(<STRING> json)

QUERY PARAMETERS

| Name | Description                                                      | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------------------------------------------------------|---------------|---------------------|----------|---------|
| json | A valid JSON string that needs to be converted to a JSON object. |               | STRING              | No       | Yes     |

EXAMPLE 1

    json:toJson(json)

This returns the JSON object corresponding to the given JSON string.

### toString (Function)

Function generates a JSON string corresponding to a given JSON object.

Syntax

    <STRING> json:toString(<OBJECT> json)

QUERY PARAMETERS

| Name | Description                                     | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------------------------------------------|---------------|---------------------|----------|---------|
| json | A valid JSON object to generates a JSON string. |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    json:toString(json)

This returns the JSON string corresponding to a given JSON object.

### tokenize (Stream Processor)

Stream processor tokenizes the given JSON into to multiple JSON string elements and sends them as separate events.

Syntax

    json:tokenize(<STRING|OBJECT> json, <STRING> path)
    json:tokenize(<STRING|OBJECT> json, <STRING> path, <BOOL> fail.on.missing.attribute)

QUERY PARAMETERS

| Name                      | Description                                                                                                                                                                                    | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| json                      | The input JSON that needs to be tokenized.                                                                                                                                                     |               | STRING OBJECT       | No       | Yes     |
| path                      | The path of the set of elements that will be tokenized.                                                                                                                                        |               | STRING              | No       | Yes     |
| fail.on.missing.attribute | If there are no element on the given path, when set to `true` the system will drop the event, and when set to `false` the system will pass `null` value to the jsonElement output attribute. | true          | BOOL                | Yes      | No      |

Extra Return Attributes

| Name        | Description                                                                                                                                                                                                          | Possible Types |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| jsonElement | The JSON element retrieved based on the given path will be returned as a JSON string. If the `path` selects a JSON array then the system returns each element in the array as a JSON string via a separate events. | STRING         |

EXAMPLE 1

    define stream InputStream (json string, path string);

    @info(name = 'query1')
    select path, jsonElement
    from InputStream#json:tokenizeAsObject(json, path)
    insert into OutputStream;

If the input `json` is `{name:'John', enrolledSubjects:['Mathematics', 'Physics']}`, and the `path` is passed as `$.enrolledSubjects` then for both the elements in the selected JSON array, it generates it generates events as `('$.enrolledSubjects', 'Mathematics')`, and `('$.enrolledSubjects', 'Physics')`. For the same input JSON, if the `path` is passed as `$.name` then it will only produce one event `('$.name', 'John')` as the `path` provided a single JSON element.

EXAMPLE 2

    define stream InputStream (json string, path string);

    @info(name = 'query1')
    select path, jsonElement
    from InputStream#json:tokenizeAsObject(json, path, true)
    insert into OutputStream;

If the input `json` is `{name:'John', age:25}`,and the `path` is passed as `$.salary` then the system will produce `('$.salary', null)`, as the `fail.on.missing.attribute` is `true` and there are no matching element for `$.salary`.

### tokenizeAsObject (Stream Processor)

Stream processor tokenizes the given JSON into to multiple JSON object elements and sends them as separate events.

Syntax

    json:tokenizeAsObject(<STRING|OBJECT> json, <STRING> path)
    json:tokenizeAsObject(<STRING|OBJECT> json, <STRING> path, <BOOL> fail.on.missing.attribute)

QUERY PARAMETERS

| Name                      | Description                                                                                                                                                                                    | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| json                      | The input JSON that needs to be tokenized.                                                                                                                                                     |               | STRING OBJECT       | No       | Yes     |
| path                      | The path of the set of elements that will be tokenized.                                                                                                                                        |               | STRING              | No       | Yes     |
| fail.on.missing.attribute | If there are no element on the given path, when set to `true` the system will drop the event, and when set to `false` the system will pass `null` value to the jsonElement output attribute. | true          | BOOL                | Yes      | No      |

Extra Return Attributes

| Name        | Description                                                                                                                                                                                                          | Possible Types |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| jsonElement | The JSON element retrieved based on the given path will be returned as a JSON object. If the `path` selects a JSON array then the system returns each element in the array as a JSON object via a separate events. | OBJECT         |

EXAMPLE 1

    define stream InputStream (json string, path string);

    @info(name = 'query1')
    select path, jsonElement
    from InputStream#json:tokenizeAsObject(json, path)
    insert into OutputStream;

If the input `json` is `{name:'John', enrolledSubjects:['Mathematics', 'Physics']}`, and the `path` is passed as `$.enrolledSubjects` then for both the elements in the selected JSON array, it generates it generates events as `('$.enrolledSubjects', 'Mathematics')`, and `('$.enrolledSubjects', 'Physics')`. For the same input JSON, if the `path` is passed as `$.name` then it will only produce one event `('$.name', 'John')` as the `path` provided a single JSON element.

EXAMPLE 2

    define stream InputStream (json string, path string);

    @info(name = 'query1')
    select path, jsonElement
    from InputStream#json:tokenizeAsObject(json, path, true)
    insert into OutputStream;

If the input `json` is `{name:'John', age:25}`,and the `path` is passed as `$.salary` then the system will produce `('$.salary', null)`, as the `fail.on.missing.attribute` is `true` and there are no matching element for `$.salary`.

List
----

### collect (Aggregate Function)

Collects multiple values to construct a list.

Syntax

    <OBJECT> list:collect(<OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)
    <OBJECT> list:collect(<OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value, <BOOL> is.distinct)

QUERY PARAMETERS

| Name        | Description                                    | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------------|------------------------------------------------|---------------|------------------------------------------|----------|---------|
| value       | Value of the list element                      |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |
| is.distinct | If `true` only distinct elements are collected | false         | BOOL                                     | Yes      | Yes     |

EXAMPLE 1

    select list:collect(symbol) as stockSymbols
    from StockStream#window.lengthBatch(10)
    insert into OutputStream;

For the window expiry of 10 events, the collect() function will collect attributes of `symbol` to a single list and return as stockSymbols.

### merge (Aggregate Function)

Collects multiple lists to merge as a single list.

Syntax

    <OBJECT> list:merge(<OBJECT> list)
    <OBJECT> list:merge(<OBJECT> list, <BOOL> is.distinct)

QUERY PARAMETERS

| Name        | Description                                 | Default Value | Possible Data Types | Optional | Dynamic |
|-------------|---------------------------------------------|---------------|---------------------|----------|---------|
| list        | List to be merged                           |               | OBJECT              | No       | Yes     |
| is.distinct | Whether to return list with distinct values | false         | BOOL                | Yes      | Yes     |

EXAMPLE 1

    select list:merge(list) as stockSymbols
    from StockStream#window.lengthBatch(2)
    insert into OutputStream;

For the window expiry of 2 events, the merge() function will collect attributes of `list` and merge them to a single list, returned as stockSymbols.

### add (Function)

Function returns the updated list after adding the given value.

Syntax

    <OBJECT> list:add(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)
    <OBJECT> list:add(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value, <INT> index)

QUERY PARAMETERS

| Name  | Description                                      | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------|--------------------------------------------------|---------------|------------------------------------------|----------|---------|
| list  | The list to which the value should be added.     |               | OBJECT                                   | No       | Yes     |
| value | The value to be added.                           |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |
| index | The index in which the value should to be added. | last          | INT                                      | Yes      | Yes     |

EXAMPLE 1

    list:add(stockSymbols, 'IBM')

Function returns the updated list after adding the value `IBM` in the last index.

EXAMPLE 2

    list:add(stockSymbols, 'IBM', 0)

Function returns the updated list after adding the value `IBM` in the 0th index\`.

### addAll (Function)

Function returns the updated list after adding all the values from the given list.

Syntax

    <OBJECT> list:addAll(<OBJECT> to.list, <OBJECT> from.list)
    <OBJECT> list:addAll(<OBJECT> to.list, <OBJECT> from.list, <BOOL> is.distinct)

QUERY PARAMETERS

| Name        | Description                                    | Default Value | Possible Data Types | Optional | Dynamic |
|-------------|------------------------------------------------|---------------|---------------------|----------|---------|
| to.list     | The list into which the values need to copied. |               | OBJECT              | No       | Yes     |
| from.list   | The list from which the values are copied.     |               | OBJECT              | No       | Yes     |
| is.distinct | If `true` returns list with distinct values    | false         | BOOL                | Yes      | Yes     |

EXAMPLE 1

    list:putAll(toList, fromList)

If `toList` contains values (`IBM`, `gdn`), and if `fromList` contains values (`IBM`, `XYZ`) then the function returns updated `toList` with values (`IBM`, `gdn`, `IBM`, `XYZ`).

EXAMPLE 2

    list:putAll(toList, fromList, true)

If `toList` contains values (`IBM`, `gdn`), and if `fromList` contains values (`IBM`, `XYZ`) then the function returns updated `toList` with values (`IBM`, `gdn`, `XYZ`).

### clear (Function)

Function returns the cleared list.

Syntax

    <OBJECT> list:clear(<OBJECT> list)

QUERY PARAMETERS

| Name | Description                        | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------------------------|---------------|---------------------|----------|---------|
| list | The list which needs to be cleared |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    list:clear(stockDetails)

Returns an empty list.

### clone (Function)

Function returns the cloned list.

Syntax

    <OBJECT> list:clone(<OBJECT> list)

QUERY PARAMETERS

| Name | Description                           | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------|---------------|---------------------|----------|---------|
| list | The list to which needs to be cloned. |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    list:clone(stockSymbols)

Function returns cloned list of stockSymbols.

### contains (Function)

Function checks whether the list contains the specific value.

Syntax

    <BOOL> list:contains(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

QUERY PARAMETERS

| Name  | Description                                                                | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------|----------------------------------------------------------------------------|---------------|------------------------------------------|----------|---------|
| list  | The list that needs to be checked on whether it contains the value or not. |               | OBJECT                                   | No       | Yes     |
| value | The value that needs to be checked.                                        |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

EXAMPLE 1

    list:contains(stockSymbols, 'IBM')

Returns `true` if the stockSymbols list contains value `IBM` else it returns `false`.

### containsAll (Function)

Function checks whether the list contains all the values in the given list.

Syntax

    <BOOL> list:containsAll(<OBJECT> list, <OBJECT> given.list)

QUERY PARAMETERS

| Name       | Description                                                                     | Default Value | Possible Data Types | Optional | Dynamic |
|------------|---------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| list       | The list that needs to be checked on whether it contains all the values or not. |               | OBJECT              | No       | Yes     |
| given.list | The list which contains all the values to be checked.                           |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    list:containsAll(stockSymbols, latestStockSymbols)

Returns `true` if the stockSymbols list contains values in latestStockSymbols else it returns `false`.

### create (Function)

Function creates a list containing all values provided.

Syntax

    <OBJECT> list:create()
    <OBJECT> list:create(<OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value1)
    <OBJECT> list:create(<OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value1, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> ...)

QUERY PARAMETERS

| Name   | Description | Default Value | Possible Data Types                      | Optional | Dynamic |
|--------|-------------|---------------|------------------------------------------|----------|---------|
| value1 | Value 1     |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | Yes      | Yes     |

EXAMPLE 1

    list:create(1, 2, 3, 4, 5, 6)

This returns a list with values `1`, `2`, `3`, `4`, `5` and `6`.

EXAMPLE 2

    list:create()

This returns an empty list.

### get (Function)

Function returns the value at the specific index, null if index is out of range.

Syntax

    <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> list:get(<OBJECT> list, <INT> index)

QUERY PARAMETERS

| Name  | Description                   | Default Value | Possible Data Types | Optional | Dynamic |
|-------|-------------------------------|---------------|---------------------|----------|---------|
| list  | Attribute containing the list |               | OBJECT              | No       | Yes     |
| index | Index of the element          |               | INT                 | No       | Yes     |

EXAMPLE 1

    list:get(stockSymbols, 1)

This returns the element in the 1st index in the stockSymbols list.

### indexOf (Function)

Function returns the last index of the given element.

Syntax

    <INT> list:indexOf(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

QUERY PARAMETERS

| Name  | Description                                        | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------|----------------------------------------------------|---------------|------------------------------------------|----------|---------|
| list  | The list to be checked to get index of an element. |               | OBJECT                                   | No       | Yes     |
| value | Value for which last index needs to be identified. |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

EXAMPLE 1

    list:indexOf(stockSymbols. `IBM`)

Returns the last index of the element `IBM` if present else it returns -1.

### isEmpty (Function)

Function checks if the list is empty.

Syntax

    <BOOL> list:isEmpty(<OBJECT> list)

QUERY PARAMETERS

| Name | Description                                                   | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------------------------------|---------------|---------------------|----------|---------|
| list | The list that needs to be checked whether it's empty or not. |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    list:isEmpty(stockSymbols)

Returns `true` if the stockSymbols list is empty else it returns `false`.

### isList (Function)

Function checks if the object is type of a list.

Syntax

    <BOOL> list:isList(<OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> arg)

QUERY PARAMETERS

| Name | Description                                                         | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|---------------------------------------------------------------------|---------------|------------------------------------------|----------|---------|
| arg  | The argument the need to be determined whether it`s a list or not. |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

EXAMPLE 1

    list:isList(stockSymbols)

Returns `true` if the stockSymbols is and an instance of `java.util.List` else it returns `false`.
 
### lastIndexOf (Function)

Function returns the index of the given value.

Syntax

    <INT> list:lastIndexOf(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

QUERY PARAMETERS

| Name  | Description                                        | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------|----------------------------------------------------|---------------|------------------------------------------|----------|---------|
| list  | The list to be checked to get index of an element. |               | OBJECT                                   | No       | Yes     |
| value | Value for which last index needs to be identified. |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

EXAMPLE 1

    list:lastIndexOf(stockSymbols. `IBM`)

Returns the last index of the element `IBM` if present else it returns -1.

### remove (Function)

Function returns the updated list after removing the element with the specified value.

Syntax

    <OBJECT> list:remove(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

QUERY PARAMETERS

| Name  | Description                                     | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------|-------------------------------------------------|---------------|------------------------------------------|----------|---------|
| list  | The list that needs to be updated.              |               | OBJECT                                   | No       | Yes     |
| value | The value of the element that needs to removed. |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

EXAMPLE 1

    list:remove(stockSymbols, 'IBM')

This returns the updated list, stockSymbols after stockSymbols the value `IBM`.

### removeAll (Function)

Function returns the updated list after removing all the element with the specified list.

Syntax

    <OBJECT> list:removeAll(<OBJECT> list, <OBJECT> given.list)

QUERY PARAMETERS

| Name       | Description                                           | Default Value | Possible Data Types | Optional | Dynamic |
|------------|-------------------------------------------------------|---------------|---------------------|----------|---------|
| list       | The list that needs to be updated.                    |               | OBJECT              | No       | Yes     |
| given.list | The list with all the elements that needs to removed. |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    list:removeAll(stockSymbols, latestStockSymbols)

This returns the updated list, stockSymbols after removing all the
values in latestStockSymbols.

### removeByIndex (Function)

Function returns the updated list after removing the element with the specified index.

Syntax

    <OBJECT> list:removeByIndex(<OBJECT> list, <INT> index)

QUERY PARAMETERS

| Name  | Description                                     | Default Value | Possible Data Types | Optional | Dynamic |
|-------|-------------------------------------------------|---------------|---------------------|----------|---------|
| list  | The list that needs to be updated.              |               | OBJECT              | No       | Yes     |
| index | The index of the element that needs to removed. |               | INT                 | No       | Yes     |

EXAMPLE 1

    list:removeByIndex(stockSymbols, 0)

This returns the updated list, stockSymbols after removing value at 0 th index.

### retainAll (Function)

Function returns the updated list after retaining all the elements in the specified list.

Syntax

    <OBJECT> list:retainAll(<OBJECT> list, <OBJECT> given.list)

QUERY PARAMETERS

| Name       | Description                                            | Default Value | Possible Data Types | Optional | Dynamic |
|------------|--------------------------------------------------------|---------------|---------------------|----------|---------|
| list       | The list that needs to be updated.                     |               | OBJECT              | No       | Yes     |
| given.list | The list with all the elements that needs to reatined. |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    list:retainAll(stockSymbols, latestStockSymbols)

This returns the updated list, stockSymbols after retaining all the values in latestStockSymbols.

### setValue (Function)

Function returns the updated list after replacing the element in the given index by the given value.

Syntax

    <OBJECT> list:setValue(<OBJECT> list, <INT> index, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

QUERY PARAMETERS

| Name  | Description                                        | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------|----------------------------------------------------|---------------|------------------------------------------|----------|---------|
| list  | The list to which the value should be updated.     |               | OBJECT                                   | No       | Yes     |
| index | The index in which the value should to be updated. |               | INT                                      | No       | Yes     |
| value | The value to be updated with.                      |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

EXAMPLE 1

    list:set(stockSymbols, 0, 'IBM')

Function returns the updated list after replacing the value at 0th index with the value `IBM`

### size (Function)

Function to return the size of the list.

Syntax

    <INT> list:size(<OBJECT> list)

QUERY PARAMETERS

| Name | Description                                 | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------------|---------------|---------------------|----------|---------|
| list | The list for which size should be returned. |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    list:size(stockSymbols)

Returns size of the `stockSymbols` list.

### sort (Function)

Function returns lists sorted in ascending or descending order.

Syntax

    <OBJECT> list:sort(<OBJECT> list)
    <OBJECT> list:sort(<OBJECT> list, <STRING> order)

QUERY PARAMETERS

| Name  | Description                                                | Default Value | Possible Data Types | Optional | Dynamic |
|-------|------------------------------------------------------------|---------------|---------------------|----------|---------|
| list  | The list which should be sorted.                           |               | OBJECT              | No       | Yes     |
| order | Order in which the list needs to be sorted (ASC/DESC/REV). | REV           | STRING              | Yes      | No      |

EXAMPLE 1

    list:sort(stockSymbols)

Function returns the sorted list in ascending order.

EXAMPLE 2

    list:sort(stockSymbols, 'DESC')

Function returns the sorted list in descending order.

### tokenize (Stream Processor)

Tokenize the list and return each key, value as new attributes in events

Syntax

    list:tokenize(<OBJECT> list)
    list:tokenize(<OBJECT> list, <OBJECT> ...)

QUERY PARAMETERS

| Name | Description                            | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------------------------------|---------------|---------------------|----------|---------|
| list | Array list which needs to be tokenized |               | OBJECT              | No       | Yes     |

Extra Return Attributes

| Name  | Description                             | Possible Types |
|-------|-----------------------------------------|----------------|
| index | Index of an entry consisted in the list | INT            |
| value | Value of an entry consisted in the list | OBJECT         |

EXAMPLE 1

    list:tokenize(customList)

If custom list contains (`gdn`, `IBM`, `XYZ`) elements, then tokenize function will return 3 events with value attributes gdn, IBM and XYZ respectively.

Map
---

### collect (Aggregate Function)

Collect multiple key-value pairs to construct a map. Only distinct keys are collected, if a duplicate key arrives, it overrides the old value

Syntax

    <OBJECT> map:collect(<INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

QUERY PARAMETERS

| Name  | Description            | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------|------------------------|---------------|------------------------------------------|----------|---------|
| key   | Key of the map entry   |               | INT LONG FLOAT DOUBLE FLOAT BOOL STRING  | No       | Yes     |
| value | Value of the map entry |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

EXAMPLE 1

    select map:collect(symbol, price) as stockDetails
    from StockStream#window.lengthBatch(10)
    insert into OutputStream;

For the window expiry of 10 events, the collect() function will collectattributes of `key` and `value` to a single map and return as stockDetails.

### merge (Aggregate Function)

Collect multiple maps to merge as a single map. Only distinct keys are collected, if a duplicate key arrives, it overrides the old value.

Syntax

    <OBJECT> map:merge(<OBJECT> map)

QUERY PARAMETERS

| Name | Description          | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------------|---------------|---------------------|----------|---------|
| map  | Maps to be collected |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    select map:merge(map) as stockDetails
    from StockStream#window.lengthBatch(2)
    insert into OutputStream;

For the window expiry of 2 events, the merge() function will collect attributes of `map` and merge them to a single map, returned as stockDetails.

### clear (Function)

Function returns the cleared map.

Syntax

    <OBJECT> map:clear(<OBJECT> map)

QUERY PARAMETERS

| Name | Description                       | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------|---------------|---------------------|----------|---------|
| map  | The map which needs to be cleared |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    map:clear(stockDetails)

Returns an empty map.

### clone (Function)

Function returns the cloned map.

Syntax

    <OBJECT> map:clone(<OBJECT> map)

QUERY PARAMETERS

| Name | Description                          | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------------------------------|---------------|---------------------|----------|---------|
| map  | The map to which needs to be cloned. |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    map:clone(stockDetails)

Function returns cloned map of stockDetails.

### combineByKey (Function)

Function returns the map after combining all the maps given as parameters, such that the keys, of all the maps will be matched with an Array list of values from each map respectively.

Syntax

    <OBJECT> map:combineByKey(<OBJECT> map, <OBJECT> map)
    <OBJECT> map:combineByKey(<OBJECT> map, <OBJECT> map, <OBJECT> ...)

QUERY PARAMETERS

| Name | Description                                       | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------------------|---------------|---------------------|----------|---------|
| map  | The map into which the key-values need to copied. |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    map:combineByKey(map1, map2)

If `map2` contains key-value pairs (`symbol`: `gdn`), (`volume` :100), and if `map2` contains key-value pairs (`symbol`: `IBM`),(`price` : 12), then the function returns the map with key value pairs as follows, (symbol: ArrayList(`gdn`, `IBM`)), (volume: ArrayList(100, null)) and (price: ArrayList(null, 12))

### containsKey (Function)

Function checks if the map contains the key.

Syntax

    <BOOL> map:containsKey(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> key)

QUERY PARAMETERS

| Name | Description                                                   | Default Value | Possible Data Types               | Optional | Dynamic |
|------|---------------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| map  | The map the needs to be checked on containing the key or not. |               | OBJECT                            | No       | Yes     |
| key  | The key to be checked.                                        |               | INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

EXAMPLE 1

    map:containsKey(stockDetails, '1234')

Returns `true` if the stockDetails map contains key `1234` else it returns `false`.

### containsValue (Function)

Function checks if the map contains the value.

Syntax

    <BOOL> map:containsValue(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

QUERY PARAMETERS

| Name  | Description                                                     | Default Value | Possible Data Types               | Optional | Dynamic |
|-------|-----------------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| map   | The map the needs to be checked on containing the value or not. |               | OBJECT                            | No       | Yes     |
| value | The value to be checked.                                        |               | INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

EXAMPLE 1

    map:containsValue(stockDetails, 'IBM')

Returns `true` if the stockDetails map contains value `IBM` else it returns `false`.

### create (Function)

Function creates a map pairing the keys and their corresponding values.

Syntax

    <OBJECT> map:create()
    <OBJECT> map:create(<OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key1, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> value1)
    <OBJECT> map:create(<OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key1, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> value1, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> ...)

QUERY PARAMETERS

| Name   | Description | Default Value | Possible Data Types                            | Optional | Dynamic |
|--------|-------------|---------------|------------------------------------------------|----------|---------|
| key1   | Key 1       | \-            | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | Yes      | Yes     |
| value1 | Value 1     | \-            | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | Yes      | Yes     |

EXAMPLE 1

    map:create(1, 'one', 2, 'two', 3, 'three')

This returns a map with keys `1`, `2`, `3` mapped with their corresponding values, `one`, `two`, `three`.

EXAMPLE 2

    map:create()

This returns an empty map.

### createFromJSON (Function)

Function returns the map created by pairing the keys with their corresponding values given in the JSON string.

Syntax

    <OBJECT> map:createFromJSON(<STRING> json.string)

QUERY PARAMETERS

| Name        | Description                                        | Default Value | Possible Data Types | Optional | Dynamic |
|-------------|----------------------------------------------------|---------------|---------------------|----------|---------|
| json.string | JSON as a string, which is used to create the map. |               | STRING              | No       | Yes     |

EXAMPLE 1

    map:createFromJSON("{â€˜symbol' : 'IBM', 'price' : 200, 'volume' : 100}")

This returns a map with the keys `symbol`, `price`, and `volume`, and their values, `IBM`, `200` and `100` respectively.

### createFromXML (Function)

Function returns the map created by pairing the keys with their corresponding values,given as an XML string.

Syntax

    <OBJECT> map:createFromXML(<STRING> xml.string)

QUERY PARAMETERS

| Name       | Description                                      | Default Value | Possible Data Types | Optional | Dynamic |
|------------|--------------------------------------------------|---------------|---------------------|----------|---------|
| xml.string | The XML string, which is used to create the map. |               | STRING              | No       | Yes     |

EXAMPLE 1

    map:createFromXML("<stock>
                          <symbol>IBM</symbol>
                          <price>200</price>
                          <volume>100</volume>
                       </stock>")

This returns a map with the keys `symbol`, `price`, `volume`, and with their values `IBM`, `200` and `100` respectively.

### get (Function)

Function returns the value corresponding to the given key from the map.

Syntax

    <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> map:get(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key)
    <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> map:get(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> default.value)

QUERY PARAMETERS

| Name          | Description                                                | Default Value | Possible Data Types                            | Optional | Dynamic |
|---------------|------------------------------------------------------------|---------------|------------------------------------------------|----------|---------|
| map           | The map from where the value should be obtained.           |               | OBJECT                                         | No       | Yes     |
| key           | The key to fetch the value.                                |               | INT LONG FLOAT DOUBLE FLOAT BOOL STRING        | No       | Yes     |
| default.value | The value to be returned if the map does not have the key. |               | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | Yes      | Yes     |

EXAMPLE 1

    map:get(companyMap, 1)

If the companyMap has key `1` and value `ABC` in it's set of key value pairs. The function returns `ABC`.

EXAMPLE 2

    map:get(companyMap, 2)

If the companyMap does not have any value for key `2` then the function returns `null`.

EXAMPLE 3

    map:get(companyMap, 2, 'two')

If the companyMap does not have any value for key `2` then the function returns `two`.

### isEmpty (Function)

Function checks if the map is empty.

Syntax

    <BOOL> map:isEmpty(<OBJECT> map)

QUERY PARAMETERS

| Name | Description                                                | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------------------------------------------------|---------------|---------------------|----------|---------|
| map  | The map the need to be checked whether it's empty or not. |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    map:isEmpty(stockDetails)

Returns `true` if the stockDetails map is empty else it returns `false`.

### isMap (Function)

Function checks if the object is type of a map.

Syntax

    <BOOL> map:isMap(<OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> arg)

QUERY PARAMETERS

| Name | Description                                                        | Default Value | Possible Data Types                            | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|------------------------------------------------|----------|---------|
| arg  | The argument the need to be determined whether it's a map or not. |               | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | No       | Yes     |

EXAMPLE 1

    map:isMap(stockDetails)

Returns `true` if the stockDetails is and an instance of `java.util.Map` else it returns `false`.

### keys (Function)

Function to return the keys of the map as a list.

Syntax

    <OBJECT> map:keys(<OBJECT> map)

QUERY PARAMETERS

| Name | Description                                     | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------------------------------------------|---------------|---------------------|----------|---------|
| map  | The map from which list of keys to be returned. |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    map:keys(stockDetails)

Returns keys of the `stockDetails` map.

### put (Function)

Function returns the updated map after adding the given key-value pair. If the key already exist in the map the key is updated with the new value.

Syntax

    <OBJECT> map:put(<OBJECT> map, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> value)

QUERY PARAMETERS

| Name  | Description                                 | Default Value | Possible Data Types                            | Optional | Dynamic |
|-------|---------------------------------------------|---------------|------------------------------------------------|----------|---------|
| map   | The map to which the value should be added. |               | OBJECT                                         | No       | Yes     |
| key   | The key to be added.                        |               | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | No       | Yes     |
| value | The value to be added.                      |               | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | No       | Yes     |

EXAMPLE 1

    map:put(stockDetails , 'IBM' , '200')

Function returns the updated map named stockDetails after adding the  value `200` with the key `IBM`.

### putAll (Function)

Function returns the updated map after adding all the key-value pairs from another map. If there are duplicate keys, the key will be assignedn new values from the map that's being copied.

Syntax

    <OBJECT> map:putAll(<OBJECT> to.map, <OBJECT> from.map)

QUERY PARAMETERS

| Name     | Description                                       | Default Value | Possible Data Types | Optional | Dynamic |
|----------|---------------------------------------------------|---------------|---------------------|----------|---------|
| to.map   | The map into which the key-values need to copied. |               | OBJECT              | No       | Yes     |
| from.map | The map from which the key-values are copied.     |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    map:putAll(toMap, fromMap)

If `toMap` contains key-value pairs (`symbol`: `gdn`), (`volume`: 100), and if `fromMap` contains key-value pairs (`symbol`: `IBM`),(`price` : 12), then the function returns updated `toMap` with key-value pairs (`symbol`: `IBM`), (`price` : 12), (`volume` :100).

### putIfAbsent (Function)

Function returns the updated map after adding the given key-value pair if key is absent.

Syntax

    <OBJECT> map:putIfAbsent(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> key, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

QUERY PARAMETERS

| Name  | Description                                 | Default Value | Possible Data Types               | Optional | Dynamic |
|-------|---------------------------------------------|---------------|-----------------------------------|----------|---------|
| map   | The map to which the value should be added. |               | OBJECT                            | No       | Yes     |
| key   | The key to be added.                        |               | INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |
| value | The value to be added.                      |               | INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

EXAMPLE 1

    map:putIfAbsent(stockDetails , 1234 , 'IBM')

Function returns the updated map named stockDetails after adding the value `IBM` with the key `1234` if key is absent from the original map.

### remove (Function)

Function returns the updated map after removing the element with the specified key.

Syntax

    <OBJECT> map:remove(<OBJECT> map, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key)

QUERY PARAMETERS

| Name | Description                                   | Default Value | Possible Data Types                            | Optional | Dynamic |
|------|-----------------------------------------------|---------------|------------------------------------------------|----------|---------|
| map  | The map that needs to be updated.             |               | OBJECT                                         | No       | Yes     |
| key  | The key of the element that needs to removed. |               | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | No       | Yes     |

EXAMPLE 1

    map:remove(stockDetails, 1234)

This returns the updated map, stockDetails after removing the key-value pair corresponding to the key `1234`.

### replace (Function)

Function returns the updated map after replacing the given key-value pair only if key is present.

Syntax

    <OBJECT> map:replace(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

QUERY PARAMETERS

| Name  | Description                                        | Default Value | Possible Data Types                     | Optional | Dynamic |
|-------|----------------------------------------------------|---------------|-----------------------------------------|----------|---------|
| map   | The map to which the key-value should be replaced. |               | OBJECT                                  | No       | Yes     |
| key   | The key to be replaced.                            |               | INT LONG FLOAT DOUBLE FLOAT BOOL STRING | No       | Yes     |
| value | The value to be replaced.                          |               | INT LONG FLOAT DOUBLE BOOL STRING       | No       | Yes     |

EXAMPLE 1

    map:replace(stockDetails , 1234 , 'IBM')

Function returns the updated map named stockDetails after replacing the value `IBM` with the key `1234` if present.

### replaceAll (Function)

Function returns the updated map after replacing all the key-value pairs from another map, if keys are present.

Syntax

    <OBJECT> map:replaceAll(<OBJECT> to.map, <OBJECT> from.map)

QUERY PARAMETERS

| Name     | Description                                       | Default Value | Possible Data Types | Optional | Dynamic |
|----------|---------------------------------------------------|---------------|---------------------|----------|---------|
| to.map   | The map into which the key-values need to copied. |               | OBJECT              | No       | Yes     |
| from.map | The map from which the key-values are copied.     |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    map:replaceAll(toMap, fromMap)

If `toMap` contains key-value pairs (`symbol`: `gdn`), (`volume`: 100), and if `fromMap` contains key-value pairs (`symbol`: `IBM`), (`price` : 12), then the function returns updated `toMap` with key-value pairs (`symbol`: `IBM`), (`volume` : 100).

### size (Function)

Function to return the size of the map.

Syntax

    <INT> map:size(<OBJECT> map)

QUERY PARAMETERS

| Name | Description                                | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------------------------------------|---------------|---------------------|----------|---------|
| map  | The map for which size should be returned. |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    map:size(stockDetails)

Returns size of the `stockDetails` map.

### toJSON (Function)

Function converts a map into a JSON object and returns the JSON as a string.

Syntax

    <STRING> map:toJSON(<OBJECT> map)

QUERY PARAMETERS

| Name | Description                                | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------------------------------------|---------------|---------------------|----------|---------|
| map  | The map that needs to be converted to JSON |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    map:toJSON(company)

If `company` is a map with key-value pairs, (`symbol`:`gdn`),(`volume` : 100), and (`price`, 200), it returns the JSON string `{"symbol" : "gdn", "volume" : 100 , "price" : 200}`.

### toXML (Function)

Function returns the map as an XML string.

Syntax

    <STRING> map:toXML(<OBJECT> map)
    <STRING> map:toXML(<OBJECT> map, <OBJECT|STRING> root.element.name)

QUERY PARAMETERS

| Name              | Description                                | Default Value                        | Possible Data Types | Optional | Dynamic |
|-------------------|--------------------------------------------|--------------------------------------|---------------------|----------|---------|
| map               | The map that needs to be converted to XML. |                                      | OBJECT              | No       | Yes     |
| root.element.name | The root element of the map.               | The XML root element will be ignored | OBJECT STRING       | Yes      | Yes     |

EXAMPLE 1

    toXML(company, 'abcCompany')

If `company` is a map with key-value pairs, (`symbol` : `gdn`),(`volume` : 100), and (`price` : 200), this function returns XML as a string, `<abcCompany><symbol>gdn</symbol><volume><100></volume><price>200</price></abcCompany>`.

EXAMPLE 2

    toXML(company)

If `company` is a map with key-value pairs, (`symbol` : `gdn`), (`volume` : 100), and (`price` : 200), this function returns XML without root element as a string,
`<symbol>gdn</symbol><volume><100></volume><price>200</price>`.

### values (Function)

Function to return the values of the map.

Syntax

    <OBJECT> map:values(<OBJECT> map)

QUERY PARAMETERS

| Name | Description                                       | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------------------|---------------|---------------------|----------|---------|
| map  | The map from which list if values to be returned. |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    map:values(stockDetails)

Returns values of the `stockDetails` map.

### tokenize (Stream Processor)

Tokenize the map and return each key, value as new attributes in events

Syntax

    map:tokenize(<OBJECT> map)
    map:tokenize(<OBJECT> map, <OBJECT> ...)

QUERY PARAMETERS

| Name | Description                         | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------------------------------|---------------|---------------------|----------|---------|
| map  | Hash map containing key value pairs |               | OBJECT              | No       | Yes     |

Extra Return Attributes

| Name  | Description                                                                                                                                              | Possible Types |
|-------|----------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| key   | Key of an entry consisted in the map                                                                                                                     | OBJECT         |
| value | Value of an entry consisted in the map. If more than one map is given, then an Array List of values from each map is returned for the `value` attribute. | OBJECT         |

EXAMPLE 1

    define stream StockStream(symbol string, price float);

    select map:collect(symbol, price) as symbolPriceMap
    from StockStream#window.lengthBatch(2)
    insert into TempStream;

    select key, value
    from TempStream#map:tokenize(customMap)
    insert into SymbolStream;

Based on the length batch window, `symbolPriceMap` will collect two events, and the map will then again tokenized to give 2 events with key and values being symbol name and price respectively.

Math
----

### percentile (Aggregate Function)

This functions returns the pth percentile value of a given argument.

Syntax

    <DOUBLE> math:percentile(<INT|LONG|FLOAT|DOUBLE> arg, <DOUBLE> p)

QUERY PARAMETERS

| Name | Description                                                                                                                  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| arg  | The value of the parameter whose percentile should be found.                                                                 |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| p    | Estimate of the percentile to be found (pth percentile) where p is any number greater than 0 or lesser than or equal to 100. |               | DOUBLE                | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (sensorId int, temperature double);
    select math:percentile(temperature, 97.0) as percentile
    from InValueStream
    insert into OutMediationStream;

This function returns the percentile value based on the argument given. For example, math:percentile(temperature, 97.0) returns the 97th percentile value of all the temperature events.

### abs (Function)

This function returns the absolute value of the given parameter. It wraps the `java.lang.Math.abs()` function.

Syntax

    <DOUBLE> math:abs(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The parameter whose absolute value is found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:abs(inValue) as absValue
    from InValueStream
    insert into OutMediationStream;

Irrespective of whether the `invalue` in the input stream holds a value of abs(3) or abs(-3),the function returns 3 since the absolute value of both 3 and -3 is 3. The result directed to OutMediationStream stream.

### acos (Function)

If -1 \<= p1 \<= 1, this function returns the arc-cosine (inverse cosine) value of p1.If the domain is invalid, it returns NULL. The value returned is in radian scale. This function wraps the java.lang.Math.acos() function.

Syntax

    <DOUBLE> math:acos(<FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                                  | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value of the parameter whose arc-cosine (inverse cosine) value is found. |               | FLOAT DOUBLE        | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:acos(inValue) as acosValue
    from InValueStream
    insert into OutMediationStream;

If the `inValue` in the input stream is given, the function calculates the arc-cosine value of it and returns the arc-cosine value to the output stream, OutMediationStream. For example, acos(0.5) returns 1.0471975511965979.

### asin (Function)

If -1 \<= p1 \<= 1, this function returns the arc-sin (inverse sine) value of p1. If the domain is invalid, it returns NULL. The value returned is in radian scale. This function wraps the java.lang.Math.asin() function.

Syntax

    <DOUBLE> math:asin(<FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                             | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value of the parameter whose arc-sin (inverse sine) value is found. |               | FLOAT DOUBLE        | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:asin(inValue) as asinValue
    from InValueStream
    insert into OutMediationStream;

If the `inValue` in the input stream is given, the function calculates the arc-sin value of it and returns the arc-sin value to the output stream, OutMediationStream. For example, asin(0.5) returns 0.5235987755982989.

### atan (Function)

1\. If a single `p1` is received, this function returns the arc-tangent (inverse tangent) value of `p1`. 2. If `p1` is received along with an optional `p1`, it considers them as x and y coordinates and returns the arc-tangent (inverse tangent) value. The returned value is in radian scale. This function wraps the `java.lang.Math.atan()` function.

Syntax

    <DOUBLE> math:atan(<INT|LONG|FLOAT|DOUBLE> p1)
    <DOUBLE> math:atan(<INT|LONG|FLOAT|DOUBLE> p1, <INT|LONG|FLOAT|DOUBLE> p2)

QUERY PARAMETERS

| Name | Description                                                                                                                                                                       | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose arc-tangent (inverse tangent) is found. If the optional second parameter is given this represents the x coordinate of the (x,y) coordinate pair. |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| p2   | This optional parameter represents the y coordinate of the (x,y) coordinate pair.                                                                                                 | 0D            | INT LONG FLOAT DOUBLE | Yes      | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue1 double, inValue2 double);
    select math:atan(inValue1, inValue2) as convertedValue
    from InValueStream
    insert into OutMediationStream;

If the `inValue1` in the input stream is given, the function calculates the arc-tangent value of it and returns the arc-tangent value to the output stream, OutMediationStream. If both the `inValue1` and `inValue2` are given, then the function considers them to be x and y coordinates respectively and returns the calculated arc-tangent value to the output stream, OutMediationStream. For example, atan(12d, 5d) returns 1.1760052070951352.

### bin (Function)

This function returns a string representation of the p1 argument, that is of either `integer` or `long` data type, as an unsigned integer in base 2. It wraps the `java.lang.Integer.toBinaryString` and java.lang.Long.toBinaryString\` methods.

Syntax

    <STRING> math:bin(<INT|LONG> p1)

QUERY PARAMETERS

| Name | Description                                                                                               | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value in either `integer` or `long`, that should be converted into an unsigned integer of base 2. |               | INT LONG            | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue long);
    select math:bin(inValue) as binValue
    from InValueStream
    insert into OutMediationStream;

If the `inValue` in the input stream is given, the function converts it into an unsigned integer in base 2 and directs the output to the output stream, OutMediationStream. For example, bin(9) returns `1001`.

### cbrt (Function)

This function returns the cube-root of `p1` which is in radians. It wraps the `java.lang.Math.cbrt()` function.

Syntax

    <DOUBLE> math:cbrt(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose cube-root should be found. Input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:cbrt(inValue) as cbrtValue
    from InValueStream
    insert into OutMediationStream;

If the `inValue` is given, the function calculates the cube-root value for the same and directs the output to the output stream, OutMediationStream. For example, cbrt(17d) returns 2.5712815906582356.

### ceil (Function)

This function returns the smallest double value, i.e., the closest to the negative infinity, that is greater than or equal to the `p1` argument, and is equal to a mathematical integer. It wraps the `java.lang.Math.ceil()` method.

Syntax

    <DOUBLE> math:ceil(<FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                              | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value of the parameter whose ceiling value is found. |               | FLOAT DOUBLE        | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:ceil(inValue) as ceilingValue
    from InValueStream
    insert into OutMediationStream;

This function calculates the ceiling value of the given `inValue` and directs the result to `OutMediationStream` output stream. For example, ceil(423.187d) returns 424.0.

### conv (Function)

This function converts `a` from the `fromBase` base to the `toBase` base.

Syntax

    <STRING> math:conv(<STRING> a, <INT> from.base, <INT> to.base)

QUERY PARAMETERS

| Name      | Description                                                                    | Default Value | Possible Data Types | Optional | Dynamic |
|-----------|--------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| a         | The value whose base should be changed. Input should be given as a `String`. |               | STRING              | No       | Yes     |
| from.base | The source base of the input parameter `a`.                                  |               | INT                 | No       | Yes     |
| to.base   | The target base that the input parameter `a` should be converted into.       |               | INT                 | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue string,fromBase int,toBase int);
    select math:conv(inValue,fromBase,toBase) as convertedValue
    from InValueStream
    insert into OutMediationStream;

If the `inValue` in the input stream is given, and the base in which it currently resides in and the base to which it should be converted to is specified, the function converts it into a string in the target base and directs it to the output stream, OutMediationStream. For example, conv("7f", 16, 10) returns "127".

### copySign (Function)

This function returns a value of an input with the received `magnitude` and `sign` of another input. It wraps the `java.lang.Math.copySign()` function.

Syntax

    <DOUBLE> math:copySign(<INT|LONG|FLOAT|DOUBLE> magnitude, <INT|LONG|FLOAT|DOUBLE> sign)

QUERY PARAMETERS

| Name      | Description                                                      | Default Value | Possible Data Types   | Optional | Dynamic |
|-----------|------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| magnitude | The magnitude of this parameter is used in the output attribute. |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| sign      | The sign of this parameter is used in the output attribute.      |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue1 double, inValue2 double);
    select math:copySign(inValue1,inValue2) as copysignValue
    from InValueStream
    insert into OutMediationStream;

If two values are provided as `inValue1` and `inValue2`, the function copies the magnitude and sign of the second argument into the first one and directs the result to the output stream, OutMediatonStream. For example, copySign(5.6d, -3.0d) returns -5.6.

### cos (Function)

This function returns the cosine of `p1` which is in radians. It wraps the `java.lang.Math.cos()` function.

Syntax

    <DOUBLE> math:cos(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                                                           | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose cosine value should be found.The input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:cos(inValue) as cosValue
    from InValueStream
    insert into OutMediationStream;

If the `inValue` is given, the function calculates the cosine value for the same and directs the output to the output stream, OutMediationStream. For example, cos(6d) returns 0.9601702866503661.

### cosh (Function)

This function returns the hyperbolic cosine of `p1` which is in radians. It wraps the `java.lang.Math.cosh()` function.

Syntax

    <DOUBLE> math:cosh(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                                                                 | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose hyperbolic cosine should be found. The input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:cosh(inValue) as cosValue
    from InValueStream
    insert into OutMediationStream;

If the `inValue` is given, the function calculates the hyperbolic cosine value for the same and directs the output to the output stream, OutMediationStream. For example, cosh (6d) returns 201.7156361224559.

### e (Function)

This function returns the `java.lang.Math.E` constant, which is the closest double value to e, where e is the base of the natural logarithms.

Syntax

    <DOUBLE> math:e()

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:e() as eValue
    from InValueStream
    insert into OutMediationStream;

This function returns the constant, 2.7182818284590452354 which is then closest double value to e and directs the output to `OutMediationStream` output stream.

### exp (Function)

This function returns the Euler's number `e` raised to the power of `p1`. It wraps the `java.lang.Math.exp()` function.

Syntax

    <DOUBLE> math:exp(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The power that the Euler's number e is raised to. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:exp(inValue) as expValue
    from InValueStream
    insert into OutMediationStream;

If the `inValue` in the inputstream holds a value, this function calculates the corresponding Euler's number `e` and directs it to the output stream, OutMediationStream. For example, exp(10.23) returns 27722.51006805505.

### floor (Function)

This function wraps the `java.lang.Math.floor()` function and returns the largest value, i.e., closest to the positive infinity, that is less than or equal to `p1`, and is equal to a mathematical integer.

Syntax

    <DOUBLE> math:floor(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                   | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose floor value should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:floor(inValue) as floorValue
    from InValueStream
    insert into OutMediationStream;

This function calculates the floor value of the given `inValue` input and directs the output to the `OutMediationStream` output stream. For example, (10.23) returns 10.0.

### getExponent (Function)

This function returns the unbiased exponent that is used in the representation of `p1`. This function wraps the `java.lang.Math.getExponent()` function.

Syntax

    <INT> math:getExponent(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                          | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of whose unbiased exponent representation should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:getExponent(inValue) as expValue
    from InValueStream
    insert into OutMediationStream;

This function calculates the unbiased exponent of a given input, `inValue` and directs the result to the `OutMediationStream` output stream. For example, getExponent(60984.1) returns 15.

### hex (Function)

This function wraps the `java.lang.Double.toHexString() function. It returns a hexadecimal string representation of the input, `p1\`.

Syntax

    <STRING> math:hex(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                         | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose hexadecimal value should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue int);
    select math:hex(inValue) as hexString
    from InValueStream
    insert into OutMediationStream;

If the `inValue` in the input stream is provided, the function converts this into its corresponding hexadecimal format and directs the output to the output stream, OutMediationStream. For example, hex(200) returns "c8".

### isInfinite (Function)

This function wraps the `java.lang.Float.isInfinite()` and `java.lang.Double.isInfinite()` and returns `true` if `p1` is infinitely large in magnitude and `false` if otherwise.

Syntax

    <BOOL> math:isInfinite(<FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                                                      | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | This is the value of the parameter that the function determines to be either infinite or finite. |               | FLOAT DOUBLE        | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue1 double,inValue2 int);
    select math:isInfinite(inValue1) as isInfinite
    from InValueStream
    insert into OutMediationStream;

If the value given in the `inValue` in the input stream is of infinitely large magnitude, the function returns the value, `true` and directs the result to the output stream, `OutMediationStream`. For example, isInfinite(java.lang.Double.POSITIVE\_INFINITY) returns true.

### isNan (Function)

This function wraps the `java.lang.Float.isNaN()` and `java.lang.Double.isNaN()` functions and returns `true` if `p1` is NaN  (Not-a-Number), and returns `false` if otherwise.

Syntax

    <BOOL> math:isNan(<FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                                            | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value of the parameter which the function determines to be either NaN or a number. |               | FLOAT DOUBLE        | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue1 double,inValue2 int);
    select math:isNan(inValue1) as isNaN
    from InValueStream
    insert into OutMediationStream;

If the `inValue1` in the input stream has a value that is undefined, then the function considers it as an `NaN` value and directs `True` to the output stream, OutMediationStream. For example, isNan(java.lang.Math.log(-12d)) returns true.

### ln (Function)

This function returns the natural logarithm (base e) of `p1`.

Syntax

    <DOUBLE> math:ln(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                                  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose natural logarithm (base e) should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:ln(inValue) as lnValue
    from InValueStream
    insert into OutMediationStream;

If the `inValue` in the input stream is given, the function calculates its natural logarithm (base e) and directs the results to the output stream, `OutMeditionStream`. For example, ln(11.453) returns 2.438251704415579.

### log (Function)

This function returns the logarithm of the received `number` as per the given `base`.

Syntax

    <DOUBLE> math:log(<INT|LONG|FLOAT|DOUBLE> number, <INT|LONG|FLOAT|DOUBLE> base)

QUERY PARAMETERS

| Name   | Description                                              | Default Value | Possible Data Types   | Optional | Dynamic |
|--------|----------------------------------------------------------|---------------|-----------------------|----------|---------|
| number | The value of the parameter whose base should be changed. |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| base   | The base value of the ouput.                             |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (number double, base double);
    select math:log(number, base) as logValue
    from InValueStream
    insert into OutMediationStream;

If the number and the base to which it has to be converted into is given in the input stream, the function calculates the number to the base specified and directs the result to the output stream, OutMediationStream. For example, log(34, 2f) returns 5.08746284125034.

### log10 (Function)

This function returns the base 10 logarithm of `p1`.

Syntax

    <DOUBLE> math:log10(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                         | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose base 10 logarithm should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:log10(inValue) as lnValue
    from InValueStream
    insert into OutMediationStream;

If the `inValue` in the input stream is given, the function calculates the base 10 logarithm of the same and directs the result to the output stream, `OutMediatioStream`. For example, log10(19.234) returns 1.2840696117100832.

### log2 (Function)

This function returns the base 2 logarithm of `p1`.

Syntax

    <DOUBLE> math:log2(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose base 2 logarithm should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:log2(inValue) as lnValue
    from InValueStream
    insert into OutMediationStream;

If the `inValue` in the input stream is given, the function calculates the base 2 logarithm of the same and returns the value to the output stream, `OutMediationStream`. For example log2(91d) returns 6.507794640198696.

### max (Function)

This function returns the greater value of `p1` and `p2`.

Syntax

    <DOUBLE> math:max(<INT|LONG|FLOAT|DOUBLE> p1, <INT|LONG|FLOAT|DOUBLE> p2)

QUERY PARAMETERS

| Name | Description                                                                              | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | One of the input values to be compared in order to find the larger value of the two      |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| p2   | The input value to be compared with `p1` in order to find the larger value of the two. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue1 double,inValue2 int);
    select math:max(inValue1,inValue2) as maxValue
    from InValueStream
    insert into OutMediationStream;

If two input values `inValue1`, and `inValue2` are given, the function compares them and directs the larger value to the output stream, OutMediationStream. For example, max(123.67d, 91) returns 123.67.

### min (Function)

This function returns the smaller value of `p1` and `p2`.

Syntax

    <DOUBLE> math:min(<INT|LONG|FLOAT|DOUBLE> p1, <INT|LONG|FLOAT|DOUBLE> p2)

QUERY PARAMETERS

| Name | Description                                                                            | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | One of the input values that are to be compared in order to find the smaller value.    |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| p2   | The input value that is to be compared with `p1` in order to find the smaller value. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue1 double,inValue2 int);
    select math:min(inValue1,inValue2) as minValue
    from InValueStream
    insert into OutMediationStream;

If two input values, `inValue1` and `inValue2` are given, the function compares them and directs the smaller value of the two to the output stream, OutMediationStream. For example, min(123.67d, 91) returns 91.

### oct (Function)

This function converts the input parameter `p1` to octal.

Syntax

    <STRING> math:oct(<INT|LONG> p1)

QUERY PARAMETERS

| Name | Description                                                            | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value of the parameter whose octal representation should be found. |               | INT LONG            | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue long);
    select math:oct(inValue) as octValue
    from InValueStream
    insert into OutMediationStream;

If the `inValue` in the input stream is given, this function calculates the octal value corresponding to the same and directs it to the output stream, OutMediationStream. For example, oct(99l) returns "143".

### parseDouble (Function)

This function returns the double value of the string received.

Syntax

    <DOUBLE> math:parseDouble(<STRING> p1)

QUERY PARAMETERS

| Name | Description                                             | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value that should be converted into a double value. |               | STRING              | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue string);
    select math:parseDouble(inValue) as output
    from InValueStream
    insert into OutMediationStream;

If the `inValue` in the input stream holds a value, this function converts it into the corresponding double value and directs it to the output stream, OutMediationStream. For example, parseDouble("123") returns 123.0.

### parseFloat (Function)

This function returns the float value of the received string.

Syntax

    <FLOAT> math:parseFloat(<STRING> p1)

QUERY PARAMETERS

| Name | Description                                            | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value that should be converted into a float value. |               | STRING              | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue string);
    select math:parseFloat(inValue) as output
    from InValueStream
    insert into OutMediationStream;

The function converts the input value given in `inValue`,into its corresponding float value and directs the result into the output stream, OutMediationStream. For example, parseFloat("123") returns 123.0.

### parseInt (Function)

This function returns the integer value of the received string.

Syntax

    <INT> math:parseInt(<STRING> p1)

QUERY PARAMETERS

| Name | Description                                       | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value that should be converted to an integer. |               | STRING              | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue string);
    select math:parseInt(inValue) as output
    from InValueStream
    insert into OutMediationStream;

The function converts the `inValue` into its corresponding integer value and directs the output to the output stream, OutMediationStream. For example, parseInt("123") returns 123.

### parseLong (Function)

This function returns the long value of the string received.

Syntax

    <LONG> math:parseLong(<STRING> p1)

QUERY PARAMETERS

| Name | Description                                         | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value that should be converted to a long value. |               | STRING              | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue string);
    select math:parseLong(inValue) as output
    from InValueStream
    insert into OutMediationStream;

The function converts the `inValue` to its corresponding long value and directs the result to the output stream, OutMediationStream. For example, parseLong("123") returns 123.

### pi (Function)

This function returns the `java.lang.Math.PI` constant, which is the closest value to pi, i.e., the ratio of the circumference of a circle to its diameter.

Syntax

    <DOUBLE> math:pi()

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:pi() as piValue
    from InValueStream
    insert into OutMediationStream;

pi() always returns 3.141592653589793.

### power (Function)

This function raises the given value to a given power.

Syntax

    <DOUBLE> math:power(<INT|LONG|FLOAT|DOUBLE> value, <INT|LONG|FLOAT|DOUBLE> to.power)

QUERY PARAMETERS

| Name     | Description                                                                   | Default Value | Possible Data Types   | Optional | Dynamic |
|----------|-------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| value    | The value that should be raised to the power of `to.power` input parameter. |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| to.power | The power to which the `value` input parameter should be raised.            |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue1 double, inValue2 double);
    select math:power(inValue1,inValue2) as powerValue
    from InValueStream
    insert into OutMediationStream;

This function raises the `inValue1` to the power of `inValue2` and directs the output to the output stream, `OutMediationStream`. For example, (5.6d, 3.0d) returns 175.61599999999996.

### rand (Function)

This returns a stream of pseudo-random numbers when a sequence of calls are sent to the `rand()`. Optionally, it is possible to define a seed, i.e., `rand(seed)` using which the pseudo-random numbers are generated. These functions internally use the `java.util.Random` class.

Syntax

    <DOUBLE> math:rand()
    <DOUBLE> math:rand(<INT|LONG> seed)

QUERY PARAMETERS

| Name | Description                                                                      | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| seed | An optional seed value that will be used to generate the random number sequence. | defaultSeed   | INT LONG            | Yes      | Yes     |

EXAMPLE 1

    define stream InValueStream (symbol string, price long, volume long);
    select math:oct(inValue) as octValue
    from InValueStream select symbol, math:rand() as randNumber
    insert into OutMediationStream;

In the example given above, a random double value between 0 and 1 will be generated using math:rand().

### round (Function)

This function returns the value of the input argument rounded off to the closest integer/long value.

Syntax

    <INT|LONG> math:round(<FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                             | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value that should be rounded off to the closest integer/long value. |               | FLOAT DOUBLE        | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:round(inValue) as roundValue
    from InValueStream
    insert into OutMediationStream;

The function rounds off `inValue1` to the closest int/long value and directs the output to the output stream, `OutMediationStream`. For example, round(3252.353) returns 3252.

### signum (Function)

This returns +1, 0, or -1 for the given positive, zero and negative values respectively. This function wraps the `java.lang.Math.signum()` function.

Syntax

    <INT> math:signum(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that should be checked to be positive, negative or zero. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:signum(inValue) as sign
    from InValueStream
    insert into OutMediationStream;

The function evaluates the `inValue` given to be positive, negative or zero and directs the result to the output stream, `OutMediationStream`. For example, signum(-6.32d) returns -1.

### sin (Function)

This returns the sine of the value given in radians. This function wraps
the `java.lang.Math.sin()` function.

Syntax

    <DOUBLE> math:sin(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                                                      | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose sine value should be found. Input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:sin(inValue) as sinValue
    from InValueStream
    insert into OutMediationStream;

The function calculates the sine value of the given `inValue` and directs the output to the output stream, `OutMediationStream`. For example, sin(6d) returns -0.27941549819892586.

### sinh (Function)

This returns the hyperbolic sine of the value given in radians. This function wraps the `java.lang.Math.sinh()` function.

Syntax

    <DOUBLE> math:sinh(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                                                                 | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose hyperbolic sine value should be found. Input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:sinh(inValue) as sinhValue
    from InValueStream
    insert into OutMediationStream;

This function calculates the hyperbolic sine value of `inValue` and directs the output to the output stream, `OutMediationStream`. For example, sinh(6d) returns 201.71315737027922.

### sqrt (Function)

This function returns the square-root of the given value. It wraps the `java.lang.Math.sqrt()`s function.

Syntax

    <DOUBLE> math:sqrt(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                         | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose square-root value should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:sqrt(inValue) as sqrtValue
    from InValueStream
    insert into OutMediationStream;

The function calculates the square-root value of the `inValue` and directs the output to the output stream, `OutMediationStream`. For example, sqrt(4d) returns 2.

### tan (Function)

This function returns the tan of the given value in radians. It wraps the `java.lang.Math.tan()` function.

Syntax

    <DOUBLE> math:tan(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose tan value should be found. Input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    select math:tan(inValue) as tanValue
    from InValueStream
    insert into OutMediationStream;

This function calculates the tan value of the `inValue` given and directs the output to the output stream, `OutMediationStream`. For example, tan(6d) returns -0.29100619138474915.

### tanh (Function)

This function returns the hyperbolic tangent of the value given in
radians. It wraps the `java.lang.Math.tanh()` function.

Syntax

    <DOUBLE> math:tanh(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                                                                    | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose hyperbolic tangent value should be found. Input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    from InValueStream
    select math:tanh(inValue) as tanhValue
    insert into OutMediationStream;

If the `inVaue` in the input stream is given, this function calculates
the hyperbolic tangent value of the same and directs the output to
`OutMediationStream` stream. For example, tanh(6d) returns
0.9999877116507956.

### toDegrees (Function)

This function converts the value given in radians to degrees. It wraps
the `java.lang.Math.toDegrees()` function.

Syntax

    <DOUBLE> math:toDegrees(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The input value in radians that should be converted to degrees. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    from InValueStream
    select math:toDegrees(inValue) as degreesValue
    insert into OutMediationStream;

The function converts the `inValue` in the input stream from radians
to degrees and directs the output to `OutMediationStream` output
stream. For example, toDegrees(6d) returns 343.77467707849394.

### toRadians (Function)

This function converts the value given in degrees to radians. It wraps
the `java.lang.Math.toRadians()` function.

Syntax

    <DOUBLE> math:toRadians(<INT|LONG|FLOAT|DOUBLE> p1)

QUERY PARAMETERS

| Name | Description                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The input value in degrees that should be converted to radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1

    define stream InValueStream (inValue double);
    from InValueStream
    select math:toRadians(inValue) as radiansValue
    insert into OutMediationStream;

This function converts the input, from degrees to radians and directs
the result to `OutMediationStream` output stream. For example,
toRadians(6d) returns 0.10471975511965977.

Rdbms
-----

### cud (Stream Processor)

This function performs SQL CUD (INSERT, UPDATE, DELETE) queries on data sources. 

Syntax

    rdbms:cud(<STRING> datasource.name, <STRING> query)
    rdbms:cud(<STRING> datasource.name, <STRING> query, <STRING|BOOL|INT|DOUBLE|FLOAT|LONG> parameter)
    rdbms:cud(<STRING> datasource.name, <STRING> query, <STRING|BOOL|INT|DOUBLE|FLOAT|LONG> parameter, <STRING|BOOL|INT|DOUBLE|FLOAT|LONG> ...)

QUERY PARAMETERS

| Name            | Description                                                                                                                                                                                                     | Default Value | Possible Data Types               | Optional | Dynamic |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| datasource.name | The name of the datasource for which the query should be performed.  |               | STRING                            | No       | No      |
| query           | The update, delete, or insert query(formatted according to the relevant database type) that needs to be performed.                                                                                              |               | STRING                            | No       | Yes     |
| parameter       | If the second parameter is a parametrised SQL query, then stream processor attributes can be passed to set the values of the parameters                                                                                   |               | STRING BOOL INT DOUBLE FLOAT LONG | Yes      | Yes     |

System Parameters

| Name                   | Description                                                                                        | Default Value | Possible Parameters |
|------------------------|----------------------------------------------------------------------------------------------------|---------------|---------------------|
| perform.CUD.operations | If this parameter is set to `true`, the RDBMS CUD function is enabled to perform CUD operations. | false         | true false          |

Extra Return Attributes

| Name       | Description                                     | Possible Types |
|------------|-------------------------------------------------|----------------|
| numRecords | The number of records manipulated by the query. | INT            |

EXAMPLE 1

    from TriggerStream#rdbms:cud("SAMPLE_DB", "UPDATE Customers_Table SET customerName='abc' where customerName='xyz'")
    select numRecords
    insert into  RecordStream;

This query updates the events from the input stream named
`TriggerStream` with an additional attribute named `numRecords`, of
which the value indicates the number of records manipulated. The updated
events are inserted into an output stream named `RecordStream`.

EXAMPLE 2

    from TriggerStream#rdbms:cud("SAMPLE_DB", "UPDATE Customers_Table SET customerName=? where customerName=?", changedName, previousName)
    select numRecords
    insert into  RecordStream;

This query updates the events from the input stream named
`TriggerStream` with an additional attribute named `numRecords`, of
which the value indicates the number of records manipulated. The updated
events are inserted into an output stream named `RecordStream`. Here
the values of attributes changedName and previousName in the event will
be set to the query.

### query (Stream Processor)

This function performs SQL retrieval queries on data sources.

Syntax

    rdbms:query(<STRING> datasource.name, <STRING> attribute.definition.list, <STRING> query)
    rdbms:query(<STRING> datasource.name, <STRING> attribute.definition.list, <STRING> query, <STRING|BOOL|INT|DOUBLE|FLOAT|LONG> parameter)
    rdbms:query(<STRING> datasource.name, <STRING> attribute.definition.list, <STRING> query, <STRING|BOOL|INT|DOUBLE|FLOAT|LONG> parameter, <STRING|BOOL|INT|DOUBLE|FLOAT|LONG> ...)

QUERY PARAMETERS

| Name                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Default Value | Possible Data Types               | Optional | Dynamic |
|---------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| datasource.name           | The name of the datasource for which the query should be performed. |               | STRING                            | No       | No      |
| attribute.definition.list | This is provided as a comma-separated list in the `<AttributeName AttributeType>` format. The SQL query is expected to return the attributes in the given order. e.g., If one attribute is defined here, the SQL query should return one column result set. If more than one column is returned, then the first column is processed. The  data types supported are `STRING`, `INT`, `LONG`, `DOUBLE`, `FLOAT`, and `BOOL`. Â Mapping of the  data type to the database data type can be done as follows, \* Datatype\* -\> \*Datasource Datatype\* `STRING` -\> `CHAR`,`VARCHAR`,`LONGVARCHAR` `INT`Â Â Â Â -\> `INTEGER` `LONG`Â Â Â Â -\> `BIGINT` `DOUBLE`-\> `DOUBLE` `FLOAT`Â Â Â Â -\> `REAL` `BOOL`Â Â Â Â -\> `BIT` |               | STRING                            | No       | No      |
| query                     | The select query(formatted according to the relevant database type) that needs to be performed |               | STRING                            | No       | Yes     |
| parameter                 | If the second parameter is a parametrised SQL query, then stream processor attributes can be passed to set the values of the parameters |               | STRING BOOL INT DOUBLE FLOAT LONG | Yes      | Yes     |

Extra Return Attributes

| Name          | Description                    | Possible Types                    |
|---------------|---------------------------------------------------------------------------------------------|-----------------------------------|
| attributeName | The return attributes will be the ones defined in the parameter`attribute.definition.list`. | STRING INT LONG DOUBLE FLOAT BOOL |

EXAMPLE 1

    from TriggerStream#rdbms:query('SAMPLE_DB', 'creditcardno string, country string, transaction string, amount int', 'select * from Transactions_Table')
    select creditcardno, country, transaction, amount
    insert into recordStream;

Events inserted into recordStream includes all records matched for the
query i.e an event will be generated for each record retrieved from the
datasource. The event will include as additional attributes, the
attributes defined in the `attribute.definition.list`(creditcardno,
country, transaction, amount).

EXAMPLE 2

    from TriggerStream#rdbms:query('SAMPLE_DB', 'creditcardno string, country string,transaction string, amount int', 'select * from where country=?', countrySearchWord) select creditcardno, country, transaction, amount
    insert into recordStream;

Events inserted into recordStream includes all records matched for the
query i.e an event will be generated for each record retrieved from the
datasource. The event will include as additional attributes, the
attributes defined in the `attribute.definition.list`(creditcardno,
country, transaction, amount). countrySearchWord value from the event
will be set in the query when querying the datasource.

Regex
-----

### find (Function)

Finds the subsequence that matches the given regex pattern.

Syntax

    <BOOL> regex:find(<STRING> regex, <STRING> input.sequence)
    <BOOL> regex:find(<STRING> regex, <STRING> input.sequence, <INT> starting.index)

QUERY PARAMETERS

| Name           | Description                                                                                                                      | Default Value | Possible Data Types | Optional | Dynamic |
|----------------|----------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| regex          | A regular expression that is matched to a sequence in order to find the subsequence of the same. For example, `\d\d(.*)gdn`.    |               | STRING              | No       | Yes     |
| input.sequence | The input sequence to be matched with the regular expression. For example, `21 products are produced by gdn`.                   |               | STRING              | No       | Yes     |
| starting.index | The starting index of the input sequence from where the input sequence ismatched with the given regex pattern.For example, `10`. | 0             | INT                 | Yes      | Yes     |

EXAMPLE 1
```js
    regex:find('\d\d(.*)gdn', '21 products are produced by gdn currently')
```

This method attempts to find the subsequence of the input.sequence that
matches the regex pattern, `\d\d(.*)gdn`. It returns `true` as a
subsequence exists.

EXAMPLE 2
```js
    regex:find('\d\d(.*)gdn', '21 products are produced by gdn.', 4)
```
This method attempts to find the subsequence of the input.sequence that
matches the regex pattern, `\d\d(.*)gdn` starting from index `4`. It
returns `false` as subsequence does not exists.

### group (Function)

Returns the subsequence captured by the given group during the regex
match operation.

Syntax
```js
    <STRING> regex:group(<STRING> regex, <STRING> input.sequence, <INT> group.id)
```
QUERY PARAMETERS

| Name           | Description                                                                                                    | Default Value | Possible Data Types | Optional | Dynamic |
|----------------|----------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| regex          | A regular expression. For example, `\d\d(.*)gdn.`                                                             |               | STRING              | No       | Yes     |
| input.sequence | The input sequence to be matched with the regular expression. For example, 2`1 products are produced by gdn`. |               | STRING              | No       | Yes     |
| group.id       | The given group id of the regex expression. For example, `2`.                                                  |               | INT                 | No       | Yes     |

EXAMPLE 1
```js
    regex:group('\d\d(.*)(gdn.*)(gdn.*)', '21 products are produced within 10 years by gdn currently by gdn employees', 3)
```

Function returns `gdn employees`, the subsequence captured by the
groupID 3 according to the regex pattern, `\d\d(.*)(gdn.*)(gdn.*)`.

### lookingAt (Function)

Matches the input.sequence from the beginning against the regex pattern,
and unlike
`regex:matches() it does not require that the entire input.sequence be matched.`

Syntax
```js
    <BOOL> regex:lookingAt(<STRING> regex, <STRING> input.sequence)
```
QUERY PARAMETERS

| Name           | Description                                                                                                    | Default Value | Possible Data Types | Optional | Dynamic |
|----------------|----------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| regex          | A regular expression. For example, `\d\d(.*)gdn`.                                                             |               | STRING              | No       | Yes     |
| input.sequence | The input sequence to be matched with the regular expression. For example, `21 products are produced by gdn`. |               | STRING              | No       | Yes     |

EXAMPLE 1

    regex:lookingAt('\d\d(.*)(gdn.*)', '21 products are produced by gdn currently in Sri Lanka')

Function matches the input.sequence against the regex pattern,
`\d\d(.*)(gdn.*)` from the beginning, and as it matches it returns
`true`.

EXAMPLE 2

    regex:lookingAt('gdn(.*)middleware(.*)', 'sample test string and gdn is situated in trace and it's a middleware company')

Function matches the input.sequence against the regex pattern,
`gdn(.*)middleware(.*)` from the beginning, and as it does not match it
returns `false`.

### matches (Function)

Matches the entire input.sequence against the regex pattern.

Syntax

    <BOOL> regex:matches(<STRING> regex, <STRING> input.sequence)

QUERY PARAMETERS

| Name           | Description                                                                                                    | Default Value | Possible Data Types | Optional | Dynamic |
|----------------|----------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| regex          | A regular expression. For example, `\d\d(.*)gdn`.                                                             |               | STRING              | No       | Yes     |
| input.sequence | The input sequence to be matched with the regular expression. For example, `21 products are produced by gdn`. |               | STRING              | No       | Yes     |

EXAMPLE 1

    regex:matches('gdn(.*)middleware(.*)', 'gdn is situated in trace and its a middleware company')

Function matches the entire input.sequence against
`gdn(.*)middleware(.*)` regex pattern, and as it matches it returns
`true`.

EXAMPLE 2
```js
    regex:matches('gdn(.*)middleware', 'gdn is situated in trace and its a middleware company')
```

Function matches the entire input.sequence against `gdn(.*)middleware`
regex pattern. As it does not match it returns `false`.

Reorder
-------

### akslack (Stream Processor)

Stream processor performs reordering of out-of-order events optimized
for a givenparameter using \[AQ-K-Slack
algorithm\](http://dl.acm.org/citation.cfm?doid=2675743.2771828). This
is best for reordering events on attributes those are used for
aggregations.data .

Syntax
```js
    reorder:akslack(<LONG> timestamp, <INT|FLOAT|LONG|DOUBLE> correlation.field)
    reorder:akslack(<LONG> timestamp, <INT|FLOAT|LONG|DOUBLE> correlation.field, <LONG> batch.size)
    reorder:akslack(<LONG> timestamp, <INT|FLOAT|LONG|DOUBLE> correlation.field, <LONG> batch.size, <LONG> timeout)
    reorder:akslack(<LONG> timestamp, <INT|FLOAT|LONG|DOUBLE> correlation.field, <LONG> batch.size, <LONG> timeout, <LONG> max.k)
    reorder:akslack(<LONG> timestamp, <INT|FLOAT|LONG|DOUBLE> correlation.field, <LONG> batch.size, <LONG> timeout, <LONG> max.k, <BOOL> discard.late.arrival)
    reorder:akslack(<LONG> timestamp, <INT|FLOAT|LONG|DOUBLE> correlation.field, <LONG> batch.size, <LONG> timeout, <LONG> max.k, <BOOL> discard.late.arrival, <DOUBLE> error.threshold, <DOUBLE> confidence.level)
```
QUERY PARAMETERS

| Name                 | Description                                                                                                                                                                                                                                     | Default Value                                          | Possible Data Types   | Optional | Dynamic |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|-----------------------|----------|---------|
| timestamp            | The event timestamp on which the events should be ordered.                                                                                                                                                                                      |                                                        | LONG                  | No       | Yes     |
| correlation.field    | By monitoring the changes in this field Alpha K-Slack dynamically optimises its behavior. This field is used to calculate the runtime window coverage threshold, which represents the upper limit set for unsuccessfully handled late arrivals. |                                                        | INT FLOAT LONG DOUBLE | No       | Yes     |
| batch.size           | The parameter `batch.size` denotes the number of events that should be considered in the calculation of an alpha value. This should be greater than or equal to 15.                                                                           | \`10,000\`                                             | LONG                  | Yes      | No      |
| timeout              | A timeout value in milliseconds, where the buffered events who are older than the given timeout period get flushed every second.                                                                                                                | \`-1\` (timeout is infinite)                           | LONG                  | Yes      | No      |
| max.k                | The maximum K-Slack window threshold (`K` parameter).                                                                                                                                                                                         | \`9,223,372,036,854,775,807\` (The maximum Long value) | LONG                  | Yes      | No      |
| discard.late.arrival | If set to `true` the processor would discarded the out-of-order events arriving later than the K-Slack window, and in otherwise it allows the late arrivals to proceed.                                                                         | false                                                  | BOOL                  | Yes      | No      |
| error.threshold      | The error threshold to be applied in Alpha K-Slack algorithm.                                                                                                                                                                                   | \`0.03\` (3%)                                          | DOUBLE                | Yes      | No      |
| confidence.level     | The confidence level to be applied in Alpha K-Slack algorithm.                                                                                                                                                                                  | \`0.95\` (95%)                                         | DOUBLE                | Yes      | No      |

EXAMPLE 1
```js
    define stream StockStream (eventTime long, symbol string, volume long);

    @info(name = 'query1')
    from StockStream#reorder:akslack(eventTime, volume, 20)#window.time(5 min)
    select eventTime, symbol, sum(volume) as total
    insert into OutputStream;
```
The query reorders events based on the `eventTime` attribute value and
optimises for aggregating `volume` attribute considering last 20
events.

### kslack (Stream Processor)

Stream processor performs reordering of out-of-order events using
\[K-Slack
algorithm\](https://www2.informatik.uni-erlangen.de/publication/download/IPDPS2013.pdf).

Syntax
```js
    reorder:kslack(<LONG> timestamp)
    reorder:kslack(<LONG> timestamp, <LONG> timeout)
    reorder:kslack(<LONG> timestamp, <BOOL> discard.late.arrival)
    reorder:kslack(<LONG> timestamp, <LONG> timeout, <LONG> max.k)
    reorder:kslack(<LONG> timestamp, <LONG> timeout, <BOOL> discard.late.arrival)
    reorder:kslack(<LONG> timestamp, <LONG> timeout, <LONG> max.k, <BOOL> discard.late.arrival)
```
QUERY PARAMETERS

| Name                 | Description                                                                                                                                                             | Default Value                                          | Possible Data Types | Optional | Dynamic |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|---------------------|----------|---------|
| timestamp            | The event timestamp on which the events should be ordered.                                                                                                              |                                                        | LONG                | No       | Yes     |
| timeout              | A timeout value in milliseconds, where the buffered events who are older than the given timeout period get flushed every second.                                        | `-1` (timeout is infinite)                           | LONG                | Yes      | No      |
| max.k                | The maximum K-Slack window threshold (`K` parameter).                                                                                                                 | \`9,223,372,036,854,775,807\` (The maximum Long value) | LONG                | Yes      | No      |
| discard.late.arrival | If set to `true` the processor would discarded the out-of-order events arriving later than the K-Slack window, and in otherwise it allows the late arrivals to proceed. | false                                                  | BOOL                | Yes      | No      |

EXAMPLE 1
```js
    define stream StockStream (eventTime long, symbol string, volume long);

    @info(name = 'query1')
    from StockStream#reorder:kslack(eventTime, 5000)
    select eventTime, symbol, volume
    insert into OutputStream;
```
The query reorders events based on the `eventTime` attribute value,
and it forcefully flushes all the events who have arrived older than the
given `timeout` value (`5000` milliseconds) every second.

Script
------

### javascript (Script)

This extension allows you to include JavaScript functions within the Query Language.

Syntax
```js
    define function <FunctionName>[javascript] return <type> {
        // Script code
    };
```
EXAMPLE 1
```js
    define function concatJ[JavaScript] return string {"  var str1 = data[0];
     var str2 = data[1];
     var str3 = data[2];
     var res = str1.concat(str2,str3);
     return res;
    };
```
This JS function will consume 3 var variables, concatenate them and will
return as a string

Sink
----

### email (Sink)

The email sink uses the `smtp` server to publish events via emails.
The events can be published in `text`, `xml` or `json` formats.
The user can define email sink parameters in either the
`\<SP_HOME>/conf/<PROFILE>/deployment yaml` file or in the stream
definition. The email sink first checks the stream definition for
parameters, and if they are no configured there, it checks the
`deployment.yaml` file. If the parameters are not configured in either
place, default values are considered for optional parameters. If you
need to configure server system parameters that are not provided as
options in the stream definition, then those parameters need to be
defined them in the `deployment.yaml` file under `email sink
properties`. For more information about the SMTP server parameters, see
https://javaee.github.io/javamail/SMTP-Transport. Further, some email
accounts are required to enable the `access to less secure apps`
option. For gmail accounts, you can enable this option via
https://myaccount.google.com/lesssecureapps.

Syntax
```js
    @sink(type="email", username="<STRING>", address="<STRING>", password="<STRING>", host="<STRING>", port="<INT>", ssl.enable="<BOOL>", auth="<BOOL>", content.type="<STRING>", subject="<STRING>", to="<STRING>", cc="<STRING>", bcc="<STRING>", attachments="<STRING>", connection.pool.size="<INT>", @map(...)))
```
QUERY PARAMETERS

| Name                 | Description                                                                                                                                                                                                                                                                   | Default Value                                              | Possible Data Types | Optional | Dynamic |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------|---------------------|----------|---------|
| username             | The username of the email account that is used to send emails. e.g., `abc` is the username of the `abc@gmail.com` account.                                                                                                                                               |                                                            | STRING              | No       | No      |
| address              | The address of the email account that is used to send emails.                                                                                                                                                                                                                 |                                                            | STRING              | No       | No      |
| password             | The password of the email account.                                                                                                                                                                                                                                            |                                                            | STRING              | No       | No      |
| host                 | The host name of the SMTP server. e.g., `smtp.gmail.com` is a host name for a gmail account. The default value `smtp.gmail.com` is only valid if the email account is a gmail account.                                                                                    | smtp.gmail.com                                             | STRING              | Yes      | No      |
| port                 | The port that is used to create the connection.                                                                                                                                                                                                                               | `465` the default value is only valid is SSL is enabled. | INT                 | Yes      | No      |
| ssl.enable           | This parameter specifies whether the connection should be established via a secure connection or not. The value can be either `true` or `false`. If it is `true`, then the connection is establish via the 493 port which is a secure connection.                       | true                                                       | BOOL                | Yes      | No      |
| auth                 | This parameter specifies whether to use the `AUTH` command when authenticating or not. If the parameter is set to `true`, an attempt is made to authenticate the user using the `AUTH` command.                                                                         | true                                                       | BOOL                | Yes      | No      |
| content.type         | The content type can be either `text/plain` or `text/html`.                                                                                                                                                                                                               | text/plain                                                 | STRING              | Yes      | No      |
| subject              | The subject of the mail to be send.                                                                                                                                                                                                                                           |                                                            | STRING              | No       | Yes     |
| to                   | The address of the `to` recipient. If there are more than one `to` recipients, then all the required addresses can be given as a comma-separated list.                                                                                                                    |                                                            | STRING              | No       | Yes     |
| cc                   | The address of the `cc` recipient. If there are more than one `cc` recipients, then all the required addresses can be given as a comma-separated list.                                                                                                                    | None                                                       | STRING              | Yes      | No      |
| bcc                  | The address of the `bcc` recipient. If there are more than one `bcc` recipients, then all the required addresses can be given as a comma-separated list.                                                                                                                  | None                                                       | STRING              | Yes      | No      |
| attachments          | File paths of the files that need to be attached to the email. These paths should be absolute paths. They can be either directories or files . If the path is to a directory, all the files located at the first level (i.e., not within another sub directory) are attached. | None                                                       | STRING              | Yes      | Yes     |
| connection.pool.size | Number of concurrent Email client connections.                                                                                                                                                                                                                                | 1                                                          | INT                 | Yes      | No      |

System Parameters

| Name                              | Description                                                                                                                                                                                                                                                                                                                                                                           | Default Value                                                   | Possible Parameters                                                                                                                               |
|-----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| mail.smtp.ssl.trust               | If this parameter is se, and a socket factory has not been specified, it enables the use of a MailSSLSocketFactory. If this parameter is set to "*", all the hosts are trusted. If it is set to a whitespace-separated list of hosts, only those specified hosts are trusted. If not, the hosts trusted depends on the certificate presented by the server.                        | \*                                                              | String                                                                                                                                            |
| mail.smtp.connectiontimeout       | The socket connection timeout value in milliseconds.                                                                                                                                                                                                                                                                                                                                  | infinite timeout                                                | Any Integer                                                                                                                                       |
| mail.smtp.timeout                 | The socket I/O timeout value in milliseconds.                                                                                                                                                                                                                                                                                                                                         | infinite timeout                                                | Any Integer                                                                                                                                       |
| mail.smtp.from                    | The email address to use for the SMTP MAIL command. This sets the envelope return address.                                                                                                                                                                                                                                                                                            | Defaults to msg.getFrom() or InternetAddress.getLocalAddress(). | Any valid email address                                                                                                                           |
| mail.smtp.localport               | The local port number to bind to when creating the SMTP socket.                                                                                                                                                                                                                                                                                                                       | Defaults to the port number picked by the Socket class.         | Any Integer                                                                                                                                       |
| mail.smtp.ehlo                    | If this parameter is set to `false`, you must not attempt to sign in with the EHLO command.                                                                                                                                                                                                                                                                                         | true                                                            | true or false                                                                                                                                     |
| mail.smtp.auth.login.disable      | If this is set to `true`, it is not allowed to use the `AUTH LOGIN` command.                                                                                                                                                                                                                                                                                                      | false                                                           | true or false                                                                                                                                     |
| mail.smtp.auth.plain.disable      | If this parameter is set to `true`, it is not allowed to use the `AUTH PLAIN` command.                                                                                                                                                                                                                                                                                            | false                                                           | true or false                                                                                                                                     |
| mail.smtp.auth.digest-md5.disable | If this parameter is set to `true`, it is not allowed to use the `AUTH DIGEST-MD5` command.                                                                                                                                                                                                                                                                                       | false                                                           | true or false                                                                                                                                     |
| mail.smtp.auth.ntlm.disable       | If this parameter is set to `true`, it is not allowed to use the `AUTH NTLM` command                                                                                                                                                                                                                                                                                              | false                                                           | true or false                                                                                                                                     |
| mail.smtp.auth.ntlm.domain        | The NTLM authentication domain.                                                                                                                                                                                                                                                                                                                                                       | None                                                            | The valid NTLM authentication domain name.                                                                                                        |
| mail.smtp.auth.ntlm.flags         | NTLM protocol-specific flags. For more details, see http://curl.haxx.se/rfc/ntlm.html\#theNtlmFlags.                                                                                                                                                                                                                                                                                  | None                                                            | Valid NTLM protocol-specific flags.                                                                                                               |
| mail.smtp.dsn.notify              | The NOTIFY option to the RCPT command.                                                                                                                                                                                                                                                                                                                                                | None                                                            | Either `NEVER`, or a combination of `SUCCESS`, `FAILURE`, and `DELAY` (separated by commas).                                              |
| mail.smtp.dsn.ret                 | The `RET` option to the `MAIL` command.                                                                                                                                                                                                                                                                                                                                           | None                                                            | Either `FULL` or `HDRS`.                                                                                                                      |
| mail.smtp.sendpartial             | If this parameter is set to `true` and a message is addressed to both valid and invalid addresses, the message is sent with a log that reports the partial failure with a `SendFailedException` error. If this parameter is set to `false` (which is default), the message is not sent to any of the recipients when the recipient lists contain one or more invalid addresses. | false                                                           | true or false                                                                                                                                     |
| mail.smtp.sasl.enable             | If this parameter is set to `true`, the system attempts to use the `javax.security.sasl` package to choose an authentication mechanism for the login.                                                                                                                                                                                                                             | false                                                           | true or false                                                                                                                                     |
| mail.smtp.sasl.mechanisms         | Enter a space or a comma-separated list of SASL mechanism names that the system shouldt try to use.                                                                                                                                                                                                                                                                                   | None                                                            |                                                                                                                                                   |
| mail.smtp.sasl.authorizationid    | The authorization ID to be used in the SASL authentication. If no value is specified, the authentication ID (i.e., username) is used.                                                                                                                                                                                                                                                 | username                                                        | Valid ID                                                                                                                                          |
| mail.smtp.sasl.realm              | The realm to be used with the `DIGEST-MD5` authentication.                                                                                                                                                                                                                                                                                                                          | None                                                            |                                                                                                                                                   |
| mail.smtp.quitwait                | If this parameter is set to `false`, the `QUIT` command is issued and the connection is immediately closed. If this parameter is set to `true` (which is default), the transport waits for the response to the QUIT command.                                                                                                                                                    | false                                                           | true or false                                                                                                                                     |
| mail.smtp.reportsuccess           | If this parameter is set to `true`, the transport to includes an `SMTPAddressSucceededException` for each address to which the message is successfully delivered.                                                                                                                                                                                                                 | false                                                           | true or false                                                                                                                                     |
| mail.smtp.socketFactory           | If this parameter is set to a class that implements the `javax.net.SocketFactory` interface, this class is used to create SMTP sockets.                                                                                                                                                                                                                                             | None                                                            | Socket Factory                                                                                                                                    |
| mail.smtp.socketFactory.class     | If this parameter is set, it specifies the name of a class that implements the `javax.net.SocketFactory interface`. This class is used to create SMTP sockets.                                                                                                                                                                                                                      | None                                                            |                                                                                                                                                   |
| mail.smtp.socketFactory.fallback  | If this parameter is set to `true`, the failure to create a socket using the specified socket factory class causes the socket to be created using the `java.net.Socket` class.                                                                                                                                                                                                    | true                                                            | true or false                                                                                                                                     |
| mail.smtp.socketFactory.port      | This specifies the port to connect to when using the specified socket factory.                                                                                                                                                                                                                                                                                                        | 25                                                              | Valid port number                                                                                                                                 |
| mail.smtp.ssl.protocols           | This specifies the SSL protocols that need to be enabled for the SSL connections.                                                                                                                                                                                                                                                                                                     | None                                                            | This parameter specifies a whitespace separated list of tokens that are acceptable to the `javax.net.ssl.SSLSocket.setEnabledProtocols` method. |
| mail.smtp.starttls.enable         | If this parameter is set to `true`, it is possible to issue the `STARTTLS` command (if supported by the server) to switch the connection to a TLS-protected connection before issuing any login commands.                                                                                                                                                                         | false                                                           | true or false                                                                                                                                     |
| mail.smtp.starttls.required       | If this parameter is set to `true`, it is required to use the `STARTTLS` command. If the server does not support the `STARTTLS` command, or if the command fails, the connection method will fail.                                                                                                                                                                              | false                                                           | true or false                                                                                                                                     |
| mail.smtp.socks.host              | This specifies the host name of a SOCKS5 proxy server to be used for the connections to the mail server.                                                                                                                                                                                                                                                                              | None                                                            |                                                                                                                                                   |
| mail.smtp.socks.port              | This specifies the port number for the SOCKS5 proxy server. This needs to be used only if the proxy server is not using the standard port number 1080.                                                                                                                                                                                                                                | 1080                                                            | valid port number                                                                                                                                 |
| mail.smtp.auth.ntlm.disable       | If this parameter is set to `true`, the AUTH NTLM command cannot be issued.                                                                                                                                                                                                                                                                                                         | false                                                           | true or false                                                                                                                                     |
| mail.smtp.mailextension           | The extension string to be appended to the MAIL command.                                                                                                                                                                                                                                                                                                                              | None                                                            |                                                                                                                                                   |
| mail.smtp.userset                 | If this parameter is set to `true`, you should use the `RSET` command instead of the `NOOP` command in the `isConnected` method. In some scenarios, `sendmail` responds slowly after many `NOOP` commands. This is avoided by using `RSET` instead.                                                                                                                     | false                                                           | true or false                                                                                                                                     |

EXAMPLE 1

    @sink(type='email', @map(type ='json'), username='sender.account', address='sender.account@gmail.com',password='account.password',subject='Alerts from gdn Stream Processor',to='{{email}}',)define stream FooStream (email string, loginId int, name string);

This example illustrates how to publish events via an email sink based
on the values provided for the mandatory parameters. As shown in the
example, it publishes events from the `FooStream` in `json` format
as emails to the specified `to` recipients via the email sink. The
email is sent from the `sender.account@gmail.com` email address via a
secure connection.

EXAMPLE 2

    @sink(type='email', @map(type ='json'), subject='Alerts from gdn Stream Processor',to='{{email}}',)define stream FooStream (email string, loginId int, name string);

This example illustrates how to configure the query parameters and the
system parameters in the `deployment.yaml` file. Â Corresponding
parameters need to be configured under `email`, and namespace:`sink`
as follows: Â Â stream processor: extensions: Â Â Â Â Â Â - extension:
Â Â Â Â Â Â Â Â Â Â name:`email` Â Â Â Â Â Â Â Â Â Â namespace:`sink`
Â Â Â Â Â Â Â Â Â Â properties: Â Â Â Â Â Â Â Â Â Â Â Â username: <sender's email username>
Â Â Â Â Â Â Â Â Â Â Â Â address: <sender's email address> Â Â Â Â Â Â Â Â Â Â Â Â password:
<sender's email password> As shown in the example, events from the
FooStream are published in `json` format via the email sink as emails
to the given `to` recipients. The email is sent from the
`sender.account@gmail.com` address via a secure connection.

EXAMPLE 3

    @sink(type='email', @map(type ='json'), username='sender.account', address='sender.account@gmail.com',password='account.password',host='smtp.gmail.com',port='465',ssl.enable='true',auth='true',content.type='text/html',subject='Alerts from gdn Stream Processor-{{name}}',to='to1.account@gmail.com, to2.account@gmail.com',cc='cc1.account@gmail.com, cc2.account@gmail.com',bcc='bcc1.account@gmail.com)define stream FooStream (name string, age int, country string);

This example illustrates how to publish events via the email sink.
Events from the `FooStream` stream are published in `xml` format via
the email sink as a text/html message and sent to the specified `to`,
`cc`, and `bcc` recipients via a secure connection. The `name`
namespace in the `subject` attribute is the value of the `name`
parameter in the corresponding output event.

EXAMPLE 4

    @sink(type='email', @map(type ='json'), username='sender.account', address='sender.account@gmail.com',password='account.password',host='smtp.gmail.com',port='465',ssl.enable='true',auth='true',content.type='text/html',subject='Alerts from gdn Stream Processor-{{name}}',to='to1.account@gmail.com, to2.account@gmail.com',cc='cc1.account@gmail.com, cc2.account@gmail.com',bcc='bcc1.account@gmail.comattachments= '{{attachments}}')define stream FooStream (name string, age int, country string, attachments string);

This example illustrates how to publish events via the email sink. Here,
the email also contains attachments. Â Events from the FooStream are
published in `xml` format via the email sink as a `text/html`
message to the specified `to`,`cc`, and `bcc` recipients via a
secure connection. The `name` namespace in the `subject` attribute
is the value for the `name` parameter in the corresponding output
event. The attachments included in the email message are the local files
available in the path specified as the value for the `attachments`
attribute.

### file (Sink)

File Sink can be used to publish (write) event data which is processed
within stream processor to files. File sink provides support to write
both textual and binary data into files

Syntax
```js
    @sink(type="file", file.uri="<STRING>", append="<BOOL>", add.line.separator="<BOOL>", @map(...)))
```
QUERY PARAMETERS

| Name               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Default Value                                       | Possible Data Types | Optional | Dynamic |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|---------------------|----------|---------|
| file.uri           | Used to specify the file for data to be written.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |                                                     | STRING              | No       | Yes     |
| append             | This parameter is used to specify whether the data should be append to the file or not. If append = `true`, data will be write at the end of the file without changing the existing content. If file does not exist, a new fill will be crated and then data will be written. If append append = `false`, If given file exists, existing content will be deleted and then data will be written back to the file. If given file does not exist, a new file will be created and then data will be written on it. | true                                                | BOOL                | Yes      | No      |
| add.line.separator | This parameter is used to specify whether events added to the file should be separated by a newline. If add.event.separator= `true`,then a newline will be added after data is added to the file.                                                                                                                                                                                                                                                                                                                | true. (However, if csv mapper is used, it is false) | BOOL                | Yes      | No      |

EXAMPLE 1

    @sink(type='file', @map(type='json'), append='false', file.uri='/abc/{{symbol}}.txt') define stream BarStream (symbol string, price float, volume long);

Under above configuration, for each event, a file will be generated if
there's no such a file,and then data will be written to that file as
json messagesoutput will looks like below. { Â Â Â Â "event":{
Â Â Â Â Â Â Â Â "symbol":"gdn", Â Â Â Â Â Â Â Â "price":55.6,
Â Â Â Â Â Â Â Â "volume":100 Â Â Â Â } }

### grpc (Sink)

This extension publishes event data encoded into GRPC Classes as defined
in the user input jar. This extension has a default gRPC service classes
added. The default service is called "EventService".
If we want to use our custom gRPC services, we have to pack
auto-generated gRPC service classes and protobuf classes into a jar file
and add it into the project classpath (or to the `jars` folder in the
`stream processor-tooling` folder if we use it with `stream processor-tooling`).
This grpc sink is used for scenarios where we send a request and don't
expect a response back. I.e getting a google.protobuf.Empty response
back.

Syntax
```js
    @sink(type="grpc", publisher.url="<STRING>", headers="<STRING>", idle.timeout="<LONG>", keep.alive.time="<LONG>", keep.alive.timeout="<LONG>", keep.alive.without.calls="<BOOL>", enable.retry="<BOOL>", max.retry.attempts="<INT>", retry.buffer.size="<LONG>", per.rpc.buffer.size="<LONG>", channel.termination.waiting.time="<LONG>", truststore.file="<STRING>", truststore.password="<STRING>", truststore.algorithm="<STRING>", tls.store.type="<STRING>", keystore.file="<STRING>", keystore.password="<STRING>", keystore.algorithm="<STRING>", enable.ssl="<BOOL>", mutual.auth.enabled="<BOOL>", @map(...)))
```
QUERY PARAMETERS

| Name                             | Description                                                                                                                                                                                                                                                                                                           | Default Value   | Possible Data Types | Optional | Dynamic |
|----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|---------------------|----------|---------|
| publisher.url                    | The url to which the outgoing events should be published via this extension. This url should consist the host hostPort, port, fully qualified service name, method name in the following format. `grpc://0.0.0.0:9763/<serviceName>/<methodName>` For example: grpc://0.0.0.0:9763/org.gdn.grpc.EventService/consume |                 | STRING              | No       | No      |
| headers                          | GRPC Request headers in format `"'<key>:<value>','<key>:<value>'"`. If header parameter is not provided just the payload is sent                                                                                                                                                                                      | \-              | STRING              | Yes      | No      |
| idle.timeout                     | Set the duration in seconds without ongoing RPCs before going to idle mode.                                                                                                                                                                                                                                           | 1800            | LONG                | Yes      | No      |
| keep.alive.time                  | Sets the time in seconds without read activity before sending a keepalive ping. Keepalives can increase the load on services so must be used with caution. By default set to Long.MAX\_VALUE which disables keep alive pinging.                                                                                       | Long.MAX\_VALUE | LONG                | Yes      | No      |
| keep.alive.timeout               | Sets the time in seconds waiting for read activity after sending a keepalive ping.                                                                                                                                                                                                                                    | 20              | LONG                | Yes      | No      |
| keep.alive.without.calls         | Sets whether keepalive will be performed when there are no outstanding RPC on a connection.                                                                                                                                                                                                                           | false           | BOOL                | Yes      | No      |
| enable.retry                     | Enables the retry mechanism provided by the gRPC library.                                                                                                                                                                                                                                                             | false           | BOOL                | Yes      | No      |
| max.retry.attempts               | Sets max number of retry attempts. The total number of retry attempts for each RPC will not exceed this number even if service config may allow a higher number.                                                                                                                                                      | 5               | INT                 | Yes      | No      |
| retry.buffer.size                | Sets the retry buffer size in bytes. If the buffer limit is exceeded, no RPC could retry at the moment, and in hedging case all hedges but one of the same RPC will cancel.                                                                                                                                           | 16777216        | LONG                | Yes      | No      |
| per.rpc.buffer.size              | Sets the per RPC buffer limit in bytes used for retry. The RPC is not retriable if its buffer limit is exceeded.                                                                                                                                                                                                      | 1048576         | LONG                | Yes      | No      |
| channel.termination.waiting.time | The time in seconds to wait for the channel to become terminated, giving up if the timeout is reached.                                                                                                                                                                                                                | 5               | LONG                | Yes      | No      |
| truststore.file                  | the file path of truststore. If this is provided then server authentication is enabled                                                                                                                                                                                                                                | \-              | STRING              | Yes      | No      |
| truststore.password              | the password of truststore. If this is provided then the integrity of the keystore is checked                                                                                                                                                                                                                         | \-              | STRING              | Yes      | No      |
| truststore.algorithm             | the encryption algorithm to be used for server authentication                                                                                                                                                                                                                                                         | \-              | STRING              | Yes      | No      |
| tls.store.type                   | TLS store type                                                                                                                                                                                                                                                                                                        | \-              | STRING              | Yes      | No      |
| keystore.file                    | the file path of keystore. If this is provided then client authentication is enabled                                                                                                                                                                                                                                  | \-              | STRING              | Yes      | No      |
| keystore.password                | the password of keystore                                                                                                                                                                                                                                                                                              | \-              | STRING              | Yes      | No      |
| keystore.algorithm               | the encryption algorithm to be used for client authentication                                                                                                                                                                                                                                                         | \-              | STRING              | Yes      | No      |
| enable.ssl                       | to enable ssl. If set to true and truststore.file is not given then it will be set to default carbon jks by default                                                                                                                                                                                                   | FALSE           | BOOL                | Yes      | No      |
| mutual.auth.enabled              | to enable mutual authentication. If set to true and truststore.file or keystore.file is not given then it will be set to default carbon jks by default                                                                                                                                                                | FALSE           | BOOL                | Yes      | No      |

EXAMPLE 1
```js
    @sink(type='grpc',
          publisher.url = 'grpc://134.23.43.35:8080/org.gdn.grpc.EventService/consume',
          @map(type='json'))
    define stream FooStream (message String);
```
Here a stream named FooStream is defined with grpc sink. A grpc server
should be running at 194.23.98.100 listening to port 8080. sink.id is
set to 1 here. So we can write a source with sink.id 1 so that it will
listen to responses for requests published from this stream. Note that
since we are using EventService/consume the sink will be operating in
default mode

EXAMPLE 2
```js
    @sink(type='grpc',
          publisher.url = 'grpc://134.23.43.35:8080/org.gdn.grpc.EventService/consume',
          headers='{{headers}}',
          @map(type='json'),
               @payload('{{message}}'))
    define stream FooStream (message String, headers String);
```
A similar example to above but with headers. Headers are also send into
the stream as a data. In the sink headers dynamic property reads the
value and sends it as MetaData with the request

EXAMPLE 3
```js
    @sink(type='grpc',
          publisher.url = 'grpc://134.23.43.35:8080/org.gdn.grpc.MyService/send',
          @map(type='protobuf'),
    define stream FooStream (stringValue string, intValue int,longValue long,booleanValue bool,floatValue float,doubleValue double);
```
Here a stream named FooStream is defined with grpc sink. A grpc server
should be running at 134.23.43.35 listening to port 8080 since there is
no mapper provided, attributes of stream definition should be as same as
the attributes of protobuf message definition.

EXAMPLE 4
```js
    @sink(type='grpc',
          publisher.url = 'grpc://134.23.43.35:8080/org.gdn.grpc.MyService/testMap',
          @map(type='protobuf'),
    define stream FooStream (stringValue string, intValue int,map object);
```
Here a stream named FooStream is defined with grpc sink. A grpc server
should be running at 134.23.43.35 listening to port 8080. The `map
object` in the stream definition defines that this stream is going to
use Map object with grpc service. We can use any map object that extends
`java.util.AbstractMap` class.

EXAMPLE 5
```js
    @sink(type='grpc',
          publisher.url = 'grpc://134.23.43.35:8080/org.gdn.grpc.MyService/testMap',
          @map(type='protobuf',
    @payload(stringValue='a',longValue='b',intValue='c',booleanValue='d',floatValue = 'e', doubleValue = 'f')))
    define stream FooStream (a string, b long, c int,d bool,e float,f double);
```
Here a stream named FooStream is defined with grpc sink. A grpc server
should be running at 194.23.98.100 listening to port 8080. \@payload is
provided in this stream, therefore we can use any name for the
attributes in the stream definition, but we should correctly map those
names with protobuf message attributes. If we are planning to send
metadata within a stream we should use \@payload to map attributes to
identify the metadata attribute and the protobuf attributes separately.

EXAMPLE 6
```js
    @sink(type='grpc',
          publisher.url = 'grpc://194.23.98.100:8888/org.gdn.grpc.test.StreamService/clientStream',
          @map(type='protobuf'))
    define stream FooStream (stringValue string, intValue int,longValue long,booleanValue bool,floatValue float,doubleValue double);
```
Here in the grpc sink, we are sending a stream of requests to the server
that runs on 194.23.98.100 and port 8888. When we need to send a stream
of requests from the grpc sink we have to define a client stream RPC
method.Then the stream processor will identify whether it's a unary method or a
stream method and send requests according to the method type.

### grpc-call (Sink)

This extension publishes event data encoded into GRPC Classes as defined
in the user input jar. This extension has a default gRPC service classes
jar added. The default service is called "EventService".
If we want to use our custom gRPC services, we have to pack
auto-generated gRPC service classes and protobuf classes into a jar file
and add it into the project classpath (or to the `jars` folder in the
`stream processor-tooling` folder if we use it with `stream processor-tooling`).
This grpc-call sink is used for scenarios where we send a request out
and expect a response back. In default mode this will use EventService
process method. grpc-call-response source is used to receive the
responses. A unique sink.id is used to correlate between the sink and
its corresponding source.

Syntax
```js
    @sink(type="grpc-call", publisher.url="<STRING>", sink.id="<INT>", headers="<STRING>", idle.timeout="<LONG>", keep.alive.time="<LONG>", keep.alive.timeout="<LONG>", keep.alive.without.calls="<BOOL>", enable.retry="<BOOL>", max.retry.attempts="<INT>", retry.buffer.size="<LONG>", per.rpc.buffer.size="<LONG>", channel.termination.waiting.time="<LONG>", max.inbound.message.size="<LONG>", max.inbound.metadata.size="<LONG>", truststore.file="<STRING>", truststore.password="<STRING>", truststore.algorithm="<STRING>", tls.store.type="<STRING>", keystore.file="<STRING>", keystore.password="<STRING>", keystore.algorithm="<STRING>", enable.ssl="<BOOL>", mutual.auth.enabled="<BOOL>", @map(...)))
```
QUERY PARAMETERS

| Name                             | Description                                                                                                                                                                                                                                                                                                           | Default Value   | Possible Data Types | Optional | Dynamic |
|----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|---------------------|----------|---------|
| publisher.url                    | The url to which the outgoing events should be published via this extension. This url should consist the host hostPort, port, fully qualified service name, method name in the following format. `grpc://0.0.0.0:9763/<serviceName>/<methodName>` For example: grpc://0.0.0.0:9763/org.gdn.grpc.EventService/consume |                 | STRING              | No       | No      |
| sink.id                          | a unique ID that should be set for each grpc-call-sink. There is a 1:1 mapping between grpc-call sinks and grpc-call-response sources. Each sink has one particular source listening to the responses to requests published from that sink. So the same sink.id should be given when writing the source also.         |                 | INT                 | No       | No      |
| headers                          | GRPC Request headers in format `"'<key>:<value>','<key>:<value>'"`. If header parameter is not provided just the payload is sent                                                                                                                                                                                      | \-              | STRING              | Yes      | No      |
| idle.timeout                     | Set the duration in seconds without ongoing RPCs before going to idle mode.                                                                                                                                                                                                                                           | 1800            | LONG                | Yes      | No      |
| keep.alive.time                  | Sets the time in seconds without read activity before sending a keepalive ping. Keepalives can increase the load on services so must be used with caution. By default set to Long.MAX\_VALUE which disables keep alive pinging.                                                                                       | Long.MAX\_VALUE | LONG                | Yes      | No      |
| keep.alive.timeout               | Sets the time in seconds waiting for read activity after sending a keepalive ping.                                                                                                                                                                                                                                    | 20              | LONG                | Yes      | No      |
| keep.alive.without.calls         | Sets whether keepalive will be performed when there are no outstanding RPC on a connection.                                                                                                                                                                                                                           | false           | BOOL                | Yes      | No      |
| enable.retry                     | Enables the retry and hedging mechanism provided by the gRPC library.                                                                                                                                                                                                                                                 | false           | BOOL                | Yes      | No      |
| max.retry.attempts               | Sets max number of retry attempts. The total number of retry attempts for each RPC will not exceed this number even if service config may allow a higher number.                                                                                                                                                      | 5               | INT                 | Yes      | No      |
| retry.buffer.size                | Sets the retry buffer size in bytes. If the buffer limit is exceeded, no RPC could retry at the moment, and in hedging case all hedges but one of the same RPC will cancel.                                                                                                                                           | 16777216        | LONG                | Yes      | No      |
| per.rpc.buffer.size              | Sets the per RPC buffer limit in bytes used for retry. The RPC is not retriable if its buffer limit is exceeded.                                                                                                                                                                                                      | 1048576         | LONG                | Yes      | No      |
| channel.termination.waiting.time | The time in seconds to wait for the channel to become terminated, giving up if the timeout is reached.                                                                                                                                                                                                                | 5               | LONG                | Yes      | No      |
| max.inbound.message.size         | Sets the maximum message size allowed to be received on the channel in bytes                                                                                                                                                                                                                                          | 4194304         | LONG                | Yes      | No      |
| max.inbound.metadata.size        | Sets the maximum size of metadata allowed to be received in bytes                                                                                                                                                                                                                                                     | 8192            | LONG                | Yes      | No      |
| truststore.file                  | the file path of truststore. If this is provided then server authentication is enabled                                                                                                                                                                                                                                | \-              | STRING              | Yes      | No      |
| truststore.password              | the password of truststore. If this is provided then the integrity of the keystore is checked                                                                                                                                                                                                                         | \-              | STRING              | Yes      | No      |
| truststore.algorithm             | the encryption algorithm to be used for server authentication                                                                                                                                                                                                                                                         | \-              | STRING              | Yes      | No      |
| tls.store.type                   | TLS store type                                                                                                                                                                                                                                                                                                        | \-              | STRING              | Yes      | No      |
| keystore.file                    | the file path of keystore. If this is provided then client authentication is enabled                                                                                                                                                                                                                                  | \-              | STRING              | Yes      | No      |
| keystore.password                | the password of keystore                                                                                                                                                                                                                                                                                              | \-              | STRING              | Yes      | No      |
| keystore.algorithm               | the encryption algorithm to be used for client authentication                                                                                                                                                                                                                                                         | \-              | STRING              | Yes      | No      |
| enable.ssl                       | to enable ssl. If set to true and truststore.file is not given then it will be set to default carbon jks by default                                                                                                                                                                                                   | FALSE           | BOOL                | Yes      | No      |
| mutual.auth.enabled              | to enable mutual authentication. If set to true and truststore.file or keystore.file is not given then it will be set to default carbon jks by default                                                                                                                                                                | FALSE           | BOOL                | Yes      | No      |

EXAMPLE 1
```js
    @sink(type='grpc-call',
          publisher.url = 'grpc://194.23.98.100:8080/EventService/process',
          sink.id= '1', @map(type='json'))
    define stream FooStream (message String);
    @source(type='grpc-call-response', sink.id= '1')
    define stream BarStream (message String);
```
Here a stream named FooStream is defined with grpc sink. A grpc server
should be running at 194.23.98.100 listening to port 8080. sink.id is
set to 1 here. So we can write a source with sink.id 1 so that it will
listen to responses for requests published from this stream. Note that
since we are using EventService/process the sink will be operating in
default mode

EXAMPLE 2
```js
    @sink(type='grpc-call',
          publisher.url = 'grpc://194.23.98.100:8080/EventService/process',
          sink.id= '1', @map(type='json'))
    define stream FooStream (message String);

    @source(type='grpc-call-response', sink.id= '1')
    define stream BarStream (message String);
```
Here with the same FooStream definition we have added a BarStream which
has a grpc-call-response source with the same sink.id 1. So the
responses for calls sent from the FooStream will be added to BarStream.

EXAMPLE 3
```js
    @sink(type='grpc-call',
          publisher.url = 'grpc://194.23.98.100:8888/org.gdn.grpc.test.MyService/process',
          sink.id= '1', @map(type='protobuf'))
    define stream FooStream (stringValue string, intValue int,longValue long,booleanValue bool,floatValue float,doubleValue double);

    @source(type='grpc-call-response', receiver.url = 'grpc://localhost:8888/org.gdn.grpc.MyService/process', sink.id= '1',
    @map(type='protobuf'))define stream FooStream (stringValue string, intValue int,longValue long,booleanValue bool,floatValue float,doubleValue double);
```
Here a stream named FooStream is defined with grpc sink. A grpc server
should be running at 194.23.98.100 listening to port 8080. We have added
another stream called BarStream which is a grpc-call-response source
with the same sink.id 1 and as same as FooStream definition. So the
responses for calls sent from the FooStream will be added to BarStream.
Since there is no mapping available in the stream definition attributes
names should be as same as the attributes of the protobuf message
definition. (Here the only reason we provide receiver.url in the
grpc-call-response source is for protobuf mapper to map Response into a
stream processor event, we can give any address and any port number in the URL,
but we should provide the service name and the method name correctly)

EXAMPLE 4
```js
    @sink(type='grpc-call',
          publisher.url = 'grpc://194.23.98.100:8888/org.gdn.grpc.test.MyService/process',
          sink.id= '1', @map(type='protobuf',
    @payload(stringValue='a',longValue='c',intValue='b',booleanValue='d',floatValue = 'e', doubleValue = 'f')))define stream FooStream (a string, b int,c long,d bool,e float,f double);

    @source(type='grpc-call-response', receiver.url = 'grpc://localhost:8888/org.gdn.grpc.test.MyService/process', sink.id= '1',
    @map(type='protobuf',@attributes(a = 'stringValue', b = 'intValue', c = 'longValue',d = 'booleanValue', e ='floatValue', f ='doubleValue')))define stream FooStream (a string, b int,c long,d bool,e float,f double);
```
Here with the same FooStream definition we have added a BarStream which
has a grpc-call-response source with the same sink.id 1. So the
responses for calls sent from the FooStream will be added to BarStream.
In this stream we provided mapping for both the sink and the source. so
we can use any name for the attributes in the stream definition, but we
have to map those attributes with correct protobuf attributes. As same
as the grpc-sink, if we are planning to use metadata we should map the
attributes.

### grpc-service-response (Sink)

This extension is used to send responses back to a gRPC client after
receiving requests through grpc-service source. This correlates with the
particular source using a unique source.id

Syntax
```js
    @sink(type="grpc-service-response", source.id="<INT>", @map(...)))
```
QUERY PARAMETERS

| Name      | Description                                                                                                             | Default Value | Possible Data Types | Optional | Dynamic |
|-----------|-------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| source.id | A unique id to identify the correct source to which this sink is mapped. There is a 1:1 mapping between source and sink |               | INT                 | No       | No      |

EXAMPLE 1
```js
    @sink(type='grpc-service-response',
          source.id='1',
          @map(type='json'))
    define stream BarStream (messageId String, message String);

    @source(type='grpc-service',
            url='grpc://134.23.43.35:8080/org.gdn.grpc.EventService/process',
            source.id='1',
            @map(type='json',
                 @attributes(messageId='trp:messageId', message='message')))
    define stream FooStream (messageId String, message String);
    from FooStream
    select *
    insert into BarStream;
```
The grpc requests are received through the grpc-service sink. Each
received event is sent back through grpc-service-source. This is just a
passthrough as we are selecting everything from FooStream
and inserting into BarStream.

### http (Sink)

HTTP sink publishes messages via HTTP or HTTPS protocols using methods
such as POST, GET, PUT, and DELETE on formats `text`, `XML` and `JSON`.
It can also publish to endpoints protected by basic authentication or
OAuth 2.0.

Syntax
```js
    @sink(type="http", publisher.url="<STRING>", basic.auth.username="<STRING>", basic.auth.password="<STRING>", https.truststore.file="<STRING>", https.truststore.password="<STRING>", oauth.username="<STRING>", oauth.password="<STRING>", consumer.key="<STRING>", consumer.secret="<STRING>", token.url="<STRING>", refresh.token="<STRING>", headers="<STRING>", method="<STRING>", socket.idle.timeout="<INT>", chunk.disabled="<BOOL>", ssl.protocol="<STRING>", ssl.verification.disabled="<BOOL>", tls.store.type="<STRING>", ssl.configurations="<STRING>", proxy.host="<STRING>", proxy.port="<STRING>", proxy.username="<STRING>", proxy.password="<STRING>", client.bootstrap.configurations="<STRING>", max.pool.active.connections="<INT>", min.pool.idle.connections="<INT>", max.pool.idle.connections="<INT>", min.evictable.idle.time="<STRING>", time.between.eviction.runs="<STRING>", max.wait.time="<STRING>", test.on.borrow="<BOOL>", test.while.idle="<BOOL>", exhausted.action="<INT>", hostname.verification.enabled="<BOOL>", @map(...)))
```
QUERY PARAMETERS

| Name                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Default Value                                                | Possible Data Types | Optional | Dynamic |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|---------------------|----------|---------|
| publisher.url                   | The URL to which the outgoing events should be published. Examples: `http://localhost:8080/endpoint`, `https://localhost:8080/endpoint`                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |                                                              | STRING              | No       | No      |
| basic.auth.username             | The username to be included in the authentication header when calling endpoints protected by basic authentication. `basic.auth.password` property should be also set when using this property.                                                                                                                                                                                                                                                                                                                                                                                                               | \-                                                           | STRING              | Yes      | No      |
| basic.auth.password             | The password to be included in the authentication header when calling endpoints protected by basic authentication. `basic.auth.username` property should be also set when using this property.                                                                                                                                                                                                                                                                                                                                                                                                               | \-                                                           | STRING              | Yes      | No      |
| https.truststore.file           | The file path of the client truststore when sending messages through `https` protocol.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | \`\${carbon.home}/resources/security/client-truststore.jks\` | STRING              | Yes      | No      |
| https.truststore.password       | The password for the client-truststore.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | gdncarbon                                                   | STRING              | Yes      | No      |
| oauth.username                  | The username to be included in the authentication header when calling endpoints protected by OAuth 2.0. `oauth.password` property should be also set when using this property.                                                                                                                                                                                                                                                                                                                                                                                                                               | \-                                                           | STRING              | Yes      | No      |
| oauth.password                  | The password to be included in the authentication header when calling endpoints protected by OAuth 2.0. `oauth.username` property should be also set when using this property.                                                                                                                                                                                                                                                                                                                                                                                                                               | \-                                                           | STRING              | Yes      | No      |
| consumer.key                    | Consumer key used for calling endpoints protected by OAuth 2.0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | \-                                                           | STRING              | Yes      | No      |
| consumer.secret                 | Consumer secret used for calling endpoints protected by OAuth 2.0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | \-                                                           | STRING              | Yes      | No      |
| token.url                       | Token URL to generate a new access tokens when calling endpoints protected by OAuth 2.0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | \-                                                           | STRING              | Yes      | No      |
| refresh.token                   | Refresh token used for generating new access tokens when calling endpoints protected by OAuth 2.0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | \-                                                           | STRING              | Yes      | No      |
| headers                         | HTTP request headers in format `"'<key>:<value>','<key>:<value>'"`. When `Content-Type` header is not provided the system derives the Content-Type based on the provided sink mapper as following: Â - `@map(type='xml')`: `application/xml` Â - `@map(type='json')`: `application/json` Â - `@map(type='text')`: `plain/text` Â - `@map(type='keyvalue')`: `application/x-www-form-urlencoded` Â - For all other cases system defaults to `plain/text` Also the `Content-Length` header need not to be provided, as the system automatically defines it by calculating the size of the payload.                  | Content-Type and Content-Length headers                      | STRING              | Yes      | No      |
| method                          | The HTTP method used for calling the endpoint.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | POST                                                         | STRING              | Yes      | No      |
| socket.idle.timeout             | Socket timeout in millis.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 6000                                                         | INT                 | Yes      | No      |
| chunk.disabled                  | Disable chunked transfer encoding.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | false                                                        | BOOL                | Yes      | No      |
| ssl.protocol                    | SSL/TLS protocol.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | TLS                                                          | STRING              | Yes      | No      |
| ssl.verification.disabled       | Disable SSL verification.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | false                                                        | BOOL                | Yes      | No      |
| tls.store.type                  | TLS store type.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | JKS                                                          | STRING              | Yes      | No      |
| ssl.configurations              | SSL/TSL configurations in format `"'<key>:<value>','<key>:<value>'"`. Some supported parameters: Â - SSL/TLS protocols: `'sslEnabledProtocols:TLSv1.1,TLSv1.2'` Â - List of ciphers: `'ciphers:TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256'` Â - Enable session creation: `'client.enable.session.creation:true'` Â - Supported server names: `'server.suported.server.names:server'` Â - Add HTTP SNIMatcher: `'server.supported.snimatchers:SNIMatcher'`                                                                                                                                                              | \-                                                           | STRING              | Yes      | No      |
| proxy.host                      | Proxy server host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | \-                                                           | STRING              | Yes      | No      |
| proxy.port                      | Proxy server port                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | \-                                                           | STRING              | Yes      | No      |
| proxy.username                  | Proxy server username                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | \-                                                           | STRING              | Yes      | No      |
| proxy.password                  | Proxy server password                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | \-                                                           | STRING              | Yes      | No      |
| client.bootstrap.configurations | Client bootstrap configurations in format `"'<key>:<value>','<key>:<value>'"`. Some supported configurations : Â - Client connect timeout in millis: `'client.bootstrap.connect.timeout:15000'` Â - Client socket timeout in seconds: `'client.bootstrap.socket.timeout:15'` Â - Client socket reuse: `'client.bootstrap.socket.reuse:true'` Â - Enable TCP no delay: `'client.bootstrap.nodelay:true'` Â - Enable client keep alive: `'client.bootstrap.keepalive:true'` Â - Send buffer size: `'client.bootstrap.sendbuffersize:1048576'` Â - Receive buffer size: `'client.bootstrap.recievebuffersize:1048576'` | \-                                                           | STRING              | Yes      | No      |
| max.pool.active.connections     | Maximum possible number of active connection per client pool.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | -1                                                           | INT                 | Yes      | No      |
| min.pool.idle.connections       | Minimum number of idle connections that can exist per client pool.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 0                                                            | INT                 | Yes      | No      |
| max.pool.idle.connections       | Maximum number of idle connections that can exist per client pool.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 100                                                          | INT                 | Yes      | No      |
| min.evictable.idle.time         | Minimum time (in millis) a connection may sit idle in the client pool before it become eligible for eviction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 300000                                                       | STRING              | Yes      | No      |
| time.between.eviction.runs      | Time between two eviction operations (in millis) on the client pool.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 30000                                                        | STRING              | Yes      | No      |
| max.wait.time                   | The maximum time (in millis) the pool will wait (when there are no available connections) for a connection to be returned to the pool.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 60000                                                        | STRING              | Yes      | No      |
| test.on.borrow                  | Enable connections to be validated before being borrowed from the client pool.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | true                                                         | BOOL                | Yes      | No      |
| test.while.idle                 | Enable connections to be validated during the eviction operation (if any).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | true                                                         | BOOL                | Yes      | No      |
| exhausted.action                | Action that should be taken when the maximum number of active connections are being used. This action should be indicated as an int and possible action values are following. 0 - Fail the request. 1 - Block the request, until a connection returns to the pool. 2 - Grow the connection pool size.                                                                                                                                                                                                                                                                                                        | 1 (Block when exhausted)                                     | INT                 | Yes      | No      |
| hostname.verification.enabled   | Enable hostname verification.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | true                                                         | BOOL                | Yes      | No      |

System Parameters

| Name                           | Description                                                                                                                             | Default Value                                                | Possible Parameters                     |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|-----------------------------------------|
| clientBootstrapClientGroupSize | Number of client threads to perform non-blocking read and write to one or more channels.                                                | (Number of available processors) \* 2                        | Any positive integer                    |
| clientBootstrapBossGroupSize   | Number of boss threads to accept incoming connections.                                                                                  | Number of available processors                               | Any positive integer                    |
| clientBootstrapWorkerGroupSize | Number of worker threads to accept the connections from boss threads and perform non-blocking read and write from one or more channels. | (Number of available processors) \* 2                        | Any positive integer                    |
| trustStoreLocation             | The default truststore file path.                                                                                                       | \`\${carbon.home}/resources/security/client-truststore.jks\` | Path to client truststore \`.jks\` file |
| trustStorePassword             | The default truststore password.                                                                                                        | gdncarbon                                                   | Truststore password as string           |

EXAMPLE 1
```js
    @sink(type = 'http', publisher.url = 'http://stocks.com/stocks',
          @map(type = 'json'))
    define stream StockStream (symbol string, price float, volume long);
```
Events arriving on the StockStream will be published to the HTTP
endpoint `http://stocks.com/stocks` using `POST` method with
Content-Type `application/json` by converting those events to the
default JSON format as following:
```js
    {
      "event": {
        "symbol": "FB",
        "price": 24.5,
        "volume": 5000
      }
    }
```
EXAMPLE 2
```js
    @sink(type='http', publisher.url = 'http://localhost:8009/foo',
          client.bootstrap.configurations = "'client.bootstrap.socket.timeout:20'",
          max.pool.active.connections = '1', headers = "{{headers}}",
          @map(type='xml', @payload("""<stock>
    {{payloadBody}}
    </stock>""")))
    define stream FooStream (payloadBody String, headers string);
```
Events arriving on FooStream will be published to the HTTP endpoint
`http://localhost:8009/foo` using `POST` method with Content-Type
`application/xml` and setting `payloadBody` and `header` attribute
values. If the `payloadBody` contains
```js
    <symbol>gdn</symbol>
    <price>55.6</price>
    <volume>100</volume>
```
and `header` contains `'topic:foobar'` values, then the system will
generate an output with the body:
```js
    <stock>
    <symbol>gdn</symbol>
    <price>55.6</price>
    <volume>100</volume>
    </stock>
```
and HTTP headers: `Content-Length:xxx`, `Content-Location:'xxx'`,
`Content-Type:'application/xml'`, `HTTP_METHOD:'POST'`

### http-call (Sink)

The http-call sink publishes messages to endpoints via HTTP or HTTPS
protocols using methods such as POST, GET, PUT, and DELETE on formats
`text`, `XML` or `JSON` and consume responses through its corresponding
http-call-response source. It also supports calling endpoints protected
with basic authentication or OAuth 2.0.

Syntax
```js
    @sink(type="http-call", publisher.url="<STRING>", sink.id="<STRING>", basic.auth.username="<STRING>", basic.auth.password="<STRING>", https.truststore.file="<STRING>", https.truststore.password="<STRING>", oauth.username="<STRING>", oauth.password="<STRING>", consumer.key="<STRING>", consumer.secret="<STRING>", token.url="<STRING>", refresh.token="<STRING>", headers="<STRING>", method="<STRING>", downloading.enabled="<BOOL>", download.path="<STRING>", blocking.io="<BOOL>", socket.idle.timeout="<INT>", chunk.disabled="<BOOL>", ssl.protocol="<STRING>", ssl.verification.disabled="<BOOL>", ssl.configurations="<STRING>", proxy.host="<STRING>", proxy.port="<STRING>", proxy.username="<STRING>", proxy.password="<STRING>", client.bootstrap.configurations="<STRING>", max.pool.active.connections="<INT>", min.pool.idle.connections="<INT>", max.pool.idle.connections="<INT>", min.evictable.idle.time="<STRING>", time.between.eviction.runs="<STRING>", max.wait.time="<STRING>", test.on.borrow="<BOOL>", test.while.idle="<BOOL>", exhausted.action="<INT>", hostname.verification.enabled="<BOOL>", @map(...)))
```
QUERY PARAMETERS

| Name                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Default Value                                                | Possible Data Types | Optional | Dynamic |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|---------------------|----------|---------|
| publisher.url                   | The URL which should be called. Examples: `http://localhost:8080/endpoint`, `https://localhost:8080/endpoint`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                                              | STRING              | No       | No      |
| sink.id                         | Identifier to correlate the http-call sink to its corresponding http-call-response sources to retrieved the responses.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                                              | STRING              | No       | No      |
| basic.auth.username             | The username to be included in the authentication header when calling endpoints protected by basic authentication. `basic.auth.password` property should be also set when using this property.                                                                                                                                                                                                                                                                                                                                                                                                               | \-                                                           | STRING              | Yes      | No      |
| basic.auth.password             | The password to be included in the authentication header when calling endpoints protected by basic authentication. `basic.auth.username` property should be also set when using this property.                                                                                                                                                                                                                                                                                                                                                                                                               | \-                                                           | STRING              | Yes      | No      |
| https.truststore.file           | The file path of the client truststore when sending messages through `https` protocol.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | \`\${carbon.home}/resources/security/client-truststore.jks\` | STRING              | Yes      | No      |
| https.truststore.password       | The password for the client-truststore.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | gdncarbon                                                   | STRING              | Yes      | No      |
| oauth.username                  | The username to be included in the authentication header when calling endpoints protected by OAuth 2.0. `oauth.password` property should be also set when using this property.                                                                                                                                                                                                                                                                                                                                                                                                                               | \-                                                           | STRING              | Yes      | No      |
| oauth.password                  | The password to be included in the authentication header when calling endpoints protected by OAuth 2.0. `oauth.username` property should be also set when using this property.                                                                                                                                                                                                                                                                                                                                                                                                                               | \-                                                           | STRING              | Yes      | No      |
| consumer.key                    | Consumer key used for calling endpoints protected by OAuth 2.0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | \-                                                           | STRING              | Yes      | No      |
| consumer.secret                 | Consumer secret used for calling endpoints protected by OAuth 2.0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | \-                                                           | STRING              | Yes      | No      |
| token.url                       | Token URL to generate a new access tokens when calling endpoints protected by OAuth 2.0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | \-                                                           | STRING              | Yes      | No      |
| refresh.token                   | Refresh token used for generating new access tokens when calling endpoints protected by OAuth 2.0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | \-                                                           | STRING              | Yes      | No      |
| headers                         | HTTP request headers in format `"'<key>:<value>','<key>:<value>'"`. When the `Content-Type` header is not provided the system decides the Content-Type based on the provided sink mapper as following: Â - `@map(type='xml')`: `application/xml` Â - `@map(type='json')`: `application/json` Â - `@map(type='text')`: `plain/text` Â - `@map(type='keyvalue')`: `application/x-www-form-urlencoded` Â - For all other cases system defaults to `plain/text` Also the `Content-Length` header need not to be provided, as the system automatically defines it by calculating the size of the payload.              | Content-Type and Content-Length headers                      | STRING              | Yes      | No      |
| method                          | The HTTP method used for calling the endpoint.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | POST                                                         | STRING              | Yes      | No      |
| downloading.enabled             | Enable response received by the http-call-response source to be written to a file. When this is enabled the `download.path` property should be also set.                                                                                                                                                                                                                                                                                                                                                                                                                                                     | false                                                        | BOOL                | Yes      | No      |
| download.path                   | The absolute file path along with the file name where the downloads should be saved.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | \-                                                           | STRING              | Yes      | Yes     |
| blocking.io                     | Blocks the request thread until a response it received from HTTP call-response source before sending any other request.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | false                                                        | BOOL                | Yes      | No      |
| socket.idle.timeout             | Socket timeout in millis.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 6000                                                         | INT                 | Yes      | No      |
| chunk.disabled                  | Disable chunked transfer encoding.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | false                                                        | BOOL                | Yes      | No      |
| ssl.protocol                    | SSL/TLS protocol.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | TLS                                                          | STRING              | Yes      | No      |
| ssl.verification.disabled       | Disable SSL verification.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | false                                                        | BOOL                | Yes      | No      |
| ssl.configurations              | SSL/TSL configurations. Expected format `"'<key>:<value>','<key>:<value>'"`. Some supported parameters: Â - SSL/TLS protocols: `'sslEnabledProtocols:TLSv1.1,TLSv1.2'` Â - List of ciphers: `'ciphers:TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256'` Â - Enable session creation: `'client.enable.session.creation:true'` Â - Supported server names: `'server.suported.server.names:server'` Â - Add HTTP SNIMatcher: `'server.supported.snimatchers:SNIMatcher'`                                                                                                                                                       | \-                                                           | STRING              | Yes      | No      |
| proxy.host                      | Proxy server host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | \-                                                           | STRING              | Yes      | No      |
| proxy.port                      | Proxy server port                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | \-                                                           | STRING              | Yes      | No      |
| proxy.username                  | Proxy server username                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | \-                                                           | STRING              | Yes      | No      |
| proxy.password                  | Proxy server password                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | \-                                                           | STRING              | Yes      | No      |
| client.bootstrap.configurations | Client bootstrap configurations in format `"'<key>:<value>','<key>:<value>'"`. Some supported configurations : Â - Client connect timeout in millis: `'client.bootstrap.connect.timeout:15000'` Â - Client socket timeout in seconds: `'client.bootstrap.socket.timeout:15'` Â - Client socket reuse: `'client.bootstrap.socket.reuse:true'` Â - Enable TCP no delay: `'client.bootstrap.nodelay:true'` Â - Enable client keep alive: `'client.bootstrap.keepalive:true'` Â - Send buffer size: `'client.bootstrap.sendbuffersize:1048576'` Â - Receive buffer size: `'client.bootstrap.recievebuffersize:1048576'` | \-                                                           | STRING              | Yes      | No      |
| max.pool.active.connections     | Maximum possible number of active connection per client pool.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | -1                                                           | INT                 | Yes      | No      |
| min.pool.idle.connections       | Minimum number of idle connections that can exist per client pool.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 0                                                            | INT                 | Yes      | No      |
| max.pool.idle.connections       | Maximum number of idle connections that can exist per client pool.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 100                                                          | INT                 | Yes      | No      |
| min.evictable.idle.time         | Minimum time (in millis) a connection may sit idle in the client pool before it become eligible for eviction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 300000                                                       | STRING              | Yes      | No      |
| time.between.eviction.runs      | Time between two eviction operations (in millis) on the client pool.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 30000                                                        | STRING              | Yes      | No      |
| max.wait.time                   | The maximum time (in millis) the pool will wait (when there are no available connections) for a connection to be returned to the pool.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 60000                                                        | STRING              | Yes      | No      |
| test.on.borrow                  | Enable connections to be validated before being borrowed from the client pool.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | true                                                         | BOOL                | Yes      | No      |
| test.while.idle                 | Enable connections to be validated during the eviction operation (if any).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | true                                                         | BOOL                | Yes      | No      |
| exhausted.action                | Action that should be taken when the maximum number of active connections are being used. This action should be indicated as an int and possible action values are following. 0 - Fail the request. 1 - Block the request, until a connection returns to the pool. 2 - Grow the connection pool size.                                                                                                                                                                                                                                                                                                        | 1 (Block when exhausted)                                     | INT                 | Yes      | No      |
| hostname.verification.enabled   | Enable hostname verification                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | true                                                         | BOOL                | Yes      | No      |

System Parameters

| Name                           | Description                                                                                                                             | Default Value                                                | Possible Parameters                     |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|-----------------------------------------|
| clientBootstrapClientGroupSize | Number of client threads to perform non-blocking read and write to one or more channels.                                                | (Number of available processors) \* 2                        | Any positive integer                    |
| clientBootstrapBossGroupSize   | Number of boss threads to accept incoming connections.                                                                                  | Number of available processors                               | Any positive integer                    |
| clientBootstrapWorkerGroupSize | Number of worker threads to accept the connections from boss threads and perform non-blocking read and write from one or more channels. | (Number of available processors) \* 2                        | Any positive integer                    |
| trustStoreLocation             | The default truststore file path.                                                                                                       | \`\${carbon.home}/resources/security/client-truststore.jks\` | Path to client truststore \`.jks\` file |
| trustStorePassword             | The default truststore password.                                                                                                        | gdncarbon                                                   | Truststore password as string           |

EXAMPLE 1
```js
    @sink(type='http-call', sink.id='foo',
          publisher.url='http://localhost:8009/foo',
          @map(type='xml', @payload('{{payloadBody}}')))
    define stream FooStream (payloadBody string);

    @source(type='http-call-response', sink.id='foo',
            @map(type='text', regex.A='((.|\n)*)',
                 @attributes(headers='trp:headers', message='A[1]')))
    define stream ResponseStream(message string, headers string);
```
When events arrive in `FooStream`, http-call sink makes calls to
endpoint on url `http://localhost:8009/foo` with `POST` method and
Content-Type `application/xml`. If the event `payloadBody` attribute
contains following XML:
```js
    <item>
        <name>apple</name>
        <price>55</price>
        <quantity>5</quantity>
    </item>
```
the http-call sink maps that and sends it to the endpoint. When endpoint
sends a response it will be consumed by the corresponding
http-call-response source correlated via the same `sink.id` `foo` and
that will map the response message and send it via `ResponseStream`
steam by assigning the message body as `message` attribute and response
headers as `headers` attribute of the event.

EXAMPLE 2
```js
    @sink(type='http-call', publisher.url='http://localhost:8005/files/{{name}}'
          downloading.enabled='true', download.path='{{downloadPath}}{{name}}',
          method='GET', sink.id='download', @map(type='json'))
    define stream DownloadRequestStream(name String, id int, downloadPath string);

    @source(type='http-call-response', sink.id='download',
            http.status.code='2\\d+',
            @map(type='text', regex.A='((.|\n)*)',
                 @attributes(name='trp:name', id='trp:id', file='A[1]')))
    define stream ResponseStream2xx(name string, id string, file string);

    @source(type='http-call-response', sink.id='download',
            http.status.code='4\\d+',
            @map(type='text', regex.A='((.|\n)*)', @attributes(errorMsg='A[1]')))
    define stream ResponseStream4xx(errorMsg string);
```
When events arrive in `DownloadRequestStream` with `name`:`foo.txt`,
`id`:`75` and `downloadPath`:`/user/download/` the http-call sink sends
a GET request to the url `http://localhost:8005/files/foo.txt` to
download the file to the given path `/user/download/foo.txt` and capture
the response via its corresponding http-call-response source based on
the response status code. If the response status code is in the range of
200 the message will be received by the http-call-response source
associated with the `ResponseStream2xx` stream which expects
`http.status.code` with regex `2\\d+` while downloading the file to the
local file system on the path `/user/download/foo.txt` and mapping the
response message having the absolute file path to event's `file`
attribute. If the response status code is in the range of 400 then the
message will be received by the http-call-response source associated
with the `ResponseStream4xx` stream which expects `http.status.code`
with regex `4\\d+` while mapping the error response to the `errorMsg`
attribute of the event.

### ~~http-request (Sink)~~

*Deprecated*

\_(Use http-call sink instead).\_ The http-request sink publishes
messages to endpoints via HTTP or HTTPS protocols using methods such as
POST, GET, PUT, and DELETE on formats `text`, `XML` or `JSON` and
consume responses through its corresponding http-response source. It
also supports calling endpoints protected with basic authentication or
OAuth 2.0.

Syntax
```js
    @sink(type="http-request", publisher.url="<STRING>", sink.id="<STRING>", basic.auth.username="<STRING>", basic.auth.password="<STRING>", https.truststore.file="<STRING>", https.truststore.password="<STRING>", oauth.username="<STRING>", oauth.password="<STRING>", consumer.key="<STRING>", consumer.secret="<STRING>", token.url="<STRING>", refresh.token="<STRING>", headers="<STRING>", method="<STRING>", downloading.enabled="<BOOL>", download.path="<STRING>", blocking.io="<BOOL>", socket.idle.timeout="<INT>", chunk.disabled="<BOOL>", ssl.protocol="<STRING>", ssl.verification.disabled="<BOOL>", ssl.configurations="<STRING>", proxy.host="<STRING>", proxy.port="<STRING>", proxy.username="<STRING>", proxy.password="<STRING>", client.bootstrap.configurations="<STRING>", max.pool.active.connections="<INT>", min.pool.idle.connections="<INT>", max.pool.idle.connections="<INT>", min.evictable.idle.time="<STRING>", time.between.eviction.runs="<STRING>", max.wait.time="<STRING>", test.on.borrow="<BOOL>", test.while.idle="<BOOL>", exhausted.action="<INT>", hostname.verification.enabled="<BOOL>", @map(...)))
```
QUERY PARAMETERS

| Name                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Default Value                                                | Possible Data Types | Optional | Dynamic |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|---------------------|----------|---------|
| publisher.url                   | The URL which should be called. Examples: `http://localhost:8080/endpoint`, `https://localhost:8080/endpoint`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                                              | STRING              | No       | No      |
| sink.id                         | Identifier to correlate the http-request sink to its corresponding http-response sources to retrieved the responses.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |                                                              | STRING              | No       | No      |
| basic.auth.username             | The username to be included in the authentication header when calling endpoints protected by basic authentication. `basic.auth.password` property should be also set when using this property.                                                                                                                                                                                                                                                                                                                                                                                                               | \-                                                           | STRING              | Yes      | No      |
| basic.auth.password             | The password to be included in the authentication header when calling endpoints protected by basic authentication. `basic.auth.username` property should be also set when using this property.                                                                                                                                                                                                                                                                                                                                                                                                               | \-                                                           | STRING              | Yes      | No      |
| https.truststore.file           | The file path of the client truststore when sending messages through `https` protocol.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | \`\${carbon.home}/resources/security/client-truststore.jks\` | STRING              | Yes      | No      |
| https.truststore.password       | The password for the client-truststore.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | gdncarbon                                                   | STRING              | Yes      | No      |
| oauth.username                  | The username to be included in the authentication header when calling endpoints protected by OAuth 2.0. `oauth.password` property should be also set when using this property.                                                                                                                                                                                                                                                                                                                                                                                                                               | \-                                                           | STRING              | Yes      | No      |
| oauth.password                  | The password to be included in the authentication header when calling endpoints protected by OAuth 2.0. `oauth.username` property should be also set when using this property.                                                                                                                                                                                                                                                                                                                                                                                                                               | \-                                                           | STRING              | Yes      | No      |
| consumer.key                    | Consumer key used for calling endpoints protected by OAuth 2.0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | \-                                                           | STRING              | Yes      | No      |
| consumer.secret                 | Consumer secret used for calling endpoints protected by OAuth 2.0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | \-                                                           | STRING              | Yes      | No      |
| token.url                       | Token URL to generate a new access tokens when calling endpoints protected by OAuth 2.0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | \-                                                           | STRING              | Yes      | No      |
| refresh.token                   | Refresh token used for generating new access tokens when calling endpoints protected by OAuth 2.0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | \-                                                           | STRING              | Yes      | No      |
| headers                         | HTTP request headers in format `"'<key>:<value>','<key>:<value>'"`. When the `Content-Type` header is not provided the system decides the Content-Type based on the provided sink mapper as following: Â - `@map(type='xml')`: `application/xml` Â - `@map(type='json')`: `application/json` Â - `@map(type='text')`: `plain/text` Â - `@map(type='keyvalue')`: `application/x-www-form-urlencoded` Â - For all other cases system defaults to `plain/text` Also the `Content-Length` header need not to be provided, as the system automatically defines it by calculating the size of the payload.              | Content-Type and Content-Length headers                      | STRING              | Yes      | No      |
| method                          | The HTTP method used for calling the endpoint.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | POST                                                         | STRING              | Yes      | No      |
| downloading.enabled             | Enable response received by the http-response source to be written to a file. When this is enabled the `download.path` property should be also set.                                                                                                                                                                                                                                                                                                                                                                                                                                                          | false                                                        | BOOL                | Yes      | No      |
| download.path                   | The absolute file path along with the file name where the downloads should be saved.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | \-                                                           | STRING              | Yes      | Yes     |
| blocking.io                     | Blocks the request thread until a response it received from HTTP call-response source before sending any other request.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | false                                                        | BOOL                | Yes      | No      |
| socket.idle.timeout             | Socket timeout in millis.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 6000                                                         | INT                 | Yes      | No      |
| chunk.disabled                  | Disable chunked transfer encoding.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | false                                                        | BOOL                | Yes      | No      |
| ssl.protocol                    | SSL/TLS protocol.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | TLS                                                          | STRING              | Yes      | No      |
| ssl.verification.disabled       | Disable SSL verification.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | false                                                        | BOOL                | Yes      | No      |
| ssl.configurations              | SSL/TSL configurations in format `"'<key>:<value>','<key>:<value>'"`. Some supported parameters: Â - SSL/TLS protocols: `'sslEnabledProtocols:TLSv1.1,TLSv1.2'` Â - List of ciphers: `'ciphers:TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256'` Â - Enable session creation: `'client.enable.session.creation:true'` Â - Supported server names: `'server.suported.server.names:server'` Â - Add HTTP SNIMatcher: `'server.supported.snimatchers:SNIMatcher'`                                                                                                                                                              | \-                                                           | STRING              | Yes      | No      |
| proxy.host                      | Proxy server host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | \-                                                           | STRING              | Yes      | No      |
| proxy.port                      | Proxy server port                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | \-                                                           | STRING              | Yes      | No      |
| proxy.username                  | Proxy server username                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | \-                                                           | STRING              | Yes      | No      |
| proxy.password                  | Proxy server password                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | \-                                                           | STRING              | Yes      | No      |
| client.bootstrap.configurations | Client bootstrap configurations in format `"'<key>:<value>','<key>:<value>'"`. Some supported configurations : Â - Client connect timeout in millis: `'client.bootstrap.connect.timeout:15000'` Â - Client socket timeout in seconds: `'client.bootstrap.socket.timeout:15'` Â - Client socket reuse: `'client.bootstrap.socket.reuse:true'` Â - Enable TCP no delay: `'client.bootstrap.nodelay:true'` Â - Enable client keep alive: `'client.bootstrap.keepalive:true'` Â - Send buffer size: `'client.bootstrap.sendbuffersize:1048576'` Â - Receive buffer size: `'client.bootstrap.recievebuffersize:1048576'` | \-                                                           | STRING              | Yes      | No      |
| max.pool.active.connections     | Maximum possible number of active connection per client pool.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | -1                                                           | INT                 | Yes      | No      |
| min.pool.idle.connections       | Minimum number of idle connections that can exist per client pool.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 0                                                            | INT                 | Yes      | No      |
| max.pool.idle.connections       | Maximum number of idle connections that can exist per client pool.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 100                                                          | INT                 | Yes      | No      |
| min.evictable.idle.time         | Minimum time (in millis) a connection may sit idle in the client pool before it become eligible for eviction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 300000                                                       | STRING              | Yes      | No      |
| time.between.eviction.runs      | Time between two eviction operations (in millis) on the client pool.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 30000                                                        | STRING              | Yes      | No      |
| max.wait.time                   | The maximum time (in millis) the pool will wait (when there are no available connections) for a connection to be returned to the pool.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 60000                                                        | STRING              | Yes      | No      |
| test.on.borrow                  | Enable connections to be validated before being borrowed from the client pool.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | true                                                         | BOOL                | Yes      | No      |
| test.while.idle                 | Enable connections to be validated during the eviction operation (if any).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | true                                                         | BOOL                | Yes      | No      |
| exhausted.action                | Action that should be taken when the maximum number of active connections are being used. This action should be indicated as an int and possible action values are following. 0 - Fail the request. 1 - Block the request, until a connection returns to the pool. 2 - Grow the connection pool size.                                                                                                                                                                                                                                                                                                        | 1 (Block when exhausted)                                     | INT                 | Yes      | No      |
| hostname.verification.enabled   | Enable hostname verification                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | true                                                         | BOOL                | Yes      | No      |

System Parameters

| Name                           | Description                                                                                                                             | Default Value                                                | Possible Parameters                     |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|-----------------------------------------|
| clientBootstrapClientGroupSize | Number of client threads to perform non-blocking read and write to one or more channels.                                                | (Number of available processors) \* 2                        | Any positive integer                    |
| clientBootstrapBossGroupSize   | Number of boss threads to accept incoming connections.                                                                                  | Number of available processors                               | Any positive integer                    |
| clientBootstrapWorkerGroupSize | Number of worker threads to accept the connections from boss threads and perform non-blocking read and write from one or more channels. | (Number of available processors) \* 2                        | Any positive integer                    |
| trustStoreLocation             | The default truststore file path.                                                                                                       | \`\${carbon.home}/resources/security/client-truststore.jks\` | Path to client truststore \`.jks\` file |
| trustStorePassword             | The default truststore password.                                                                                                        | gdncarbon                                                   | Truststore password as string           |

EXAMPLE 1
```js
    @sink(type='http-request', sink.id='foo',
          publisher.url='http://localhost:8009/foo',
          @map(type='xml', @payload('{{payloadBody}}')))
    define stream FooStream (payloadBody string);

    @source(type='http-response', sink.id='foo',
            @map(type='text', regex.A='((.|\n)*)',
                 @attributes(headers='trp:headers', message='A[1]')))
    define stream ResponseStream(message string, headers string);
```
When events arrive in `FooStream`, http-request sink makes calls to
endpoint on url `http://localhost:8009/foo` with `POST` method and
Content-Type `application/xml`. If the event `payloadBody` attribute
contains following XML:
```js
    <item>
        <name>apple</name>
        <price>55</price>
        <quantity>5</quantity>
    </item>
```
the http-request sink maps that and sends it to the endpoint. When
endpoint sends a response it will be consumed by the corresponding
http-response source correlated via the same `sink.id` `foo` and that
will map the response message and send it via `ResponseStream` steam by
assigning the message body as `message` attribute and response headers
as `headers` attribute of the event.

EXAMPLE 2
```js
    @sink(type='http-request', publisher.url='http://localhost:8005/files/{{name}}'
          downloading.enabled='true', download.path='{{downloadPath}}{{name}}',
          method='GET', sink.id='download', @map(type='json'))
    define stream DownloadRequestStream(name String, id int, downloadPath string);

    @source(type='http-response', sink.id='download',
            http.status.code='2\\d+',
            @map(type='text', regex.A='((.|\n)*)',
                 @attributes(name='trp:name', id='trp:id', file='A[1]')))
    define stream ResponseStream2xx(name string, id string, file string);

    @source(type='http-response', sink.id='download',
            http.status.code='4\\d+',
            @map(type='text', regex.A='((.|\n)*)', @attributes(errorMsg='A[1]')))
    define stream ResponseStream4xx(errorMsg string);
```
When events arrive in `DownloadRequestStream` with `name`:`foo.txt`,
`id`:`75` and `downloadPath`:`/user/download/` the http-request sink
sends a GET request to the url `http://localhost:8005/files/foo.txt` to
download the file to the given path `/user/download/foo.txt` and capture
the response via its corresponding http-response source based on the
response status code. If the response status code is in the range of 200
the message will be received by the http-response source associated with
the `ResponseStream2xx` stream which expects `http.status.code` with
regex `2\\d+` while downloading the file to the local file system on the
path `/user/download/foo.txt` and mapping the response message having
the absolute file path to event's `file` attribute. If the response
status code is in the range of 400 then the message will be received by
the http-response source associated with the `ResponseStream4xx` stream
which expects `http.status.code` with regex `4\\d+` while mapping the
error response to the `errorMsg` attribute of the event.

### ~~http-response (Sink)~~

*Deprecated*

 (Use http-service-response sink instead). The http-response sink
send responses of the requests consumed by its corresponding
http-request source, by mapping the response messages to formats such as
`text`, `XML` and `JSON`.

Syntax
```js
    @sink(type="http-response", source.id="<STRING>", message.id="<STRING>", headers="<STRING>", @map(...)))
```
QUERY PARAMETERS

| Name       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Default Value                           | Possible Data Types | Optional | Dynamic |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|---------------------|----------|---------|
| source.id  | Identifier to correlate the http-response sink to its corresponding http-request source which consumed the request.                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |                                         | STRING              | No       | No      |
| message.id | Identifier to correlate the response with the request received by http-request source.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |                                         | STRING              | No       | Yes     |
| headers    | HTTP request headers in format `"'<key>:<value>','<key>:<value>'"`. When the `Content-Type` header is not provided the system decides the Content-Type based on the provided sink mapper as following: Â - `@map(type='xml')`: `application/xml` Â - `@map(type='json')`: `application/json` Â - `@map(type='text')`: `plain/text` Â - `@map(type='keyvalue')`: `application/x-www-form-urlencoded` Â - For all other cases system defaults to `plain/text` Also the `Content-Length` header need not to be provided, as the system automatically defines it by calculating the size of the payload. | Content-Type and Content-Length headers | STRING              | Yes      | No      |

EXAMPLE 1
```js
    @source(type='http-request', receiver.url='http://localhost:5005/add',
            source.id='adder',
            @map(type='json, @attributes(messageId='trp:messageId',
                                         value1='$.event.value1',
                                         value2='$.event.value2')))
    define stream AddStream (messageId string, value1 long, value2 long);

    @sink(type='http-response', source.id='adder',
          message.id='{{messageId}}', @map(type = 'json'))
    define stream ResultStream (messageId string, results long);

    @info(name = 'query1')
    from AddStream
    select messageId, value1 + value2 as results
    insert into ResultStream;
```
The http-request source on stream `AddStream` listens on url
`http://localhost:5005/stocks` for JSON messages with format:
```js
    {
      "event": {
        "value1": 3,
        "value2": 4
      }
    }
```
and when events arrive it maps to `AddStream` events and pass them to
query `query1` for processing. The query results produced on
`ResultStream` are sent as a response via http-response sink with
format:
```js
    {
      "event": {
        "results": 7
      }
    }
```
Here the request and response are correlated by passing the `messageId`
produced by the http-request to the respective http-response sink.

### http-service-response (Sink)

The http-service-response sink send responses of the requests consumed
by its corresponding http-service source, by mapping the response
messages to formats such as `text`, `XML` and `JSON`.

Syntax
```js
    @sink(type="http-service-response", source.id="<STRING>", message.id="<STRING>", headers="<STRING>", @map(...)))
```
QUERY PARAMETERS

| Name       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Default Value                           | Possible Data Types | Optional | Dynamic |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|---------------------|----------|---------|
| source.id  | Identifier to correlate the http-service-response sink to its corresponding http-service source which consumed the request.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |                                         | STRING              | No       | No      |
| message.id | Identifier to correlate the response with the request received by http-service source.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |                                         | STRING              | No       | Yes     |
| headers    | HTTP request headers in format `"'<key>:<value>','<key>:<value>'"`. When the `Content-Type` header is not provided the system decides the Content-Type based on the provided sink mapper as following: Â - `@map(type='xml')`: `application/xml` Â - `@map(type='json')`: `application/json` Â - `@map(type='text')`: `plain/text` Â - `@map(type='keyvalue')`: `application/x-www-form-urlencoded` Â - For all other cases system defaults to `plain/text` Also the `Content-Length` header need not to be provided, as the system automatically defines it by calculating the size of the payload. | Content-Type and Content-Length headers | STRING              | Yes      | No      |

EXAMPLE 1
```js
    @source(type='http-service', receiver.url='http://localhost:5005/add',
            source.id='adder',
            @map(type='json, @attributes(messageId='trp:messageId',
                                         value1='$.event.value1',
                                         value2='$.event.value2')))
    define stream AddStream (messageId string, value1 long, value2 long);

    @sink(type='http-service-response', source.id='adder',
          message.id='{{messageId}}', @map(type = 'json'))
    define stream ResultStream (messageId string, results long);

    @info(name = 'query1')
    from AddStream
    select messageId, value1 + value2 as results
    insert into ResultStream;
```
The http-service source on stream `AddStream` listens on url
`http://localhost:5005/stocks` for JSON messages with format:
```js
    {
      "event": {
        "value1": 3,
        "value2": 4
      }
    }
```
and when events arrive it maps to `AddStream` events and pass them to
query `query1` for processing. The query results produced on
`ResultStream` are sent as a response via http-service-response sink
with format:
```js
    {
      "event": {
        "results": 7
      }
    }
```
Here the request and response are correlated by passing the `messageId`
produced by the http-service to the respective http-service-response
sink.

### inMemory (Sink)

In-memory sink publishes events to In-memory sources that are subscribe to the same topic to which the sink publishes. This provides a way to connect multiple Stream Apps deployed under the same Stream Apps Manager (JVM). Here both the publisher and subscriber should have the same event schema (stream definition) for successful data transfer.

Syntax
```js
    @sink(type="inMemory", topic="<STRING>", @map(...)))
```
QUERY PARAMETERS

| Name  | Description                                                         | Default Value | Possible Data Types | Optional | Dynamic |
|-------|---------------------------------------------------------------------|---------------|---------------------|----------|---------|
| topic | Event are delivered to allthe subscribers subscribed on this topic. |               | STRING              | No       | No      |

EXAMPLE 1
```js
    @sink(type='inMemory', topic='Stocks', @map(type='passThrough'))
    define stream StocksStream (symbol string, price float, volume long);
```
Here the `StocksStream` uses inMemory sink to emit the Stream App events to all the inMemory sources deployed in the same JVM and subscribed to the topic `Stocks`.

### jms (Sink)

JMS Sink allows users to subscribe to a JMS broker and publish JMS
messages.

Syntax
```js
    @sink(type="jms", destination="<STRING>", connection.factory.jndi.name="<STRING>", factory.initial="<STRING>", provider.url="<STRING>", connection.factory.type="<STRING>", connection.username="<STRING>", connection.password="<STRING>", connection.factory.nature="<STRING>", @map(...)))
```
QUERY PARAMETERS

| Name                         | Description                                                                                                                                                                                       | Default Value          | Possible Data Types | Optional | Dynamic |
|------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------|---------------------|----------|---------|
| destination                  | Queue/Topic name which JMS Source should subscribe to                                                                                                                                             |                        | STRING              | No       | Yes     |
| connection.factory.jndi.name | JMS Connection Factory JNDI name. This value will be used for the JNDI lookup to find the JMS Connection Factory.                                                                                 | QueueConnectionFactory | STRING              | Yes      | No      |
| factory.initial              | Naming factory initial value                                                                                                                                                                      |                        | STRING              | No       | No      |
| provider.url                 | Java naming provider URL. Property for specifying configuration information for the service provider to use. The value of the property should contain a URL string (e.g. "ldap://somehost:389") |                        | STRING              | No       | No      |
| connection.factory.type      | Type of the connection connection factory. This can be either queue or topic.                                                                                                                     | queue                  | STRING              | Yes      | No      |
| connection.username          | username for the broker.                                                                                                                                                                          | None                   | STRING              | Yes      | No      |
| connection.password          | Password for the broker                                                                                                                                                                           | None                   | STRING              | Yes      | No      |
| connection.factory.nature    | Connection factory nature for the broker(cached/pooled).                                                                                                                                          | default                | STRING              | Yes      | No      |

EXAMPLE 1
```js
    @sink(type='jms', @map(type='xml'), factory.initial='org.apache.activemq.jndi.ActiveMQInitialContextFactory', provider.url='vm://localhost',destination='DAS_JMS_OUTPUT_TEST', connection.factory.type='topic',connection.factory.jndi.name='TopicConnectionFactory')
    define stream inputStream (name string, age int, country string);
```
This example shows how to publish to an ActiveMQ topic.

EXAMPLE 2
```js
    @sink(type='jms', @map(type='xml'), factory.initial='org.apache.activemq.jndi.ActiveMQInitialContextFactory', provider.url='vm://localhost',destination='DAS_JMS_OUTPUT_TEST')
    define stream inputStream (name string, age int, country string);
```
This example shows how to publish to an ActiveMQ queue. Note that we are
not providing properties like connection factory type

### kafka (Sink)

A Kafka sink publishes events processed by gdn SP to a topic with a
partition for a Kafka cluster. The events can be published in the `TEXT`
`XML` `JSON` or `Binary` format. If the topic is not already created in
the Kafka cluster, the Kafka sink creates the default partition for the
given topic. The publishing topic and partition can be a dynamic value
taken from the Stream App event. To configure a sink to use the Kafka
transport, the `type` parameter should have `kafka` as its value.

Syntax
```js
    @sink(type="kafka", bootstrap.servers="<STRING>", topic="<STRING>", partition.no="<INT>", sequence.id="<STRING>", key="<STRING>", is.binary.message="<BOOL>", optional.configuration="<STRING>", @map(...)))
```
QUERY PARAMETERS

| Name                   | Description                                                                                                                                                                                             | Default Value | Possible Data Types | Optional | Dynamic |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| bootstrap.servers      | This parameter specifies the list of Kafka servers to which the Kafka sink must publish events. This list should be provided as a set of comma separated values. e.g., `localhost:9092,localhost:9093`. |               | STRING              | No       | No      |
| topic                  | The topic to which the Kafka sink needs to publish events. Only one topic must be specified.                                                                                                            |               | STRING              | No       | No      |
| partition.no           | The partition number for the given topic. Only one partition ID can be defined. If no value is specified for this parameter, the Kafka sink publishes to the default partition of the topic (i.e., 0)   | 0             | INT                 | Yes      | No      |
| sequence.id            | A unique identifier to identify the messages published by this sink. This ID allows receivers to identify the sink that published a specific message.                                                   | null          | STRING              | Yes      | No      |
| key                    | The key contains the values that are used to maintain ordering in a Kafka partition.                                                                                                                    | null          | STRING              | Yes      | No      |
| is.binary.message      | In order to send the binary events via kafka sink, this parameter is set to `True`.                                                                                                                   | null          | BOOL                | No       | No      |
| optional.configuration | This parameter contains all the other possible configurations that the producer is created with. e.g., `producer.type:async,batch.size:200`                                                             | null          | STRING              | Yes      | No      |

EXAMPLE 1
```js
    @App:name('TestExecutionPlan')
    define stream FooStream (symbol string, price float, volume long);
    @info(name = 'query1')
    @sink(
    type='kafka',
    topic='topic_with_partitions',
    partition.no='0',
    bootstrap.servers='localhost:9092',
    @map(type='xml'))
    Define stream BarStream (symbol string, price float, volume long);
    from FooStream select symbol, price, volume insert into BarStream;
```
This Kafka sink configuration publishes to 0th partition of the topic
named `topic_with_partitions`.

EXAMPLE 2
```js
    @App:name('TestExecutionPlan')
    define stream FooStream (symbol string, price float, volume long);
    @info(name = 'query1')
    @sink(
    type='kafka',
    topic='{{symbol}}',
    partition.no='{{volume}}',
    bootstrap.servers='localhost:9092',
    @map(type='xml'))
    Define stream BarStream (symbol string, price float, volume long);
    from FooStream select symbol, price, volume insert into BarStream;
```
This query publishes dynamic topic and partitions that are taken from
the Stream App event. The value for `partition.no` is taken from the
`volume` attribute, and the topic value is taken from the `symbol`
attribute.

### kafkaMultiDC (Sink)

A Kafka sink publishes events processed by gdn SP to a topic with a
partition for a Kafka cluster. The events can be published in the `TEXT`
`XML` `JSON` or `Binary` format. If the topic is not already created in
the Kafka cluster, the Kafka sink creates the default partition for the
given topic. The publishing topic and partition can be a dynamic value
taken from the Stream App event. To configure a sink to publish events via
the Kafka transport, and using two Kafka brokers to publish events to
the same topic, the `type` parameter must have `kafkaMultiDC` as its
value.

Syntax
```js
    @sink(type="kafkaMultiDC", bootstrap.servers="<STRING>", topic="<STRING>", sequence.id="<STRING>", key="<STRING>", partition.no="<INT>", is.binary.message="<BOOL>", optional.configuration="<STRING>", @map(...)))
```
QUERY PARAMETERS

| Name                   | Description                                                                                                                                                                                                                                               | Default Value | Possible Data Types | Optional | Dynamic |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| bootstrap.servers      | This parameter specifies the list of Kafka servers to which the Kafka sink must publish events. This list should be provided as a set of comma -separated values. There must be at least two servers in this list. e.g., `localhost:9092,localhost:9093`. |               | STRING              | No       | No      |
| topic                  | The topic to which the Kafka sink needs to publish events. Only one topic must be specified.                                                                                                                                                              |               | STRING              | No       | No      |
| sequence.id            | A unique identifier to identify the messages published by this sink. This ID allows receivers to identify the sink that published a specific message.                                                                                                     | null          | STRING              | Yes      | No      |
| key                    | The key contains the values that are used to maintain ordering in a Kafka partition.                                                                                                                                                                      | null          | STRING              | Yes      | No      |
| partition.no           | The partition number for the given topic. Only one partition ID can be defined. If no value is specified for this parameter, the Kafka sink publishes to the default partition of the topic (i.e., 0)                                                     | 0             | INT                 | Yes      | No      |
| is.binary.message      | In order to send the binary events via kafkaMultiDCSink, it is required to set this parameter to `true`.                                                                                                                                                  | null          | BOOL                | No       | No      |
| optional.configuration | This parameter contains all the other possible configurations that the producer is created with. e.g., `producer.type:async,batch.size:200`                                                                                                               | null          | STRING              | Yes      | No      |

EXAMPLE 1
```js
    @App:name('TestExecutionPlan')
    define stream FooStream (symbol string, price float, volume long);
    @info(name = 'query1')
    @sink(type='kafkaMultiDC', topic='myTopic', partition.no='0',bootstrap.servers='host1:9092, host2:9092', @map(type='xml'))Define stream BarStream (symbol string, price float, volume long);
    from FooStream select symbol, price, volume insert into BarStream;
```
This query publishes to the default (i.e., 0th) partition of the brokers
in two data centers

### log (Sink)

This is a sink that can be used as a logger. This will log the output
events in the output stream with user specified priority and a prefix

Syntax
```js
    @sink(type="log", priority="<STRING>", prefix="<STRING>", @map(...)))
```
QUERY PARAMETERS

| Name     | Description                                                                                                                                                           | Default Value            | Possible Data Types | Optional | Dynamic |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|---------------------|----------|---------|
| priority | This will set the logger priority i.e log level. Accepted values are INFO, DEBUG, WARN, FATAL, ERROR, OFF, TRACE                                                      | INFO                     | STRING              | Yes      | No      |
| prefix   | This will be the prefix to the output message. If the output stream has event \[2,4\] and the prefix is given as "Hello" then the log will show "Hello : [2,4]" | default prefix will be : | STRING              | Yes      | No      |

EXAMPLE 1
```js
    @sink(type='log', prefix='My Log', priority='DEBUG')
    define stream BarStream (symbol string, price float, volume long)
```
In this example BarStream uses log sink and the prefix is given as My
Log. Also the priority is set to DEBUG.

EXAMPLE 2
```js
    @sink(type='log', priority='DEBUG')
    define stream BarStream (symbol string, price float, volume long)
```
In this example BarStream uses log sink and the priority is set to
DEBUG. User has not specified prefix so the default prefix will be in
the form \<Stream App App Name\> : \<Stream Name\>

EXAMPLE 3
```js
    @sink(type='log', prefix='My Log')
    define stream BarStream (symbol string, price float, volume long)
```
In this example BarStream uses log sink and the prefix is given as My
Log. User has not given a priority so it will be set to default INFO.

EXAMPLE 4
```js
    @sink(type='log')
    define stream BarStream (symbol string, price float, volume long)
```
In this example BarStream uses log sink. The user has not given prefix
or priority so they will be set to their default values.

### nats (Sink)

NATS Sink allows users to subscribe to a NATS broker and publish
messages.

Syntax

    @sink(type="nats", destination="<STRING>", bootstrap.servers="<STRING>", client.id="<STRING>", cluster.id="<STRING>", @map(...)))

QUERY PARAMETERS

| Name              | Description                                                                                                                               | Default Value         | Possible Data Types | Optional | Dynamic |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------|-----------------------|---------------------|----------|---------|
| destination       | Subject name which NATS sink should publish to.                                                                                           |                       | STRING              | No       | Yes     |
| bootstrap.servers | The NATS based url of the NATS server.                                                                                                    | nats://localhost:4222 | STRING              | Yes      | No      |
| client.id         | The identifier of the client publishing/connecting to the NATS broker. Should be unique for each client connecting to the server/cluster. | None                  | STRING              | Yes      | No      |
| cluster.id        | The identifier of the NATS server/cluster.                                                                                                | test-cluster          | STRING              | Yes      | No      |

EXAMPLE 1
```js
    @sink(type='nats', @map(type='xml'), destination='SP_NATS_OUTPUT_TEST', bootstrap.servers='nats://localhost:4222',client.id='nats_client',server.id='test-cluster')
    define stream outputStream (name string, age int, country string);
```
This example shows how to publish to a NATS subject with all supporting
configurations. With the following configuration the sink identified as
`nats-client` will publish to a subject named as
`SP_NATS_OUTPUT_TEST` which resides in a nats instance with a
cluster id of `test-cluster`, running in localhost and listening to
the port 4222 for client connection.

EXAMPLE 2
```js
    @sink(type='nats', @map(type='xml'), destination='SP_NATS_OUTPUT_TEST')
    define stream outputStream (name string, age int, country string);
```
This example shows how to publish to a NATS subject with mandatory
configurations. With the following configuration the sink identified
with an auto generated client id will publish to a subject named as
`SP_NATS_OUTPUT_TEST` which resides in a nats instance with a
cluster id of `test-cluster`, running in localhost and listening to
the port 4222 for client connection.

### prometheus (Sink)

This sink publishes events processed by Stream App into Prometheus metrics
and exposes them to the Prometheus server at the specified URL. The
created metrics can be published to Prometheus via `server` or
`pushGateway`, depending on your preference. Â The metric types that
are supported by the Prometheus sink are `counter`, `gauge`,
`histogram`, and `summary`. The values and labels of the Prometheus
metrics can be updated through the events.

Syntax
```js
    @sink(type="prometheus", job="<STRING>", publish.mode="<STRING>", push.url="<STRING>", server.url="<STRING>", metric.type="<STRING>", metric.help="<STRING>", metric.name="<STRING>", buckets="<STRING>", quantiles="<STRING>", quantile.error="<DOUBLE>", value.attribute="<STRING>", push.operation="<STRING>", grouping.key="<STRING>", @map(...)))
```
QUERY PARAMETERS

| Name            | Description                                                                                                                                                                                                                                                                                                                                                                                                     | Default Value         | Possible Data Types | Optional | Dynamic |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------|---------------------|----------|---------|
| job             | This parameter specifies the job name of the metric. This must be the same job name that is defined in the Prometheus configuration file.                                                                                                                                                                                                                                                                       | stream processor Job             | STRING              | Yes      | No      |
| publish.mode    | The mode in which the metrics need to be exposed to the Prometheus server.The possible publishing modes are `server` and `pushgateway`.The server mode exposes the metrics through an HTTP server at the specified URL, and the `pushGateway` mode pushes the metrics to the pushGateway that needs to be running at the specified URL.                                                                   | server                | STRING              | Yes      | No      |
| push.url        | This parameter specifies the target URL of the Prometheus pushGateway. This is the URL at which the pushGateway must be listening. This URL needs to be defined in the Prometheus configuration file as a target before it can be used here.                                                                                                                                                                    | http://localhost:9091 | STRING              | Yes      | No      |
| server.url      | This parameter specifies the URL where the HTTP server is initiated to expose metrics in the `server` publish mode. This URL needs to be defined in the Prometheus configuration file as a target before it can be used here.                                                                                                                                                                                 | http://localhost:9080 | STRING              | Yes      | No      |
| metric.type     | The type of Prometheus metric that needs to be created at the sink. Â The supported metric types are `counter`, `gauge`, `histogram` and `summary`.                                                                                                                                                                                                                                                      |                       | STRING              | No       | No      |
| metric.help     | A brief description of the metric and its purpose.                                                                                                                                                                                                                                                                                                                                                              |                       | STRING              | Yes      | No      |
| metric.name     | This parameter allows you to assign a preferred name for the metric. The metric name must match the regex format, i.e., [a-zA-Z:][a-zA-Z0-9:]*.                                                                                                                                                                                                                                                        |                       | STRING              | Yes      | No      |
| buckets         | The bucket values preferred by the user for histogram metrics. The bucket values must be in the `string` format with each bucket value separated by a comma as shown in the example below. "2,4,6,8"                                                                                                                                                                                                        | null                  | STRING              | Yes      | No      |
| quantiles       | This parameter allows you to specify quantile values for summary metrics as preferred. The quantile values must be in the `string` format with each quantile value separated by a comma as shown in the example below. "0.5,0.75,0.95"                                                                                                                                                                      | null                  | STRING              | Yes      | No      |
| quantile.error  | The error tolerance value for calculating quantiles in summary metrics. This must be a positive value, but less than 1.                                                                                                                                                                                                                                                                                         | 0.001                 | DOUBLE              | Yes      | No      |
| value.attribute | The name of the attribute in the stream definition that specifies the metric value. The defined `value` attribute must be included in the stream definition. The system increases the metric value for the counter and gauge metric types by the value of the `value` attribute. The system observes the value of the `value` attribute for the calculations of `summary` and `histogram` metric types. | value                 | STRING              | Yes      | No      |
| push.operation  | This parameter defines the mode for pushing metrics to the pushGateway. The available push operations are `push` and `pushadd`. The operations differ according to the existing metrics in pushGateway where `push` operation replaces the existing metrics, and `pushadd` operation only updates the newly created metrics.                                                                            | pushadd               | STRING              | Yes      | No      |
| grouping.key    | This parameter specifies the grouping key of created metrics in key-value pairs. The grouping key is used only in pushGateway mode in order to distinguish the metrics from already existing metrics. The expected format of the grouping key is as follows: Â "`key1:value1`,`key2:value2`"                                                                                                               |                       | STRING              | Yes      | No      |

System Parameters

| Name        | Description                                                                                                                                                                                                                                                                                                         | Default Value         | Possible Parameters                         |
|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------|---------------------------------------------|
| jobName     | This property specifies the default job name for the metric. This job name must be the same as the job name defined in the Prometheus configuration file.                                                                                                                                                           | stream processor Job             | Any string                                  |
| publishMode | The default publish mode for the Prometheus sink for exposing metrics to the Prometheus server. The mode can be either `server` or `pushgateway`.                                                                                                                                                               | server                | server or pushgateway                       |
| serverURL   | This property configures the URL where the HTTP server is initiated to expose metrics. This URL needs to be defined in the Prometheus configuration file as a target to be identified by Prometheus before it can be used here. By default, the HTTP server is initiated at `http://localhost:9080`.              | http://localhost:9080 | Any valid URL                               |
| pushURL     | This property configures the target URL of the Prometheus pushGateway (where the pushGateway needs to listen). This URL needs to be defined in the Prometheus configuration file as a target to be identified by Prometheus before it can be used here.                                                             | http://localhost:9091 | Any valid URL                               |
| groupingKey | This property configures the grouping key of created metrics in key-value pairs. Grouping key is used only in pushGateway mode in order to distinguish these metrics from already existing metrics under the same job. The expected format of the grouping key is as follows: "`key1:value1`,`key2:value2`" . | null                  | Any key value pairs in the supported format |

EXAMPLE 1
```js
    @sink(type='prometheus',job='fooOrderCount', server.url ='http://localhost:9080', publish.mode='server', metric.type='counter', metric.help= 'Number of foo orders', @map(type='keyvalue'))
    define stream FooCountStream (Name String, quantity int, value int);
```
In the above example, the Prometheus-sink creates a counter metric with
the stream name and defined attributes as labels. The metric is exposed
through an HTTP server at the target URL.

EXAMPLE 2
```js
    @sink(type='prometheus',job='inventoryLevel', push.url='http://localhost:9080', publish.mode='pushGateway', metric.type='gauge', metric.help= 'Current level of inventory', @map(type='keyvalue'))
    define stream InventoryLevelStream (Name String, value int);
```
In the above example, the Prometheus-sink creates a gauge metric with
the stream name and defined attributes as labels.The metric is pushed to
the Prometheus pushGateway at the target URL.

### rabbitmq (Sink)

The rabbitmq sink pushes the events into a rabbitmq broker using the
AMQP protocol

Syntax
```js
    @sink(type="rabbitmq", uri="<STRING>", heartbeat="<INT>", exchange.name="<STRING>", exchange.type="<STRING>", exchange.durable.enabled="<BOOL>", exchange.autodelete.enabled="<BOOL>", delivery.mode="<INT>", content.type="<STRING>", content.encoding="<STRING>", priority="<INT>", correlation.id="<STRING>", reply.to="<STRING>", expiration="<STRING>", message.id="<STRING>", timestamp="<STRING>", type="<STRING>", user.id="<STRING>", app.id="<STRING>", routing.key="<STRING>", headers="<STRING>", tls.enabled="<BOOL>", tls.truststore.path="<STRING>", tls.truststore.password="<STRING>", tls.truststore.type="<STRING>", tls.version="<STRING>", @map(...)))
```
QUERY PARAMETERS

| Name                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Default Value                                            | Possible Data Types | Optional | Dynamic |
|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|---------------------|----------|---------|
| uri                         | The URI that used to connect to an AMQP server. If no URI is specified, an error is logged in the CLI.e.g., `amqp://guest:guest`, `amqp://guest:guest@localhost:5672`                                                                                                                                                                                                                                                                                                                                                                                           |                                                          | STRING              | No       | No      |
| heartbeat                   | The period of time (in seconds) after which the peer TCP connection should be considered unreachable (down) by RabbitMQ and client libraries.                                                                                                                                                                                                                                                                                                                                                                                                                   | 60                                                       | INT                 | Yes      | No      |
| exchange.name               | The name of the exchange that decides what to do with a message it sends.If the `exchange.name` already exists in the RabbitMQ server, then the system uses that `exchange.name` instead of redeclaring.                                                                                                                                                                                                                                                                                                                                                        |                                                          | STRING              | No       | Yes     |
| exchange.type               | The type of the exchange.name. The exchange types available are `direct`, `fanout`, `topic` and `headers`. For a detailed description of each type, see \[RabbitMQ - AMQP Concepts\](https://www.rabbitmq.com/tutorials/amqp-concepts.html)                                                                                                                                                                                                                                                                                                                     | direct                                                   | STRING              | Yes      | Yes     |
| exchange.durable.enabled    | If this is set to `true`, the exchange remains declared even if the broker restarts.                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | false                                                    | BOOL                | Yes      | Yes     |
| exchange.autodelete.enabled | If this is set to `true`, the exchange is automatically deleted when it is not used anymore.                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | false                                                    | BOOL                | Yes      | Yes     |
| delivery.mode               | This determines whether the connection should be persistent or not. The value must be either `1` or `2`.If the delivery.mode = 1, then the connection is not persistent. If the delivery.mode = 2, then the connection is persistent.                                                                                                                                                                                                                                                                                                                           | 1                                                        | INT                 | Yes      | No      |
| content.type                | The message content type. This should be the `MIME` content type.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | null                                                     | STRING              | Yes      | No      |
| content.encoding            | The message content encoding. The value should be `MIME` content encoding.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | null                                                     | STRING              | Yes      | No      |
| priority                    | Specify a value within the range 0 to 9 in this parameter to indicate the message priority.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 0                                                        | INT                 | Yes      | Yes     |
| correlation.id              | The message correlated to the current message. e.g., The request to which this message is a reply. When a request arrives, a message describing the task is pushed to the queue by the front end server. After that the frontend server blocks to wait for a response message with the same correlation ID. A pool of worker machines listen on queue, and one of them picks up the task, performs it, and returns the result as message. Once a message with right correlation ID arrives, thefront end server continues to return the response to the caller. | null                                                     | STRING              | Yes      | Yes     |
| reply.to                    | This is an anonymous exclusive callback queue. When the RabbitMQ receives a message with the `reply.to` property, it sends the response to the mentioned queue. This is commonly used to name a reply queue (or any other identifier that helps a consumer application to direct its response).                                                                                                                                                                                                                                                                 | null                                                     | STRING              | Yes      | No      |
| expiration                  | The expiration time after which the message is deleted. The value of the expiration field describes the TTL (Time To Live) period in milliseconds.                                                                                                                                                                                                                                                                                                                                                                                                              | null                                                     | STRING              | Yes      | No      |
| message.id                  | The message identifier. If applications need to identify messages, it is recommended that they use this attribute instead of putting it into the message payload.                                                                                                                                                                                                                                                                                                                                                                                               | null                                                     | STRING              | Yes      | Yes     |
| timestamp                   | Timestamp of the moment when the message was sent. If you do not specify a value for this parameter, the system automatically generates the current date and time as the timestamp value. The format of the timestamp value is `dd/mm/yyyy`.                                                                                                                                                                                                                                                                                                                    | current timestamp                                        | STRING              | Yes      | No      |
| type                        | The type of the message. e.g., The type of the event or the command represented by the message.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | null                                                     | STRING              | Yes      | No      |
| user.id                     | The user ID specified here is verified by RabbitMQ against theuser name of the actual connection. This is an optional parameter.                                                                                                                                                                                                                                                                                                                                                                                                                                | null                                                     | STRING              | Yes      | No      |
| app.id                      | The identifier of the application that produced the message.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | null                                                     | STRING              | Yes      | No      |
| routing.key                 | The key based on which the excahnge determines how to route the message to the queue. The routing key is similar to an address for the message.                                                                                                                                                                                                                                                                                                                                                                                                                 | empty                                                    | STRING              | Yes      | Yes     |
| headers                     | The headers of the message. The attributes used for routing are taken from the this paremeter. A message is considered matching if the value of the header equals the value specified upon binding.                                                                                                                                                                                                                                                                                                                                                             | null                                                     | STRING              | Yes      | Yes     |
| tls.enabled                 | This parameter specifies whether an encrypted communication channel should be established or not. When this parameter is set to `true`, the `tls.truststore.path` and `tls.truststore.password` parameters are initialized.                                                                                                                                                                                                                                                                                                                                     | false                                                    | BOOL                | Yes      | No      |
| tls.truststore.path         | The file path to the location of the truststore of the client that sends the RabbitMQ events via the `AMQP` protocol. A custom client-truststore can be specified if required. If a custom truststore is not specified, then the system uses the default client-trustore in the `${carbon.home}/resources/security` directory.                                                                                                                                                                                                                                  | \${carbon.home}/resources/security/client-truststore.jks | STRING              | Yes      | No      |
| tls.truststore.password     | The password for the client-truststore. A custom password can be specified if required. If no custom password is specified, then the system uses `gdncarbon` as the default password.                                                                                                                                                                                                                                                                                                                                                                          | gdncarbon                                               | STRING              | Yes      | No      |
| tls.truststore.type         | The type of the truststore.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | JKS                                                      | STRING              | Yes      | No      |
| tls.version                 | The version of the tls/ssl.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | SSL                                                      | STRING              | Yes      | No      |

EXAMPLE 1
```js
    @App:name('TestExecutionPlan')
    define stream FooStream (symbol string, price float, volume long);
    @info(name = 'query1')
    @sink(type ='rabbitmq',
    uri = 'amqp://guest:guest@localhost:5672',
    exchange.name = 'direct',
    routing.key= 'direct',
    @map(type='xml'))
    Define stream BarStream (symbol string, price float, volume long);
    from FooStream select symbol, price, volume insert into BarStream;
```
This query publishes events to the `direct` exchange with the `direct`
exchange type and the `directTest` routing key.

### s3 (Sink)

S3 sink publishes events as Amazon AWS S3 buckets.

Syntax
```js
    @sink(type="s3", credential.provider.class="<STRING>", aws.access.key="<STRING>", aws.secret.key="<STRING>", bucket.name="<STRING>", aws.region="<STRING>", versioning.enabled="<BOOL>", object.path="<STRING>", storage.class="<STRING>", content.type="<STRING>", bucket.acl="<STRING>", node.id="<STRING>", @map(...)))
```
QUERY PARAMETERS

| Name                      | Description                                                                                                                                                                                          | Default Value            | Possible Data Types | Optional | Dynamic |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|---------------------|----------|---------|
| credential.provider.class | AWS credential provider class to be used. If blank along with the username and the password, default credential provider will be used.                                                               | EMPTY\_STRING            | STRING              | Yes      | No      |
| aws.access.key            | AWS access key. This cannot be used along with the credential.provider.class                                                                                                                         | EMPTY\_STRING            | STRING              | Yes      | No      |
| aws.secret.key            | AWS secret key. This cannot be used along with the credential.provider.class                                                                                                                         | EMPTY\_STRING            | STRING              | Yes      | No      |
| bucket.name               | Name of the S3 bucket                                                                                                                                                                                |                          | STRING              | No       | No      |
| aws.region                | The region to be used to create the bucket                                                                                                                                                           | EMPTY\_STRING            | STRING              | Yes      | No      |
| versioning.enabled        | Flag to enable versioning support in the bucket                                                                                                                                                      | false                    | BOOL                | Yes      | No      |
| object.path               | Path for each S3 object                                                                                                                                                                              |                          | STRING              | No       | Yes     |
| storage.class             | AWS storage class                                                                                                                                                                                    | standard                 | STRING              | Yes      | No      |
| content.type              | Content type of the event                                                                                                                                                                            | application/octet-stream | STRING              | Yes      | Yes     |
| bucket.acl                | Access control list for the bucket                                                                                                                                                                   | EMPTY\_STRING            | STRING              | Yes      | No      |
| node.id                   | The node ID of the current publisher. This needs to be unique for each publisher instance as it may cause object overwrites while uploading the objects to same S3 bucket from different publishers. | EMPTY\_STRING            | STRING              | Yes      | No      |

EXAMPLE 1
```js
    @sink(type='s3', bucket.name='user-stream-bucket',object.path='bar/users', credential.provider='software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider', flush.size='3',
        @map(type='json', enclosing.element='$.user',
            @payload("""{"name": "{{name}}", "age": {{age}}}""")))
    define stream UserStream(name string, age int);  
```
This creates a S3 bucket named `user-stream-bucket`. Then this will
collect 3 events together and create a JSON object and save that in S3.

### tcp (Sink)

A Stream App application can be configured to publish events via the TCP
transport by adding the @Sink(type = `tcp`) annotation at the top of
an event stream definition.

Syntax
```js
    @sink(type="tcp", url="<STRING>", sync="<STRING>", tcp.no.delay="<BOOL>", keep.alive="<BOOL>", worker.threads="<INT|LONG>", @map(...)))
```
QUERY PARAMETERS

| Name           | Description                                                                                                                                                                                                                                                                                                        | Default Value | Possible Data Types | Optional | Dynamic |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| url            | The URL to which outgoing events should be published via TCP. The URL should adhere to `tcp://<host>:<port>/<context>` format.                                                                                                                                                                                     |               | STRING              | No       | No      |
| sync           | This parameter defines whether the events should be published in a synchronized manner or not. If sync = `true`, then the worker will wait for the ack after sending the message. Else it will not wait for an ack.                                                                                              | false         | STRING              | Yes      | Yes     |
| tcp.no.delay   | This is to specify whether to disable Nagle algorithm during message passing. If tcp.no.delay = `true`, the execution of Nagle algorithm will be disabled in the underlying TCP logic. Hence there will be no delay between two successive writes to the TCP connection. Else there can be a constant ack delay. | true          | BOOL                | Yes      | No      |
| keep.alive     | This property defines whether the server should be kept alive when there are no connections available.                                                                                                                                                                                                             | true          | BOOL                | Yes      | No      |
| worker.threads | Number of threads to publish events.                                                                                                                                                                                                                                                                               | 10            | INT LONG            | Yes      | No      |

EXAMPLE 1
```js
    @Sink(type = 'tcp', url='tcp://localhost:8080/abc', sync='true'
       @map(type='binary'))
    define stream Foo (attribute1 string, attribute2 int);
```
A sink of type `tcp` has been defined. All events arriving at Foo
stream via TCP transport will be sent to the url
tcp://localhost:8080/abc in a synchronous manner.

Sinkmapper
----------

### avro (Sink Mapper)

This extension is a Stream App Event to Avro Message output
mapper.Transports that publish messages to Avro sink can utilize this
extension to convert Stream App events to Avro messages. Â You can either
specify the Avro schema or provide the schema registry URL and the
schema reference ID as parameters in the stream definition. If no Avro
schema is specified, a flat Avro schema of the `record` type is
generated with the stream attributes as schema fields.

Syntax
```js
    @sink(..., @map(type="avro", schema.def="<STRING>", schema.registry="<STRING>", schema.id="<STRING>")
```
QUERY PARAMETERS

| Name            | Description                                                                                                                                                                                                                     | Default Value | Possible Data Types | Optional | Dynamic |
|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| schema.def      | This specifies the required Avro schema to be used to convert Stream App events to Avro messages. The schema needs to be specified as a quoted JSON string.                                                                         |               | STRING              | No       | No      |
| schema.registry | This specifies the URL of the schema registry.                                                                                                                                                                                  |               | STRING              | No       | No      |
| schema.id       | This specifies the ID of the avro schema. This ID is the global ID that is returned from the schema registry when posting the schema to the registry. The specified ID is used to retrieve the schema from the schema registry. |               | STRING              | No       | No      |

EXAMPLE 1
```js
    @sink(type='inMemory', topic='stock', @map(type='avro',schema.def = """{"type":"record","name":"stock","namespace":"stock.example","fields":[{"name":"symbol","type":"string"},{"name":"price","type":"float"},{"name":"volume","type":"long"}]}"""))
    define stream StockStream (symbol string, price float, volume long);
```
The above configuration performs a default Avro mapping that generates
an Avro message as an output ByteBuffer.

EXAMPLE 2
```js
    @sink(type='inMemory', topic='stock', @map(type='avro',schema.registry = 'http://localhost:8081', schema.id ='22',@payload("""{"Symbol":{{symbol}},"Price":{{price}},"Volume":{{volume}}}"""
    )))
    define stream StockStream (symbol string, price float, volume long);
```
The above configuration performs a custom Avro mapping that generates an
Avro message as an output ByteBuffer. The Avro schema is retrieved from
the given schema registry (localhost:8081) using the schema ID provided.

### binary (Sink Mapper)

This section explains how to map events processed via Stream App in order to
publish them in the `binary` format.

Syntax
```js
    @sink(..., @map(type="binary")
```
EXAMPLE 1
```js
    @sink(type='inMemory', topic='gdn', @map(type='binary')) define stream FooStream (symbol string, price float, volume long);
```
This will publish Stream App event in binary format.

### csv (Sink Mapper)

This output mapper extension allows you to convert Stream App events
processed by the gdn SP to CSV message before publishing them. You can
either use custom placeholder to map a custom CSV message or use
pre-defined CSV format where event conversion takes place without extra
configurations.

Syntax
```js
    @sink(..., @map(type="csv", delimiter="<STRING>", header="<BOOL>", event.grouping.enabled="<BOOL>")
```
QUERY PARAMETERS

| Name                   | Description                                                                                                                                                                                                                  | Default Value | Possible Data Types | Optional | Dynamic |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| delimiter              | This parameter used to separate the output CSV data, when converting a Stream App event to CSV format,                                                                                                                           | ,             | STRING              | Yes      | No      |
| header                 | This parameter specifies whether the CSV messages will be generated with header or not. If this parameter is set to true, message will be generated with header                                                              | false         | BOOL                | Yes      | No      |
| event.grouping.enabled | If this parameter is set to `true`, events are grouped via a line.separator when multiple events are received. It is required to specify a value for the System.lineSeparator() when the value for this parameter is `true`. | false         | BOOL                | Yes      | No      |

EXAMPLE 1
```js
    @sink(type='inMemory', topic='{{symbol}}', @map(type='csv'))
    define stream BarStream (symbol string, price float, volume long);
```
Above configuration will perform a default CSV output mapping, which
will generate output as follows: Â gdn,55.6,100 < OS supported line separatorn />If header is true and delimiter is "-", then the output
will be as follows: symbol-price-volume < OS supported line separator /> gdn-55.6-100 < OS supported line separator />

EXAMPLE 2
```js
    @sink(type='inMemory', topic='{{symbol}}', @map(type='csv',header='true',delimiter='-',@payload(symbol='0',price='2',volume='1')))define stream BarStream (symbol string, price float,volume long);
```
Above configuration will perform a custom CSV mapping. Here, user can
add custom place order in the @payload. The place order indicates that
where the attribute name's value will be appear in the output message,
The output will be produced output as follows: gdn,100,55.6 If header
is true and delimiter is "-", then the output will be as follows:
symbol-price-volume gdn-55.6-100< OS supported line separator />If event
grouping is enabled, then the output is as follows: gdn-55.6-100< OS supported line separator /> gdn-55.6-100< OS supported line separator />
gdn-55.6-100< OS supported line separator/>

### json (Sink Mapper)

This extension is an Event to JSON output mapper. Transports that
publish messages can utilize this extension to convert Stream App events to
JSON messages. You can either send a pre-defined JSON format or a custom
JSON message.

Syntax
```js
    @sink(..., @map(type="json", validate.json="<BOOL>", enclosing.element="<STRING>")
```
QUERY PARAMETERS

| Name              | Description                                                                                                                                                                                                                                                                                                                                                        | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| validate.json     | If this property is set to `true`, it enables JSON validation for the JSON messages generated. When validation is carried out, messages that do not adhere to proper JSON standards are dropped. This property is set to `false` by default.                                                                                                                     | false         | BOOL                | Yes      | No      |
| enclosing.element | This specifies the enclosing element to be used if multiple events are sent in the same JSON message. Stream App treats the child elements of the given enclosing element as events and executes JSON expressions on them. If an `enclosing.element` is not provided, the multiple event scenario is disregarded and JSON path is evaluated based on the root element. | \$            | STRING              | Yes      | No      |

EXAMPLE 1
```js
    @sink(type='inMemory', topic='stock', @map(type='json'))
    define stream FooStream (symbol string, price float, volume long);
```
Above configuration does a default JSON input mapping that generates the
output given below. { Â Â Â Â "event":{ Â Â Â Â Â Â Â Â "symbol":gdn,
Â Â Â Â Â Â Â Â "price":55.6, Â Â Â Â Â Â Â Â "volume":100 Â Â Â Â } }

EXAMPLE 2
```js
    @sink(type='inMemory', topic='{{symbol}}', @map(type='json', enclosing.element='$.portfolio', validate.json='true', @payload( """{"StockData":{"Symbol":"{{symbol}}","Price":{{price}}}}""")))
    define stream BarStream (symbol string, price float, volume long);
```
The above configuration performs a custom JSON mapping that generates
the following JSON message as the output. {"portfolio":{
Â Â Â Â "StockData":{ Â Â Â Â Â Â Â Â "Symbol":gdn, Â Â Â Â Â Â Â Â "Price":55.6
Â Â Â Â Â Â } Â Â } }

### keyvalue (Sink Mapper)

The `Event to Key-Value Map` output mapper extension allows you to
convert Stream App events processed by gdn SP to key-value map events
before publishing them. You can either use pre-defined keys where
conversion takes place without extra configurations, or use custom keys
with which the messages can be published.

Syntax
```js
    @sink(..., @map(type="keyvalue")
```
EXAMPLE 1
```js
    @sink(type='inMemory', topic='stock', @map(type='keyvalue'))
    define stream FooStream (symbol string, price float, volume long);
```
This query performs a default Key-Value output mapping. The expected
output is something similar to the following: symbol:`gdn` price :
55.6f volume: 100L

EXAMPLE 2
```js
    @sink(type='inMemory', topic='stock', @map(type='keyvalue', @payload(a='symbol',b='price',c='volume')))
    define stream FooStream (symbol string, price float, volume long);
```
This query performs a custom Key-Value output mapping where values are
passed as objects. Values for `symbol`, `price`, and `volume` attributes
are published with the keys `a`, `b` and `c` respectively. The expected
output is a map similar to the following: a:`gdn` b : 55.6f c: 100L

EXAMPLE 3
```js
    @sink(type='inMemory', topic='stock', @map(type='keyvalue', @payload(a='{{symbol}} is here',b='`price`',c='volume')))
    define stream FooStream (symbol string, price float, volume long);
```
This query performs a custom Key-Value output mapping where the values
of the `a` and `b` attributes are strings and c is object. The expected
output should be a Map similar to the following: a:`gdn is here` b :
`price` c: 100L

### passThrough (Sink Mapper)

Pass-through mapper passed events (Event\[\]) through without any
mapping or modifications.

Syntax
```js
    @sink(..., @map(type="passThrough")
```
EXAMPLE 1
```js
    @sink(type='inMemory', @map(type='passThrough'))
    define stream BarStream (symbol string, price float, volume long);
```
In the following example BarStream uses passThrough outputmapper which
emit Stream App event directly without any transformation into sink.

### protobuf (Sink Mapper)

This output mapper allows you to convert Events to protobuf messages
before publishing them. To work with this mapper you have to add
auto-generated protobuf classes to the project classpath. When you use
this output mapper, you can either define stream attributes as the same
names as the protobuf message attributes or you can use custom mapping
to map stream definition attributes with the protobuf attributes.
When you use this mapper with `stream processor-io-grpc` you don't have to
provide the protobuf message class in the `class` parameter.

Syntax
```js
    @sink(..., @map(type="protobuf", class="<STRING>")
```
QUERY PARAMETERS

| Name  | Description                                                                                                                           | Default Value | Possible Data Types | Optional | Dynamic |
|-------|---------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| class | This specifies the class name of the protobuf message class, If sink type is grpc then it's not necessary to provide this parameter. | \-            | STRING              | Yes      | No      |

EXAMPLE 1
```js
    @sink(type='inMemory', topic='test01',
    @map(type='protobuf', class='io.streamprocessor.extension.map.protobuf.autogenerated.Request'))
    define stream BarStream (stringValue string, intValue int,longValue long,booleanValue bool,floatValue float,doubleValue double);
```
This will map `BarStream` values into
`io.streamprocessor.extension.map.protobuf.autogenerated.Request` protobuf
message type.

EXAMPLE 2
```js
    @sink(type='grpc',  publisher.url = 'grpc://localhost:2000/org.gdn.grpc.test.MyService/process
    @map(type='protobuf'))
    define stream BarStream (stringValue string, intValue int,longValue long,booleanValue bool,floatValue float,doubleValue double)
```
Above definition will map `BarStream` values into the protobuf messages.
Since this is a `grpc` sink, protobuf mapper will get the type of the
protobuf class by the `publisher.url`.

EXAMPLE 3
```js
    @sink(type='grpc', publisher.url = 'grpc://localhost:2000/org.gdn.grpc.test.MyService/process
    @map(type='protobuf'),
    @payload(stringValue='a',longValue='b',intValue='c',booleanValue='d',floatValue = 'e', doubleValue  = 'f')))
    define stream BarStream (a string, b long, c int,d bool,e float,f double);
```
This will map BarStream values to request message type of the `process`
method in `MyService` service. and stream values will map like this, -
value of `a` will be assign `stringValue` variable in the message class
- value of `b` will be assign `longValue` variable in the message class
- value of `c` will be assign `intValue` variable in the message class -
value of `d` will be assign `booleanValue` variable in the message class
- value of `e` will be assign `floatValue` variable in the message class
- value of `f` will be assign `doubleValue` variable in the message
class

EXAMPLE 4
```js
    @sink(type='inMemory', topic='test01',
    @map(type='protobuf' class='io.streamprocessor.extension.map.protobuf.autogenerated.RequestWithList'))
     define stream BarStream (stringValue string,intValue int,stringList object, intList object);
```
This will map `BarStream` values into
`io.streamprocessor.extension.map.protobuf.autogenerated.RequestWithList`. If you
want to map data types other than the scalar data types, you have to use
`object` as the data type as shown in above(`stringList object`).

### text (Sink Mapper)

This extension is a Event to Text output mapper. Transports that publish
text messages can utilize this extension to convert the Stream App events to
text messages. Users can use a pre-defined text format where event
conversion is carried out without any additional configurations, or use
custom placeholder(using `{{` and `}}`) to map custom text messages.
Again, you can also enable mustache based custom mapping. In mustache
based custom mapping you can use custom placeholder (using `{{` and `}}`
or `{{{` and `}}}`) to map custom text. In mustache based custom
mapping, all variables are HTML escaped by default. For example: `&` is
replaced with `&amp;` `"` is replaced with `&quot;` `=` is replaced with
`&#61;` If you want to return unescaped HTML, use the triple mustache
`{{{` instead of double `{{`.

Syntax
```js
    @sink(..., @map(type="text", event.grouping.enabled="<BOOL>", delimiter="<STRING>", new.line.character="<STRING>", mustache.enabled="<BOOL>")
```
QUERY PARAMETERS

| Name                   | Description                                                                                                                                                                                                                                                                   | Default Value        | Possible Data Types | Optional | Dynamic |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------|---------------------|----------|---------|
| event.grouping.enabled | If this parameter is set to `true`, events are grouped via a delimiter when multiple events are received. It is required to specify a value for the `delimiter` parameter when the value for this parameter is `true`.                                                        | false                | BOOL                | Yes      | No      |
| delimiter              | This parameter specifies how events are separated when a grouped event is received. This must be a whole line and not a single character.                                                                                                                                     | \~\~\~\~\~\~\~\~\~\~ | STRING              | Yes      | No      |
| new.line.character     | This attribute indicates the new line character of the event that is expected to be received. This is used mostly when communication between 2 types of operating systems is expected. For example, Linux uses `\n` whereas Windows uses `\r\n` as the end of line character. | \\n                  | STRING              | Yes      | No      |
| mustache.enabled       | If this parameter is set to `true`, then mustache mapping gets enabled forcustom text mapping.                                                                                                                                                                                | false                | BOOL                | Yes      | No      |

EXAMPLE 1
```js
    @sink(type='inMemory', topic='stock', @map(type='text'))
    define stream FooStream (symbol string, price float, volume long);
```
This query performs a default text input mapping. The expected output is
as follows: symbol:"gdn", price:55.6, volume:100

EXAMPLE 2
```js
    @sink(type='inMemory', topic='stock', @map(type='text', event.grouping.enabled='true'))
    define stream FooStream (symbol string, price float, volume long);
```
This query performs a default text input mapping with event grouping.
The expected output is as follows: symbol:"gdn", price:55.6,
volume:100 ~~~~~~~~~~ symbol:"gdn", price:55.6, volume:100

EXAMPLE 3
```js
    @sink(type='inMemory', topic='stock', @map(type='text',  @payload("SensorID : {{symbol}}/{{volume}}, SensorPrice : Rs{{price}}/=, Value : {{volume}}ml")))
    define stream FooStream (symbol string, price float, volume long);
```
This query performs a custom text mapping. The expected output is as
follows: SensorID : gdn/100, SensorPrice : Rs1000/=, Value : 100ml for
the following stream processor event. {gdn,1000,100}

EXAMPLE 4
```js
    @sink(type='inMemory', topic='stock', @map(type='text', event.grouping.enabled='true', @payload("Stock price of {{symbol}} is {{price}}")))
    define stream FooStream (symbol string, price float, volume long);
```
This query performs a custom text mapping with event grouping. The
expected output is as follows: Stock price of gdn is 55.6
\~~~~~~~~~~ Stock price of gdn is 55.6 ~~~~~~~~~~\
Stock price of gdn is 55.6 for the following stream processor event.
{gdn,55.6,10}

EXAMPLE 5
```js
    @sink(type='inMemory', topic='stock', @map(type='text', mustache.enabled='true',  @payload("SensorID : {{{symbol}}}/{{{volume}}}, SensorPrice : Rs{{{price}}}/=, Value : {{{volume}}}ml")))
    define stream FooStream (symbol string, price float, volume long);
```
This query performs a custom text mapping to return unescaped HTML. The
expected output is as follows: SensorID : a&b/100, SensorPrice :
Rs1000/=, Value : 100ml for the following stream processor event. {a&b,1000,100}

### xml (Sink Mapper)

This mapper converts Stream App output events to XML before they are
published via transports that publish in XML format. Users can either
send a pre-defined XML format or a custom XML message containing event
data.

Syntax
```js
    @sink(..., @map(type="xml", validate.xml="<BOOL>", enclosing.element="<STRING>")
```
QUERY PARAMETERS

| Name              | Description                                                                                                                                                                                                                                                                                                                            | Default Value                                            | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|---------------------|----------|---------|
| validate.xml      | This parameter specifies whether the XML messages generated should be validated or not. If this parameter is set to true, messages that do not adhere to proper XML standards are dropped.                                                                                                                                             | false                                                    | BOOL                | Yes      | No      |
| enclosing.element | When an enclosing element is specified, the child elements (e.g., the immediate child elements) of that element are considered as events. This is useful when you need to send multiple events in a single XML message. When an enclosing element is not specified, one XML message per every event will be emitted without enclosing. | None in custom mapping and \<events\> in default mapping | STRING              | Yes      | No      |

EXAMPLE 1
```js
    @sink(type='inMemory', topic='stock', @map(type='xml'))
    define stream FooStream (symbol string, price float, volume long);
```
Above configuration will do a default XML input mapping which will
generate below output \<events\> Â Â Â Â \<event\>
Â Â Â Â Â Â Â Â \<symbol\>gdn\</symbol\> Â Â Â Â Â Â Â Â \<price\>55.6\</price\>
Â Â Â Â Â Â Â Â \<volume\>100\</volume\> Â Â Â Â \</event\> \</events\>

EXAMPLE 2
```js
    @sink(type='inMemory', topic='{{symbol}}', @map(type='xml', enclosing.element='<portfolio>', validate.xml='true', @payload( "<StockData><Symbol>{{symbol}}</Symbol><Price>{{price}}</Price></StockData>")))
    define stream BarStream (symbol string, price float, volume long);
```
Above configuration will perform a custom XML mapping. Inside \@payload
you can specify the custom template that you want to send the messages
out and addd placeholders to places where you need to add event
attributes.Above config will produce below output XML message
\<portfolio\> Â Â Â Â \<StockData\> Â Â Â Â Â Â Â Â \<Symbol\>gdn\</Symbol\>
Â Â Â Â Â Â Â Â \<Price\>55.6\</Price\> Â Â Â Â \</StockData\> \</portfolio\>

Source
------

### cdc (Source)

The CDC source receives events when change events (i.e., INSERT, UPDATE,
DELETE) are triggered for a database table. Events are received in the
`key-value` format. There are two modes you could perform
CDC:Â Listening modeÂ andÂ Polling mode. In polling mode, the datasource is
periodically polled for capturing the changes. The polling period can be
configured. In polling mode, you can only capture INSERT and UPDATE
changes. On listening mode, the Source will keep listening to the Change
Log of the database and notify in case a change has taken place. Here,
you are immediately notified about the change, compared to polling mode.
The key values of the map of a CDC change event are as follows. For
`listening` mode: Â Â Â Â For insert: Keys are specified as columns of the
table. Â Â Â Â For delete: Keys are followed by the specified table columns.
This is achieved via `before_`. e.g., specifying `before_X`
results in the key being added before the column named `X`. Â Â Â Â For
update: Keys are followed followed by the specified table columns. This
is achieved via `before_`. e.g., specifying `before_X` results in
the key being added before the column named `X`. For `polling` mode:
Keys are specified as the columns of the table.\#\#\#\# Preparations
required for working with Oracle Databases in listening mode Using the
extension in Windows, Mac OSX and AIX are pretty straight forward
inorder to achieve the required behaviour please follow the steps given
below Â Â - Download the compatible version of oracle instantclient for
the database version from
\[here\](https://www.oracle.com/database/technologies/instant-client/downloads.html)
and extract Â Â - Extract and set the environment variable
`LD_LIBRARY_PATH` to the location of instantclient which was exstracted
as shown below Â Â 

        export LD_LIBRARY_PATH=<path to the instant client location>


Â Â - Inside the instantclient folder which was download there are two
jars `xstreams.jar` and `ojdbc<version>.jar` convert them to OSGi
bundles using the tools which were provided in the `<distribution>/bin`
for converting the `ojdbc.jar` use the tool `spi-provider.sh|bat` and
for the conversion of `xstreams.jar` use the jni-provider.sh as shown
below(Note: this way of converting Xstreams jar is applicable only for
Linux environments for other OSs this step is not required and
converting it through the `jartobundle.sh` tool is enough) Â Â 

        ./jni-provider.sh <input-jar> <destination> <comma seperated native library names>


Â Â once ojdbc and xstreams jars are converted to OSGi copy the generated
jars to the `<distribution>/lib`. Currently streamprocessor-io-cdc only supports
the oracle database distributions 12 and above See parameter: mode for
supported databases and change events.

Syntax
```js
    @source(type="cdc", url="<STRING>", mode="<STRING>", jdbc.driver.name="<STRING>", username="<STRING>", password="<STRING>", pool.properties="<STRING>", datasource.name="<STRING>", table.name="<STRING>", polling.column="<STRING>", polling.interval="<INT>", operation="<STRING>", connector.properties="<STRING>", database.server.id="<STRING>", database.server.name="<STRING>", wait.on.missed.record="<BOOL>", missed.record.waiting.timeout="<INT>", @map(...)))
```
QUERY PARAMETERS

| Name                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Default Value                        | Possible Data Types | Optional | Dynamic |
|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------|---------------------|----------|---------|
| url                           | The connection URL to the database. F=The format used is: `jdbc:mysql://<host>:<port>/<database_name>`                                                                                                                                                                                                                                                                                                                                                                                                                     |                                      | STRING              | No       | No      |
| mode                          | Mode to capture the change data. The type of events that can be received, and the required parameters differ based on the mode. The mode can be one of the following: `polling`: This mode uses a column named `polling.column` to monitor the given table. It captures change events of the `RDBMS`, `INSERT`, and `UPDATE` types. `listening`: This mode uses logs to monitor the given table. It currently supports change events only of the `MySQL`, `INSERT`, `UPDATE`, and `DELETE` types.                 | listening                            | STRING              | Yes      | No      |
| jdbc.driver.name              | The driver class name for connecting the database. **It is required to specify a value for this parameter when the mode is `polling`.**                                                                                                                                                                                                                                                                                                                                                                                       |                                      | STRING              | Yes      | No      |
| username                      | The username to be used for accessing the database. This user needs to have the `SELECT`, `RELOAD`, `SHOW DATABASES`, `REPLICATION SLAVE`, and `REPLICATION CLIENT`privileges for the change data capturing table (specified via the `table.name` parameter). To operate in the polling mode, the user needs `SELECT` privileges.                                                                                                                                                                                     |                                      | STRING              | No       | No      |
| password                      | The password of the username you specified for accessing the database.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                                      | STRING              | No       | No      |
| pool.properties               | The pool parameters for the database connection can be specified as key-value pairs.                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                      | STRING              | Yes      | No      |
| datasource.name               | Name of the gdn datasource to connect to the database. When datasource name is provided, the URL, username and password are not needed. A datasource based connection is given more priority over the URL based connection. Â This parameter is applicable only when the mode is set to `polling`, and it can be applied only when you use this extension with gdn Stream Processor.                                                                                                                                             |                                      | STRING              | Yes      | No      |
| table.name                    | The name of the table that needs to be monitored for data changes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |                                      | STRING              | No       | No      |
| polling.column                | The column name that is polled to capture the change data. It is recommended to have a TIMESTAMP field as the `polling.column` in order to capture the inserts and updates. Numeric auto-incremental fields and char fields can also be used as `polling.column`. However, note that fields of these types only support insert change capturing, and the possibility of using a char field also depends on how the data is input. **It is required to enter a value for this parameter only when the mode is `polling`.** |                                      | STRING              | Yes      | No      |
| polling.interval              | The time interval (specified in seconds) to poll the given table for changes. This parameter is applicable only when the mode is set to `polling`.                                                                                                                                                                                                                                                                                                                                                                                | 1                                    | INT                 | Yes      | No      |
| operation                     | The change event operation you want to carry out. Possible values are `insert`, `update` or `delete`. This parameter is not case sensitive. **It is required to specify a value only when the mode is `listening`.**                                                                                                                                                                                                                                                                                                    |                                      | STRING              | No       | No      |
| connector.properties          | Here, you can specify Debezium connector properties as a comma-separated string. The properties specified here are given more priority over the parameters. This parameter is applicable only for the `listening` mode.                                                                                                                                                                                                                                                                                                           | Empty\_String                        | STRING              | Yes      | No      |
| database.server.id            | An ID to be used when joining MySQL database cluster to read the bin log. This should be a unique integer between 1 to 2\^32. This parameter is applicable only when the mode is `listening`.                                                                                                                                                                                                                                                                                                                                     | Random integer between 5400 and 6400 | STRING              | Yes      | No      |
| database.server.name          | A logical name that identifies and provides a namespace for the database server. This parameter is applicable only when the mode is `listening`.                                                                                                                                                                                                                                                                                                                                                                                  | {host}\_{port}                       | STRING              | Yes      | No      |
| wait.on.missed.record         | Indicates whether the process needs to wait on missing/out-of-order records. When this flag is set to `true` the process will be held once it identifies a missing record. The missing recrod is identified by the sequence of the polling.column value. This can be used only with number fields and not recommended to use with time values as it will not be sequential. This should be enabled ONLY where the records can be written out-of-order, (eg. concurrent writers) as this degrades the performance.                 | false                                | BOOL                | Yes      | No      |
| missed.record.waiting.timeout | The timeout (specified in seconds) to retry for missing/out-of-order record. This should be used along with the wait.on.missed.record parameter. If the parameter is not set, the process will indefinitely wait for the missing record.                                                                                                                                                                                                                                                                                            | -1                                   | INT                 | Yes      | No      |

EXAMPLE 1
```js
    @source(type = 'cdc' , url = 'jdbc:mysql://localhost:3306/SimpleDB',
    username = 'cdcuser', password = 'pswd4cdc',
    table.name = 'students', operation = 'insert',
    @map(type='keyvalue', @attributes(id = 'id', name = 'name')))
    define stream inputStream (id string, name string);
```
In this example, the CDC source listens to the row insertions that are
made in the `students` table with the column name, and the ID. This
table belongs to the `SimpleDB` MySQL database that can be accessed
via the given URL.

EXAMPLE 2
```js
    @source(type = 'cdc' , url = 'jdbc:mysql://localhost:3306/SimpleDB',
    username = 'cdcuser', password = 'pswd4cdc',
    table.name = 'students', operation = 'update',
    @map(type='keyvalue', @attributes(id = 'id', name = 'name',
    before_id = 'before_id', before_name = 'before_name')))
    define stream inputStream (before_id string, id string,
    before_name string , name string);
```
In this example, the CDC source listens to the row updates that are made
in the `students` table. This table belongs to the `SimpleDB` MySQL
database that can be accessed via the given URL.

EXAMPLE 3
```js
    @source(type = 'cdc' , url = 'jdbc:mysql://localhost:3306/SimpleDB',
    username = 'cdcuser', password = 'pswd4cdc',
    table.name = 'students', operation = 'delete',
    @map(type='keyvalue', @attributes(before_id = 'before_id', before_name = 'before_name')))
    define stream inputStream (before_id string, before_name string);
```
In this example, the CDC source listens to the row deletions made in the
`students` table. This table belongs to the `SimpleDB` database that
can be accessed via the given URL.

EXAMPLE 4
```js
    @source(type = 'cdc', mode='polling', polling.column = 'id',
    jdbc.driver.name = 'com.mysql.jdbc.Driver', url = 'jdbc:mysql://localhost:3306/SimpleDB',
    username = 'cdcuser', password = 'pswd4cdc',
    table.name = 'students',
    @map(type='keyvalue'), @attributes(id = 'id', name = 'name'))
    define stream inputStream (id int, name string);
```
In this example, the CDC source polls the `students` table for
inserts. `id` that is specified as the polling column is an auto
incremental field. The connection to the database is made via the URL,
username, password, and the JDBC driver name.

EXAMPLE 5
```js
    @source(type = 'cdc', mode='polling', polling.column = 'id', datasource.name = 'SimpleDB',
    table.name = 'students',
    @map(type='keyvalue'), @attributes(id = 'id', name = 'name'))
    define stream inputStream (id int, name string);
```
In this example, the CDC source polls the `students` table for
inserts. The given polling column is a char column with the `S001,
S002, ... .` pattern. The connection to the database is made via a
data source named `SimpleDB`. Note that the `datasource.name`
parameter works only with the Stream Processor.

EXAMPLE 6
```js
    @source(type = 'cdc', mode='polling', polling.column = 'last_updated', datasource.name = 'SimpleDB',
    table.name = 'students',
    @map(type='keyvalue'))
    define stream inputStream (name string);
```
In this example, the CDC source polls the `students` table for inserts
and updates. The polling column is a timestamp field.

EXAMPLE 7
```js
    @source(type='cdc', jdbc.driver.name='com.mysql.jdbc.Driver', url='jdbc:mysql://localhost:3306/SimpleDB', username='cdcuser', password='pswd4cdc', table.name='students', mode='polling', polling.column='id', operation='insert', wait.on.missed.record='true', missed.record.waiting.timeout='10',
    @map(type='keyvalue'),
    @attributes(batch_no='batch_no', item='item', qty='qty'))
    define stream inputStream (id int, name string);
```
In this example, the CDC source polls the `students` table for
inserts. The polling column is a numeric field. This source expects the
records in the database to be written concurrently/out-of-order so it
waits if it encounters a missing record. If the record doesn't appear
within 10 seconds it resumes the process.

EXAMPLE 8
```js
    @source(type = 'cdc', url = 'jdbc:oracle:thin://localhost:1521/ORCLCDB', username='c##xstrm', password='xs', table.name='DEBEZIUM.sweetproductiontable', operation = 'insert', connector.properties='oracle.outserver.name=DBZXOUT,oracle.pdb=ORCLPDB1' @map(type = 'keyvalue'))
    define stream insertSweetProductionStream (ID int, NAME string, WEIGHT int);
```
In this example, the CDC source connect to an Oracle database and
listens for insert queries of sweetproduction table

### email (Source)

The `Email` source allows you to receive events via emails. An
`Email` source can be configured using the `imap` or `pop3` server
to receive events. This allows you to filter the messages that satisfy
the criteria specified under the `search term` option. The email
source parameters can be defined in either the
`<SP_HOME>/conf/<PROFILE>/deployment yaml` file or the stream
definition. If the parameter configurations are not available in either
place, the default values are considered (i.e., if default values are
available). If you need to configure server system parameters that are
not provided as options in the stream definition, they need to be
defined in the `deployment yaml` file under `email source
properties`. For more information about `imap` and `pop3` server
system parameters, see the following. \[JavaMail Reference
Implementation - IMAP
Store\](https://javaee.github.io/javamail/IMAP-Store) \[JavaMail
Reference Implementation - POP3 Store
Store\](https://javaee.github.io/javamail/POP3-Store)

Syntax
```js
    @source(type="email", username="<STRING>", password="<STRING>", store="<STRING>", host="<STRING>", port="<INT>", folder="<STRING>", search.term="<STRING>", polling.interval="<LONG>", action.after.processed="<STRING>", folder.to.move="<STRING>", content.type="<STRING>", ssl.enable="<BOOL>", @map(...)))
```
QUERY PARAMETERS

| Name                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Default Value                                                                                                                                        | Possible Data Types | Optional | Dynamic |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|----------|---------|
| username               | The user name of the email account. e.g., `gdnmail` is the username of the `gdnmail@gmail.com` mail account.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                      | STRING              | No       | No      |
| password               | The password of the email account                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |                                                                                                                                                      | STRING              | No       | No      |
| store                  | The store type that used to receive emails. Possible values are `imap` and `pop3`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | imap                                                                                                                                                 | STRING              | Yes      | No      |
| host                   | The host name of the server (e.g., `imap.gmail.com` is the host name for a gmail account with an IMAP store.). The default value `imap.gmail.com` is only valid if the email account is a gmail account with IMAP enabled.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | If store type is `imap`, then the default value is `imap.gmail.com`. If the store type is `pop3`, then the default value is `pop3.gmail.com`. | STRING              | Yes      | No      |
| port                   | The port that is used to create the connection.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `993`, the default value is valid only if the store is `imap` and ssl-enabled.                                                                   | INT                 | Yes      | No      |
| folder                 | The name of the folder to which the emails should be fetched.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | INBOX                                                                                                                                                | STRING              | Yes      | No      |
| search.term            | The option that includes conditions such as key-value pairs to search for emails. In a string search term, the key and the value should be separated by a semicolon (`;`). Each key-value pair must be within inverted commas (` `). The string search term can define multiple comma-separated key-value pairs. This string search term currently supports only the `subject`, `from`, `to`, `bcc`, and `cc` keys. e.g., if you enter `subject:DAS, from:carbon, bcc:gdn`, the search term creates a search term instance that filters emails that contain `DAS` in the subject, `carbon` in the `from` address, and `gdn` in one of the `bcc` addresses. The string search term carries out sub string matching that is case-sensitive. If `@` in included in the value for any key other than the `subject` key, it checks for an address that is equal to the value given. e.g., If you search for `abc@`, the string search terms looks for an address that contains `abc` before the `@` symbol. | None                                                                                                                                                 | STRING              | Yes      | No      |
| polling.interval       | This defines the time interval in seconds at which th email source should poll the account to check for new mail arrivals.in seconds.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 600                                                                                                                                                  | LONG                | Yes      | No      |
| action.after.processed | The action to be performed by the email source for the processed mail. Possible values are as follows: `FLAGGED`: Sets the flag as `flagged`. `SEEN`: Sets the flag as `read`. `ANSWERED`: Sets the flag as `answered`. `DELETE`: Deletes tha mail after the polling cycle. `MOVE`: Moves the mail to the folder specified in the `folder.to.move` parameter. Â If the folder specified is `pop3`, then the only option available is `DELETE`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | NONE                                                                                                                                                 | STRING              | Yes      | No      |
| folder.to.move         | The name of the folder to which the mail must be moved once it is processed. If the action after processing is `MOVE`, it is required to specify a value for this parameter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |                                                                                                                                                      | STRING              | No       | No      |
| content.type           | The content type of the email. It can be either `text/plain` or `text/html.`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | text/plain                                                                                                                                           | STRING              | Yes      | No      |
| ssl.enable             | If this is set to `true`, a secure port is used to establish the connection. The possible values are `true` and `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | true                                                                                                                                                 | BOOL                | Yes      | No      |

System Parameters

| Name                              | Description                                                                                                                                                                                                                                                                                                                                                                                                           | Default Value                                                           | Possible Parameters       |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|---------------------------|
| mail.imap.partialfetch            | This determines whether the IMAP partial-fetch capability should be used.                                                                                                                                                                                                                                                                                                                                             | true                                                                    | true or false             |
| mail.imap.fetchsize               | The partial fetch size in bytes.                                                                                                                                                                                                                                                                                                                                                                                      | 16K                                                                     | value in bytes            |
| mail.imap.peek                    | If this is set to `true`, the IMAP PEEK option should be used when fetching body parts to avoid setting the `SEEN` flag on messages. The default value is `false`. This can be overridden on a per-message basis by the `setPeek method` in `IMAPMessage`.                                                                                                                                                  | false                                                                   | true or false             |
| mail.imap.connectiontimeout       | The socket connection timeout value in milliseconds. This timeout is implemented by `java.net.Socket`.                                                                                                                                                                                                                                                                                                              | infinity timeout                                                        | Any Integer value         |
| mail.imap.timeout                 | The socket read timeout value in milliseconds. This timeout is implemented by `java.net.Socket`.                                                                                                                                                                                                                                                                                                                    | infinity timeout                                                        | Any Integer value         |
| mail.imap.writetimeout            | The socket write timeout value in milliseconds. This timeout is implemented by using a `java.util.concurrent.ScheduledExecutorService` per connection that schedules a thread to close the socket if the timeout period elapses. Therefore, the overhead of using this timeout is one thread per connection.                                                                                                        | infinity timeout                                                        | Any Integer value         |
| mail.imap.statuscachetimeout      | The timeout value in milliseconds for the cache of `STATUS` command response.                                                                                                                                                                                                                                                                                                                                       | 1000ms                                                                  | Time out in miliseconds   |
| mail.imap.appendbuffersize        | The maximum size of a message to buffer in memory when appending to an IMAP folder.                                                                                                                                                                                                                                                                                                                                   | None                                                                    | Any Integer value         |
| mail.imap.connectionpoolsize      | The maximum number of available connections in the connection pool.                                                                                                                                                                                                                                                                                                                                                   | 1                                                                       | Any Integer value         |
| mail.imap.connectionpooltimeout   | The timeout value in milliseconds for connection pool connections.                                                                                                                                                                                                                                                                                                                                                    | 45000ms                                                                 | Any Integer               |
| mail.imap.separatestoreconnection | If this parameter is set to `true`, it indicates that a dedicated store connection needs to be used for store commands.                                                                                                                                                                                                                                                                                             | true                                                                    | true or false             |
| mail.imap.auth.login.disable      | If this is set to `true`, it is not possible to use the non-standard `AUTHENTICATE LOGIN` command instead of the plain `LOGIN` command.                                                                                                                                                                                                                                                                         | false                                                                   | true or false             |
| mail.imap.auth.plain.disable      | If this is set to `true`, the `AUTHENTICATE PLAIN` command cannot be used.                                                                                                                                                                                                                                                                                                                                        | false                                                                   | true or false             |
| mail.imap.auth.ntlm.disable       | If true, prevents use of the AUTHENTICATE NTLM command.                                                                                                                                                                                                                                                                                                                                                               | false                                                                   | true or false             |
| mail.imap.proxyauth.user          | If the server supports the PROXYAUTH extension, this property specifies the name of the user to act as. Authentication to log in to the server is carried out using the administrator's credentials. After authentication, the IMAP provider issues the `PROXYAUTH` command with the user name specified in this property.                                                                                         | None                                                                    | Valid string value        |
| mail.imap.localaddress            | The local address (host name) to bind to when creating the IMAP socket.                                                                                                                                                                                                                                                                                                                                               | Defaults to the address picked by the Socket class.                     | Valid string value        |
| mail.imap.localport               | The local port number to bind to when creating the IMAP socket.                                                                                                                                                                                                                                                                                                                                                       | Defaults to the port number picked by the Socket class.                 | Valid String value        |
| mail.imap.sasl.enable             | If this parameter is set to `true`, the system attempts to use the `javax.security.sasl` package to choose an authentication mechanism for the login.                                                                                                                                                                                                                                                             | false                                                                   | true or false             |
| mail.imap.sasl.mechanisms         | A list of SASL mechanism names that the system should to try to use. The names can be separated by spaces or commas.                                                                                                                                                                                                                                                                                                  | None                                                                    | Valid string value        |
| mail.imap.sasl.authorizationid    | The authorization ID to use in the SASL authentication.                                                                                                                                                                                                                                                                                                                                                               | If this parameter is not set, the authentication ID (username) is used. | Valid string value        |
| mail.imap.sasl.realm              | The realm to use with SASL authentication mechanisms that require a realm, such as `DIGEST-MD5`.                                                                                                                                                                                                                                                                                                                    | None                                                                    | Valid string value        |
| mail.imap.auth.ntlm.domain        | The NTLM authentication domain.                                                                                                                                                                                                                                                                                                                                                                                       | None                                                                    | Valid string value        |
| The NTLM authentication domain.   | NTLM protocol-specific flags.                                                                                                                                                                                                                                                                                                                                                                                         | None                                                                    | Valid integer value       |
| mail.imap.socketFactory           | If this parameter is set to a class that implements the `javax.net.SocketFactory` interface, this class is used to create IMAP sockets.                                                                                                                                                                                                                                                                             | None                                                                    | Valid SocketFactory       |
| mail.imap.socketFactory.class     | If this parameter is set, it specifies the name of a class that implements the `javax.net.SocketFactory` interface. This class is used to create IMAP sockets.                                                                                                                                                                                                                                                      | None                                                                    | Valid string              |
| mail.imap.socketFactory.fallback  | If this parameter is set to `true`, failure to create a socket using the specified socket factory class results in the socket being created using the `java.net.Socket` class.                                                                                                                                                                                                                                    | true                                                                    | true or false             |
| mail.imap.socketFactory.port      | This specifies the port to connect to when using the specified socket factory. If this parameter is not set, the default port is used.                                                                                                                                                                                                                                                                                | 143                                                                     | Valid Integer             |
| mail.imap.ssl.checkserveridentity | If this parameter is set to `true`, the system checks the server identity as specified by RFC 2595.                                                                                                                                                                                                                                                                                                                 | false                                                                   | true or false             |
| mail.imap.ssl.trust               | If this parameter is set and a socket factory has not been specified, it enables the use of a `MailSSLSocketFactory`. If this parameter is set to `*`, all the hosts are trusted. If this parameter specifies list of hosts separated by white spaces, only those hosts are trusted. If the parameter is not set to any of the values mentioned above, trust depends on the certificate presented by the server. | \*                                                                      | Valid String              |
| mail.imap.ssl.socketFactory       | If this parameter is set to a class that extends the `javax.net.ssl.SSLSocketFactory` class this class is used to create IMAP SSL sockets.                                                                                                                                                                                                                                                                          | None                                                                    | SSL Socket Factory        |
| mail.imap.ssl.socketFactory.class | If this parameter is set, it specifies the name of a class that extends the `javax.net.ssl.SSLSocketFactory` class. This class is used to create IMAP SSL sockets.                                                                                                                                                                                                                                                  | None                                                                    | Valid String              |
| mail.imap.ssl.socketFactory.port  | This specifies the port to connect to when using the specified socket factory.                                                                                                                                                                                                                                                                                                                                        | the default port 993 is used.                                           | valid port number         |
| mail.imap.ssl.protocols           | This specifies the SSL protocols that are enabled for SSL connections. The property value is a whitespace-separated list of tokens acceptable to the `javax.net.ssl.SSLSocket.setEnabledProtocols` method.                                                                                                                                                                                                          | None                                                                    | Valid string              |
| mail.imap.starttls.enable         | If this parameter is set to `true`, it is possible to use the `STARTTLS` command (if supported by the server) to switch the connection to a TLS-protected connection before issuing any login commands.                                                                                                                                                                                                           | false                                                                   | true or false             |
| mail.imap.socks.host              | This specifies the host name of a `SOCKS5` proxy server that is used to connect to the mail server.                                                                                                                                                                                                                                                                                                                 | None                                                                    | Valid String              |
| mail.imap.socks.port              | This specifies the port number for the `SOCKS5` proxy server. This is needed if the proxy server is not using the standard port number 1080.                                                                                                                                                                                                                                                                        | 1080                                                                    | Valid String              |
| mail.imap.minidletime             | This property sets the delay in milliseconds.                                                                                                                                                                                                                                                                                                                                                                         | 10 milliseconds                                                         | time in seconds (Integer) |
| mail.imap.enableimapevents        | If this property is set to `true`, it enables special IMAP-specific events to be delivered to the `ConnectionListener` of the store. The unsolicited responses received during the idle method of the store are sent as connection events with `IMAPStore.RESPONSE` as the type. The event's message is the raw IMAP response string.                                                                          | false                                                                   | true or false             |
| mail.imap.folder.class            | The class name of a subclass of `com.sun.mail.imap.IMAPFolder`. The subclass can be used to provide support for additional IMAP commands. The subclass must have public constructors of the form `public MyIMAPFolder`(String fullName, char separator, IMAPStore store, Boolean isNamespace) and public `MyIMAPFolder`(ListInfo li, IMAPStore store)                                                           | None                                                                    | Valid String              |
| mail.pop3.connectiontimeout       | The socket connection timeout value in milliseconds.                                                                                                                                                                                                                                                                                                                                                                  | Infinite timeout                                                        | Integer value             |
| mail.pop3.timeout                 | The socket I/O timeout value in milliseconds.                                                                                                                                                                                                                                                                                                                                                                         | Infinite timeout                                                        | Integer value             |
| mail.pop3.message.class           | The class name of a subclass of `com.sun.mail.pop3.POP3Message`.                                                                                                                                                                                                                                                                                                                                                    | None                                                                    | Valid String              |
| mail.pop3.localaddress            | The local address (host name) to bind to when creating the POP3 socket.                                                                                                                                                                                                                                                                                                                                               | Defaults to the address picked by the Socket class.                     | Valid String              |
| mail.pop3.localport               | The local port number to bind to when creating the POP3 socket.                                                                                                                                                                                                                                                                                                                                                       | Defaults to the port number picked by the Socket class.                 | Valid port number         |
| mail.pop3.apop.enable             | If this parameter is set to `true`, use `APOP` instead of `USER/PASS` to log in to the `POP3` server (if the `POP3` server supports `APOP`). APOP sends a digest of the password instead of clearing the text password.                                                                                                                                                                                   | false                                                                   | true or false             |
| mail.pop3.socketFactory           | If this parameter is set to a class that implements the `javax.net.SocketFactory` interface, this class is used to create `POP3` sockets.                                                                                                                                                                                                                                                                         | None                                                                    | Socket Factory            |
| mail.pop3.socketFactory.class     | If this parameter is set, it specifies the name of a class that implements the `javax.net.SocketFactory` interface. This class is used to create `POP3` sockets.                                                                                                                                                                                                                                                  | None                                                                    | Valid String              |
| mail.pop3.socketFactory.fallback  | If this parameter is set to `true`, failure to create a socket using the specified socket factory class results in the socket being created using the `java.net.Socket` class.                                                                                                                                                                                                                                    | false                                                                   | true or false             |
| mail.pop3.socketFactory.port      | This specifies the port to connect to when using the specified socket factory.                                                                                                                                                                                                                                                                                                                                        | Default port                                                            | Valid port number         |
| mail.pop3.ssl.checkserveridentity | If this parameter is set to `true`, check the server identity as specified by RFC 2595.                                                                                                                                                                                                                                                                                                                             | false                                                                   | true or false             |
| mail.pop3.ssl.trust               | If this parameter is set and a socket factory has not been specified, it is possible to use a `MailSSLSocketFactory`. If this parameter is set to `*`, all the hosts are trusted. If the parameter is set to a whitespace-separated list of hosts, only those hosts are trusted. If the parameter is not set to any of the values mentioned above, trust depends on the certificate presented by the server.     | \*                                                                      | Valid String              |
| mail.pop3.ssl.socketFactory       | If this parameter is set to a class that extends the `javax.net.ssl.SSLSocketFactory` class, this class is used to create `POP3` SSL sockets.                                                                                                                                                                                                                                                                     | None                                                                    | SSL Socket Factory        |
| mail.pop3.ssl.checkserveridentity | If this parameter is set to `true`, the system checks the server identity as specified by `RFC 2595`.                                                                                                                                                                                                                                                                                                             | false                                                                   | true or false             |
| mail.pop3.ssl.trust               | If this parameter is set and a socket factory has not been specified, it is possible to use a `MailSSLSocketFactory`. If this parameter is set to `*`, all the hosts are trusted. If the parameter is set to a whitespace-separated list of hosts, only those hosts are trusted.                                                                                                                                 | Trust depends on the certificate presented by the server.               | Valid String              |
| mail.pop3.ssl.socketFactory       | If this parameter is set to a class that extends the `javax.net.ssl.SSLSocketFactory` class, this class is used to create `POP3 SSL` sockets.                                                                                                                                                                                                                                                                     | None                                                                    | SSL Socket Factory        |
| mail.pop3.ssl.socketFactory.class | If this parameter is set, it specifies the name of a class that extends the `javax.net.ssl.SSLSocketFactory` class. This class is used to create `POP3 SSL` sockets.                                                                                                                                                                                                                                              | None                                                                    | Valid String              |
| mail.pop3.ssl.socketFactory.p     | This parameter pecifies the port to connect to when using the specified socket factory.                                                                                                                                                                                                                                                                                                                               | 995                                                                     | Valid Integer             |
| mail.pop3.ssl.protocols           | This parameter specifies the SSL protocols that are enabled for SSL connections. The property value is a whitespace-separated list of tokens acceptable to the `javax.net.ssl.SSLSocket.setEnabledProtocols` method.                                                                                                                                                                                                | None                                                                    | Valid String              |
| mail.pop3.starttls.enable         | If this parameter is set to `true`, it is possible to use the `STLS` command (if supported by the server) to switch the connection to a TLS-protected connection before issuing any login commands.                                                                                                                                                                                                               | false                                                                   | true or false             |
| mail.pop3.starttls.required       | If this parameter is set to `true`, it is required to use the `STLS` command. The connect method fails if the server does not support the `STLS` command or if the command fails.                                                                                                                                                                                                                               | false                                                                   | true or false             |
| mail.pop3.socks.host              | This parameter specifies the host name of a `SOCKS5` proxy server that can be used to connect to the mail server.                                                                                                                                                                                                                                                                                                   | None                                                                    | Valid String              |
| mail.pop3.socks.port              | This parameter specifies the port number for the `SOCKS5` proxy server.                                                                                                                                                                                                                                                                                                                                             | None                                                                    | Valid String              |
| mail.pop3.disabletop              | If this parameter is set to `true`, the `POP3 TOP` command is not used to fetch message headers.                                                                                                                                                                                                                                                                                                                  | false                                                                   | true or false             |
| mail.pop3.forgettopheaders        | If this parameter is set to `true`, the headers that might have been retrieved using the `POP3 TOP` command is forgotten and replaced by the headers retrieved when the `POP3 RETR` command is executed.                                                                                                                                                                                                        | false                                                                   | true or false             |
| mail.pop3.filecache.enable        | If this parameter is set to `true`, the `POP3` provider caches message data in a temporary file instead of caching them in memory. Messages are only added to the cache when accessing the message content. Message headers are always cached in memory (on demand). The file cache is removed when the folder is closed or the JVM terminates.                                                                   | false                                                                   | true or false             |
| mail.pop3.filecache.dir           | If the file cache is enabled, this property is used to override the default directory used by the JDK for temporary files.                                                                                                                                                                                                                                                                                            | None                                                                    | Valid String              |
| mail.pop3.cachewriteto            | This parameter controls the behavior of the `writeTo` method on a `POP3` message object. If the parameter is set to `true`, the message content has not been cached yet, and the `ignoreList` is null, the message is cached before being written. If not, the message is streamed directly to the output stream without being cached.                                                                        | false                                                                   | true or false             |
| mail.pop3.keepmessagecontent      | If this property is set to `true`, a hard reference to the cached content is retained, preventing the memory from being reused until the folder is closed, or until the cached content is explicitly invalidated (using the `invalidate` method).                                                                                                                                                                 | false                                                                   | true or false             |

EXAMPLE 1
```js
    @source(type='email', @map(type='xml'), username='receiver.account', password='account.password',)define stream inputStream (name string, age int, country string);
```
This example illustrates how to receive events in `xml` format via the
email source. In this example, only the required parameters are defined
in the stream definition. The default values are taken for the other
parameters. The search term is not defined, and therefore, all the new
messages in the inbox folder are polled and taken.

EXAMPLE 2
```js
    @source(type='email', @map(type='xml'), username='receiver.account', password='account.password',store = 'imap',host = 'imap.gmail.com',port = '993',searchTerm = 'subject:Stream Processor, from: from.account@ , cc: cc.account',polling.interval='500',action.after.processed='DELETE',content.type='text/html,)define stream inputStream (name string, age int, country string);
```
This example illustrates how to receive events in `xml` format via the
email source. The email source polls the mail account every 500 seconds
to check whether any new mails have arrived. It processes new mails only
if they satisfy the conditions specified for the email search term (the
value for `from` of the email message should be `from.account@.<host
name>`, and the message should contain `cc.account` in the cc
receipient list and the word `Stream Processor` in the mail subject).
in this example, the action after processing is `DELETE`.
Therefore,after processing the event, corresponding mail is deleted from
the mail folder.

### file (Source)

File Source provides the functionality for user to feed data to stream processor
from files. Both text and binary files are supported by file source.

Syntax
```js
    @source(type="file", dir.uri="<STRING>", file.uri="<STRING>", mode="<STRING>", tailing="<BOOL>", action.after.process="<STRING>", action.after.failure="<STRING>", move.after.process="<STRING>", move.after.failure="<STRING>", begin.regex="<STRING>", end.regex="<STRING>", file.polling.interval="<STRING>", dir.polling.interval="<STRING>", timeout="<STRING>", file.read.wait.timeout="<STRING>", @map(...)))
```
QUERY PARAMETERS

| Name                   | Description                                                                                                                                                                                                                                                                                                                                | Default Value | Possible Data Types | Optional | Dynamic |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| dir.uri                | Used to specify a directory to be processed. All the files inside this directory will be processed. Only one of `dir.uri` and `file.uri` should be provided. This uri MUST have the respective protocol specified.                                                                                                                     |               | STRING              | No       | No      |
| file.uri               | Used to specify a file to be processed. Â Only one of `dir.uri` and `file.uri` should be provided. This uri MUST have the respective protocol specified.                                                                                                                                                                                |               | STRING              | No       | No      |
| mode                   | This parameter is used to specify how files in given directory should.Possible values for this parameter are, 1. TEXT.FULL : to read a text file completely at once. 2. BINARY.FULL : to read a binary file completely at once. 3. LINE : to read a text file line by line. 4. REGEX : to read a text file and extract data using a regex. | line          | STRING              | Yes      | No      |
| tailing                | This can either have value true or false. By default it will be true. This attribute allows user to specify whether the file should be tailed or not. If tailing is enabled, the first file of the directory will be tailed. Also tailing should not be enabled in `binary.full` or `text.full` modes.                                 | true          | BOOL                | Yes      | No      |
| action.after.process   | This parameter is used to specify the action which should be carried out after processing a file in the given directory. It can be either DELETE or MOVE and default value will be `DELETE`. If the action.after.process is MOVE, user must specify the location to move consumed files using `move.after.process` parameter.          | delete        | STRING              | Yes      | No      |
| action.after.failure   | This parameter is used to specify the action which should be carried out if a failure occurred during the process. It can be either DELETE or MOVE and default value will be `DELETE`. If the action.after.failure is MOVE, user must specify the location to move consumed files using `move.after.failure` parameter.                | delete        | STRING              | Yes      | No      |
| move.after.process     | If action.after.process is MOVE, user must specify the location to move consumed files using `move.after.process` parameter. This should be the absolute path of the file that going to be created after moving is done. This uri MUST have the respective protocol specified.                                                           |               | STRING              | No       | No      |
| move.after.failure     | If action.after.failure is MOVE, user must specify the location to move consumed files using `move.after.failure` parameter. This should be the absolute path of the file that going to be created after moving is done. This uri MUST have the respective protocol specified.                                                           |               | STRING              | No       | No      |
| begin.regex            | This will define the regex to be matched at the beginning of the retrieved content.                                                                                                                                                                                                                                                        | None          | STRING              | Yes      | No      |
| end.regex              | This will define the regex to be matched at the end of the retrieved content.                                                                                                                                                                                                                                                              | None          | STRING              | Yes      | No      |
| file.polling.interval  | This parameter is used to specify the time period (in milliseconds) of a polling cycle for a file.                                                                                                                                                                                                                                         | 1000          | STRING              | Yes      | No      |
| dir.polling.interval   | This parameter is used to specify the time period (in milliseconds) of a polling cycle for a directory.                                                                                                                                                                                                                                    | 1000          | STRING              | Yes      | No      |
| timeout                | This parameter is used to specify the maximum time period (in milliseconds) for waiting until a file is processed.                                                                                                                                                                                                                         | 5000          | STRING              | Yes      | No      |
| file.read.wait.timeout | This parameter is used to specify the maximum time period (in milliseconds) till it waits before retrying to read the full file content.                                                                                                                                                                                                   | 1000          | STRING              | Yes      | No      |

EXAMPLE 1
```js
    @source(type='file',
    mode='text.full',
    tailing='false'
     dir.uri='file://abc/xyz',
    action.after.process='delete',
    @map(type='json'))
    define stream FooStream (symbol string, price float, volume long);
```
Under above configuration, all the files in directory will be picked and
read one by one. In this case, it's assumed that all the files contains
json valid json strings with keys `symbol`,`price` and `volume`.
Once a file is read, its content will be converted to an event using
streamprocessor-map-json extension and then, that event will be received to the
FooStream. Finally, after reading is finished, the file will be deleted.

EXAMPLE 2
```js
    @source(type='file',
    mode='files.repo.line',
    tailing='true',
    dir.uri='file://abc/xyz',
    @map(type='json'))
    define stream FooStream (symbol string, price float, volume long);
```

Under above configuration, the first file in directory `/abc/xyz` will
be picked and read line by line. In this case, it is assumed that the
file contains lines json strings. For each line, line content will be
converted to an event using streamprocessor-map-json extension and then, that
event will be received to the FooStream. Once file content is completely
read, it will keep checking whether a new entry is added to the file or
not. If such entry is added, it will be immediately picked up and
processed.

### grpc (Source)

This extension starts a grpc server during initialization time. The
server listens to requests from grpc stubs. This source has a default
mode of operation and custom user defined grpc service mode. By default
this uses EventService.
In the default mode this source will use EventService consume method. If
we want to use our custom gRPC services, we have to pack auto-generated
gRPC service classes and protobuf classes into a jar file and add it
into the project classpath (or to the `jars` folder in the
`streamprocessor-tooling` folder if we use it with `streamprocessor-tooling`).
This method will receive requests and injects them into stream through a
mapper.

Syntax
```js
    @source(type="grpc", receiver.url="<STRING>", max.inbound.message.size="<INT>", max.inbound.metadata.size="<INT>", server.shutdown.waiting.time="<LONG>", truststore.file="<STRING>", truststore.password="<STRING>", truststore.algorithm="<STRING>", tls.store.type="<STRING>", keystore.file="<STRING>", keystore.password="<STRING>", keystore.algorithm="<STRING>", enable.ssl="<BOOL>", mutual.auth.enabled="<BOOL>", threadpool.size="<INT>", threadpool.buffer.size="<INT>", @map(...)))
```
QUERY PARAMETERS

| Name                         | Description                                                                                                                                                                                                                                                                                                                 | Default Value | Possible Data Types | Optional | Dynamic |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| receiver.url                 | The url which can be used by a client to access the grpc server in this extension. This url should consist the host hostPort, port, fully qualified service name, method name in the following format. `grpc://0.0.0.0:9763/<serviceName>/<methodName>` For example: grpc://0.0.0.0:9763/org.gdn.grpc.EventService/consume |               | STRING              | No       | No      |
| max.inbound.message.size     | Sets the maximum message size in bytes allowed to be received on the server.                                                                                                                                                                                                                                                | 4194304       | INT                 | Yes      | No      |
| max.inbound.metadata.size    | Sets the maximum size of metadata in bytes allowed to be received.                                                                                                                                                                                                                                                          | 8192          | INT                 | Yes      | No      |
| server.shutdown.waiting.time | The time in seconds to wait for the server to shutdown, giving up if the timeout is reached.                                                                                                                                                                                                                                | 5             | LONG                | Yes      | No      |
| truststore.file              | the file path of truststore. If this is provided then server authentication is enabled                                                                                                                                                                                                                                      | \-            | STRING              | Yes      | No      |
| truststore.password          | the password of truststore. If this is provided then the integrity of the keystore is checked                                                                                                                                                                                                                               | \-            | STRING              | Yes      | No      |
| truststore.algorithm         | the encryption algorithm to be used for server authentication                                                                                                                                                                                                                                                               | \-            | STRING              | Yes      | No      |
| tls.store.type               | TLS store type                                                                                                                                                                                                                                                                                                              | \-            | STRING              | Yes      | No      |
| keystore.file                | the file path of keystore. If this is provided then client authentication is enabled                                                                                                                                                                                                                                        | \-            | STRING              | Yes      | No      |
| keystore.password            | the password of keystore                                                                                                                                                                                                                                                                                                    | \-            | STRING              | Yes      | No      |
| keystore.algorithm           | the encryption algorithm to be used for client authentication                                                                                                                                                                                                                                                               | \-            | STRING              | Yes      | No      |
| enable.ssl                   | to enable ssl. If set to true and keystore.file is not given then it will be set to default carbon jks by default                                                                                                                                                                                                           | FALSE         | BOOL                | Yes      | No      |
| mutual.auth.enabled          | to enable mutual authentication. If set to true and keystore.file or truststore.file is not given then it will be set to default carbon jks by default                                                                                                                                                                      | FALSE         | BOOL                | Yes      | No      |
| threadpool.size              | Sets the maximum size of threadpool dedicated to serve requests at the gRPC server                                                                                                                                                                                                                                          | 100           | INT                 | Yes      | No      |
| threadpool.buffer.size       | Sets the maximum size of threadpool buffer server                                                                                                                                                                                                                                                                           | 100           | INT                 | Yes      | No      |

System Parameters

| Name                | Description                                                   | Default Value                                            | Possible Parameters                     |
|---------------------|---------------------------------------------------------------|----------------------------------------------------------|-----------------------------------------|
| keyStoreFile        | Path of the key store file                                    | \${carbon.home}/resources/security/gdncarbon.jks        | valid path for a key store file         |
| keyStorePassword    | This is the password used with key store file                 | gdncarbon                                               | valid password for the key store file   |
| keyStoreAlgorithm   | The encryption algorithm to be used for client authentication | SunX509                                                  | \-                                      |
| trustStoreFile      | This is the trust store file with the path                    | \${carbon.home}/resources/security/client-truststore.jks | \-                                      |
| trustStorePassword  | This is the password used with trust store file               | gdncarbon                                               | valid password for the trust store file |
| trustStoreAlgorithm | the encryption algorithm to be used for server authentication | SunX509                                                  | \-                                      |

EXAMPLE 1
```js
    @source(type='grpc',
           receiver.url='grpc://localhost:8888/org.gdn.grpc.EventService/consume',
           @map(type='json'))
    define stream BarStream (message String);
```
Here the port is given as 8888. So a grpc server will be started on port
8888 and the server will expose EventService. This is the default
service packed with the source. In EventService the consume method is

EXAMPLE 2
```js
    @source(type='grpc',
           receiver.url='grpc://localhost:8888/org.gdn.grpc.EventService/consume',
           @map(type='json', @attributes(name='trp:name', age='trp:age', message='message')))
    define stream BarStream (message String, name String, age int);
```
Here we are getting headers sent with the request as transport
properties and injecting them into the stream. With each request a
header will be sent in MetaData in the following format: `Name:John`,
`Age:23`

EXAMPLE 3
```js
    @source(type='grpc',
           receiver.url='grpc://localhost:8888/org.gdn.grpc.MyService/send',
           @map(type='protobuf'))
    define stream BarStream (stringValue string, intValue int,longValue long,booleanValue bool,floatValue float,doubleValue double);
```
Here the port is given as 8888. So a grpc server will be started on port
8888 and sever will keep listening to the `send` RPC method in the
`MyService` service.

EXAMPLE 4
```js
    @source(type='grpc',
           receiver.url='grpc://localhost:8888/org.gdn.grpc.MyService/send',
           @map(type='protobuf',
    @attributes(a = 'stringValue', b = 'intValue', c = 'longValue',d = 'booleanValue', e ='floatValue', f ='doubleValue')))
    define stream BarStream (a string ,c long,b int, d bool,e float,f double);
```
Here the port is given as 8888. So a grpc server will be started on port
8888 and sever will keep listening to the `send` method in the
`MyService` service. Since we provide mapping in the stream we can use
any names for stream attributes, but we have to map those names with
correct protobuf message attributes' names. If we want to send
metadata, we should map the attributes.

EXAMPLE 5
```js
    @source(type='grpc',
           receiver.url='grpc://localhost:8888/org.gdn.grpc.StreamService/clientStream',
           @map(type='protobuf'))
    define stream BarStream (stringValue string, intValue int,longValue long,booleanValue bool,floatValue float,doubleValue double);
```
Here we receive a stream of requests to the grpc source. Whenever we
want to use streaming with grpc source, we have to define the RPC method
as client streaming method,
when we define a stream method stream processor will identify it as a stream RPC
method and ready to accept stream of request from the client.

### grpc-call-response (Source)

This grpc source receives responses received from gRPC server for
requests sent from a grpc-call sink. The source will receive responses
for sink with the same sink.id. For example if you have a gRPC sink with
sink.id 15 then we need to set the sink.id as 15 in the source to
receives responses. Sinks and sources have 1:1 mapping

Syntax
```js
    @source(type="grpc-call-response", sink.id="<INT>", @map(...)))
```
QUERY PARAMETERS

| Name    | Description                                                                                                                                                                                                                                                                                                   | Default Value | Possible Data Types | Optional | Dynamic |
|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| sink.id | a unique ID that should be set for each grpc-call source. There is a 1:1 mapping between grpc-call sinks and grpc-call-response sources. Each sink has one particular source listening to the responses to requests published from that sink. So the same sink.id should be given when writing the sink also. |               | INT                 | No       | No      |

EXAMPLE 1
```js
    @source(type='grpc-call-response', sink.id= '1')
    define stream BarStream (message String);@sink(type='grpc-call',
          publisher.url = 'grpc://194.23.98.100:8080/EventService/process',
          sink.id= '1', @map(type='json'))
    define stream FooStream (message String);
```
Here we are listening to responses for requests sent from the sink with
sink.id 1 will be received here. The results will be injected into
BarStream

### grpc-service (Source)

This extension implements a grpc server for receiving and responding to
requests. During initialization time a grpc server is started on the
user specified port exposing the required service as given in the url.
This source also has a default mode and a user defined grpc service
mode. By default this uses EventService.
In the default mode this will use the EventService process method. If we
want to use our custom gRPC services, we have to pack auto-generated
gRPC service classes and protobuf classes into a jar file and add it
into the project classpath (or to the `jars` folder in the
`streamprocessor-tooling` folder if we use it with `streamprocessor-tooling`).
This accepts grpc message class Event as defined in the EventService
proto. This uses GrpcServiceResponse sink to send reponses back in the
same Event message format.

Syntax
```js
    @source(type="grpc-service", receiver.url="<STRING>", max.inbound.message.size="<INT>", max.inbound.metadata.size="<INT>", service.timeout="<INT>", server.shutdown.waiting.time="<LONG>", truststore.file="<STRING>", truststore.password="<STRING>", truststore.algorithm="<STRING>", tls.store.type="<STRING>", keystore.file="<STRING>", keystore.password="<STRING>", keystore.algorithm="<STRING>", enable.ssl="<BOOL>", mutual.auth.enabled="<BOOL>", threadpool.size="<INT>", threadpool.buffer.size="<INT>", @map(...)))
```
QUERY PARAMETERS

| Name                         | Description                                                                                                                                                                                                                                                                                                                 | Default Value | Possible Data Types | Optional | Dynamic |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| receiver.url                 | The url which can be used by a client to access the grpc server in this extension. This url should consist the host hostPort, port, fully qualified service name, method name in the following format. `grpc://0.0.0.0:9763/<serviceName>/<methodName>` For example: grpc://0.0.0.0:9763/org.gdn.grpc.EventService/consume |               | STRING              | No       | No      |
| max.inbound.message.size     | Sets the maximum message size in bytes allowed to be received on the server.                                                                                                                                                                                                                                                | 4194304       | INT                 | Yes      | No      |
| max.inbound.metadata.size    | Sets the maximum size of metadata in bytes allowed to be received.                                                                                                                                                                                                                                                          | 8192          | INT                 | Yes      | No      |
| service.timeout              | The period of time in milliseconds to wait for stream processor to respond to a request received. After this time period of receiving a request it will be closed with an error message.                                                                                                                                              | 10000         | INT                 | Yes      | No      |
| server.shutdown.waiting.time | The time in seconds to wait for the server to shutdown, giving up if the timeout is reached.                                                                                                                                                                                                                                | 5             | LONG                | Yes      | No      |
| truststore.file              | the file path of truststore. If this is provided then server authentication is enabled                                                                                                                                                                                                                                      | \-            | STRING              | Yes      | No      |
| truststore.password          | the password of truststore. If this is provided then the integrity of the keystore is checked                                                                                                                                                                                                                               | \-            | STRING              | Yes      | No      |
| truststore.algorithm         | the encryption algorithm to be used for server authentication                                                                                                                                                                                                                                                               | \-            | STRING              | Yes      | No      |
| tls.store.type               | TLS store type                                                                                                                                                                                                                                                                                                              | \-            | STRING              | Yes      | No      |
| keystore.file                | the file path of keystore. If this is provided then client authentication is enabled                                                                                                                                                                                                                                        | \-            | STRING              | Yes      | No      |
| keystore.password            | the password of keystore                                                                                                                                                                                                                                                                                                    | \-            | STRING              | Yes      | No      |
| keystore.algorithm           | the encryption algorithm to be used for client authentication                                                                                                                                                                                                                                                               | \-            | STRING              | Yes      | No      |
| enable.ssl                   | to enable ssl. If set to true and keystore.file is not given then it will be set to default carbon jks by default                                                                                                                                                                                                           | FALSE         | BOOL                | Yes      | No      |
| mutual.auth.enabled          | to enable mutual authentication. If set to true and truststore.file or keystore.file is not given then it will be set to default carbon jks by default                                                                                                                                                                      | FALSE         | BOOL                | Yes      | No      |
| threadpool.size              | Sets the maximum size of threadpool dedicated to serve requests at the gRPC server                                                                                                                                                                                                                                          | 100           | INT                 | Yes      | No      |
| threadpool.buffer.size       | Sets the maximum size of threadpool buffer server                                                                                                                                                                                                                                                                           | 100           | INT                 | Yes      | No      |

System Parameters

| Name                | Description                                                   | Default Value                                            | Possible Parameters                     |
|---------------------|---------------------------------------------------------------|----------------------------------------------------------|-----------------------------------------|
| keyStoreFile        | This is the key store file with the path                      | \${carbon.home}/resources/security/gdncarbon.jks        | valid path for a key store file         |
| keyStorePassword    | This is the password used with key store file                 | gdncarbon                                               | valid password for the key store file   |
| keyStoreAlgorithm   | The encryption algorithm to be used for client authentication | SunX509                                                  | \-                                      |
| trustStoreFile      | This is the trust store file with the path                    | \${carbon.home}/resources/security/client-truststore.jks | \-                                      |
| trustStorePassword  | This is the password used with trust store file               | gdncarbon                                               | valid password for the trust store file |
| trustStoreAlgorithm | the encryption algorithm to be used for server authentication | SunX509                                                  | \-                                      |

EXAMPLE 1
```js
    @source(type='grpc-service',
           receiver.url='grpc://localhost:8888/org.gdn.grpc.EventService/process',
           source.id='1',
           @map(type='json', @attributes(messageId='trp:messageId', message='message')))
    define stream FooStream (messageId String, message String);
```
Here a grpc server will be started at port 8888. The process method of
EventService will be exposed for clients. source.id is set as 1. So a
grpc-service-response sink with source.id = 1 will send responses back
for requests received to this source. Note that it is required to
specify the transport property messageId since we need to correlate the
request message with the response.

EXAMPLE 2
```js
    @sink(type='grpc-service-response',
          source.id='1',
          @map(type='json'))
    define stream BarStream (messageId String, message String);

    @source(type='grpc-service',
           receiver.url='grpc://134.23.43.35:8080/org.gdn.grpc.EventService/process',
           source.id='1',
           @map(type='json', @attributes(messageId='trp:messageId', message='message')))
    define stream FooStream (messageId String, message String);

    from FooStream
    select *
    insert into BarStream;
```
The grpc requests are received through the grpc-service sink. Each
received event is sent back through grpc-service-source. This is just a
passthrough through Stream App as we are selecting everything from FooStream
and inserting into BarStream.

EXAMPLE 3
```js
    @source(type='grpc-service', source.id='1'
           receiver.url='grpc://locanhost:8888/org.gdn.grpc.EventService/consume',
           @map(type='json', @attributes(name='trp:name', age='trp:age', message='message'))) define stream BarStream (message String, name String, age int);
```
Here we are getting headers sent with the request as transport
properties and injecting them into the stream. With each request a
header will be sent in MetaData in the following format: `Name:John`,
`Age:23`

EXAMPLE 4
```js
    @sink(type='grpc-service-response',
          source.id='1',
          message.id='{{messageId}}',
          @map(type='protobuf',
    @payload(stringValue='a',intValue='b',longValue='c',booleanValue='d',floatValue = 'e', doubleValue ='f')))
    define stream BarStream (a string,messageId string, b int,c long,d bool,e float,f double);

    @source(type='grpc-service',
           receiver.url='grpc://134.23.43.35:8888/org.gdn.grpc.test.MyService/process',
           source.id='1',
           @map(type='protobuf', @attributes(messageId='trp:message.id', a = 'stringValue', b = 'intValue', c = 'longValue',d = 'booleanValue', e = 'floatValue', f ='doubleValue')))
    define stream FooStream (a string,messageId string, b int,c long,d bool,e float,f double);

    from FooStream
    select *
    insert into BarStream;
```
Here a grpc server will be started at port 8888. The process method of
the MyService will be exposed to the clients. `source.id` is set as 1.
So a grpc-service-response sink with source.id = 1 will send responses
back for requests received to this source. Note that it is required to
specify the transport property messageId since we need to correlate the
request message with the response and also we should map stream
attributes with correct protobuf message attributes even they define
using the same name as protobuf message attributes.

### http (Source)

HTTP source receives POST requests via HTTP and HTTPS protocols in
format such as `text`, `XML` and `JSON`. It also supports basic
authentication to ensure events are received from authorized
users/systems. The request headers and properties can be accessed via
transport properties in the format `trp:<header>`.

Syntax
```js
    @source(type="http", receiver.url="<STRING>", basic.auth.enabled="<STRING>", worker.count="<INT>", socket.idle.timeout="<INT>", ssl.verify.client="<STRING>", ssl.protocol="<STRING>", tls.store.type="<STRING>", ssl.configurations="<STRING>", request.size.validation.configurations="<STRING>", header.validation.configurations="<STRING>", server.bootstrap.configurations="<STRING>", trace.log.enabled="<BOOL>", @map(...)))
```
QUERY PARAMETERS

| Name                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Default Value             | Possible Data Types | Optional | Dynamic |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|---------------------|----------|---------|
| receiver.url                           | The URL on which events should be received. To enable SSL use `https` protocol in the url.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | \`http://0.0.0.0:9763//\` | STRING              | Yes      | No      |
| basic.auth.enabled                     | This only works in VM, Docker and Kubernetes. Where when enabled it authenticates each request using the `Authorization:'Basic encodeBase64(username:Password)'` header.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | false                     | STRING              | Yes      | No      |
| worker.count                           | The number of active worker threads to serve the incoming events. By default the value is set to `1` to ensure events are processed in the same order they arrived. By increasing this value, higher performance can be achieved in the expense of loosing event ordering.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 1                         | INT                 | Yes      | No      |
| socket.idle.timeout                    | Idle timeout for HTTP connection in millis.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 120000                    | INT                 | Yes      | No      |
| ssl.verify.client                      | The type of client certificate verification. Supported values are `require`, `optional`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | \-                        | STRING              | Yes      | No      |
| ssl.protocol                           | SSL/TLS protocol.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | TLS                       | STRING              | Yes      | No      |
| tls.store.type                         | TLS store type.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | JKS                       | STRING              | Yes      | No      |
| ssl.configurations                     | SSL/TSL configurations in format `"'<key>:<value>','<key>:<value>'"`. Some supported parameters: Â - SSL/TLS protocols: `'sslEnabledProtocols:TLSv1.1,TLSv1.2'` Â - List of ciphers: `'ciphers:TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256'` Â - Enable session creation: `'client.enable.session.creation:true'` Â - Supported server names: `'server.suported.server.names:server'` Â - Add HTTP SNIMatcher: `'server.supported.snimatchers:SNIMatcher'`                                                                                                                                                                                                                                                                                                                                                                                                    | \-                        | STRING              | Yes      | No      |
| request.size.validation.configurations | Configurations to validate the HTTP request size. Expected format `"'<key>:<value>','<key>:<value>'"`. Some supported configurations : Â - Enable request size validation: `'request.size.validation:true'` Â If request size is validated Â - Maximum request size: `'request.size.validation.maximum.value:2048'` Â - Response status code when request size validation fails: `'request.size.validation.reject.status.code:401'` Â - Response message when request size validation fails: `'request.size.validation.reject.message:Message is bigger than the valid size'` Â - Response Content-Type when request size validation fails: `'request.size.validation.reject.message.content.type:plain/text'`                                                                                                                                           | \-                        | STRING              | Yes      | No      |
| header.validation.configurations       | Configurations to validate HTTP headers. Expected format `"'<key>:<value>','<key>:<value>'"`. Some supported configurations : Â - Enable header size validation: `'header.size.validation:true'` Â If header size is validated Â - Maximum length of initial line: `'header.validation.maximum.request.line:4096'` Â - Maximum length of all headers: `'header.validation.maximum.size:8192'` Â - Maximum length of the content or each chunk: `'header.validation.maximum.chunk.size:8192'` Â - Response status code when header validation fails: `'header.validation.reject.status.code:401'` Â - Response message when header validation fails: `'header.validation.reject.message:Message header is bigger than the valid size'` Â - Response Content-Type when header validation fails: `'header.validation.reject.message.content.type:plain/text'` | \-                        | STRING              | Yes      | No      |
| server.bootstrap.configurations        | Server bootstrap configurations in format `"'<key>:<value>','<key>:<value>'"`. Some supported configurations : Â - Server connect timeout in millis: `'server.bootstrap.connect.timeout:15000'` Â - Server socket timeout in seconds: `'server.bootstrap.socket.timeout:15'` Â - Enable TCP no delay: `'server.bootstrap.nodelay:true'` Â - Enable server keep alive: `'server.bootstrap.keepalive:true'` Â - Send buffer size: `'server.bootstrap.sendbuffersize:1048576'` Â - Receive buffer size: `'server.bootstrap.recievebuffersize:1048576'` Â - Number of connections queued: `'server.bootstrap.socket.backlog:100'`                                                                                                                                                                                                                             | \-                        | STRING              | Yes      | No      |
| trace.log.enabled                      | Enable trace log for traffic monitoring.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | false                     | BOOL                | Yes      | No      |

System Parameters

| Name                           | Description                                                                                                                             | Default Value                                         | Possible Parameters         |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|-----------------------------|
| serverBootstrapBossGroupSize   | Number of boss threads to accept incoming connections.                                                                                  | Number of available processors                        | Any positive integer        |
| serverBootstrapWorkerGroupSize | Number of worker threads to accept the connections from boss threads and perform non-blocking read and write from one or more channels. | (Number of available processors) \* 2                 | Any positive integer        |
| serverBootstrapClientGroupSize | Number of client threads to perform non-blocking read and write to one or more channels.                                                | (Number of available processors) \* 2                 | Any positive integer        |
| defaultHost                    | The default host of the transport.                                                                                                      | 0.0.0.0                                               | Any valid host              |
| defaultScheme                  | The default protocol.                                                                                                                   | http                                                  | http https                  |
| defaultHttpPort                | The default HTTP port when default scheme is `http`.                                                                                    | 8280                                                  | Any valid port              |
| defaultHttpsPort               | The default HTTPS port when default scheme is `https`.                                                                                  | 8243                                                  | Any valid port              |
| keyStoreLocation               | The default keystore file path.                                                                                                         | \`\${carbon.home}/resources/security/gdncarbon.jks\` | Path to \`.jks\` file       |
| keyStorePassword               | The default keystore password.                                                                                                          | gdncarbon                                            | Keystore password as string |

EXAMPLE 1
```js
    @app.name('StockProcessor')

    @source(type='http', @map(type = 'json'))
    define stream StockStream (symbol string, price float, volume long);
```
Above HTTP source listeners on url
`http://0.0.0.0:9763/StockProcessor/StockStream` for JSON messages on
the format:
```js
    {
      "event": {
        "symbol": "FB",
        "price": 24.5,
        "volume": 5000
      }
    }
```
It maps the incoming messages and sends them to `StockStream` for
processing.

EXAMPLE 2
```js
    @source(type='http', receiver.url='http://localhost:5005/stocks',
            @map(type = 'xml'))
    define stream StockStream (symbol string, price float, volume long);
```
Above HTTP source listeners on url `http://localhost:5005/stocks` for
JSON messages on the format:
```js
    <events>
        <event>
            <symbol>Fb</symbol>
            <price>55.6</price>
            <volume>100</volume>
        </event>
    </events>
```
It maps the incoming messages and sends them to `StockStream` for
processing.

### http-call-response (Source)

The http-call-response source receives the responses for the calls made
by its corresponding http-call sink, and maps them from formats such as
`text`, `XML` and `JSON`. To handle messages with different http status
codes having different formats, multiple http-call-response sources are
allowed to associate with a single http-call sink. It allows accessing
the attributes of the event that initiated the call, and the response
headers and properties via transport properties in the format
`trp:<attribute name>` and `trp:<header/property>` respectively.

Syntax
```js
    @source(type="http-call-response", sink.id="<STRING>", http.status.code="<STRING>", allow.streaming.responses="<BOOL>", @map(...)))
```
QUERY PARAMETERS

| Name                      | Description                                                                                                                                                                               | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| sink.id                   | Identifier to correlate the http-call-response source with its corresponding http-call sink that published the messages.                                                                  |               | STRING              | No       | No      |
| http.status.code          | The matching http responses status code regex, that is used to filter the the messages which will be processed by the source.Eg: `http.status.code = '200'`, `http.status.code = '4\\d+'` | 200           | STRING              | Yes      | No      |
| allow.streaming.responses | Enable consuming responses on a streaming manner.                                                                                                                                         | false         | BOOL                | Yes      | No      |

EXAMPLE 1
```js
    @sink(type='http-call', method='POST',
          publisher.url='http://localhost:8005/registry/employee',
          sink.id='employee-info', @map(type='json'))
    define stream EmployeeRequestStream (name string, id int);

    @source(type='http-call-response', sink.id='employee-info',
            http.status.code='2\\d+',
            @map(type='json',
                 @attributes(name='trp:name', id='trp:id',
                             location='$.town', age='$.age')))
    define stream EmployeeResponseStream(name string, id int,
                                         location string, age int);

    @source(type='http-call-response', sink.id='employee-info',
            http.status.code='4\\d+',
            @map(type='text', regex.A='((.|\n)*)',
                 @attributes(error='A[1]')))
    define stream EmployeeErrorStream(error string);
```
When events arrive in `EmployeeRequestStream`, http-call sink makes
calls to endpoint on url `http://localhost:8005/registry/employee` with
`POST` method and Content-Type `application/json`. If the arriving event
has attributes `name`:`John` and `id`:`1423` it will send a message with
default JSON mapping as follows:
```js
    {
      "event": {
        "name": "John",
        "id": 1423
      }
    }
```
When the endpoint responds with status code in the range of 200 the
message will be received by the http-call-response source associated
with the `EmployeeResponseStream` stream, because it is correlated with
the sink by the same `sink.id` `employee-info` and as that expects
messages with `http.status.code` in regex format `2\\d+`. If the
response message is in the format
```json
    {
      "town": "NY",
      "age": 24
    }
```
the source maps the `location` and `age` attributes by executing JSON
path on the message and maps the `name` and `id` attributes by
extracting them from the request event via as transport properties. If
the response status code is in the range of 400 then the message will be
received by the http-call-response source associated with the
`EmployeeErrorStream` stream, because it is correlated with the sink by
the same `sink.id` `employee-info` and it expects messages with
`http.status.code` in regex format `4\\d+`, and maps the error response
to the `error` attribute of the event.

### ~~http-request (Source)~~

*Deprecated*

\_(Use http-service source instead).\_ The http-request source receives
POST requests via HTTP and HTTPS protocols in format such as `text`,
`XML` and `JSON` and sends responses via its corresponding http-response
sink correlated through a unique `source.id`. For request and response
correlation, it generates a `messageId` upon each incoming request and
expose it via transport properties in the format `trp:messageId` to
correlate them with the responses at the http-response sink. The request
headers and properties can be accessed via transport properties in the
format `trp:<header>`. It also supports basic authentication to ensure
events are received from authorized users/systems.

Syntax
```js
    @source(type="http-request", receiver.url="<STRING>", source.id="<STRING>", connection.timeout="<INT>", basic.auth.enabled="<STRING>", worker.count="<INT>", socket.idle.timeout="<INT>", ssl.verify.client="<STRING>", ssl.protocol="<STRING>", tls.store.type="<STRING>", ssl.configurations="<STRING>", request.size.validation.configurations="<STRING>", header.validation.configurations="<STRING>", server.bootstrap.configurations="<STRING>", trace.log.enabled="<BOOL>", @map(...)))
```
QUERY PARAMETERS

| Name                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Default Value             | Possible Data Types | Optional | Dynamic |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|---------------------|----------|---------|
| receiver.url                           | The URL on which events should be received. To enable SSL use `https` protocol in the url.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | \`http://0.0.0.0:9763//\` | STRING              | Yes      | No      |
| source.id                              | Identifier to correlate the http-request source to its corresponding http-response sinks to send responses.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |                           | STRING              | No       | No      |
| connection.timeout                     | Connection timeout in millis. The system will send a timeout, if a corresponding response is not sent by an associated http-response sink within the given time.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 120000                    | INT                 | Yes      | No      |
| basic.auth.enabled                     | This only works in VM, Docker and Kubernetes. Where when enabled it authenticates each request using the `Authorization:'Basic encodeBase64(username:Password)'` header.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | false                     | STRING              | Yes      | No      |
| worker.count                           | The number of active worker threads to serve the incoming events. By default the value is set to `1` to ensure events are processed in the same order they arrived. By increasing this value, higher performance can be achieved in the expense of loosing event ordering.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 1                         | INT                 | Yes      | No      |
| socket.idle.timeout                    | Idle timeout for HTTP connection in millis.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 120000                    | INT                 | Yes      | No      |
| ssl.verify.client                      | The type of client certificate verification. Supported values are `require`, `optional`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | \-                        | STRING              | Yes      | No      |
| ssl.protocol                           | SSL/TLS protocol.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | TLS                       | STRING              | Yes      | No      |
| tls.store.type                         | TLS store type.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | JKS                       | STRING              | Yes      | No      |
| ssl.configurations                     | SSL/TSL configurations in format `"'<key>:<value>','<key>:<value>'"`. Some supported parameters: Â - SSL/TLS protocols: `'sslEnabledProtocols:TLSv1.1,TLSv1.2'` Â - List of ciphers: `'ciphers:TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256'` Â - Enable session creation: `'client.enable.session.creation:true'` Â - Supported server names: `'server.suported.server.names:server'` Â - Add HTTP SNIMatcher: `'server.supported.snimatchers:SNIMatcher'`                                                                                                                                                                                                                                                                                                                                                                                                    | \-                        | STRING              | Yes      | No      |
| request.size.validation.configurations | Configurations to validate the HTTP request size. Expected format `"'<key>:<value>','<key>:<value>'"`. Some supported configurations : Â - Enable request size validation: `'request.size.validation:true'` Â If request size is validated Â - Maximum request size: `'request.size.validation.maximum.value:2048'` Â - Response status code when request size validation fails: `'request.size.validation.reject.status.code:401'` Â - Response message when request size validation fails: `'request.size.validation.reject.message:Message is bigger than the valid size'` Â - Response Content-Type when request size validation fails: `'request.size.validation.reject.message.content.type:plain/text'`                                                                                                                                           | \-                        | STRING              | Yes      | No      |
| header.validation.configurations       | Configurations to validate HTTP headers. Expected format `"'<key>:<value>','<key>:<value>'"`. Some supported configurations : Â - Enable header size validation: `'header.size.validation:true'` Â If header size is validated Â - Maximum length of initial line: `'header.validation.maximum.request.line:4096'` Â - Maximum length of all headers: `'header.validation.maximum.size:8192'` Â - Maximum length of the content or each chunk: `'header.validation.maximum.chunk.size:8192'` Â - Response status code when header validation fails: `'header.validation.reject.status.code:401'` Â - Response message when header validation fails: `'header.validation.reject.message:Message header is bigger than the valid size'` Â - Response Content-Type when header validation fails: `'header.validation.reject.message.content.type:plain/text'` | \-                        | STRING              | Yes      | No      |
| server.bootstrap.configurations        | Server bootstrap configurations in format `"'<key>:<value>','<key>:<value>'"`. Some supported configurations : Â - Server connect timeout in millis: `'server.bootstrap.connect.timeout:15000'` Â - Server socket timeout in seconds: `'server.bootstrap.socket.timeout:15'` Â - Enable TCP no delay: `'server.bootstrap.nodelay:true'` Â - Enable server keep alive: `'server.bootstrap.keepalive:true'` Â - Send buffer size: `'server.bootstrap.sendbuffersize:1048576'` Â - Receive buffer size: `'server.bootstrap.recievebuffersize:1048576'` Â - Number of connections queued: `'server.bootstrap.socket.backlog:100'`                                                                                                                                                                                                                             | \-                        | STRING              | Yes      | No      |
| trace.log.enabled                      | Enable trace log for traffic monitoring.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | false                     | BOOL                | Yes      | No      |

System Parameters

| Name                           | Description                                                                                                                             | Default Value                                         | Possible Parameters         |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|-----------------------------|
| serverBootstrapBossGroupSize   | Number of boss threads to accept incoming connections.                                                                                  | Number of available processors                        | Any positive integer        |
| serverBootstrapWorkerGroupSize | Number of worker threads to accept the connections from boss threads and perform non-blocking read and write from one or more channels. | (Number of available processors) \* 2                 | Any positive integer        |
| serverBootstrapClientGroupSize | Number of client threads to perform non-blocking read and write to one or more channels.                                                | (Number of available processors) \* 2                 | Any positive integer        |
| defaultHost                    | The default host of the transport.                                                                                                      | 0.0.0.0                                               | Any valid host              |
| defaultScheme                  | The default protocol.                                                                                                                   | http                                                  | http https                  |
| defaultHttpPort                | The default HTTP port when default scheme is `http`.                                                                                    | 8280                                                  | Any valid port              |
| defaultHttpsPort               | The default HTTPS port when default scheme is `https`.                                                                                  | 8243                                                  | Any valid port              |
| keyStoreLocation               | The default keystore file path.                                                                                                         | \`\${carbon.home}/resources/security/gdncarbon.jks\` | Path to \`.jks\` file       |
| keyStorePassword               | The default keystore password.                                                                                                          | gdncarbon                                            | Keystore password as string |

EXAMPLE 1
```js
    @source(type='http-request', receiver.url='http://localhost:5005/add',
            source.id='adder',
            @map(type='json, @attributes(messageId='trp:messageId',
                                         value1='$.event.value1',
                                         value2='$.event.value2')))
    define stream AddStream (messageId string, value1 long, value2 long);

    @sink(type='http-response', source.id='adder',
          message.id='{{messageId}}', @map(type = 'json'))
    define stream ResultStream (messageId string, results long);

    @info(name = 'query1')
    from AddStream
    select messageId, value1 + value2 as results
    insert into ResultStream;
```
Above sample listens events on `http://localhost:5005/stocks` url for
JSON messages on the format:
```js
    {
      "event": {
        "value1": 3,
        "value2": 4
      }
    }
```
Map the vents into AddStream, process the events through query `query1`,
and sends the results produced on ResultStream via http-response sink on
the message format:
```js
    {
      "event": {
        "results": 7
      }
    }
```
### ~~http-response (Source)~~

*Deprecated*

\_(Use http-call-response source instead).\_ The http-response source
receives the responses for the calls made by its corresponding
http-request sink, and maps them from formats such as `text`, `XML` and
`JSON`. To handle messages with different http status codes having
different formats, multiple http-response sources are allowed to
associate with a single http-request sink. It allows accessing the
attributes of the event that initiated the call, and the response
headers and properties via transport properties in the format
`trp:<attribute name>` and `trp:<header/property>` respectively.

Syntax
```js
    @source(type="http-response", sink.id="<STRING>", http.status.code="<STRING>", allow.streaming.responses="<BOOL>", @map(...)))
```
QUERY PARAMETERS

| Name                      | Description                                                                                                                                                                               | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| sink.id                   | Identifier to correlate the http-response source with its corresponding http-request sink that published the messages.                                                                    |               | STRING              | No       | No      |
| http.status.code          | The matching http responses status code regex, that is used to filter the the messages which will be processed by the source.Eg: `http.status.code = '200'`, `http.status.code = '4\\d+'` | 200           | STRING              | Yes      | No      |
| allow.streaming.responses | Enable consuming responses on a streaming manner.                                                                                                                                         | false         | BOOL                | Yes      | No      |

EXAMPLE 1
```js
    @sink(type='http-request', method='POST',
          publisher.url='http://localhost:8005/registry/employee',
          sink.id='employee-info', @map(type='json'))
    define stream EmployeeRequestStream (name string, id int);

    @source(type='http-response', sink.id='employee-info',
            http.status.code='2\\d+',
            @map(type='json',
                 @attributes(name='trp:name', id='trp:id',
                             location='$.town', age='$.age')))
    define stream EmployeeResponseStream(name string, id int,
                                         location string, age int);

    @source(type='http-response', sink.id='employee-info',
            http.status.code='4\\d+',
            @map(type='text', regex.A='((.|\n)*)',
                 @attributes(error='A[1]')))
    define stream EmployeeErrorStream(error string);
```
When events arrive in `EmployeeRequestStream`, http-request sink makes
calls to endpoint on url `http://localhost:8005/registry/employee` with
`POST` method and Content-Type `application/json`. If the arriving event
has attributes `name`:`John` and `id`:`1423` it will send a message with
default JSON mapping as follows:
```js
    {
      "event": {
        "name": "John",
        "id": 1423
      }
    }
```
When the endpoint responds with status code in the range of 200 the
message will be received by the http-response source associated with the
`EmployeeResponseStream` stream, because it is correlated with the sink
by the same `sink.id` `employee-info` and as that expects messages with
`http.status.code` in regex format `2\\d+`. If the response message is
in the format
```json
    {
      "town": "NY",
      "age": 24
    }
```
the source maps the `location` and `age` attributes by executing JSON
path on the message and maps the `name` and `id` attributes by
extracting them from the request event via as transport properties. If
the response status code is in the range of 400 then the message will be
received by the http-response source associated with the
`EmployeeErrorStream` stream, because it is correlated with the sink by
the same `sink.id` `employee-info` and it expects messages with
`http.status.code` in regex format `4\\d+`, and maps the error response
to the `error` attribute of the event.

### http-service (Source)

The http-service source receives POST requests via HTTP and HTTPS
protocols in format such as `text`, `XML` and `JSON` and sends responses
via its corresponding http-service-response sink correlated through a
unique `source.id`. For request and response correlation, it generates a
`messageId` upon each incoming request and expose it via transport
properties in the format `trp:messageId` to correlate them with the
responses at the http-service-response sink. The request headers and
properties can be accessed via transport properties in the format
`trp:<header>`. It also supports basic authentication to ensure events
are received from authorized users/systems.

Syntax

    @source(type="http-service", receiver.url="<STRING>", source.id="<STRING>", connection.timeout="<INT>", basic.auth.enabled="<STRING>", worker.count="<INT>", socket.idle.timeout="<INT>", ssl.verify.client="<STRING>", ssl.protocol="<STRING>", tls.store.type="<STRING>", ssl.configurations="<STRING>", request.size.validation.configurations="<STRING>", header.validation.configurations="<STRING>", server.bootstrap.configurations="<STRING>", trace.log.enabled="<BOOL>", @map(...)))

QUERY PARAMETERS

| Name                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Default Value             | Possible Data Types | Optional | Dynamic |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|---------------------|----------|---------|
| receiver.url                           | The URL on which events should be received. To enable SSL use `https` protocol in the url.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | \`http://0.0.0.0:9763//\` | STRING              | Yes      | No      |
| source.id                              | Identifier to correlate the http-service source to its corresponding http-service-response sinks to send responses.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                           | STRING              | No       | No      |
| connection.timeout                     | Connection timeout in millis. The system will send a timeout, if a corresponding response is not sent by an associated http-service-response sink within the given time.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 120000                    | INT                 | Yes      | No      |
| basic.auth.enabled                     | This only works in VM, Docker and Kubernetes. Where when enabled it authenticates each request using the `Authorization:'Basic encodeBase64(username:Password)'` header.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | false                     | STRING              | Yes      | No      |
| worker.count                           | The number of active worker threads to serve the incoming events. By default the value is set to `1` to ensure events are processed in the same order they arrived. By increasing this value, higher performance can be achieved in the expense of loosing event ordering.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 1                         | INT                 | Yes      | No      |
| socket.idle.timeout                    | Idle timeout for HTTP connection in millis.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 120000                    | INT                 | Yes      | No      |
| ssl.verify.client                      | The type of client certificate verification. Supported values are `require`, `optional`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | \-                        | STRING              | Yes      | No      |
| ssl.protocol                           | SSL/TLS protocol.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | TLS                       | STRING              | Yes      | No      |
| tls.store.type                         | TLS store type.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | JKS                       | STRING              | Yes      | No      |
| ssl.configurations                     | SSL/TSL configurations in format `"'<key>:<value>','<key>:<value>'"`. Some supported parameters: Â - SSL/TLS protocols: `'sslEnabledProtocols:TLSv1.1,TLSv1.2'` Â - List of ciphers: `'ciphers:TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256'` Â - Enable session creation: `'client.enable.session.creation:true'` Â - Supported server names: `'server.suported.server.names:server'` Â - Add HTTP SNIMatcher: `'server.supported.snimatchers:SNIMatcher'`                                                                                                                                                                                                                                                                                                                                                                                                    | \-                        | STRING              | Yes      | No      |
| request.size.validation.configurations | Configurations to validate the HTTP request size. Expected format `"'<key>:<value>','<key>:<value>'"`. Some supported configurations : Â - Enable request size validation: `'request.size.validation:true'` Â If request size is validated Â - Maximum request size: `'request.size.validation.maximum.value:2048'` Â - Response status code when request size validation fails: `'request.size.validation.reject.status.code:401'` Â - Response message when request size validation fails: `'request.size.validation.reject.message:Message is bigger than the valid size'` Â - Response Content-Type when request size validation fails: `'request.size.validation.reject.message.content.type:plain/text'`                                                                                                                                           | \-                        | STRING              | Yes      | No      |
| header.validation.configurations       | Configurations to validate HTTP headers. Expected format `"'<key>:<value>','<key>:<value>'"`. Some supported configurations : Â - Enable header size validation: `'header.size.validation:true'` Â If header size is validated Â - Maximum length of initial line: `'header.validation.maximum.request.line:4096'` Â - Maximum length of all headers: `'header.validation.maximum.size:8192'` Â - Maximum length of the content or each chunk: `'header.validation.maximum.chunk.size:8192'` Â - Response status code when header validation fails: `'header.validation.reject.status.code:401'` Â - Response message when header validation fails: `'header.validation.reject.message:Message header is bigger than the valid size'` Â - Response Content-Type when header validation fails: `'header.validation.reject.message.content.type:plain/text'` | \-                        | STRING              | Yes      | No      |
| server.bootstrap.configurations        | Server bootstrap configurations in format `"'<key>:<value>','<key>:<value>'"`. Some supported configurations : Â - Server connect timeout in millis: `'server.bootstrap.connect.timeout:15000'` Â - Server socket timeout in seconds: `'server.bootstrap.socket.timeout:15'` Â - Enable TCP no delay: `'server.bootstrap.nodelay:true'` Â - Enable server keep alive: `'server.bootstrap.keepalive:true'` Â - Send buffer size: `'server.bootstrap.sendbuffersize:1048576'` Â - Receive buffer size: `'server.bootstrap.recievebuffersize:1048576'` Â - Number of connections queued: `'server.bootstrap.socket.backlog:100'`                                                                                                                                                                                                                             | \-                        | STRING              | Yes      | No      |
| trace.log.enabled                      | Enable trace log for traffic monitoring.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | false                     | BOOL                | Yes      | No      |

System Parameters

| Name                           | Description                                                                                                                             | Default Value                                         | Possible Parameters         |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|-----------------------------|
| serverBootstrapBossGroupSize   | Number of boss threads to accept incoming connections.                                                                                  | Number of available processors                        | Any positive integer        |
| serverBootstrapWorkerGroupSize | Number of worker threads to accept the connections from boss threads and perform non-blocking read and write from one or more channels. | (Number of available processors) \* 2                 | Any positive integer        |
| serverBootstrapClientGroupSize | Number of client threads to perform non-blocking read and write to one or more channels.                                                | (Number of available processors) \* 2                 | Any positive integer        |
| defaultHost                    | The default host of the transport.                                                                                                      | 0.0.0.0                                               | Any valid host              |
| defaultScheme                  | The default protocol.                                                                                                                   | http                                                  | http https                  |
| defaultHttpPort                | The default HTTP port when default scheme is `http`.                                                                                    | 8280                                                  | Any valid port              |
| defaultHttpsPort               | The default HTTPS port when default scheme is `https`.                                                                                  | 8243                                                  | Any valid port              |
| keyStoreLocation               | The default keystore file path.                                                                                                         | \`\${carbon.home}/resources/security/gdncarbon.jks\` | Path to \`.jks\` file       |
| keyStorePassword               | The default keystore password.                                                                                                          | gdncarbon                                            | Keystore password as string |

EXAMPLE 1
```js
    @source(type='http-service', receiver.url='http://localhost:5005/add',
            source.id='adder',
            @map(type='json, @attributes(messageId='trp:messageId',
                                         value1='$.event.value1',
                                         value2='$.event.value2')))
    define stream AddStream (messageId string, value1 long, value2 long);

    @sink(type='http-service-response', source.id='adder',
          message.id='{{messageId}}', @map(type = 'json'))
    define stream ResultStream (messageId string, results long);

    @info(name = 'query1')
    from AddStream
    select messageId, value1 + value2 as results
    insert into ResultStream;
```
Above sample listens events on `http://localhost:5005/stocks` url for
JSON messages on the format:
```js
    {
      "event": {
        "value1": 3,
        "value2": 4
      }
    }
```
Map the vents into AddStream, process the events through query `query1`,
and sends the results produced on ResultStream via http-service-response
sink on the message format:
```js
    {
      "event": {
        "results": 7
      }
    }
```
### inMemory (Source)

In-memory source subscribes to a topic to consume events which are
published on the same topic by In-memory sinks. This provides a way to
connect multiple Stream App Apps deployed under the same Stream App Manager
(JVM). Here both the publisher and subscriber should have the same event
schema (stream definition) for successful data transfer.

Syntax
```js
    @source(type="inMemory", topic="<STRING>", @map(...)))
```
QUERY PARAMETERS

| Name  | Description                                       | Default Value | Possible Data Types | Optional | Dynamic |
|-------|---------------------------------------------------|---------------|---------------------|----------|---------|
| topic | Subscribes to the events sent on the given topic. |               | STRING              | No       | No      |

EXAMPLE 1
```js
    @source(type='inMemory', topic='Stocks', @map(type='passThrough'))
    define stream StocksStream (symbol string, price float, volume long);
```
Here the `StocksStream` uses inMemory source to consume events published
on the topic `Stocks` by the inMemory sinks deployed in the same JVM.

### jms (Source)

JMS Source allows users to subscribe to a JMS broker and receive JMS
messages. It has the ability to receive Map messages and Text messages.

Syntax
```js
    @source(type="jms", destination="<STRING>", connection.factory.jndi.name="<STRING>", factory.initial="<STRING>", provider.url="<STRING>", connection.factory.type="<STRING>", worker.count="<INT>", connection.username="<STRING>", connection.password="<STRING>", retry.interval="<INT>", retry.count="<INT>", use.receiver="<BOOL>", subscription.durable="<BOOL>", connection.factory.nature="<STRING>", @map(...)))
```
QUERY PARAMETERS

| Name                         | Description                                                                                                                                                                                       | Default Value          | Possible Data Types | Optional | Dynamic |
|------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------|---------------------|----------|---------|
| destination                  | Queue/Topic name which JMS Source should subscribe to                                                                                                                                             |                        | STRING              | No       | No      |
| connection.factory.jndi.name | JMS Connection Factory JNDI name. This value will be used for the JNDI lookup to find the JMS Connection Factory.                                                                                 | QueueConnectionFactory | STRING              | Yes      | No      |
| factory.initial              | Naming factory initial value                                                                                                                                                                      |                        | STRING              | No       | No      |
| provider.url                 | Java naming provider URL. Property for specifying configuration information for the service provider to use. The value of the property should contain a URL string (e.g. "ldap://somehost:389") |                        | STRING              | No       | No      |
| connection.factory.type      | Type of the connection connection factory. This can be either queue or topic.                                                                                                                     | queue                  | STRING              | Yes      | No      |
| worker.count                 | Number of worker threads listening on the given queue/topic.                                                                                                                                      | 1                      | INT                 | Yes      | No      |
| connection.username          | username for the broker.                                                                                                                                                                          | None                   | STRING              | Yes      | No      |
| connection.password          | Password for the broker                                                                                                                                                                           | None                   | STRING              | Yes      | No      |
| retry.interval               | Interval between each retry attempt in case of connection failure in milliseconds.                                                                                                                | 10000                  | INT                 | Yes      | No      |
| retry.count                  | Number of maximum reties that will be attempted in case of connection failure with broker.                                                                                                        | 5                      | INT                 | Yes      | No      |
| use.receiver                 | Implementation to be used when consuming JMS messages. By default transport will use MessageListener and tweaking this property will make make use of MessageReceiver                             | false                  | BOOL                | Yes      | No      |
| subscription.durable         | Property to enable durable subscription.                                                                                                                                                          | false                  | BOOL                | Yes      | No      |
| connection.factory.nature    | Connection factory nature for the broker.                                                                                                                                                         | default                | STRING              | Yes      | No      |

EXAMPLE 1
```js
    @source(type='jms', @map(type='json'), factory.initial='org.apache.activemq.jndi.ActiveMQInitialContextFactory', provider.url='tcp://localhost:61616',destination='DAS_JMS_TEST', connection.factory.type='topic',connection.factory.jndi.name='TopicConnectionFactory')
    define stream inputStream (name string, age int, country string);
```
This example shows how to connect to an ActiveMQ topic and receive
messages.

EXAMPLE 2
```js
    @source(type='jms', @map(type='json'), factory.initial='org.apache.activemq.jndi.ActiveMQInitialContextFactory', provider.url='tcp://localhost:61616',destination='DAS_JMS_TEST' )
    define stream inputStream (name string, age int, country string);
```
This example shows how to connect to an ActiveMQ queue and receive
messages. Note that we are not providing properties like connection
factory type

### kafka (Source)

A Kafka source receives events to be processed by gdn SP from a topic
with a partition for a Kafka cluster. The events received can be in the
`TEXT` `XML` `JSON` or `Binary` format. If the topic is not already
created in the Kafka cluster, the Kafka sink creates the default
partition for the given topic.

Syntax
```js
    @source(type="kafka", bootstrap.servers="<STRING>", topic.list="<STRING>", group.id="<STRING>", threading.option="<STRING>", partition.no.list="<STRING>", seq.enabled="<BOOL>", is.binary.message="<BOOL>", topic.offsets.map="<STRING>", enable.offsets.commit="<BOOL>", optional.configuration="<STRING>", @map(...)))
```
QUERY PARAMETERS

| Name                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Default Value | Possible Data Types | Optional | Dynamic |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| bootstrap.servers      | This specifies the list of Kafka servers to which the Kafka source must listen. This list can be provided as a set of comma-separated values. e.g., `localhost:9092,localhost:9093`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |               | STRING              | No       | No      |
| topic.list             | This specifies the list of topics to which the source must listen. This list can be provided as a set of comma-separated values. e.g., `topic_one,topic_two`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |               | STRING              | No       | No      |
| group.id               | This is an ID to identify the Kafka source group. The group ID ensures that sources with the same topic and partition that are in the same group do not receive the same event.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |               | STRING              | No       | No      |
| threading.option       | This specifies whether the Kafka source is to be run on a single thread, or in multiple threads based on a condition. Possible values are as follows: `single.thread`: To run the Kafka source on a single thread. `topic.wise`: To use a separate thread per topic. `partition.wise`: To use a separate thread per partition.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |               | STRING              | No       | No      |
| partition.no.list      | The partition number list for the given topic. This is provided as a list of comma-separated values. e.g., `0,1,2,`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 0             | STRING              | Yes      | No      |
| seq.enabled            | If this parameter is set to `true`, the sequence of the events received via the source is taken into account. Therefore, each event should contain a sequence number as an attribute value to indicate the sequence.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | false         | BOOL                | Yes      | No      |
| is.binary.message      | In order to receive binary events via the Kafka source,it is required to setthis parameter to `True`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | false         | BOOL                | Yes      | No      |
| topic.offsets.map      | This parameter specifies reading offsets for each topic and partition. The value for this parameter is specified in the following format: Â `<topic>=<offset>,<topic>=<offset>,` Â Â When an offset is defined for a topic, the Kafka source skips reading the message with the number specified as the offset as well as all the messages sent previous to that message. If the offset is not defined for a specific topic it reads messages from the beginning. e.g., `stocks=100,trades=50` reads from the 101th message of the `stocks` topic, and from the 51st message of the `trades` topic.                                                                                                                                                                                                                                                                                                                                                                                                     | null          | STRING              | Yes      | No      |
| enable.offsets.commit  | This parameter specifies whether to commit offsets. If the manual asynchronous offset committing is needed, `enable.offsets.commit` should be `true` and `enable.auto.commit` should be `false`. If periodical committing is needed `enable.offsets.commit` should be `true` and `enable.auto.commit` should be `true`. If committing is not needed, `enable.offsets.commit` should be `false`. Note: `enable.auto.commit` is an `optional.configuration` property. If it is set to `true`, Source will periodically(default: 1000ms. Configurable with `auto.commit.interval.ms` property as an `optional.configuration`) commit its current offset (defined as the offset of the next message to be read) for the partitions it is reading from back to Kafka. To guarantee at-least-once processing, we recommend you to enable Stream App Periodic State Persistence when `enable.auto.commit` property is set to `true`. During manual committing, it might introduce a latency during consumption. | true          | BOOL                | Yes      | No      |
| optional.configuration | This parameter contains all the other possible configurations that the consumer is created with. e.g., `ssl.keystore.type:JKS,batch.size:200`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | null          | STRING              | Yes      | No      |

EXAMPLE 1
```js
    @App:name('TestExecutionPlan')
    define stream BarStream (symbol string, price float, volume long);
    @info(name = 'query1')
    @source(
    type='kafka',
    topic.list='kafka_topic,kafka_topic2',
    group.id='test',
    threading.option='partition.wise',
    bootstrap.servers='localhost:9092',
    partition.no.list='0,1',
    @map(type='xml'))
    Define stream FooStream (symbol string, price float, volume long);
    from FooStream select symbol, price, volume insert into BarStream;
```
This kafka source configuration listens to the `kafka_topic` and
`kafka_topic2` topics with `0` and `1` partitions. A thread is created
for each topic and partition combination. The events are received in the
XML format, mapped to a Stream App event, and sent to a stream named
`FooStream`.

EXAMPLE 2
```js
    @App:name('TestExecutionPlan')
    define stream BarStream (symbol string, price float, volume long);
    @info(name = 'query1')
    @source(
    type='kafka',
    topic.list='kafka_topic',
    group.id='test',
    threading.option='single.thread',
    bootstrap.servers='localhost:9092',
    @map(type='xml'))
    Define stream FooStream (symbol string, price float, volume long);
    from FooStream select symbol, price, volume insert into BarStream;
```
This Kafka source configuration listens to the `kafka_topic` topic for
the default partition because no `partition.no.list` is defined. Only
one thread is created for the topic. The events are received in the XML
format, mapped to a Stream App event, and sent to a stream named
`FooStream`.

### kafkaMultiDC (Source)

The Kafka Multi-Datacenter(DC) source receives records from the same
topic in brokers deployed in two different kafka clusters. It filters
out all the duplicate messages and ensuresthat the events are received
in the correct order using sequential numbering. It receives events in
formats such as `TEXT`, `XML` JSON` and `Binary\`.The Kafka Source
creates the default partition `0` for a given topic, if the topic has
not yet been created in the Kafka cluster.

Syntax
```js
    @source(type="kafkaMultiDC", bootstrap.servers="<STRING>", topic="<STRING>", partition.no="<INT>", is.binary.message="<BOOL>", optional.configuration="<STRING>", @map(...)))
```
QUERY PARAMETERS

| Name                   | Description                                                                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| bootstrap.servers      | This contains the kafka server list which the kafka source listens to. This is given using comma-separated values. eg: `localhost:9092,localhost:9093` |               | STRING              | No       | No      |
| topic                  | This is the topic that the source listens to. eg: `topic_one`                                                                                         |               | STRING              | No       | No      |
| partition.no           | This is the partition number of the given topic.                                                                                                         | 0             | INT                 | Yes      | No      |
| is.binary.message      | In order to receive the binary events via the Kafka Multi-DC source, the value of this parameter needs to be set to `True`.                            | false         | BOOL                | Yes      | No      |
| optional.configuration | This contains all the other possible configurations with which the consumer can be created.eg: producer.type:async,batch.size:200                        | null          | STRING              | Yes      | No      |

EXAMPLE 1
```js
    @App:name('TestExecutionPlan')
    define stream BarStream (symbol string, price float, volume long);
    @info(name = 'query1')
    @source(type='kafkaMultiDC', topic='kafka_topic', bootstrap.servers='host1:9092,host1:9093', partition.no='1', @map(type='xml'))
    Define stream FooStream (symbol string, price float, volume long);
    from FooStream select symbol, price, volume insert into BarStream;
```
The following query listens to `kafka_topic` topic, deployed in the
broker host1:9092 and host1:9093, with partition 1. A thread is created
for each broker. The receiving xml events are mapped to a stream processor event
and sent to the FooStream.

### nats (Source)

NATS Source allows users to subscribe to a NATS broker and receive
messages. It has the ability to receive all the message types supported
by NATS.

Syntax
```js
    @source(type="nats", destination="<STRING>", bootstrap.servers="<STRING>", client.id="<STRING>", cluster.id="<STRING>", queue.group.name="<STRING>", durable.name="<STRING>", subscription.sequence="<STRING>", @map(...)))
```
QUERY PARAMETERS

| Name                  | Description                                                                                                                                                                                                                                       | Default Value         | Possible Data Types | Optional | Dynamic |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------|---------------------|----------|---------|
| destination           | Subject name which NATS Source should subscribe to.                                                                                                                                                                                               |                       | STRING              | No       | No      |
| bootstrap.servers     | The NATS based url of the NATS server.                                                                                                                                                                                                            | nats://localhost:4222 | STRING              | Yes      | No      |
| client.id             | The identifier of the client subscribing/connecting to the NATS broker.                                                                                                                                                                           | None                  | STRING              | Yes      | No      |
| cluster.id            | The identifier of the NATS server/cluster.                                                                                                                                                                                                        | test-cluster          | STRING              | Yes      | No      |
| queue.group.name      | This can be used when there is a requirement to share the load of a NATS subject. Clients belongs to the same queue group share the subscription load.                                                                                            | None                  | STRING              | Yes      | No      |
| durable.name          | This can be used to subscribe to a subject from the last acknowledged message when a client or connection failure happens. The client can be uniquely identified using the tuple (client.id, durable.name).                                       | None                  | STRING              | Yes      | No      |
| subscription.sequence | This can be used to subscribe to a subject from a given number of message sequence. All the messages from the given point of sequence number will be passed to the client. If not provided then the either the persisted value or 0 will be used. | None                  | STRING              | Yes      | No      |

EXAMPLE 1
```js
    @source(type='nats', @map(type='text'), destination='SP_NATS_INPUT_TEST', bootstrap.servers='nats://localhost:4222',client.id='nats_client',server.id='test-cluster',queue.group.name = 'group_nats',durable.name = 'nats-durable',subscription.sequence = '100')
    define stream inputStream (name string, age int, country string);
```
This example shows how to subscribe to a NATS subject with all
supporting configurations.With the following configuration the source
identified as `nats-client` will subscribes to a subject named as
`SP_NATS_INPUT_TEST` which resides in a nats instance with a
cluster id of `test-cluster`, running in localhost and listening to
the port 4222 for client connection. This subscription will receive all
the messages from 100th in the subject.

EXAMPLE 2
```js
    @source(type='nats', @map(type='text'), destination='SP_NATS_INPUT_TEST', )
    define stream inputStream (name string, age int, country string);
```
This example shows how to subscribe to a NATS subject with mandatory
configurations.With the following configuration the source identified
with an auto generated client id will subscribes to a subject named as
`SP_NATS_INTPUT_TEST` which resides in a nats instance with a
cluster id of `test-cluster`, running in localhost and listening to
the port 4222 for client connection. This will receive all available
messages in the subject

EXAMPLE 3
```js
    @source(type='nats', @map(type='json', @attributes(name='$.name', age='$.age', country='$.country', sequenceNum='trp:sequenceNumber')), destination='SIDDHI_NATS_SOURCE_TEST_DEST', client.id='nats_client', bootstrap.servers='nats://localhost:4222', cluster.id='test-cluster')
    define stream inputStream (name string, age int, country string, sequenceNum string);
```
This example shows how to pass NATS Streaming sequence number to the
event.

### prometheus (Source)

This source consumes Prometheus metrics that are exported from a
specified URL as Stream App events by sending HTTP requests to the URL.
Based on the source configuration, it analyzes metrics from the text
response and sends them as Stream App events through key-value mapping.The
user can retrieve metrics of the `including`, `counter`, `gauge`,
`histogram`, and `summary` types. The source retrieves the metrics
from a text response of the target. Therefore, it is you need to use
`string` as the attribute type for the attributes that correspond with
the Prometheus metric labels. Further, the Prometheus metric value is
passed through the event as `value`. This requires you to include an
attribute named `value` in the stream definition. The supported types
for the `value` attribute are `INT`, `LONG`, `FLOAT`, and
`DOUBLE`.

Syntax
```js
    @source(type="prometheus", target.url="<STRING>", scrape.interval="<INT>", scrape.timeout="<INT>", scheme="<STRING>", metric.name="<STRING>", metric.type="<STRING>", username="<STRING>", password="<STRING>", client.truststore.file="<STRING>", client.truststore.password="<STRING>", headers="<STRING>", job="<STRING>", instance="<STRING>", grouping.key="<STRING>", @map(...)))
```
QUERY PARAMETERS

| Name                       | Description                                                                                                                                                                                                                                                                                                                                                      | Default Value | Possible Data Types | Optional | Dynamic |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| target.url                 | This property specifies the target URL to which the Prometheus metrics are exported in the `TEXT` format.                                                                                                                                                                                                                                                      |               | STRING              | No       | No      |
| scrape.interval            | This property specifies the time interval in seconds within which the source should send an HTTP request to the specified target URL.                                                                                                                                                                                                                            | 60            | INT                 | Yes      | No      |
| scrape.timeout             | This property is the time duration in seconds for a scrape request to get timed-out if the server at the URL does not respond.                                                                                                                                                                                                                                   | 10            | INT                 | Yes      | No      |
| scheme                     | This property specifies the scheme of the target URL. Â The supported schemes are `HTTP` and `HTTPS`.                                                                                                                                                                                                                                                         | HTTP          | STRING              | Yes      | No      |
| metric.name                | This property specifies the name of the metrics that are to be fetched. The metric name must match the regex format, i.e., `\[a-zA-Z\_:\]\[a-zA-Z0-9\_:\]\* `.                                                                                                                                                                                                 | Stream name   | STRING              | Yes      | No      |
| metric.type                | This property specifies the type of the Prometheus metric that is required to be fetched. Â The supported metric types are `counter`, `gauge`, `histogram`, and `summary`.                                                                                                                                                                              |               | STRING              | No       | No      |
| username                   | This property specifies the username that needs to be added in the authorization header of the HTTP request if basic authentication is enabled at the target. It is required to specify both the username and the password to enable basic authentication. If you do not provide a value for one or both of these parameters, an error is logged in the console. |               | STRING              | Yes      | No      |
| password                   | This property specifies the password that needs to be added in the authorization header of the HTTP request if basic authentication is enabled at the target. It is required to specify both the username and the password to enable basic authentication. If you do not provide a value for one or both of these parameters, an error is logged in the console. |               | STRING              | Yes      | No      |
| client.truststore.file     | The file path to the location of the truststore to which the client needs to send HTTPS requests via the `HTTPS` protocol.                                                                                                                                                                                                                                     |               | STRING              | Yes      | No      |
| client.truststore.password | The password for the client-truststore. This is required to send HTTPS requests. A custom password can be specified if required.                                                                                                                                                                                                                                 |               | STRING              | Yes      | No      |
| headers                    | Headers that need to be included as HTTP request headers in the request. The format of the supported input is as follows, "`header1:value1`,`header2:value2`"                                                                                                                                                                                              |               | STRING              | Yes      | No      |
| job                        | This property defines the job name of the exported Prometheus metrics that needs to be fetched.                                                                                                                                                                                                                                                                  |               | STRING              | Yes      | No      |
| instance                   | This property defines the instance of the exported Prometheus metrics that needs to be fetched.                                                                                                                                                                                                                                                                  |               | STRING              | Yes      | No      |
| grouping.key               | This parameter specifies the grouping key of the required metrics in key-value pairs. The grouping key is used if the metrics are exported by Prometheus `pushGateway` in order to distinguish those metrics from already existing metrics. Â The expected format of the grouping key is as follows: "`key1:value1`,`key2:value2`"                        |               | STRING              | Yes      | No      |

System Parameters

| Name               | Description                                                                                                                                                                                                                                                                                                                          | Default Value                                            | Possible Parameters                    |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|----------------------------------------|
| scrapeInterval     | The default time interval in seconds for the Prometheus source to send HTTP requests to the target URL.                                                                                                                                                                                                                              | 60                                                       | Any integer value                      |
| scrapeTimeout      | The default time duration (in seconds) for an HTTP request to time-out if the server at the URL does not respond.                                                                                                                                                                                                                    | 10                                                       | Any integer value                      |
| scheme             | The scheme of the target for the Prometheus source to send HTTP requests. The supported schemes are `HTTP` and `HTTPS`.                                                                                                                                                                                                          | HTTP                                                     | HTTP or HTTPS                          |
| username           | The username that needs to be added in the authorization header of the HTTP request if basic authentication is enabled at the target. It is required to specify both the username and password to enable basic authentication. If you do not specify a value for one or both of these parameters, an error is logged in the console. |                                                          | Any string                             |
| password           | The password that needs to be added in the authorization header of the HTTP request if basic authentication is enabled at the target. It is required to specify both the username and password to enable basic authentication. If you do not specify a value for one or both of these parameters, an error is logged in the console. |                                                          | Any string                             |
| trustStoreFile     | The default file path to the location of truststore that the client needs to access in order to send HTTPS requests through `HTTPS` protocol.                                                                                                                                                                                      | \${carbon.home}/resources/security/client-truststore.jks | Any valid path for the truststore file |
| trustStorePassword | The default password for the client-truststore that the client needs to access in order to send HTTPS requests through `HTTPS` protocol.                                                                                                                                                                                           | gdncarbon                                               | Any string                             |
| headers            | The headers that need to be included as HTTP request headers in the scrape request. The format of the supported input is as follows, "`header1:value1`,`header2:value2`"                                                                                                                                                       |                                                          | Any valid http headers                 |
| job                | The default job name of the exported Prometheus metrics that needs to be fetched.                                                                                                                                                                                                                                                    |                                                          | Any valid job name                     |
| instance           | The default instance of the exported Prometheus metrics that needs to be fetched.                                                                                                                                                                                                                                                    |                                                          | Any valid instance name                |
| groupingKey        | The default grouping key of the required Prometheus metrics in key-value pairs. The grouping key is used if the metrics are exported by the Prometheus pushGateway in order to distinguish these metrics from already existing metrics. The expected format of the grouping key is as follows: "`key1:value1`,`key2:value2`"   |                                                          | Any valid grouping key pairs           |

EXAMPLE 1
```js
    @source(type= 'prometheus', target.url= 'http://localhost:9080/metrics', metric.type= 'counter', metric.name= 'sweet_production_counter', @map(type= 'keyvalue'))
    define stream FooStream1(metric_name string, metric_type string, help string, subtype string, name string, quantity string, value double);
```
In this example, the Prometheus source sends an HTTP request to the
`target.url` and analyzes the response. From the analyzed response,
the source retrieves the Prometheus counter metrics with the
`sweet_production_counter` nameand converts the filtered metrics
into Stream App events using the key-value mapper. The generated maps have
keys and values as follows: Â Â metric_name ->
sweet_production_counter Â Â metric_type -> counter Â Â help ->
`help_string_of_metric` Â Â subtype -> null Â Â name ->
`value_of_label_name` Â Â quantity -> `value_of_label_quantity`
Â Â value -> `value_of_metric`

EXAMPLE 2
```js
    @source(type= 'prometheus', target.url= 'http://localhost:9080/metrics', metric.type= 'summary', metric.name= 'sweet_production_summary', @map(type= 'keyvalue'))
     define stream FooStream2(metric_name string, metric_type string, help string, subtype string, name string, quantity string, quantile string, value double);
```
In this example, the Prometheus source sends an HTTP request to the
`target.url` and analyzes the response. From the analysed response,
the source retrieves the Prometheus summary metrics with the
`sweet_production_summary` nameand converts the filtered metrics
into Stream App events using the key-value mapper. The generated maps have
keys and values as follows: Â Â metric_name ->
sweet_production_summary Â Â metric_type -> summary Â Â help ->
`help_string_of_metric` Â Â subtype ->
<`sum`/`count`/`null`> Â Â name -> `value_of_label_name`
Â Â quantity -> `value_of_label_quantity` Â Â quantile -> `value of the quantile` Â Â value -> `value_of_metric`

EXAMPLE 3
```js
    @source(type= 'prometheus', target.url= 'http://localhost:9080/metrics', metric.type= 'histogram', metric.name= 'sweet_production_histogram', @map(type= 'keyvalue'))
    define stream FooStream3(metric_name string, metric_type string, help string, subtype string, name string, quantity string, le string, value double);
```
In this example, the prometheus source sends an HTTP request to the
`target.url` and analyzes the response. From the analyzed response,
the source retrieves the Prometheus histogram metrics with the
`sweet_production_histogram` name and converts the filtered metrics
into Stream App events using the key-value mapper. The generated maps have
keys and values as follows, Â Â metric_name ->
sweet_production_histogram Â Â metric_type -> histogram Â Â help ->
`help_string_of_metric` Â Â subtype ->
<`sum`/`count`/`bucket`> Â Â name -> `value_of_label_name`
Â Â quantity -> `value_of_label_quantity` Â Â le -> `value of the bucket` Â Â value -> `value_of_metric`

### rabbitmq (Source)

The rabbitmq source receives the events from the rabbitmq broker via the
AMQP protocol.

Syntax
```js
    @source(type="rabbitmq", uri="<STRING>", heartbeat="<INT>", exchange.name="<STRING>", exchange.type="<STRING>", exchange.durable.enabled="<BOOL>", exchange.autodelete.enabled="<BOOL>", routing.key="<STRING>", headers="<STRING>", queue.name="<STRING>", queue.durable.enabled="<BOOL>", queue.exclusive.enabled="<BOOL>", queue.autodelete.enabled="<BOOL>", tls.enabled="<BOOL>", tls.truststore.path="<STRING>", tls.truststore.password="<STRING>", tls.truststore.type="<STRING>", tls.version="<STRING>", auto.ack="<BOOL>", @map(...)))
```
QUERY PARAMETERS

| Name                        | Description                                                                                                                                                                                                                                                                                                                       | Default Value                                            | Possible Data Types | Optional | Dynamic |
|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|---------------------|----------|---------|
| uri                         | The URI that is used to connect to an AMQP server. If no URI is specified,an error is logged in the CLI.e.g., `amqp://guest:guest`, `amqp://guest:guest@localhost:5672`                                                                                                                                                           |                                                          | STRING              | No       | No      |
| heartbeat                   | The period of time (in seconds) after which the peer TCP connection should be considered unreachable (down) by RabbitMQ and client libraries.                                                                                                                                                                                     | 60                                                       | INT                 | Yes      | No      |
| exchange.name               | The name of the exchange that decides what to do with a message it receives.If the `exchange.name` already exists in the RabbitMQ server, then the system uses that `exchange.name` instead of redeclaring.                                                                                                                       |                                                          | STRING              | No       | No      |
| exchange.type               | The type of the exchange name. The exchange types available are `direct`, `fanout`, `topic` and `headers`. For a detailed description of each type, see \[RabbitMQ - AMQP Concepts\](https://www.rabbitmq.com/tutorials/amqp-concepts.html).                                                                                      | direct                                                   | STRING              | Yes      | No      |
| exchange.durable.enabled    | If this is set to `true`, the exchange remains declared even if the broker restarts.                                                                                                                                                                                                                                              | false                                                    | BOOL                | Yes      | No      |
| exchange.autodelete.enabled | If this is set to `true`, the exchange is automatically deleted when it is not used anymore.                                                                                                                                                                                                                                      | false                                                    | BOOL                | Yes      | No      |
| routing.key                 | The key based on which the exchange determines how to route the message to queues. The routing key is like an address for the message. The routing.key must be initialized when the value for the `exchange.type` parameter is `direct` or `topic`.                                                                               | empty                                                    | STRING              | Yes      | No      |
| headers                     | The headers of the message. The attributes used for routing are taken from the this paremeter. A message is considered matching if the value of the header equals the value specified upon binding.                                                                                                                               | null                                                     | STRING              | Yes      | No      |
| queue.name                  | A queue is a buffer that stores messages. If the queue name already exists in the RabbitMQ server, then the system usees that queue name instead of redeclaring it. If no value is specified for this parameter, the system uses the unique queue name that is automatically generated by the RabbitMQ server.                    | system generated queue name                              | STRING              | Yes      | No      |
| queue.durable.enabled       | If this parameter is set to `true`, the queue remains declared even if the broker restarts                                                                                                                                                                                                                                        | false                                                    | BOOL                | Yes      | No      |
| queue.exclusive.enabled     | If this parameter is set to `true`, the queue is exclusive for the current connection. If it is set to `false`, it is also consumable by other connections.                                                                                                                                                                       | false                                                    | BOOL                | Yes      | No      |
| queue.autodelete.enabled    | If this parameter is set to `true`, the queue is automatically deleted when it is not used anymore.                                                                                                                                                                                                                               | false                                                    | BOOL                | Yes      | No      |
| tls.enabled                 | This parameter specifies whether an encrypted communication channel should be established or not. When this parameter is set to `true`, the `tls.truststore.path` and `tls.truststore.password` parameters are initialized.                                                                                                       | false                                                    | BOOL                | Yes      | No      |
| tls.truststore.path         | The file path to the location of the truststore of the client that receives the RabbitMQ events via the `AMQP` protocol. A custom client-truststore can be specified if required. If a custom truststore is not specified, then the system uses the default client-trustore in the `${carbon.home}/resources/security` directory. | \${carbon.home}/resources/security/client-truststore.jks | STRING              | Yes      | No      |
| tls.truststore.password     | The password for the client-truststore. A custom password can be specified if required. If no custom password is specified, then the system uses `gdncarbon` as the default password.                                                                                                                                            | gdncarbon                                               | STRING              | Yes      | No      |
| tls.truststore.type         | The type of the truststore.                                                                                                                                                                                                                                                                                                       | JKS                                                      | STRING              | Yes      | No      |
| tls.version                 | The version of the tls/ssl.                                                                                                                                                                                                                                                                                                       | SSL                                                      | STRING              | Yes      | No      |
| auto.ack                    | If this parameter is set to `false`, the server should expect explicit messages acknowledgements once delivered                                                                                                                                                                                                                   | true                                                     | BOOL                | Yes      | No      |

EXAMPLE 1
```js
    @App:name('TestExecutionPlan')
    define stream FooStream (symbol string, price float, volume long);
    @info(name = 'query1')
    @source(type ='rabbitmq',
    uri = 'amqp://guest:guest@localhost:5672',
    exchange.name = 'direct',
    routing.key= 'direct',
    @map(type='xml'))
    Define stream BarStream (symbol string, price float, volume long);
    from FooStream select symbol, price, volume insert into BarStream;
```
This query receives events from the `direct` exchange with the
`direct`exchange type, and the `directTest` routing key.

### tcp (Source)

A Stream App application can be configured to receive events via the TCP
transport by adding the @Source(type = `tcp`) annotation at the top
of an event stream definition. When this is defined the associated
stream will receive events from the TCP transport on the host and port
defined in the system.

Syntax
```js
    @source(type="tcp", context="<STRING>", @map(...)))
```
QUERY PARAMETERS

| Name    | Description                                                    | Default Value | Possible Data Types | Optional | Dynamic |
|---------|----------------------------------------------------------------|---------------|---------------------|----------|---------|
| context | The URL `context` that should be used to receive the events. | /             | STRING              | Yes      | No      |

System Parameters

| Name             | Description                                                                                                                                                                                                                                                                                                        | Default Value | Possible Parameters                 |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-------------------------------------|
| host             | Tcp server host.                                                                                                                                                                                                                                                                                                   | 0.0.0.0       | Any valid host or IP                |
| port             | Tcp server port.                                                                                                                                                                                                                                                                                                   | 9892          | Any integer representing valid port |
| receiver.threads | Number of threads to receive connections.                                                                                                                                                                                                                                                                          | 10            | Any positive integer                |
| worker.threads   | Number of threads to serve events.                                                                                                                                                                                                                                                                                 | 10            | Any positive integer                |
| tcp.no.delay     | This is to specify whether to disable Nagle algorithm during message passing. If tcp.no.delay = `true`, the execution of Nagle algorithm will be disabled in the underlying TCP logic. Hence there will be no delay between two successive writes to the TCP connection. Else there can be a constant ack delay. | true          | true false                          |
| keep.alive       | This property defines whether the server should be kept alive when there are no connections available.                                                                                                                                                                                                             | true          | true false                          |

EXAMPLE 1
```js
    @Source(type = 'tcp', context='abc', @map(type='binary'))
    define stream Foo (attribute1 string, attribute2 int );
```
Under this configuration, events are received via the TCP transport on
default host,port, `abc` context, and they are passed to `Foo` stream
for processing.

Sourcemapper
------------

### avro (Source Mapper)

This extension is an Avro to Event input mapper. Transports that accept
Avro messages can utilize this extension to convert the incoming Avro
messages to Stream App events. Â The Avro schema to be used for creating Avro
messages can be specified as a parameter in the stream definition. Â If
no Avro schema is specified, a flat avro schema of the `record` type
is generated with the stream attributes as schema fields. The
generated/specified Avro schema is used to convert Avro messages to
Stream App events.

Syntax
```js
    @source(..., @map(type="avro", schema.def="<STRING>", schema.registry="<STRING>", schema.id="<STRING>", fail.on.missing.attribute="<BOOL>")
```
QUERY PARAMETERS

| Name                      | Description                                                                                                                                                                                                                                                                                                                                                                                                | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| schema.def                | This specifies the schema of the Avro message. The full schema used to create the Avro message needs to be specified as a quoted JSON string.                                                                                                                                                                                                                                                              |               | STRING              | No       | No      |
| schema.registry           | This specifies the URL of the schema registry.                                                                                                                                                                                                                                                                                                                                                             |               | STRING              | No       | No      |
| schema.id                 | This specifies the ID of the Avro schema. This ID is the global ID that is returned from the schema registry when posting the schema to the registry. The schema is retrieved from the schema registry via the specified ID.                                                                                                                                                                               |               | STRING              | No       | No      |
| fail.on.missing.attribute | If this parameter is set to `true`, a JSON execution failing or returning a null value results in that message being dropped by the system. If this parameter is set to `false`, a JSON execution failing or returning a null value results in the system being prompted to send the event with a null value to Stream App so that the user can handle it as required (i.e., by assigning a default value. | true          | BOOL                | Yes      | No      |

EXAMPLE 1

    @source(type='inMemory', topic='user', @map(type='avro', schema .def = """{"type":"record","name":"userInfo","namespace":"user.example","fields":[{"name":"name","type":"string"}, {"name":"age","type":"int"}]}"""))
    define stream UserStream (name string, age int );

The above Stream App query performs a default Avro input mapping. The input
Avro message that contains user information is converted to a Stream App
event. The expected input is a byte array or ByteBuffer.

EXAMPLE 2
```js
    @source(type='inMemory', topic='user', @map(type='avro', schema .def = """{"type":"record","name":"userInfo","namespace":"avro.userInfo","fields":[{"name":"username","type":"string"}, {"name":"age","type":"int"}]}""",@attributes(name="username",age="age")))
    define stream userStream (name string, age int );
```
The above Stream App query performs a custom Avro input mapping. The input
Avro message that contains user information is converted to a Stream App
event. Â The expected input is a byte array or ByteBuffer.

EXAMPLE 3
```js
    @source(type='inMemory', topic='user', @map(type='avro',schema.registry='http://192.168.2.5:9090', schema.id='1',@attributes(name="username",age="age")))
    define stream UserStream (name string, age int );
```
The above Stream App query performs a custom Avro input mapping. The input
Avro message that contains user information is converted to a Stream App
event via the schema retrieved from the given schema
registry(localhost:8081). The expected input is a byte array or
ByteBuffer.

### binary (Source Mapper)

This extension is a binary input mapper that converts events received in
`binary` format to Stream App events before they are processed.

Syntax
```js
    @source(..., @map(type="binary")
```
EXAMPLE 1
```js
    @source(type='inMemory', topic='gdn', @map(type='binary'))define stream FooStream (symbol string, price float, volume long);
```
This query performs a mapping to convert an event of the `binary` format
to a Stream App event.

### csv (Source Mapper)

This extension is used to convert CSV message to Stream App event input
mapper. You can either receive pre-defined CSV message where event
conversion takes place without extra configurations,or receive custom
CSV message where a custom place order to map from custom CSV message.

Syntax
```js
    @source(..., @map(type="csv", delimiter="<STRING>", header.present="<BOOL>", fail.on.unknown.attribute="<BOOL>", event.grouping.enabled="<BOOL>")
```
QUERY PARAMETERS

| Name                      | Description                                                                                                                                                                                                                                                                                                                                            | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| delimiter                 | When converting a CSV format message to Stream App event, this parameter indicatesinput CSV message's data should be split by this parameter                                                                                                                                                                                                              | ,             | STRING              | Yes      | No      |
| header.present            | When converting a CSV format message to Stream App event, this parameter indicates whether CSV message has header or not. This can either have value true or false.If it's set to `false` then it indicates that CSV message has't header.                                                                                                               | false         | BOOL                | Yes      | No      |
| fail.on.unknown.attribute | This parameter specifies how unknown attributes should be handled. If it's set to `true` and one or more attributes don't havevalues, then SP will drop that message. If this parameter is set to `false`, the Stream Processor adds the required attribute's values to such events with a null value and the event is converted to a Stream App event. | true          | BOOL                | Yes      | No      |
| event.grouping.enabled    | This parameter specifies whether event grouping is enabled or not. To receive a group of events together and generate multiple events, this parameter must be set to `true`.                                                                                                                                                                           | false         | BOOL                | Yes      | No      |

EXAMPLE 1
```js
    @source(type='inMemory', topic='stock', @map(type='csv'))
     define stream FooStream (symbol string, price float, volume int);
```
Above configuration will do a default CSV input mapping. Expected input
will look like below: Â gdn ,55.6 , 100OR Â "gdn,No10,Palam Groove
Rd,Col-03" ,55.6 , 100If header.present is true and delimiter is "-",
then the input is as follows: symbol-price-volumegdn-55.6-100

EXAMPLE 2

    @source(type='inMemory', topic='stock', @map(type='csv',header='true', @attributes(symbol = "2", price = "0", volume = "1")))
    define stream FooStream (symbol string, price float, volume long);

Above configuration will perform a custom CSV mapping. Here, user can
add place order of each attribute in the @attribute. The place order
indicates where the attribute name's value has appeared in the
input.Expected input will look like below: 55.6,100,gdn
OR55.6,100,"gdn,No10,Palm Groove Rd,Col-03" If header is true and
delimiter is "-", then the output is as follows: price-volume-symbol
55.6-100-gdn If group events is enabled then input should be as
follows: price-volume-symbol 55.6-100-gdnSystem.lineSeparator()
55.6-100-IBMSystem.lineSeparator() 55.6-100-IFSSystem.lineSeparator()

### json (Source Mapper)

This extension is a JSON-to-Event input mapper. Transports that accept
JSON messages can utilize this extension to convert an incoming JSON
message into a Stream App event. Users can either send a pre-defined JSON
format, where event conversion happens without any configurations, or
use the JSON path to map from a custom JSON message. In default mapping,
the JSON string of the event can be enclosed by the element "event",
though optional.

Syntax
```js
    @source(..., @map(type="json", enclosing.element="<STRING>", fail.on.missing.attribute="<BOOL>")
```
QUERY PARAMETERS

| Name                      | Description                                                                                                                                                                                                                                                                                                                                                                                     | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| enclosing.element         | This is used to specify the enclosing element when sending multiple events in the same JSON message. Mapper treats the child elements of a given enclosing element as events and executes the JSON path expressions on these child elements. If the enclosing.element is not provided then the multiple-event scenario is disregarded and the JSON path is evaluated based on the root element. | \$            | STRING              | Yes      | No      |
| fail.on.missing.attribute | This parameter allows users to handle unknown attributes.The value of this can either be true or false. By default it is true. Â If a JSON execution fails or returns null, mapper drops that message. However, setting this property to false prompts mapper to send an event with a null value to Stream App, where users can handle it as required, ie., assign a default value.)                 | true          | BOOL                | Yes      | No      |

EXAMPLE 1
```js
    @source(type='inMemory', topic='stock', @map(type='json'))
    define stream FooStream (symbol string, price float, volume long);
```
This configuration performs a default JSON input mapping. Â For a single
event, the input is required to be in one of the following formats: {
Â Â Â Â "event":{ Â Â Â Â Â Â Â Â "symbol":"gdn", Â Â Â Â Â Â Â Â "price":55.6,
Â Â Â Â Â Â Â Â "volume":100 Â Â Â Â } } or { Â Â Â Â "symbol":"gdn",
Â Â Â Â "price":55.6, Â Â Â Â "volume":100 }

EXAMPLE 2
```js
    @source(type='inMemory', topic='stock', @map(type='json'))
    define stream FooStream (symbol string, price float, volume long);
```
This configuration performs a default JSON input mapping. For multiple
events, the input is required to be in one of the following formats: [
{\"event\":{\"symbol\":\"gdn\",\"price\":55.6,\"volume\":100}},
{\"event\":{\"symbol\":\"gdn\",\"price\":56.6,\"volume\":99}},
{\"event\":{\"symbol\":\"gdn\",\"price\":57.6,\"volume\":80}} ] or [
{\"symbol\":\"gdn\",\"price\":55.6,\"volume\":100},
{\"symbol\":\"gdn\",\"price\":56.6,\"volume\":99},
{\"symbol\":\"gdn\",\"price\":57.6,\"volume\":80} ]

EXAMPLE 3
```js
    @source(type='inMemory', topic='stock', @map(type='json', enclosing.element="$.portfolio", @attributes(symbol = "company.symbol", price = "price", volume = "volume")))
```
This configuration performs a custom JSON mapping. For a single event,
the expected input is similar to the one shown below: { Â "portfolio":{
Â Â Â Â Â "stock":{ "volume":100, Â Â Â Â Â Â Â Â "company":{
Â Â Â Â Â Â Â Â Â Â Â "symbol":"gdn" Â Â Â Â Â Â Â Â Â Â }, Â Â Â Â Â Â Â Â "price":55.6
Â Â Â Â Â Â Â } Â Â Â } }

EXAMPLE 4
```js
    @source(type='inMemory', topic='stock', @map(type='json', enclosing.element="$.portfolio", @attributes(symbol = "stock.company.symbol", price = "stock.price", volume = "stock.volume")))
    define stream FooStream (symbol string, price float, volume long);
```
The configuration performs a custom JSON mapping. For multiple events,
expected input looks as follows. .{"portfolio": Â Â Â [
{\"stock\":{\"volume\":100,\"company\":{\"symbol\":\"gdn\"},\"price\":56.6}},
{\"stock\":{\"volume\":200,\"company\":{\"symbol\":\"gdn\"},\"price\":57.6}}
] }

### keyvalue (Source Mapper)

`Key-Value Map to Event` input mapper extension allows transports that
accept events as key value maps to convert those events to Stream App
events. You can either receive pre-defined keys where conversion takes
place without extra configurations, or use custom keys to map from the
message.

Syntax
```js
    @source(..., @map(type="keyvalue", fail.on.missing.attribute="<BOOL>")
```
QUERY PARAMETERS

| Name                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                          | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| fail.on.missing.attribute | If this parameter is set to `true`, if an event arrives without a matching key for a specific attribute in the connected stream, it is dropped and not processed by the Stream Processor. If this parameter is set to `false` the Stream Processor adds the required key to such events with a null value, and the event is converted to a Stream App event so that you could handle them as required before they are further processed. | true          | BOOL                | Yes      | No      |

EXAMPLE 1
```js
    @source(type='inMemory', topic='stock', @map(type='keyvalue'))
    define stream FooStream (symbol string, price float, volume long);
```
This query performs a default key value input mapping. The expected
input is a map similar to the following: symbol: `gdn` price: 55.6f
volume: 100

EXAMPLE 2
```js
    @source(type='inMemory', topic='stock', @map(type='keyvalue', fail.on.missing.attribute='true', @attributes(symbol = 's', price = 'p', volume = 'v')))define stream FooStream (symbol string, price float, volume long);
```
This query performs a custom key value input mapping. The matching keys
for the `symbol`, `price` and `volume` attributes are be `s`, `p`, and
`v` respectively. The expected input is a map similar to the following:
s: `gdn` p: 55.6 v: 100

### passThrough (Source Mapper)

Pass-through mapper passed events (Event[]) through without any
mapping or modifications.

Syntax
```js
    @source(..., @map(type="passThrough")
```
EXAMPLE 1
```js
    @source(type='tcp', @map(type='passThrough'))
    define stream BarStream (symbol string, price float, volume long);
```
In this example BarStream uses passThrough inputmapper which passes the
received Stream App event directly without any transformation into source.

### protobuf (Source Mapper)

This input mapper allows you to convert protobuf messages into Events.
To work with this input mapper you have to add auto-generated protobuf
classes to the project classpath. When you use this input mapper, you
can either define stream attributes as the same names as the protobuf
message attributes or you can use custom mapping to map stream
definition attributes with the protobuf attributes.
When you use this mapper with `streamprocessor-io-grpc` you don't have to
provide the protobuf message class in the `class` parameter.

Syntax
```js
    @source(..., @map(type="protobuf", class="<STRING>")
```
QUERY PARAMETERS

| Name  | Description                                                                                                                       | Default Value | Possible Data Types | Optional | Dynamic |
|-------|-----------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| class | This specifies the class name of the protobuf message class, If sink type is grpc then it's not necessary to provide this field. | \-            | STRING              | Yes      | No      |

EXAMPLE 1
```js
    @source(type='inMemory', topic='test01',
    @map(type='protobuf', class='io.streamprocessor.extension.map.protobuf.autogenerated.Request'))
    define stream FooStream (stringValue string, intValue int,longValue long,booleanValue bool,floatValue float,doubleValue double);
```
This will convert the
`io.streamprocessor.extension.map.protobuf.autogenerated.Request` protobuf
messages into stream processor events.

EXAMPLE 2
```js
    source(type='grpc', receiver.url = 'grpc://localhost:8084/org.gdn.grpc.test.MyService/process',
    @map(type='protobuf')) define stream FooStream (stringValue string, intValue int,longValue long,booleanValue bool,floatValue float,doubleValue double);
```
This will convert the protobuf messages that are received to this source
into stream processor events. Since this is `grpc` source we don't need to
provide the `class` parameter

EXAMPLE 3
```js
    source(type='grpc', receiver.url = 'grpc://localhost:8084/org.gdn.grpc.test.MyService/process',
    @map(type='protobuf', @attributes(a = 'stringValue', b = 'intValue', c = 'longValue',d = 'booleanValue',' e = floatValue', f ='doubleValue')))
    define stream FooStream (a string ,c long,b int, d bool,e float,f double);
```
This will convert the protobuf messages that are received to this source
into stream processor events. since there's a mapping available for the stream,
protobuf message object will be map like this, - `stringValue` of the
protobuf message will be assign to the `a` attribute of the stream -
`intValue` of the protobuf message will be assign to the `b` attribute
of the stream - `longValue` of the protobuf message will be assign to
the `c` attribute of the stream - `booleanValue` of the protobuf message
will be assign to the `d` attribute of the stream - `floatValue` of the
protobuf message will be assign to the `e` attribute of the stream -
`doubleValue` of the protobuf message will be assign to the `f`
attribute of the stream

EXAMPLE 4
```js
    source((type='inMemory', topic='test01',
    @map(type='protobuf', class='io.streamprocessor.extension.map.protobuf.autogenerated.RequestWithList))
    define stream FooStream (stringValue string ,intValue int,stringList object, intList object););
```
This will convert the
`io.streamprocessor.extension.map.protobuf.autogenerated.RequestWithList`
protobuf messages that are received to this source into stream processor events.
If you want to map data types other than the scalar data types, you have
to use `object` as the data type as shown in above(`stringList object`)

### text (Source Mapper)

This extension is a text to Stream App event input mapper. Transports that
accept text messages can utilize this extension to convert the incoming
text message to Stream App event. Users can either use a pre-defined text
format where event conversion happens without any additional
configurations, or specify a regex to map a text message using custom
configurations.

Syntax
```js
    @source(..., @map(type="text", regex.groupid="<STRING>", fail.on.missing.attribute="<BOOL>", event.grouping.enabled="<BOOL>", delimiter="<STRING>", new.line.character="<STRING>")
```
QUERY PARAMETERS

| Name                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                         | Default Value        | Possible Data Types | Optional | Dynamic |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------|---------------------|----------|---------|
| regex.groupid             | This parameter specifies a regular expression group. The `groupid` can be any capital letter (e.g., regex.A,regex.B .. etc). You can specify any number of regular expression groups. In the attribute annotation, you need to map all attributes to the regular expression group with the matching group index. If you need to to enable custom mapping, it is required to specifythe matching group for each and every attribute. |                      | STRING              | No       | No      |
| fail.on.missing.attribute | This parameter specifies how unknown attributes should be handled. If it is set to `true` a message is dropped if its execution fails, or if one or more attributes do not have values. If this parameter is set to `false`, null values are assigned to attributes with missing values, and messages with such attributes are not dropped.                                                                                         | true                 | BOOL                | Yes      | No      |
| event.grouping.enabled    | This parameter specifies whether event grouping is enabled or not. To receive a group of events together and generate multiple events, this parameter must be set to `true`.                                                                                                                                                                                                                                                        | false                | BOOL                | Yes      | No      |
| delimiter                 | This parameter specifies how events must be separated when multiple events are received. This must be whole line and not a single character.                                                                                                                                                                                                                                                                                        | ~~~~~~~~~~ | STRING              | Yes      | No      |
| new.line.character        | This attribute indicates the new line character of the event that is expected to be received. This is used mostly when communication between 2 types of operating systems is expected. For example, Linux uses `\n` as the end of line character whereas windows uses `\r\n`.                                                                                                                                                       | \\n                  | STRING              | Yes      | No      |

EXAMPLE 1
```js
    @source(type='inMemory', topic='stock', @map(type='text'))
    define stream FooStream (symbol string, price float, volume long);
```
This query performs a default text input mapping. The expected input is
as follows: symbol:"gdn", price:55.6, volume:100 OR symbol:`gdn`,
price:55.6, volume:100 If group events is enabled then input should be
as follows: symbol:"gdn", price:55.6, volume:100 ~~~~~~~~~~
symbol:"gdn", price:55.6, volume:100

EXAMPLE 2
```js
    @source(type='inMemory', topic='stock', @map(type='text', fail.on.missing.attribute = 'true', regex.A='(\w+)\s([-0-9]+)',regex.B='volume\s([-0-9]+)', @attributes(symbol = 'A[1]',price = 'A[2]',volume = 'B')))
    define stream FooStream (symbol string, price float, volume long);
```
This query performs a custom text mapping. The expected input is as
follows: wos2 550 volume 100 If group events is enabled then input
should be as follows: wos2 550 volume 100 ~~~~~~~~~~ wos2 550
volume 100 ~~~~~~~~~~ wos2 550 volume 100

### xml (Source Mapper)

This mapper converts XML input to Stream App event. Transports which accepts
XML messages can utilize this extension to convert the incoming XML
message to Stream App event. Users can either send a pre-defined XML format
where event conversion will happen without any configs or can use xpath
to map from a custom XML message.

Syntax
```js
    @source(..., @map(type="xml", namespaces="<STRING>", enclosing.element="<STRING>", fail.on.missing.attribute="<BOOL>")
```
QUERY PARAMETERS

| Name                      | Description                                                                                                                                                                                                                                                                                                                                                                           | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| namespaces                | Used to provide namespaces used in the incoming XML message beforehand to configure xpath expressions. User can provide a comma separated list. If these are not provided xpath evaluations will fail                                                                                                                                                                                 | None          | STRING              | Yes      | No      |
| enclosing.element         | Used to specify the enclosing element in case of sending multiple events in same XML message. gdn DAS will treat the child element of given enclosing element as events and execute xpath expressions on child elements. If enclosing.element is not provided multiple event scenario is disregarded and xpaths will be evaluated with respect to root element.                      | Root element  | STRING              | Yes      | No      |
| fail.on.missing.attribute | This can either have value true or false. By default it will be true. This attribute allows user to handle unknown attributes. By default if an xpath execution fails or returns null DAS will drop that message. However setting this property to false will prompt DAS to send and event with null value to Stream App where user can handle it accordingly(ie. Assign a default value) | True          | BOOL                | Yes      | No      |

EXAMPLE 1
```js
    @source(type='inMemory', topic='stock', @map(type='xml'))
    define stream FooStream (symbol string, price float, volume long);
```
Above configuration will do a default XML input mapping. Expected input
will look like below.<events> Â Â Â Â <event>
Â Â Â Â Â Â Â Â <symbol>gdn</symbol> Â Â Â Â Â Â Â Â <price>55.6</price>
Â Â Â Â Â Â Â Â <volume>100</volume> Â Â Â Â </event> </events>

EXAMPLE 2
```js
    @source(type='inMemory', topic='stock', @map(type='xml', namespaces = "dt=urn:schemas-microsoft-com:datatypes", enclosing.element="//portfolio", @attributes(symbol = "company/symbol", price = "price", volume = "volume")))
    define stream FooStream (symbol string, price float, volume long);
```
Above configuration will perform a custom XML mapping. In the custom
mapping user can add xpath expressions representing each event attribute
using @attribute annotation. Expected input will look like below.
`<portfolio xmlns:dt="urn:schemas-microsoft-com:datatypes"> Â Â Â Â <stock exchange="nasdaq"> Â Â Â Â Â Â Â Â <volume>100</volume> Â Â Â Â Â Â Â Â <company> Â Â Â Â Â Â Â Â Â Â Â <symbol>gdn</symbol> Â Â Â Â Â Â Â Â </company> Â Â Â Â Â Â Â Â <price dt:type="number">55.6</price> Â Â Â Â </stock> </portfolio>`

Store
-----

### mongodb (Store)

Using this extension a MongoDB Event Table can be configured to persist
events in a MongoDB of user's choice.

Syntax
```js
    @Store(type="mongodb", mongodb.uri="<STRING>", collection.name="<STRING>", secure.connection="<STRING>", trust.store="<STRING>", trust.store.password="<STRING>", key.store="<STRING>", key.store.password="<STRING>")
    @PrimaryKey("PRIMARY_KEY")
    @Index("INDEX")
```
QUERY PARAMETERS

| Name                 | Description                                                                                                                                                                                                                                                                                                                                                                                                     | Default Value                                            | Possible Data Types | Optional | Dynamic |
|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|---------------------|----------|---------|
| mongodb.uri          | The MongoDB URI for the MongoDB data store. The uri must be of the format mongodb://[username:password@]host1[:port1][,hostN[:portN]][/[database][?options]] The options specified in the uri will override any connection options specified in the deployment yaml file. Â Note: The user should have read permissions to the admindb as well as read/write permissions to the database accessed. |                                                          | STRING              | No       | No      |
| collection.name      | The name of the collection in the store this Event Table should be persisted as.                                                                                                                                                                                                                                                                                                                                | Name of the stream processor event table.                          | STRING              | Yes      | No      |
| secure.connection    | Describes enabling the SSL for the mongodb connection                                                                                                                                                                                                                                                                                                                                                           | false                                                    | STRING              | Yes      | No      |
| trust.store          | File path to the trust store.                                                                                                                                                                                                                                                                                                                                                                                   | \${carbon.home}/resources/security/client-truststore.jks | STRING              | Yes      | No      |
| trust.store.password | Password to access the trust store                                                                                                                                                                                                                                                                                                                                                                              | gdncarbon                                               | STRING              | Yes      | No      |
| key.store            | File path to the keystore.                                                                                                                                                                                                                                                                                                                                                                                      | \${carbon.home}/resources/security/client-truststore.jks | STRING              | Yes      | No      |
| key.store.password   | Password to access the keystore                                                                                                                                                                                                                                                                                                                                                                                 | gdncarbon                                               | STRING              | Yes      | No      |

System Parameters

| Name                                         | Description                                                                                                                                                                                                                                                                             | Default Value                                            | Possible Parameters                                                                                                                        |
|----------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| applicationName                              | Sets the logical name of the application using this MongoClient. The application name may be used by the client to identify the application to the server, for use in server logs, slow query logs, and profile collection.                                                             | null                                                     | the logical name of the application using this MongoClient. The UTF-8 encoding may not exceed 128 bytes.                                   |
| cursorFinalizerEnabled                       | Sets whether cursor finalizers are enabled.                                                                                                                                                                                                                                             | true                                                     | true false                                                                                                                                 |
| requiredReplicaSetName                       | The name of the replica set                                                                                                                                                                                                                                                             | null                                                     | the logical name of the replica set                                                                                                        |
| sslEnabled                                   | Sets whether to initiate connection with TSL/SSL enabled. true: Initiate the connection with TLS/SSL. false: Initiate the connection without TLS/SSL.                                                                                                                                   | false                                                    | true false                                                                                                                                 |
| trustStore                                   | File path to the trust store.                                                                                                                                                                                                                                                           | \${carbon.home}/resources/security/client-truststore.jks | Any valid file path.                                                                                                                       |
| trustStorePassword                           | Password to access the trust store                                                                                                                                                                                                                                                      | gdncarbon                                               | Any valid password.                                                                                                                        |
| keyStore                                     | File path to the keystore.                                                                                                                                                                                                                                                              | \${carbon.home}/resources/security/client-truststore.jks | Any valid file path.                                                                                                                       |
| keyStorePassword                             | Password to access the keystore                                                                                                                                                                                                                                                         | gdncarbon                                               | Any valid password.                                                                                                                        |
| connectTimeout                               | The time in milliseconds to attempt a connection before timing out.                                                                                                                                                                                                                     | 10000                                                    | Any positive integer                                                                                                                       |
| connectionsPerHost                           | The maximum number of connections in the connection pool.                                                                                                                                                                                                                               | 100                                                      | Any positive integer                                                                                                                       |
| minConnectionsPerHost                        | The minimum number of connections in the connection pool.                                                                                                                                                                                                                               | 0                                                        | Any natural number                                                                                                                         |
| maxConnectionIdleTime                        | The maximum number of milliseconds that a connection can remain idle in the pool before being removed and closed. A zero value indicates no limit to the idle time. A pooled connection that has exceeded its idle time will be closed and replaced when necessary by a new connection. | 0                                                        | Any positive integer                                                                                                                       |
| maxWaitTime                                  | The maximum wait time in milliseconds that a thread may wait for a connection to become available. A value of 0 means that it will not wait. A negative value means to wait indefinitely                                                                                                | 120000                                                   | Any integer                                                                                                                                |
| threadsAllowedToBlockForConnectionMultiplier | The maximum number of connections allowed per host for this MongoClient instance. Those connections will be kept in a pool when idle. Once the pool is exhausted, any operation requiring a connection will block waiting for an available connection.                                  | 100                                                      | Any natural number                                                                                                                         |
| maxConnectionLifeTime                        | The maximum life time of a pooled connection. A zero value indicates no limit to the life time. A pooled connection that has exceeded its life time will be closed and replaced when necessary by a new connection.                                                                     | 0                                                        | Any positive integer                                                                                                                       |
| socketKeepAlive                              | Sets whether to keep a connection alive through firewalls                                                                                                                                                                                                                               | false                                                    | true false                                                                                                                                 |
| socketTimeout                                | The time in milliseconds to attempt a send or receive on a socket before the attempt times out. Default 0 means never to timeout.                                                                                                                                                       | 0                                                        | Any natural integer                                                                                                                        |
| writeConcern                                 | The write concern to use.                                                                                                                                                                                                                                                               | acknowledged                                             | acknowledged w1 w2 w3 unacknowledged fsynced journaled replica\_acknowledged normal safe majority fsync\_safe journal\_safe replicas\_safe |
| readConcern                                  | The level of isolation for the reads from replica sets.                                                                                                                                                                                                                                 | default                                                  | local majority linearizable                                                                                                                |
| readPreference                               | Specifies the replica set read preference for the connection.                                                                                                                                                                                                                           | primary                                                  | primary secondary secondarypreferred primarypreferred nearest                                                                              |
| localThreshold                               | The size (in milliseconds) of the latency window for selecting among multiple suitable MongoDB instances.                                                                                                                                                                               | 15                                                       | Any natural number                                                                                                                         |
| serverSelectionTimeout                       | Specifies how long (in milliseconds) to block for server selection before throwing an exception. A value of 0 means that it will timeout immediately if no server is available. A negative value means to wait indefinitely.                                                            | 30000                                                    | Any integer                                                                                                                                |
| heartbeatSocketTimeout                       | The socket timeout for connections used for the cluster heartbeat. A value of 0 means that it will timeout immediately if no cluster member is available. A negative value means to wait indefinitely.                                                                                  | 20000                                                    | Any integer                                                                                                                                |
| heartbeatConnectTimeout                      | The connect timeout for connections used for the cluster heartbeat. A value of 0 means that it will timeout immediately if no cluster member is available. A negative value means to wait indefinitely.                                                                                 | 20000                                                    | Any integer                                                                                                                                |
| heartbeatFrequency                           | Specify the interval (in milliseconds) between checks, counted from the end of the previous check until the beginning of the next one.                                                                                                                                                  | 10000                                                    | Any positive integer                                                                                                                       |
| minHeartbeatFrequency                        | Sets the minimum heartbeat frequency. In the event that the driver has to frequently re-check a server's availability, it will wait at least this long since the previous check to avoid wasted effort.                                                                                | 500                                                      | Any positive integer                                                                                                                       |

EXAMPLE 1
```js
    @Store(type="mongodb",mongodb.uri="mongodb://admin:admin@localhost/Foo")
    @PrimaryKey("symbol")
    @Index("volume:1", {background:true,unique:true}")
    define table FooTable (symbol string, price float, volume long);
```
This will create a collection called FooTable for the events to be saved
with symbol as Primary Key(unique index at mongoDB level) and index for
the field volume will be created in ascending order with the index
option to create the index in the background. Note: @PrimaryKey: This
specifies a list of comma-separated values to be treated as unique
fields in the table. Each record in the table must have a unique
combination of values for the fields specified here. @Index: This
specifies the fields that must be indexed at the database level. You can
specify multiple values as a come-separated list. A single value to be
in the format, `<FieldName>:<SortOrder>`. The last element is optional
through which a valid index options can be passed. Â Â Â Â Â Â Â Â `SortOrder`
: 1 for Ascending & -1 for Descending. Optional, with default value as
1. Â Â Â Â Â Â Â Â `IndexOptions` : Index Options must be defined inside curly
brackets. Â Â Â Â Â Â Â Â Â Â Â Â Options must follow the standard mongodb index
options format.
Â Â Â Â Â Â Â Â Â Â Â Â https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/
Example 1: @Index(`'symbol:1'`, `'{"unique":true}'`)
Example 2: @Index(`'symbol'`, `'{"unique":true}'`)
Example 3: @Index(`'symbol:1'`, `'volume:-1'`, `'{"unique":true}'`)

### rdbms (Store)

This extension assigns data sources and connection instructions to event
tables. It also implements read-write operations on connected data
sources.

Syntax
```js
    @Store(type="rdbms", jdbc.url="<STRING>", username="<STRING>", password="<STRING>", jdbc.driver.name="<STRING>", pool.properties="<STRING>", jndi.resource="<STRING>", datasource="<STRING>", table.name="<STRING>", field.length="<STRING>", table.check.query="<STRING>", use.collation="<BOOL>")
    @PrimaryKey("PRIMARY_KEY")
    @Index("INDEX")
```
QUERY PARAMETERS

| Name              | Description                                                                                                                                                                                                                                                                                                                                             | Default Value                                           | Possible Data Types | Optional | Dynamic |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------|---------------------|----------|---------|
| jdbc.url          | The JDBC URL via which the RDBMS data store is accessed.                                                                                                                                                                                                                                                                                                |                                                         | STRING              | No       | No      |
| username          | The username to be used to access the RDBMS data store.                                                                                                                                                                                                                                                                                                 |                                                         | STRING              | No       | No      |
| password          | The password to be used to access the RDBMS data store.                                                                                                                                                                                                                                                                                                 |                                                         | STRING              | No       | No      |
| jdbc.driver.name  | The driver class name for connecting the RDBMS data store.                                                                                                                                                                                                                                                                                              |                                                         | STRING              | No       | No      |
| pool.properties   | Any pool parameters for the database connection must be specified as key-value pairs.                                                                                                                                                                                                                                                                   | null                                                    | STRING              | Yes      | No      |
| jndi.resource     | The name of the JNDI resource through which the connection is attempted. If this is found, the pool properties described above are not taken into account and the connection is attempted via JNDI lookup instead.                                                                                                                                      | null                                                    | STRING              | Yes      | No      |
| datasource        | The name of the Carbon datasource that should be used for creating the connection with the database. If this is found, neither the pool properties nor the JNDI resource name described above are taken into account and the connection is attempted via Carbon datasources instead. Only works in Stream App Distribution                                  | null                                                    | STRING              | Yes      | No      |
| table.name        | The name with which the event table should be persisted in the store. If no name is specified via this parameter, the event table is persisted with the same name as the Stream App table.                                                                                                                                                                  | The table name defined in the Stream App App query.         | STRING              | Yes      | No      |
| field.length      | The number of characters that the values for fields of the `STRING` type in the table definition must contain. Each required field must be provided as a comma-separated list of key-value pairs in the `<field.name>:<length>` format. If this is not specified, the default number of characters specific to the database type is considered. | null                                                    | STRING              | Yes      | No      |
| table.check.query | This query will be used to check whether the table is exist in the given database. But the provided query should return an SQLException if the table does not exist in the database. Furthermore if the provided table is a database view, and it is not exists in the database a table from given name will be created in the database                 | The tableCheckQuery which define in store rdbms configs | STRING              | Yes      | No      |
| use.collation     | This property allows users to use collation for string attirbutes. By default it's false and binary collation is not used. Currently `latin1\_bin` and `SQL_Latin1_General_CP1_CS_AS` are used as collations for MySQL and Microsoft SQL database types respectively.                                                                         | false                                                   | BOOL                | Yes      | No      |

System Parameters

| Name                                     | Description                                                                                                                                                                                                                        | Default Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Possible Parameters  |
|------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------|
| {{RDBMS-Name}}.maxVersion                | The latest version supported for {{RDBMS-Name}}.                                                                                                                                                                                   | 0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | N/A                  |
| {{RDBMS-Name}}.minVersion                | The earliest version supported for {{RDBMS-Name}}.                                                                                                                                                                                 | 0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | N/A                  |
| {{RDBMS-Name}}.tableCheckQuery           | The template query for the `check table` operation in {{RDBMS-Name}}.                                                                                                                                                            | **H2**: CREATE TABLE {{TABLE\_NAME}} ({{COLUMNS, PRIMARY\_KEYS}}) **MySQL**: CREATE TABLE {{TABLE\_NAME}} ({{COLUMNS, PRIMARY\_KEYS}}) **Oracle**: CREATE TABLE {{TABLE\_NAME}} ({{COLUMNS, PRIMARY\_KEYS}}) **Microsoft SQL Server**: CREATE TABLE {{TABLE\_NAME}} ({{COLUMNS, PRIMARY\_KEYS}}) **PostgreSQL**: CREATE TABLE {{TABLE\_NAME}} ({{COLUMNS, PRIMARY\_KEYS}}) **DB2.\***: CREATE TABLE {{TABLE\_NAME}} ({{COLUMNS, PRIMARY\_KEYS}})                                                                                                                                                  | N/A                  |
| {{RDBMS-Name}}.tableCreateQuery          | The template query for the `create table` operation in {{RDBMS-Name}}.                                                                                                                                                           | **H2**: SELECT 1 FROM {{TABLE\_NAME}} LIMIT 1 **MySQL**: SELECT 1 FROM {{TABLE\_NAME}} LIMIT 1 **Oracle**: SELECT 1 FROM {{TABLE\_NAME}} WHERE rownum=1 **Microsoft SQL Server**: SELECT TOP 1 1 from {{TABLE\_NAME}} **PostgreSQL**: SELECT 1 FROM {{TABLE\_NAME}} LIMIT 1 **DB2.\***: SELECT 1 FROM {{TABLE\_NAME}} FETCH FIRST 1 ROWS ONLY                                                                                                                                                                                                                                                     | N/A                  |
| {{RDBMS-Name}}.indexCreateQuery          | The template query for the `create index` operation in {{RDBMS-Name}}.                                                                                                                                                           | **H2**: CREATE INDEX {{TABLE\_NAME}}\_INDEX ON {{TABLE\_NAME}} ({{INDEX\_COLUMNS}}) **MySQL**: CREATE INDEX {{TABLE\_NAME}}\_INDEX ON {{TABLE\_NAME}} ({{INDEX\_COLUMNS}}) **Oracle**: CREATE INDEX {{TABLE\_NAME}}\_INDEX ON {{TABLE\_NAME}} ({{INDEX\_COLUMNS}}) **Microsoft SQL Server**: CREATE INDEX {{TABLE\_NAME}}\_INDEX ON {{TABLE\_NAME}} ({{INDEX\_COLUMNS}}) {{TABLE\_NAME}} ({{INDEX\_COLUMNS}}) **PostgreSQL**: CREATE INDEX {{TABLE\_NAME}}\_INDEX ON {{TABLE\_NAME}} ({{INDEX\_COLUMNS}}) **DB2.\***: CREATE INDEX {{TABLE\_NAME}}\_INDEX ON {{TABLE\_NAME}} ({{INDEX\_COLUMNS}}) | N/A                  |
| {{RDBMS-Name}}.recordInsertQuery         | The template query for the `insert record` operation in {{RDBMS-Name}}.                                                                                                                                                          | **H2**: INSERT INTO {{TABLE\_NAME}} ({{COLUMNS}}) VALUES ({{Q}}) **MySQL**: INSERT INTO {{TABLE\_NAME}} ({{COLUMNS}}) VALUES ({{Q}}) **Oracle**: INSERT INTO {{TABLE\_NAME}} ({{COLUMNS}}) VALUES ({{Q}}) **Microsoft SQL Server**: INSERT INTO {{TABLE\_NAME}} ({{COLUMNS}}) VALUES ({{Q}}) **PostgreSQL**: INSERT INTO {{TABLE\_NAME}} ({{COLUMNS}}) VALUES ({{Q}}) **DB2.\***: INSERT INTO {{TABLE\_NAME}} ({{COLUMNS}}) VALUES ({{Q}})                                                                                                                                                        | N/A                  |
| {{RDBMS-Name}}.recordUpdateQuery         | The template query for the `update record` operation in {{RDBMS-Name}}.                                                                                                                                                          | **H2**: UPDATE {{TABLE\_NAME}} SET {{COLUMNS\_AND\_VALUES}} {{CONDITION}} **MySQL**: UPDATE {{TABLE\_NAME}} SET {{COLUMNS\_AND\_VALUES}} {{CONDITION}} **Oracle**: UPDATE {{TABLE\_NAME}} SET {{COLUMNS\_AND\_VALUES}} {{CONDITION}} **Microsoft SQL Server**: UPDATE {{TABLE\_NAME}} SET {{COLUMNS\_AND\_VALUES}} {{CONDITION}} **PostgreSQL**: UPDATE {{TABLE\_NAME}} SET {{COLUMNS\_AND\_VALUES}} {{CONDITION}} **DB2.\***: UPDATE {{TABLE\_NAME}} SET {{COLUMNS\_AND\_VALUES}} {{CONDITION}}                                                                                                  | N/A                  |
| {{RDBMS-Name}}.recordSelectQuery         | The template query for the `select record` operation in {{RDBMS-Name}}.                                                                                                                                                          | **H2**: SELECT \* FROM {{TABLE\_NAME}} {{CONDITION}} **MySQL**: SELECT \* FROM {{TABLE\_NAME}} {{CONDITION}} **Oracle**: SELECT \* FROM {{TABLE\_NAME}} {{CONDITION}} **Microsoft SQL Server**: SELECT \* FROM {{TABLE\_NAME}} {{CONDITION}} **PostgreSQL**: SELECT \* FROM {{TABLE\_NAME}} {{CONDITION}} **DB2.\***: SELECT \* FROM {{TABLE\_NAME}} {{CONDITION}}                                                                                                                                                                                                                                | N/A                  |
| {{RDBMS-Name}}.recordExistsQuery         | The template query for the `check record existence` operation in {{RDBMS-Name}}.                                                                                                                                                 | **H2**: SELECT TOP 1 1 FROM {{TABLE\_NAME}} {{CONDITION}} **MySQL**: SELECT 1 FROM {{TABLE\_NAME}} {{CONDITION}} **Oracle**: SELECT COUNT(1) INTO existence FROM {{TABLE\_NAME}} {{CONDITION}} **Microsoft SQL Server**: SELECT TOP 1 FROM {{TABLE\_NAME}} {{CONDITION}} **PostgreSQL**: SELECT 1 FROM {{TABLE\_NAME}} {{CONDITION}} LIMIT 1 **DB2.\***: SELECT 1 FROM {{TABLE\_NAME}} {{CONDITION}} FETCH FIRST 1 ROWS ONLY                                                                                                                                                                      | N/A                  |
| {{RDBMS-Name}}.recordDeleteQuery         | The query for the `delete record` operation in {{RDBMS-Name}}.                                                                                                                                                                   | **H2**: DELETE FROM {{TABLE\_NAME}} {{CONDITION}} **MySQL**: DELETE FROM {{TABLE\_NAME}} {{CONDITION}} **Oracle**: DELETE FROM {{TABLE\_NAME}} {{CONDITION}} **Microsoft SQL Server**: DELETE FROM {{TABLE\_NAME}} {{CONDITION}} **PostgreSQL**: DELETE FROM {{TABLE\_NAME}} {{CONDITION}} **DB2.\***: DELETE FROM {{TABLE\_NAME}} {{CONDITION}}                                                                                                                                                                                                                                                  | N/A                  |
| {{RDBMS-Name}}.stringSize                | This defines the length for the string fields in {{RDBMS-Name}}.                                                                                                                                                                   | **H2**: 254 **MySQL**: 254 **Oracle**: 254 **Microsoft SQL Server**: 254 **PostgreSQL**: 254 **DB2.\***: 254                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | N/A                  |
| {{RDBMS-Name}}.fieldSizeLimit            | This defines the field size limit for select/switch to big string type from the default string type if the `bigStringType` is available in field type list.                                                                      | **H2**: N/A **MySQL**: N/A **Oracle**: 2000 **Microsoft SQL Server**: N/A **PostgreSQL**: N/A **DB2.\***: N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 0 =\< n =\< INT\_MAX |
| {{RDBMS-Name}}.batchSize                 | This defines the batch size when operations are performed for batches of events.                                                                                                                                                   | **H2**: 1000 **MySQL**: 1000 **Oracle**: 1000 **Microsoft SQL Server**: 1000 **PostgreSQL**: 1000 **DB2.\***: 1000                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | N/A                  |
| {{RDBMS-Name}}.batchEnable               | This specifies whether `Update` and `Insert` operations can be performed for batches of events or not.                                                                                                                         | **H2**: true **MySQL**: true **Oracle (versions 12.0 and less)**: false **Oracle (versions 12.1 and above)**: true **Microsoft SQL Server**: true **PostgreSQL**: true **DB2.\***: true                                                                                                                                                                                                                                                                                                                                                                                                           | N/A                  |
| {{RDBMS-Name}}.transactionSupported      | This is used to specify whether the JDBC connection that is used supports JDBC transactions or not.                                                                                                                                | **H2**: true **MySQL**: true **Oracle**: true **Microsoft SQL Server**: true **PostgreSQL**: true **DB2.\***: true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | N/A                  |
| {{RDBMS-Name}}.typeMapping.binaryType    | This is used to specify the binary data type. An attribute defines as `object` type in Stream App stream will be stored into RDBMS with this type.                                                                                   | **H2**: BLOB **MySQL**: BLOB **Oracle**: BLOB **Microsoft SQL Server**: VARBINARY(max) **PostgreSQL**: BYTEA **DB2.\***: BLOB(64000)                                                                                                                                                                                                                                                                                                                                                                                                                                                              | N/A                  |
| {{RDBMS-Name}}.typeMapping.booleanType   | This is used to specify the boolean data type. An attribute defines as `bool` type in Stream App stream will be stored into RDBMS with this type.                                                                                    | **H2**: TINYINT(1) **MySQL**: TINYINT(1) **Oracle**: NUMBER(1) **Microsoft SQL Server**: BIT **PostgreSQL**: BOOLEAN **DB2.\***: SMALLINT                                                                                                                                                                                                                                                                                                                                                                                                                                                         | N/A                  |
| {{RDBMS-Name}}.typeMapping.doubleType    | This is used to specify the double data type. An attribute defines as `double` type in Stream App stream will be stored into RDBMS with this type.                                                                                   | **H2**: DOUBLE **MySQL**: DOUBLE **Oracle**: NUMBER(19,4) **Microsoft SQL Server**: FLOAT(32) **PostgreSQL**: DOUBLE PRECISION **DB2.\***: DOUBLE                                                                                                                                                                                                                                                                                                                                                                                                                                                 | N/A                  |
| {{RDBMS-Name}}.typeMapping.floatType     | This is used to specify the float data type. An attribute defines as `float` type in Stream App stream will be stored into RDBMS with this type.                                                                                     | **H2**: FLOAT **MySQL**: FLOAT **Oracle**: NUMBER(19,4) **Microsoft SQL Server**: REAL **PostgreSQL**: REAL **DB2.\***: REAL                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | N/A                  |
| {{RDBMS-Name}}.typeMapping.integerType   | This is used to specify the integer data type. An attribute defines as `int` type in Stream App stream will be stored into RDBMS with this type.                                                                                     | **H2**: INTEGER **MySQL**: INTEGER **Oracle**: NUMBER(10) **Microsoft SQL Server**: INTEGER **PostgreSQL**: INTEGER **DB2.\***: INTEGER                                                                                                                                                                                                                                                                                                                                                                                                                                                           | N/A                  |
| {{RDBMS-Name}}.typeMapping.longType      | This is used to specify the long data type. An attribute defines as `long` type in Stream App stream will be stored into RDBMS with this type.                                                                                       | **H2**: BIGINT **MySQL**: BIGINT **Oracle**: NUMBER(19) **Microsoft SQL Server**: BIGINT **PostgreSQL**: BIGINT **DB2.\***: BIGINT                                                                                                                                                                                                                                                                                                                                                                                                                                                                | N/A                  |
| {{RDBMS-Name}}.typeMapping.stringType    | This is used to specify the string data type. An attribute defines as `string` type in Stream App stream will be stored into RDBMS with this type.                                                                                   | **H2**: VARCHAR(stringSize) **MySQL**: VARCHAR(stringSize) **Oracle**: VARCHAR(stringSize) **Microsoft SQL Server**: VARCHAR(stringSize) **PostgreSQL**: VARCHAR(stringSize) **DB2.\***: VARCHAR(stringSize)                                                                                                                                                                                                                                                                                                                                                                                      | N/A                  |
| {{RDBMS-Name}}.typeMapping.bigStringType | This is used to specify the big string data type. An attribute defines as `string` type in Stream App stream and field.length define in the annotation is greater than the fieldSizeLimit, will be stored into RDBMS with this type. | **H2**: N/A **MySQL**: N/A**Oracle**: CLOB**Microsoft SQL Server**: N/A **PostgreSQL**: N/A **DB2.\***: N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | N/A                  |

EXAMPLE 1
```js
    @Store(type="rdbms", jdbc.url="jdbc:mysql://localhost:3306/stocks", username="root", password="root", jdbc.driver.name="com.mysql.jdbc.Driver",field.length="symbol:100")
    @PrimaryKey("id", "symbol")
    @Index("volume")
    define table StockTable (id string, symbol string, price float, volume long);
```
The above example creates an event table named `StockTable` in the
database if it does not already exist (with four attributes named `id`,
`symbol`, `price`, and `volume` of the types `string`, `string`,
`float`, and `long` respectively). The connection is made as
specified by the parameters configured for the `@Store` annotation.
Â The @PrimaryKey() and @Index() annotations can be used to define
primary keys or indexes for the table and they follow Stream App query
syntax. RDBMS store supports having more than one `attributes` in the
@PrimaryKey or @Index annotations. Â In this example a composite
Primary key of both attributes `id` and `symbol` will be created.

EXAMPLE 2
```js
    @Store(type="rdbms", jdbc.url="jdbc:mysql://localhost:3306/das", username="root", password="root" , jdbc.driver.name="org.h2.Driver",field.length="symbol:100")
    @PrimaryKey("symbol")
    @Index("symbol")
    define table StockTable (symbol string, price float, volume long);
    define stream InputStream (symbol string, volume long);
    from InputStream as a join StockTable as b on str:contains(b.symbol, a.symbol)
    select a.symbol as symbol, b.volume as volume
    insert into FooStream;
```
The above example creates an event table named `StockTable` in the
database if it does not already exist (with three attributes named
`symbol`, `price`, and `volume` of the types `string`, `float`
and `long` respectively). Then the table is joined with a stream named
`InputStream` based on a condition. The following operations are
included in the condition: [ AND, OR, Comparisons( < <= > >= ==
!=), IS NULL, NOT, str:contains(Table< Column />, Stream< Attribute /> or
Search.String)]

EXAMPLE 3
```js
    @Store(type="rdbms", jdbc.url="jdbc:mysql://localhost:3306/das", table.name="StockTable", username="root", password="root" , jdbc.driver.name="org.h2.Driver", field.length="symbol:100", table.check.query="SELECT 1 FROM StockTable LIMIT 1")
    @PrimaryKey("symbol")
    @Index("symbol")
    define table StockTable (symbol string, price float, volume long);
    define stream InputStream (symbol string, volume long);
    from InputStream as a join StockTable as b on str:contains(b.symbol, a.symbol)
    select a.symbol as symbol, b.volume as volume
    insert into FooStream;
```
The above example creates an event table named `StockTable` in the
database if it does not already exist (with three attributes named
`symbol`, `price`, and `volume` of the types `string`, `float`
and `long` respectively). Then the table is joined with a stream named
`InputStream` based on a condition. The following operations are
included in the condition: [ AND, OR, Comparisons( < <= > >= ==
!=), IS NULL, NOT, str:contains(Table< Column />, Stream< Attribute /> or
Search.String)]

### redis (Store)

This extension assigns data source and connection instructions to event
tables. It also implements read write operations on connected
datasource. This extension only can be used to read the data which
persisted using the same extension since unique implementation has been
used to map the relational data in to redis's key and value
representation

Syntax
```js
    @Store(type="redis", table.name="<STRING>", cluster.mode="<BOOL>", nodes="<STRING>", ttl.seconds="<LONG>", ttl.on.update="<BOOL>", ttl.on.read="<BOOL>")
    @PrimaryKey("PRIMARY_KEY")
    @Index("INDEX")
```
QUERY PARAMETERS

| Name          | Description                                                                                                                                                                                                                                                                                                  | Default Value                           | Possible Data Types | Optional | Dynamic |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|---------------------|----------|---------|
| table.name    | The name with which the event table should be persisted in the store. If noname is specified via this parameter, the event table is persisted with the same name as the Stream App table.                                                                                                                        | The tale name defined in the stream processor app | STRING              | Yes      | No      |
| cluster.mode  | This will decide the redis mode. if this is false, client will connect to a single redis node.                                                                                                                                                                                                               | false                                   | BOOL                | No       | No      |
| nodes         | host, port and the password of the node(s).In single node mode node details can be provided as follows- "node=`hosts:port\@password`\ In clustered mode host and port of all the master nodes should be provided separated by a comma(,). As an example "nodes = `localhost:30001,localhost:30002`". | localhost:6379\@root                    | STRING              | Yes      | No      |
| ttl.seconds   | Time to live in seconds for each record                                                                                                                                                                                                                                                                      | -1                                      | LONG                | Yes      | No      |
| ttl.on.update | Set ttl on row update                                                                                                                                                                                                                                                                                        | false                                   | BOOL                | Yes      | No      |
| ttl.on.read   | Set ttl on read rows                                                                                                                                                                                                                                                                                         | false                                   | BOOL                | Yes      | No      |

EXAMPLE 1
```js
    @store(type='redis',nodes='localhost:6379@root',table.name='fooTable',cluster.mode=false)define table fooTable(time long, date String)
```
Above example will create a redis table with the name fooTable and work
on asingle redis node.

EXAMPLE 2
```js
    @Store(type='redis', table.name='SweetProductionTable', nodes='localhost:30001,localhost:30002,localhost:30003', cluster.mode='true')
    @primaryKey('symbol')
    @index('price')
    define table SweetProductionTable (symbol string, price float, volume long);
```
Above example demonstrate how to use the redis extension to connect in
to redis cluster. Please note that, as nodes all the master node's host
and port should be provided in order to work correctly. In clustered
node password will not besupported

EXAMPLE 3
```js
    @store(type='redis',nodes='localhost:6379@root',table.name='fooTable', ttl.seconds='30', ttl.onUpdate='true', ttl.onRead='true')define table fooTable(time long, date String)
```
Above example will create a redis table with the name fooTable and work
on asingle redis node. All rows inserted, updated or read will have its
ttl set to 30 seconds

Str
---

### groupConcat (Aggregate Function)

This function aggregates the received events by concatenating the keys
in those events using a separator, e.g.,a comma (,) or a hyphen (-), and
returns the concatenated key string.

Syntax
```js
    <STRING> str:groupConcat(<STRING> key)
    <STRING> str:groupConcat(<STRING> key, <STRING> ...)
    <STRING> str:groupConcat(<STRING> key, <STRING> separator, <BOOL> distinct)
    <STRING> str:groupConcat(<STRING> key, <STRING> separator, <BOOL> distinct, <STRING> order)
```
QUERY PARAMETERS

| Name      | Description                                                                                                                      | Default Value | Possible Data Types | Optional | Dynamic |
|-----------|----------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| key       | The string that needs to be aggregated.                                                                                          |               | STRING              | No       | Yes     |
| separator | The separator that separates each string key after concatenating the keys.                                                       | ,             | STRING              | Yes      | Yes     |
| distinct  | This is used to only have distinct values in the concatenated string that is returned.                                           | false         | BOOL                | Yes      | Yes     |
| order     | This parameter accepts `ASC` or `DESC` strings to sort the string keys in either ascending or descending order respectively. | No order      | STRING              | Yes      | Yes     |

EXAMPLE 1
```js
    from InputStream#window.time(5 min)
    select str:groupConcat("key") as groupedKeys
    input OutputStream;
```
When we input events having values for the `key` as `'A'`, `'B'`, `'S'`,
`'C'`, `'A'`, it returns `"A,B,S,C,A"` to the `OutputStream`.

EXAMPLE 2
```js
    from InputStream#window.time(5 min)
    select groupConcat("key","-",true,"ASC") as groupedKeys
    input OutputStream;
```
When we input events having values for the `key` as `'A'`, `'B'`, `'S'`,
`'C'`, `'A'`, specify the seperator as hyphen and choose the order to be
ascending, the function returns `"A-B-C-S"` to the `OutputStream`.

### charAt (Function)

This function returns the `char` value that is present at the given
index position. of the input string.

Syntax
```js
    <STRING> str:charAt(<STRING> input.value, <INT> index)
```
QUERY PARAMETERS

| Name        | Description                                                                          | Default Value | Possible Data Types | Optional | Dynamic |
|-------------|--------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| input.value | The input string of which the char value at the given position needs to be returned. |               | STRING              | No       | Yes     |
| index       | The variable that specifies the index of the char value that needs to be returned.   |               | INT                 | No       | Yes     |

EXAMPLE 1
```js
    charAt("gdn", 1)
```
In this case, the functiion returns the character that exists at index
1. Hence, it returns `S`.

### charFrequency (Function)

Gives the frequency of a char in `input string`.

Syntax
```js
    <LONG> str:charFrequency(<STRING> input.string, <STRING> char)
```
QUERY PARAMETERS

| Name         | Description                                        | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|----------------------------------------------------|---------------|---------------------|----------|---------|
| input.string | The input string to be processed.                  |               | STRING              | No       | Yes     |
| char         | The char's number of occurrences to be calculated |               | STRING              | No       | Yes     |

EXAMPLE 1

    str:charFrequency("gdn,ABM,NSFT", ",")

This counts the number of occurrences of `,` in the given
`input.string`. In this scenario, the output will is `2`.

### coalesce (Function)

This returns the first input parameter value of the given argument, that
is not null.

Syntax
```js
    <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> str:coalesce(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg, <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> ...)
```
QUERY PARAMETERS

| Name | Description                                                                                                                           | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|---------------------------------------------------------------------------------------------------------------------------------------|---------------|------------------------------------------|----------|---------|
| arg  | It can have one or more input parameters in any data type. However, all the specified parameters are required to be of the same type. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

EXAMPLE 1
```js
    coalesce(null, "BBB", "CCC")
```
This returns the first input parameter that is not null. In this
example, it returns "BBB".

### concat (Function)

This function returns a string value that is obtained as a result of
concatenating two or more input string values.

Syntax
```js
    <STRING> str:concat(<STRING> arg, <STRING> ...)
```
QUERY PARAMETERS

| Name | Description                                               | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------------------------------|---------------|---------------------|----------|---------|
| arg  | This can have two or more `string` type input parameters. |               | STRING              | No       | Yes     |

EXAMPLE 1
```js
    concat("D533", "8JU^", "XYZ")
```
This returns a string value by concatenating two or more given
arguments. In the example shown above, it returns "D5338JU\^XYZ".

### contains (Function)

This function returns `true` if the`input.string` contains the specified
sequence of char values in the `search.string`.

Syntax
```js
    <BOOL> str:contains(<STRING> input.string, <STRING> search.string)
```
QUERY PARAMETERS

| Name          | Description                                                | Default Value | Possible Data Types | Optional | Dynamic |
|---------------|------------------------------------------------------------|---------------|---------------------|----------|---------|
| input.string  | Input string value.                                        |               | STRING              | No       | Yes     |
| search.string | The string value to be searched for in the `input.string`. |               | STRING              | No       | Yes     |

EXAMPLE 1
```js
    contains("21 products are produced by gdn currently", "gdn")
```
This returns a boolean value as the output. In this case, it
returns`true`.

### equalsIgnoreCase (Function)

This returns a boolean value by comparing two strings lexicographically
without considering the letter case.

Syntax
```js
    <BOOL> str:equalsIgnoreCase(<STRING> arg1, <STRING> arg2)
```
QUERY PARAMETERS

| Name | Description                                                                 | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| arg1 | The first input string argument.                                            |               | STRING              | No       | Yes     |
| arg2 | The second input string argument. This is compared with the first argument. |               | STRING              | No       | Yes     |

EXAMPLE 1
```js
    equalsIgnoreCase("gdn", "gdn")
```
This returns a boolean value as the output. In this scenario, it returns
"true".

### fillTemplate (Function)

fillTemplate(string, map) will replace all the keys in the string using
values in the map. fillTemplate(string, r1, r2 ..) replace all the
entries {{1}}, {{2}}, {{3}} with r1 , r2, r3.

Syntax
```js
    <STRING> str:fillTemplate(<STRING> template, <STRING|INT|LONG|DOUBLE|FLOAT|BOOL> replacement.type, <STRING|INT|LONG|DOUBLE|FLOAT|BOOL> ...)
    <STRING> str:fillTemplate(<STRING> template, <OBJECT> map)
```
QUERY PARAMETERS

| Name             | Description                                                                                                                                                                                                                                                                                                                                | Default Value | Possible Data Types               | Optional | Dynamic |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| template         | The string with templated fields that needs to be filled with the given strings. The format of the templated fields should be as follows: {{KEY}} where `KEY` is a STRING if you are using fillTemplate(string, map) {{KEY}} where `KEY` is an INT if you are using fillTemplate(string, r1, r2 ..) This KEY is used to map the values |               | STRING                            | No       | Yes     |
| replacement.type | A set of arguments with any type string\|int\|long\|double\|float\|bool.                                                                                                                                                                                                                                                                   | \-            | STRING INT LONG DOUBLE FLOAT BOOL | Yes      | Yes     |
| map              | A map with key-value pairs to be replaced.                                                                                                                                                                                                                                                                                                 | \-            | OBJECT                            | Yes      | Yes     |

EXAMPLE 1
```js
    str:fillTemplate("{{prize}} > 100 && {{salary}} < 10000", map:create('prize', 300, 'salary', 10000))
```
In this example, the template is `{{prize}} > 100 && {{salary}} <
10000`.Here, the templated string {{prize}} is replaced with the value
corresponding to the `prize` key in the given map. Likewise salary
replace with the salary value of the map

EXAMPLE 2
```js
    str:fillTemplate("{{1}} > 100 && {{2}} < 10000", 200, 300)
```
In this example, the template is `{{1}} > 100 && {{2}} <
10000`.Here, the templated string {{1}} is replaced with the
corresponding 1st value 200. Likewise {{2}} replace with the 300

### hex (Function)

This function returns a hexadecimal string by converting each byte of
each character in the input string to two hexadecimal digits.

Syntax
```js
    <STRING> str:hex(<STRING> input.string)
```
QUERY PARAMETERS

| Name         | Description                                       | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|---------------------------------------------------|---------------|---------------------|----------|---------|
| input.string | The input string to derive the hexadecimal value. |               | STRING              | No       | Yes     |

EXAMPLE 1
```js
    hex("MySQL")
```
This returns the hexadecimal value of the input.string. In this
scenario, the output is "4d7953514c".

### length (Function)

Returns the length of the input string.

Syntax
```js
    <INT> str:length(<STRING> input.string)
```
QUERY PARAMETERS

| Name         | Description                            | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|----------------------------------------|---------------|---------------------|----------|---------|
| input.string | The input string to derive the length. |               | STRING              | No       | Yes     |

EXAMPLE 1
```js
    length("Hello World")
```
This outputs the length of the provided string. In this scenario, the,
output is `11` .

### lower (Function)

Converts the capital letters in the input string to the equivalent
simple letters.

Syntax
```js
    <STRING> str:lower(<STRING> input.string)
```
QUERY PARAMETERS

| Name         | Description                                                                      | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|----------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| input.string | The input string to convert to the lower case (i.e., equivalent simple letters). |               | STRING              | No       | Yes     |

EXAMPLE 1
```js
    lower("gdn cep ")
```
This converts the capital letters in the input.string to the equivalent
simple letters. In this scenario, the output is "gdn cep ".

### regexp (Function)

Returns a boolean value based on the matchability of the input string
and the given regular expression.

Syntax
```js
    <BOOL> str:regexp(<STRING> input.string, <STRING> regex)
```
QUERY PARAMETERS

| Name         | Description                                                  | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|--------------------------------------------------------------|---------------|---------------------|----------|---------|
| input.string | The input string to match with the given regular expression. |               | STRING              | No       | Yes     |
| regex        | The regular expression to be matched with the input string.  |               | STRING              | No       | Yes     |

EXAMPLE 1
```js
    regexp("gdn abcdh", "GDN(.*h)")
```

This returns a boolean value after matching regular expression with the
given string. In this scenario, it returns "true" as the output.

### repeat (Function)

Repeats the input string for a specified number of times.

Syntax
```js
    <STRING> str:repeat(<STRING> input.string, <INT> times)
```
QUERY PARAMETERS

| Name         | Description                                                                   | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|-------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| input.string | The input string that is repeated the number of times as defined by the user. |               | STRING              | No       | Yes     |
| times        | The number of times the input.string needs to be repeated .                   |               | INT                 | No       | Yes     |

EXAMPLE 1
```js
    repeat("StRing 1", 3)
```
This returns a string value by repeating the string for a specified
number of times. In this scenario, the output is "StRing 1StRing
1StRing 1".

### replaceAll (Function)

Finds all the substrings of the input string that matches with the given
expression, and replaces them with the given replacement string.

Syntax
```js
    <STRING> str:replaceAll(<STRING> input.string, <STRING> regex, <STRING> replacement.string)
```
QUERY PARAMETERS

| Name               | Description                                                                                | Default Value | Possible Data Types | Optional | Dynamic |
|--------------------|--------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| input.string       | The input string to be replaced.                                                           |               | STRING              | No       | Yes     |
| regex              | The regular expression to be matched with the input string.                                |               | STRING              | No       | Yes     |
| replacement.string | The string with which each substring that matches the given expression should be replaced. |               | STRING              | No       | Yes     |

EXAMPLE 1
```js
    replaceAll("hello hi hello",  'hello', 'test')
```
This returns a string after replacing the substrings of the input string
with the replacement string. In this scenario, the output is "test hi
test" .

### replaceFirst (Function)

Finds the first substring of the input string that matches with the
given regular expression, and replaces itwith the given replacement
string.

Syntax
```js
    <STRING> str:replaceFirst(<STRING> input.string, <STRING> regex, <STRING> replacement.string)
```
QUERY PARAMETERS

| Name               | Description                                                                                                       | Default Value | Possible Data Types | Optional | Dynamic |
|--------------------|-------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| input.string       | The input string that should be replaced.                                                                         |               | STRING              | No       | Yes     |
| regex              | The regular expression with which the input string should be matched.                                             |               | STRING              | No       | Yes     |
| replacement.string | The string with which the first substring of input string that matches the regular expression should be replaced. |               | STRING              | No       | Yes     |

EXAMPLE 1
```js
    replaceFirst("hello gdn A hello",  'gdn(.*)A', 'XXXX')
```

This returns a string after replacing the first substring with the given
replacement string. In this scenario, the output is "hello XXXX
hello".

### reverse (Function)

Returns the input string in the reverse order character-wise and
string-wise.

Syntax
```js
    <STRING> str:reverse(<STRING> input.string)
```
QUERY PARAMETERS

| Name         | Description                      | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|----------------------------------|---------------|---------------------|----------|---------|
| input.string | The input string to be reversed. |               | STRING              | No       | Yes     |

EXAMPLE 1
```js
    reverse("Hello World")
```
This outputs a string value by reversing the incoming `input.string`. In
this scenario, the output is "dlroW olleH".

### split (Function)

Splits the `input.string` into substrings using the value parsed in the
`split.string` and returns the substring at the position specified in
the `group.number`.

Syntax
```js
    <STRING> str:split(<STRING> input.string, <STRING> split.string, <INT> group.number)
```
QUERY PARAMETERS

| Name         | Description                                              | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|----------------------------------------------------------|---------------|---------------------|----------|---------|
| input.string | The input string to be replaced.                         |               | STRING              | No       | Yes     |
| split.string | The string value to be used to split the `input.string`. |               | STRING              | No       | Yes     |
| group.number | The index of the split group                             |               | INT                 | No       | Yes     |

EXAMPLE 1
```js
    split("gdn,ABM,NSFT", ",", 0)
```
This splits the given `input.string` by given `split.string` and returns
the string in the index given by group.number. In this scenario, the
output will is "gdn".

### strcmp (Function)

Compares two strings lexicographically and returns an integer value. If
both strings are equal, 0 is returned. If the first string is
lexicographically greater than the second string, a positive value is
returned. If the first string is lexicographically greater than the
second string, a negative value is returned.

Syntax
```js
    <INT> str:strcmp(<STRING> arg1, <STRING> arg2)
```
QUERY PARAMETERS

| Name | Description                                                                                         | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| arg1 | The first input string argument.                                                                    |               | STRING              | No       | Yes     |
| arg2 | The second input string argument that should be compared with the first argument lexicographically. |               | STRING              | No       | Yes     |

EXAMPLE 1
```js
    strcmp("AbCDefghiJ KLMN", 'Hello')
```
This compares two strings lexicographically and outputs an integer
value.

### substr (Function)

Returns a substring of the input string by considering a subset or all
of the following factors: starting index, length, regular expression,
and regex group number.

Syntax
```js
    <STRING> str:substr(<STRING> input.string, <INT> begin.index)
    <STRING> str:substr(<STRING> input.string, <INT> begin.index, <INT> length)
    <STRING> str:substr(<STRING> input.string, <STRING> regex)
    <STRING> str:substr(<STRING> input.string, <STRING> regex, <INT> group.number)
```
QUERY PARAMETERS

| Name         | Description                                                          | Default Value                             | Possible Data Types | Optional | Dynamic |
|--------------|----------------------------------------------------------------------|-------------------------------------------|---------------------|----------|---------|
| input.string | The input string to be processed.                                    |                                           | STRING              | No       | Yes     |
| begin.index  | Starting index to consider for the substring.                        | \-                                        | INT                 | Yes      | Yes     |
| length       | The length of the substring.                                         | \`input.string\`.length - \`begin.index\` | INT                 | Yes      | Yes     |
| regex        | The regular expression that should be matched with the input string. | \-                                        | STRING              | Yes      | Yes     |
| group.number | The regex group number                                               | 0                                         | INT                 | Yes      | Yes     |

EXAMPLE 1
```js
    substr("AbCDefghiJ KLMN", 4)
```
This outputs the substring based on the given `begin.index`. In this
scenario, the output is "efghiJ KLMN".

EXAMPLE 2
```js
    substr("AbCDefghiJ KLMN",  2, 4)
```
This outputs the substring based on the given `begin.index` and length.
In this scenario, the output is "CDef".

EXAMPLE 3
```js
    substr("gdnD efghiJ KLMN", '^gdn(.*)')
```

This outputs the substring by applying the regex. In this scenario, the
output is "gdnD efghiJ KLMN".

EXAMPLE 4
```js
    substr("gdn cep gdn XX E hi hA gdn heAllo",  'gdn(.*)A(.*)',  2)
```
This outputs the substring by applying the regex and considering the
`group.number`. In this scenario, the output is " ello".

### trim (Function)

Returns a copy of the input string without the leading and trailing
whitespace (if any).

Syntax
```js
    <STRING> str:trim(<STRING> input.string)
```
QUERY PARAMETERS

| Name         | Description                                | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|--------------------------------------------|---------------|---------------------|----------|---------|
| input.string | The input string that needs to be trimmed. |               | STRING              | No       | Yes     |

EXAMPLE 1
```js
    trim("  AbCDefghiJ KLMN  ")
```
This returns a copy of the `input.string` with the leading and/or
trailing white-spaces omitted. In this scenario, the output is
"AbCDefghiJ KLMN".

### unhex (Function)

Returns a string by converting the hexadecimal characters in the input
string.

Syntax
```js
    <STRING> str:unhex(<STRING> input.string)
```
QUERY PARAMETERS

| Name         | Description                                                        | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|--------------------------------------------------------------------|---------------|---------------------|----------|---------|
| input.string | The hexadecimal input string that needs to be converted to string. |               | STRING              | No       | Yes     |

EXAMPLE 1
```js
    unhex("4d7953514c")
```
This converts the hexadecimal value to string.

### upper (Function)

Converts the simple letters in the input string to the equivalent
capital/block letters.

Syntax
```js
    <STRING> str:upper(<STRING> input.string)
```
QUERY PARAMETERS

| Name         | Description                                                                                     | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|-------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| input.string | The input string that should be converted to the upper case (equivalent capital/block letters). |               | STRING              | No       | Yes     |

EXAMPLE 1
```js
    upper("Hello World")
```
This converts the simple letters in the `input.string` to theequivalent
capital letters. In this scenario, the output is "HELLO WORLD".

### tokenize (Stream Processor)

This function splits the input string into tokens using a given regular
expression and returns the split tokens.

Syntax
```js
    str:tokenize(<STRING> input.string, <STRING> regex)
    str:tokenize(<STRING> input.string, <STRING> regex, <BOOL> distinct)
```
QUERY PARAMETERS

| Name         | Description                                                      | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|------------------------------------------------------------------|---------------|---------------------|----------|---------|
| input.string | The input string which needs to be split.                        |               | STRING              | No       | Yes     |
| regex        | The string value which is used to tokenize the `input.string`. |               | STRING              | No       | Yes     |
| distinct     | This flag is used to return only distinct values.                | false         | BOOL                | Yes      | Yes     |

Extra Return Attributes

| Name  | Description                                  | Possible Types |
|-------|----------------------------------------------|----------------|
| token | The attribute which contains a single token. | STRING         |

EXAMPLE 1
```js
    define stream inputStream (str string);
    @info(name = 'query1')
    from inputStream#str:tokenize(str , ',')
    select token
    insert into outputStream;
```
This query performs tokenization on the given string. If the str is
"Android,Windows8,iOS", then the string is split into 3 events
containing the `token` attribute values, i.e., `Android`, `Windows8` and
`iOS`.

Time
----

### currentDate (Function)

Function returns the system time in `yyyy-MM-dd` format.

Syntax
```js
    <STRING> time:currentDate()
```
EXAMPLE 1
```js
    time:currentDate()
```
Returns the current date in the `yyyy-MM-dd` format, such as
`2019-06-21`.

### currentTime (Function)

Function returns system time in the `HH:mm:ss` format.

Syntax
```js
    <STRING> time:currentTime()
```
EXAMPLE 1
```js
    time:currentTime()
```
Returns the current date in the `HH:mm:ss` format, such as `15:23:24`.

### currentTimestamp (Function)

When no argument is provided, function returns the system current
timestamp in `yyyy-MM-dd HH:mm:ss` format, and when a timezone is
provided as an argument, it converts and return the current system time
to the given timezone format.

Syntax
```js
    <STRING> time:currentTimestamp()
    <STRING> time:currentTimestamp(<STRING> timezone)
```
QUERY PARAMETERS

| Name     | Description                                                                                                                                                                                                    | Default Value   | Possible Data Types | Optional | Dynamic |
|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|---------------------|----------|---------|
| timezone | The timezone to which the current time need to be converted. For example, `Asia/Kolkata`, `PST`. Get the supported timezone IDs from \[here\](https://docs.oracle.com/javase/8/docs/api/java/time/ZoneId.html) | System timezone | STRING              | Yes      | No      |

EXAMPLE 1
```js
    time:currentTimestamp()
```
Returns current system time in `yyyy-MM-dd HH:mm:ss` format, such as
`2019-03-31 14:07:00`.

EXAMPLE 2
```js
    time:currentTimestamp('Asia/Kolkata')
```
Returns current system time converted to `Asia/Kolkata` timezone
`yyyy-MM-dd HH:mm:ss` format, such as `2019-03-31 19:07:00`. Get the
supported timezone IDs from
[here](https://docs.oracle.com/javase/8/docs/api/java/time/ZoneId.html)

EXAMPLE 3
```js
    time:currentTimestamp('CST')
```
Returns current system time converted to `CST` timezone
`yyyy-MM-dd HH:mm:ss` format, such as `2019-03-31 02:07:00`. Get the
supported timezone IDs from
[here](https://docs.oracle.com/javase/8/docs/api/java/time/ZoneId.html)

### date (Function)

Extracts the date part of a date or date-time and return it in
`yyyy-MM-dd` format.

Syntax
```js
    <STRING> time:date(<STRING> date.value, <STRING> date.format)
    <STRING> time:date(<STRING> date.value)
```
QUERY PARAMETERS

| Name        | Description                                                                                  | Default Value               | Possible Data Types | Optional | Dynamic |
|-------------|----------------------------------------------------------------------------------------------|-----------------------------|---------------------|----------|---------|
| date.value  | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`. |                             | STRING              | No       | Yes     |
| date.format | The format of the date value provided. For example, `yyyy/MM/dd HH:mm:ss.SSS`.               | \`yyyy-MM-dd HH:mm:ss.SSS\` | STRING              | Yes      | Yes     |

EXAMPLE 1
```js
    time:date('2014/11/11 13:23:44', 'yyyy/MM/dd HH:mm:ss')
```
Extracts the date and returns `2014-11-11`.

EXAMPLE 2
```js
    time:date('2014-11-23 13:23:44.345')
```
Extracts the date and returns `2014-11-13`.

EXAMPLE 3
```js
    time:date('13:23:44', 'HH:mm:ss')
```
Extracts the date and returns `1970-01-01`.

### dateAdd (Function)

Adds the specified time interval to a date.

Syntax
```js
    <STRING> time:dateAdd(<STRING> date.value, <INT> expr, <STRING> unit)
    <STRING> time:dateAdd(<LONG> timestamp.in.milliseconds, <INT> expr, <STRING> unit)
    <STRING> time:dateAdd(<STRING> date.value, <INT> expr, <STRING> unit, <STRING> date.format)
```
QUERY PARAMETERS

| Name                      | Description                                                                                                                                 | Default Value               | Possible Data Types | Optional | Dynamic |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|---------------------|----------|---------|
| date.value                | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`.                                                | \-                          | STRING              | Yes      | Yes     |
| expr                      | The amount by which the selected part of the date should be incremented. For example `2` ,`5 `,`10`, etc.                                   |                             | INT                 | No       | Yes     |
| unit                      | This is the part of the date that needs to be modified. For example, `MINUTE`, `HOUR`, `MONTH`, `YEAR`, `QUARTER`, `WEEK`, `DAY`, `SECOND`. |                             | STRING              | No       | No      |
| date.format               | The format of the date value provided. For example, `yyyy-MM-dd HH:mm:ss.SSS`.                                                              | \`yyyy-MM-dd HH:mm:ss.SSS\` | STRING              | Yes      | Yes     |
| timestamp.in.milliseconds | The date value in milliseconds. For example, `1415712224000L`.                                                                              | \-                          | LONG                | Yes      | Yes     |

EXAMPLE 1
```js
    time:dateAdd('2014-11-11 13:23:44.657', 5, 'YEAR', 'yyyy-MM-dd HH:mm:ss.SSS')
```
Adds five years to the given date value and returns
`2019-11-11 13:23:44.657`.

EXAMPLE 2
```js
    time:dateAdd('2014-11-11 13:23:44.657', 5, 'YEAR')
```
Adds five years to the given date value and returns
`2019-11-11 13:23:44.657` using the default date.format
`yyyy-MM-dd HH:mm:ss.SSS`.

EXAMPLE 3
```js
    time:dateAdd( 1415712224000L, 1, 'HOUR')
```
Adds one hour and `1415715824000` as a `string`.

### dateDiff (Function)

Returns difference between two dates in days.

Syntax
```js
    <INT> time:dateDiff(<STRING> date.value1, <STRING> date.value2, <STRING> date.format1, <STRING> date.format2)
    <INT> time:dateDiff(<STRING> date.value1, <STRING> date.value2)
    <INT> time:dateDiff(<LONG> timestamp.in.milliseconds1, <LONG> timestamp.in.milliseconds2)
```
QUERY PARAMETERS

| Name                       | Description                                                                                                    | Default Value               | Possible Data Types | Optional | Dynamic |
|----------------------------|----------------------------------------------------------------------------------------------------------------|-----------------------------|---------------------|----------|---------|
| date.value1                | The value of the first date parameter. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`.   | \-                          | STRING              | Yes      | Yes     |
| date.value2                | The value of the second date parameter. For example, `2014-11-11 13:23:44.657`, `2014-11-11` , `13:23:44.657`. | \-                          | STRING              | Yes      | Yes     |
| date.format1               | The format of the first date value provided. For example, `yyyy-MM-dd HH:mm:ss.SSS`.                           | \`yyyy-MM-dd HH:mm:ss.SSS\` | STRING              | Yes      | Yes     |
| date.format2               | The format of the second date value provided. For example, `yyyy-MM-dd HH:mm:ss.SSS`.                          | \`yyyy-MM-dd HH:mm:ss.SSS\` | STRING              | Yes      | Yes     |
| timestamp.in.milliseconds1 | The first date value in milliseconds from the epoch. For example, `1415712224000L`.                            | \-                          | LONG                | Yes      | Yes     |
| timestamp.in.milliseconds2 | The second date value in milliseconds from the epoch. For example, `1415712224000L`.                           | \-                          | LONG                | Yes      | Yes     |

EXAMPLE 1
```js
    time:dateDiff('2014-11-11 13:23:44', '2014-11-9 13:23:44', 'yyyy-MM-dd HH:mm:ss', 'yyyy-MM-dd HH:mm:ss')
```
Returns the date difference between the two given dates as `2`.

EXAMPLE 2
```js
    time:dateDiff('2014-11-13 13:23:44', '2014-11-9 13:23:44')
```
Returns the date difference between the two given dates as `4`.

EXAMPLE 3
```js
    time:dateDiff(1415692424000L, 1412841224000L)
```
Returns the date difference between the two given dates as `33`.

### dateFormat (Function)

Formats the data in string or milliseconds format to the given date
format.

Syntax
```js
    <STRING> time:dateFormat(<STRING> date.value, <STRING> date.target.format, <STRING> date.source.format)
    <STRING> time:dateFormat(<STRING> date.value, <STRING> date.target.format)
    <STRING> time:dateFormat(<LONG> timestamp.in.milliseconds, <STRING> date.target.format)
```
QUERY PARAMETERS

| Name                      | Description                                                                                                 | Default Value               | Possible Data Types | Optional | Dynamic |
|---------------------------|-------------------------------------------------------------------------------------------------------------|-----------------------------|---------------------|----------|---------|
| date.value                | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`.                | \-                          | STRING              | Yes      | Yes     |
| date.target.format        | The format of the date into which the date value needs to be converted. For example, `yyyy/MM/dd HH:mm:ss`. |                             | STRING              | No       | Yes     |
| date.source.format        | The format input date.value.For example, `yyyy-MM-dd HH:mm:ss.SSS`.                                         | \`yyyy-MM-dd HH:mm:ss.SSS\` | STRING              | Yes      | Yes     |
| timestamp.in.milliseconds | The date value in milliseconds from the epoch. For example, `1415712224000L`.                               | \-                          | LONG                | Yes      | Yes     |

EXAMPLE 1
```js
    time:dateFormat('2014/11/11 13:23:44', 'mm:ss', 'yyyy/MM/dd HH:mm:ss')
```
Converts date based on the target date format `mm:ss` and returns
`23:44`.

EXAMPLE 2
```js
    time:dateFormat('2014-11-11 13:23:44', 'HH:mm:ss')
```
Converts date based on the target date format `HH:mm:ss` and returns
`13:23:44`.

EXAMPLE 3
```js
    time:dateFormat(1415692424000L, 'yyyy-MM-dd')
```
Converts date in millisecond based on the target date format
`yyyy-MM-dd` and returns `2014-11-11`.

### dateSub (Function)

Subtracts the specified time interval from the given date.

Syntax
```js
    <STRING> time:dateSub(<STRING> date.value, <INT> expr, <STRING> unit)
    <STRING> time:dateSub(<STRING> date.value, <INT> expr, <STRING> unit, <STRING> date.format)
    <STRING> time:dateSub(<LONG> timestamp.in.milliseconds, <INT> expr, <STRING> unit)
```
QUERY PARAMETERS

| Name                      | Description                                                                                                                                 | Default Value               | Possible Data Types | Optional | Dynamic |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|---------------------|----------|---------|
| date.value                | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`.                                                | \-                          | STRING              | Yes      | Yes     |
| expr                      | The amount by which the selected part of the date should be decremented. For example `2` ,`5 `,`10`, etc.                                   |                             | INT                 | No       | Yes     |
| unit                      | This is the part of the date that needs to be modified. For example, `MINUTE`, `HOUR`, `MONTH`, `YEAR`, `QUARTER`, `WEEK`, `DAY`, `SECOND`. |                             | STRING              | No       | No      |
| date.format               | The format of the date value provided. For example, `yyyy-MM-dd HH:mm:ss.SSS`.                                                              | \`yyyy-MM-dd HH:mm:ss.SSS\` | STRING              | Yes      | Yes     |
| timestamp.in.milliseconds | The date value in milliseconds. For example, `1415712224000L`.                                                                              | \-                          | LONG                | Yes      | Yes     |

EXAMPLE 1
```js
    time:dateSub('2019-11-11 13:23:44.657', 5, 'YEAR', 'yyyy-MM-dd HH:mm:ss.SSS')
```
Subtracts five years to the given date value and returns
`2014-11-11 13:23:44.657`.

EXAMPLE 2
```js
    time:dateSub('2019-11-11 13:23:44.657', 5, 'YEAR')
```
Subtracts five years to the given date value and returns
`2014-11-11 13:23:44.657` using the default date.format
`yyyy-MM-dd HH:mm:ss.SSS`.

EXAMPLE 3
```js
    time:dateSub( 1415715824000L, 1, 'HOUR')
```
Subtracts one hour and `1415712224000` as a `string`.

### dayOfWeek (Function)

Extracts the day on which a given date falls.

Syntax
```js
    <STRING> time:dayOfWeek(<STRING> date.value, <STRING> date.format)
    <STRING> time:dayOfWeek(<STRING> date.value)
```
QUERY PARAMETERS

| Name        | Description                                                                                  | Default Value               | Possible Data Types | Optional | Dynamic |
|-------------|----------------------------------------------------------------------------------------------|-----------------------------|---------------------|----------|---------|
| date.value  | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`. |                             | STRING              | No       | Yes     |
| date.format | The format of the date value provided. For example, `yyyy/MM/dd HH:mm:ss.SSS`.               | \`yyyy-MM-dd HH:mm:ss.SSS\` | STRING              | Yes      | Yes     |

EXAMPLE 1
```js
    time:date('2014/12/11 13:23:44', 'yyyy/MM/dd HH:mm:ss')
```
Extracts the date and returns `Thursday`.

EXAMPLE 2
```js
    time:date('2014-11-11 13:23:44.345')
```
Extracts the date and returns `Tuesday`.

### extract (Function)

Function extracts a date unit from the date.

Syntax
```js
    <INT> time:extract(<STRING> unit, <STRING> date.value)
    <INT> time:extract(<STRING> unit, <STRING> date.value, <STRING> date.format)
    <INT> time:extract(<STRING> unit, <STRING> date.value, <STRING> date.format, <STRING> locale)
    <INT> time:extract(<LONG> timestamp.in.milliseconds, <STRING> unit)
    <INT> time:extract(<LONG> timestamp.in.milliseconds, <STRING> unit, <STRING> locale)
```
QUERY PARAMETERS

| Name                      | Description                                                                                                                                 | Default Value                                           | Possible Data Types | Optional | Dynamic |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------|---------------------|----------|---------|
| unit                      | This is the part of the date that needs to be modified. For example, `MINUTE`, `HOUR`, `MONTH`, `YEAR`, `QUARTER`, `WEEK`, `DAY`, `SECOND`. |                                                         | STRING              | No       | No      |
| date.value                | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`.                                                | \-                                                      | STRING              | Yes      | Yes     |
| date.format               | The format of the date value provided. For example, `yyyy-MM-dd HH:mm:ss.SSS`.                                                              | \`yyyy-MM-dd HH:mm:ss.SSS\`                             | STRING              | Yes      | Yes     |
| timestamp.in.milliseconds | The date value in milliseconds. For example, `1415712224000L`.                                                                              | \-                                                      | LONG                | Yes      | Yes     |
| locale                    | Represents a specific geographical, political or cultural region. For example `en_US` and `fr_FR`                                           | Current default locale set in the Java Virtual Machine. | STRING              | Yes      | No      |

EXAMPLE 1
```js
    time:extract('YEAR', '2019/11/11 13:23:44.657', 'yyyy/MM/dd HH:mm:ss.SSS')
```
Extracts the year amount and returns `2019`.

EXAMPLE 2
```js
    time:extract('DAY', '2019-11-12 13:23:44.657')
```
Extracts the day amount and returns `12`.

EXAMPLE 3
```js
    time:extract(1394556804000L, 'HOUR')
```
Extracts the hour amount and returns `22`.

### timestampInMilliseconds (Function)

Returns the system time or the given time in milliseconds.

Syntax
```js
    <LONG> time:timestampInMilliseconds()
    <LONG> time:timestampInMilliseconds(<STRING> date.value, <STRING> date.format)
    <LONG> time:timestampInMilliseconds(<STRING> date.value)
```
QUERY PARAMETERS

| Name        | Description                                                                                  | Default Value               | Possible Data Types | Optional | Dynamic |
|-------------|----------------------------------------------------------------------------------------------|-----------------------------|---------------------|----------|---------|
| date.value  | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`. | Current system time         | STRING              | Yes      | Yes     |
| date.format | The format of the date value provided. For example, `yyyy/MM/dd HH:mm:ss.SSS`.               | \`yyyy-MM-dd HH:mm:ss.SSS\` | STRING              | Yes      | Yes     |

EXAMPLE 1
```js
    time:timestampInMilliseconds()
```
Returns the system current time in milliseconds.

EXAMPLE 2
```js
    time:timestampInMilliseconds('2007-11-30 10:30:19', 'yyyy-MM-DD HH:MM:SS')
```
Converts `2007-11-30 10:30:19` in `yyyy-MM-DD HH:MM:SS` format to
milliseconds as `1170131400019`.

EXAMPLE 3
```js
    time:timestampInMilliseconds('2007-11-30 10:30:19.000')
```
Converts `2007-11-30 10:30:19` in `yyyy-MM-DD HH:MM:ss.SSS` format to
milliseconds as `1196398819000`.

### utcTimestamp (Function)

Function returns the system current time in UTC timezone with
`yyyy-MM-dd HH:mm:ss` format.

Syntax
```js
    <STRING> time:utcTimestamp()
```
EXAMPLE 1
```js
    time:utcTimestamp()
```
Returns the system current time in UTC timezone with
`yyyy-MM-dd HH:mm:ss` format, and a sample output will be like
`2019-07-03 09:58:34`.

Unique
------

### deduplicate (Stream Processor)

Removes duplicate events based on the `unique.key` parameter that arrive
within the `time.interval` gap from one another.

Syntax
```js
    unique:deduplicate(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> time.interval)
```
QUERY PARAMETERS

| Name          | Description                                                            | Default Value | Possible Data Types               | Optional | Dynamic |
|---------------|------------------------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| unique.key    | Parameter to uniquely identify events.                                 |               | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| time.interval | The sliding time period within which the duplicate events are dropped. |               | INT LONG                          | No       | No      |

EXAMPLE 1
```js
    define stream TemperatureStream (sensorId string, temperature double)

    from TemperatureStream#unique:deduplicate(sensorId, 30 sec)
    select *
    insert into UniqueTemperatureStream;
```
Query that removes duplicate events of `TemperatureStream` stream based
on `sensorId` attribute when they arrive within 30 seconds.

### ever (Window)

Window that retains the latest events based on a given unique keys. When
a new event arrives with the same key it replaces the one that exist in
the window.

This function is not recommended to be used when the
maximum number of unique attributes are undefined, as there is a risk of
system going out to memory.

Syntax
```js
    unique:ever(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key)
    unique:ever(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG|FLOAT|BOOL|DOUBLE|STRING> ...)
```
QUERY PARAMETERS

| Name       | Description                                   | Default Value | Possible Data Types               | Optional | Dynamic |
|------------|-----------------------------------------------|---------------|-----------------------------------|----------|---------|
| unique.key | The attribute used to checked for uniqueness. |               | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |

EXAMPLE 1
```js
    define stream LoginEvents (timestamp long, ip string);

    from LoginEvents#window.unique:ever(ip)
    select count(ip) as ipCount
    insert events into UniqueIps;
```
Query collects all unique events based on the `ip` attribute by
retaining the latest unique events from the `LoginEvents` stream. Then
the query counts the unique `ip`s arrived so far and outputs the
`ipCount` via the `UniqueIps` stream.

EXAMPLE 2
```js
    define stream DriverChangeStream (trainID string, driver string);

    from DriverChangeStream#window.unique:ever(trainID)
    select trainID, driver
    insert expired events into PreviousDriverChangeStream;
```
Query collects all unique events based on the `trainID` attribute by
retaining the latest unique events from the `DriverChangeStream` stream.
The query outputs the previous unique event stored in the window as the
expired events are emitted via `PreviousDriverChangeStream` stream.

EXAMPLE 3
```js
    define stream StockStream (symbol string, price float);
    define stream PriceRequestStream(symbol string);

    from StockStream#window.unique:ever(symbol) as s join PriceRequestStream as p
    on s.symbol == p.symbol
    select s.symbol as symbol, s.price as price
    insert events into PriceResponseStream;
```
Query stores the last unique event for each `symbol` attribute of
`StockStream` stream, and joins them with events arriving on the
`PriceRequestStream` for equal `symbol` attributes to fetch the latest
`price` for each requested `symbol` and output via `PriceResponseStream`
stream.

### externalTimeBatch (Window)

This is a batch (tumbling) time window that is determined based on an
external time, i.e., time stamps that are specified via an attribute in
the events. It holds the latest unique events that arrived during the
last window time period. The unique events are determined based on the
value for a specified unique key parameter. When a new event arrives
within the time window with a value for the unique key parameter that is
the same as that of an existing event in the window, the existing event
expires and it is replaced by the new event.

Syntax
```js
    unique:externalTimeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <LONG> time.stamp, <INT|LONG> window.time)
    unique:externalTimeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <LONG> time.stamp, <INT|LONG> window.time, <INT> start.time)
    unique:externalTimeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <LONG> time.stamp, <INT|LONG> window.time, <INT> start.time, <INT|LONG> time.out)
    unique:externalTimeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <LONG> time.stamp, <INT|LONG> window.time, <INT> start.time, <INT|LONG> time.out, <BOOL> replace.time.stamp.with.batch.end.time)
```
QUERY PARAMETERS

| Name                                   | Description                                                                                                                             | Default Value                                                                         | Possible Data Types               | Optional | Dynamic |
|----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|-----------------------------------|----------|---------|
| unique.key                             | The attribute that should be checked for uniqueness.                                                                                    |                                                                                       | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| time.stamp                             | The time which the window determines as the current time and acts upon. The value of this parameter should be monotonically increasing. |                                                                                       | LONG                              | No       | Yes     |
| window.time                            | The sliding time period for which the window should hold events.                                                                        |                                                                                       | INT LONG                          | No       | No      |
| start.time                             | This specifies an offset in milliseconds in order to start the window at a time different to the standard time.                         | Timestamp of first event                                                              | INT                               | Yes      | No      |
| time.out                               | Time to wait for arrival of a new event, before flushing and returning the output for events belonging to a specific batch.             | The system waits till an event from the next batch arrives to flush the current batch | INT LONG                          | Yes      | No      |
| replace.time.stamp.with.batch.end.time | Replaces the `timestamp` value with the corresponding batch end time stamp.                                                           | false                                                                                 | BOOL                              | Yes      | No      |

EXAMPLE 1
```js
    define stream LoginEvents (timestamp long, ip string);

    from LoginEvents#window.unique:externalTimeBatch(ip, timestamp, 1 sec, 0, 2 sec)
    select timestamp, ip, count() as total
    insert into UniqueIps ;
```
In this query, the window holds the latest unique events that arrive
from the `LoginEvent` stream during each second. The latest events are
determined based on the external time stamp. At a given time, all the
events held in the window have unique values for the `ip` and
monotonically increasing values for `timestamp` attributes. The events
in the window are inserted into the `UniqueIps` output stream. The
system waits for 2 seconds for the arrival of a new event before
flushing the current batch.

### first (Window)

This is a window that holds only the first set of unique events
according to the unique key parameter. When a new event arrives with a
key that is already in the window, that event is not processed by the
window.

Syntax
```js
    unique:first(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key)
    unique:first(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG|FLOAT|BOOL|DOUBLE|STRING> ...)
```
QUERY PARAMETERS

| Name       | Description                                                                                                                                                            | Default Value | Possible Data Types               | Optional | Dynamic |
|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| unique.key | The attribute that should be checked for uniqueness. If there is more than one parameter to check for uniqueness, it can be specified as an array separated by commas. |               | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |

EXAMPLE 1
```js
    define stream LoginEvents (timeStamp long, ip string);

    from LoginEvents#window.unique:first(ip)
    insert into UniqueIps ;
```
This returns the first set of unique items that arrive from the
`LoginEvents` stream, and returns them to the `UniqueIps` stream.
The unique events are only those with a unique value for the `ip`
attribute.

### firstLengthBatch (Window)

This is a batch (tumbling) window that holds a specific number of unique
events (depending on which events arrive first). The unique events are
selected based on a specific parameter that is considered as the unique
key. When a new event arrives with a value for the unique key parameter
that matches the same of an existing event in the window, that event is
not processed by the window.

Syntax
```js
    unique:firstLengthBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT> window.length)
```
QUERY PARAMETERS

| Name          | Description                                          | Default Value | Possible Data Types               | Optional | Dynamic |
|---------------|------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| unique.key    | The attribute that should be checked for uniqueness. |               | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| window.length | The number of events the window should tumble.       |               | INT                               | No       | No      |

EXAMPLE 1
```js
    define window CseEventWindow (symbol string, price float, volume int)

    from CseEventStream#window.unique:firstLengthBatch(symbol, 10)
    select symbol, price, volume
    insert all events into OutputStream ;
```
The window in this configuration holds the first unique events from the
`CseEventStream` stream every second, and outputs them all into the
the `OutputStream` stream. All the events in a window during a given
second should have a unique value for the `symbol` attribute.

### firstTimeBatch (Window)

A batch-time or tumbling window that holds the unique events according
to the unique key parameters that have arrived within the time period of
that window and gets updated for each such time window. When a new event
arrives with a key which is already in the window, that event is not
processed by the window.

Syntax
```js
    unique:firstTimeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time)
    unique:firstTimeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time, <INT|LONG> start.time)
```
QUERY PARAMETERS

| Name        | Description                                                                                                     | Default Value                 | Possible Data Types               | Optional | Dynamic |
|-------------|-----------------------------------------------------------------------------------------------------------------|-------------------------------|-----------------------------------|----------|---------|
| unique.key  | The attribute that should be checked for uniqueness.                                                            |                               | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| window.time | The sliding time period for which the window should hold events.                                                |                               | INT LONG                          | No       | No      |
| start.time  | This specifies an offset in milliseconds in order to start the window at a time different to the standard time. | Timestamp of the first event. | INT LONG                          | Yes      | No      |

EXAMPLE 1
```js
    define stream CseEventStream (symbol string, price float, volume int)

    from CseEventStream#window.unique:firstTimeBatch(symbol,1 sec)
     select symbol, price, volume
    insert all events into OutputStream ;
```
This holds the first unique events that arrive from the
`cseEventStream` input stream during each second, based on the
symbol,as a batch, and returns all the events to the `OutputStream`.

### length (Window)

This is a sliding length window that holds the events of the latest
window length with the unique key and gets updated for the expiry and
arrival of each event. When a new event arrives with the key that is
already there in the window, then the previous event expires and new
event is kept within the window.

Syntax
```js
    unique:length(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT> window.length)
```
QUERY PARAMETERS

| Name          | Description                                                              | Default Value | Possible Data Types               | Optional | Dynamic |
|---------------|--------------------------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| unique.key    | The attribute that should be checked for uniqueness.                     |               | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| window.length | The number of events that should be included in a sliding length window. |               | INT                               | No       | No      |

EXAMPLE 1
```js
    define stream CseEventStream (symbol string, price float, volume int)

    from CseEventStream#window.unique:length(symbol,10)
    select symbol, price, volume
    insert all events into OutputStream;
```
In this configuration, the window holds the latest 10 unique events. The
latest events are selected based on the symbol attribute. If the
`CseEventStream` receives an event for which the value for the symbol
attribute is the same as that of an existing event in the window, the
existing event is replaced by the new event. All the events are returned
to the `OutputStream` event stream once an event expires or is added
to the window.

### lengthBatch (Window)

This is a batch (tumbling) window that holds a specified number of
latest unique events. The unique events are determined based on the
value for a specified unique key parameter. The window is updated for
every window length, i.e., for the last set of events of the specified
number in a tumbling manner. When a new event arrives within the window
length having the same value for the unique key parameter as an existing
event in the window, the previous event is replaced by the new event.

Syntax
```js
    unique:lengthBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT> window.length)
```
QUERY PARAMETERS

| Name          | Description                                          | Default Value | Possible Data Types               | Optional | Dynamic |
|---------------|------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| unique.key    | The attribute that should be checked for uniqueness. |               | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| window.length | The number of events the window should tumble.       |               | INT                               | No       | No      |

EXAMPLE 1
```js
    define window CseEventWindow (symbol string, price float, volume int)

     from CseEventStream#window.unique:lengthBatch(symbol, 10)
    select symbol, price, volume
    insert expired events into OutputStream ;
```
In this query, the window at any give time holds the last 10 unique
events from the `CseEventStream` stream. Each of the 10 events within
the window at a given time has a unique value for the symbol attribute.
If a new event has the same value for the symbol attribute as an
existing event within the window length, the existing event expires and
it is replaced by the new event. The query returns expired individual
events as well as expired batches of events to the `OutputStream`
stream.

### time (Window)

This is a sliding time window that holds the latest unique events that
arrived during the previous time window. The unique events are
determined based on the value for a specified unique key parameter. The
window is updated with the arrival and expiry of each event. When a new
event that arrives within a window time period has the same value for
the unique key parameter as an existing event in the window, the
previous event is replaced by the new event.

Syntax
```js
    unique:time(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time)
```
QUERY PARAMETERS

| Name        | Description                                                      | Default Value | Possible Data Types               | Optional | Dynamic |
|-------------|------------------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| unique.key  | The attribute that should be checked for uniqueness.             |               | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| window.time | The sliding time period for which the window should hold events. |               | INT LONG                          | No       | No      |

EXAMPLE 1
```js
    define stream CseEventStream (symbol string, price float, volume int)

    from CseEventStream#window.unique:time(symbol, 1 sec)
    select symbol, price, volume
    insert expired events into OutputStream ;
```
In this query, the window holds the latest unique events that arrived
within the last second from the `CseEventStream`, and returns the
expired events to the `OutputStream` stream. During any given second,
each event in the window should have a unique value for the `symbol`
attribute. If a new event that arrives within the same second has the
same value for the symbol attribute as an existing event in the window,
the existing event expires.

### timeBatch (Window)

This is a batch (tumbling) time window that is updated with the latest
events based on a unique key parameter. If a new event that arrives
within the time period of a windowhas a value for the key parameter
which matches that of an existing event, the existing event expires and
it is replaced by the latest event.

Syntax
```js
    unique:timeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time)
    unique:timeBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time, <INT|LONG> start.time)
```
QUERY PARAMETERS

| Name        | Description                                                                                                     | Default Value            | Possible Data Types               | Optional | Dynamic |
|-------------|-----------------------------------------------------------------------------------------------------------------|--------------------------|-----------------------------------|----------|---------|
| unique.key  | The attribute that should be checked for uniqueness.                                                            |                          | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| window.time | The tumbling time period for which the window should hold events.                                               |                          | INT LONG                          | No       | No      |
| start.time  | This specifies an offset in milliseconds in order to start the window at a time different to the standard time. | Timestamp of first event | INT LONG                          | Yes      | No      |

EXAMPLE 1
```js
    define stream CseEventStream (symbol string, price float, volume int)

    from CseEventStream#window.unique:timeBatch(symbol, 1 sec)
    select symbol, price, volume
    insert all events into OutputStream ;
```
This window holds the latest unique events that arrive from the
`CseEventStream` at a given time, and returns all the events to the
`OutputStream` stream. It is updated every second based on the latest
values for the `symbol` attribute.

### timeLengthBatch (Window)

This is a batch or tumbling time length window that is updated with the
latest events based on a unique key parameter. The window tumbles upon
the elapse of the time window, or when a number of unique events have
arrived. If a new event that arrives within the period of the window has
a value for the key parameter which matches the value of an existing
event, the existing event expires and it is replaced by the new event.

Syntax
```js
    unique:timeLengthBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time, <INT> window.length)
    unique:timeLengthBatch(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> window.time, <INT|LONG> start.time, <INT> window.length)
```
QUERY PARAMETERS

| Name          | Description                                                                                                     | Default Value            | Possible Data Types               | Optional | Dynamic |
|---------------|-----------------------------------------------------------------------------------------------------------------|--------------------------|-----------------------------------|----------|---------|
| unique.key    | The attribute that should be checked for uniqueness.                                                            |                          | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| window.time   | The sliding time period for which the window should hold the events.                                            |                          | INT LONG                          | No       | No      |
| start.time    | This specifies an offset in milliseconds in order to start the window at a time different to the standard time. | Timestamp of first event | INT LONG                          | Yes      | No      |
| window.length | The number of events the window should tumble.                                                                  |                          | INT                               | No       | No      |

EXAMPLE 1
```js
    define stream CseEventStream (symbol string, price float, volume int)

    from CseEventStream#window.unique:timeLengthBatch(symbol, 1 sec, 20)
    select symbol, price, volume
    insert all events into OutputStream;
```
This window holds the latest unique events that arrive from the
`CseEventStream` at a given time, and returns all the events to the
`OutputStream` stream. It is updated every second based on the latest
values for the `symbol` attribute.

Unitconversion
--------------

### MmTokm (Function)

This converts the input given in megameters into kilometers.

Syntax
```js
    <DOUBLE> unitconversion:MmTokm(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                           | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from megameters into kilometers. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:MmTokm(1)
```
The megameter value `1` is converted into kilometers as `1000.0` .

### cmToft (Function)

This converts the input given in centimeters into feet.

Syntax
```js
    <DOUBLE> unitconversion:cmToft(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                      | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from centimeters into feet. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:cmToft(100)
```
The centimeters value `100` is converted into feet as `3.280` .

### cmToin (Function)

This converts the input given in centimeters into inches.

Syntax
```js
    <DOUBLE> unitconversion:cmToin(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from centimeters into inches. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:cmToin(100)
```
Input centimeters value `100` is converted into inches as `39.37`.

### cmTokm (Function)

This converts the input value given in centimeters into kilometers.

Syntax
```js
    <DOUBLE> unitconversion:cmTokm(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                            | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from centimeters into kilometers. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:cmTokm(100)
```
The centimeters value `100` is converted into kilometers as `0.001`.

### cmTom (Function)

This converts the input given in centimeters into meters.

Syntax
```js
    <DOUBLE> unitconversion:cmTom(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from centimeters into meters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:cmTom(100)
```
The centimeters value `100` is converted into meters as `1.0` .

### cmTomi (Function)

This converts the input given in centimeters into miles.

Syntax
```js
    <DOUBLE> unitconversion:cmTomi(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                       | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from centimeters into miles. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:cmTomi(10000)
```
The centimeters value `10000` is converted into miles as `0.062` .

### cmTomm (Function)

This converts the input given in centimeters into millimeters.

Syntax
```js
    <DOUBLE> unitconversion:cmTomm(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                             | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from centimeters into millimeters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:cmTomm(1)
```
The centimeter value `1` is converted into millimeters as `10.0` .

### cmTonm (Function)

This converts the input given in centimeters into nanometers.

Syntax
```js
    <DOUBLE> unitconversion:cmTonm(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                            | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from centimeters into nanometers. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:cmTonm(1)
```
The centimeter value `1` is converted into nanometers as `10000000`
.

### cmToum (Function)

This converts the input in centimeters into micrometers.

Syntax
```js
    <DOUBLE> unitconversion:cmToum(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                             | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from centimeters into micrometers. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:cmToum(100)
```
The centimeters value `100` is converted into micrometers as
`1000000.0` .

### cmToyd (Function)

This converts the input given in centimeters into yards.

Syntax
```js
    <DOUBLE> unitconversion:cmToyd(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                       | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from centimeters into yards. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:cmToyd(1)
```
The centimeter value `1` is converted into yards as `0.01` .

### dToh (Function)

This converts the input given in days into hours.

Syntax
```js
    <DOUBLE> unitconversion:dToh(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from days into hours. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:dToh(1)
```
The day value `1` is converted into hours as `24.0`.

### gTokg (Function)

This converts the input given in grams into kilograms.

Syntax
```js
    <DOUBLE> unitconversion:gTokg(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from grams into kilograms. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:gTokg(1000)
```
The grams value `1000` is converted into kilogram as `1.0` .

### gTomg (Function)

This converts the input given in grams into milligrams.

Syntax
```js
    <DOUBLE> unitconversion:gTomg(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                      | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from grams into milligrams. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:gTomg(1)
```
The gram value `1` is converted into milligrams as `1000.0` .

### gToug (Function)

This converts the input given in grams into micrograms.

Syntax
```js
    <DOUBLE> unitconversion:gToug(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                      | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from grams into micrograms. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:gToug(1)
```
The gram value `1` is converted into micrograms as `1000000.0` .

### hTom (Function)

This converts the input given in hours into minutes.

Syntax
```js
    <DOUBLE> unitconversion:hTom(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                   | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from hours into minutes. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:hTom(1)
```
The hour value `1` is converted into minutes as `60.0` .

### hTos (Function)

This converts the input given in hours into seconds.

Syntax
```js
    <DOUBLE> unitconversion:hTos(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                   | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from hours into seconds. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:hTos(1)
```
The hour value `1` is converted into seconds as `3600.0`.

### kgToLT (Function)

This converts the input given in kilograms into imperial tons.

Syntax
```js
    <DOUBLE> unitconversion:kgToLT(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                             | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilograms into imperial tons. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:kgToLT(1000)
```
The kilograms value `1000` is converted into imperial tons as
`0.9842` .

### kgToST (Function)

This converts the input given in kilograms into US tons.

Syntax
```js
    <DOUBLE> unitconversion:kgToST(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                       | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilograms into US tons. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:kgToST(1000)
```
The kilograms value `1000` is converted into US tons as `1.10` .

### kgTog (Function)

This converts the input given in kilograms into grams.

Syntax
```js
    <DOUBLE> unitconversion:kgTog(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilograms into grams. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:kgTog(1)
```
The kilogram value `1` is converted into grams as `1000`.

### kgTolb (Function)

This converts the input given in kilograms into pounds.

Syntax
```js
    <DOUBLE> unitconversion:kgTolb(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                      | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilograms into pounds. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:kgTolb(1)
```
The kilogram value `1` is converted into pounds as `2.2` .

### kgTooz (Function)

This converts the input given in kilograms into ounces.

Syntax
```js
    <DOUBLE> unitconversion:kgTooz(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                      | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilograms into ounces. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:kgTooz(1)
```
The kilogram value `1` is converted into ounces as ` 35.274` .

### kgTost (Function)

This converts the input given in kilograms into imperial stones.

Syntax
```js
    <DOUBLE> unitconversion:kgTost(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                               | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilograms into imperial stones. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:kgTost(1)
```
The kilogram value `1` is converted into imperial stones as `0.157`
.

### kgTot (Function)

This converts the input given in kilograms into tonnes.

Syntax
```js
    <DOUBLE> unitconversion:kgTot(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                      | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilograms into tonnes. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:kgTot(1)
```
The kilogram value `1` is converted into tonnes as `0.001` .

### kmTocm (Function)

This converts the input given in kilometers into centimeters.

Syntax
```js
    <DOUBLE> unitconversion:kmTocm(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                            | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilometers into centimeters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:kmTocm(1)
```
The kilometer value `1` is converted into centimeters as `100000.0`
.

### kmToft (Function)

This converts the input given in kilometers into feet.

Syntax
```js
    <DOUBLE> unitconversion:kmToft(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilometers into feet. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:kmToft(1)
```
The kilometer value `1` is converted into feet as `3280.8` .

### kmToin (Function)

This converts the input given in kilometers into inches.

Syntax
```js
    <DOUBLE> unitconversion:kmToin(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                       | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilometers into inches. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:kmToin(1)
```
The kilometer value `1` is converted into inches as `39370.08` .

### kmTom (Function)

This converts the input given in kilometers into meters.

Syntax
```js
    <DOUBLE> unitconversion:kmTom(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                       | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilometers into meters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:kmTom(1)
```
The kilometer value `1` is converted into meters as `1000.0` .

### kmTomi (Function)

This converts the input given in kilometers into miles.

Syntax
```js
    <DOUBLE> unitconversion:kmTomi(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                      | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilometers into miles. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:kmTomi(1)
```
The kilometer value `1` is converted into miles as `0.621` .

### kmTomm (Function)

This converts the input given in kilometers into millimeters.

Syntax
```js
    <DOUBLE> unitconversion:kmTomm(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                            | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilometers into millimeters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:kmTomm(1)
```
The kilometer value `1` is converted into millimeters as `1000000.0`
.

### kmTonm (Function)

This converts the input given in kilometers into nanometers.

Syntax
```js
    <DOUBLE> unitconversion:kmTonm(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                           | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilometers into nanometers. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:kmTonm(1)
```
The kilometer value `1` is converted into nanometers as
`1000000000000.0` .

### kmToum (Function)

This converts the input given in kilometers into micrometers.

Syntax
```js
    <DOUBLE> unitconversion:kmToum(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                            | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilometers into micrometers. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:kmToum(1)
```
The kilometer value `1` is converted into micrometers as
`1000000000.0` .

### kmToyd (Function)

This converts the input given in kilometers into yards.

Syntax
```js
    <DOUBLE> unitconversion:kmToyd(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                      | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilometers into yards. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:kmToyd(1)
```
The kilometer value `1` is converted into yards as `1093.6` .

### lTom3 (Function)

This converts the input given in liters into cubic meters.

Syntax
```js
    <DOUBLE> unitconversion:lTom3(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                         | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from liters into cubic meters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:lTom3(1000)
```
The liters value `1000` is converted into cubic meters as `1` .

### lToml (Function)

This converts the input given in liters into milliliters.

Syntax
```js
    <DOUBLE> unitconversion:lToml(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from liters into milliliters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:lToml(1)
```
The liter value `1` is converted into milliliters as `1000.0` .

### m3Tol (Function)

This converts the input given in cubic meters into liters.

Syntax
```js
    <DOUBLE> unitconversion:m3Tol(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                   | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from meters into liters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:m3Tol(1)
```
The cubic meter value `1` is converted into liters as `1000.0` .

### mTocm (Function)

This converts the input given in meters into centimeters.

Syntax
```js
    <DOUBLE> unitconversion:mTocm(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from meters into centimeters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:mTocm(1)
```
The meter value `1` is converted to centimeters as `100.0` .

### mToft (Function)

This converts the input given in meters into feet.

Syntax
```js
    <DOUBLE> unitconversion:mToft(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                 | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from meters into feet. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:mToft(1)
```
The meter value `1` is converted into feet as `3.280` .

### mTomm (Function)

This converts the input given in meters into millimeters.

Syntax
```js
    <DOUBLE> unitconversion:mTomm(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from meters into millimeters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:mTomm(1)
```
The meter value `1` is converted into millimeters as `1000.0` .

### mTos (Function)

This converts the input given in minutes into seconds.

Syntax
```js
    <DOUBLE> unitconversion:mTos(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from minutes into seconds. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:mTos(1)
```
The minute value `1` is converted into seconds as `60.0` .

### mToyd (Function)

This converts the input given in meters into yards.

Syntax
```js
    <DOUBLE> unitconversion:mToyd(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from meters into yards. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:mToyd(1)
```
The meter value `1` is converted into yards as `1.093` .

### miTokm (Function)

This converts the input given in miles into kilometers.

Syntax
```js
    <DOUBLE> unitconversion:miTokm(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                      | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from miles into kilometers. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:miTokm(1)
```
The mile value `1` is converted into kilometers as `1.6` .

### mlTol (Function)

This converts the input given in milliliters into liters.

Syntax
```js
    <DOUBLE> unitconversion:mlTol(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from milliliters into liters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:mlTol(1000)
```
The milliliters value `1000` is converted into liters as `1`.

### sToms (Function)

This converts the input given in seconds into milliseconds.

Syntax
```js
    <DOUBLE> unitconversion:sToms(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                          | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from seconds into milliseconds. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:sToms(1)
```
The second value `1` is converted into milliseconds as `1000.0` .

### sTons (Function)

This converts the input given in seconds into nanoseconds.

Syntax
```js
    <DOUBLE> unitconversion:sTons(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                         | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from seconds into nanoseconds. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:sTons(1)
```
The second value `1` is converted into nanoseconds as `1000000000.0`
.

### sTous (Function)

This converts the input given in seconds into microseconds.

Syntax
```js
    <DOUBLE> unitconversion:sTous(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                          | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from seconds into microseconds. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:sTous(1)
```
The second value `1` is converted into microseconds as `1000000.0` .

### tTog (Function)

This converts the input given in tonnes into grams.

Syntax
```js
    <DOUBLE> unitconversion:tTog(<INT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value that needs to be converted from Tonnes into grams. |               | INT DOUBLE          | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:tTog(1)
```
The tonne value `1` is converted into grams as `1000000.0` .

### tTokg (Function)

This converts the input given in tonnes into kilograms.

Syntax
```js
    <DOUBLE> unitconversion:tTokg(<INT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                      | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value that needs to be converted from tonnes into kilograms. |               | INT DOUBLE          | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:tTokg(inValue)
```
The tonne value is converted into kilograms as `1000.0` .

### yTod (Function)

This converts the given input in years into days.

Syntax
```js
    <DOUBLE> unitconversion:yTod(<INT|LONG|FLOAT|DOUBLE> p1)
```
QUERY PARAMETERS

| Name | Description                                                | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from years into days. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

EXAMPLE 1
```js
    unitconversion:yTod(1)
```
The year value `1` is converted into days as `365.2525` .