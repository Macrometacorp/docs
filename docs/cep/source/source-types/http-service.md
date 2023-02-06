---
title: http-service
---

The http-service source receives POST requests via HTTP and HTTPS protocols in format such as `text` and `JSON` and sends responses via its corresponding http-service-response sink correlated through a unique `source.id`.

For request and response correlation, it generates a `messageId` upon each incoming request and expose it via transport
properties in the format `trp:messageId` to correlate them with the responses at the http-service-response sink.

The request headers and properties can be accessed via transport properties in the format `trp:<header>`.

It also supports basic authentication to ensure events are received from authorized users/systems.

## Syntax

    CREATE SOURCE <NAME> WITH (type="http-service", map.type="<STRING>", receiver.url="<STRING>", source.id="<STRING>", connection.timeout="<INT>", basic.auth.enabled="<STRING>", worker.count="<INT>", socket.idle.timeout="<INT>", ssl.verify.client="<STRING>", ssl.protocol="<STRING>", tls.store.type="<STRING>", ssl.configurations="<STRING>", request.size.validation.configurations="<STRING>", header.validation.configurations="<STRING>", server.bootstrap.configurations="<STRING>", trace.log.enabled="<BOOL>")

## Query Parameters

| Name                 | Description                | Default Value             | Possible Data Types | Optional | Dynamic |
|-------------------|-------------------------------|---------------------------|---------------------|----------|---------|
| receiver.url         | The URL on which events should be received. To enable SSL, use `https` protocol in the URL.       | `http://0.0.0.0:9763//` | STRING              | Yes      | No      |
| source.id            | Identifier to correlate the http-service source to its corresponding http-service-response sinks to send responses.        |         | STRING              | No       | No      |
| connection.timeout   | Connection timeout in millis. The system will send a timeout, if a corresponding response is not sent by an associated http-service-response sink within the given time.                 | 120000  | INT                 | Yes      | No      |
| basic.auth.enabled   | This only works in VM, Docker and Kubernetes. Where when enabled it authenticates each request using the `Authorization:'Basic encodeBase64(username:Password)'` header.                 | false   | STRING              | Yes      | No      |
| worker.count         | The number of active worker threads to serve the incoming events. By default the value is set to `1` to ensure events are processed in the same order they arrived. By increasing this value, higher performance can be achieved in the expense of loosing event ordering.       | 1       | INT                 | Yes      | No      |
| socket.idle.timeout  | Idle timeout for HTTP connection in millis.          | 120000  | INT                 | Yes      | No      |
| ssl.verify.client    | The type of client certificate verification. Supported values are `require`, `optional`.         | \-      | STRING              | Yes      | No      |
| ssl.protocol         | SSL/TLS protocol.          | TLS     | STRING              | Yes      | No      |
| tls.store.type       | TLS store type.            | JKS     | STRING              | Yes      | No      |
| ssl.configurations   | SSL/TSL configurations in format `"'<key>:<value>','<key>:<value>'"`. Some supported parameters:  - SSL/TLS protocols: `'sslEnabledProtocols:TLSv1.1,TLSv1.2'`  - List of ciphers: `'ciphers:TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256'`  - Enable session creation: `'client.enable.session.creation:true'`  - Supported server names: `'server.suported.server.names:server'`  - Add HTTP SNIMatcher: `'server.supported.snimatchers:SNIMatcher'`                  | \-      | STRING              | Yes      | No      |
| request.size.validation.configurations | Configurations to validate the HTTP request size. Expected format `"'<key>:<value>','<key>:<value>'"`. Some supported configurations :  - Enable request size validation: `'request.size.validation:true'`  If request size is validated  - Maximum request size: `'request.size.validation.maximum.value:2048'`  - Response status code when request size validation fails: `'request.size.validation.reject.status.code:401'`  - Response message when request size validation fails: `'request.size.validation.reject.message:Message is bigger than the valid size'`  - Response Content-Type when request size validation fails: `'request.size.validation.reject.message.content.type:plain/text'`       | \-      | STRING              | Yes      | No      |
| header.validation.configurations       | Configurations to validate HTTP headers. Expected format `"'<key>:<value>','<key>:<value>'"`. Some supported configurations :  - Enable header size validation: `'header.size.validation:true'`  If header size is validated  - Maximum length of initial line: `'header.validation.maximum.request.line:4096'`  - Maximum length of all headers: `'header.validation.maximum.size:8192'`  - Maximum length of the content or each chunk: `'header.validation.maximum.chunk.size:8192'`  - Response status code when header validation fails: `'header.validation.reject.status.code:401'`  - Response message when header validation fails: `'header.validation.reject.message:Message header is bigger than the valid size'`  - Response Content-Type when header validation fails: `'header.validation.reject.message.content.type:plain/text'` | \-      | STRING              | Yes      | No      |
| server.bootstrap.configurations        | Server bootstrap configurations in format `"'<key>:<value>','<key>:<value>'"`. Some supported configurations :  - Server connect timeout in millis: `'server.bootstrap.connect.timeout:15000'`  - Server socket timeout in seconds: `'server.bootstrap.socket.timeout:15'`  - Enable TCP no delay: `'server.bootstrap.nodelay:true'`  - Enable server keep alive: `'server.bootstrap.keepalive:true'`  - Send buffer size: `'server.bootstrap.sendbuffersize:1048576'`  - Receive buffer size: `'server.bootstrap.recievebuffersize:1048576'`  - Number of connections queued: `'server.bootstrap.socket.backlog:100'` | \-      | STRING              | Yes      | No      |
| trace.log.enabled    | Enable trace log for traffic monitoring.             | false   | BOOL                | Yes      | No      |

## System Parameters

| Name         | Description | Default Value     | Possible Parameters         |
|--------------|-------------|-------------------|-----------------------------|
| serverBootstrapBossGroupSize   | Number of boss threads to accept incoming connections.  | Number of available processors      | Any positive integer        |
| serverBootstrapWorkerGroupSize | Number of worker threads to accept the connections from boss threads and perform non-blocking read and write from one or more channels. | (Number of available processors) \* 2                 | Any positive integer        |
| serverBootstrapClientGroupSize | Number of client threads to perform non-blocking read and write to one or more channels.    | (Number of available processors) \* 2                 | Any positive integer        |
| defaultHost  | The default host of the transport.              | 0.0.0.0   | Any valid host              |
| defaultScheme                  | The default protocol.         | http      | http https                  |
| defaultHttpPort                | The default HTTP port when default scheme is `http`.    | 8280      | Any valid port              |
| defaultHttpsPort               | The default HTTPS port when default scheme is `https`.  | 8243      | Any valid port              |
| keyStoreLocation               | The default keystore file path.                 | \`\${carbon.home}/resources/security/gdncarbon.jks\` | Path to \`.jks\` file       |
| keyStorePassword               | The default keystore password.                  | gdncarbon        | Keystore password as string |

## Example

    @App:name('Sample-HTTP-Source')
    @App:description("This application shows how to receive POST requests via Stream Workers API.")
    @App:qlVersion('2')

    CREATE SOURCE AddStream WITH (type='http-service', source.id='adder', map.type='json', map.attributes.messageId='trp:messageId', map.attributes.value1='$.event.value1', map.attributes.value2='$.event.value2') (messageId string, value1 long, value2 long);

    CREATE SINK ResultStream WITH (type='http-service-response', source.id='adder', message.id='{{messageId}}', map.type = 'json') (messageId string, results long);

    @info(name = 'query1')
    insert into ResultStream
    select messageId, value1 + value2 as results
    from AddStream;

Above sample listens events for JSON messages on the format:

    {
      "event": {
        "value1": 3,
        "value2": 4
      }
    }

Map the vents into AddStream, process the events through query `query1`, and sends the results produced on ResultStream via http-service-response sink on the message format:

    {
      "event": {
        "results": 7
      }
    }
