---
sidebar_position: 3
title: Extensions
---


Extensions enhance Macrometa Stream QL, the language used to write stream workers, by seamlessly incorporating additional functionalities.

Extensions allow you to use:

- Different data sources.
- Different sinks, such as GDN Streams, Kafka and ActiveMQ.
- Appropriate format mapping, such as JSON, XML or CSV.
- Different kinds of processing, such as math, string, statistics and geospatial.

## Execution Extension Types

| Execution Extensions | Description |
|----------------------|-------------|
| Context	             | This extension provides useful environment properties such as current region where the Stream App is running.|
| Map	                 | This extension provides capability to generate and manipulate map (key-value) data objects.|
| JSON	                | This extension provides capability to retrieve, insert, and modify JSON elements. |
| List	                | This extension provides capability to generate and manipulate list data objects.|
| Math	                | This extension provides useful mathematical functions such as power, round, random, cos, log, etc. |
| Regex	               | This extension provides basic RegEx execution capabilities such as `find`, `match`, etc. |
| Reorder	             | This extension orders out-of-order event arrivals using algorithms such as K-Slack and alpha K-Stack.|
| Time	                | This extension provides time related functionality such as getting current time, current date, manipulating/formatting dates, etc. |
| Streaming ML	        | This extension provides streaming machine learning (clustering, classification and regression) on event streams. |
| Anonymizer	          | The Anonymizer extension provides a function for anonymizing various data types. This function returns a fake value for anonymizing which matches the original data. For example, an email would be replaced with a fake email. |
| Cache	               | The `cache` extension provides a persistent cache per tenant. |
| Geo Spatial	         | This extension provides geo data related functionality such as checking whether a given geo coordinate is within a predefined geo-fence, finding distance between 2 geo coordinates etc. |
| Sentiment	           |This extension performs sentiment analysis using AFINN Wordlist-based approach.|



## IO Extensions Types

| IO Extensions     | Description|
| ------------- |-------------|
|Google Pub-Sub | This an extension that receives and publishes events from/to Google Pub/Sub.                                                                                                       |
|HTTP & HTTPS| The **http extension** extension receives and publishes events via HTTP and HTTPS transports, calls external services, and serves incoming requests and provide synchronous responses. |
|Apache Kafka (beta)|This an extension that receives and publishes events from/to Apache Kafka.|
|MQTT|This an extension that receives and publishes events to and from MQTT.|
|S3|This extension allows to publish events to Amazon AWS S3 buckets.|
|SSE|This an extension that receives and publishes events from SSE server.|


## Format Mappers Extension Types

| Format Mappers Extensions     | Description|
| ------------- |-------------|
|JSON|This extension converts JSON messages to/from stream processor events.|
|CSV|This is an extension that converts messages with CSV format to/from stream processor events.|
|Key-Value|This extension converts events having Key-Value maps to/from stream proceesor events.|
|Text|This is an extension that converts text messages to/from stream processor events.|


## Example

This stream application with the name `TestExtensions` creates a stream named `FooStream`. This configuration for `SOURCE FooStream` performs input mapping using 
**JSON Format Mappers extension**. For a single event, the input is required to be in following format:



    {    
        "event":{        
            "symbol":"GDN",        
            "price":"55.6",        
            "volume":"100"    
        }
    }


On receiving the event, a query is executed which parses string data types using **Execution extension (math)** into required formats.
After which the data gets inserted into Kafka `SINK` using **Apache Kafka IO extension**.


```js
@App:name('TestExtensions') 

CREATE SOURCE FooStream WITH (type='inMemory', topic='stock', map.type='json') (symbol string, price string, volume string);

@info(name = 'query1') 

CREATE SINK BarStream WITH (type='kafka', topic='topic_with_partitions', partition.no='0', bootstrap.servers='localhost:9092', map.type='json') (symbol string, price double, volume long);

insert into BarStream
select symbol, math:parseDouble(price), math:parseLong(volume) 
from FooStream;
```