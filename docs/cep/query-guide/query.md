---
sidebar_position: 20
title: Query
---


Query defines the processing logic in Stream. It consumes events from one or more streams, [named-windows](#named-window), [tables](#table), and/or [named-aggregations](#named-aggregation), process the events in a streaming manner, and generate output events into a [stream](#stream), [named-window](#named-window), or [table](#table).

**Purpose**

A query provides a way to process the events in the order they arrive and produce output using both stateful and stateless complex event processing and stream processing operations.

**Syntax**

The high level query syntax for defining processing logics is as follows:

```
@name('<query name>')
<output action>
<projection>
from <input>
```

The following parameters are used to configure a stream definition.

| Parameter&nbsp;&nbsp;&nbsp;&nbsp;| Description |
|----------------|-------------|
| `query name`   | The name of the query. Since naming the query (i.e the `@name('<query name>')` annotation) is optional, when the name is not provided Stream assign a system generated name for the query. |
| `input`        | Defines the means of event consumption via [streams](#stream), [named-windows](#named-window), [tables](#table), and/or [named-aggregations](#named-aggregations), and defines the processing logic using [filters](#filter), [windows](#window), [stream-functions](#stream-function), [joins](#join), [patterns](#pattern) and [sequences](#sequence). |
| `projection`   | Generates output event attributes using [select](#select), [functions](#function), [aggregation-functions](#aggregation-function), and [group by](#group-by) operations, and filters the generated the output using [having](#having), [limit & offset](#limit-offset), [order by](#order-by), and [output rate limiting](#output-rate-limiting) operations before sending them out. Here the projection is optional and when it is omitted all the input events will be sent to the output as it is. |
| `output action`| Defines output action (such as `insert into`, `update`, `delete`, etc) that needs to be performed by the generated events on a [stream](#stream), [named-window](#named-window), or [table](#table)  |

### Example

A query consumes events from the `TempStream` stream and output only the `roomNo` and `temp` attributes to the `RoomTempStream` stream, from which another query consumes the events and sends all its attributes to `AnotherRoomTempStream` stream.

```
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

insert into RoomTempStream
select roomNo, temp
from TempStream;

insert into AnotherRoomTempStream
from RoomTempStream;
```

:::tip "Inferred Stream"
Here, the `RoomTempStream` and `AnotherRoomTempStream` streams are an inferred streams, which means their stream definitions are inferred from the queries and they can be used same as any other defined stream without any restrictions.  
:::

### Value

Values are typed data, that can be manipulated, transferred and stored. Values can be referred by the attributes defined in definitions such as streams, and tables.

Stream supports values of type `STRING`, `INT` (Integer), `LONG`, `DOUBLE`, `FLOAT`, `BOOL` (Boolean) and `OBJECT`.

The syntax of each type and their example use as a constant value is as follows,

<table style={{ width:100 + "%" }}>
    <tr>
        <th style={{ width:10 + "%" }}>Attribute Type</th>
        <th style={{ width:50 + "%" }}>Format</th>
        <th style={{ width:40 + "%" }}>Example</th>
    </tr>
    <tr>
        <td>int</td>
        <td>`&ltdigit&gt+`</td>
        <td>`123`, `-75`, `+95`</td>
    </tr>
    <tr>
        <td>long</td>
        <td>`&ltdigit&gt+L`</td>
        <td>`123000L`, `-750l`, `+154L`</td>
    </tr>
    <tr>
        <td>float</td>
        <td>`(&ltdigit&gt+)?('.'&ltdigit&gt*)?(E(-|+)?&ltdigit&gt+)?F`</td>
        <td>`123.0f`, `-75.0e-10F`,`+95.789f`</td>
    </tr>
    <tr>
        <td>double</td>
        <td>`(&ltdigit&gt+)?('.'&ltdigit&gt*)?(E(-|+)?&ltdigit&gt+)?D?`</td>
        <td>`123.0`,`123.0D`,`-75.0e-10D`,`+95.789d`</td>
    </tr>
    <tr>
        <td>bool</td>
        <td>`(true|false)`</td>
        <td>`true`, `false`, `TRUE`, `FALSE`</td>
    </tr>
    <tr>
        <td>string</td>
        <td>`'(&lt;char&gt;*!('|"|"""|&ltnew line&gt))'` or  `"(&lt;char&gt;* !("|"""|&ltnew line&gt))"` or `"""(&lt;char&gt;* !("""))"""` </td>
        <td>`'Any text.'`, `"Text with 'single' quotes."`, <pre>"""
Text with 'single' quotes,
"double" quotes, and new lines.
"""</pre></td>
    </tr>
</table>

**_Time_**

Time is a special type of `LONG` value that denotes time using digits and their unit in the format `(<digit>+ <unit>)+`. At execution, the `time` gets converted into **milliseconds** and returns a `LONG` value.

<table style={{ width:100 + "%" }}>
    <tr>
        <th>
            Unit  
        </th>
        <th>
            Syntax
        </th>
    </tr>
    <tr>
        <td>
            Year
        </td>
        <td>
            `year` | `years`
        </td>
    </tr>
    <tr>
        <td>
            Month
        </td>
        <td>
            `month` | `months`
        </td>
    </tr>
    <tr>
        <td>
            Week
        </td>
        <td>
            `week` | `weeks`
        </td>
    </tr>
    <tr>
        <td>
            Day
        </td>
        <td>
            `day` | `days`
        </td>
    </tr>
    <tr>
        <td>
            Hour
        </td>
        <td>
           `hour` | `hours`
        </td>
    </tr>
    <tr>
        <td>
           Minutes
        </td>
        <td>
           `minute` | `minutes` | `min`
        </td>
    </tr>
    <tr>
        <td>
           Seconds
        </td>
        <td>
           `second` | `seconds` | `sec`
        </td>
    </tr>
    <tr>
        <td>
           Milliseconds
        </td>
        <td>
           `millisecond` | `milliseconds`
        </td>
    </tr>
</table>

**Example**

1 hour and 25 minutes can by written as `1 hour and 25 minutes` which is equal to the `LONG` value `5100000`.

### Select

The select clause in stream query defines the output event attributes of the query. Following are some basic query projection operations supported by select.

### Function

Functions are pre-configured operations that can consumes zero, or more parameters and always produce a single value as result. It can be used anywhere an attribute can be used.

**Purpose**

Functions encapsulate pre-configured reusable execution logic allowing users to execute the logic anywhere just by calling the function. This also make writing StreamApps simple and easy to understand.

**Syntax**

The syntax of function is as follows,

```sql
<function name>( <parameter>* )
```

Here `<function name>` uniquely identifies the function. The `<parameter>` defined input parameters the function can accept. The input parameters can be attributes, constant values, results of other functions, results of mathematical or logical expressions, or time values. The number and type of parameters a function accepts depend on the function itself.

:::note
Functions, mathematical expressions, and logical expressions can be used in a nested manner.
:::

**Example 1**

Function name `add` accepting two input parameters, is called with an attribute named `input` and a constant value `75`.  

```
add(input, 75)
```

**Example 2**

Function name `alertAfter` accepting two input parameters, is called with a time value of `1 hour and 25 minutes` and a mathematical addition operation of `startTime` + `56`.

```
add(1 hour and 25 minutes, startTime + 56)
```

**Inbuilt functions**

Following are some inbuilt Stream functions, for more functions refer [Functions](functions).

|Inbuilt function | Description|
| ------------- |-------------|
| [eventTimestamp](../reference/functions#eventtimestamp-function) | Returns event's timestamp. |
| [currentTimeMillis](../reference/functions#currenttimemillis-function) | Returns current time of StreamApp runtime. |
| [default](../reference/functions#default-function) | Returns a default value if the parameter is null. |
| [ifThenElse](../reference/functions#ifthenelse-function) | Returns parameters based on a conditional parameter. |
| [UUID](../reference/functions#uuid-function) | Generates a UUID. |
| [cast](../reference/functions#cast-function) | Casts parameter type. |
| [convert](../reference/functions#convert-function) | Converts parameter type. |
| [coalesce](../reference/functions#coalesce-function) | Returns first not null input parameter. |
| [maximum](../reference/functions#maximum-function) | Returns the maximum value of all parameters. |
| [minimum](../reference/functions#minimum-function) | Returns the minimum value of all parameters. |
| [instanceOfBoolean](../reference/functions#instanceofboolean-function) | Checks if the parameter is an instance of Boolean. |
| [instanceOfDouble](../reference/functions#instanceofdouble-function) | Checks if the parameter is an instance of Double. |
| [instanceOfFloat](../reference/functions#instanceoffloat-function) | Checks if the parameter is an instance of Float. |
| [instanceOfInteger](../reference/functions#instanceofinteger-function) | Checks if the parameter is an instance of Integer. |
| [instanceOfLong](../reference/functions#instanceoflong-function) | Checks if the parameter is an instance of Long. |
| [instanceOfString](../reference/functions#instanceOfString-function) | Checks if the parameter is an instance of String. |
| [createSet](../reference/functions#createset-function) | Creates  HashSet with given input parameters. |
| [sizeOfSet](../reference/functions#sizeofset-function) | Returns number of items in the HashSet, that's passed as a parameter. |

**Example**

Query that converts the `roomNo` to `string` using `convert` function, finds the maximum temperature reading with `maximum` function, and adds a unique `messageID` using the `UUID` function.

```
insert into RoomTempStream
select convert(roomNo, 'string') as roomNo,
       maximum(tempReading1, tempReading2) as temp,
       UUID() as messageID
from TempStream;
```

### Filter

Filters provide a way of filtering input stream events based on a specified condition. It accepts any type of condition including a combination of functions and/or attributes  that produces a Boolean result. Filters allow events to passthrough if the condition results in `true`, and drops if it results in a `false`.  

**Purpose**

Filter helps to select the events that are relevant for the processing and omit the ones that are not.

**Syntax**

Filter conditions should be defined in square brackets (`[]`) next to the input stream as shown below.

```
insert into <output stream>
select <attribute name>, <attribute name>, ...
from <input stream>[<filter condition>] ;
```

**Example**

Query to filter `TempStream` stream events, having `roomNo` within the range of 100-210 and temperature greater than 40 degrees,
and insert them into `HighTempStream` stream.

```
insert into HighTempStream
select roomNo, temp
from TempStream[(roomNo >= 100 and roomNo < 210) and temp > 40];
```

### Window

Window provides a way to capture a subset of events from an input stream and retain them for a period of time based on a specified criterion. The criterion defines when and how the events should be evicted from the windows. Such as events getting evicted from the window based on the time duration, or number of events and they events are evicted in a sliding (one by one) or tumbling (batch) manner.

Within a query, each input stream can at most have only one window associated with it.

**Purpose**

Windows help to retain events based on a criterion, such that the values of those events can be aggregated, or checked if an event of interest is within the window or not.

**Syntax**

Window should be defined by using the `#window` prefix next to the input stream as shown below.

```
insert <ouput event type>? into <output stream>
select <attribute name>, <attribute name>, ...
from <input stream>#window.<window name>(<parameter>, <parameter>, ... );
```

:::note
Filter conditions can be applied both before and/or after the window.
:::

**Inbuilt windows**

Following are some inbuilt Stream windows, for more windows refer [execution extensions](../reference/functions).

|Inbuilt function | Description|
| ------------- |-------------|
| [time](../reference/functions#time-window) | Retains events based on time in a sliding manner.|
| [timeBatch](../reference/functions#timebatch-window) | Retains events based on time in a tumbling/batch manner. |
| [length](../reference/functions#length-window) | Retains events based on number of events in a sliding manner. |
| [lengthBatch](../reference/functions#lengthbatch-window) | Retains events based on number of events in a tumbling/batch manner. |
| [timeLength](../reference/functions#timelength-window) | Retains events based on time and number of events in a sliding manner. |
| [session](../reference/functions#session-window) | Retains events for each session based on session key. |
| [batch](../reference/functions#batch-window) | Retains events of last arrived event chunk. |
| [sort](../reference/functions#sort-window) | Retains top-k or bottom-k events based on a parameter value. |
| [cron](../reference/functions#cron-window) | Retains events based on cron time in a tumbling/batch manner. |
| [externalTime](../reference/functions#externalTime-window) | Retains events based on event time value passed as a parameter in a sliding manner.|
| [externalTimeBatch](../reference/functions#externaltimebatch-window) | Retains events based on event time value passed as a parameter in a a tumbling/batch manner.|
| [delay](../reference/functions#delay-window) | Retains events and delays the output by the given time period in a sliding manner.|

**Example 1**

Query to find out the maximum temperature out of the **last 10 events**, using the window of `length` 10 and `max()` aggregation function, from the `TempStream` stream and insert the results into the `MaxTempStream` stream.

```
select max(temp) as maxTemp
from TempStream#window.length(10)
insert into MaxTempStream;
```

Here, the `length` window operates in a sliding manner where the following 3 event subsets are calculated and outputted when a list of 12 events are received in sequential order.

|Subset|Event Range|
|------|-----------|
| 1 | 1 - 10 |
| 2 | 2 - 11 |
| 3 | 3 - 12 |

**Example 2**

Query to find out the maximum temperature out of the **every 10 events**, using the window of `lengthBatch` 10 and `max()` aggregation function, from the `TempStream` stream and insert the results into the `MaxTempStream` stream.

```
insert into MaxTempStream
select max(temp) as maxTemp
from TempStream#window.lengthBatch(10);
```

Here, the window operates in a batch/tumbling manner where the following 3 event subsets are calculated and outputted when a list of 30 events are received in a sequential order.

|Subset|Event Range|
|------|-----------|
| 1    | 1 - 10      |
| 2    | 11 - 20     |
| 3    | 21 - 30     |

**Example 3**

Query to find out the maximum temperature out of the events arrived **during last 10 minutes**, using the window of `time` 10 minutes and `max()` aggregation function, from the `TempStream` stream and insert the results into the `MaxTempStream` stream.

```
insert into MaxTempStream
select max(temp) as maxTemp
from TempStream#window.time(10 min);
```

Here, the `time` window operates in a sliding manner with millisecond accuracy, where it will process events in the following 3 time durations and output aggregated events when a list of events are received in a sequential order.

|Subset|Time Range (in ms)|
|------|-----------|
| 1 | 1:00:00.001 - 1:10:00.000 |
| 2 | 1:00:01.001 - 1:10:01.000 |
| 3 | 1:00:01.033 - 1:10:01.034 |

**Example 4**

Query to find out the maximum temperature out of the events arriving **every 10 minutes**, using the window of `timeBatch` 10 and `max()` aggregation function, from the `TempStream` stream and insert the results into the `MaxTempStream` stream.

```
insert into MaxTempStream
select max(temp) as maxTemp
from TempStream#window.timeBatch(10 min);
```

Here, the window operates in a batch/tumbling manner where the window will process evetns in the following 3 time durations and output aggregated events when a list of events are received in a sequential order.

|Subset|Time Range (in ms)|
|------|-----------|
| 1 | 1:00:00.001 - 1:10:00.000 |
| 2 | 1:10:00.001 - 1:20:00.000 |
| 3 | 1:20:00.001 - 1:30:00.000 |

### Event Type

Query output depends on the `current` and `expired` event types it produces based on its internal processing state. By default all queries produce `current` events upon event arrival to the query. The queries containing windows additionally produce `expired` events when events expire from the windows.

**Purpose**

Event type helps to specify when a query should output events to the stream, such as output upon current events, expired events or upon both current and expired events.

**Syntax**

Event type should be defined in between `insert` and `into` keywords for insert queries as follows.

```
insert <event type> into <output stream>
select <attribute name>, <attribute name>, ...
from <input stream>#window.<window name>(<parameter>, <parameter>, ... )
```

Event type should be defined next to the `for` keyword for delete queries as follows.

```
select <attribute name>, <attribute name>, ...
from <input stream>#window.<window name>(<parameter>, <parameter>, ... )
delete <table> (for <event type>)?
    on <condition>
```

Event type should be defined next to the `for` keyword for update queries as follows.

```
select <attribute name>, <attribute name>, ...
from <input stream>#window.<window name>(<parameter>, <parameter>, ... )
update <table> (for <event type>)?
    set <table>.<attribute name> = (<attribute name>|<expression>)?, <table>.<attribute name> = (<attribute name>|<expression>)?, ...
    on <condition>
```

Event type should be defined next to the `for` keyword for update or insert queries as follows.

```
select <attribute name>, <attribute name>, ...
from <input stream>#window.<window name>(<parameter>, <parameter>, ... )
update or insert into <table> (for <event type>)?
    set <table>.<attribute name> = <expression>, <table>.<attribute name> = <expression>, ...
    on <condition>
```

:::note
Controlling query output based on the event types neither alters query execution nor its accuracy.  
:::

The event types can be defined using the following keywords to manipulate query output.

| Event types | Description |
|-------------------|-------------|
| `current events` | Outputs events only when incoming events arrive to be processed by the query.  This is default behavior when no specific event type is specified.|
| `expired events` | Outputs events only when events expires from the window. |
| `all events` | Outputs events when incoming events arrive to be processed by the query as well as  when events expire from the window. |

**Example**

Query to output only the expired events from a 1 minute time window to the `DelayedTempStream` stream. This can be used for delaying the events by a minute.

```
insert expired events into DelayedTempStream
select *
from TempStream#window.time(1 min)
```

:::note
This is just to illustrate how expired events work, it is recommended to use [delay](../reference/functions#delay-window) window for usecases where we need to delay events by a given time period.
:::

### Aggregate Function

Aggregate functions are pre-configured aggregation operations that can consumes zero, or more parameters from multiple events and always produce a single value as result. They can be only used in the query projection (as part of the `select` clause). When a query comprises a window, the aggregation will be contained to the events in the window, and when it does not have a window, the aggregation is performed from the first event the query has received.

**Purpose**

Aggregate functions encapsulate pre-configured reusable aggregate logic allowing users to aggregate values of multiple events together. When used with batch/tumbling windows this can also help to reduce the number of output events produced.  

**Syntax**

Aggregate function can be used in query projection (as part of the `select` clause) alone or as a part of another expression. In all cases, the output produced by the query should be properly mapped to the output stream attribute using the `as` keyword.

The syntax of aggregate function is as follows,

```
insert into <output stream>
select <aggregate function>(<parameter>, <parameter>, ... ) as <attribute name>, <attribute2 name>, ...
from <input stream>#window.<window name>(<parameter>, <parameter>, ... );
```

Here `<aggregate function>` uniquely identifies the aggregate function. The `<parameter>` defined input parameters the aggregate function can accept. The input parameters can be attributes, constant values, results of other functions or aggregate functions, results of mathematical or logical expressions, or time values. The number and type of parameters an aggregate function accepts depend on the function itself.

**Inbuilt aggregate functions**

Following are some inbuilt aggregation functions.

|Inbuilt aggregate function | Description|
| ------------- |-------------|
| [sum](../reference/functions#sum-aggregate-function) | Calculates the sum from a set of values. |
| [count](../reference/functions#count-aggregate-function) | Calculates the count from a set of values. |
| [distinctcount](../reference/functions#distinctcount-aggregate-function) | Calculates the distinct count based on a parameter from a set of values. |
| [avg](../reference/functions#avg-aggregate-function) | Calculates the average from a set of values.|
| [max](../reference/functions#max-aggregate-function) | Finds the maximum value from a set of values. |
| [min](../reference/functions#min-aggregate-function) | Finds the minimum value from a set of values. |
| [maxForever](../reference/functions#maxForever-aggregate-function) | Finds the maximum value from all events throughout its lifetime irrespective of the windows. |
| [minForever](../reference/functions#minForever-aggregate-function) | Finds the minimum value from all events throughout its lifetime irrespective of the windows. |
| [stddev](../reference/functions#stdDev-aggregate-function) | Calculates the standard deviation from a set of values. |
| [and](../reference/functions#and-aggregate-function) | Calculates boolean and from a set of values. |
| [or](../reference/functions#or-aggregate-function) | Calculates boolean or from a set of values. |
| [unionSet](../reference/functions#unionSet-aggregate-function) | Calculates union as a Set from a set of values. |

**Example**

Query to calculate average, maximum, and minimum values on `temp` attribute of the `TempStream` stream in a sliding manner, from the events arrived over the last 10 minutes and to produce outputs `avgTemp`, `maxTemp` and `minTemp` respectively to the `AvgTempStream` output stream.

```
insert into AvgTempStream
select avg(temp) as avgTemp, max(temp) as maxTemp, min(temp) as minTemp
from TempStream#window.time(10 min);
```

### Group By

Group By provides a way of grouping events based on one or more specified attributes to perform aggregate operations.

**Purpose**

Group By allows users to aggregate values of multiple events based on the given group-by fields.

**Syntax**

The syntax for the Group By with aggregate function is as follows.

```
insert into <output stream>
select <aggregate function>( <parameter>, <parameter>, ...) as <attribute1 name>, <attribute2 name>, ...
from <input stream>#window.<window name>(...)
group by <attribute1 name>, <attribute2 name>, ...;
```

Here the group by attributes should be defined next to the `group by` keyword separating each attribute by a comma.

**Example**

Query to calculate the average `temp` per `roomNo` and `deviceID` combination, from the events arrived from `TempStream` stream, during the last 10 minutes time-window in a sliding manner.

```
insert into AvgTempStream
select roomNo, deviceID, avg(temp) as avgTemp
from TempStream#window.time(10 min)
group by roomNo, deviceID;
```

### Having

Having provide a way of filtering events based on a specified condition of the query output stream attributes. It accepts any type of condition including a combination of functions and/or attributes that produces a Boolean result. Having, allow events to passthrough if the condition results in `true`, and drops if it results in a `false`.  

**Purpose**

Having helps to select the events that are relevant for the output based on the attributes those are produced by the `select` clause and omit the ones that are not.

**Syntax**

The syntax for the Having clause is as follows.

```
insert into <output stream>
select <aggregate function>( <parameter>, <parameter>, ...) as <attribute1 name>, <attribute2 name>, ...
from <input stream>#window.<window name>( ... )
group by <attribute1 name>, <attribute2 name> ...
having <condition>;
```

Here the having `<condition>` should be defined next to the `having` keyword and having can be used with or without `group by` clause.

**Example**

Query to calculate the average `temp` per `roomNo` for the last 10 minutes, and alerts if the `avgTemp` exceeds 30 degrees.

```
insert into AlertStream
select roomNo, avg(temp) as avgTemp
from TempStream#window.time(10 min)
group by roomNo
having avgTemp > 30;
```

### Order By

Order By, orders the query results in ascending and or descending order based on one or more specified attributes. When an attribute is used for order by, by default Stream orders the events in ascending order of that attribute's value, and by adding `desc` keyword, the events can be ordered in descending order. When more than one attribute is defined the attributes defined towards the left will have more precedence in ordering than the ones defined in right.  

**Purpose**

Order By helps to sort the events in the outputs chunks produced by the query. Order By will be more helpful for batch windows, and queries where they output many of event together then for sliding window use cases where the output will be one or few events at a time.

**Syntax**

The syntax for the Order By clause is as follows:

```
insert into <output stream>
select <aggregate function>( <parameter>, <parameter>, ...) as <attribute1 name>, <attribute2 name>, ...
from <input stream>#window.<window name>( ... )
group by <attribute1 name>, <attribute2 name> ...
having <condition>
order by <attribute1 name> (asc|desc)?, <attribute2 name> (asc|desc)?, ...;
```

Here the order by attributes should be defined next to the `order by` keyword separating each by a comma, and optionally specifying the event ordering using `asc` (default) or `desc` keywords.

**Example**

Query to calculate the average `temp` per `roomNo` and `deviceID` combination on every 10 minutes batches, and order the generated output events in ascending order by `avgTemp` and then by descending order of `roomNo` (if the more than one event have the same `avgTemp` value).

```
insert into AvgTempStream
select roomNo, deviceID, avg(temp) as avgTemp
from TempStream#window.timeBatch(10 min)
group by roomNo, deviceID
order by avgTemp, roomNo desc;
```

### Limit & Offset

These provide a way to select the number of events (via limit) from the desired index (by specifying an offset) from the output event chunks produced by the query.

**Purpose**

Limit & Offset helps to output only the selected set of events from large event batches. This will be more useful with `Order By` clause where one can order the output for topK, bottomK, or even to paginate through the dataset by obtaining a set of events from the middle.

**Syntax**

The syntax for the Limit & Offset clauses is as follows:

```
insert into <output stream>
select <aggregate function>( <parameter>, <parameter>, ...) as <attribute1 name>, <attribute2 name>, ...
from <input stream>#window.<window name>( ... )
group by <attribute1 name>, <attribute2 name> ...
having <condition>
order by <attribute1 name> (asc | desc)?, <attribute2 name> (<ascend/descend>)?, ...
limit <positive integer>?
offset <positive integer>?;
```

Here both `limit` and `offset` are optional, when `limit` is omitted the query will output all the events, and when `offset` is omitted `0` is taken as the default offset value.

**Example 1**

Query to calculate the average `temp` per `roomNo` and `deviceID` combination for every 10 minutes batches, from the events arriving at the `TempStream` stream, and emit only two events having the highest `avgTemp` value.

```
insert into HighestAvgTempStream
select roomNo, deviceID, avg(temp) as avgTemp
from TempStream#window.timeBatch(10 min)
group by roomNo, deviceID
order by avgTemp desc
limit 2;
```

**Example 2**
Query to calculate the average `temp` per `roomNo` and `deviceID` combination for every 10 minutes batches, for events that arriving at the `TempStream` stream, and emits only the third, forth and fifth events when sorted in descending order based on their `avgTemp` value.

```
insert into HighestAvgTempStream
select roomNo, deviceID, avg(temp) as avgTemp
from TempStream#window.timeBatch(10 min)
group by roomNo, deviceID
order by avgTemp desc
limit 3
offset 2;
```

### Join (Stream)

Joins allow you to get a combined result from two streams in real-time based on a specified condition.

**Purpose**

Streams are stateless. Therefore, in order to join two streams, they need to be connected to a window so that there is a pool of events that can be used for joining. Joins also accept conditions to join the appropriate events from each stream.

During the joining process each incoming event of each stream is matched against all the events in the other
stream's window based on the given condition, and the output events are generated for all the matching event pairs.

:::note
Join can also be performed with [stored data](#join-table), [aggregation](#join-aggregation) or externally [named windows](#join-window).
:::

**Syntax**

The syntax for a join is as follows:

```
insert into <output stream>
select <attribute name>, <attribute name>, ...
from <input stream>#window.<window name>(<parameter>, ... ) {unidirectional} {as <reference>}
         join <input stream>#window.<window name>(<parameter>,  ... ) {unidirectional} {as <reference>}
    on <join condition>
```

Here, the `<join condition>` allows you to match the attributes from both the streams.

**Unidirectional join operation**

By default, events arriving at either stream can trigger the joining process. However, if you want to control the
join execution, you can add the `unidirectional` keyword next to a stream in the join definition as depicted in the
syntax in order to enable that stream to trigger the join operation. Here, events arriving at other stream only update the
 window of that stream, and this stream does not trigger the join operation.

:::note
The `unidirectional` keyword cannot be applied to both the input streams because the default behaviour already allows both streams to trigger the join operation.
:::

**Example**

Assuming that the temperature of regulators are updated every minute.
Following is a Stream App that controls the temperature regulators if they are not already `on` for all the rooms with a room temperature greater than 30 degrees.  

```
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);
CREATE STREAM RegulatorStream (deviceID long, roomNo int, isOn bool);

insert into RegulatorActionStream
select T.roomNo, R.deviceID, 'start' as action
from TempStream[temp > 30.0]#window.time(1 min) as T
  join RegulatorStream[isOn == false]#window.length(1) as R
  on T.roomNo == R.roomNo;
```

**Supported join types**

Following are the supported operations of a join clause.

- **Inner join (join)**

    This is the default behaviour of a join operation. `join` is used as the keyword to join both the streams. The output is generated only if there is a matching event in both the streams.

- **Left outer join**

    The `left outer join` operation allows you to join two streams to be merged based on a condition. `left outer join` is used as the keyword to join both the streams.

    Here, it returns all the events of left stream even if there are no matching events in the right stream by
    having null values for the attributes of the right stream.

     **Example**

    The following query generates output events for all events from the `StockStream` stream regardless of whether a matching
    symbol exists in the `TwitterStream` stream or not.

    <pre>
    select S.symbol as symbol, T.tweet, S.price
    from StockStream#window.time(1 min) as S
      left outer join TwitterStream#window.length(1) as T
      on S.symbol== T.symbol
    insert into outputStream ;    </pre>

- **Right outer join**

    This is similar to a left outer join. `Right outer join` is used as the keyword to join both the streams.
    It returns all the events of the right stream even if there are no matching events in the left stream.

- **Full outer join**

    The full outer join combines the results of left outer join and right outer join. `full outer join` is used as the keyword to join both the streams.
    Here, output event are generated for each incoming event even if there are no matching events in the other stream.

    **Example**

    The following query generates output events for all the incoming events of each stream regardless of whether there is a
    match for the `symbol` attribute in the other stream or not.

    <pre>
    insert into outputStream
    select S.symbol as symbol, T.tweet, S.price
    from StockStream#window.time(1 min) as S
      full outer join TwitterStream#window.length(1) as T
      on S.symbol== T.symbol;    </pre>

### Patterns

This is a state machine implementation that allows you to detect patterns in the events that arrive over time. This can correlate events within a single stream or between multiple streams.

**Purpose**

Patterns allow you to identify trends in events over a time period.

**Syntax**

The following is the syntax for a pattern query:

```
select <event reference>.<attribute name>, <event reference>.<attribute name>, ...
from (every)? <event reference>=<input stream>[<filter condition>] ->
    (every)? <event reference>=<input stream [<filter condition>] ->
    ...
    (within <time gap>)?     
insert into <output stream>
```

| Items| Description |
|-------------------|-------------|
| `->` | This is used to indicate an event that should be following another event. The subsequent event does not necessarily have to occur immediately after the preceding event. The condition to be met by the preceding event should be added before the sign, and the condition to be met by the subsequent event should be added after the sign. |
| `<event reference>` | This allows you to add a reference to the the matching event so that it can be accessed later for further processing. |
| `(within <time gap>)?` | The `within` clause is optional. It defines the time duration within which all the matching events should occur. |
| `every` | `every` is an optional keyword. This defines whether the event matching should be triggered for every event arrival in the specified stream with the matching condition.  When this keyword is not used, the matching is carried out only once. |

Stream also supports pattern matching with counting events and matching events in a logical order such as (`and`, `or`, and `not`). These are described in detail further below in this guide.

**Example**

This query sends an alert if the temperature of a room increases by 5 degrees within 10 min.

```
insert into AlertStream
select e1.roomNo, e1.temp as initialTemp, e2.temp as finalTemp
from every( e1=TempStream ) -> e2=TempStream[ e1.roomNo == roomNo and (e1.temp + 5) <= temp ]
    within 10 min;
```

Here, the matching process begins for each event in the `TempStream` stream (because `every` is used with `e1=TempStream`),
and if  another event arrives within 10 minutes with a value for the `temp` attribute that is greater than or equal to `e1.temp + 5`
of the event e1, an output is generated via the `AlertStream`.

#### Counting Pattern

Counting patterns allow you to match multiple events that may have been received for the same matching condition.
The number of events matched per condition can be limited via condition postfixes.

**Syntax**

Each matching condition can contain a collection of events with the minimum and maximum number of events to be matched as shown in the syntax below.

```
insert into <output stream>
select <event reference>([event index])?.<attribute name>, ...
from (every)? <event reference>=<input stream>[<filter condition>] (<<min count>:<max count>>)? ->  
    ...
    (within <time gap>)?     
```

|Postfix|Description|Example
---------|---------|---------
|`<n1:n2>`|This matches `n1` to `n2` events (including `n1` and not more than `n2`).|`1:4` matches 1 to 4 events.
|`<n:>`|This matches `n` or more events (including `n`).|`<2:>` matches 2 or more events.
|`<:n>`|This matches up to `n` events (excluding `n`).|`<:5>` matches up to 5 events.
|`<n>`|This matches exactly `n` events.|`<5>` matches exactly 5 events.

Specific occurrences of the event in a collection can be retrieved by using an event index with its reference.
Square brackets can be used to indicate the event index where `1` can be used as the index of the first event and `last` can be used as the index
 for the `last` available event in the event collection. If you provide an index greater then the last event index,
 the system returns `null`. The following are some valid examples.

- `e1[3]` refers to the 3rd event.
- `e1[last]` refers to the last event.
- `e1[last - 1]` refers to the event before the last event.

**Example**

The following Stream App calculates the temperature difference between two regulator events.

```
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);
CREATE STREAM RegulatorStream (deviceID long, roomNo int, tempSet double, isOn bool);

insert into TempDiffStream
select e1.roomNo, e2[0].temp - e2[last].temp as tempDiff
from every( e1=RegulatorStream) -> e2=TempStream[e1.roomNo==roomNo]<1:> -> e3=RegulatorStream[e1.roomNo==roomNo];
```

#### Logical Patterns

Logical patterns match events that arrive in temporal order and correlate them with logical relationships such as `and`,
`or` and `not`.

**Syntax**

```
insert into <output stream>
select <event reference>([event index])?.<attribute name>, ...
from (every)? (not)? <event reference>=<input stream>[<filter condition>]
          ((and|or) <event reference>=<input stream>[<filter condition>])? (within <time gap>)? ->  
    ...
```

Keywords such as `and`, `or`, or `not` can be used to illustrate the logical relationship.

Key Word|Description
---------|---------
`and`|This allows both conditions of `and` to be matched by two events in any order.
`or`|The state succeeds if either condition of `or` is satisfied. Here the event reference of the other condition is `null`.
`not <condition1> and <condition2>`| When `not` is included with `and`, it identifies the events that match `<condition2>` arriving before any event that match `<condition1>`.
`not <condition> for <time period>`| When `not` is included with `for`, it allows you to identify a situation where no event that matches `<condition1>` arrives during the specified `<time period>`.  e.g.,`from not TemperatureStream[temp > 60] for 5 sec`.

Here the `not` pattern can be followed by either an `and` clause or the effective period of `not` can be concluded after a given `<time period>`. Further in Stream more than two streams cannot be matched with logical conditions using `and`, `or`, or `not` clauses at this point.

#### Detecting Non-occurring Events

Stream allows you to detect non-occurring events via multiple combinations of the key words specified above as shown in the table below.

In the patterns listed, P* can be either a regular event pattern, an absent event pattern or a logical pattern.

Pattern|Detected Scenario
---------|---------
`not A for <time period>`|The non-occurrence of event A within `<time period>` after system start up. e.g., Generating an alert if a taxi has not reached its destination within 30 minutes, to indicate that the passenger might be in danger.
`not A for <time period> and B`|After system start up, event A does not occur within `time period`, but event B occurs at some point in time.  e.g., Generating an alert if a taxi has not reached its destination within 30 minutes, and the passenger marked that he/she is in danger at some point in time.
`not A for <time period 1> and not B for <time period 2>`|After system start up, event A doess not occur within `time period 1`, and event B also does not occur within `<time period 2>`.  e.g., Generating an alert if the SDK of a taxi has not reached the destination within 30 minutes, and the passenger has not marked himself/herself to be in danger within that same time period.
`not A for <time period> or B`|After system start up, either event A does not occur within `<time period>`, or event B occurs at some point in time.  e.g., Generating an alert if the taxi has not reached its destination within 30 minutes, or if the passenger has marked that he/she is in danger at some point in time.
`not A for <time period 1> or not B for <time period 2>`|After system start up, either event A does not occur within `<time period 1>`, or event B occurs within `<time period 2>`.  e.g., Generating an alert to indicate that the SDK is not on an expected route if the taxi has not reached destination A within 20 minutes, or reached destination B within 30 minutes.
`A → not B for <time period>`|Event B does not occur within `<time period>` after the occurrence of event A. e.g., Generating an alert if the taxi has reached its destination, but this was not followed by a payment record.
`P* → not A for <time period> and B`|After the occurrence of P*, event A does not occur within `<time period>`, and event B occurs at some point in time.
`P* → not A for <time period 1> and not B for <time period 2>`|After the occurrence of P*, event A does not occur within `<time period 1>`, and event B does not occur within `<time period 2>`.
`P* → not A for <time period> or B`|After the occurrence of P*, either event A does not occur within `<time period>`, or event B occurs at some point in time.
`P* → not A for <time period 1> or not B for <time period 2>`|After the occurrence of P*, either event A does not occur within `<time period 1>`, or event B does not occur within `<time period 2>`.
`not A for <time period> → B`|Event A does occur within `<time period>` after the system start up, but event B occurs after that `<time period>` has elapsed.
`not A for <time period> and B → P*`|Event A does not occur within `<time period>`, and event B occurs at some point in time. Then P* occurs after the `<time period>` has elapsed, and after B has occurred.
`not A for <time period 1> and not B for <time period 2> → P*`|After system start up, event A does not occur within `<time period 1>`, and event B does not occur within `<time period 2>`. However, P* occurs after both A and B.
`not A for <time period> or B → P*`|After system start up, event A does not occur within `<time period>` or event B occurs at some point in time. The P* occurs after `<time period>` has elapsed, or after B has occurred.
`not A for <time period 1> or not B for <time period 2> → P*`|After system start up, either event A does not occur within `<time period 1>`, or event B does not occur within `<time period 2>`. Then P*  occurs after both `<time period 1>` and `<time period 2>` have elapsed.
`not A and B`|Event A does not occur before event B.
`A and not B`|Event B does not occur before event A.

**Example**

Following Stream App, sends the `stop` control action to the regulator when the key is removed from the hotel room.

```
CREATE STREAM RegulatorStateChangeStream (deviceID long, roomNo int, tempSet double, action string);
CREATE STREAM RoomKeyStream (deviceID long, roomNo int, action string);

insert into RegulatorActionStream
select e1.roomNo, ifThenElse( e2 is null, 'none', 'stop' ) as action
from every( e1=RegulatorStateChangeStream[ action == 'on' ] ) ->
      e2=RoomKeyStream[ e1.roomNo == roomNo and action == 'removed' ] or e3=RegulatorStateChangeStream[ e1.roomNo == roomNo and action == 'off']
having action != 'none';
```

This Stream Application generates an alert if we have switch off the regulator before the temperature reaches 12 degrees.  

```
CREATE STREAM RegulatorStateChangeStream (deviceID long, roomNo int, tempSet double, action string);
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

insert into AlertStream
select e1.roomNo as roomNo
from e1=RegulatorStateChangeStream[action == 'start'] -> not TempStream[e1.roomNo == roomNo and temp < 12] and e2=RegulatorStateChangeStream[action == 'off'];
```

This Stream Application generates an alert if the temperature does not reduce to 12 degrees within 5 minutes of switching on the regulator.  

```
CREATE STREAM RegulatorStateChangeStream (deviceID long, roomNo int, tempSet double, action string);
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

insert into AlertStream
select e1.roomNo as roomNo
from e1=RegulatorStateChangeStream[action == 'start'] -> not TempStream[e1.roomNo == roomNo and temp < 12] for '5 min';
```

### Sequence

Sequence is a state machine implementation that allows you to detect the sequence of event occurrences over time.
Here **all matching events need to arrive consecutively** to match the sequence condition, and there cannot be any non-matching events arriving within a matching sequence of events.
This can correlate events within a single stream or between multiple streams.

**Purpose**

This allows you to detect a specified event sequence over a specified time period.

**Syntax**

The syntax for a sequence query is as follows:

```
insert into <output stream>
select <event reference>.<attribute name>, <event reference>.<attribute name>, ...
from (every)? <event reference>=<input stream>[<filter condition>],
    <event reference>=<input stream [<filter condition>],
    ...
    (within <time gap>)?     
```

| Items | Description |
|-------------------|-------------|
| `,` | This represents the immediate next event i.e., when an event that matches the first condition arrives, the event that arrives immediately after it should match the second condition. |
| `<event reference>` | This allows you to add a reference to the the matching event so that it can be accessed later for further processing. |
| `(within <time gap>)?` | The `within` clause is optional. It defines the time duration within which all the matching events should occur. |
| `every` | `every` is an optional keyword. This defines whether the matching event should be triggered for every event that arrives at the specified stream with the matching condition.  When this keyword is not used, the matching is carried out only once. |

**Example**

This query generates an alert if the increase in the temperature between two consecutive temperature events exceeds one degree.

```sql
insert into AlertStream
select e1.temp as initialTemp, e2.temp as finalTemp
from every e1=TempStream, e2=TempStream[e1.temp + 1 < temp];
```

#### Counting Sequence

Counting sequences allow you to match multiple events for the same matching condition.
The number of events matched per condition can be limited via condition postfixes such as **Counting Patterns**, or by using the
`*`, `+`, and `?` operators.

The matching events can also be retrieved using event indexes, similar to how it is done in **Counting Patterns**.

**Syntax**

Each matching condition in a sequence can contain a collection of events as shown below.

```
insert into <output stream>
select <event reference>.<attribute name>, <event reference>.<attribute name>, ...
from (every)? <event reference>=<input stream>[<filter condition>](+|*|?)?,
    <event reference>=<input stream [<filter condition>](+|*|?)?,
    ...
    (within <time gap>)?     
```

|Postfix symbol|Required/Optional |Description|
|---------|---------|---------|
| `+` | Optional |This matches **one or more** events to the given condition. |
| `*` | Optional |This matches **zero or more** events to the given condition. |
| `?` | Optional |This matches **zero or one** events to the given condition. |

**Example**

This Stream application identifies temperature peeks.

```
CREATE STREAM TempStream(deviceID long, roomNo int, temp double);

insert into PeekTempStream
select e1.temp as initialTemp, e2[last].temp as peakTemp
from every e1=TempStream, e2=TempStream[e1.temp <= temp]+, e3=TempStream[e2[last].temp > temp];
```

#### Logical Sequence

Logical sequences identify logical relationships using `and`, `or` and `not` on consecutively arriving events.

**Syntax**
The syntax for a logical sequence is as follows:

```
insert into <output stream>
select <event reference>([event index])?.<attribute name>, ...
from (every)? (not)? <event reference>=<input stream>[<filter condition>]
          ((and|or) <event reference>=<input stream>[<filter condition>])? (within <time gap>)?,
    ...
```

Keywords such as `and`, `or`, or `not` can be used to illustrate the logical relationship, similar to how it is done in **Logical Patterns**.

**Example**

This Stream application notifies the state when a regulator event is immediately followed by both temperature and humidity events.

```
CREATE STREAM TempStream(deviceID long, temp double);
CREATE STREAM HumidStream(deviceID long, humid double);
CREATE STREAM RegulatorStream(deviceID long, isOn bool);

insert into StateNotificationStream
select e2.temp, e3.humid
from every e1=RegulatorStream, e2=TempStream and e3=HumidStream;
```

### Output rate limiting

Output rate limiting allows queries to output events periodically based on a specified condition.

**Purpose**

This allows you to limit the output to avoid overloading the subsequent executions, and to remove unnecessary information.

**Syntax**

The syntax of an output rate limiting configuration is as follows:

```
insert into <output stream>
select <attribute name>, <attribute name>, ...
from <input stream> ...
output <rate limiting configuration>
```

Stream supports three types of output rate limiting configurations as explained in the following table:

Rate limiting configuration|Syntax| Description
---------|---------|--------
Based on time | `<output event> every <time interval>` | This outputs `<output event>` every `<time interval>` time interval.
Based on number of events | `<output event> every <event interval> events` | This outputs `<output event>` for every `<event interval>` number of events.
Snapshot based output | `snapshot every <time interval>`| This outputs all events in the window (or the last event if no window is defined in the query) for every given `<time interval>` time interval.

Here the `<output event>` specifies the event(s) that should be returned as the output of the query.
The possible values are as follows:
- `first` : Only the first event processed by the query during the specified time interval/sliding window is emitted.
- `last` : Only the last event processed by the query during the specified time interval/sliding window is emitted.
- `all` : All the events processed by the query during the specified time interval/sliding window are emitted. **When no `<output event>` is defined, `all` is used by default.**

**Examples**

- Returning events based on the number of events

    Here, events are emitted every time the specified number of events arrive. You can also specify whether to emit only the first event/last event, or all the events out of the events that arrived.

    In this example, the last temperature per sensor is emitted for every 10 events.

    <pre>
    insert into LowRateTempStream
    select temp, deviceID
    from TempStreamselect
    group by deviceID
    output last every 10 events;    </pre>

- Returning events based on time

    Here events are emitted for every predefined time interval. You can also specify whether to emit only the first event, last event, or all events out of the events that arrived during the specified time interval.

    In this example, emits all temperature events every 10 seconds  

    <pre>
    insert into LowRateTempStream
    from TempStreamoutput
    output every 10 sec;    </pre>

- Returning a periodic snapshot of events

    This method works best with windows. When an input stream is connected to a window, snapshot rate limiting emits all the current events that have arrived and do not have corresponding expired events for every predefined time interval.
    If the input stream is not connected to a window, only the last current event for each predefined time interval is emitted.

    This query emits a snapshot of the events in a time window of 5 seconds every 1 second.

    <pre>
    insert into SnapshotTempStream
    from TempStream#window.time(5 sec)
    output snapshot every 1 sec;    </pre>
