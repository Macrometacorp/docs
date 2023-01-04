---
sidebar_position: 1
title: Map Functions
---

Map functions allow you to create and interact with maps.

For information on performing scatter and gather using [map:tokenize()](tokenize.md), and [map:collect()](collect.md), refer to the examples in [Data Pipeline Examples](../../../examples/data-pipelines.md).

## Input

Below event is sent to `CoupleDealInfoStream`,

[`'Chocolate'`, `18.0`, `'Ice Cream'`, `24.0`]

## Output

After processing, the following events arrive at each stream:

- NewMapStream: [`{Ice Cream=24.0, Chocolate =18.0}`]
- MapAnalysisStream: [`true`, `false`, `true`, `false`, `[Ice Cream, Chocolate]`, `2`]
- ItemInsertedMapStream: [`{Ice Cream=24.0, Gift=1.0, Chocolate =18.0}`]

## Example

This example provides examples of basic map functions.

```sql
-- Defines `CoupleDealInfoStream` having attributes `item1`, `price1`, `item2`, and `price2` with `string` and `double` types.
CREATE STREAM CoupleDealInfoStream ( item1 string, price1 double, item2 string, price2 double);

@info(name = 'Create-map')
-- Create a map with values of `item1` and `item2` as keys, and `price1` and `price2` as values.
insert into NewMapStream
select map:create(item1, price1, item2, price2) as itemPriceMap
from CoupleDealInfoStream;

@info(name = 'Check-map')
-- Check if `itemPriceMap` is a Map.
insert into MapAnalysisStream
select map:isMap(itemPriceMap) as isMap,
-- Check if `itemPriceMap` contains a key `'Cookie'`.
       map:containsKey(itemPriceMap, 'Cookie')
            as isCookiePresent,
-- Check if `itemPriceMap` contains a value `24.0`.
       map:containsValue(itemPriceMap, 24.0)
            as isThereItemWithPrice24,
-- Check if `itemPriceMap` is empty.
       map:isEmpty(itemPriceMap) as isEmpty,
-- Get all keys of `itemPriceMap` as a List.
       map:keys(itemPriceMap) as keys,
-- Get size of `itemPriceMap`.
       map:size(itemPriceMap) as size
from NewMapStream;

@info(name = 'Clone-and-update')
-- Clone `itemPriceMap`, put `Gift` key with value `1.0` to it, and replace `Cake` key with value `12.0`.
insert into ItemInsertedMapStream
select map:replace(
                   map:put(map:clone(itemPriceMap),
                           "Gift",
                           1.0),
                   "Cake",
                   12.0) as itemPriceMap
from NewMapStream;
```
