# HTTP & HTTPS

The **http extension** extension receives and publishes events via HTTP and HTTPS transports, calls external services, and serves incoming requests and provide synchronous responses.

## Features

* **[http (Sink)](#http-sink)**

    HTTP sink publishes messages via HTTP or HTTPS protocols using methods such as ``POST``, ``GET``, ``PUT``, and ``DELETE`` on formats text, XML and JSON. It can also publish to endpoints protected by basic authentication or OAuth 2.0.

* **[http-call (Sink)](#http-call-sink)**

    The http-call sink publishes messages to endpoints via HTTP or HTTPS protocols using methods such as ``POST``, ``GET``, `PUT`, and ``DELETE`` on formats text, XML or JSON and consume responses through its corresponding http-call-response source. It also supports calling endpoints protected with basic authentication or OAuth 2.0.

* **[http-service-response (Sink)](#http-service-response-sink)**

    The http-service-response sink send responses of the requests consumed by its corresponding http-service source, by mapping the response messages to formats such as text, XML and JSON.

* **[http (Source)](#http-source)**

    HTTP source receives ``POST`` requests via HTTP and HTTPS protocols in format such as text, XML and JSON. It also supports basic authentication to ensure events are received from authorized users/systems. The request headers and properties can be accessed via transport properties in the format `trp:<header>`.

* **[http-call-response (Source)](#http-call-response-source)**

    The http-call-response source receives the responses for the calls made by its corresponding `http-call` sink, and maps them from formats such as text, XML and JSON.

    To handle messages with different http status codes having different formats, multiple `http-call-response` sources are allowed to associate with a single http-call sink.

    It allows accessing the attributes of the event that initiated the call, and the response headers and properties via transport properties in the format `trp:<attribute name>` and `trp:<header/property>` respectively.

* **[http-service (Source)](#http-service-source)**

    The http-service source receives ``POST`` requests via HTTP and HTTPS protocols in format such as text, XML and JSON and sends responses via its corresponding `http-service-response` sink correlated through a unique source.id.

    For request and response correlation, it generates a messageId upon each incoming request and expose it via transport properties in the format `trp:messageId` to correlate them with the responses at the `http-service-response` sink.

    The request headers and properties can be accessed via transport properties in the format `trp:<header>`.

    It also supports basic authentication to ensure events are received from authorized users/systems.

## Sink

### http (Sink)

HTTP sink publishes messages via HTTP or HTTPS protocols using methods such as `POST`, `GET`, `PUT`, and `DELETE` on formats `text`, `XML` and `JSON`. It can also publish to endpoints protected by basic authentication or OAuth 2.0.

Syntax:

```js
    CREATE SINK <name> WITH (type="http", publisher.url="<STRING>", basic.auth.username="<STRING>", basic.auth.password="<STRING>", https.truststore.file="<STRING>", https.truststore.password="<STRING>", oauth.username="<STRING>", oauth.password="<STRING>", consumer.key="<STRING>", consumer.secret="<STRING>", token.url="<STRING>", refresh.token="<STRING>", headers="<STRING>", method="<STRING>", socket.idle.timeout="<INT>", chunk.disabled="<BOOL>", ssl.protocol="<STRING>", ssl.verification.disabled="<BOOL>", tls.store.type="<STRING>", ssl.configurations="<STRING>", proxy.host="<STRING>", proxy.port="<STRING>", proxy.username="<STRING>", proxy.password="<STRING>", client.bootstrap.configurations="<STRING>", max.pool.active.connections="<INT>", min.pool.idle.connections="<INT>", max.pool.idle.connections="<INT>", min.evictable.idle.time="<STRING>", time.between.eviction.runs="<STRING>", max.wait.time="<STRING>", test.on.borrow="<BOOL>", test.while.idle="<BOOL>", exhausted.action="<INT>", hostname.verification.enabled="<BOOL>", map.type="<STRING>")
```

QUERY PARAMETERS

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| publisher.url | The URL to which the outgoing events should be published.<br>Examples:<br>`http://localhost:8080/endpoint`,<br>`https://localhost:8080/endpoint` | | STRING | No | No |
| basic.auth.username | The username to be included in the authentication header when calling endpoints protected by basic authentication. `basic.auth.password` property should be also set when using this property.| | STRING | Yes | No |
| basic.auth.password | The password to be included in the authentication header when calling endpoints protected by basic authentication. `basic.auth.username` property should be also set when using this property. | | STRING | Yes | No |
| https.truststore.file | The file path of the client truststore when sending messages through `https` protocol. |`${cep.home}/resources/security/client-truststore.jks` | STRING | Yes | No |
| https.truststore.password | The password for the client-truststore. | macrometa| STRING | Yes | No |
| oauth.username| The username to be included in the authentication header when calling endpoints protected by OAuth 2.0. `oauth.password` property should be also set when using this property. | | STRING | Yes | No |
| oauth.password | The password to be included in the authentication header when calling endpoints protected by OAuth 2.0. `oauth.username` property should be also set when using this property. | | STRING | Yes | No |
| consumer.key | Consumer key used for calling endpoints protected by OAuth 2.0 | | STRING | Yes | No |
| consumer.secret | Consumer secret used for calling endpoints protected by OAuth 2.0 | | STRING | Yes | No |
| token.url | Token URL to generate a new access tokens when calling endpoints protected by OAuth 2.0 | | STRING | Yes | No |
| refresh.token | Refresh token used for generating new access tokens when calling endpoints protected by OAuth 2.0 | | STRING | Yes | No |
| headers | HTTP request headers in format `"'&lt;key&gt;:&lt;value&gt;','&lt;key&gt;:&lt;value&gt;'"`.<br>When `Content-Type` header is not provided the system derives the Content-Type based on the provided sink mapper as following: <br>&nbsp;- `map.type='xml'`: `application/xml`<br>&nbsp;- `map.type='json'`: `application/json`<br>&nbsp;- `map.type='text'`: `plain/text`<br>&nbsp;- `map.type='keyvalue'`: `application/x-www-form-urlencoded`<br>&nbsp;- For all other cases system defaults to `plain/text`<br>Also the `Content-Length` header need not to be provided, as the system automatically defines it by calculating the size of the payload. | Content-Type and Content-Length headers | STRING | Yes | No |
| method | The HTTP method used for calling the endpoint. | POST | STRING | Yes | No |
| socket.idle.timeout | Socket timeout in millis. | 6000 | INT | Yes | No |
| ssl.protocol | SSL/TLS protocol. | TLS | STRING | Yes | No |
| ssl.verification.disabled | Disable SSL verification. | false | BOOL | Yes | No |
| ssl.configurations | SSL/TSL configurations in format `"'&lt;key&gt;:&lt;value&gt;','&lt;key&gt;:&lt;value&gt;'"`.<br>Some supported parameters:<br>&nbsp;- SSL/TLS protocols: `'sslEnabledProtocols:TLSv1.1,TLSv1.2'`<br>&nbsp;- List of ciphers: `'ciphers:TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256'`<br>&nbsp;- Enable session creation: `'client.enable.session.creation:true'`<br>&nbsp;- Supported server names: `'server.suported.server.names:server'`<br>&nbsp;- Add HTTP SNIMatcher: `'server.supported.snimatchers:SNIMatcher' |  | STRING | Yes | No |
| proxy.host | Proxy server host |  | STRING | Yes | No |
| proxy.port | Proxy server port |  | STRING | Yes | No |
| proxy.username | Proxy server username |  | STRING | Yes | No |
| proxy.password | Proxy server password |  | STRING | Yes | No |
| client.bootstrap.configurations | Client bootstrap configurations in format `"'&lt;key&gt;:&lt;value&gt;','&lt;key&gt;:&lt;value&gt;'"`.<br>Some supported configurations :<br>&nbsp;- Client connect timeout in millis: `'client.bootstrap.connect.timeout:15000'`<br>&nbsp;- Client socket timeout in seconds: `'client.bootstrap.socket.timeout:15'`<br>&nbsp;- Client socket reuse: `'client.bootstrap.socket.reuse:true'`<br>&nbsp;- Enable TCP no delay: `'client.bootstrap.nodelay:true'`<br>&nbsp;- Enable client keep alive: `'client.bootstrap.keepalive:true'`<br>&nbsp;- Send buffer size: `'client.bootstrap.sendbuffersize:1048576'`<br>&nbsp;- Receive buffer size: `'client.bootstrap.recievebuffersize:1048576'` |  | STRING | Yes | No |
| max.pool.active.connections | Maximum possible number of active connection per client pool. |  | INT | Yes | No |
| min.pool.idle.connections | Minimum possible number of idle connections that can exist per client pool. |  | INT | Yes | No |
| max.pool.idle.connections | Maximum possible number of idle connections that can exist per client pool. |  | INT | Yes | No |
| min.evictable.idle.time | Minimum time (in millis) a connection may sit idle in the client pool before it become eligible for eviction.| 300000 | STRING | Yes | No |
| time.between.eviction.runs| Time between two eviction operations (in millis) on the client pool.| 300000 | STRING | Yes | No |
| max.wait.time| The maximum time (in millis) the pool will wait (when there are no available connections) for a connection to be returned to the pool.| 600000 | STRING | Yes | No |
| test.on.borrow | Enable connections to be validated before being borrowed from the client pool.| true | BOOL | Yes | No |
| test.while.idle | Enable connections to be validated during the eviction operation (if any). | true | BOOL | Yes | No |
| exhausted.action | Action that should be taken when the maximum number of active connections are being used. This action should be indicated as an int and possible action values are following.<br>0 - Fail the request.<br>1 - Block the request, until a connection returns to the pool.<br>2 - Grow the connection pool size. |  | INT | Yes | No |
| hostname.verification.enabled | Enable hostname verification. | true | BOOL | Yes | No |


SYSTEM PARAMETERS:

| Name | Description | Default Value | Possible Parameters |
|------|-------------|---------------|---------------------|
| clientBootstrapClientGroupSize | Number of client threads to perform non-blocking read and write to one or more channels. | (Number of available processors) * 2 | Any positive integer |
| clientBootstrapBossGroupSize | Number of boss threads to accept incoming connections.| Number of available processors | Any positive integer |
| clientBootstrapWorkerGroupSize | Number of worker threads to accept the connections from boss threads and perform non-blocking read and write from one or more channels. | (Number of available processors) * 2 | Any positive integer |
| trustStoreLocation | The default truststore file path. | `${cep.home}/resources/security/client-truststore.jks | Path to client truststore `.jks` file |
| trustStorePassword |The default truststore password. | macrometa| Truststore password as string |


EXAMPLE:1

```
CREATE SINK StockStream WITH (type = 'http', publisher.url = 'http://stocks.com/stocks', map.type = 'json') (symbol string, price float, volume long);
```

Events arriving on the StockStream will be published to the HTTP endpoint `http://stocks.com/stocks` using `POST` method with Content-Type `application/json` by converting those events to the default JSON format as following:

```
  "event": {
    "symbol": "FB",
    "price": 24.5,
    "volume": 5000
  }
```

EXAMPLE:2

```
CREATE SINK FooStream WITH (type='http', publisher.url = 'http://localhost:8009/foo', client.bootstrap.configurations = "'client.bootstrap.socket.timeout:20'", max.pool.active.connections = '1', headers = "{{headers}}", map.type='xml', map.payload="""<stock>{{payloadBody}}</stock>""") (payloadBody String, headers string);
```

Events arriving on FooStream will be published to the HTTP endpoint `http://localhost:8009/foo` using ``POST`` method with Content-Type `application/xml` and setting `payloadBody` and `header` attribute values.

If the `payloadBody` contains

```
<symbol>WSO2</symbol>
<price>55.6</price>
<volume>100</volume>
```

and `header` contains `'topic:foobar'` values, then the system will generate an output with the body:

```
<stock>
<symbol>WSO2</symbol>
<price>55.6</price>
<volume>100</volume>
</stock>
```

and HTTP headers:

```
Content-Length:xxx,
Content-Location:'xxx',
Content-Type:'application/xml',
HTTP_METHOD:'POST'
```

### http-call (Sink)

The http-call sink publishes messages to endpoints via HTTP or HTTPS protocols using methods such as `POST`, `GET`, `PUT`, and `DELETE` on formats `text`, `XML` or `JSON` and consume responses through its corresponding http-call-response source. It also supports calling endpoints protected with basic authentication or OAuth 2.0.

Syntax:

```
CREATE SINK <name> WITH (type="http-call", publisher.url="<STRING>", sink.id="<STRING>", basic.auth.username="<STRING>", basic.auth.password="<STRING>", https.truststore.file="<STRING>", https.truststore.password="<STRING>", oauth.username="<STRING>", oauth.password="<STRING>", consumer.key="<STRING>", consumer.secret="<STRING>", token.url="<STRING>", refresh.token="<STRING>", headers="<STRING>", method="<STRING>", downloading.enabled="<BOOL>", download.path="<STRING>", blocking.io="<BOOL>", socket.idle.timeout="<INT>", chunk.disabled="<BOOL>", ssl.protocol="<STRING>", ssl.verification.disabled="<BOOL>", ssl.configurations="<STRING>", proxy.host="<STRING>", proxy.port="<STRING>", proxy.username="<STRING>", proxy.password="<STRING>", client.bootstrap.configurations="<STRING>", max.pool.active.connections="<INT>", min.pool.idle.connections="<INT>", max.pool.idle.connections="<INT>", min.evictable.idle.time="<STRING>", time.between.eviction.runs="<STRING>", max.wait.time="<STRING>", test.on.borrow="<BOOL>", test.while.idle="<BOOL>", exhausted.action="<INT>", hostname.verification.enabled="<BOOL>", map.type="<STRING>")
```

QUERY PARAMETERS:

<table>
    <tr>
        <th>Name</th>
        <th style="min-width: 20em">Description</th>
        <th>Default Value</th>
        <th>Possible Data Types</th>
        <th>Optional</th>
        <th>Dynamic</th>
    </tr>
    <tr>
        <td style="vertical-align: top">publisher.url</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">The URL which should be called.<br>Examples:<br>`http://localhost:8080/endpoint`,<br>`https://localhost:8080/endpoint`</p></td>
        <td style="vertical-align: top"></td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">No</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">sink.id</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Identifier to correlate the http-call sink to its corresponding http-call-response sources to retrieved the responses.</p></td>
        <td style="vertical-align: top"></td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">No</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">basic.auth.username</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">The username to be included in the authentication header when calling endpoints protected by basic authentication. `basic.auth.password` property should be also set when using this property.</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">basic.auth.password</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">The password to be included in the authentication header when calling endpoints protected by basic authentication. `basic.auth.username` property should be also set when using this property.</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">https.truststore.file</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">The file path of the client truststore when sending messages through `https` protocol.</p></td>
        <td style="vertical-align: top">`${macrometa.home}/resources/security/client-truststore.jks`</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">https.truststore.password</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">The password for the client-truststore.</p></td>
        <td style="vertical-align: top">macrometa</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">oauth.username</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">The username to be included in the authentication header when calling endpoints protected by OAuth 2.0. `oauth.password` property should be also set when using this property.</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">oauth.password</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">The password to be included in the authentication header when calling endpoints protected by OAuth 2.0. `oauth.username` property should be also set when using this property.</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">consumer.key</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Consumer key used for calling endpoints protected by OAuth 2.0</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">consumer.secret</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Consumer secret used for calling endpoints protected by OAuth 2.0</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">token.url</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Token URL to generate a new access tokens when calling endpoints protected by OAuth 2.0</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">refresh.token</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Refresh token used for generating new access tokens when calling endpoints protected by OAuth 2.0</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">headers</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">HTTP request headers in format `"'&lt;key&gt;:&lt;value&gt;','&lt;key&gt;:&lt;value&gt;'"`.<br>When the `Content-Type` header is not provided the system decides the Content-Type based on the provided sink mapper as following: <br>&nbsp;- `map.type='xml'`: `application/xml`<br>&nbsp;- `map.type='json'`: `application/json`<br>&nbsp;- `map.type='text'`: `plain/text`<br>&nbsp;- `map.type='keyvalue'`: `application/x-www-form-urlencoded`<br>&nbsp;&nbsp;- `map.type='query'`: This Sink Mapper can be used to to send the payload as query parameters. In this case `Content-Type` header will not be set.<br>&nbsp;- For all other cases system defaults to `plain/text`<br>Also the `Content-Length` header need not to be provided, as the system automatically defines it by calculating the size of the payload.</p></td>
        <td style="vertical-align: top">Content-Type and Content-Length headers</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">method</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">The HTTP method used for calling the endpoint.</p></td>
        <td style="vertical-align: top">`POST`</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">downloading.enabled</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Enable response received by the http-call-response source to be written to a file. When this is enabled the `download.path` property should be also set.</p></td>
        <td style="vertical-align: top">false</td>
        <td style="vertical-align: top">BOOL</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">download.path</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">The absolute file path along with the file name where the downloads should be saved.</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">Yes</td>
    </tr>
    <tr>
        <td style="vertical-align: top">blocking.io</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Blocks the request thread until a response it received from HTTP call-response source before sending any other request.</p></td>
        <td style="vertical-align: top">false</td>
        <td style="vertical-align: top">BOOL</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">socket.idle.timeout</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Socket timeout in millis.</p></td>
        <td style="vertical-align: top">6000</td>
        <td style="vertical-align: top">INT</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">chunk.disabled</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Disable chunked transfer encoding.</p></td>
        <td style="vertical-align: top">false</td>
        <td style="vertical-align: top">BOOL</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">ssl.protocol</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">SSL/TLS protocol.</p></td>
        <td style="vertical-align: top">TLS</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">ssl.verification.disabled</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Disable SSL verification.</p></td>
        <td style="vertical-align: top">false</td>
        <td style="vertical-align: top">BOOL</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">ssl.configurations</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">SSL/TSL configurations.<br>Expected format `"'&lt;key&gt;:&lt;value&gt;','&lt;key&gt;:&lt;value&gt;'"`.<br>Some supported parameters:<br>&nbsp;- SSL/TLS protocols: `'sslEnabledProtocols:TLSv1.1,TLSv1.2'`<br>&nbsp;- List of ciphers: `'ciphers:TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256'`<br>&nbsp;- Enable session creation: `'client.enable.session.creation:true'`<br>&nbsp;- Supported server names: `'server.suported.server.names:server'`<br>&nbsp;- Add HTTP SNIMatcher: `'server.supported.snimatchers:SNIMatcher'`</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">proxy.host</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Proxy server host</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">proxy.port</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Proxy server port</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">proxy.username</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Proxy server username</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">proxy.password</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Proxy server password</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">client.bootstrap.configurations</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Client bootstrap configurations in format `"'&lt;key&gt;:&lt;value&gt;','&lt;key&gt;:&lt;value&gt;'"`.<br>Some supported configurations :<br>&nbsp;- Client connect timeout in millis: `'client.bootstrap.connect.timeout:15000'`<br>&nbsp;- Client socket timeout in seconds: `'client.bootstrap.socket.timeout:15'`<br>&nbsp;- Client socket reuse: `'client.bootstrap.socket.reuse:true'`<br>&nbsp;- Enable TCP no delay: `'client.bootstrap.nodelay:true'`<br>&nbsp;- Enable client keep alive: `'client.bootstrap.keepalive:true'`<br>&nbsp;- Send buffer size: `'client.bootstrap.sendbuffersize:1048576'`<br>&nbsp;- Receive buffer size: `'client.bootstrap.recievebuffersize:1048576'`</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">max.pool.active.connections</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Maximum possible number of active connection per client pool.</p></td>
        <td style="vertical-align: top">-1</td>
        <td style="vertical-align: top">INT</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">min.pool.idle.connections</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Minimum number of idle connections that can exist per client pool.</p></td>
        <td style="vertical-align: top">0</td>
        <td style="vertical-align: top">INT</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">max.pool.idle.connections</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Maximum number of idle connections that can exist per client pool.</p></td>
        <td style="vertical-align: top">100</td>
        <td style="vertical-align: top">INT</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">min.evictable.idle.time</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Minimum time (in millis) a connection may sit idle in the client pool before it become eligible for eviction.</p></td>
        <td style="vertical-align: top">300000</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">time.between.eviction.runs</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Time between two eviction operations (in millis) on the client pool.</p></td>
        <td style="vertical-align: top">30000</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">max.wait.time</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">The maximum time (in millis) the pool will wait (when there are no available connections) for a connection to be returned to the pool.</p></td>
        <td style="vertical-align: top">60000</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">test.on.borrow</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Enable connections to be validated before being borrowed from the client pool.</p></td>
        <td style="vertical-align: top">true</td>
        <td style="vertical-align: top">BOOL</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">test.while.idle</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Enable connections to be validated during the eviction operation (if any).</p></td>
        <td style="vertical-align: top">true</td>
        <td style="vertical-align: top">BOOL</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">exhausted.action</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Action that should be taken when the maximum number of active connections are being used. This action should be indicated as an int and possible action values are following.<br>0 - Fail the request.<br>1 - Block the request, until a connection returns to the pool.<br>2 - Grow the connection pool size.</p></td>
        <td style="vertical-align: top">1 (Block when exhausted)</td>
        <td style="vertical-align: top">INT</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">hostname.verification.enabled</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Enable hostname verification</p></td>
        <td style="vertical-align: top">true</td>
        <td style="vertical-align: top">BOOL</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
</table>

SYSTEM PARAMETERS:

<table>
    <tr>
        <th>Name</th>
        <th style="min-width: 20em">Description</th>
        <th>Default Value</th>
        <th>Possible Parameters</th>
    </tr>
    <tr>
        <td style="vertical-align: top">clientBootstrapClientGroupSize</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">Number of client threads to perform non-blocking read and write to one or more channels.</p></td>
        <td style="vertical-align: top">(Number of available processors) * 2</td>
        <td style="vertical-align: top">Any positive integer</td>
    </tr>
    <tr>
        <td style="vertical-align: top">clientBootstrapBossGroupSize</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">Number of boss threads to accept incoming connections.</p></td>
        <td style="vertical-align: top">Number of available processors</td>
        <td style="vertical-align: top">Any positive integer</td>
    </tr>
    <tr>
        <td style="vertical-align: top">clientBootstrapWorkerGroupSize</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">Number of worker threads to accept the connections from boss threads and perform non-blocking read and write from one or more channels.</p></td>
        <td style="vertical-align: top">(Number of available processors) * 2</td>
        <td style="vertical-align: top">Any positive integer</td>
    </tr>
    <tr>
        <td style="vertical-align: top">trustStoreLocation</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">The default truststore file path.</p></td>
        <td style="vertical-align: top">`${macrometa.home}/resources/security/client-truststore.jks`</td>
        <td style="vertical-align: top">Path to client truststore `.jks` file</td>
    </tr>
    <tr>
        <td style="vertical-align: top">trustStorePassword</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">The default truststore password.</p></td>
        <td style="vertical-align: top">macrometa</td>
        <td style="vertical-align: top">Truststore password as string</td>
    </tr>
</table>

EXAMPLE 1:

```
    CREATE SINK FooStream WITH (type='http-call', sink.id='foo', publisher.url='http://localhost:8009/foo', map.type='xml', map.payload='{{payloadBody}}') (payloadBody string);

    CREATE SOURCE ResponseStream WITH (type='http-call-response', sink.id='foo', map.type='text', regex.A='((.|\n)*)', map.attributes="headers='trp:headers'", message='A[1]') (message string, headers string);
```

When events arrive in `FooStream`, http-call sink makes calls to endpoint on url `http://localhost:8009/foo` with ``POST`` method and Content-Type `application/xml`.

If the event `payloadBody` attribute contains following XML:

```
<item>
    <name>apple</name>
    <price>55</price>
    <quantity>5</quantity>
</item>
```

the http-call sink maps that and sends it to the endpoint.

When endpoint sends a response it will be consumed by the corresponding http-call-response source correlated via the same `sink.id` `foo` and that will map the response message and send it via `ResponseStream` steam by assigning the message body as `message` attribute and response headers as `headers` attribute of the event.


EXAMPLE 2:

```
    CREATE SINK DownloadRequestStream WITH (type='http-call', publisher.url='http://localhost:8005/files/{{name}}', downloading.enabled='true', download.path='{{downloadPath}}{{name}}', method='`GET`', sink.id='download', map.type='json') (name String, id int, downloadPath string);

    CREATE SOURCE ResponseStream2xx WITH (type='http-call-response', sink.id='download', http.status.code='2\\d+', map.type='text', regex.A='((.|\n)*)', map.attributes="name='trp:name'", id='trp:id', file='A[1]') (name string, id string, file string);

    CREATE SOURCE ResponseStream4xx WITH (type='http-call-response', sink.id='download', http.status.code='4\\d+', map.type='text', map.regex.A='((.|\n)*)', map.attributes="errorMsg='A[1]'") (errorMsg string);
```

When events arrive in `DownloadRequestStream` with `name`:`foo.txt`, `id`:`75` and `downloadPath`:`/user/download/` the http-call sink sends a `GET` request to the url `http://localhost:8005/files/foo.txt` to download the file to the given path `/user/download/foo.txt` and capture the response via its corresponding http-call-response source based on the response status code.

If the response status code is in the range of 200 the message will be received by the http-call-response source associated with the `ResponseStream2xx` stream which expects `http.status.code` with regex `2\\d+` while downloading the file to the local file system on the path `/user/download/foo.txt` and mapping the response message having the absolute file path to event's `file` attribute.

If the response status code is in the range of 400 then the message will be received by the http-call-response source associated with the `ResponseStream4xx` stream which expects `http.status.code` with regex `4\\d+` while mapping the error response to the `errorMsg` attribute of the event.

EXAMPLE 3:

```
    CREATE SINK FooStream WITH (type='http-call', method='GET', sink.id='foo', publisher.url='http://localhost:8009/foo', map.type='query', map.payload="'{{payloadBody}}'") (payloadBody string);
```

When events arrive in `FooStream`, http-call sink makes calls to endpoint on url `http://localhost:8009/foo` with ``GET`` method. The `Content-Type` will not be set. All the attributes in the payload  will be sent to url as query parameters.

If the event `payloadBody` attribute contains following JSON:

```
{
    "name": "apple",
    "price": 55
}
```

the http-call sink maps that and sends it to the endpoint. The effective URL will be `http://localhost:8009/foo?name=apple&price=55`

### http-service-response (Sink)

The http-service-response sink send responses of the requests consumed by its corresponding http-service source, by mapping the response messages to formats such as `text`, `XML` and `JSON`.

Syntax:

```
    CREATE SINK <name> WITH (type="http-service-response", source.id="<STRING>", message.id="<STRING>", headers="<STRING>", map.type="<STRING>")
```

QUERY PARAMETERS:

<table>
    <tr>
        <th>Name</th>
        <th style="min-width: 20em">Description</th>
        <th>Default Value</th>
        <th>Possible Data Types</th>
        <th>Optional</th>
        <th>Dynamic</th>
    </tr>
    <tr>
        <td style="vertical-align: top">source.id</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Identifier to correlate the http-service-response sink to its corresponding http-service source which consumed the request.</p></td>
        <td style="vertical-align: top"></td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">No</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">message.id</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Identifier to correlate the response with the request received by http-service source.</p></td>
        <td style="vertical-align: top"></td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">No</td>
        <td style="vertical-align: top">Yes</td>
    </tr>
    <tr>
        <td style="vertical-align: top">headers</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">HTTP request headers in format `"'&lt;key&gt;:&lt;value&gt;','&lt;key&gt;:&lt;value&gt;'"`.<br>When the `Content-Type` header is not provided the system decides the Content-Type based on the provided sink mapper as following: <br>&nbsp;- `map.type='xml'`: `application/xml`<br>&nbsp;- `map.type='json'`: `application/json`<br>&nbsp;- `map.type='text'`: `plain/text`<br>&nbsp;- `map.type='keyvalue'`: `application/x-www-form-urlencoded`<br>&nbsp;- For all other cases system defaults to `plain/text`<br>Also the `Content-Length` header need not to be provided, as the system automatically defines it by calculating the size of the payload.</p></td>
        <td style="vertical-align: top">Content-Type and Content-Length headers</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
</table>

EXAMPLE:1

```
    CREATE SOURCE AddStream WITH (type='http-service', receiver.url='http://localhost:5005/add', source.id='adder', map.type='json', map.attributes="messageId='trp:messageId', value1='$.event.value1', value2='$.event.value2'") (messageId string, value1 long, value2 long);

    CREATE SINK ResultStream WITH (type='http-service-response', source.id='adder', message.id='{{messageId}}', map.type='json') (messageId string, results long);

    @info(name = 'query1')
    insert into ResultStream
    select messageId, value1 + value2 as results
    from AddStream ;
```

The http-service source on stream `AddStream` listens on url `http://localhost:5005/stocks` for JSON messages with format:

```
{
    "event": {
        "value1": 3,
        "value2": 4
    }
}
```

and when events arrive it maps to `AddStream` events and pass them to query `query1` for processing. The query results produced on `ResultStream` are sent as a response via http-service-response sink with format:

```
{
    "event": {
        "results": 7
    }
}
```

Here the request and response are correlated by passing the `messageId` produced by the http-service to the respective http-service-response sink.


## Source

### http (Source)

HTTP source receives POST requests via HTTP and HTTPS protocols in format such as `text`, `XML` and `JSON`. It also supports basic authentication to ensure events are received from authorized users/systems.

The request headers and properties can be accessed via transport properties in the format `trp:&lt;header&gt;`.

Syntax:

```
    CREATE SOURCE <name> WITH (type="http", receiver.url="<STRING>", basic.auth.enabled="<STRING>", worker.count="<INT>", socket.idle.timeout="<INT>", ssl.verify.client="<STRING>", ssl.protocol="<STRING>", tls.store.type="<STRING>", ssl.configurations="<STRING>", request.size.validation.configurations="<STRING>", header.validation.configurations="<STRING>", server.bootstrap.configurations="<STRING>", trace.log.enabled="<BOOL>", map.type="<STRING>")
```

QUERY PARAMETERS:

<table>
    <tr>
        <th>Name</th>
        <th style="min-width: 20em">Description</th>
        <th>Default Value</th>
        <th>Possible Data Types</th>
        <th>Optional</th>
        <th>Dynamic</th>
    </tr>
    <tr>
        <td style="vertical-align: top">receiver.url</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">The URL on which events should be received. To enable SSL use `https` protocol in the url.</p></td>
        <td style="vertical-align: top">`http://0.0.0.0:9763/<appNAme>/<streamName>`</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">basic.auth.enabled</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">This only works in VM, Docker and Kubernetes.<br>Where when enabled it authenticates each request using the `Authorization:'Basic encodeBase64(username:Password)'` header.</p></td>
        <td style="vertical-align: top">false</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">worker.count</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">The number of active worker threads to serve the incoming events. By default the value is set to `1` to ensure events are processed in the same order they arrived. By increasing this value, higher performance can be achieved in the expense of loosing event ordering.</p></td>
        <td style="vertical-align: top">1</td>
        <td style="vertical-align: top">INT</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">socket.idle.timeout</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Idle timeout for HTTP connection in millis.</p></td>
        <td style="vertical-align: top">120000</td>
        <td style="vertical-align: top">INT</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">ssl.verify.client</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">The type of client certificate verification. Supported values are `require`, `optional`.</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">ssl.protocol</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">SSL/TLS protocol.</p></td>
        <td style="vertical-align: top">TLS</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">tls.store.type</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">TLS store type.</p></td>
        <td style="vertical-align: top">JKS</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">ssl.configurations</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">SSL/TSL configurations in format `"'&lt;key&gt;:&lt;value&gt;','&lt;key&gt;:&lt;value&gt;'"`.<br>Some supported parameters:<br>&nbsp;- SSL/TLS protocols: `'sslEnabledProtocols:TLSv1.1,TLSv1.2'`<br>&nbsp;- List of ciphers: `'ciphers:TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256'`<br>&nbsp;- Enable session creation: `'client.enable.session.creation:true'`<br>&nbsp;- Supported server names: `'server.suported.server.names:server'`<br>&nbsp;- Add HTTP SNIMatcher: `'server.supported.snimatchers:SNIMatcher'`</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">request.size.validation.configurations</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Configurations to validate the HTTP request size.<br>Expected format `"'&lt;key&gt;:&lt;value&gt;','&lt;key&gt;:&lt;value&gt;'"`.<br>Some supported configurations :<br>&nbsp;- Enable request size validation: `'request.size.validation:true'`<br>&nbsp;If request size is validated<br>&nbsp;- Maximum request size: `'request.size.validation.maximum.value:2048'`<br>&nbsp;- Response status code when request size validation fails: `'request.size.validation.reject.status.code:401'`<br>&nbsp;- Response message when request size validation fails: `'request.size.validation.reject.message:Message is bigger than the valid size'`<br>&nbsp;- Response Content-Type when request size validation fails: `'request.size.validation.reject.message.content.type:plain/text'`</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">header.validation.configurations</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Configurations to validate HTTP headers.<br>Expected format `"'&lt;key&gt;:&lt;value&gt;','&lt;key&gt;:&lt;value&gt;'"`.<br>Some supported configurations :<br>&nbsp;- Enable header size validation: `'header.size.validation:true'`<br>&nbsp;If header size is validated<br>&nbsp;- Maximum length of initial line: `'header.validation.maximum.request.line:4096'`<br>&nbsp;- Maximum length of all headers: `'header.validation.maximum.size:8192'`<br>&nbsp;- Maximum length of the content or each chunk: `'header.validation.maximum.chunk.size:8192'`<br>&nbsp;- Response status code when header validation fails: `'header.validation.reject.status.code:401'`<br>&nbsp;- Response message when header validation fails: `'header.validation.reject.message:Message header is bigger than the valid size'`<br>&nbsp;- Response Content-Type when header validation fails: `'header.validation.reject.message.content.type:plain/text'`</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">server.bootstrap.configurations</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Server bootstrap configurations in format `"'&lt;key&gt;:&lt;value&gt;','&lt;key&gt;:&lt;value&gt;'"`.<br>Some supported configurations :<br>&nbsp;- Server connect timeout in millis: `'server.bootstrap.connect.timeout:15000'`<br>&nbsp;- Server socket timeout in seconds: `'server.bootstrap.socket.timeout:15'`<br>&nbsp;- Enable TCP no delay: `'server.bootstrap.nodelay:true'`<br>&nbsp;- Enable server keep alive: `'server.bootstrap.keepalive:true'`<br>&nbsp;- Send buffer size: `'server.bootstrap.sendbuffersize:1048576'`<br>&nbsp;- Receive buffer size: `'server.bootstrap.recievebuffersize:1048576'`<br>&nbsp;- Number of connections queued: `'server.bootstrap.socket.backlog:100'`</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">trace.log.enabled</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Enable trace log for traffic monitoring.</p></td>
        <td style="vertical-align: top">false</td>
        <td style="vertical-align: top">BOOL</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
</table>

System Parameters:

<table>
    <tr>
        <th>Name</th>
        <th style="min-width: 20em">Description</th>
        <th>Default Value</th>
        <th>Possible Parameters</th>
    </tr>
    <tr>
        <td style="vertical-align: top">serverBootstrapBossGroupSize</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">Number of boss threads to accept incoming connections.</p></td>
        <td style="vertical-align: top">Number of available processors</td>
        <td style="vertical-align: top">Any positive integer</td>
    </tr>
    <tr>
        <td style="vertical-align: top">serverBootstrapWorkerGroupSize</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">Number of worker threads to accept the connections from boss threads and perform non-blocking read and write from one or more channels.</p></td>
        <td style="vertical-align: top">(Number of available processors) * 2</td>
        <td style="vertical-align: top">Any positive integer</td>
    </tr>
    <tr>
        <td style="vertical-align: top">serverBootstrapClientGroupSize</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">Number of client threads to perform non-blocking read and write to one or more channels.</p></td>
        <td style="vertical-align: top">(Number of available processors) * 2</td>
        <td style="vertical-align: top">Any positive integer</td>
    </tr>
    <tr>
        <td style="vertical-align: top">defaultHost</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">The default host of the transport.</p></td>
        <td style="vertical-align: top">0.0.0.0</td>
        <td style="vertical-align: top">Any valid host</td>
    </tr>
    <tr>
        <td style="vertical-align: top">defaultScheme</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">The default protocol.</p></td>
        <td style="vertical-align: top">http</td>
        <td style="vertical-align: top">http<br>https</td>
    </tr>
    <tr>
        <td style="vertical-align: top">defaultHttpPort</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">The default HTTP port when default scheme is `http`.</p></td>
        <td style="vertical-align: top">8280</td>
        <td style="vertical-align: top">Any valid port</td>
    </tr>
    <tr>
        <td style="vertical-align: top">defaultHttpsPort</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">The default HTTPS port when default scheme is `https`.</p></td>
        <td style="vertical-align: top">8243</td>
        <td style="vertical-align: top">Any valid port</td>
    </tr>
    <tr>
        <td style="vertical-align: top">keyStoreLocation</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">The default keystore file path.</p></td>
        <td style="vertical-align: top">`${macrometa.home}/resources/security/macrometa.jks`</td>
        <td style="vertical-align: top">Path to `.jks` file</td>
    </tr>
    <tr>
        <td style="vertical-align: top">keyStorePassword</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">The default keystore password.</p></td>
        <td style="vertical-align: top">macrometa</td>
        <td style="vertical-align: top">Keystore password as string</td>
    </tr>
</table>

EXAMPLE:1

```
    @app.name('StockProcessor')

    CREATE SOURCE StockStream WITH (type='http', map.type='json') (symbol string, price float, volume long);

```

Above HTTP source listeners on url `http://0.0.0.0:9763/StockProcessor/StockStream` for JSON messages on the format:

```
{
  "event": {
    "symbol": "FB",
    "price": 24.5,
    "volume": 5000
  }
}
```

It maps the incoming messages and sends them to `StockStream` for processing.

EXAMPLE:2

```
CREATE SOURCE StockStream WITH (type='http', receiver.url='http://localhost:5005/stocks', map.type = 'xml') (symbol string, price float, volume long);

```

Above HTTP source listeners on url `http://localhost:5005/stocks` for JSON messages on the format:

```
<events>
    <event>
        <symbol>Fb</symbol>
        <price>55.6</price>
        <volume>100</volume>
    </event>
</events>
```

It maps the incoming messages and sends them to `StockStream` for processing.

### http-call-response (Source)

The http-call-response source receives the responses for the calls made by its corresponding http-call sink, and maps them from formats such as `text`, `XML` and `JSON`.

To handle messages with different http status codes having different formats, multiple http-call-response sources are allowed to associate with a single http-call sink.

It allows accessing the attributes of the event that initiated the call, and the response headers and properties via transport properties in the format `trp:&lt;attribute name&gt;` and `trp:&lt;header/property&gt;` respectively.

Syntax:

```
CREATE SOURCE <name> WITH (type="http-call-response", sink.id="<STRING>", http.status.code="<STRING>", allow.streaming.responses="<BOOL>", map.type="<STRING>")
```

QUERY PARAMETERS:

<table>
    <tr>
        <th>Name</th>
        <th style="min-width: 20em">Description</th>
        <th>Default Value</th>
        <th>Possible Data Types</th>
        <th>Optional</th>
        <th>Dynamic</th>
    </tr>
    <tr>
        <td style="vertical-align: top">sink.id</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Identifier to correlate the http-call-response source with its corresponding http-call sink that published the messages.</p></td>
        <td style="vertical-align: top"></td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">No</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">http.status.code</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">The matching http responses status code regex, that is used to filter the the messages which will be processed by the source.Eg: `http.status.code = '200'`,<br>`http.status.code = '4\\d+'`</p></td>
        <td style="vertical-align: top">200</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">allow.streaming.responses</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Enable consuming responses on a streaming manner.</p></td>
        <td style="vertical-align: top">false</td>
        <td style="vertical-align: top">BOOL</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
</table>


EXAMPLE:1

```
CREATE SINK EmployeeRequestStream WITH (type='http-call', method='`POST`', publisher.url='http://localhost:8005/registry/employee', sink.id='employee-info', map.type='json') (name string, id int);

CREATE SOURCE EmployeeResponseStream WITH (type='http-call-response', sink.id='employee-info', http.status.code='2\\d+', map.type='json', map.attributes="name='trp:name', id='trp:id', location='$.town', age='$.age'") (name string, id int, location string, age int);

CREATE SOURCE EmployeeErrorStream WITH (type='http-call-response', sink.id='employee-info', http.status.code='4\\d+', map.type='text', map.regex.A='((.|\n)*)', map.attributes="error='A[1]'") (error string);
```

When events arrive in `EmployeeRequestStream`, http-call sink makes calls to endpoint on url `http://localhost:8005/registry/employee` with ``POST`` method and Content-Type `application/json`.

If the arriving event has attributes `name`:`John` and `id`:`1423` it will send a message with default JSON mapping as follows:

```
{
  "event": {
    "name": "John",
    "id": 1423
  }
}
```

When the endpoint responds with status code in the range of 200 the message will be received by the http-call-response source associated with the `EmployeeResponseStream` stream, because it is correlated with the sink by the same `sink.id` `employee-info` and as that expects messages with `http.status.code` in regex format `2\\d+`. If the response message is in the format

```
{
  "town": "NY",
  "age": 24
}
```

the source maps the `location` and `age` attributes by executing JSON path on the message and maps the `name` and `id` attributes by extracting them from the request event via as transport properties.

If the response status code is in the range of 400 then the message will be received by the http-call-response source associated with the `EmployeeErrorStream` stream, because it is correlated with the sink by the same `sink.id` `employee-info` and it expects messages with `http.status.code` in regex format `4\\d+`, and maps the error response to the `error` attribute of the event.

### http-service (Source)

The http-service source receives `POST` requests via HTTP and HTTPS protocols in format such as `text`, `XML` and `JSON` and sends responses via its corresponding http-service-response sink correlated through a unique `source.id`.

For request and response correlation, it generates a `messageId` upon each incoming request and expose it via transport properties in the format `trp:messageId` to correlate them with the responses at the http-service-response sink.

The request headers and properties can be accessed via transport properties in the format `trp:&lt;header&gt;`.

It also supports basic authentication to ensure events are received from authorized users/systems.

Syntax:

```
    CREATE SOURCE <name> WITH (type="http-service", receiver.url="<STRING>", source.id="<STRING>", connection.timeout="<INT>", basic.auth.enabled="<STRING>", worker.count="<INT>", socket.idle.timeout="<INT>", ssl.verify.client="<STRING>", ssl.protocol="<STRING>", tls.store.type="<STRING>", ssl.configurations="<STRING>", request.size.validation.configurations="<STRING>", header.validation.configurations="<STRING>", server.bootstrap.configurations="<STRING>", trace.log.enabled="<BOOL>", map.type="<STRING>")
```

QUERY PARAMETERS:

<table>
    <tr>
        <th>Name</th>
        <th style="min-width: 20em">Description</th>
        <th>Default Value</th>
        <th>Possible Data Types</th>
        <th>Optional</th>
        <th>Dynamic</th>
    </tr>
    <tr>
        <td style="vertical-align: top">receiver.url</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">The URL on which events should be received. To enable SSL use `https` protocol in the url.</p></td>
        <td style="vertical-align: top">`http://0.0.0.0:9763/<appNAme>/<streamName>`</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">source.id</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Identifier to correlate the http-service source to its corresponding http-service-response sinks to send responses.</p></td>
        <td style="vertical-align: top"></td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">No</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">connection.timeout</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Connection timeout in millis. The system will send a timeout, if a corresponding response is not sent by an associated http-service-response sink within the given time.</p></td>
        <td style="vertical-align: top">120000</td>
        <td style="vertical-align: top">INT</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">basic.auth.enabled</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">This only works in VM, Docker and Kubernetes.<br>Where when enabled it authenticates each request using the `Authorization:'Basic encodeBase64(username:Password)'` header.</p></td>
        <td style="vertical-align: top">false</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">worker.count</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">The number of active worker threads to serve the incoming events. By default the value is set to `1` to ensure events are processed in the same order they arrived. By increasing this value, higher performance can be achieved in the expense of loosing event ordering.</p></td>
        <td style="vertical-align: top">1</td>
        <td style="vertical-align: top">INT</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">socket.idle.timeout</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Idle timeout for HTTP connection in millis.</p></td>
        <td style="vertical-align: top">120000</td>
        <td style="vertical-align: top">INT</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">ssl.verify.client</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">The type of client certificate verification. Supported values are `require`, `optional`.</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">ssl.protocol</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">SSL/TLS protocol.</p></td>
        <td style="vertical-align: top">TLS</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">tls.store.type</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">TLS store type.</p></td>
        <td style="vertical-align: top">JKS</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">ssl.configurations</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">SSL/TSL configurations in format `"'&lt;key&gt;:&lt;value&gt;','&lt;key&gt;:&lt;value&gt;'"`.<br>Some supported parameters:<br>&nbsp;- SSL/TLS protocols: `'sslEnabledProtocols:TLSv1.1,TLSv1.2'`<br>&nbsp;- List of ciphers: `'ciphers:TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256'`<br>&nbsp;- Enable session creation: `'client.enable.session.creation:true'`<br>&nbsp;- Supported server names: `'server.suported.server.names:server'`<br>&nbsp;- Add HTTP SNIMatcher: `'server.supported.snimatchers:SNIMatcher'`</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">request.size.validation.configurations</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Configurations to validate the HTTP request size.<br>Expected format `"'&lt;key&gt;:&lt;value&gt;','&lt;key&gt;:&lt;value&gt;'"`.<br>Some supported configurations :<br>&nbsp;- Enable request size validation: `'request.size.validation:true'`<br>&nbsp;If request size is validated<br>&nbsp;- Maximum request size: `'request.size.validation.maximum.value:2048'`<br>&nbsp;- Response status code when request size validation fails: `'request.size.validation.reject.status.code:401'`<br>&nbsp;- Response message when request size validation fails: `'request.size.validation.reject.message:Message is bigger than the valid size'`<br>&nbsp;- Response Content-Type when request size validation fails: `'request.size.validation.reject.message.content.type:plain/text'`</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">header.validation.configurations</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Configurations to validate HTTP headers.<br>Expected format `"'&lt;key&gt;:&lt;value&gt;','&lt;key&gt;:&lt;value&gt;'"`.<br>Some supported configurations :<br>&nbsp;- Enable header size validation: `'header.size.validation:true'`<br>&nbsp;If header size is validated<br>&nbsp;- Maximum length of initial line: `'header.validation.maximum.request.line:4096'`<br>&nbsp;- Maximum length of all headers: `'header.validation.maximum.size:8192'`<br>&nbsp;- Maximum length of the content or each chunk: `'header.validation.maximum.chunk.size:8192'`<br>&nbsp;- Response status code when header validation fails: `'header.validation.reject.status.code:401'`<br>&nbsp;- Response message when header validation fails: `'header.validation.reject.message:Message header is bigger than the valid size'`<br>&nbsp;- Response Content-Type when header validation fails: `'header.validation.reject.message.content.type:plain/text'`</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">server.bootstrap.configurations</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Server bootstrap configurations in format `"'&lt;key&gt;:&lt;value&gt;','&lt;key&gt;:&lt;value&gt;'"`.<br>Some supported configurations :<br>&nbsp;- Server connect timeout in millis: `'server.bootstrap.connect.timeout:15000'`<br>&nbsp;- Server socket timeout in seconds: `'server.bootstrap.socket.timeout:15'`<br>&nbsp;- Enable TCP no delay: `'server.bootstrap.nodelay:true'`<br>&nbsp;- Enable server keep alive: `'server.bootstrap.keepalive:true'`<br>&nbsp;- Send buffer size: `'server.bootstrap.sendbuffersize:1048576'`<br>&nbsp;- Receive buffer size: `'server.bootstrap.recievebuffersize:1048576'`<br>&nbsp;- Number of connections queued: `'server.bootstrap.socket.backlog:100'`</p></td>
        <td style="vertical-align: top">-</td>
        <td style="vertical-align: top">STRING</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
    <tr>
        <td style="vertical-align: top">trace.log.enabled</td>
        <td style="vertical-align: top; word-wrap: break-word"><p style="word-wrap: break-word;margin: 0;">Enable trace log for traffic monitoring.</p></td>
        <td style="vertical-align: top">false</td>
        <td style="vertical-align: top">BOOL</td>
        <td style="vertical-align: top">Yes</td>
        <td style="vertical-align: top">No</td>
    </tr>
</table>

SYSTEM PARAMETERS:

<table>
    <tr>
        <th>Name</th>
        <th style="min-width: 20em">Description</th>
        <th>Default Value</th>
        <th>Possible Parameters</th>
    </tr>
    <tr>
        <td style="vertical-align: top">serverBootstrapBossGroupSize</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">Number of boss threads to accept incoming connections.</p></td>
        <td style="vertical-align: top">Number of available processors</td>
        <td style="vertical-align: top">Any positive integer</td>
    </tr>
    <tr>
        <td style="vertical-align: top">serverBootstrapWorkerGroupSize</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">Number of worker threads to accept the connections from boss threads and perform non-blocking read and write from one or more channels.</p></td>
        <td style="vertical-align: top">(Number of available processors) * 2</td>
        <td style="vertical-align: top">Any positive integer</td>
    </tr>
    <tr>
        <td style="vertical-align: top">serverBootstrapClientGroupSize</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">Number of client threads to perform non-blocking read and write to one or more channels.</p></td>
        <td style="vertical-align: top">(Number of available processors) * 2</td>
        <td style="vertical-align: top">Any positive integer</td>
    </tr>
    <tr>
        <td style="vertical-align: top">defaultHost</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">The default host of the transport.</p></td>
        <td style="vertical-align: top">0.0.0.0</td>
        <td style="vertical-align: top">Any valid host</td>
    </tr>
    <tr>
        <td style="vertical-align: top">defaultScheme</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">The default protocol.</p></td>
        <td style="vertical-align: top">http</td>
        <td style="vertical-align: top">http<br>https</td>
    </tr>
    <tr>
        <td style="vertical-align: top">defaultHttpPort</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">The default HTTP port when default scheme is `http`.</p></td>
        <td style="vertical-align: top">8280</td>
        <td style="vertical-align: top">Any valid port</td>
    </tr>
    <tr>
        <td style="vertical-align: top">defaultHttpsPort</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">The default HTTPS port when default scheme is `https`.</p></td>
        <td style="vertical-align: top">8243</td>
        <td style="vertical-align: top">Any valid port</td>
    </tr>
    <tr>
        <td style="vertical-align: top">keyStoreLocation</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">The default keystore file path.</p></td>
        <td style="vertical-align: top">`${macrometa.home}/resources/security/macrometa.jks`</td>
        <td style="vertical-align: top">Path to `.jks` file</td>
    </tr>
    <tr>
        <td style="vertical-align: top">keyStorePassword</td>
        <td style="vertical-align: top;"><p style="word-wrap: break-word;margin: 0;">The default keystore password.</p></td>
        <td style="vertical-align: top">macrometa</td>
        <td style="vertical-align: top">Keystore password as string</td>
    </tr>
</table>

EXAMPLE:1

```
    CREATE SOURCE AddStream WITH (type='http-service', receiver.url='http://localhost:5005/add', source.id='adder', map.type='json', map.attributes="messageId='trp:messageId', value1='$.event.value1', value2='$.event.value2'") (messageId string, value1 long, value2 long);

    CREATE SINK ResultStream WITH (type='http-service-response', source.id='adder', message.id='{{messageId}}', map.type = 'json') (messageId string, results long);

    @info(name = 'query1')
    insert into ResultStream
    select messageId, value1 + value2 as results
    from AddStream;
```

Above sample listens events on `http://localhost:5005/stocks` url for JSON messages on the format:
```
    {
    "event": {
        "value1": 3,
        "value2": 4
    }
    }
```

Map the vents into AddStream, process the events through query `query1`, and sends the results produced on ResultStream via http-service-response sink on the message format:

```
    {
    "event": {
        "results": 7
    }
    }
```