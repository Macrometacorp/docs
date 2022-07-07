---
title: grpc-service-response (Sink)
---

This extension is used to send responses back to a gRPC client after receiving requests through grpc-service source. This correlates with the particular source using a unique `source.id`.

Syntax

    CREATE SINK <NAME> WITH (type="grpc-service-response", map-type="<STRING>", source.id="<INT>", )

## Query Parameters

| Name      | Description                                                                                                             | Default Value | Possible Data Types | Optional | Dynamic |
|-----------|-------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| source.id | A unique id to identify the correct source to which this sink is mapped. There is a 1:1 mapping between source and sink |               | INT                 | No       | No      |

## Example 1

    CREATE SINK BarStream WITH (type='grpc-service-response', source.id='1', map.type='json') (messageId String, message String);

    CREATE SOURCE FooStream WITH (type='grpc-service',url='grpc://134.23.43.35:8080/org.gdn.grpc.EventService/process', source.id='1', map.type='json', map.attributes="messageId='trp:messageId', message='message'") (messageId String, message String);

    insert into BarStream
    select *
    from FooStream;

The grpc requests are received through the grpc-service sink. Each received event is sent back through grpc-service-source. This is just a passthrough as we are selecting everything from FooStream and inserting into BarStream.