---
title: grpc-service (Source)
---

This extension implements a grpc server for receiving and responding to
requests. During initialization time a grpc server is started on the
user specified port exposing the required service as given in the url.
This source also has a default mode and a user defined grpc service
mode. By default this uses EventService.
In the default mode this will use the EventService process method. If we
want to use our custom gRPC services, we have to pack auto-generated
gRPC service classes and protobuf classes into a jar file and add it
into the project classpath (or to the `jars` folder in the
`streamprocessor-tooling` folder if we use it with `streamprocessor-tooling`).
This accepts grpc message class Event as defined in the EventService
proto. This uses GrpcServiceResponse sink to send reponses back in the
same Event message format.

Syntax

    CREATE SOURCE <NAME> WITH (type="grpc-service", map.type="<STRING>", receiver.url="<STRING>", max.inbound.message.size="<INT>", max.inbound.metadata.size="<INT>", service.timeout="<INT>", server.shutdown.waiting.time="<LONG>", truststore.file="<STRING>", truststore.password="<STRING>", truststore.algorithm="<STRING>", tls.store.type="<STRING>", keystore.file="<STRING>", keystore.password="<STRING>", keystore.algorithm="<STRING>", enable.ssl="<BOOL>", mutual.auth.enabled="<BOOL>", threadpool.size="<INT>", threadpool.buffer.size="<INT>")


## Query Parameters

| Name                         | Description                                                                                                                                                                                                                                                                                                                 | Default Value | Possible Data Types | Optional | Dynamic |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| receiver.url                 | The url which can be used by a client to access the grpc server in this extension. This url should consist the host hostPort, port, fully qualified service name, method name in the following format. `grpc://0.0.0.0:9763/<serviceName>/<methodName>` For example: grpc://0.0.0.0:9763/org.gdn.grpc.EventService/consume |               | STRING              | No       | No      |
| max.inbound.message.size     | Sets the maximum message size in bytes allowed to be received on the server.                                                                                                                                                                                                                                                | 4194304       | INT                 | Yes      | No      |
| max.inbound.metadata.size    | Sets the maximum size of metadata in bytes allowed to be received.                                                                                                                                                                                                                                                          | 8192          | INT                 | Yes      | No      |
| service.timeout              | The period of time in milliseconds to wait for stream processor to respond to a request received. After this time period of receiving a request it will be closed with an error message.                                                                                                                                              | 10000         | INT                 | Yes      | No      |
| server.shutdown.waiting.time | The time in seconds to wait for the server to shutdown, giving up if the timeout is reached.                                                                                                                                                                                                                                | 5             | LONG                | Yes      | No      |
| truststore.file              | the file path of truststore. If this is provided then server authentication is enabled                                                                                                                                                                                                                                      | \-            | STRING              | Yes      | No      |
| truststore.password          | the password of truststore. If this is provided then the integrity of the keystore is checked                                                                                                                                                                                                                               | \-            | STRING              | Yes      | No      |
| truststore.algorithm         | the encryption algorithm to be used for server authentication                                                                                                                                                                                                                                                               | \-            | STRING              | Yes      | No      |
| tls.store.type               | TLS store type                                                                                                                                                                                                                                                                                                              | \-            | STRING              | Yes      | No      |
| keystore.file                | the file path of keystore. If this is provided then client authentication is enabled                                                                                                                                                                                                                                        | \-            | STRING              | Yes      | No      |
| keystore.password            | the password of keystore                                                                                                                                                                                                                                                                                                    | \-            | STRING              | Yes      | No      |
| keystore.algorithm           | the encryption algorithm to be used for client authentication                                                                                                                                                                                                                                                               | \-            | STRING              | Yes      | No      |
| enable.ssl                   | to enable ssl. If set to true and keystore.file is not given then it will be set to default carbon jks by default                                                                                                                                                                                                           | FALSE         | BOOL                | Yes      | No      |
| mutual.auth.enabled          | to enable mutual authentication. If set to true and truststore.file or keystore.file is not given then it will be set to default carbon jks by default                                                                                                                                                                      | FALSE         | BOOL                | Yes      | No      |
| threadpool.size              | Sets the maximum size of threadpool dedicated to serve requests at the gRPC server                                                                                                                                                                                                                                          | 100           | INT                 | Yes      | No      |
| threadpool.buffer.size       | Sets the maximum size of threadpool buffer server                                                                                                                                                                                                                                                                           | 100           | INT                 | Yes      | No      |

System Parameters

| Name                | Description                                                   | Default Value                                            | Possible Parameters                     |
|---------------------|---------------------------------------------------------------|----------------------------------------------------------|-----------------------------------------|
| keyStoreFile        | This is the key store file with the path                      | \${carbon.home}/resources/security/gdncarbon.jks        | valid path for a key store file         |
| keyStorePassword    | This is the password used with key store file                 | gdncarbon                                               | valid password for the key store file   |
| keyStoreAlgorithm   | The encryption algorithm to be used for client authentication | SunX509                                                  | \-                                      |
| trustStoreFile      | This is the trust store file with the path                    | \${carbon.home}/resources/security/client-truststore.jks | \-                                      |
| trustStorePassword  | This is the password used with trust store file               | gdncarbon                                               | valid password for the trust store file |
| trustStoreAlgorithm | the encryption algorithm to be used for server authentication | SunX509                                                  | \-                                      |

## Example 1

    CREATE SOURCE FooStream WITH (type='grpc-service', receiver.url='grpc://localhost:8888/org.gdn.grpc.EventService/process', source.id='1', map.type='json', map.attributes="messageId='trp:messageId', message='message'") (messageId String, message String);

Here a grpc server will be started at port 8888. The process method of
EventService will be exposed for clients. source.id is set as 1. So a
grpc-service-response sink with source.id = 1 will send responses back
for requests received to this source. Note that it is required to
specify the transport property messageId since we need to correlate the
request message with the response.

## Example 2

    CREATE SINK BarStream WITH (type='grpc-service-response', source.id='1', map.type='json') (messageId String, message String);

    CREATE SOURCE FooStream WITH (type='grpc-service', receiver.url='grpc://134.23.43.35:8080/org.gdn.grpc.EventService/process', source.id='1', map.type='json', map.attributes="messageId='trp:messageId', message='message'") (messageId String, message String);

    insert into BarStream
    select *
    from FooStream;

The grpc requests are received through the grpc-service sink. Each
received event is sent back through grpc-service-source. This is just a
passthrough through Stream App as we are selecting everything from FooStream
and inserting into BarStream.

## Example 3

    CREATE SOURCE BarStream WITH (type='grpc-service', source.id='1', receiver.url='grpc://locanhost:8888/org.gdn.grpc.EventService/consume', map.type='json', map.attributes="name='trp:name', age='trp:age', message='message'") (message String, name String, age int);

Here we are getting headers sent with the request as transport
properties and injecting them into the stream. With each request a
header will be sent in MetaData in the following format: `Name:John`,
`Age:23`

## Example 4

    CREATE SINK BarStream WITH (type='grpc-service-response', source.id='1', message.id='{{messageId}}', map.type='protobuf', map.payload="stringValue='a',intValue='b',longValue='c',booleanValue='d',floatValue = 'e', doubleValue ='f'") (a string,messageId string, b int,c long,d bool,e float,f double);

    CREATE SOURCE FooStream WITH (type='grpc-service', receiver.url='grpc://134.23.43.35:8888/org.gdn.grpc.test.MyService/process', source.id='1', map.type='protobuf', map.attributes="messageId='trp:message.id', a = 'stringValue', b = 'intValue', c = 'longValue',d = 'booleanValue', e = 'floatValue', f ='doubleValue'") (a string,messageId string, b int,c long,d bool,e float,f double);

    insert into BarStream
    select *
    from FooStream;

Here a grpc server will be started at port 8888. The process method of
the MyService will be exposed to the clients. `source.id` is set as 1.
So a grpc-service-response sink with source.id = 1 will send responses
back for requests received to this source. Note that it is required to
specify the transport property messageId since we need to correlate the
request message with the response and also we should map stream
attributes with correct protobuf message attributes even they define
using the same name as protobuf message attributes.
