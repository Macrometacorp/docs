---
title: json (Source Mapper)
---

This extension is a JSON-to-Event input mapper. Transports that accept JSON messages can use this extension to convert an incoming JSON message into a stream worker event.

Users can either send a pre-defined JSON format, where event conversion happens without any configurations, or
use the JSON path to map from a custom JSON message. In default mapping, the JSON string of the event can be enclosed by the element "event", though optional.

## Syntax

```js
CREATE SOURCE <NAME> WITH (map.type="json", enclosing.element="<STRING>", fail.on.missing.attribute="<BOOL>")
```

## Query Parameters

| Name           | Description       | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|------------------|---------------|---------------------|----------|---------|
| enclosing.element         | This is used to specify the enclosing element when sending multiple events in the same JSON message. Mapper treats the child elements of a given enclosing element as events and executes the JSON path expressions on these child elements. If the enclosing.element is not provided then the multiple-event scenario is disregarded and the JSON path is evaluated based on the root element. | \$            | STRING              | Yes      | No      |
| fail.on.missing.attribute | This parameter allows users to handle unknown attributes.The value of this can either be true or false. By default it is true.  If a JSON execution fails or returns null, mapper drops that message. However, setting this property to false prompts mapper to send an event with a null value to Stream App, where users can handle it as required, ie., assign a default value.)                 | true          | BOOL                | Yes      | No      |

## Example 1

```js
CREATE SOURCE FooStream WITH (type='stream', topic='stock', map.type='json') (symbol string, price float, volume long);
```

This configuration performs a default JSON input mapping. For a single event, the input is required to be in one of the following formats:

```json
{    
    "event":{        
        "symbol":"GDN",        
        "price":55.6,        
        "volume":100    
    }
}
```

or

```json
{    
    "symbol":"GDN",    
    "price":55.6,    
    "volume":100
}
```

## Example 2

```js
CREATE SOURCE FooStream WITH (type='stream', topic='stock', map.type='json') (symbol string, price float, volume long);
```

This configuration performs a default JSON input mapping. For multiple events, the input is required to be in one of the following formats:

```json
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
```

or

```json
[
    {"symbol":"GDN","price":55.6,"volume":100},
    {"symbol":"GDN","price":56.6,"volume":99},
    {"symbol":"GDN","price":57.6,"volume":80}
]
```

## Example 3

```js
CREATE SOURCE FooStream WITH (type='stream', topic='stock', map.type='json', enclosing.element="$.portfolio", map.attributes.symbol="company.symbol", map.attributes.price="price", map.attributes.volume="volume" ) (symbol string, price float, volume long);
```

This configuration performs a custom JSON mapping. For a single event, the expected input is similar to the one shown below:

```json
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
```

## Example 4

```js
CREATE SOURCE FooStream WITH (type='stream', topic='stock', map.type='json', enclosing.element="$.portfolio", map.attributes.symbol = 'stock.company.symbol', map.attributes.price = 'stock.price', map.attributes.volume = 'stock.volume') (symbol string, price float, volume long);```
```

The configuration performs a custom JSON mapping. For multiple events, expected input looks as follows:

```json
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
```
