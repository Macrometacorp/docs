---
title: http (Sink)
---

HTTP sink publishes messages via HTTP or HTTPS protocols using methods such as POST, GET, PUT, and DELETE on formats `text` and `JSON`. It can also publish to endpoints protected by basic authentication or OAuth 2.0.

## Syntax

    CREATE SINK <NAME> WITH (type="http", map.type="<STRING>" publisher.url="<STRING>", basic.auth.username="<STRING>", basic.auth.password="<STRING>", https.truststore.file="<STRING>", https.truststore.password="<STRING>", oauth.username="<STRING>", oauth.password="<STRING>", consumer.key="<STRING>", consumer.secret="<STRING>", token.url="<STRING>", refresh.token="<STRING>", headers="<STRING>", method="<STRING>", socket.idle.timeout="<INT>", chunk.disabled="<BOOL>", ssl.protocol="<STRING>", ssl.verification.disabled="<BOOL>", tls.store.type="<STRING>", ssl.configurations="<STRING>", proxy.host="<STRING>", proxy.port="<STRING>", proxy.username="<STRING>", proxy.password="<STRING>", client.bootstrap.configurations="<STRING>", max.pool.active.connections="<INT>", min.pool.idle.connections="<INT>", max.pool.idle.connections="<INT>", min.evictable.idle.time="<STRING>", time.between.eviction.runs="<STRING>", max.wait.time="<STRING>", test.on.borrow="<BOOL>", test.while.idle="<BOOL>", exhausted.action="<INT>", hostname.verification.enabled="<BOOL>")

## Query Parameters

| Name | Description  | Default Value  | Possible Data Types | Optional | Dynamic |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|---------------------|----------|---------|
| publisher.url  | The URL to which the outgoing events should be published. Examples: `http://localhost:8080/endpoint`, `https://localhost:8080/endpoint`  |         | STRING              | No       | No      |
| basic.auth.username   | The username to be included in the authentication header when calling endpoints protected by basic authentication. `basic.auth.password` property should be also set when using this property.    | \-   | STRING              | Yes      | No      |
| basic.auth.password             | The password to be included in the authentication header when calling endpoints protected by basic authentication. `basic.auth.username` property should be also set when using this property.  | \-   | STRING              | Yes      | No      |
| https.truststore.file      | The file path of the client truststore when sending messages through `https` protocol.     | \`\${carbon.home}/resources/security/client-truststore.jks\` | STRING              | Yes      | No      |
| https.truststore.password       | The password for the client-truststore.   | gdncarbon    | STRING              | Yes      | No      |
| oauth.username                  | The username to be included in the authentication header when calling endpoints protected by OAuth 2.0. `oauth.password` property should be also set when using this property.      | \-    | STRING              | Yes      | No      |
| oauth.password   | The password to be included in the authentication header when calling endpoints protected by OAuth 2.0. `oauth.username` property should be also set when using this property.      | \-     | STRING              | Yes      | No      |
| consumer.key                    | Consumer key used for calling endpoints protected by OAuth 2.0   | \-   | STRING              | Yes      | No      |
| consumer.secret                 | Consumer secret used for calling endpoints protected by OAuth 2.0   | \-   | STRING              | Yes      | No      |
| token.url                       | Token URL to generate a new access tokens when calling endpoints protected by OAuth 2.0                  | \-   | STRING              | Yes      | No      |
| refresh.token                   | Refresh token used for generating new access tokens when calling endpoints protected by OAuth 2.0        | \-   | STRING              | Yes      | No      |
| headers                         | HTTP request headers in format `"'<key>:<value>','<key>:<value>'"`. When `Content-Type` header is not provided the system derives the Content-Type based on the provided sink mapper as following: - `map.type='json'`: `application/json`  - `map.type='text'`: `plain/text`  - `map.type='keyvalue'`: `application/x-www-form-urlencoded`  - For all other cases system defaults to `plain/text` Also the `Content-Length` header need not to be provided, as the system automatically defines it by calculating the size of the payload.                  | Content-Type and Content-Length headers                      | STRING              | Yes      | No      |
| method                          | The HTTP method used for calling the endpoint.                      | POST | STRING              | Yes      | No      |
| socket.idle.timeout             | Socket timeout in millis.                                           | 6000 | INT                 | Yes      | No      |
| chunk.disabled                  | Disable chunked transfer encoding.                                  | false            | BOOL                | Yes      | No      |
| ssl.protocol                    | SSL/TLS protocol.       | TLS  | STRING              | Yes      | No      |
| ssl.verification.disabled       | Disable SSL verification.                                           | false            | BOOL                | Yes      | No      |
| tls.store.type                  | TLS store type.         | JKS  | STRING              | Yes      | No      |
| ssl.configurations              | SSL/TSL configurations in format `"'<key>:<value>','<key>:<value>'"`. Some supported parameters:  - SSL/TLS protocols: `'sslEnabledProtocols:TLSv1.1,TLSv1.2'`  - List of ciphers: `'ciphers:TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256'`  - Enable session creation: `'client.enable.session.creation:true'`  - Supported server names: `'server.suported.server.names:server'`  - Add HTTP SNIMatcher: `'server.supported.snimatchers:SNIMatcher'`  | \-   | STRING              | Yes      | No      |
| proxy.host                      | Proxy server host       | \-   | STRING              | Yes      | No      |
| proxy.port                      | Proxy server port       | \-   | STRING              | Yes      | No      |
| proxy.username                  | Proxy server username   | \-   | STRING              | Yes      | No      |
| proxy.password                  | Proxy server password   | \-   | STRING              | Yes      | No      |
| client.bootstrap.configurations | Client bootstrap configurations in format `"'<key>:<value>','<key>:<value>'"`. Some supported configurations :  - Client connect timeout in millis: `'client.bootstrap.connect.timeout:15000'`  - Client socket timeout in seconds: `'client.bootstrap.socket.timeout:15'`  - Client socket reuse: `'client.bootstrap.socket.reuse:true'`  - Enable TCP no delay: `'client.bootstrap.nodelay:true'`  - Enable client keep alive: `'client.bootstrap.keepalive:true'`  - Send buffer size: `'client.bootstrap.sendbuffersize:1048576'`  - Receive buffer size: `'client.bootstrap.recievebuffersize:1048576'` | \-   | STRING              | Yes      | No      |
| max.pool.active.connections     | Maximum possible number of active connection per client pool.       | -1   | INT                 | Yes      | No      |
| min.pool.idle.connections       | Minimum number of idle connections that can exist per client pool.  | 0    | INT                 | Yes      | No      |
| max.pool.idle.connections       | Maximum number of idle connections that can exist per client pool.  | 100  | INT                 | Yes      | No      |
| min.evictable.idle.time         | Minimum time (in millis) a connection may sit idle in the client pool before it become eligible for eviction.                                | 300000           | STRING              | Yes      | No      |
| time.between.eviction.runs      | Time between two eviction operations (in millis) on the client pool.                                     | 30000            | STRING              | Yes      | No      |
| max.wait.time                   | The maximum time (in millis) the pool will wait (when there are no available connections) for a connection to be returned to the pool.                   | 60000            | STRING              | Yes      | No      |
| test.on.borrow                  | Enable connections to be validated before being borrowed from the client pool.                           | true | BOOL                | Yes      | No      |
| test.while.idle                 | Enable connections to be validated during the eviction operation (if any).                               | true | BOOL                | Yes      | No      |
| exhausted.action                | Action that should be taken when the maximum number of active connections are being used. This action should be indicated as an int and possible action values are following. 0 - Fail the request. 1 - Block the request, until a connection returns to the pool. 2 - Grow the connection pool size.                | 1 (Block when exhausted)                                     | INT                 | Yes      | No      |
| hostname.verification.enabled   | Enable hostname verification.                                       | true | BOOL                | Yes      | No      |

## System Parameters

| Name                           | Description             | Default Value    | Possible Parameters                     |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|-----------------------------------------|
| clientBootstrapClientGroupSize | Number of client threads to perform non-blocking read and write to one or more channels.    | (Number of available processors) \* 2                        | Any positive integer                    |
| clientBootstrapBossGroupSize   | Number of boss threads to accept incoming connections.                          | Number of available processors                               | Any positive integer                    |
| clientBootstrapWorkerGroupSize | Number of worker threads to accept the connections from boss threads and perform non-blocking read and write from one or more channels. | (Number of available processors) \* 2                        | Any positive integer                    |
| trustStoreLocation             | The default truststore file path.   | \`\${carbon.home}/resources/security/client-truststore.jks\` | Path to client truststore \`.jks\` file |
| trustStorePassword             | The default truststore password.    | gdncarbon       | Truststore password as string           |

## Example 1

    CREATE SINK StockStream WITH (type = 'http', map.type = 'json', publisher.url = 'http://stocks.com/stocks') (symbol string, price float, volume long);

Events arriving on the StockStream will be published to the HTTP endpoint `http://stocks.com/stocks` using `POST` method with Content-Type `application/json` by converting those events to the default JSON format:

    {
      "event": {
        "symbol": "FB",
        "price": 24.5,
        "volume": 5000
      }
    }
    
## Example 2

    CREATE SINK FooStream WITH (type='http', map.type='json', publisher.url = 'http://localhost:8009/foo', client.bootstrap.configurations = "'client.bootstrap.socket.timeout:20'", max.pool.active.connections = '1', headers = "{{headers}}", map.payload="""<stock>{{payloadBody}}</stock>""") (payloadBody string, headers string);

Events arriving on FooStream will be published to the HTTP endpoint `http://localhost:8009/foo` using `POST` method with Content-Type `application/json` and setting `payloadBody` and `header` attribute values. If the `payloadBody` contains

    {
      "symbol": "gdn",
      "price": 55.6,
      "volume": 100
    }

and `header` contains `'topic:foobar'` values, then the system will generate an output with the body:

    {
      "stock": {
        "symbol": "gdn",
        "price": 55.6,
        "volume": 100
      }
    }

and HTTP headers: `Content-Length:xxx`, `Content-Location:'xxx'`, `Content-Type:'application/json'`, `HTTP_METHOD:'POST'`
