---
sidebar_position: 8
---

# Data Pipelines

## Stream Joins

This example shows joining two stream based on a condition.

For more information on other [join operations](query-guide#join-stream) refer the [stream query guide](query-guide.md).


```sql
CREATE STREAM TemperatureStream (roomNo string, temperature double);

CREATE STREAM HumidityStream (roomNo string, humidity double);

@info(name = 'Equi-join')
-- Join latest `temperature` and `humidity` events arriving within 1 minute for each `roomNo`.
insert into TemperatureHumidityStream
select t.roomNo, t.temperature, h.humidity
from TemperatureStream#window.unique:time(roomNo, 1 min) as t
    join HumidityStream#window.unique:time(roomNo, 1 min) as h
    on t.roomNo == h.roomNo;


@info(name = 'Join-on-temperature')
insert into EnrichedTemperatureStream
select t.roomNo, t.temperature, h.humidity
-- Join when events arrive in `TemperatureStream`.
from TemperatureStream as t
-- When events get matched in `time()` window, all matched events are emitted, else `null` is emitted.
    left outer join HumidityStream#window.time(1 min) as h
    on t.roomNo == h.roomNo;
```

### Join Behavior

When events are sent to `TemperatureStream` stream and `HumidityStream` stream, following events will get emitted at `TemperatureHumidityStream` stream via `Equi-join` query, and `EnrichedTemperatureStream` stream via `Join-on-temperature` query.

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

This example shows partitioning events by attribute values.

For more information on partitioning events based on value ranges, refer other examples under data pipelining section.
For more information on [partition](query-guide#partition) refer the [stream query guide](query-guide.md).


```sql
CREATE STREAM LoginStream ( userID string, loginSuccessful bool);

-- Optional purging configuration, to remove partition instances that haven't received events for `1 hour` by checking every `10 sec`.
@purge(enable='true', interval='10 sec', idle.period='1 hour')
-- Partitions the events based on `userID`.
partition with ( userID of LoginStream )

begin
    @info(name='Aggregation-query')
-- Calculates success and failure login attempts from last 3 events of each `userID`.
    insert into #LoginAttempts
    select userID, loginSuccessful, count() as attempts
    from LoginStream#window.length(3)
    group by loginSuccessful;
-- Inserts results to `#LoginAttempts` inner stream that is only accessible within the partition instance.
    


    @info(name='Alert-query')
-- Consumes events from the inner stream, and suspends `userID`s that have 3 consecutive login failures.
    insert into UserSuspensionStream
    select userID, "3 consecutive login failures!" as message
    from #LoginAttempts[loginSuccessful==false and attempts==3];

end;
```

### Partition Behavior

When events are sent to `LoginStream` stream, following events will be generated at `#LoginAttempts` inner stream via `Aggregation-query` query, and `UserSuspensionStream` stream via `Alert-query` query.


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

This example shows performing scatter and gather on string values.


```sql
CREATE STREAM PurchaseStream (userId string, items string, store string);

@info(name = 'Scatter-query')
-- Scatter value of `items` in to separate events by `,`.
insert into TokenizedItemStream
select userId, token as item, store
from PurchaseStream#str:tokenize(items, ',', true);

@info(name = 'Transform-query')
-- Concat tokenized `item` with `store`.
insert into TransformedItemStream
select userId, str:concat(store, "-", item) as itemKey
from TokenizedItemStream;

@info(name = 'Gather-query')
insert into GroupedPurchaseItemStream
-- Concat all events in a batch separating them by `,`.
select userId, str:groupConcat(itemKey, ",") as itemKeys
-- Collect events traveling as a batch via `batch()` window.
from TransformedItemStream#window.batch();
```

### Input

The following event containing a JSON string is sent to `PurchaseStream`:

[`'501'`, `'cake,cookie,bun,cookie'`, `'CA'`]

### Output

After processing, the events arriving at `TokenizedItemStream` will be as follows:

[`'501'`, `'cake'`, `'CA'`], [`'501'`, `'cookie'`, `'CA'`], [`'501'`, `'bun'`, `'CA'`]

The events arriving at `TransformedItemStream` will be as follows:

[`'501'`, `'CA-cake'`], [`'501'`, `'CA-cookie'`], [`'501'`, `'CA-bun'`]

The event arriving at `GroupedPurchaseItemStream` will be as follows:

[`'501'`, `'CA-cake,CA-cookie,CA-bun'`]

## Scatter and Gather (JSON)


This example shows performing scatter and gather on string values.


```sql
CREATE STREAM PurchaseStream (order string, store string);

@info(name = 'Scatter-query')
-- Scatter elements under `$.order.items` in to separate events.
insert into TokenizedItemStream
select json:getString(order, '$.order.id') as orderId,
       jsonElement as item,
       store
from PurchaseStream#json:tokenize(order, '$.order.items');


@info(name = 'Transform-query')
-- Provide `$5` discount to cakes.
insert into DiscountedItemStream
select orderId,
       ifThenElse(json:getString(item, 'name') == "cake",
                  json:toString(
                    json:setElement(item, 'price',
                      json:getDouble(item, 'price') - 5
                    )
                  ),
                  item) as item,
       store
from TokenizedItemStream;


@info(name = 'Gather-query')
insert into GroupedItemStream
-- Combine `item` from all events in a batch as a single JSON Array.
select orderId, json:group(item) as items, store
-- Collect events traveling as a batch via `batch()` window.
from DiscountedItemStream#window.batch();


@info(name = 'Format-query')
insert into DiscountedOrderStream
-- Format the final JSON by combining `orderId`, `items`, and `store`.
select str:fillTemplate("""
    {"discountedOrder":
        {"id":"{{1}}", "store":"{{3}}", "items":{{2}} }
    }""", orderId, items, store) as discountedOrder
from GroupedItemStream;
```

### Input

Below event is sent to `PurchaseStream`,

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

### Output

After processing, following events arrive at `TokenizedItemStream`:

[`'501'`, `'{"name":"cake","price":25.0}'`, `'CA'`],<br/>
[`'501'`, `'{"name":"cookie","price":15.0}'`, `'CA'`],<br/>
[`'501'`, `'{"name":"bun","price":20.0}'`, `'CA'`]

The events arriving at `DiscountedItemStream` will be as follows:

[`'501'`, `'{"name":"cake","price":20.0}'`, `'CA'`],<br/>
[`'501'`, `'{"name":"cookie","price":15.0}'`, `'CA'`],<br/>
[`'501'`, `'{"name":"bun","price":20.0}'`, `'CA'`]

The event arriving at `GroupedItemStream` will be as follows:

[`'501'`, `'[{"price":20.0,"name":"cake"},{"price":15.0,"name":"cookie"},{"price":20.0,"name":"bun"}]'`, `'CA'`]

The event arriving at `DiscountedOrderStream` will be as follows:

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