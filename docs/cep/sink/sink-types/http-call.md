---
title: http-call (Sink)
---

The http-call sink publishes messages to endpoints via HTTP or HTTPS protocols using methods such as POST, GET, PUT, and DELETE on formats `text`, `XML` or `JSON` and consume responses through its corresponding http-call-response source. It also supports calling endpoints protected with basic authentication or OAuth 2.0.

## Syntax

    CREATE SINK <NAME> WITH (type="http-call", map.type="<STRING>", publisher.url="<STRING>", sink.id="<STRING>", basic.auth.username="<STRING>", basic.auth.password="<STRING>", https.truststore.file="<STRING>", https.truststore.password="<STRING>", oauth.username="<STRING>", oauth.password="<STRING>", consumer.key="<STRING>", consumer.secret="<STRING>", token.url="<STRING>", refresh.token="<STRING>", headers="<STRING>", method="<STRING>", downloading.enabled="<BOOL>", download.path="<STRING>", blocking.io="<BOOL>", socket.idle.timeout="<INT>", chunk.disabled="<BOOL>", ssl.protocol="<STRING>", ssl.verification.disabled="<BOOL>", ssl.configurations="<STRING>", proxy.host="<STRING>", proxy.port="<STRING>", proxy.username="<STRING>", proxy.password="<STRING>", client.bootstrap.configurations="<STRING>", max.pool.active.connections="<INT>", min.pool.idle.connections="<INT>", max.pool.idle.connections="<INT>", min.evictable.idle.time="<STRING>", time.between.eviction.runs="<STRING>", max.wait.time="<STRING>", test.on.borrow="<BOOL>", test.while.idle="<BOOL>", exhausted.action="<INT>", hostname.verification.enabled="<BOOL>")

## Query Parameters

| Name           | Description      | Default Value    | Possible Data Types | Optional | Dynamic |
|--------------|------------------------------|-------------------------|---------------------|----------|---------|
| publisher.url  | The URL which should be called. Examples: `http://localhost:8080/endpoint`, `https://localhost:8080/endpoint`      | | STRING              | No       | No      |
| sink.id        | Identifier to correlate the http-call sink to its corresponding http-call-response sources to retrieved the responses.              | | STRING              | No       | No      |
| basic.auth.username             | The username to be included in the authentication header when calling endpoints protected by basic authentication. `basic.auth.password` property should be also set when using this property.   | \-               | STRING              | Yes      | No      |
| basic.auth.password             | The password to be included in the authentication header when calling endpoints protected by basic authentication. `basic.auth.username` property should be also set when using this property.   | \-               | STRING              | Yes      | No      |
| https.truststore.file           | The file path of the client truststore when sending messages through `https` protocol.  | \`\${carbon.home}/resources/security/client-truststore.jks\` | STRING              | Yes      | No      |
| https.truststore.password       | The password for the client-truststore.     | gdncarbon       | STRING              | Yes      | No      |
| oauth.username | The username to be included in the authentication header when calling endpoints protected by OAuth 2.0. `oauth.password` property should be also set when using this property.  | \-               | STRING              | Yes      | No      |
| oauth.password | The password to be included in the authentication header when calling endpoints protected by OAuth 2.0. `oauth.username` property should be also set when using this property.  | \-               | STRING              | Yes      | No      |
| consumer.key   | Consumer key used for calling endpoints protected by OAuth 2.0.         | \-               | STRING              | Yes      | No      |
| consumer.secret                 | Consumer secret used for calling endpoints protected by OAuth 2.0.      | \-               | STRING              | Yes      | No      |
| token.url      | Token URL to generate a new access tokens when calling endpoints protected by OAuth 2.0. | \-               | STRING              | Yes      | No      |
| refresh.token  | Refresh token used for generating new access tokens when calling endpoints protected by OAuth 2.0.        | \-               | STRING              | Yes      | No      |
| headers        | HTTP request headers in format `"'<key>:<value>','<key>:<value>'"`. When the `Content-Type` header is not provided the system decides the Content-Type based on the provided sink mapper as following:  - `map.type='xml'`: `application/xml`  - `map.type='json'`: `application/json`  - `map.type='text'`: `plain/text`  - `map.type='keyvalue'`: `application/x-www-form-urlencoded`  - For all other cases system defaults to `plain/text`. Also the `Content-Length` header need not to be provided, as the system automatically defines it by calculating the size of the payload.              | Content-Type and Content-Length headers     | STRING              | Yes      | No      |
| method         | The HTTP method used for calling the endpoint.               | POST             | STRING              | Yes      | No      |
| downloading.enabled             | Enable response received by the http-call-response source to be written to a file. When this is enabled, the `download.path` property should also be set.       | false            | BOOL                | Yes      | No      |
| download.path  | The absolute file path along with the file name where the downloads should be saved.    | \-               | STRING              | Yes      | Yes     |
| blocking.io    | Blocks the request thread until a response it received from HTTP call-response source before sending any other request.             | false            | BOOL                | Yes      | No      |
| socket.idle.timeout             | Socket timeout in millis.  | 6000             | INT                 | Yes      | No      |
| chunk.disabled | Disable chunked transfer encoding.          | false            | BOOL                | Yes      | No      |
| ssl.protocol   | SSL/TLS protocol.          | TLS              | STRING              | Yes      | No      |
| ssl.verification.disabled       | Disable SSL verification.  | false            | BOOL                | Yes      | No      |
| ssl.configurations              | SSL/TSL configurations. Expected format `"'<key>:<value>','<key>:<value>'"`. Some supported parameters:  - SSL/TLS protocols: `'sslEnabledProtocols:TLSv1.1,TLSv1.2'`  - List of ciphers: `'ciphers:TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256'`  - Enable session creation: `'client.enable.session.creation:true'`  - Supported server names: `'server.suported.server.names:server'`  - Add HTTP SNIMatcher: `'server.supported.snimatchers:SNIMatcher'`  | \-               | STRING              | Yes      | No      |
| proxy.host     | Proxy server host          | \-               | STRING              | Yes      | No      |
| proxy.port     | Proxy server port          | \-               | STRING              | Yes      | No      |
| proxy.username | Proxy server username      | \-               | STRING              | Yes      | No      |
| proxy.password | Proxy server password      | \-               | STRING              | Yes      | No      |
| client.bootstrap.configurations | Client bootstrap configurations in format `"'<key>:<value>','<key>:<value>'"`. Some supported configurations :  - Client connect timeout in millis: `'client.bootstrap.connect.timeout:15000'`  - Client socket timeout in seconds: `'client.bootstrap.socket.timeout:15'`  - Client socket reuse: `'client.bootstrap.socket.reuse:true'`  - Enable TCP no delay: `'client.bootstrap.nodelay:true'`  - Enable client keep alive: `'client.bootstrap.keepalive:true'`  - Send buffer size: `'client.bootstrap.sendbuffersize:1048576'`  - Receive buffer size: `'client.bootstrap.recievebuffersize:1048576'` | \-               | STRING              | Yes      | No      |
| max.pool.active.connections     | Maximum possible number of active connection per client pool.          | -1               | INT                 | Yes      | No      |
| min.pool.idle.connections       | Minimum number of idle connections that can exist per client pool.     | 0                | INT                 | Yes      | No      |
| max.pool.idle.connections       | Maximum number of idle connections that can exist per client pool.     | 100              | INT                 | Yes      | No      |
| min.evictable.idle.time         | Minimum time (in millis) a connection may sit idle in the client pool before it become eligible for eviction.      | 300000           | STRING              | Yes      | No      |
| time.between.eviction.runs      | Time between two eviction operations (in millis) on the client pool.   | 30000            | STRING              | Yes      | No      |
| max.wait.time  | The maximum time (in millis) the pool will wait (when there are no available connections) for a connection to be returned to the pool.               | 60000            | STRING              | Yes      | No      |
| test.on.borrow | Enable connections to be validated before being borrowed from the client pool.          | true             | BOOL                | Yes      | No      |
| test.while.idle                 | Enable connections to be validated during the eviction operation (if any).              | true             | BOOL                | Yes      | No      |
| exhausted.action                | Action that should be taken when the maximum number of active connections are being used. This action should be indicated as an int and possible action values are following. 0 - Fail the request. 1 - Block the request, until a connection returns to the pool. 2 - Grow the connection pool size.               | 1 (Block when exhausted)   | INT                 | Yes      | No      |
| hostname.verification.enabled   | Enable hostname verification                | true             | BOOL                | Yes      | No      |

## System Parameters

| Name          | Description   | Default Value    | Possible Parameters    |
|--------------|---------------------------------|----------------------------------|-----------------------|
| clientBootstrapClientGroupSize | Number of client threads to perform non-blocking read and write to one or more channels.    | (Number of available processors) \* 2       | Any positive integer   |
| clientBootstrapBossGroupSize   | Number of boss threads to accept incoming connections.    | Number of available processors              | Any positive integer   |
| clientBootstrapWorkerGroupSize | Number of worker threads to accept the connections from boss threads and perform non-blocking read and write from one or more channels. | (Number of available processors) \* 2       | Any positive integer   |
| trustStoreLocation             | The default truststore file path.               | \`\${carbon.home}/resources/security/client-truststore.jks\` | Path to client truststore \`.jks\` file |
| trustStorePassword             | The default truststore password.                | gdncarbon       | Truststore password as string           |

## Example 1

```sql
CREATE SINK FooStream WITH (type='http-call', sink.id='foo', publisher.url='http://localhost:8009/foo', map.type='json', map.payload="'{{payloadBody}}'") (payloadBody string);

CREATE SOURCE ResponseStream WITH (type='http-call-response', sink.id='foo', map.type='text', regex.A='((.|\n)*)', map.attributes="headers='trp:headers', message='A[1]'") (message string, headers string);
```

When events arrive in `FooStream`, http-call sink makes calls to endpoint on URL `http://localhost:8009/foo` with `POST` method and Content-Type `application/xml`. If the event `payloadBody` attribute contains following JSON:

```json
{
  "item": {
    "name": "apple",
    "price": 55,
    "quantity": 5
  }
}
```

The http-call sink maps that and sends it to the endpoint. When endpoint sends a response it will be consumed by the corresponding http-call-response source correlated via the same `sink.id` `foo` and that will map the response message and send it via `ResponseStream` steam by assigning the message body as `message` attribute and response headers as `headers` attribute of the event.

## Example 2

```sql
CREATE SINK DownloadRequestStream WITH (type='http-call', publisher.url='http://localhost:8005/files/{{name}}', downloading.enabled='true', download.path='{{downloadPath}}{{name}}', method='GET', sink.id='download', map.type='json') (name String, id int, downloadPath string);

CREATE SOURCE ResponseStream2xx WITH (type='http-call-response', sink.id='download', http.status.code='2\\d+', map.type='text', map.regex.A='((.|\n)*)', map.attributes="name='trp:name', id='trp:id', file='A[1]'") (name string, id string, file string);

CREATE SOURCE ResponseStream4xx WITH (type='http-call-response', sink.id='download', http.status.code='4\\d+', map.type='text', map.regex.A='((.|\n)*)', map.attributes="errorMsg='A[1]'") (errorMsg string);
```

When events arrive in `DownloadRequestStream` with `name`:`foo.txt`, `id`:`75` and `downloadPath`:`/user/download/` the http-call sink sends a `GET` request to the URL `http://localhost:8005/files/foo.txt` to download the file to the given path `/user/download/foo.txt` and capture the response via its corresponding http-call-response source based on the response status code.

If the response status code is in the range of 200 the message will be received by the http-call-response source associated with the `ResponseStream2xx` stream which expects `http.status.code` with regex `2\\d+` while downloading the file to the local file system on the path `/user/download/foo.txt` and mapping the response message having the absolute file path to event's `file` attribute.

If the response status code is in the range of 400 then the message will be received by the http-call-response source associated with the `ResponseStream4xx` stream which expects `http.status.code` with regex `4\\d+` while mapping the error response to the `errorMsg` attribute of the event.
