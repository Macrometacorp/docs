---
sidebar_position: 1
---

# JSON

This extension converts JSON messages to/from stream processor events.

## Features

* **[json (Sink Mapper)](#json-sink-mapper)**

    This extension is an Event to JSON output mapper.
    Transports that publish messages can utilize this extension to
    convert Stream events to JSON messages.
    You can either send a pre-defined JSON format or a custom JSON
    message.

* **[json (Source Mapper)](#json-source-mapper)**

    This extension is a JSON-to-Event input mapper. Transports that
    accept JSON messages can utilize this extension to convert an
    incoming JSON message into a Stream event. Users can either send a
    pre-defined JSON format, where event conversion happens without any
    configurations, or use the JSON path to map from a custom JSON
    message.
    In default mapping, the JSON string of the event can be enclosed by
    the element "event", though optional.

## json (Sink Mapper)

This extension is an Event to JSON output mapper. Transports that
publish messages can utilize this extension to convert Stream events to
JSON messages. You can either send a pre-defined JSON format or a custom
JSON message.

Syntax

    @sink(..., @map(type="json", validate.json="<BOOL>", enclosing.element="<STRING>")

QUERY PARAMETERS

| Name              | Description                                                                                                                                                                                                                                                                                                                                                        | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| validate.json     | If this property is set to `true`, it enables JSON validation for the JSON messages generated. When validation is carried out, messages that do not adhere to proper JSON standards are dropped. This property is set to `false` by default.                                                                                                                     | false         | BOOL                | Yes      | No      |
| enclosing.element | This specifies the enclosing element to be used if multiple events are sent in the same JSON message. Stream treats the child elements of the given enclosing element as events and executes JSON expressions on them. If an `enclosing.element` is not provided, the multiple event scenario is disregarded and JSON path is evaluated based on the root element. | \$            | STRING              | Yes      | No      |

EXAMPLE 1

    @sink(type='inMemory', topic='stock', @map(type='json'))
    define stream FooStream (symbol string, price float, volume long);

Above configuration does a default JSON input mapping that generates the
output given
below.

    {    
    "event":{        
        "symbol":GDN,        
        "price":55.6,        
        "volume":100    
        }
    }

EXAMPLE 2

    @sink(type='inMemory', topic='{{symbol}}', @map(type='json', enclosing.element='$.portfolio', validate.json='true', @payload( """{"StockData":{"Symbol":"{{symbol}}","Price":{{price}}}}""")))
    define stream BarStream (symbol string, price float, volume long);

The above configuration performs a custom JSON mapping that generates
the following JSON message as the
output.

    {
        "portfolio":{    
            "StockData":{        
                "Symbol":GDN,        
                "Price":55.6      
            }
        }
    }

### json (Source Mapper)

This extension is a JSON-to-Event input mapper. Transports that accept
JSON messages can utilize this extension to convert an incoming JSON
message into a Stream event. Users can either send a pre-defined JSON
format, where event conversion happens without any configurations, or
use the JSON path to map from a custom JSON message.In default mapping,
the JSON string of the event can be enclosed by the element "event",
though optional.

Syntax

    @source(..., @map(type="json", enclosing.element="<STRING>", fail.on.missing.attribute="<BOOL>")

QUERY PARAMETERS

| Name                      | Description                                                                                                                                                                                                                                                                                                                                                                                     | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| enclosing.element         | This is used to specify the enclosing element when sending multiple events in the same JSON message. Mapper treats the child elements of a given enclosing element as events and executes the JSON path expressions on these child elements. If the enclosing.element is not provided then the multiple-event scenario is disregarded and the JSON path is evaluated based on the root element. | \$            | STRING              | Yes      | No      |
| fail.on.missing.attribute | This parameter allows users to handle unknown attributes.The value of this can either be true or false. By default it is true.  If a JSON execution fails or returns null, mapper drops that message. However, setting this property to false prompts mapper to send an event with a null value to Stream, where users can handle it as required, ie., assign a default value.)                 | true          | BOOL                | Yes      | No      |

EXAMPLE 1

    @source(type='inMemory', topic='stock', @map(type='json'))
    define stream FooStream (symbol string, price float, volume long);

This configuration performs a default JSON input mapping. For a single
event, the input is required to be in one of the following
formats:

    {    
        "event":{        
            "symbol":"GDN",        
            "price":55.6,        
            "volume":100    
        }
    }

or

    {    
        "symbol":"GDN",    
        "price":55.6,    
        "volume":100
    }

EXAMPLE 2

    @source(type='inMemory', topic='stock', @map(type='json'))
    define stream FooStream (symbol string, price float, volume long);

This configuration performs a default JSON input mapping. For multiple
events, the input is required to be in one of the following
formats:

    [
        {"event":
            {"symbol":"GDN","price":55.6,"volume":100}
        },
        {"event":
            {"symbol":"GDN","price":56.6,"volume":99}
        },
        {"event":
            {"symbol":"GDN","price":57.6,"volume":80}
        }
    ]

or

    [
        {"symbol":"GDN","price":55.6,"volume":100},
        {"symbol":"GDN","price":56.6,"volume":99},
        {"symbol":"GDN","price":57.6,"volume":80}
    ]

EXAMPLE 3

    @source(type='inMemory', topic='stock', @map(type='json', enclosing.element="$.portfolio", @attributes(symbol = "company.symbol", price = "price", volume = "volume")))

This configuration performs a custom JSON mapping.For a single event,
the expected input is similar to the one shown
below:

    { 
     "portfolio":{     
            "stock":{
                "volume":100,        
                "company":{           
                    "symbol":"GDN"          
                },        
                "price":55.6       
            }   
        }
    }

EXAMPLE 4

    @source(type='inMemory', topic='stock', @map(type='json', enclosing.element="$.portfolio", @attributes(symbol = "stock.company.symbol", price = "stock.price", volume = "stock.volume")))
    define stream FooStream (symbol string, price float, volume long);

The configuration performs a custom JSON mapping.For multiple events,
expected input looks as follows..

    {"portfolio":   
        [
            {"stock":{
                "volume":100,
                "company":{
                    "symbol":"GDN"
                },
                "price":56.6
                }
            },
            {"stock":{
                "volume":200,
                "company":{
                    "symbol":"GDN"
                },
                "price":57.6
                }
            }
        ]
    }
