---
title: limit-req
---

This plugin uses the leaky bucket algorithm to limit the number of requests to you service.

### Attributes

| **Name**              | **Type** | **Required**                          | **Default**         | **Valid values**                                                  | **Description**                                                                                                                                                                                                 |
|-----------------------|----------|---------------------------------------|---------------------|-------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `rate`                | integer  | Yes                                   |                     | rate > 0                                                          | Threshold for number or requests allowed per second allowed.                                                                                                                                                                             |
| `burst`               | integer  | Yes                                   |                     | burst >= 0                                                        | Number of additional requests allowed to be delayed per second                                                                                                                                                                |
| `key_type`            | string   | No                                    | "var"               | ["var", "var_combination"]                                        | User-specified key type                                                                                                                                                                                         |
| `key`                 | string   | No                                    | "remote_addr"       |                                                                   | User-specified key for the request limiting                                                                                                                                                                     |
| `rejected_code`       | string   | No                                    | 503                 | [200, ..., 599]                                                   | HTTP status code returned when request limit is exceeded                                                                                                                                                        |
| `rejected_msg`        | string   | No                                    |                     |                                                                   | Response body returned when request limit is exceeded                                                                                                                                                           |
| `policy`              | string   | No                                    | "local"             | ["local", "redis", "redis-cluster"]                               | Limit used for retrieving and limiting the rate count. `local` value stored count values in memory on the node while setting to 'redis' stores counters in a Redis server and shares these values across nodes. |
| `nodelay`             | boolean  | No                                    | false               | No delays for requests withing the burst threshold if set to true |                                                                                                                                                                                                                 |
| `allow_degradation`   | boolean  | No                                    | false               | [true, false]                                                     | When set to true, allows plugin degradation if plugin becomes temporarily unavailable, thus allowing more requests.                                                                                             |
| `group`               | string   | No                                    |                     |                                                                   | Group to share the counter with                                                                                                                                                                                 |
| `redis_host`          | string   | Required if policy is 'redis'         |                     |                                                                   | Address of Redis server                                                                                                                                                                                         |
| `redis_port`          | integer  | No                                    | 6379                | [1,...]                                                           | Port of Redis server                                                                                                                                                                                            |
| `redis_username`      | string   | No                                    |                     |                                                                   | Username for Redis authentication.                                                                                                                                                                              |
| `redis_password`      | string   | No                                    |                     |                                                                   | Password for Redis authentication                                                                                                                                                                               |
| `redis_ssl`           | boolean  | No                                    |                     |                                                                   | Set to true, uses SSL to connect to Redis instance                                                                                                                                                              |
| `redis_ssl_verify`    | boolean  | No                                    |                     |                                                                   | Set to true, verifies the validity of the SSL certificate.                                                                                                                                                      |
| `redis_database`      | integer  | No                                    | redis_database >= 0 | redis_database >= 0                                               | Selected database of the Redis server.                                                                                                                                                                          |
| `redis_timeout`       | integer  | No                                    |                     | [1,...]                                                           | Time in milliseconds for commands submitted to the Redis server.                                                                                                                                                |
| `redis_cluster_nodes` | array    | required when policy is redis-cluster |                     |                                                                   | Addresses of Redis cluster nodes                                                                                                                                                                                |
| `redis_cluster_name`  | string   | required when policy is redis-cluster |                     |                                                                   | Name of Redis cluster nodes                                                                                                                                                                                     |
|                       |          |                                       |                     |                                                                   |                                                                                                                                                                                                                 |

### Enable plugin

```c
curl https://adrsearche-us-east.photoniq.macrometa.io:9080/api/stargate/v1/routes -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "methods": ["GET"],
    "uri": "/index.html",
    "plugins": {
        "limit-req": {
            "rate": 8,
            "burst": 2,
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

You can set the `key_type` to `var_combination`

```c
curl https://adrsearche-us-east.photoniq.macrometa.io:9080/api/stargate/v1/routes -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "methods": ["GET"],
    "uri": "/index.html",
    "plugins": {
        "limit-req": {
            "rate": 8,
            "burst": 2,
            "rejected_code": 503,
            "key_type": "var_combination",
            "key": "$remote_addr"
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

### Disable plugin

Toggle the **Enable** button to disable the plugin or delete the plugin JSON configuration from your route configuration.
