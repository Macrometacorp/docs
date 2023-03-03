---
title: Tumbling Window Example
---

This example demonstrates how to summarize data for a specific number of events and how to do that summarization for batches of events.

To demonstrate this, assume that a factory manager wants to track the maximum production in every 10 production runs. For this purpose, a stream worker can be created as follows:

## Stream Worker Code

```sql
@App:name('MaximumProductionApp') 
@App:qlVersion("2")

-- Define an input stream to capture details about each production run.
CREATE STREAM ProductionStream (name string, amount long);

-- Define an output stream to publish the production for the last ten runs.
CREATE SINK DetectedMaximumProductionStream WITH (type='logger', prefix='Maximum production in last 10 runs') (name string, maximumValue long);

INSERT INTO DetectedMaximumProductionStream
SELECT name, MAX(amount) AS maximumValue
FROM ProductionStream WINDOW TUMBLING_LENGTH(10)
GROUP BY name;
```

## Input

Events from the `ProductionStream` include the product `name` and `amount` of each production run.

## Output

A sink annotation is connected to the output stream to log the output events. You can view the logged events by clicking on the **Log Viewer** on the stream worker editor tab.

## Processing


        
1. To define the subset of events to be considered based on the number of events, add the `from` clause with a `lengthBatch` window as follows.

    ```sql
    from ProductionStream window lengthBatch(10)
    ```
    
    `window lengthBatch` indicates that the window added is a length window that considers events in batches when determining subsets. The number of events in each batch is `10`. For details about other window types supported, see [Functions - Unique](../query-guide/functions/unique/deduplicate.md).

2. To derive the values for the `DetectedMaximumProductionStream` output stream, add the `select` statement as follows.

    ```sql
    select name, max(amount) as maximumValue
    ```
    
    Here, the `max()` function is applied to the `amount` attribute to derive the maximum value.
    
3. To group by the product name, add the `group by` clause as follows.

    ```sql
    group by name
    ```
    
4. To insert the maximum production detected into the `DetectedMaximumProductionStream` output stream, add the `insert into` clause as follows.
    ```sql
    insert into DetectedMaximumProductionStream
    ```

The completed stream worker is as follows.


