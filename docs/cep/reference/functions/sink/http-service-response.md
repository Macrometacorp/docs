---
title: http-service-response (Sink)
---

The http-service-response sink send responses of the requests consumed by its corresponding http-service source, by mapping the response messages to formats such as `text`, `XML` and `JSON`.

Syntax

    CREATE SINK <NAME> WITH (type="http-service-response", map.type="<STRING>", source.id="<STRING>", message.id="<STRING>", headers="<STRING>")


## Query Parameters

| Name       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Default Value                           | Possible Data Types | Optional | Dynamic |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|---------------------|----------|---------|
| source.id  | Identifier to correlate the http-service-response sink to its corresponding http-service source which consumed the request.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |                                         | STRING              | No       | No      |
| message.id | Identifier to correlate the response with the request received by http-service source.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |                                         | STRING              | No       | Yes     |
| headers    | HTTP request headers in format `"'<key>:<value>','<key>:<value>'"`. When the `Content-Type` header is not provided the system decides the Content-Type based on the provided sink mapper as following:  - `map.type='xml'`: `application/xml`  - `map.type='json'`: `application/json`  - `map.type='text'`: `plain/text`  - `map.type='keyvalue'`: `application/x-www-form-urlencoded`  - For all other cases system defaults to `plain/text` Also the `Content-Length` header need not to be provided, as the system automatically defines it by calculating the size of the payload. | Content-Type and Content-Length headers | STRING              | Yes      | No      |

## Example 1

    CREATE SOURCE AddStream WITH (type='http-service', receiver.url='http://localhost:5005/add', source.id='adder', map.type='json, map.attributes="messageId='trp:messageId', value1='$.event.value1', value2='$.event.value2'") (messageId string, value1 long, value2 long);

    CREATE SINK ResultStream WITH (type='http-service-response', source.id='adder', message.id='{{messageId}}', map.type='json') (messageId string, results long);

    @info(name = 'query1')
    from AddStream
    select messageId, value1 + value2 as results
    insert into ResultStream;

The http-service source on stream `AddStream` listens on url `http://localhost:5005/stocks` for JSON messages with format:

    {
      "event": {
        "value1": 3,
        "value2": 4
      }
    }

and when events arrive it maps to `AddStream` events and pass them to query `query1` for processing. The query results produced on `ResultStream` are sent as a response via http-service-response sink with format:

    {
      "event": {
        "results": 7
      }
    }

Here the request and response are correlated by passing the `messageId` produced by the http-service to the respective http-service-response sink.
