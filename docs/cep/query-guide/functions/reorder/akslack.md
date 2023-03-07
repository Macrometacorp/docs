---
title: akslack (Stream Processor)
---

Stream processor performs reordering of out-of-order events optimized for a given parameter using [AQ-K-Slack algorithm](http://dl.acm.org/citation.cfm?doid=2675743.2771828). This is best for reordering events on attributes those are used for aggregations.data .

## Syntax

    reorder:akslack(<LONG> timestamp, <INT|FLOAT|LONG|DOUBLE> correlation.field)
    reorder:akslack(<LONG> timestamp, <INT|FLOAT|LONG|DOUBLE> correlation.field, <LONG> batch.size)
    reorder:akslack(<LONG> timestamp, <INT|FLOAT|LONG|DOUBLE> correlation.field, <LONG> batch.size, <LONG> timeout)
    reorder:akslack(<LONG> timestamp, <INT|FLOAT|LONG|DOUBLE> correlation.field, <LONG> batch.size, <LONG> timeout, <LONG> max.k)
    reorder:akslack(<LONG> timestamp, <INT|FLOAT|LONG|DOUBLE> correlation.field, <LONG> batch.size, <LONG> timeout, <LONG> max.k, <BOOL> discard.late.arrival)
    reorder:akslack(<LONG> timestamp, <INT|FLOAT|LONG|DOUBLE> correlation.field, <LONG> batch.size, <LONG> timeout, <LONG> max.k, <BOOL> discard.late.arrival, <DOUBLE> error.threshold, <DOUBLE> confidence.level)

## Query Parameters

| Name      | Description     | Default Value   | Possible Data Types   | Optional | Dynamic |
|----------------------|---------------------------|------------------------------|------------------|----------|---------|
| timestamp            | The event timestamp on which the events should be ordered.     |                 | LONG                  | No       | Yes     |
| correlation.field    | By monitoring the changes in this field Alpha K-Slack dynamically optimizes its behavior. This field is used to calculate the runtime window coverage threshold, which represents the upper limit set for unsuccessfully handled late arrivals. |                 | INT FLOAT LONG DOUBLE | No       | Yes     |
| batch.size           | The parameter `batch.size` denotes the number of events that should be considered in the calculation of an alpha value. This should be greater than or equal to 15.               | `10,000`      | LONG                  | Yes      | No      |
| timeout              | A timeout value in milliseconds, where the buffered events who are older than the given timeout period get flushed every second.             | \`-1\` (timeout is infinite)      | LONG                  | Yes      | No      |
| max.k                | The maximum K-Slack window threshold (`K` parameter).        | `9,223,372,036,854,775,807` (The maximum Long value) | LONG                  | Yes      | No      |
| discard.late.arrival | If set to `true` the processor would discarded the out-of-order events arriving later than the K-Slack window, and in otherwise it allows the late arrivals to proceed.             | false           | BOOL                  | Yes      | No      |
| error.threshold      | The error threshold to be applied in Alpha K-Slack algorithm.  | `0.03` (3%)   | DOUBLE                | Yes      | No      |
| confidence.level     | The confidence level to be applied in Alpha K-Slack algorithm. | `0.95` (95%)  | DOUBLE                | Yes      | No      |

## Example 1

    CREATE STREAM StockStream (eventTime long, symbol string, volume long);

    @info(name = 'query1')
    insert into OutputStream
    select eventTime, symbol, sum(volume) as total
    from StockStream#reorder:akslack(eventTime, volume, 20) WINDOW SLIDING_TIME(5 min);

The query reorders events based on the `eventTime` attribute value and optimizes for aggregating `volume` attribute considering last 20 events.
