---
title: grpc (Sink)
---

This extension publishes event data encoded into GRPC Classes as defined in the user input jar. This extension has a default gRPC service classes added. The default service is called "EventService". If we want to use our custom gRPC services, we have to pack auto-generated gRPC service classes and protobuf classes into a jar file and add it into the project classpath (or to the `jars` folder in the `stream processor-tooling` folder if we use it with `stream processor-tooling`). This grpc sink is used for scenarios where we send a request and don't expect a response back. I.e getting a google.protobuf.Empty response back.

Syntax

    CREATE SINK <NAME> WITH (type="grpc", map.type="<STRING>", publisher.url="<STRING>", headers="<STRING>", idle.timeout="<LONG>", keep.alive.time="<LONG>", keep.alive.timeout="<LONG>", keep.alive.without.calls="<BOOL>", enable.retry="<BOOL>", max.retry.attempts="<INT>", retry.buffer.size="<LONG>", per.rpc.buffer.size="<LONG>", channel.termination.waiting.time="<LONG>", truststore.file="<STRING>", truststore.password="<STRING>", truststore.algorithm="<STRING>", tls.store.type="<STRING>", keystore.file="<STRING>", keystore.password="<STRING>", keystore.algorithm="<STRING>", enable.ssl="<BOOL>", mutual.auth.enabled="<BOOL>")

## Query Parameters

| Name                             | Description                                                                                                                                                                                                                                                                                                           | Default Value   | Possible Data Types | Optional | Dynamic |
|----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|---------------------|----------|---------|
| publisher.url                    | The url to which the outgoing events should be published via this extension. This url should consist the host hostPort, port, fully qualified service name, method name in the following format. `grpc://0.0.0.0:9763/<serviceName>/<methodName>` For example: grpc://0.0.0.0:9763/org.gdn.grpc.EventService/consume |                 | STRING              | No       | No      |
| headers                          | GRPC Request headers in format `"'<key>:<value>','<key>:<value>'"`. If header parameter is not provided just the payload is sent                                                                                                                                                                                      | \-              | STRING              | Yes      | No      |
| idle.timeout                     | Set the duration in seconds without ongoing RPCs before going to idle mode.                                                                                                                                                                                                                                           | 1800            | LONG                | Yes      | No      |
| keep.alive.time                  | Sets the time in seconds without read activity before sending a keepalive ping. Keepalives can increase the load on services so must be used with caution. By default set to Long.MAX\_VALUE which disables keep alive pinging.                                                                                       | Long.MAX\_VALUE | LONG                | Yes      | No      |
| keep.alive.timeout               | Sets the time in seconds waiting for read activity after sending a keepalive ping.                                                                                                                                                                                                                                    | 20              | LONG                | Yes      | No      |
| keep.alive.without.calls         | Sets whether keepalive will be performed when there are no outstanding RPC on a connection.                                                                                                                                                                                                                           | false           | BOOL                | Yes      | No      |
| enable.retry                     | Enables the retry mechanism provided by the gRPC library.                                                                                                                                                                                                                                                             | false           | BOOL                | Yes      | No      |
| max.retry.attempts               | Sets max number of retry attempts. The total number of retry attempts for each RPC will not exceed this number even if service config may allow a higher number.                                                                                                                                                      | 5               | INT                 | Yes      | No      |
| retry.buffer.size                | Sets the retry buffer size in bytes. If the buffer limit is exceeded, no RPC could retry at the moment, and in hedging case all hedges but one of the same RPC will cancel.                                                                                                                                           | 16777216        | LONG                | Yes      | No      |
| per.rpc.buffer.size              | Sets the per RPC buffer limit in bytes used for retry. The RPC is not retriable if its buffer limit is exceeded.                                                                                                                                                                                                      | 1048576         | LONG                | Yes      | No      |
| channel.termination.waiting.time | The time in seconds to wait for the channel to become terminated, giving up if the timeout is reached.                                                                                                                                                                                                                | 5               | LONG                | Yes      | No      |
| truststore.file                  | the file path of truststore. If this is provided then server authentication is enabled                                                                                                                                                                                                                                | \-              | STRING              | Yes      | No      |
| truststore.password              | the password of truststore. If this is provided then the integrity of the keystore is checked                                                                                                                                                                                                                         | \-              | STRING              | Yes      | No      |
| truststore.algorithm             | the encryption algorithm to be used for server authentication                                                                                                                                                                                                                                                         | \-              | STRING              | Yes      | No      |
| tls.store.type                   | TLS store type                                                                                                                                                                                                                                                                                                        | \-              | STRING              | Yes      | No      |
| keystore.file                    | the file path of keystore. If this is provided then client authentication is enabled                                                                                                                                                                                                                                  | \-              | STRING              | Yes      | No      |
| keystore.password                | the password of keystore                                                                                                                                                                                                                                                                                              | \-              | STRING              | Yes      | No      |
| keystore.algorithm               | the encryption algorithm to be used for client authentication                                                                                                                                                                                                                                                         | \-              | STRING              | Yes      | No      |
| enable.ssl                       | to enable ssl. If set to true and truststore.file is not given then it will be set to default carbon jks by default                                                                                                                                                                                                   | FALSE           | BOOL                | Yes      | No      |
| mutual.auth.enabled              | to enable mutual authentication. If set to true and truststore.file or keystore.file is not given then it will be set to default carbon jks by default                                                                                                                                                                | FALSE           | BOOL                | Yes      | No      |

## Example 1

    CREATE SINK FooStream WITH (type='grpc', map.type='JSON', publisher.url = 'grpc://134.23.43.35:8080/org.gdn.grpc.EventService/consume') (message String);

Here a stream named FooStream is defined with grpc sink. A grpc server should be running at 194.23.98.100 listening to port 8080. sink.id is set to 1 here. So we can write a source with sink.id 1 so that it will listen to responses for requests published from this stream. Note that since we are using EventService/consume the sink will be operating in default mode

## Example 2

    CREATE SINK FooStream WITH (type='grpc', map.type='JSON', publisher.url = 'grpc://134.23.43.35:8080/org.gdn.grpc.EventService/consume', headers='{{headers}}', map.payload='{{message}}') (message String, headers String);

A similar example to above but with headers. Headers are also send into the stream as a data. In the sink headers dynamic property reads the value and sends it as MetaData with the request

## Example 3

    CREATE SINK FooStream WITH (type='grpc', map.type='protobuf', publisher.url = 'grpc://134.23.43.35:8080/org.gdn.grpc.MyService/send') (stringValue string, intValue int,longValue long,booleanValue bool,floatValue float,doubleValue double);

Here a stream named FooStream is defined with grpc sink. A grpc server should be running at 134.23.43.35 listening to port 8080 since there is no mapper provided, attributes of stream definition should be as same as the attributes of protobuf message definition.

## Example 4

    CREATE SINK FooStream WITH (type='grpc', map.type='protobuf', publisher.url = 'grpc://134.23.43.35:8080/org.gdn.grpc.MyService/testMap') (stringValue string, intValue int,map object);

Here a stream named FooStream is defined with grpc sink. A grpc server should be running at 134.23.43.35 listening to port 8080. The `map object` in the stream definition defines that this stream is going to use Map object with grpc service. We can use any map object that extends `java.util.AbstractMap` class.

## Example 5

    CREATE SINK FooStream WITH (type='grpc', map.type='protobuf', publisher.url = 'grpc://134.23.43.35:8080/org.gdn.grpc.MyService/testMap', map.payload="stringValue='a',longValue='b',intValue='c',booleanValue='d',floatValue = 'e', doubleValue = 'f'"') (a string, b long, c int,d bool,e float,f double);

Here a stream named FooStream is defined with grpc sink. A grpc server should be running at 194.23.98.100 listening to port 8080. `map.payload` is provided in this stream, therefore we can use any name for the attributes in the stream definition, but we should correctly map those names with protobuf message attributes. If we are planning to send metadata within a stream we should use `map.payload` to map attributes to identify the metadata attribute and the protobuf attributes separately.

## Example 6

    CREATE SINK FooStream WITH (type='grpc', map.type='protobuf', publisher.url = 'grpc://194.23.98.100:8888/org.gdn.grpc.test.StreamService/clientStream') (stringValue string, intValue int,longValue long,booleanValue bool,floatValue float,doubleValue double);

Here in the `grpc` sink, we are sending a stream of requests to the server that runs on 194.23.98.100 and port 8888. When we need to send a stream of requests from the grpc sink we have to define a client stream RPC method.Then the stream processor will identify whether it's a unary method or a stream method and send requests according to the method type.
