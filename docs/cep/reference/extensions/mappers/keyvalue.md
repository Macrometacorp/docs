---
sidebar_position: 3
---

# KeyValue

This extension converts events having Key-Value maps to/from stream proceesor events.

## Features

* **[keyvalue (Sink Mapper)](#keyvalue-sink-mapper)**

    The `Event to Key-Value Map` output mapper extension allows you to convert events processed by GDN Stream Processor to key-value map events before publishing them. You can either use pre-defined keys where conversion takes place without extra configurations, or use custom keys with which the messages can be published.

* **[keyvalue (Source Mapper)](#keyvalue-source-mapper)**

    `Key-Value Map to Event` input mapper extension allows transports that accept events as key value maps to convert those events to events. You can either receive pre-defined keys where conversion takes place without extra configurations, or use custom keys to map from the message.

## keyvalue (Sink Mapper)

The `Event to Key-Value Map` output mapper extension allows you to convert events processed by GDN Stream Processor to key-value map events before publishing them. You can either use pre-defined keys where conversion takes place without extra configurations, or use custom keys with which the messages can be published.

Syntax

    @sink(..., @map(type="keyvalue")

EXAMPLE 1

    @sink(type='inMemory', topic='stock', @map(type='keyvalue'))
    define stream FooStream (symbol string, price float, volume long);

This query performs a default Key-Value output mapping. The expected
output is something similar to the following:
symbol:'GDN'
price :55.6f
volume: 100L

EXAMPLE 2

    @sink(type='inMemory', topic='stock', @map(type='keyvalue', @payload(a='symbol',b='price',c='volume')))
    define stream FooStream (symbol string, price float, volume long);

This query performs a custom Key-Value output mapping where values are
passed as objects. Values for `symbol`, `price`, and `volume` attributes
are published with the keys `a`, `b` and `c` respectively. The expected
output is a map similar to the following:
a:'GDN'
b : 55.6f
c: 100L

EXAMPLE 3

    @sink(type='inMemory', topic='stock', @map(type='keyvalue', @payload(a='{{symbol}} is here',b='`price`',c='volume')))
    define stream FooStream (symbol string, price float, volume long);

This query performs a custom Key-Value output mapping where the values
of the `a` and `b` attributes are strings and c is object. The expected
output should be a Map similar to the following:
a:'GDN is here'
b:'price'
c: 100L

## keyvalue (Source Mapper)

`Key-Value Map to Event` input mapper extension allows transports that accept events as key value maps to convert those events to events. You can either receive pre-defined keys where conversion takes place without extra configurations, or use custom keys to map from the message.

Syntax

    @source(..., @map(type="keyvalue", fail.on.missing.attribute="<BOOL>")

QUERY PARAMETERS

| Name                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                          | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| fail.on.missing.attribute | If this parameter is set to `true`, if an event arrives without a matching key for a specific attribute in the connected stream, it is dropped and not processed by the Stream Processor. If this parameter is set to `false` the Stream Processor adds the required key to such events with a null value, and the event is converted to a event so that you could handle them as required before they are further processed. | true          | BOOL                | Yes      | No      |

EXAMPLE 1

    @source(type='inMemory', topic='stock', @map(type='keyvalue'))
    define stream FooStream (symbol string, price float, volume long);

This query performs a default key value input mapping. The expected
input is a map similar to the following:
symbol: 'GDN'
price:55.6f
volume: 100

EXAMPLE 2

    @source(type='inMemory', topic='stock', @map(type='keyvalue', fail.on.missing.attribute='true', @attributes(symbol = 's', price = 'p', volume = 'v')))define stream FooStream (symbol string, price float, volume long);

This query performs a custom key value input mapping. The matching keys
for the `symbol`, `price` and `volume` attributes are be `s`, `p`, and
`v` respectively. The expected input is a map similar to the following:
s: 'GDN'
p: 55.6
v: 100
