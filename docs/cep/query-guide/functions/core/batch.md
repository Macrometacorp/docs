---
title: batch (Window)
---

A window that holds an incoming events batch. When a new set of events arrives, the previously arrived old events will be expired. Batch window can be used to aggregate events that comes in batches. If it has the parameter length specified, then batch window process the batch as several chunks.

Syntax

    batch()
    batch(<INT> window.length)

## Query Parameters

| Name          | Description           | Default Value                                                                           | Possible Data Types | Optional | Dynamic |
|---------------|-----------------------|-----------------------------------------------------------------------------------------|---------------------|----------|---------|
| window.length | The length of a chunk | If length value was not given it assign 0 as length and process the whole batch as once | INT                 | Yes      | No      |

## Example 1

    CREATE STREAM consumerItemStream (itemId string, price float)
    insert into outputStream
    select price, str:groupConcat(itemId) as itemIds
    from consumerItemStream WINDOW TUMBLING()
    group by price;

This will output comma separated items IDs that have the same price for each incoming batch of events.