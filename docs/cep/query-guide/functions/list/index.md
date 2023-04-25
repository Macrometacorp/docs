---
sidebar_position: 1
title: List Functions
---

List functions allow you to create and interact with lists.

For information on performing scatter and gather using [list:tokenize()](tokenize.md), and [list:collect()](collect.md), refer to the examples in [Data Pipeline Examples](../../../examples/data-pipelines.md).

## Input

Below event is sent to `ProductComboStream`,

[`'Ice Cream'`, `'Chocolate'`, `'Cake'`]

## Output

After processing, the following events will be arriving at each stream:

- NewListStream: [`[Ice Cream, Chocolate, Cake]`]
- ListAnalysisStream: [`true`, `true`, `false`, `Chocolate`, `3`]
- UpdatedListStream: [`[Ice Cream, Chocolate, Toffee]`]

## Example

This example shows how to use basic list functions.

```sql
CREATE STREAM ProductComboStream (product1 string, product2 string, product3 string);

@info(name = 'Create-list')
INSERT INTO NewListStream
SELECT list:create(product1, product2, product3) AS productList
FROM ProductComboStream;

@info(name = 'Check-list')
INSERT INTO ListAnalysisStream
SELECT list:isList(productList) AS isList,
       list:contains(productList, 'Cake') AS isCakePresent,
       list:isEmpty(productList) AS isEmpty,
       list:get(productList, 1) AS valueAt1,
       list:size(productList) AS size
FROM NewListStream;

@info(name = 'Clone-and-update')
INSERT INTO UpdatedListStream
SELECT list:remove(
            list:add(list:clone(productList), "Toffee"),
            "Cake") AS productList
FROM NewListStream;
```

This query defines a stream `ProductComboStream` with attributes `product1`, `product2`, and `product3`. It then creates a list using these attributes and sends the list to the `NewListStream`.

The `Check-list` query checks if the created object is a list, verifies if it contains a specific value ('Cake'), and provides information about the list's size, value at index 1, and whether it is empty or not.

Lastly, the `Clone-and-update` query clones the list, adds 'Toffee' to the end of the list, and removes 'Cake' from the list. The resulting list is then sent to the `UpdatedListStream`.
