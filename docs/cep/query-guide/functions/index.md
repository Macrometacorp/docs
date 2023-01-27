---
sidebar_position: 12
title: Functions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section lists all the stream worker functions provided by Macrometa GDN and explains how they work.

Functions enhance Macrometa Stream QL, the language used to write stream workers, by seamlessly incorporating additional capabilities.
Macrometa Stream QL provides various in-built functions to access and manage event data according to our requirements. Functions can accept
zero or more parameters, perform actions and return the result.

Functions allow you to:

- Use different data sources.
- Use different sinks, such as GDN Streams, Kafka, and ActiveMQ.
- Appropriate format mapping, such as JSON, XML, or CSV.
- Different kinds of processing, such as math, string, statistics, and geospatial.
- Data aggregation.
- Write logical expressions.

## Core Functions

| Function | Description |
|----------|-------------|
| and	     | Returns the results of AND operation for all the events.|
| avg	     | Calculates the average for all the events.|
| batch	     | A window that holds an incoming events batch.|
| cast	     | Converts the first parameter according to the cast.to parameter.|
| coalesce	     | Returns the value of the first input parameter that is not null, and all input parameters have to be on the same type.|
| convert	     | Converts the first input parameter according to the `convertedTo` parameter.|
| count	     | Returns the count of all the events.|
| createSet	     | Includes the given input parameter in a java.util.HashSet and returns the set.|
| cron	     | This window outputs the arriving events as and when they arrive, and resets (expires) the window periodically based on the given cron expression.|
| currentTimeMillis	     | Returns the current timestamp of stream processor application in milliseconds.|
| default	     | Checks if the `attribute` parameter is null and if so returns the value of the `default` parameter.|
| delay	     | A delay window holds events for a specific time period that is regarded as a delay period before processing them.|
| distinctCount	     | This returns the count of distinct occurrences for a given arg.|
| eventTimestamp	     | Returns the timestamp of the processed event.|
| externalTime	     | A sliding time window based on external time.|
| externalTimeBatch	     | A batch (tumbling) time window based on external time.|
| ifThenElse	     | Evaluates the `condition` parameter and returns value of the `if.expression`.|
| instanceOfBoolean	     | Checks whether the parameter is an instance of Boolean or not.|
| instanceOfDouble	     | Checks whether the parameter is an instance of Double or not.|
| instanceOfFloat	     | Checks if the parameter is an instance of Float or not.|
| instanceOfInteger	     | Checks whether the parameter is an instance of Integer or not.|
| instanceOfLong	     | Checks whether the parameter is an instance of Long or not.|
| instanceOfString	     | Checks whether the parameter is an instance of String or not.|
| length	     | A sliding length window that holds the last `window.length` events at a given time, and gets updated for each arrival and expiration.|
| lengthBatch	     | A batch (tumbling) length window that holds and process a number of events as specified in the window.length.|
| log	     | Logs the message on the given priority with or without the processed event.|
| max	     | Returns the maximum value for all the events.|
| maxForever	     | This is the attribute aggregator to store the maximum value for a given attribute.|
| maximum	     | Returns the maximum value of the input parameters.|
| min	     | Returns the minimum value for all the events.|
| minForever	     | This is the attribute aggregator to store the minimum value for a given attribute throughout the lifetime of the query regardless of any windows.|
| minimum	     | Returns the minimum value of the input parameters.|
| or	     | Returns the results of OR operation for all the events.|
| pol2Cart	     | The pol2Cart function calculating the cartesian coordinates x & y for the given theta.|
| session	     | Holds events that belong to a session.|
| sizeOfSet	     | Returns the size of an object of type java.util.Set.|
| sort	     | This window holds a batch of events that equal the number specified as the windowLength and sorts them in the given order.|
| stdDev	     | Returns the calculated standard deviation for all the events.|
| sum	     | Returns the sum for all the events.|
| time	     | A sliding time window that holds events that arrived during the last windowTime period at a given time.|
| timeBatch	     | A batch (tumbling) time window that holds and process events that arrive during `window.time` period as a batch.|
| timeLength	     | A sliding time window that, at a given time holds the last window.length events.|
| unionSet	     | Union multiple sets.|
| uuid	     | Generates a UUID (Universally Unique Identifier).|

## Execution Function Types

| Functions | Description |
|---------------------|-------------|
| Context	            | This function provides useful environment properties such as current region where the Stream App is running.|
| Map	                | This function provides capability to generate and manipulate map (key-value) data objects.|
| JSON	               | This function provides capability to retrieve, insert, and modify JSON elements. |
| List	               | This function provides capability to generate and manipulate list data objects.|
| Math	               | This function provides useful mathematical functions such as power, round, random, cos, log, etc. |
| Regex	              | This function provides basic RegEx execution capabilities such as `find`, `match`, etc. |
| Reorder	            | This function orders out-of-order event arrivals using algorithms such as K-Slack and alpha K-Stack.|
| Time	               | This function provides time related functionality such as getting current time, current date, manipulating/formatting dates, etc. |
| Streaming ML	       | This function provides streaming machine learning (clustering, classification and regression) on event streams. |
| Anonymizer	         | The Anonymizer function provides a function for anonymizing various data types. This function returns a fake value for anonymizing which matches the original data. For example, an email would be replaced with a fake email. |
| Cache	              | The `cache` function provides a persistent cache per tenant. |
| Geo Spatial	        | This function provides geo data related functionality such as checking whether a given geo coordinate is within a predefined geo-fence, finding distance between 2 geo coordinates etc. |
| Sentiment	          |This function performs sentiment analysis using AFINN Wordlist-based approach.|

## IO Function Types

| Function     | Description|
| ------------ |-------------|
|Google Pub-Sub | This an function that receives and publishes events from/to Google Pub/Sub.                                                                                                      |
|HTTP and HTTPS| The **http** function receives and publishes events via HTTP and HTTPS transports, calls external services, and serves incoming requests and provide synchronous responses. |
|Apache Kafka (beta)|This function receives and publishes events from/to Apache Kafka.|
|MQTT|This function receives and publishes events to and from MQTT.|
|S3|This function allows to publish events to Amazon AWS S3 buckets.|
|SSE|This function receives and publishes events from SSE server.|

## Format Mappers Function Types

| Function     | Description|
| ------------- |-------------|
|JSON|This function converts JSON messages to/from stream processor events.|
|CSV|This function converts messages with CSV format to/from stream processor events.|
|Key-Value|This function converts events having Key-Value maps to/from stream processor events.|
|Text|This function that converts text messages to/from stream processor events.|

## Example

This stream application with the name `TestFunctions` creates a stream named `FooStream`. This configuration for `SOURCE FooStream` performs input mapping using
**JSON Format Mappers function**. For a single event, the input is required to be in following format:

    {    
        "event":{        
            "symbol":"GDN",        
            "price":"55.6",        
            "volume":"100"    
        }
    }

On receiving the event, a query is executed that parses string data types using execution function (math) into required formats.
After that, the data gets inserted into Kafka `SINK` using Apache Kafka IO function.

```sql
    @App:name('TestFunctions') 

    CREATE SOURCE FooStream WITH (type='stream', topic='stock', map.type='json') (symbol string, price string, volume string);

    @info(name = 'query1') 

    CREATE SINK BarStream WITH (type='kafka', topic='topic_with_partitions', partition.no='0', bootstrap.servers='localhost:9092', map.type='json') (symbol string, price double, volume long);

    insert into BarStream
    select symbol, math:parseDouble(price), math:parseLong(volume) 
    from FooStream;
```
