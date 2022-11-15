---
title: json (Source Mapper)
---

This extension is a JSON-to-Event input mapper. Transports that accept
JSON messages can utilize this extension to convert an incoming JSON
message into a Stream App event. Users can either send a pre-defined JSON
format, where event conversion happens without any configurations, or
use the JSON path to map from a custom JSON message. In default mapping,
the JSON string of the event can be enclosed by the element "event",
though optional.

Syntax

    CREATE SOURCE <NAME> WITH (map.type="json", enclosing.element="<STRING>", fail.on.missing.attribute="<BOOL>")

## Query Parameters

| Name                      | Description                                                                                                                                                                                                                                                                                                                                                                                     | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| enclosing.element         | This is used to specify the enclosing element when sending multiple events in the same JSON message. Mapper treats the child elements of a given enclosing element as events and executes the JSON path expressions on these child elements. If the enclosing.element is not provided then the multiple-event scenario is disregarded and the JSON path is evaluated based on the root element. | \$            | STRING              | Yes      | No      |
| fail.on.missing.attribute | This parameter allows users to handle unknown attributes.The value of this can either be true or false. By default it is true.  If a JSON execution fails or returns null, mapper drops that message. However, setting this property to false prompts mapper to send an event with a null value to Stream App, where users can handle it as required, ie., assign a default value.)                 | true          | BOOL                | Yes      | No      |

## Example 1

    CREATE SOURCE FooStream WITH (type='inMemory', topic='stock', map.type='json') (symbol string, price float, volume long);

This configuration performs a default JSON input mapping.  For a single
event, the input is required to be in one of the following formats: {
    "event":{         "symbol":"gdn",         "price":55.6,
        "volume":100     } } or {     "symbol":"gdn",
    "price":55.6,     "volume":100 }

## Example 2

    CREATE SOURCE FooStream WITH (type='inMemory', topic='stock', map.type='json') (symbol string, price float, volume long);

This configuration performs a default JSON input mapping. For multiple
events, the input is required to be in one of the following formats: [
{\"event\":{\"symbol\":\"gdn\",\"price\":55.6,\"volume\":100}},
{\"event\":{\"symbol\":\"gdn\",\"price\":56.6,\"volume\":99}},
{\"event\":{\"symbol\":\"gdn\",\"price\":57.6,\"volume\":80}} ] or [
{\"symbol\":\"gdn\",\"price\":55.6,\"volume\":100},
{\"symbol\":\"gdn\",\"price\":56.6,\"volume\":99},
{\"symbol\":\"gdn\",\"price\":57.6,\"volume\":80} ]

## Example 3

    CREATE SOURCE FooStream WITH (type='inMemory', topic='stock', map.type='json', map.enclosing.element="$.portfolio", map.attributes="symbol = 'company.symbol', price = 'price', volume = 'volume'")

This configuration performs a custom JSON mapping. For a single event,
the expected input is similar to the one shown below: {  "portfolio":{
     "stock":{ "volume":100,         "company":{
           "symbol":"gdn"           },         "price":55.6
       }    } }

## Example 4

    CREATE SOURCE FooStream WITH (type='inMemory', topic='stock', map.type='json', map.enclosing.element="$.portfolio", map.attributes="symbol = 'stock.company.symbol', price = 'stock.price', volume = 'stock.volume'") (symbol string, price float, volume long);

The configuration performs a custom JSON mapping. For multiple events,
expected input looks as follows. .{"portfolio":    [
{\"stock\":{\"volume\":100,\"company\":{\"symbol\":\"gdn\"},\"price\":56.6}},
{\"stock\":{\"volume\":200,\"company\":{\"symbol\":\"gdn\"},\"price\":57.6}}
] }
