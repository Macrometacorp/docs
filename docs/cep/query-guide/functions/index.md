---
sidebar_position: 12
title: Functions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section lists all the stream worker functions provided by Macrometa GDN and explains how they work.

Functions are pre-configured operations that can consumes zero, or more parameters and always produce a single value as result. It can be used anywhere an attribute can be used.

## Purpose

Functions encapsulate pre-configured reusable execution logic allowing users to execute the logic anywhere just by calling the function.

Functions allow you to:

- Use different data sources.
- Use different sinks, such as GDN Streams, Kafka, and ActiveMQ.
- Appropriate format mapping, such as JSON or CSV.
- Perform different kinds of processing, such as math, string, statistics, and geospatial.
- Aggregate data.
- Write logical expressions.

## Syntax

The syntax of function is:

```sql
<function name>( <parameter>* )
```

Here `<function name>` uniquely identifies the function. The `<parameter>` defined input parameters the function can accept. The input parameters can be attributes, constant values, results of other functions, results of mathematical or logical expressions, or time values. The number and type of parameters a function accepts depend on the function itself.

:::note
Functions, mathematical expressions, and logical expressions can be used in a nested manner.
:::

## Core Functions

| Function | Description |
|----------|-------------|
| and	     | Returns the results of AND operation for all the events.|
| avg	     | Calculates the average for all the events.|
| cast	     | Converts the first parameter according to the cast.to parameter.|
| coalesce	     | Returns the value of the first input parameter that is not null, and all input parameters have to be on the same type.|
| convert	     | Converts the first input parameter according to the `convertedTo` parameter.|
| count	     | Returns the count of all the events.|
| createSet	     | Includes the given input parameter in a java.util.HashSet and returns the set.|
| currentTimeMillis	     | Returns the current timestamp of stream processor application in milliseconds.|
| default	     | Checks if the `attribute` parameter is null and if so returns the value of the `default` parameter.|
| distinctCount	     | This returns the count of distinct occurrences for a given arg.|
| eventTimestamp	     | Returns the timestamp of the processed event.|
| ifThenElse	     | Evaluates the `condition` parameter and returns value of the `if.expression`.|
| instanceOfBoolean	     | Checks whether the parameter is an instance of Boolean or not.|
| instanceOfDouble	     | Checks whether the parameter is an instance of Double or not.|
| instanceOfFloat	     | Checks if the parameter is an instance of Float or not.|
| instanceOfInteger	     | Checks whether the parameter is an instance of Integer or not.|
| instanceOfLong	     | Checks whether the parameter is an instance of Long or not.|
| instanceOfString	     | Checks whether the parameter is an instance of String or not.|
| log	     | Logs the message on the given priority with or without the processed event.|
| max	     | Returns the maximum value for all the events.|
| maxForever	     | This is the attribute aggregator to store the maximum value for a given attribute.|
| maximum	     | Returns the maximum value of the input parameters.|
| min	     | Returns the minimum value for all the events.|
| minForever	     | This is the attribute aggregator to store the minimum value for a given attribute throughout the lifetime of the query regardless of any windows.|
| minimum	     | Returns the minimum value of the input parameters.|
| or	     | Returns the results of OR operation for all the events.|
| pol2Cart	     | The pol2Cart function calculating the cartesian coordinates x & y for the given theta.|
| sizeOfSet	     | Returns the size of an object of type java.util.Set.|
| stdDev	     | Returns the calculated standard deviation for all the events.|
| sum	     | Returns the sum for all the events.|
| unionSet	     | Union multiple sets.|
| uuid	     | Generates a UUID (Universally Unique Identifier).|

## Execution Functions

| Functions | Description |
|---------------------|-------------|
| Anonymizer	         | The Anonymizer function provides a function for anonymizing various data types. This function returns a fake value for anonymizing which matches the original data. For example, an email would be replaced with a fake email. |
| Cache	              | The `cache` function provides a persistent cache per tenant. |
| Context	            | This function provides useful environment properties such as current region where the Stream App is running.|
| Geo Spatial	        | This function provides geo data related functionality such as checking whether a given geo coordinate is within a predefined geo-fence, finding distance between two geo coordinates etc. |
| JSON	               | This function provides capability to retrieve, insert, and modify JSON elements. |
| List	               | This function provides capability to generate and manipulate list data objects.|
| Map	                | This function provides capability to generate and manipulate map (key-value) data objects.|
| Math	               | This function provides useful mathematical functions such as power, round, random, cos, log, etc. |
| Regex	              | This function provides basic RegEx execution capabilities such as `find`, `match`, etc. |
| Reorder	            | This function orders out-of-order event arrivals using algorithms such as K-Slack and alpha K-Stack.|
| Sentiment	          |This function performs sentiment analysis using AFINN Wordlist-based approach.|
| Streaming ML	       | This function provides streaming machine learning (clustering, classification and regression) on event streams. |
| Time	               | This function provides time related functionality such as getting current time, current date, manipulating/formatting dates, etc. |

## IO Functions

| Function     | Description|
| ------------ |-------------|
|Apache Kafka (beta)|This function receives and publishes events from/to Apache Kafka.|
|Google Pub-Sub | This an function that receives and publishes events from/to Google Pub/Sub.   |
|HTTP and HTTPS| The **http** function receives and publishes events via HTTP and HTTPS transports, calls external services, and serves incoming requests and provide synchronous responses. |
|MQTT|This function receives and publishes events to and from MQTT.|
|S3|This function allows to publish events to Amazon AWS S3 buckets.|
|SSE|This function receives and publishes events from SSE server.|

## Format Mapper Functions

| Function     | Description|
| ------------- |-------------|
|CSV|This function converts messages with CSV format to/from stream processor events.|
|JSON|This function converts JSON messages to/from stream processor events.|
|Key-Value|This function converts events having Key-Value maps to/from stream processor events.|
|Text|This function that converts text messages to/from stream processor events.|

## Example 1

Function name `add` accepting two input parameters, is called with an attribute named `input` and a constant value `75`.  

```sql
add(input, 75)
```

## Example 2

Function name `alertAfter` accepting two input parameters, is called with a time value of `1 hour and 25 minutes` and a mathematical addition operation of `startTime` + `56`.

```sql
add(1 hour and 25 minutes, startTime + 56)
```

## Example 3

Query that converts the `roomNo` to `string` using `convert` function, finds the maximum temperature reading with `maximum` function, and adds a unique `messageID` using the `UUID` function.

```sql
insert into RoomTempStream
select convert(roomNo, 'string') as roomNo,
       maximum(tempReading1, tempReading2) as temp,
       UUID() as messageID
from TempStream;
```

## Example 4

This stream worker with the name `TestFunctions` creates a stream named `FooStream`. This configuration for `SOURCE FooStream` performs input mapping using the JSON format Mapper function. For a single event, the input is required to be in following format:

```json
    {    
        "event":{        
            "symbol":"GDN",        
            "price":"55.6",        
            "volume":"100"    
        }
    }
```

On receiving the event, a query is executed that parses string data types using execution function (math) into required formats.
After that, the data gets inserted into Kafka `SINK` using Apache Kafka IO function.

```sql
@App:name('TestFunctions') 

CREATE SOURCE FooStream WITH (type='stream', topic='stock', map.type='json') (symbol string, price string, volume string);
CREATE SINK BarStream WITH (type='kafka', topic='topic_with_partitions', partition.no='0', bootstrap.servers='localhost:9092', map.type='json') (symbol string, price double, volume long);

@info(name = 'query1')
INSERT INTO BarStream
SELECT symbol, math:parseDouble(price), math:parseLong(volume) 
FROM FooStream;
```
