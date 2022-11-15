---
title: keyvalue (Sink Mapper)
---

The `Event to Key-Value Map` output mapper extension allows you to convert Stream App events processed by gdn SP to key-value map events before publishing them. You can either use pre-defined keys where conversion takes place without extra configurations, or use custom keys with which the messages can be published.

Syntax

    CREATE SINK <NAME> WITH (map.type="keyvalue")

## Example 1

    CREATE SINK FooStream WITH (type='inMemory', topic='stock', map.type='keyvalue') (symbol string, price float, volume long);

This query performs a default Key-Value output mapping. The expected output is something similar to the following: symbol:`gdn` price : 55.6f volume: 100L

## Example 2

    CREATE SINK FooStream WITH (type='inMemory', topic='stock', map.type='keyvalue', map.payload="a='symbol',b='price',c='volume'") (symbol string, price float, volume long);

This query performs a custom Key-Value output mapping where values are passed as objects. Values for `symbol`, `price`, and `volume` attributes are published with the keys `a`, `b` and `c` respectively. The expected output is a map similar to the following: a:`gdn` b : 55.6f c: 100L

## Example 3

    CREATE SINK FooStream WITH (type='inMemory', topic='stock', map.type='keyvalue', map.payload="a='{{symbol}} is here',b='`price`',c='volume'") (symbol string, price float, volume long);

This query performs a custom Key-Value output mapping where the values of the `a` and `b` attributes are strings and c is object. The expected output should be a Map similar to the following: a:`gdn is here` b : `price` c: 100L
