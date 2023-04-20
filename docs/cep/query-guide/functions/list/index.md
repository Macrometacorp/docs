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
-- Defines `ProductComboStream` having `string` type attributes `product1`, `product2`, and `product3`.
CREATE STREAM ProductComboStream ( product1 string, product2 string, product3 string);

@info(name = 'Create-list')
-- Create a list with values of `product1`, `product2`, and `product3`.
insert into NewListStream
select list:create(product1, product2, product3)
            as productList
from ProductComboStream;

@info(name = 'Check-list')
-- Check if `productList` is a List.
insert into ListAnalysisStream
select list:isList(productList) as isList,
-- Check if `productList` contains `'Cake'`.
       list:contains(productList, 'Cake')
            as isCakePresent,
-- Check if `productList` is empty.
       list:isEmpty(productList) as isEmpty,
-- Get the value at index `1` from `productList` .
       list:get(productList, 1) as valueAt1,
-- Get size of `productList`.
       list:size(productList) as size
from NewListStream;

@info(name = 'Clone-and-update')
-- Clone `productList`, add `Toffee` to the end of the list, and remove `Cake` from the list.
insert into UpdatedListStream
select list:remove(
            list:add(list:clone(productList), "Toffee"),
            "Cake") as productList
from NewListStream;
```

<DocCardList />
