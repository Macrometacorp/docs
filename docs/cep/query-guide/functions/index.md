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

Functions allow you to :

- Use different data sources.
- Use different sinks, such as GDN Streams, Kafka, and ActiveMQ.
- Appropriate format mapping, such as JSON, XML or CSV.
- Different kinds of processing, such as math, string, statistics, and geospatial.
- Data aggregation.
- Write logical expressions

## Core Functions

| Function | Description |
|----------|-------------|
| and.md	     | Returns the results of AND operation for all the events.|
| avg.md	     | Calculates the average for all the events.|
| batch.md	     | A window that holds an incoming events batch.|
| cast.md	     | Converts the first parameter according to the cast.to parameter.|
| coalesce.md	     | Returns the value of the first input parameter that is not null, and all input parameters have to be on the same type.|
| convert.md	     | Converts the first input parameter according to the `convertedTo` parameter.|
| count.md	     | Returns the count of all the events.|
| createSet.md	     | Includes the given input parameter in a java.util.HashSet and returns the set.|
| cron.md	     | This window outputs the arriving events as and when they arrive, and resets (expires) the window periodically based on the given cron expression.|
| currentTimeMillis.md	     | Returns the current timestamp of stream processor application in milliseconds.|
| default.md	     | Checks if the `attribute` parameter is null and if so returns the value of the `default` parameter.|
| delay.md	     | A delay window holds events for a specific time period that is regarded as a delay period before processing them.|
| distinctCount.md	     | This returns the count of distinct occurrences for a given arg.|
| eventTimestamp.md	     | Returns the timestamp of the processed event.|
| externalTime.md	     | A sliding time window based on external time.|
| externalTimeBatch.md	     | A batch (tumbling) time window based on external time.|
| ifThenElse.md	     | Evaluates the `condition` parameter and returns value of the `if.expression`.|
| instanceOfBoolean.md	     | Checks whether the parameter is an instance of Boolean or not.|
| instanceOfDouble.md	     | Checks whether the parameter is an instance of Double or not.|
| instanceOfFloat.md	     | Checks if the parameter is an instance of Float or not.|
| instanceOfInteger.md	     | Checks whether the parameter is an instance of Integer or not.|
| instanceOfLong.md	     | Checks whether the parameter is an instance of Long or not.|
| instanceOfString.md	     | Checks whether the parameter is an instance of String or not.|
| length.md	     | A sliding length window that holds the last `window.length` events at a given time, and gets updated for each arrival and expiration.|
| lengthBatch.md	     | A batch (tumbling) length window that holds and process a number of events as specified in the window.length.|
| log.md	     | Logs the message on the given priority with or without the processed event.|
| max.md	     | Returns the maximum value for all the events.|
| maxForever.md	     | This is the attribute aggregator to store the maximum value for a given attribute.|
| maximum.md	     | Returns the maximum value of the input parameters.|
| min.md	     | Returns the minimum value for all the events.|
| minForever.md	     | This is the attribute aggregator to store the minimum value for a given attribute throughout the lifetime of the query regardless of any windows.|
| minimum.md	     | Returns the minimum value of the input parameters.|
| or.md	     | Returns the results of OR operation for all the events.|
| pol2Cart.md	     | The pol2Cart function calculating the cartesian coordinates x & y for the given theta.|
| session.md	     | Holds events that belong to a session.|
| sizeOfSet.md	     | Returns the size of an object of type java.util.Set.|
| sort.md	     | This window holds a batch of events that equal the number specified as the windowLength and sorts them in the given order.|
| stdDev.md	     | Returns the calculated standard deviation for all the events.|
| sum.md	     | Returns the sum for all the events.|
| time.md	     | A sliding time window that holds events that arrived during the last windowTime period at a given time.|
| timeBatch.md	     | A batch (tumbling) time window that holds and process events that arrive during `window.time` period as a batch.|
| timeLength.md	     | A sliding time window that, at a given time holds the last window.length events.|
| unionSet.md	     | Union multiple sets.|
| uuid.md	     | Generates a UUID (Universally Unique Identifier).|



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
|HTTP & HTTPS| The **http** function receives and publishes events via HTTP and HTTPS transports, calls external services, and serves incoming requests and provide synchronous responses. |
|Apache Kafka (beta)|This function receives and publishes events from/to Apache Kafka.|
|MQTT|This function receives and publishes events to and from MQTT.|
|S3|This function allows to publish events to Amazon AWS S3 buckets.|
|SSE|This function receives and publishes events from SSE server.|


## Format Mappers Function Types

| Function     | Description|
| ------------- |-------------|
|JSON|This function converts JSON messages to/from stream processor events.|
|CSV|This function converts messages with CSV format to/from stream processor events.|
|Key-Value|This function converts events having Key-Value maps to/from stream proceesor events.|
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


On receiving the event, a query is executed which parses string data types using **Execution function (math)** into required formats.
After which the data gets inserted into Kafka `SINK` using **Apache Kafka IO function**.


```js
@App:name('TestFunctions') 

CREATE SOURCE FooStream WITH (type='inMemory', topic='stock', map.type='json') (symbol string, price string, volume string);

@info(name = 'query1') 

CREATE SINK BarStream WITH (type='kafka', topic='topic_with_partitions', partition.no='0', bootstrap.servers='localhost:9092', map.type='json') (symbol string, price double, volume long);

insert into BarStream
select symbol, math:parseDouble(price), math:parseLong(volume) 
from FooStream;
```