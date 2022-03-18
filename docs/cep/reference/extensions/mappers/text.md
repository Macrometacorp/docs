---
sidebar_position: 4
---

# Text

This is an extension that converts text messages to/from stream processor events.

## Features

* **[text (Sink Mapper)](#text-sink-mapper)**

    This extension is a Event to Text output mapper. Transports that publish text messages can utilize this extension to convert the events to text messages. Users can use a pre-defined text format where event conversion is carried out without any additional configurations, or use custom placeholder(using `{{` and `}}`) to map custom text messages. Again, you can also enable mustache based custom mapping. In mustache based custom mapping you can use custom placeholder (using `{{` and `}}` or `{{{` and `}}}`) to map custom text. In mustache based custom mapping, all variables are HTML escaped by default.
    
    For example:
    `&` is replaced with `&amp;`
    `"` is replaced with `&quot;`
    `=` is replaced with `&#61;`
    
    If you want to return unescaped HTML, use the triple mustache `{{{` instead of double `{{`.

* **[text (Source Mapper)](#text-source-mapper)**

    This extension is a text to event input mapper. Transports that accept text messages can utilize this extension to convert the incoming text message to event. Users can either use a pre-defined text format where event conversion happens without any additional configurations, or specify a regex to map a text message using custom configurations.

## text (Sink Mapper)

This extension is a Event to Text output mapper. Transports that publish text messages can utilize this extension to convert the events to text messages. Users can use a pre-defined text format where event conversion is carried out without any additional configurations, or use custom placeholder(using `{{` and `}}`) to map custom text messages.

Again, you can also enable mustache based custom mapping. In mustache based custom mapping you can use custom placeholder (using `{{` and `}}` or `{{{` and `}}}`) to map custom text. In mustache based custom mapping, all variables are HTML escaped by default.For example:`&` is replaced with `&amp;``"` is replaced with `&quot;``=` is replaced with `&#61;`

If you want to return unescaped HTML, use the triple mustache `{{{` instead of double `{{`.

Syntax

    @sink(..., @map(type="text", event.grouping.enabled="<BOOL>", delimiter="<STRING>", new.line.character="<STRING>", mustache.enabled="<BOOL>")

QUERY PARAMETERS

| Name                   | Description                                                                                                                                                                                                                                                                   | Default Value        | Possible Data Types | Optional | Dynamic |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------|---------------------|----------|---------|
| event.grouping.enabled | If this parameter is set to `true`, events are grouped via a delimiter when multiple events are received. It is required to specify a value for the `delimiter` parameter when the value for this parameter is `true`.                                                        | false                | BOOL                | Yes      | No      |
| delimiter              | This parameter specifies how events are separated when a grouped event is received. This must be a whole line and not a single character.                                                                                                                                     | ~~~~~~~~~~ | STRING              | Yes      | No      |
| new.line.character     | This attribute indicates the new line character of the event that is expected to be received. This is used mostly when communication between 2 types of operating systems is expected. For example, Linux uses `\n` whereas Windows uses `\r\n` as the end of line character. | \n                  | STRING              | Yes      | No      |
| mustache.enabled       | If this parameter is set to `true`, then mustache mapping gets enabled forcustom text mapping.                                                                                                                                                                                | false                | BOOL                | Yes      | No      |

EXAMPLE 1

    @sink(type='inMemory', topic='stock', @map(type='text'))
    define stream FooStream (symbol string, price float, volume long);

This query performs a default text input mapping. The expected output is
as follows:

    symbol:"GDN",
    price:55.6,
    volume:100

EXAMPLE 2

    @sink(type='inMemory', topic='stock', @map(type='text', event.grouping.enabled='true'))
    define stream FooStream (symbol string, price float, volume long);

This query performs a default text input mapping with event grouping.
The expected output is as follows:

    symbol:"GDN",
    price:55.6,
    volume:100
    ~~~~~~~~~~
    symbol:"GDN",
    price:55.6,
    volume:100

EXAMPLE 3

    @sink(type='inMemory', topic='stock', @map(type='text',  @payload("SensorID : {{symbol}}/{{volume}}, SensorPrice : Rs{{price}}/=, Value : {{volume}}ml")))
    define stream FooStream (symbol string, price float, volume long);

This query performs a custom text mapping. The expected output is as
follows:

    SensorID : gdn/100, 
    SensorPrice : Rs1000/=, 
    Value : 100ml 

for the following stream processor event.

    {gdn,1000,100}

EXAMPLE 4

    @sink(type='inMemory', topic='stock', @map(type='text', event.grouping.enabled='true', @payload("Stock price of {{symbol}} is {{price}}")))
    define stream FooStream (symbol string, price float, volume long);

This query performs a custom text mapping with event grouping. The
expected output is as follows:

    Stock price of GDN is 55.6
    ~~~~~~~~~~
    Stock price of GDN is 55.6
    ~~~~~~~~~~
    Stock price of GDN is 55.6

for the following stream processor event.

    {GDN,55.6,10}

EXAMPLE 5

    @sink(type='inMemory', topic='stock', @map(type='text', mustache.enabled='true',  @payload("SensorID : {{{symbol}}}/{{{volume}}}, SensorPrice : Rs{{{price}}}/=, Value : {{{volume}}}ml")))
    define stream FooStream (symbol string, price float, volume long);

This query performs a custom text mapping to return unescaped HTML. The
expected output is as follows:

    SensorID : a&b/100,
    SensorPrice : Rs1000/=,
    Value : 100ml

for the following stream processor event.

    {a&b,1000,100}

## text (Source Mapper)

This extension is a text to event input mapper. Transports that accept text messages can utilize this extension to convert the incoming text message to event. Users can either use a pre-defined text format where event conversion happens without any additional configurations, or specify a regex to map a text message using custom configurations.

Syntax

    @source(..., @map(type="text", regex.groupid="<STRING>", fail.on.missing.attribute="<BOOL>", event.grouping.enabled="<BOOL>", delimiter="<STRING>", new.line.character="<STRING>")

QUERY PARAMETERS

| Name                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                         | Default Value        | Possible Data Types | Optional | Dynamic |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------|---------------------|----------|---------|
| regex.groupid             | This parameter specifies a regular expression group. The `groupid` can be any capital letter (e.g., regex.A,regex.B .. etc). You can specify any number of regular expression groups. In the attribute annotation, you need to map all attributes to the regular expression group with the matching group index. If you need to to enable custom mapping, it is required to specifythe matching group for each and every attribute. |                      | STRING              | No       | No      |
| fail.on.missing.attribute | This parameter specifies how unknown attributes should be handled. If it is set to `true` a message is dropped if its execution fails, or if one or more attributes do not have values. If this parameter is set to `false`, null values are assigned to attributes with missing values, and messages with such attributes are not dropped.                                                                                         | true                 | BOOL                | Yes      | No      |
| event.grouping.enabled    | This parameter specifies whether event grouping is enabled or not. To receive a group of events together and generate multiple events, this parameter must be set to `true`.                                                                                                                                                                                                                                                        | false                | BOOL                | Yes      | No      |
| delimiter                 | This parameter specifies how events must be separated when multiple events are received. This must be whole line and not a single character.                                                                                                                                                                                                                                                                                        | ~~~~~~~~~~ | STRING              | Yes      | No      |
| new.line.character        | This attribute indicates the new line character of the event that is expected to be received. This is used mostly when communication between 2 types of operating systems is expected. For example, Linux uses `\n` as the end of line character whereas windows uses `\r\n`.                                                                                                                                                       | \n                  | STRING              | Yes      | No      |

Examples EXAMPLE 1

    @source(type='inMemory', topic='stock', @map(type='text'))
    define stream FooStream (symbol string, price float, volume long);

This query performs a default text input mapping. The expected input is
as follows:

    symbol:"GDN",
    price:55.6,
    volume:100

OR

    symbol:'GDN',
    price:55.6,
    volume:100

If group events is enabled then input should be as follows:

    symbol:"GDN",
    price:55.6,
    volume:100
    ~~~~~~~~~~
    symbol:"GDN",
    price:55.6,
    volume:100

EXAMPLE 2

    @source(type='inMemory', topic='stock', @map(type='text', fail.on.missing.attribute = 'true', regex.A='(\w+)\s([-0-9]+)',regex.B='volume\s([-0-9]+)', @attributes(symbol = 'A[1]',price = 'A[2]',volume = 'B')))
    define stream FooStream (symbol string, price float, volume long);

This query performs a custom text mapping. The expected input is as
follows:

    wos2 550 volume 100

If group events is enabled then input should be as follows:

    wos2 550 volume 100
    ~~~~~~~~~~
    wos2 550 volume100
    ~~~~~~~~~~
    wos2 550 volume 100
