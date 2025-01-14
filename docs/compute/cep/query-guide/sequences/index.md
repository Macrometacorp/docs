---
sidebar_position: 1
title: Sequences
---

_Sequences_ are a state machine implementation that allow you to detect the sequence of event occurrences over time.
Here all matching events must arrive consecutively to match the sequence condition, and there cannot be any non-matching events arriving within a matching sequence of events. This can correlate events within a single stream or between multiple streams.

For more examples, refer to [Correlating Events to Find a Trend (Sequence)](../../examples/correlating-events/sequence-examples).

## Purpose

Sequences allows you to detect a specified event sequence over a specified time period.

## Syntax

The syntax for a sequence query is:

```sql
INSERT INTO <output stream>
SELECT <event reference>.<attribute name>, <event reference>.<attribute name>, ...
FROM (every)? <event reference>=<input stream>[<filter condition>],
    <event reference>=<input stream [<filter condition>],
    ...
    (WITHIN <time gap>)?     
```

## Query Parameters

| Items | Description |
|-------------------|-------------|
| `,` | This represents the immediate next event i.e., when an event that matches the first condition arrives, the event that arrives immediately after it should match the second condition. |
| `<event reference>` | This allows you to add a reference to the the matching event so that it can be accessed later for further processing. |
| `(within <time gap>)?` | The `within` clause is optional. It defines the time duration within which all the matching events should occur. |
| `every` | `every` is an optional keyword. This defines whether the matching event should be triggered for every event that arrives at the specified stream with the matching condition.  When this keyword is not used, the matching is carried out only once. |

## Example 1

```sql
INSERT INTO AlertStream
SELECT e1.temp AS initialTemp, e2.temp AS finalTemp
FROM every e1=TempStream, e2=TempStream[e1.temp + 1 < temp];
```

This query generates an alert if the increase in the temperature between two consecutive temperature events exceeds one degree.

## Example 2

Here all matching events need to arrive consecutively, and there should not be any non-matching events in between the matching sequence of events.

### Simple Sequence Example

This stream worker can be used to detect trends from a stock trades stream; in the above example, peak stock rate identified.

```sql
-- Defines `StockRateStream` having information on stock rate such as `symbol`, `price` and `volume`.
CREATE STREAM StockRateStream (symbol string, price float, volume int);

-- Defines `PeakStockRateStream` which contains the peak stock rate.
CREATE SINK PeakStockRateStream WITH (type='log') (symbol string, rateAtPeak float);

-- Partition the `StockRateStream` events by `symbol`
partition with (symbol of StockRateStream)
begin

-- Identifies the peak stock price (top rate of the stock price trend)
    INSERT INTO PeakStockRateStream
    SELECT e1.symbol, e2.price AS rateAtPeak
    FROM every e1=StockRateStream,
    	e2=StockRateStream[e1.price < price],
    	e3=StockRateStream[e2.price > price]
        WITHIN 10 min;
end;
```

### Simple Sequence Input

Below events are sent to `StockRateStream` within 10 minutes:

[`mint-leaves`, `35`, `20`]

[`mint-leaves`, `40`, `15`]

[`mint-leaves`, `38`, `20`]

### Simple Sequence Output

After processing the above input events, the event arriving at `PeakStockRateStream` is:

[`mint-leaves`, `40`]
