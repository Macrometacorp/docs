---
title: xml (Sink Mapper)
---

This mapper converts Stream App output events to XML before they are
published via transports that publish in XML format. Users can either
send a pre-defined XML format or a custom XML message containing event
data.

Syntax

    CREATE SINK <NAME> WITH (map.type="xml", validate.xml="<BOOL>", enclosing.element="<STRING>")

## Query Parameters

| Name              | Description                                                                                                                                                                                                                                                                                                                            | Default Value                                            | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|---------------------|----------|---------|
| validate.xml      | This parameter specifies whether the XML messages generated should be validated or not. If this parameter is set to true, messages that do not adhere to proper XML standards are dropped.                                                                                                                                             | false                                                    | BOOL                | Yes      | No      |
| enclosing.element | When an enclosing element is specified, the child elements (e.g., the immediate child elements) of that element are considered as events. This is useful when you need to send multiple events in a single XML message. When an enclosing element is not specified, one XML message per every event will be emitted without enclosing. | None in custom mapping and \<events\> in default mapping | STRING              | Yes      | No      |

## Example 1

    CREATE SINK FooStream WITH (type='inMemory', topic='stock', map.type='xml') (symbol string, price float, volume long);

Above configuration will do a default XML input mapping which will generate below output: 

```xml
<events>     
    <event>
        <symbol>gdn</symbol>         
        <price>55.6</price>
        <volume>100</volume>     
    </event> 
</events>
```

## Example 2

    CREATE SINK BarStream WITH (type='inMemory', topic='{{symbol}}', map.type='xml', map.enclosing.element='<portfolio>', map.validate.xml='true', map.payload="<StockData><Symbol>{{symbol}}</Symbol><Price>{{price}}</Price></StockData>") (symbol string, price float, volume long);

Above configuration will perform a custom XML mapping. Inside \@payload
you can specify the custom template that you want to send the messages
out and addd placeholders to places where you need to add event
attributes.Above config will produce below output XML message:

```xml
<portfolio>     
    <StockData>         
        <Symbol>gdn</Symbol>
        <Price>55.6</Price>     
    </StockData> 
</portfolio>
```
