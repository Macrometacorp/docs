---
sidebar_position: 40
title: Nulls Example
---

This page provides examples of using nulls in stream workers.

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
INSERT INTO ProductValidationStream
SELECT item, price is null AS isPriceNull
-- Filter events with `item` not having `null` value.
FROM ProductInputStream [not(item is null)];

@info(name = 'Outer-join-with-table')
INSERT INTO DiscountValidationStream
SELECT s.item, s.price, t.discount,
-- Check if `math:power()` returns `null`.
       math:power(t.discount, 2) is null
            AS isFunctionReturnsNull,
-- Check if streams `t` and `s` are `null`.
       t is null AS isTNull,
       s is null AS isSNull,
-- Check if streams attributes `t.discount` and `s.item` are `null`.
       t.discount is null AS isTDiscountNull,
       s.item is null AS isSItemNull
FROM ProductInputStream AS s
    LEFT OUTER JOIN ProductInfoTable AS t
    ON s.item == t.item;
```
