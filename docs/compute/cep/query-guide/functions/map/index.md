---
sidebar_position: 1
title: Map Functions
---

Map functions allow you to create and interact with maps. A map, also known as a dictionary or hash. is a data structure that implements an associative array abstract data type, a structure that can map keys to values.

A map contains entries that are key-value pairs. Each unique key corresponds to a value. Keys are used to locate and retrieve the values they are associated with. This is particularly useful when the volume of data is large, such that retrieving data based on an index (like an array) is not efficient.

A map might look something like this:

```json
{
  "symbol": "IBM",
  "price": 200,
  "volume": 100
}
```

For information on performing scatter and gather using [map:tokenize()](tokenize.md), and [map:collect()](collect.md), refer to the examples in [Data Pipeline Examples](../../../examples/data-pipelines.md).

## Input

Below event is sent to `CoupleDealInfoStream`,

[`'Chocolate'`, `18.0`, `'Ice Cream'`, `24.0`]

## Output

After processing, the following events arrive at each stream:

- NewMapStream: [`{Ice Cream=24.0, Chocolate =18.0}`]
- MapAnalysisStream: [`true`, `false`, `true`, `false`, `[Ice Cream, Chocolate]`, `2`]
- ItemInsertedMapStream: [`{Ice Cream=24.0, Gift=1.0, Chocolate =18.0}`]

## Example 1

This example provides examples of basic map functions.

```sql
CREATE STREAM CoupleDealInfoStream (item1 string, price1 double, item2 string, price2 double);

@info(name = 'Create-map')
INSERT INTO NewMapStream
SELECT map:create(item1, price1, item2, price2) AS itemPriceMap
FROM CoupleDealInfoStream;

@info(name = 'Check-map')
INSERT INTO MapAnalysisStream
SELECT map:isMap(itemPriceMap) AS isMap,
       map:containsKey(itemPriceMap, 'Cookie') AS isCookiePresent,
       map:containsValue(itemPriceMap, 24.0) AS isThereItemWithPrice24,
       map:isEmpty(itemPriceMap) AS isEmpty,
       map:keys(itemPriceMap) AS keys,
       map:size(itemPriceMap) AS size
FROM NewMapStream;

@info(name = 'Clone-and-update')
INSERT INTO ItemInsertedMapStream
SELECT map:replace(
                   map:put(map:clone(itemPriceMap),
                           "Gift",
                           1.0),
                   "Cake",
                   12.0) AS itemPriceMap
FROM NewMapStream;
```

The given query defines a stream `CoupleDealInfoStream` with attributes `item1`, `price1`, `item2`, and `price2`. Then, it creates a new map using these attributes, with `item1` and `item2` as keys and `price1` and `price2` as values.

The `Check-map` query checks if the created object is a map, verifies if it contains specific keys and values, and provides information about the map's size, keys, and whether it is empty or not.

Lastly, the `Clone-and-update` query clones the map, adds a new key-value pair `"Gift"` with value `1.0`, and updates the value of the `"Cake"` key to `12.0`. The resulting map is then sent to the `ItemInsertedMapStream`.
