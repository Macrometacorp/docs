---
title: TUMBLING()
---

A window that holds an incoming events batch. When a new set of events arrives, the old events are expired. Tumbling windows can be used to aggregate events that comes in batches. If it has the parameter length specified, then the batch window processes the batch as several chunks.

## Syntax

    WINDOW TUMBLING()
    WINDOW TUMBLING(length <INT>)

## Query Parameters

| Name          | Description           | Default Value               | Possible Data Types | Optional | Dynamic |
|------------|-----------------|-------------------------------------------------------|-----------------|----------|---------|
| length | The length of a batch. | If length value was not given, it assigns 0 as length and process the whole batch at once. | INT                 | Yes      | No      |

## Example 1

```sql
CREATE STREAM consumerItemStream (itemId string, price float);
CREATE SINK STREAM OutputStream (price float, itemIds string);

INSERT INTO OutputStream
SELECT price, str:groupConcat(itemId) AS itemIds
FROM consumerItemStream WINDOW TUMBLING()
GROUP BY price;
```

This outputs comma-separated item IDs that have the same price for each incoming batch of events.
