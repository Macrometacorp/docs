---
title: json (Sink Mapper)
---

This extension is an Event to JSON output mapper. Transports that publish messages can utilize this extension to convert Stream App events to JSON messages. You can either send a pre-defined JSON format or a custom JSON message.

## Syntax

```js
    CREATE SINK <NAME> WITH (map.type="json", map.validate.json="<BOOL>", map.enclosing.element="<STRING>")
```

## Query Parameters

| Name              | Description           | Default Value | Possible Data Types | Optional | Dynamic |
|------------|------------------------------------------|---------------|---------------------|----------|---------|
| validate.json     | If this property is set to `true`, it enables JSON validation for the JSON messages generated. When validation is carried out, messages that do not adhere to proper JSON standards are dropped. This property is set to `false` by default.       | false         | BOOL                | Yes      | No      |
| enclosing.element | This specifies the enclosing element to be used if multiple events are sent in the same JSON message. Stream App treats the child elements of the given enclosing element as events and executes JSON expressions on them. If an `enclosing.element` is not provided, the multiple event scenario is disregarded and JSON path is evaluated based on the root element. | \$            | STRING              | Yes      | No      |

## Example 1

```js
CREATE SINK FooStream WITH (type='stream', topic='stock', map.type='json') (symbol string, price float, volume long);
```

Above configuration does a default JSON input mapping that generates the output given below.

```json
{    
"event":{        
    "symbol":GDN,        
    "price":55.6,        
    "volume":100    
    }
}
```

## Example 2

```js
CREATE SINK BarStream WITH (type='stream', topic='{{symbol}}', map.type='json', map.enclosing.element='$.portfolio', map.validate.json='true', map.payload="""{"StockData":{"Symbol":"{{symbol}}","Price":{{price}}}}""") (symbol string, price float, volume long);
```

The above configuration performs a custom JSON mapping that generates the following JSON message as the output.

```json
    {
        "portfolio":{    
            "StockData":{        
                "Symbol":GDN,        
                "Price":55.6      
            }
        }
    }
```
