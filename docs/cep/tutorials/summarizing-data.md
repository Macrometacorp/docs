---
title: Summarizing Data Examples
---



## Summarization by Windowing Criteria

This section explains how to apply stream processing logic to process a subset of events received to a stream based on time or the number of events. This is achieved via `stream windows`.

Windows can apply to a batch of events or in a sliding manner. This is further explained in the following sections.

### Performing a time-based summarization in a sliding manner

This subsection demonstrates how to summarize data for a short term based on time and well as how to do a summarization in a sliding manner.

To demonstrate this, consider a factory manager who wants to be able to check the production for the last hour at any given time. Every event represents a production run. For this purpose, a Stream worker can be created as follows:

1. Start creating a new stream worker. You can name it `PastHourProductionApp`.

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

INSERT INTO PastHourProductionStream
SELECT name, SUM(amount) AS pastHourTotal
FROM ProductionStream WINDOW time(1 hour)
GROUP BY name;
```

### Performing a length-based summarization to a batch of events

This subsection demonstrates how to summarize data for a specific number of events as well as how to do that summarization for batches of events.

To demonstrate this, assume that a factory manager wants to track the maximum production in every 10 production runs. IOn order to do so, let's create a Stream worker as follows:

1. Start creating a new stream worker. You can name it `ProductionApp`.

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

INSERT INTO DetectedMaximumProductionStream
SELECT name, MAX(amount) AS maximumValue
FROM ProductionStream WINDOW lengthBatch(10)
GROUP BY name;
```
