---
title: kslack (Stream Processor)
---

Stream processor performs reordering of out-of-order events using K-Slack algorithm.

## Syntax

```sql
reorder:kslack(<LONG> timestamp)
reorder:kslack(<LONG> timestamp, <LONG> timeout)
reorder:kslack(<LONG> timestamp, <BOOL> discard.late.arrival)
reorder:kslack(<LONG> timestamp, <LONG> timeout, <LONG> max.k)
reorder:kslack(<LONG> timestamp, <LONG> timeout, <BOOL> discard.late.arrival)
reorder:kslack(<LONG> timestamp, <LONG> timeout, <LONG> max.k, <BOOL> discard.late.arrival)
```

## Query Parameters

| Name                 | Description          | Default Value| Possible Data Types | Optional | Dynamic |
|----------------------|----------------|------------------------|---------------------|----------|---------|
| timestamp            | The event timestamp on which the events should be ordered.     |              | LONG                | No       | Yes     |
| timeout              | A timeout value in milliseconds, where the buffered events who are older than the given timeout period get flushed every second.                   | `-1` (timeout is infinite)      | LONG                | Yes      | No      |
| max.k                | The maximum K-Slack window threshold (`K` parameter).        | `9,223,372,036,854,775,807` (The maximum Long value) | LONG                | Yes      | No      |
| discard.late.arrival | If set to `true` the processor would discarded the out-of-order events arriving later than the K-Slack window, and in otherwise it allows the late arrivals to proceed. | false        | BOOL                | Yes      | No      |

## Example 1

```sql
CREATE STREAM StockStream (eventTime long, symbol string, volume long);

@info(name = 'kslackReorderingQuery')
INSERT INTO OutputStream
SELECT eventTime, symbol, volume
FROM StockStream#reorder:kslack(eventTime, 5000);
```

The `kslackReorderingQuery` processes stock events from the `StockStream` and outputs the reordered events to the `OutputStream`.

The `#reorder:kslack(eventTime, 5000)` part of the query is an event reordering extension. It reorders events based on the `eventTime` attribute value and forcefully flushes all events that have arrived older than the given `timeout` value (in this case, `5000` milliseconds or 5 seconds) every second.

The query's output includes the `eventTime`, `symbol`, and `volume` of the reordered events. The result is then directed to the `OutputStream`.
