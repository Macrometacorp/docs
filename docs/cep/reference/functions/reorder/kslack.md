---
title: kslack (Stream Processor)
---

Stream processor performs reordering of out-of-order events using K-Slack algorithm.

Syntax

    reorder:kslack(<LONG> timestamp)
    reorder:kslack(<LONG> timestamp, <LONG> timeout)
    reorder:kslack(<LONG> timestamp, <BOOL> discard.late.arrival)
    reorder:kslack(<LONG> timestamp, <LONG> timeout, <LONG> max.k)
    reorder:kslack(<LONG> timestamp, <LONG> timeout, <BOOL> discard.late.arrival)
    reorder:kslack(<LONG> timestamp, <LONG> timeout, <LONG> max.k, <BOOL> discard.late.arrival)

## Query Parameters

| Name                 | Description                                                                                                                                                             | Default Value                                          | Possible Data Types | Optional | Dynamic |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|---------------------|----------|---------|
| timestamp            | The event timestamp on which the events should be ordered.                                                                                                              |                                                        | LONG                | No       | Yes     |
| timeout              | A timeout value in milliseconds, where the buffered events who are older than the given timeout period get flushed every second.                                        | `-1` (timeout is infinite)                           | LONG                | Yes      | No      |
| max.k                | The maximum K-Slack window threshold (`K` parameter).                                                                                                                 | \`9,223,372,036,854,775,807\` (The maximum Long value) | LONG                | Yes      | No      |
| discard.late.arrival | If set to `true` the processor would discarded the out-of-order events arriving later than the K-Slack window, and in otherwise it allows the late arrivals to proceed. | false                                                  | BOOL                | Yes      | No      |

## Example 1

    CREATE STREAM StockStream (eventTime long, symbol string, volume long);

    @info(name = 'query1')
    insert into OutputStream
    select eventTime, symbol, volume
    from StockStream#reorder:kslack(eventTime, 5000);

The query reorders events based on the `eventTime` attribute value, and it forcefully flushes all the events who have arrived older than the given `timeout` value (`5000` milliseconds) every second.
