---
title: http-logger  
---

The `http-logger` Plugin enables logging of request and response data to HTTP/HTTPS servers. Logs are sent as JSON objects, making it easy to integrate with monitoring tools or custom log processing systems.



## Attributes

| Name                   | Type    | Required | Default       | Valid values         | Description                                                                                                                                                                                                              |
|------------------------|---------|----------|---------------|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `uri`                  | string  | True     |               |                      | URI of the HTTP/HTTPS server to send logs to.                                                                                                                                                                           |
| `auth_header`          | string  | False    |               |                      | Authorization header, if required by the server.                                                                                                                                                                        |
| `timeout`              | integer | False    | 3             | [1, ...]             | Connection timeout in seconds.                                                                                                                                                                                          |
| `log_format`           | object  | False    |               |                      | Custom log format as key-value pairs in JSON. Values support strings prefixed with `$` for Stargate or Nginx variables.                                                                                                 |
| `include_req_body`     | boolean | False    | false         | [false, true]        | If `true`, includes the request body in logs. Nginx limitations apply for large request bodies.                                                                                                                         |
| `include_req_body_expr`| array   | False    |               |                      | Expression-based filter for logging request bodies. Uses [lua-resty-expr](https://github.com/api7/lua-resty-expr).                                                                                                      |
| `include_resp_body`    | boolean | False    | false         | [false, true]        | If `true`, includes the response body in logs.                                                                                                                                                                          |
| `include_resp_body_expr`| array  | False    |               |                      | Expression-based filter for logging response bodies. Uses [lua-resty-expr](https://github.com/api7/lua-resty-expr).                                                                                                     |
| `concat_method`        | string  | False    | "json"        | ["json", "new_line"] | Method to concatenate logs: `json` for JSON arrays, `new_line` for newline-delimited JSON objects.                                                                                                                      |
| `ssl_verify`           | boolean | False    | false         | [false, true]        | If `true`, verifies the SSL certificate of the server.                                                                                                                                                                 |

:::note  
The Plugin supports batch processing for efficient log transmission. Logs are sent every 5 seconds or when the batch size reaches 1000 entries.
:::

---

## Example Log Format

Here is an example of the default log format:

```json
{
    "service_id": "",
    "apisix_latency": 100.99999809265,
    "start_time": 1703907485819,
    "latency": 101.99999809265,
    "upstream_latency": 1,
    "client_ip": "127.0.0.1",
    "route_id": "1",
    "server": {
        "version": "3.7.0",
        "hostname": "localhost"
    },
    "request": {
        "headers": {
            "host": "127.0.0.1:1984",
            "content-type": "application/x-www-form-urlencoded",
            "user-agent": "lua-resty-http/0.16.1 (Lua) ngx_lua/10025",
            "content-length": "12"
        },
        "method": "POST",
        "size": 194,
        "url": "http://127.0.0.1:1984/hello?log_body=no",
        "uri": "/hello?log_body=no",
        "querystring": {
            "log_body": "no"
        }
    },
    "response": {
        "headers": {
            "content-type": "text/plain",
            "connection": "close",
            "content-length": "12",
            "server": "Stargate/3.7.0"
        },
        "status": 200,
        "size": 123
    },
    "upstream": "127.0.0.1:1982"
}
```

---

## Metadata

Log formats can be customized globally using Plugin metadata. For example:

```bash
curl http://127.0.0.1:9180/api/stargate/v1/plugin_metadata/http-logger \
-H "X-API-KEY: $admin_key" -X PUT -d '
{
    "log_format": {
        "host": "$host",
        "@timestamp": "$time_iso8601",
        "client_ip": "$remote_addr"
    }
}'
```

The resulting logs:

```json
{"host":"localhost","@timestamp":"2020-09-23T19:05:05-04:00","client_ip":"127.0.0.1"}
```

:::info IMPORTANT  
Plugin metadata configurations apply globally and affect all Routes and Services using the `http-logger` Plugin.  
:::



## Enable Plugin

Here’s an example of enabling the Plugin on a Route:

```bash
curl http://127.0.0.1:9180/api/stargate/v1/routes/1 \
-H "X-API-KEY: $admin_key" -X PUT -d '
{
    "plugins": {
        "http-logger": {
            "uri": "http://mockbin.org/bin/:ID"
        }
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    },
    "uri": "/hello"
}'
```

The [mockbin](http://mockbin.org/bin/create) service can be used to simulate HTTP logging servers.



## Example Usage

To test the Plugin, make a request to Stargate:

```bash
curl -i http://127.0.0.1:9080/hello
```

Logs will be sent to the configured HTTP server.



## Delete Plugin

To disable the `http-logger` Plugin, delete its configuration from the Route:

```bash
curl http://127.0.0.1:9180/api/stargate/v1/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/hello",
    "plugins": {},
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
}'
```

