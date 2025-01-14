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
INSERT INTO RoomTempStream
SELECT convert(roomNo, 'string') AS roomNo,
       maximum(tempReading1, tempReading2) AS temp,
       UUID() AS messageID
FROM TempStream;
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
