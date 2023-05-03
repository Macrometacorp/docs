---
sidebar_position: 40
title: Data Pipeline Examples
---

This page explains ways to create data pipelines.

## Stream Joins

This example shows joining two stream based on a condition.

For more information on other [join operations](../query-guide/query.md#join-stream), refer to the [Stream Worker Query Guide](../query-guide/index.md).

### Stream Joins Example

```sql
CREATE STREAM TemperatureStream (roomNo string, temperature double);

CREATE STREAM HumidityStream (roomNo string, humidity double);

@info(name = 'Equi-join')
-- Join latest `temperature` and `humidity` events arriving within 1 minute for each `roomNo`.
INSERT INTO TemperatureHumidityStream
SELECT t.roomNo, t.temperature, h.humidity
FROM TemperatureStream window unique:time(roomNo, 1 min) AS t
    JOIN HumidityStream window unique:time(roomNo, 1 min) AS h
    ON t.roomNo == h.roomNo;


@info(name = 'Join-on-temperature')
INSERT INTO EnrichedTemperatureStream
SELECT t.roomNo, t.temperature, h.humidity
-- Join when events arrive in `TemperatureStream`.
FROM TemperatureStream AS t
-- When events get matched in `time()` window, all matched events are emitted, else `null` is emitted.
    LEFT OUTER JOIN HumidityStream window sliding_time(1 min) AS h
    ON t.roomNo == h.roomNo;
```

### JOIN Behavior

When events are sent to `TemperatureStream` stream and `HumidityStream` stream, the following events are emitted at `TemperatureHumidityStream` via `Equi-JOIN` query, and `EnrichedTemperatureStream` via `JOIN-on-temperature` query:

|Time | Input to `TemperatureStream` |  Input to `HumidityStream` | Output at `TemperatureHumidityStream` | Output at `EnrichedTemperatureStream` |
|---|---|---|---|---|
| 9:00:00 | [`'1001'`, `18.0`] | -                  | -                      | [`'1001'`, `18.0`, `null`] |
| 9:00:10 | -                  | [`'1002'`, `72.0`] | -                      | - |
| 9:00:15 | -                  | [`'1002'`, `73.0`] | -                      | - |
| 9:00:30 | [`'1002'`, `22.0`] | -                  | [`'1002'`, `22.0`, `73.0`] | [`'1002'`, `22.0`, `72.0`], <br/>[`'1002'`, `22.0`, `73.0`] |
| 9:00:50 | -                  | [`'1001'`, `60.0`] | [`'1001'`, `18.0`, `60.0`] | - |
| 9:01:10 | -                  | [`'1001'`, `62.0`] | - | - |
| 9:01:20 | [`'1001'`, `17.0`] | -                  | [`'1001'`, `17.0`, `62.0`] | [`'1001'`, `17.0`, `60.0`], <br/>[`'1001'`, `17.0`, `62.0`] |
| 9:02:10 | [`'1002'`, `23.5`] | - | - | [`'1002'`, `23.5`, `null`] |

## Partition Events by Value

This example shows partitioning events by attribute values. For more informatiON ON [partition](../query-guide/partition/index.md) refer the [Stream Query Guide](../query-guide/index.md).

### Partition Events by Value Example

```sql
CREATE STREAM LoginStream ( userID string, loginSuccessful bool);

-- Optional purging configuratiON to remove partitiON instances that haven't received events for `1 hour` by checking every `10 sec`.
@purge(enable='true', interval='10 sec', idle.period='1 hour')
-- Partitions the events based ON `userID`.
partitiON with ( userID of LoginStream )

begin
    @info(name='Aggregation-query')
-- Calculates success and failure login attempts FROM the last 3 events of each `userID`.
    INSERT INTO #LoginAttempts
    SELECT userID, loginSuccessful, count() AS attempts
    FROM LoginStream WINDOW SLIDING_LENGTH(3)
    GROUP BY loginSuccessful;
-- Inserts results to `#LoginAttempts` inner stream that is only accessible within the partitiON instance.

    @info(name='Alert-query')
-- Consumes events FROM the inner stream, and suspends `userID`s that have 3 consecutive login failures.
    INSERT INTO UserSuspensionStream
    SELECT userID, "Three consecutive login failures!" AS message
    FROM #LoginAttempts[loginSuccessful==false and attempts==3];
end;
```

### Partition Behavior

When events are sent to `LoginStream` stream, following events will be generated at `#LoginAttempts` inner stream via `Aggregation-query` query, and `UserSuspensionStream` via `Alert-query` query:

| Input to `TemperatureStream` | At `#LoginAttempts` | Output at `UserSuspensionStream` |
|---|---|---|
| [`'1001'`, `false`] | [`'1001'`, `false`, `1`]  | - |
| [`'1002'`, `true`]  | [`'1002'`, `true`, `1`]   | - |
| [`'1002'`, `false`] | [`'1002'`, `false`, `1`]  | - |
| [`'1002'`, `false`] | [`'1002'`, `false`, `2`]  | - |
| [`'1001'`, `false`] | [`'1001'`, `false`, `2`]  | - |
| [`'1001'`, `true`]  | [`'1001'`, `true`, `1`]   | - |
| [`'1001'`, `false`] | [`'1001'`, `false`, `2`]  | - |
| [`'1002'`, `false`] | [`'1002'`, `false`, `2`]  | [`'1002'`, `'3 consecutive login failures!'`] |

## Scatter and Gather (String)

This example shows performing scatter and gather ON string values.

### Scatter and Gather (String) Example

```sql
CREATE STREAM PurchaseStream (userId string, items string, store string);

@info(name = 'Scatter-query')
-- Scatter value of `items` in to separate events by `,`.
INSERT INTO TokenizedItemStream
SELECT userId, token AS item, store
FROM PurchaseStream#str:tokenize(items, ',', true);

@info(name = 'Transform-query')
-- Concat tokenized `item` with `store`.
INSERT INTO TransformedItemStream
SELECT userId, str:concat(store, "-", item) AS itemKey
FROM TokenizedItemStream;

@info(name = 'Gather-query')
INSERT INTO GroupedPurchaseItemStream
-- Concat all events in a batch separating them by `,`.
SELECT userId, str:groupConcat(itemKey, ",") AS itemKeys
-- Collect events traveling AS a batch via `batch()` window.
FROM TransformedItemStream window batch();
```

### Scatter and Gather (String) Input

The following event containing a JSON string is sent to `PurchaseStream`:

[`'501'`, `'cake,cookie,bun,cookie'`, `'CA'`]

### Scatter and Gather (String) Output

After processing, the events arrive at `TokenizedItemStream`:

[`'501'`, `'cake'`, `'CA'`], [`'501'`, `'cookie'`, `'CA'`], [`'501'`, `'bun'`, `'CA'`]

The events arrive at `TransformedItemStream`:

[`'501'`, `'CA-cake'`], [`'501'`, `'CA-cookie'`], [`'501'`, `'CA-bun'`]

The event arrive at `GroupedPurchaseItemStream`:

[`'501'`, `'CA-cake,CA-cookie,CA-bun'`]

## Scatter and Gather (JSON)

This example shows performing scatter and gather ON JSON values.

### Scatter and Gather (JSON) Example

```sql
CREATE STREAM PurchaseStream (order string, store string);

@info(name = 'Scatter-query')
-- Scatter elements under `$.order.items` in to separate events.
INSERT INTO TokenizedItemStream
SELECT json:getString(order, '$.order.id') AS orderId,
       jsonElement AS item,
       store
FROM PurchaseStream#json:tokenize(order, '$.order.items');


@info(name = 'Transform-query')
-- Provide `$5` discount to cakes.
INSERT INTO DiscountedItemStream
SELECT orderId,
       ifThenElse(json:getString(item, 'name') == "cake",
                  json:toString(
                    json:setElement(item, 'price',
                      json:getDouble(item, 'price') - 5
                    )
                  ),
                  item) AS item,
       store
FROM TokenizedItemStream;


@info(name = 'Gather-query')
INSERT INTO GroupedItemStream
-- Combine `item` FROM all events in a batch AS a single JSON array.
SELECT orderId, json:group(item) AS items, store
-- Collect events traveling AS a batch via `batch()` window.
FROM DiscountedItemStream window batch();


@info(name = 'Format-query')
INSERT INTO DiscountedOrderStream
-- Format the final JSON by combining `orderId`, `items`, and `store`.
SELECT str:fillTemplate("""
    {"discountedOrder":
        {"id":"{{1}}", "store":"{{3}}", "items":{{2}} }
    }""", orderId, items, store) AS discountedOrder
FROM GroupedItemStream;
```

### Scatter and Gather (JSON) Input

Below event is sent to `PurchaseStream`:

```json
[{
   "order":{
      "id":"501",
      "items":[{"name":"cake", "price":25.0},
               {"name":"cookie", "price":15.0},
               {"name":"bun", "price":20.0}
      ]
   }
}, 'CA']
```

### Scatter and Gather (JSON) Output

After processing, following events arrive at `TokenizedItemStream`:

[`'501'`, `'{"name":"cake","price":25.0}'`, `'CA'`],<br/>
[`'501'`, `'{"name":"cookie","price":15.0}'`, `'CA'`],<br/>
[`'501'`, `'{"name":"bun","price":20.0}'`, `'CA'`]

The events arrive at `DiscountedItemStream`:

[`'501'`, `'{"name":"cake","price":20.0}'`, `'CA'`],<br/>
[`'501'`, `'{"name":"cookie","price":15.0}'`, `'CA'`],<br/>
[`'501'`, `'{"name":"bun","price":20.0}'`, `'CA'`]

The event arriving at `GroupedItemStream` is:

[`'501'`, `'[{"price":20.0,"name":"cake"},{"price":15.0,"name":"cookie"},{"price":20.0,"name":"bun"}]'`, `'CA'`]

The event arriving at `DiscountedOrderStream` is:

```json
    [
        {"discountedOrder":
            {
                "id":"501",
                "store":"CA",
                "items":[{"price":20.0,"name":"cake"},
                        {"price":15.0,"name":"cookie"},
                        {"price":20.0,"name":"bun"}] 
            }
        }
    ]
```
