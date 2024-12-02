---
title: limit-count
---

This plugin uses the Fixed Window algorithm to limit the amount of requests in a count per time. 

### Attributes

| **Name**                  | **Type** | **Required**                          | **Default**         | **Valid values**                    | **Description**                                                                                                                                                                                                 |
|---------------------------|----------|---------------------------------------|---------------------|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `count`                   | string   | Yes                                   |                     | `conn` > 0                          | Maximum number of requests allowed.                                                                                                                                                                             |
| `time_window`             | integer  | Yes                                   |                     | `time_window` > 0                   | Time elapsed before resetting the count is reset                                                                                                                                                                |
| `key_type`                | string   | No                                    | "var"               | ["var", "var_combination"]          | User-specified key type                                                                                                                                                                                         |
| `key`                     | string   | No                                    | "remote_addr"       |                                     | User-specified key for the request limiting                                                                                                                                                                     |
| `rejected_code`           | string   | No                                    | 503                 | [200, ..., 599]                     | HTTP status code returned when request limit is exceeded                                                                                                                                                        |
| `rejected_msg`            | string   | No                                    |                     |                                     | Response body returned when request limit is exceeded                                                                                                                                                           |
| `policy`                  | string   | No                                    | "local"             | ["local", "redis", "redis-cluster"] | Limit used for retrieving and limiting the rate count. `local` value stored count values in memory on the node while setting to 'redis' stores counters in a Redis server and shares these values across nodes. |
| `allow_degradation`       | boolean  | No                                    | false               | [true, false]                       | When set to true, allows plugin degradation if plugin becomes temporarily unavailable, thus allowing more requests.                                                                                             |
| `show_limit_quota_header` | boolean  | No                                    | true                |                                     | If set to 'true', adds the `X-RateLimit-Limit`(total number of requests) and `X-RateLimit-Remaining`(remaining number of requests) to the response header.                                                      |
| `group`                   | string   | No                                    |                     |                                     | Group to share the counter with                                                                                                                                                                                 |
| `redis_host`              | string   | Required if policy is 'redis'         |                     |                                     | Address of Redis server                                                                                                                                                                                         |
| `redis_port`              | integer  | No                                    | 6379                | [1,...]                             | Port of Redis server                                                                                                                                                                                            |
| `redis_username`          | string   | No                                    |                     |                                     | Username for Redis authentication.                                                                                                                                                                              |
| `redis_password`          | string   | No                                    |                     |                                     | Password for Redis authentication                                                                                                                                                                               |
| `redis_ssl`               | boolean  | No                                    |                     |                                     | Set to true, uses SSL to connect to Redis instance                                                                                                                                                              |
| `redis_ssl_verify`        | boolean  | No                                    |                     |                                     | Set to true, verifies the validity of the SSL certificate.                                                                                                                                                      |
| `redis_database`          | integer  | No                                    | redis_database >= 0 | redis_database >= 0                 | Selected database of the Redis server.                                                                                                                                                                          |
| `redis_timeout`           | integer  | No                                    |                     | [1,...]                             | Time in milliseconds for commands submitted to the Redis server.                                                                                                                                                |
| `redis_cluster_nodes`     | array    | required when policy is redis-cluster |                     |                                     | Addresses of Redis cluster nodes                                                                                                                                                                                |
| `redis_cluster_name`      | string   | required when policy is redis-cluster |                     |                                     | Name of Redis cluster nodes                                                                                                                                                                                     |
|                           |          |                                       |                     |                                     |                                                                                                                                                                                                                 |


### Example Usage

```c
curl -i https://adrsearche-us-east.photoniq.macrometa.io:9080/api/stargate/v1/routes' \
-H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/index.html",
    "plugins": {
        "limit-count": {
            "count": 2,
            "time_window": 60,
            "rejected_code": 503,
            "key_type": "var",
            "key": "remote_addr"
        }
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:9001": 1
        }
    }
}'
```

The configuration below enforces a rate limit of 2 requests within a 60-second window. The first two requests will succeed, and the response headers will include the following:

- **X-RateLimit-Limit**: The maximum number of requests allowed.
- **X-RateLimit-Remaining**: The number of requests still available within the current limit.
- **X-RateLimit-Reset**: The time (in seconds) remaining until the limit resets.

For example:

```bash
curl -i http://127.0.0.1:9080/index.html
```

Response:

```http
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 13175
Connection: keep-alive
X-RateLimit-Limit: 2
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 58
Server: APISIX web server
```

When you make a third request within the same 60-second period, the server will reject it with a `503 Service Temporarily Unavailable` response. Even in case of rejection, the rate limit headers are returned:

```http
HTTP/1.1 503 Service Temporarily Unavailable
Content-Type: text/html
Content-Length: 194
Connection: keep-alive
X-RateLimit-Limit: 2
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 58
Server: APISIX web server
```

Additionally, you can customize the rejection response by setting the `rejected_msg` attribute. For instance:

```http
HTTP/1.1 503 Service Temporarily Unavailable
Content-Type: text/html
Content-Length: 194
Connection: keep-alive
X-RateLimit-Limit: 2
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 58
Server: APISIX web server

{"error_msg": "Requests are too frequent, please try again later."}
```

### Disable plugin

Toggle the **Enable** button to disable the plugin or delete the plugin JSON configuration from your route configuration.
