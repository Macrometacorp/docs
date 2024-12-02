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

### Enable plugin

1, Navigate to **Plugins** on the Stargate dashboard.
2. Click **Enable** on the `limit-count` card from the **Traffic** section. This opens the plugin editor.
3. Toggle the **Enable** button to enable the plugin. Configure your plugin by specifying your attribute value.
4. Click **Submit**

### Sample usage

```json
{
  "count": 2000,
  "time_window": 10,
  "key_type": "var",
  "rejected_code": 503,
  "policy": "local",
  "allow_degradation": false,
  "show_limit_quota_header": true
}
```


### Disable plugin

Toggle the **Enable** button to disable the plugin or delete the plugin schema configuration from your route configuration.
