---
sidebar_position: 7
---

# Summarizing Data

## Introduction

Summarizing data refers to obtaining aggregates in an incremental manner for a specified set of time periods.

## Summarization by clock-time

Performing clock-time based based summarization involves calculating, storing, and then retrieving aggregations for a selected range of time granularities. This process is carried out in two parts:

1. Calculating the aggregations for the selected time granularities and storing the results.
2. Retrieving previously calculated aggregations for selected time granularities.

To understand data summarization further, consider the scenario where a business that sells multiple brands stores its sales data in a physical database for the purpose of retrieving them later to perform sales analysis. Each sales transaction is received with the following details:

    `symbol`: The symbol that represents the brand of the items sold.
    `price`: the price at which each item was sold.
    `amount`: The number of items sold.

The Sales Analyst needs to retrieve the total number of items sold of each brand per month, per week, per day etc., and then retrieve these totals for specific time durations to prepare sales analysis reports.

:::info
It is not always required to maintain a physical database for incremental analysis, but it enables you to try out your aggregations with ease.
:::

The following sections explain how to calculate and store time-based aggregations for this scenarios, and then retrieve them.

### Calculate and store clock-time-based aggregate values

To calculate and store time-based aggregation values for the scenario explained above, follow the procedure below.

1. Start creating a new stream worker. You can name it `TradeApp` For instructions, see [Creating a Stream Worker](create-stream-worker.md).

    ```sql
    @App:name("TradeApp");
    @App:qlVersion("2")
    ```

2. To capture the input events based on which the aggregations are calculated, define an input stream as follows.

    ```sql
    CREATE STREAM TradeStream (symbol string, price double, quantity long, timestamp long);
    ```
    
    :::info
        In addition to the `symbol`, `price`, and `quantity` attributes to capture the input details already mentioned, the above stream definition includes an attribute named timestamp to capture the time at which the sales transaction occurs. The aggregations are executed based on this time. This attribute's value could either be a long value (reflecting the Unix timestamp in milliseconds), or a string value adhering to one of the following formats.
        
        * **`<YYYY>-<MM>-<dd> <HH>:<mm>:<ss> <Z>`**: This format can be used if the timezone needs to be specified explicitly. Here the ISO 8601 UTC offset must be provided for <Z> . e.g., +05:30 reflects the India Time Zone. If time is not in GMT, this value must be provided.)
        * **`<yyyy>-<MM>-<dd> <HH>:<mm>:<ss>`**: This format can be used if the timezone is in GMT.
    :::

3. Create an aggregation as follows. You can name it `TradeAggregation`.

    :::info
        The system uses the aggregation name you define here as part of the database table name. Table name is `<StreamWorker_Name>-<Aggregation_Name>_<Granularity>`. System will automatically create a collection `TradeApp-TradeAggregation_HOUR` as we will be calculating the aggregation hourly in the next step.
    :::    
    ```sql
    CREATE AGGREGATION TradeAggregation WITH(store.type='database', store.replication.type='global')
    ```

4. To calculate aggregations, include a query as follows:

    1.  To select attributes to be included in the output event, add a `select` clause as follows.

        ```sql
        select symbol, avg(price) as avgPrice, sum(quantity) as total
        ```
        
        Here, the `avg()` fuction is applied to the `price` attribute to derive the average price. The `sum()` function is applied to the `quantity` attribute to derive the total quantity.
    
    2. To get input events from the `TradeStream` stream that you previously defined, add a `from` clause as follows.
        ```sql
        from TradeStream
        ```
    
    3. To group the output by the symbol, add a group by clause as follows.
        ```sql
        group by symbol
        ```
    
    4. The timestamp included in each input event allows you to calculate aggregates for the range of time granularities seconds-years. Therefore, to calculate aggregates for each time granularity within this range, add the `aggregate by` clause to this aggregate query as follows.

        ```sql
        aggregate by timestamp every hour;
        ```
        
5. The completed stream worker is as follows.

    ```sql
    @App:name("TradeApp")
    @App:qlVersion("2")

    CREATE STREAM TradeStream (symbol string, price double, quantity long, timestamp long);

    CREATE AGGREGATION TradeAggregation WITH(store.type='database', store.replication.type='global')
   
    @info(name = 'CalculatingAggregates')
    select symbol, avg(price) as avgPrice, sum(quantity) as total
    from TradeStream
    group by symbol
    aggregate by timestamp every hour;
    ```

### Retrieve the stored aggregate values

This section involves retrieving the aggregate values that you calculated and persisted in the [Calculate and store clock-time-based aggregate values subsection](#calculate-and-store-clock-time-based-aggregate-values).

To do this, let's add the definitions and queries required for retrieval to the `TradeApp` stream worker that you have already created in the previous section.

1. Open the `TradeApp` stream worker in the editor by clicking the **Edit** icon on the stream workers tab.

2. To retrieve aggregations, you need to make retrieval requests. To process these requests, let's define a stream as follows:
    ```sql
    CREATE SINK STREAM TradeSummaryStream (symbol string, total long, avgPrice double);
    ```
    
3. To retrieve and process the events, add a new query as follows:

    ```sql
    insert into TradeSummaryStream
    select a.symbol, a.total, a.avgPrice 
    from TradeStream as b join TradeAggregation as a
        on a.symbol == b.symbol 
        within "2014-02-15 00:00:00 +05:30", "2014-03-16 00:00:00 +05:30" 
        per "days" ;
    ```
    
4. The completed stream worker is as follows:

    ```sql
    @App:name("TradeApp")
    @App:qlVersion("2")
    
    CREATE STREAM TradeStream (symbol string, price double, quantity long, timestamp long);
    
    CREATE SINK STREAM TradeSummaryStream (symbol string, total long, avgPrice double);
    
    CREATE AGGREGATION TradeAggregation
    select symbol, avg(price) as avgPrice, sum(quantity) as total
    from TradeStream
    group by symbol
    aggregate by timestamp every hour;
    
    @info(name = 'RetrievingAggregates') 
    insert into TradeSummaryStream
    select a.symbol, a.total, a.avgPrice 
    from TradeStream as b join TradeAggregation as a
        on a.symbol == b.symbol 
        within "2014-02-15 00:00:00 +05:30", "2014-03-16 00:00:00 +05:30" 
        per "days" ;
    ```

## Summarization by Windowing Criteria

This section explains how to apply stream processing logic to process a subset of events received to a stream based on time or the number of events. This is achieved via `stream windows`.

The window can apply to a batch of events or in a sliding manner. This is further explained in the following sections.

### Performing a time-based summarization in a sliding manner

This subsection demonstrates how to summarize data for a short term based on time and well as how to do a summarization in a sliding manner.

To demonstrate this, consider a factory manager who wants to be able to check the production for the last hour at any given time. Every event represents a production run. For this purpose, a Stream worker can be created as follows:

1. Start creating a new stream worker. You can name it `PastHourProductionApp` For instructions, see [Creating a Stream Worker](create-stream-worker.md).

   ```sql
   @App:name('PastHourProductionApp');
   @App:qlVersion("2")
   ```

2. To capture details about each production run, define an input stream:

    ```sql
    CREATE STREAM ProductionStream (name string, amount long);
    ```
    
3. To publish the production for the last hour, define the output stream:

    ```sql
    CREATE SINK PastHourProductionStream WITH (type='logger', prefix='Production totals over the past hour:') (name string, pastHourTotal long);
    ```

    :::note
        A sink annotation is connected to the output stream to log the output events. You can view the logged events by clicking on the **Log Viewer** on the stream worker editor tab. For more information about adding sinks to publish events, see the [Publishing Data](publishing-data.md).
    :::

4. To define how the output is derived, add the `select` statement:

    ```sql
    select name, sum(amount) as pastHourTotal
    ```

    Here, the total is derived by applying the `sum()` function to the `amount` attribute of the `ProductionStream` input stream.
    
5. To specify that the processing done as defined via the `select` statement applies to a time window, add the `from` clause and include the time window as shown below. This must be added above the `select` clause.

    ```sql
    from ProductionStream window time(1 hour)
    ```

    :::note
        `window time` indicates that the window added is a time window. The time considered is one hour. The window is a sliding window which considers the last hour at any given time.

        (For example, when the stream processor calculates the total production during the time 13.00-14.00, next it calculates the total production during the time 13.01-14.01 after the 13.01 minute as elapsed.) 
        
        For details about other window types supported, see [Functions - Unique](../query-guide/functions/unique/deduplicate.md).
    :::

6. To group by the product name, add the `group by` clause as follows.

    ```sql
    group by name
    ```
    
7. To insert the results into the `PastHourProductionStream` output stream, add the `insert into` clause as follows.

    ```sql
    insert into PastHourProductionStream
    ```

8. The completed stream worker is as follows:
    
    ```sql
    @App:name('PastHourProductionApp')
    @App:qlVersion("2")
    
    CREATE STREAM ProductionStream (name string, amount long);
    
    CREATE SINK PastHourProductionStream WITH (type='logger', prefix='Production totals over the past hour:') (name string, pastHourTotal long);
    
    insert into PastHourProductionStream
    select name, sum(amount) as pastHourTotal
    from ProductionStream window time(1 hour)
    group by name;
    ```

### Performing a length-based summarization to a batch of events

This subsection demonstrates how to summarize data for a specific number of events as well as how to do that summarization for batches of events.

To demonstrate this, assume that a factory manager wants to track the maximum production in every 10 production runs. IOn order to do so, let's create a Stream worker as follows:

1. Start creating a new stream worker. You can name it `ProductionApp` For instructions, see [Creating a Stream Worker](create-stream-worker.md).

   ```sql
   @App:name('MaximumProductionApp')
   @App:qlVersion("2")
   ```
   
2. Define an input stream as follows to capture details about the production.

    ```sql
    CREATE STREAM ProductionStream (name string, amount long);
    ```
    
3. To output the maximum production detected every 10 production runs, define an output stream as follows.

    ```sql
    CREATE SINK DetectedMaximumProductionStream WITH (type='logger', prefix='Maximum production in last 10 runs') (name string, maximumValue long);
    ```

    :::note
        A sink annotation is connected to the output stream to log the output events. You can view the logged events by simply clicking on the `Log Viewer` button on the stream worker editor tab. For more information about adding sinks to publish events, see the [Publishing Data](publishing-data.md).
    :::
        
4. To define the subset of events to be considered based on the number of events, add the `from` clause with a `lengthBatch` window as follows.

    ```sql
    from ProductionStream window lengthBatch(10)
    ```
    
    `window lengthBatch` indicates that the window added is a length window that considers events in batches when determining subsets. The number of events in each batch is `10`. For details about other window types supported, see [Functions - Unique](../query-guide/functions/unique/deduplicate.md).

5. To derive the values for the `DetectedMaximumProductionStream` output stream, add the `select` statement as follows.

    ```sql
    select name, max(amount) as maximumValue
    ```
    
    Here, the `max()` function is applied to the `amount` attribute to derive the maximum value.
    
6. To group by the product name, add the `group by` clause as follows.

    ```sql
    group by name
    ```
    
7. To insert the maximum production detected into the `DetectedMaximumProductionStream` output stream, add the `insert into` clause as follows.
    ```sql
    insert into DetectedMaximumProductionStream
    ```

The completed stream worker is as follows.

```sql
@App:name('MaximumProductionApp') 
@App:qlVersion("2")

CREATE STREAM ProductionStream (name string, amount long);

CREATE SINK DetectedMaximumProductionStream WITH (type='logger', prefix='Maximum production in last 10 runs') (name string, maximumValue long);

insert into DetectedMaximumProductionStream
select name, max(amount) as maximumValue
from ProductionStream window lengthBatch(10)
group by name
;
```
