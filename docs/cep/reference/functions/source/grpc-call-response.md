---
title: grpc-call-response (Source)
---

This grpc source receives responses received from gRPC server for
requests sent from a grpc-call sink. The source will receive responses
for sink with the same sink.id. For example if you have a gRPC sink with
sink.id 15 then we need to set the sink.id as 15 in the source to
receives responses. Sinks and sources have 1:1 mapping

Syntax

    CREATE SOURCE <NAME> WITH (type="grpc-call-response", map.type="<STRING>", sink.id="<INT>")

## Query Parameters

| Name    | Description                                                                                                                                                                                                                                                                                                   | Default Value | Possible Data Types | Optional | Dynamic |
|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| sink.id | a unique ID that should be set for each grpc-call source. There is a 1:1 mapping between grpc-call sinks and grpc-call-response sources. Each sink has one particular source listening to the responses to requests published from that sink. So the same sink.id should be given when writing the sink also. |               | INT                 | No       | No      |

## Example 1

    CREATE SOURCE BarStream WITH (type='grpc-call-response', sink.id= '1') (message String);

    CREATE SINK FooStream WITH (type='grpc-call', publisher.url = 'grpc://194.23.98.100:8080/EventService/process', sink.id= '1', map.type='json') (message String);

Here we are listening to responses for requests sent from the sink with
sink.id 1 will be received here. The results will be injected into
BarStream
