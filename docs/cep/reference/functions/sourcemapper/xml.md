---
title: xml (Source Mapper)
---

This mapper converts XML input to Stream App event. Transports which accepts
XML messages can utilize this extension to convert the incoming XML
message to Stream App event. Users can either send a pre-defined XML format
where event conversion will happen without any configs or can use xpath
to map from a custom XML message.

Syntax

    CREATE SOURCE <NAME> WITH (map.type="xml", map.namespaces="<STRING>", map.enclosing.element="<STRING>", map.fail.on.missing.attribute="<BOOL>")


## Query Parameters

| Name                      | Description                                                                                                                                                                                                                                                                                                                                                                           | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| namespaces                | Used to provide namespaces used in the incoming XML message beforehand to configure xpath expressions. User can provide a comma separated list. If these are not provided xpath evaluations will fail                                                                                                                                                                                 | None          | STRING              | Yes      | No      |
| enclosing.element         | Used to specify the enclosing element in case of sending multiple events in same XML message. gdn DAS will treat the child element of given enclosing element as events and execute xpath expressions on child elements. If enclosing.element is not provided multiple event scenario is disregarded and xpaths will be evaluated with respect to root element.                      | Root element  | STRING              | Yes      | No      |
| fail.on.missing.attribute | This can either have value true or false. By default it will be true. This attribute allows user to handle unknown attributes. By default if an xpath execution fails or returns null DAS will drop that message. However setting this property to false will prompt DAS to send and event with null value to Stream App where user can handle it accordingly(ie. Assign a default value) | True          | BOOL                | Yes      | No      |

## Example 1

    CREATE SOURCE FooStream WITH (type='inMemory', topic='stock', map.type='xml') (symbol string, price float, volume long);

Above configuration will do a default XML input mapping. Expected input
will look like below:

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

    CREATE SOURCE FooStream WITH (type='inMemory', topic='stock', map.type='xml', map.namespaces = "dt=urn:schemas-microsoft-com:datatypes", map.enclosing.element="//portfolio", map.attributes="symbol = 'company/symbol', price = 'price', volume = 'volume'") (symbol string, price float, volume long);

Above configuration will perform a custom XML mapping. In the custom
mapping user can add xpath expressions representing each event attribute
using @attribute annotation. Expected input will look like below.

```xml
<portfolio xmlns:dt="urn:schemas-microsoft-com:datatypes">
    <stock exchange="nasdaq">         
    <volume>100</volume>
    <company><symbol>gdn</symbol></company>         
    <price dt:type="number">55.6</price>
    </stock> 
</portfolio>
```
