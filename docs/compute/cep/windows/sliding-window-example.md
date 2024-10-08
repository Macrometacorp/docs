---
title: Sliding Window Example
---

This example demonstrates how to summarize data for a short term based on time and how to do a summarization in a sliding manner.

Imagine a factory manager who wants to be able to check the production for the last hour at any given time. Every event represents a production run. For this purpose, a stream worker can be created as follows:

## Stream Worker Code

```sql
@App:name('PastHourProductionApp')
@App:qlVersion("2")

-- Define an input stream to capture details about each production run.
CREATE STREAM ProductionStream (name string, amount long);

-- Define an output stream to publish the production for the last hour.
CREATE SINK PastHourProductionStream WITH (type='log', prefix='Production totals over the past hour:') (name string, pastHourTotal long);

-- Query to process events
INSERT INTO PastHourProductionStream
SELECT name, SUM(amount) AS pastHourTotal
FROM ProductionStream WINDOW SLIDING_TIME(1 hour)
GROUP BY name;
```

## Input

Events from the `ProductionStream` include the product `name` and `amount` of each production run.

## Output

A sink annotation is connected to the output stream to log the output events. You can view the logged events by clicking on the **Log Viewer** on the stream worker editor tab.

## Processing

`INSERT INTO` defines where the processed results are sent, which in this case, is `PastHourProductionStream`.

The total is derived by applying the `sum()` function to the `amount` attribute of the `ProductionStream` input stream.

To specify that the processing done as defined via the `SELECT` statement applies to a time window, the `FROM` clause includes the time window.

`WINDOW SLIDING_TIME` indicates that the window added is a time window. The time considered is one hour. The window is a sliding window that considers the last hour at any given time.

For example, when the stream processor calculates the total production during the time 13.00-14.00, next it calculates the total production during the time 13.01-14.01 after the 13.01 minute as elapsed.

The `GROUP BY` clause groups results by the product name.
