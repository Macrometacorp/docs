---
sidebar_position: 40
title: Nulls in Stream Workers Example
---

This page provides examples on using nulls in stream workers.

## Input

Below event is sent to `ProductInputStream`,

[`'Cake'`, `12.0`]

## Output

After processing, the following events will be arriving at each stream:

- ProductValidationStream: [`Cake`, `false`]
- DiscountValidationStream: [`Cake`, `12.0`, `null`, `true`, `true`, `false`, `true`, `false`]

## Example

```sql
CREATE STREAM ProductInputStream (item string, price double);

-- Empty `ProductInfoTable` with attributes `item` and `discount`.
CREATE TABLE GLOBAL ProductInfoTable (item string, discount double);

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
