---
title: keyvalue (Source Mapper)
---

`Key-Value Map to Event` input mapper extension allows transports that
accept events as key value maps to convert those events to Stream App
events. You can either receive pre-defined keys where conversion takes
place without extra configurations, or use custom keys to map from the
message.

Syntax

    CREATE SOURCE <NAME> WITH (map.type="keyvalue", map.fail.on.missing.attribute="<BOOL>")

## Query Parameters

| Name                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                          | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| fail.on.missing.attribute | If this parameter is set to `true`, if an event arrives without a matching key for a specific attribute in the connected stream, it is dropped and not processed by the Stream Processor. If this parameter is set to `false` the Stream Processor adds the required key to such events with a null value, and the event is converted to a Stream App event so that you could handle them as required before they are further processed. | true          | BOOL                | Yes      | No      |

## Example 1

    CREATE SOURCE FooStream WITH (type='inMemory', topic='stock', map.type='keyvalue') (symbol string, price float, volume long);

This query performs a default key value input mapping. The expected
input is a map similar to the following: symbol: `gdn` price: 55.6f
volume: 100

## Example 2

    CREATE SOURCE FooStream WITH (type='inMemory', topic='stock', map.type='keyvalue', map.fail.on.missing.attribute='true', map.attributes="symbol = 's', price = 'p', volume = 'v'") (symbol string, price float, volume long);

This query performs a custom key value input mapping. The matching keys
for the `symbol`, `price` and `volume` attributes are be `s`, `p`, and
`v` respectively. The expected input is a map similar to the following:
s: `gdn` p: 55.6 v: 100
