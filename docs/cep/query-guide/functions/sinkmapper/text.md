---
title: text (Sink Mapper)
---

This extension is a Event to Text output mapper. Transports that publish
text messages can utilize this extension to convert the Stream App events to
text messages. Users can use a pre-defined text format where event
conversion is carried out without any additional configurations, or use
custom placeholder(using `{{` and `}}`) to map custom text messages.
Again, you can also enable mustache based custom mapping. In mustache
based custom mapping you can use custom placeholder (using `{{` and `}}`
or `{{{` and `}}}`) to map custom text. In mustache based custom
mapping, all variables are HTML escaped by default. For example: `&` is
replaced with `&amp;` `"` is replaced with `&quot;` `=` is replaced with
`&#61;` If you want to return unescaped HTML, use the triple mustache
`{{{` instead of double `{{`.

Syntax

    CREATE SINK <NAME> WITH (type="text", event.grouping.enabled="<BOOL>", delimiter="<STRING>", new.line.character="<STRING>", mustache.enabled="<BOOL>")

## Query Parameters

| Name                   | Description                                                                                                                                                                                                                                                                   | Default Value        | Possible Data Types | Optional | Dynamic |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------|---------------------|----------|---------|
| event.grouping.enabled | If this parameter is set to `true`, events are grouped via a delimiter when multiple events are received. It is required to specify a value for the `delimiter` parameter when the value for this parameter is `true`.                                                        | false                | BOOL                | Yes      | No      |
| delimiter              | This parameter specifies how events are separated when a grouped event is received. This must be a whole line and not a single character.                                                                                                                                     | \~\~\~\~\~\~\~\~\~\~ | STRING              | Yes      | No      |
| new.line.character     | This attribute indicates the new line character of the event that is expected to be received. This is used mostly when communication between 2 types of operating systems is expected. For example, Linux uses `\n` whereas Windows uses `\r\n` as the end of line character. | \\n                  | STRING              | Yes      | No      |
| mustache.enabled       | If this parameter is set to `true`, then mustache mapping gets enabled forcustom text mapping.                                                                                                                                                                                | false                | BOOL                | Yes      | No      |

## Example 1

    CREATE SINK FooStream WITH (type='inMemory', topic='stock', map.type='text') (symbol string, price float, volume long);

This query performs a default text input mapping. The expected output is
as follows: symbol:"gdn", price:55.6, volume:100

## Example 2

    CREATE SINK FooStream WITH (type='inMemory', topic='stock', map.type='text', map.event.grouping.enabled='true') (symbol string, price float, volume long);

This query performs a default text input mapping with event grouping.
The expected output is as follows: symbol:"gdn", price:55.6,
volume:100 ~~~~~~~~~~ symbol:"gdn", price:55.6, volume:100

## Example 3

    CREATE SINK FooStream WITH (type='inMemory', topic='stock', map.type='text',  map.payload="SensorID : {{symbol}}/{{volume}}, SensorPrice : Rs{{price}}/=, Value : {{volume}}ml") (symbol string, price float, volume long);

This query performs a custom text mapping. The expected output is as
follows: SensorID : gdn/100, SensorPrice : Rs1000/=, Value : 100ml for
the following stream processor event. {gdn,1000,100}

## Example 4

    CREATE SINK FooStream WITH (type='inMemory', topic='stock', map.type='text', map.event.grouping.enabled='true', map.payload="Stock price of {{symbol}} is {{price}}") (symbol string, price float, volume long);

This query performs a custom text mapping with event grouping. The
expected output is as follows: Stock price of gdn is 55.6
\~~~~~~~~~~ Stock price of gdn is 55.6 ~~~~~~~~~~\
Stock price of gdn is 55.6 for the following stream processor event.
{gdn,55.6,10}

## Example 5

    CREATE SINK FooStream WITH (type='inMemory', topic='stock', map.type='text', map.mustache.enabled='true',  map.payload="SensorID : {{{symbol}}}/{{{volume}}}, SensorPrice : Rs{{{price}}}/=, Value : {{{volume}}}ml") (symbol string, price float, volume long);

This query performs a custom text mapping to return unescaped HTML. The
expected output is as follows: SensorID : a&b/100, SensorPrice :
Rs1000/=, Value : 100ml for the following stream processor event. {a&b,1000,100}
