---
title: csv
---

This extension is used to convert a CSV message to stream worker event input mapper. You can either receive a predefined CSV message where event conversion takes place without extra configurations or receive custom CSV message where a custom place order maps from a custom CSV message.

## Syntax

    CREATE SOURCE <NAME> WITH (map.type="csv", map.delimiter="<STRING>", map.header.present="<BOOL>", map.fail.on.unknown.attribute="<BOOL>", map.event.grouping.enabled="<BOOL>")

## Query Parameters

| Name    | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------------|---------------------------------------|---------------|---------------------|----------|---------|
| delimiter                 | When converting a CSV format message to a stream worker event, this parameter indicates input CSV message's data should be split by this parameter.   | ,             | STRING              | Yes      | No      |
| header.present            | When converting a CSV format message to Stream App event, this parameter indicates whether CSV message has header or not. This can either have value `true` or `false`. If it's set to `false`, then it indicates that CSV message has no header.   | false         | BOOL                | Yes      | No      |
| fail.on.unknown.attribute | This parameter specifies how unknown attributes should be handled. If it's set to `true` and one or more attributes don't have values, then the stream processor will drop that message. If this parameter is set to `false`, the stream processor adds the required attribute values to such events with a null value and the event is converted to a stream worker event. | true          | BOOL                | Yes      | No      |
| event.grouping.enabled    | This parameter specifies whether event grouping is enabled or not. To receive a group of events together and generate multiple events, this parameter must be set to `true`. | false         | BOOL                | Yes      | No      |

## Example 1

    CREATE SOURCE FooStream WITH (type='stream', topic='stock', map.type='csv') (symbol string, price float, volume int);

Above configuration will do a default CSV input mapping. Expected input is:

`gdn ,55.6 , 100OR  "gdn,No10,Palam Groove Rd,Col-03" ,55.6 , 100`

If `header.present` is `true` and delimiter is "-", then the input is as follows: `symbol-price-volumegdn-55.6-100`

## Example 2

    CREATE SOURCE FooStream WITH (type='stream', topic='stock', map.type='csv', map.header='true', map.attributes.symbol = '2', map.attributes.price = '0', map.attributes.volume = '1') (symbol string, price float, volume long);

Above configuration will perform a custom CSV mapping. Here, user can add place order of each attribute in the @attribute. The place order indicates where the attribute name's value has appeared in the input. Expected input is:

`55.6,100,gdn OR55.6,100,"gdn,No10,Palm Groove Rd,Col-03"`

If header is true and delimiter is "-", then the output is: `price-volume-symbol 55.6-100-gdn`

If group events is enabled then input should be: `price-volume-symbol 55.6-100-gdnSystem.lineSeparator() 55.6-100-IBMSystem.lineSeparator() 55.6-100-IFSSystem.lineSeparator()`
