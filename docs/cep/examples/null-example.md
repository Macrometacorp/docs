---
sidebar_position: 40
title: Nulls Example
---

This page provides examples of using nulls in stream workers.

## Example 1

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

### Input

Below event is sent to `ProductInputStream`,

[`'Cake'`, `12.0`]

### Output

After processing, the following events will be arriving at each stream:

- ProductValidationStream: [`Cake`, `false`]
- DiscountValidationStream: [`Cake`, `12.0`, `null`, `true`, `true`, `false`, `true`, `false`]

## Example 2 - Handling Attributes with Null Values

Assume that some events arrive with null values for the `roomNo` attribute, and you want to assign the value `unknown` in such scenarios.

The null handling query uses the inferred output stream of the previous query as the input stream. As a result, the changes made via this query are applied to the filtered data.

The null handling query uses the `ifThenElse` function to assign `unknown` as the value for the `roomNo` attribute when it has a null value.

```sql
@App:name("TemperatureApp3")
@App:description("")
@App:qlVersion("2")

/*

Part 1: The  'Southern wing room range filter' query will filter values using a regular expression. In this case, any roomNo starting with 'SOU' with some random characters plus a 'B' plus some random character will match the pattern, and the object that matches that expression will be sent to 'FilteredResultsStream'

Part 2: The query 'CleaningData' eliminates the deviceID property and any unnecessary white spaces

*/

CREATE STREAM InputTempStream (deviceID long, roomNo string, temp double);

CREATE SINK FilteredResultsStream WITH (type='stream', stream='FilteredResultsStream', map.type='json') (deviceID long, roomNo string, temp double);

CREATE SINK CleansedDataStream WITH (type='stream', stream='CleansedDataStream', map.type='json') (roomNo string, temp double);

@info(name = 'Southern wing room range filter')
INSERT INTO FilteredResultsStream
SELECT deviceID, roomNo, temp
FROM InputTempStream[regex:matches('SOU(.*)B(.*)', roomNo)];

@info(name = 'AddingMissingValues')
INSERT INTO CleansedDataStream
SELECT ifThenElse(roomNo is null, "UNKNOWN", str:trim(roomNo)) as roomNo, temp
FROM FilteredResultsStream;
```
