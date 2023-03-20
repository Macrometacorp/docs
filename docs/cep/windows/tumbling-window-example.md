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

-- Define an output stream to publish the maximum production for the last ten runs.
CREATE SINK DetectedMaximumProductionStream WITH (type='logger', prefix='Maximum production in last 10 runs') (name string, maximumValue long);

-- Query to process events
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

`INSERT INTO` defines where the processed results are sent, which in this case, is `DetectedMaximumProductionStream`.

The maximum is derived by applying the `max()` function is applied to the `amount` attribute to derive the maximum value of the `ProductionStream` input stream.

To specify that the processing done as defined via the `SELECT` statement applies to a tumbling length window, the `FROM` clause includes the tumbling (batch) window.

`WINDOW TUMBLING_LENGTH` indicates that the window added is a length window that considers events in batches when determining subsets. The number of events in each batch is `10`.

The `GROUP BY` clause groups results by the product name.
