---
sidebar_position: 3
---

# Values & Types

## Basic Types

Provides introduction to basic Stream app attribute types which are `int`, `long`, `float`, `double`, `string`, and `object`, and some key functions such as `convert()`, `instanceOf...()`, and `cast()`.

In Stream apps, other types such as list, map, etc, should be passed as `object` into streams. For more information on other types refer other examples under Values and Types section.

For information on [values](query-guide#value), and other useful [functions](query-guide#function), refer the [stream query guide](query-guide.md).

### Example

```
-- Defines `PatientRegistrationInputStream` having information in all primitive types.
CREATE STREAM PatientRegistrationInputStream (
                 seqNo long, name string, age int,
                 height float, weight double, photo object,
                 isEmployee bool, wardNo object);


-- Defines the resulting `PatientRegistrationStream` after processing.
CREATE STREAM PatientRegistrationStream (
                 seqNo long, name string, age int,
                 height double, weight double, photo object,
                 isPhotoString bool, isEmployee bool,
                 wardNo int);


@info(name = 'Type-processor')
insert into PatientRegistrationStream
select seqNo, name, age,
-- `convert()` used to convert `float` type to `double`.
       convert(height, 'double') as height,

       weight, photo,
-- `instanceOfString()` checks if the photo is an instance of `string`.
       instanceOfString(photo) as isPhotoString,

       isEmployee,
-- `cast()` cast the value of wardNo to `int`.
       cast(wardNo, 'int') as wardNo
from PatientRegistrationInputStream;
```

### Input

Below event is sent to `PatientRegistrationInputStream`,

[`1200098`, `'Peter Johnson'`, `34`, `194.3f`, `69.6`, `#Fjoiu59%3hkjnknk$#nFT`, `true`, `34`]

Here, assume that the content of the photo (`#Fjoiu59%3hkjnknk$#nFT`) is binary.

### Output

After processing, the event arriving at `PatientRegistrationStream` will be as follows:

[`1200098`, `'Peter Johnson'`, `34`, `194.3`, `69.6`, `#Fjoiu59%3hkjnknk$#nFT`, `false`, `true`, `34`]

## Map

Provides examples on basic map functions provided via [map](extensions/execution/map.md) extension.

For information of performing scatter and gather using `map:tokenize()`, and `map:collect()` refer the examples in Data Pipelining section. The information on all map functions is [here](extensions/execution/map.md).

### Example

```
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

### Input

Below event is sent to `CoupleDealInfoStream`,

[`'Chocolate'`, `18.0`, `'Ice Cream'`, `24.0`]

### Output

After processing, the following events will be arriving at each stream:

* NewMapStream: <br/>[`{Ice Cream=24.0, Chocolate =18.0}`]
* MapAnalysisStream: <br/>[`true`, `false`, `true`, `false`, `[Ice Cream, Chocolate]`, `2`]
* ItemInsertedMapStream: <br/>[`{Ice Cream=24.0, Gift=1.0, Chocolate =18.0}`]

## List

Provides examples on basic list functions provided via [list](extensions/execution/list.md) extension.

For information of performing scatter and gather using `list:tokenize()`, and `list:collect()` refer the examples in Data Pipelining section. The information on all list functions is [here](extensions/execution/list.md).

### Example

```
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

### Input

Below event is sent to `ProductComboStream`,

[`'Ice Cream'`, `'Chocolate'`, `'Cake'`]

### Output

After processing, the following events will be arriving at each stream:

* NewListStream: <br/>[`[Ice Cream, Chocolate, Cake]`]
* ListAnalysisStream: <br/>[`true`, `true`, `false`, `Chocolate`, `3`]
* UpdatedListStream: <br/>[`[Ice Cream, Chocolate, Toffee]`]


## Null

Provides examples on using nulls in Stream Apps.

For more information refer the [stream query guide](query-guide.md).

### Example

```js
CREATE STREAM ProductInputStream (item string, price double);

-- Empty `ProductInfoTable` with attributes `item` and `discount`.
CREATE TABLE ProductInfoTable (item string, discount double);

@info(name = 'Check-for-null')
-- Checks if `price` contains `null` value.
insert into ProductValidationStream
select item, price is null as isPriceNull
-- Filter events with `item` not having `null` value.
from ProductInputStream [not(item is null)];

@info(name = 'Outer-join-with-table')
insert into DiscountValidationStream
select s.item, s.price, t.discount,
-- Check if `math:power()` returns `null`.
       math:power(t.discount, 2) is null
            as isFunctionReturnsNull,
-- Check if streams `t` and `s` are `null`.
       t is null as isTNull,
       s is null as isSNull,
-- Check if streams attributes `t.discount` and `s.item` are `null`.
       t.discount is null as isTDiscountNull,
       s.item is null as isSItemNull
from ProductInputStream as s
    left outer join ProductInfoTable as t
    on s.item == t.item;
```

### Input

Below event is sent to `ProductInputStream`,

[`'Cake'`, `12.0`]

### Output

After processing, the following events will be arriving at each stream:

* ProductValidationStream: <br/>[`Cake`, `false`]
* DiscountValidationStream: <br/>[`Cake`, `12.0`, `null`, `true`, `true`, `false`, `true`, `false`]
