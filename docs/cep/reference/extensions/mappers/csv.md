---
sidebar_position: 2
---

# CSV

This is an extension that converts messages with CSV format to/from stream processor events.

## Features

* **[csv (Sink Mapper)](#csv-sink-mapper)**

    This output mapper extension allows you to convert Stream events
    processed by the Stream Processor to CSV message before publishing them. You
    can either use custom placeholder to map a custom CSV message or use
    pre-defined CSV format where event conversion takes place without
    extra configurations.

* **[csv (Source Mapper)](#csv-source-mapper)**

    This extension is used to convert CSV message to Stream event input
    mapper. You can either receive pre-defined CSV message where event
    conversion takes place without extra configurations,or receive
    custom CSV message where a custom place order to map from custom CSV
    message.

## csv (Sink Mapper)

This output mapper extension allows you to convert Stream events
processed by the Stream Processor to CSV message before publishing them. You can
either use custom placeholder to map a custom CSV message or use
pre-defined CSV format where event conversion takes place without extra
configurations.

Syntax

    @sink(..., @map(type="csv", delimiter="<STRING>", header="<BOOL>", event.grouping.enabled="<BOOL>")

QUERY PARAMETERS

| Name                   | Description                                                                                                                                                                                                                  | Default Value | Possible Data Types | Optional | Dynamic |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| delimiter              | This parameter used to separate the output CSV data, when converting a Stream event to CSV format,                                                                                                                           | ,             | STRING              | Yes      | No      |
| header                 | This parameter specifies whether the CSV messages will be generated with header or not. If this parameter is set to true, message will be generated with header                                                              | false         | BOOL                | Yes      | No      |
| event.grouping.enabled | If this parameter is set to `true`, events are grouped via a line.separator when multiple events are received. It is required to specify a value for the System.lineSeparator() when the value for this parameter is `true`. | false         | BOOL                | Yes      | No      |

EXAMPLE 1

    @sink(type='inMemory', topic='{{symbol}}', @map(type='csv'))
    define stream BarStream (symbol string, price float, volume long);

Above configuration will perform a default CSV output mapping, which
will generate output as follows:
GDN,55.6,100 < OS supported lineseparator />

If header is true and delimiter is "-", then the output
will be as follows:
symbol-price-volume < OS supported line separator /> GDN-55.6-100 < OS supported line separator />

EXAMPLE 2

    @sink(type='inMemory', topic='{{symbol}}', @map(type='csv',header='true',delimiter='-',@payload(symbol='0',price='2',volume='1')))define stream BarStream (symbol string, price float,volume long);

Above configuration will perform a custom CSV mapping. Here, user can
add custom place order in the @payload. The place order indicates that
where the attribute name's value will be appear in the output message,
The output will be produced output as follows:`GDN,100,55.6`
If header is true and delimiter is "-", then the output will be as
follows:
symbol-price-volume GDN-55.6-100 < OS supported line separator />

If event grouping is enabled, then the output is as
follows:GDN-55.6-100 < OS supported line separator />GDN-55.6-100 < OS supported line separator />GDN-55.6-100 < OS supported line separator />

## csv (Source Mapper)

This extension is used to convert CSV message to Stream event input
mapper. You can either receive pre-defined CSV message where event
conversion takes place without extra configurations,or receive custom
CSV message where a custom place order to map from custom CSV message.

Syntax

    @source(..., @map(type="csv", delimiter="<STRING>", fail.on.unknown.attribute="<BOOL>", event.grouping.enabled="<BOOL>")

QUERY PARAMETERS

| Name                      | Description                                                                                                                                                                                                                                                                                                                                            | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| delimiter                 | When converting a CSV format message to Stream event, this parameter indicatesinput CSV message\'s data should be split by this parameter                                                                                                                                                                                                              | ,             | STRING              | Yes      | No      |
| fail.on.unknown.attribute | This parameter specifies how unknown attributes should be handled. If it's set to `true` and one or more attributes don't havevalues, then SP will drop that message. If this parameter is set to `false`, the Stream Processor adds the required attribute's values to such events with a null value and the event is converted to a Stream event. | true          | BOOL                | Yes      | No      |
| event.grouping.enabled    | This parameter specifies whether event grouping is enabled or not. To receive a group of events together and generate multiple events, this parameter must be set to `true`.                                                                                                                                                                           | false         | BOOL                | Yes      | No      |

EXAMPLE 1

    @source(type='inMemory', topic='stock', @map(type='csv'))
     define stream FooStream (symbol string, price float, volume int);

Above configuration will do a default CSV input mapping. Expected input
will look like below:
GDN ,55.6 , 100OR "GDN,No10,Palam Groove
Rd,Col-03" ,55.6 , 100If header.present is true and delimiter is "-",
then the input is as follows:symbol-price-volumeGDN-55.6-100

EXAMPLE 2

    @source(type='inMemory', topic='stock', @map(type='csv',header='true', @attributes(symbol = "2", price = "0", volume = "1")))
    define stream FooStream (symbol string, price float, volume long);

Above configuration will perform a custom CSV mapping. Here, user can
add place order of each attribute in the @attribute. The place order
indicates where the attribute name's value has appeared in the
input.Expected input will look like below:
55.6,100,GDN
OR55.6,100,"GDN,No10,Palm Groove Rd,Col-03" If header is true and
delimiter is "-", then the output is as follows:
price-volume-symbol
55.6-100-GDN
If group events is enabled then input should be as follows:
price-volume-symbol
55.6-100-GDNSystem.lineSeparator()55.6-100-IBMSystem.lineSeparator()55.6-100-IFSSystem.lineSeparator()
