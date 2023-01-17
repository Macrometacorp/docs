---
title: grpc (Source)
---

This extension starts a grpc server during initialization time. The
server listens to requests from grpc stubs. This source has a default
mode of operation and custom user defined grpc service mode. By default
this uses EventService.
In the default mode this source will use EventService consume method. If
we want to use our custom gRPC services, we have to pack auto-generated
gRPC service classes and protobuf classes into a jar file and add it
into the project classpath (or to the `jars` folder in the
`streamprocessor-tooling` folder if we use it with `streamprocessor-tooling`).
This method will receive requests and injects them into stream through a
mapper.

Syntax

    CREATE SOURCE <NAME> WITH (type="grpc", map.type="<STRING>", receiver.url="<STRING>", max.inbound.message.size="<INT>", max.inbound.metadata.size="<INT>", server.shutdown.waiting.time="<LONG>", truststore.file="<STRING>", truststore.password="<STRING>", truststore.algorithm="<STRING>", tls.store.type="<STRING>", keystore.file="<STRING>", keystore.password="<STRING>", keystore.algorithm="<STRING>", enable.ssl="<BOOL>", mutual.auth.enabled="<BOOL>", threadpool.size="<INT>", threadpool.buffer.size="<INT>")


## Query Parameters

| Name                         | Description                                                                                                                                                                                                                                                                                                                 | Default Value | Possible Data Types | Optional | Dynamic |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| receiver.url                 | The url which can be used by a client to access the grpc server in this extension. This url should consist the host hostPort, port, fully qualified service name, method name in the following format. `grpc://0.0.0.0:9763/<serviceName>/<methodName>` For example: grpc://0.0.0.0:9763/org.gdn.grpc.EventService/consume |               | STRING              | No       | No      |
| max.inbound.message.size     | Sets the maximum message size in bytes allowed to be received on the server.                                                                                                                                                                                                                                                | 4194304       | INT                 | Yes      | No      |
| max.inbound.metadata.size    | Sets the maximum size of metadata in bytes allowed to be received.                                                                                                                                                                                                                                                          | 8192          | INT                 | Yes      | No      |
| server.shutdown.waiting.time | The time in seconds to wait for the server to shutdown, giving up if the timeout is reached.                                                                                                                                                                                                                                | 5             | LONG                | Yes      | No      |
| truststore.file              | the file path of truststore. If this is provided then server authentication is enabled                                                                                                                                                                                                                                      | \-            | STRING              | Yes      | No      |
| truststore.password          | the password of truststore. If this is provided then the integrity of the keystore is checked                                                                                                                                                                                                                               | \-            | STRING              | Yes      | No      |
| truststore.algorithm         | the encryption algorithm to be used for server authentication                                                                                                                                                                                                                                                               | \-            | STRING              | Yes      | No      |
| tls.store.type               | TLS store type                                                                                                                                                                                                                                                                                                              | \-            | STRING              | Yes      | No      |
| keystore.file                | the file path of keystore. If this is provided then client authentication is enabled                                                                                                                                                                                                                                        | \-            | STRING              | Yes      | No      |
| keystore.password            | the password of keystore                                                                                                                                                                                                                                                                                                    | \-            | STRING              | Yes      | No      |
| keystore.algorithm           | the encryption algorithm to be used for client authentication                                                                                                                                                                                                                                                               | \-            | STRING              | Yes      | No      |
| enable.ssl                   | to enable ssl. If set to true and keystore.file is not given then it will be set to default carbon jks by default                                                                                                                                                                                                           | FALSE         | BOOL                | Yes      | No      |
| mutual.auth.enabled          | to enable mutual authentication. If set to true and keystore.file or truststore.file is not given then it will be set to default carbon jks by default                                                                                                                                                                      | FALSE         | BOOL                | Yes      | No      |
| threadpool.size              | Sets the maximum size of threadpool dedicated to serve requests at the gRPC server                                                                                                                                                                                                                                          | 100           | INT                 | Yes      | No      |
| threadpool.buffer.size       | Sets the maximum size of threadpool buffer server                                                                                                                                                                                                                                                                           | 100           | INT                 | Yes      | No      |

System Parameters

| Name                | Description                                                   | Default Value                                            | Possible Parameters                     |
|---------------------|---------------------------------------------------------------|----------------------------------------------------------|-----------------------------------------|
| keyStoreFile        | Path of the key store file                                    | \${carbon.home}/resources/security/gdncarbon.jks        | valid path for a key store file         |
| keyStorePassword    | This is the password used with key store file                 | gdncarbon                                               | valid password for the key store file   |
| keyStoreAlgorithm   | The encryption algorithm to be used for client authentication | SunX509                                                  | \-                                      |
| trustStoreFile      | This is the trust store file with the path                    | \${carbon.home}/resources/security/client-truststore.jks | \-                                      |
| trustStorePassword  | This is the password used with trust store file               | gdncarbon                                               | valid password for the trust store file |
| trustStoreAlgorithm | the encryption algorithm to be used for server authentication | SunX509                                                  | \-                                      |

## Example 1

    CREATE SOURCE BarStream WITH (type='grpc', receiver.url='grpc://localhost:8888/org.gdn.grpc.EventService/consume', map.type='json') (message String);

Here the port is given as 8888. So a grpc server will be started on port
8888 and the server will expose EventService. This is the default
service packed with the source. In EventService the consume method is

## Example 2

    CREATE SOURCE BarStream WITH (type='grpc', receiver.url='grpc://localhost:8888/org.gdn.grpc.EventService/consume', map.type='json', map.attributes="name='trp:name', age='trp:age', message='message'") (message String, name String, age int);

Here we are getting headers sent with the request as transport
properties and injecting them into the stream. With each request a
header will be sent in MetaData in the following format: `Name:John`,
`Age:23`

## Example 3

    CREATE SOURCE BarStream WITH (type='grpc', receiver.url='grpc://localhost:8888/org.gdn.grpc.MyService/send', map.type='protobuf') (stringValue string, intValue int,longValue long,booleanValue bool,floatValue float,doubleValue double);

Here the port is given as 8888. So a grpc server will be started on port
8888 and sever will keep listening to the `send` RPC method in the
`MyService` service.

## Example 4

    CREATE SOURCE BarStream WITH (type='grpc', receiver.url='grpc://localhost:8888/org.gdn.grpc.MyService/send', map.type='protobuf', attributes="a = 'stringValue', b = 'intValue', c = 'longValue',d = 'booleanValue', e ='floatValue', f ='doubleValue'") (a string ,c long,b int, d bool,e float,f double);

Here the port is given as 8888. So a grpc server will be started on port
8888 and sever will keep listening to the `send` method in the
`MyService` service. Since we provide mapping in the stream we can use
any names for stream attributes, but we have to map those names with
correct protobuf message attributes' names. If we want to send
metadata, we should map the attributes.

## Example 5

    CREATE SOURCE BarStream WITH (type='grpc', receiver.url='grpc://localhost:8888/org.gdn.grpc.StreamService/clientStream', map.type='protobuf') (stringValue string, intValue int,longValue long,booleanValue bool,floatValue float,doubleValue double);

Here we receive a stream of requests to the grpc source. Whenever we
want to use streaming with grpc source, we have to define the RPC method
as client streaming method,
when we define a stream method stream processor will identify it as a stream RPC
method and ready to accept stream of request from the client.
