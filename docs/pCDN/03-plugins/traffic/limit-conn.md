---
title: limit-conn
---

This plugin prevents downtime and slow API responses by limiting the number of concurrent requests to your service. 

## Attributes

| **Name**                 | **Type** | **Required** | **Default** | **Valid values**           | **Description**                                                                                                                             |
|--------------------------|----------|--------------|-------------|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `conn`                   | string   | Yes          |             | `conn` > 0                 | Maximum number of concurrent requests allowed. All requests exceeding this value and falling below the 'con + burst' value will be rejected |
| `burst`                  | string   | Yes          |             | `burst` >= 0               | Number of additional concurrent requests allowed to be delayed per second                                                                   |
| `default_conn_delay`     | number   | Yes          |             | `default_conn_delay` > 0   | Delay in seconds required to process the `conn` and `conn + burst` requests.                                                                |
| `only_use_default_delay` | boolean  | No           | false       | [true, false]              | Setting this to true uses the delay `default_conn_delay` without any other calculations.                                                    |
| `key_type`               | string   | No           | "var"       | ["var", "var_combination"] | User-specified key type                                                                                                                     |
| `key`                    | string   | Yes          |             |                            | User-specified key for the request limiting                                                                                                 |
| `rejected_code`          | string   | No           | 503         | [200, ..., 599]            | HTTP status code returned when request limit is exceeded                                                                                    |
| `rejected_msg`           | string   | No           |             |                            | Response body returned when request limit is exceeded                                                                                       |
| `allow_degradation`      | boolean  | No           | false       | [true, false]              | When set to true, allows plugin degradation if plugin becomes temporarily unavailable, thus allowing more requests.                         |

## Enable plugin

To enable the `limit-conn` plugin:

1. Navigate to **Plugins** on the Stargate dashboard.
2. Click **Enable** on the `limit-conn` card from the **Traffic** section. This opens the plugin editor.
3. Toggle the **Enable** button to enable the plugin. Configure your plugin by specifying your attribute value.
4. Click **Submit**

### Sample usage

Here's a sample schema for this plugin:

```c
curl https://adrsearche-us-east.photoniq.macrometa.io:9080/api/stargate/v1/routes \
-H "X-API-KEY: $admin_key" -X PUT -d '
{
    "methods": ["GET"],
    "uri": "/index.html",
    "plugins": {
        "limit-conn": {
            "conn": 1000,
            "burst": 100,
            "default_conn_delay": 10,
            "only_use_default_delay": false,
            "key_type": "var",
            "key": "consumer_name",
            "rejected_code": 503,
            "rejected_msg": "Request limt exceeded/",
            "allow_degradation": false
        }
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
}'

```

The following plugin config allows a maximum of 1000 concurrent requests, while delaying a maximum of 100 additional requests. Any requests exceeding this 1,100 value will return the `Request limit exceeded` response. 


### Disable plugin

Toggle the **Enable** button to disable the plugin or delete the plugin schema configuration from your route configuration.

