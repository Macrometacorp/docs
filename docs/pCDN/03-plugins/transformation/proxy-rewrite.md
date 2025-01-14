---
title: proxy-rewrite
---

This plugin rewrites upstream plugin information like `scheme`, `uri` and `host`.

## Attributes

| **Name**                      | **Type**      | **Required** | **Default** | **Valid values**                                                                                                                       | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|-------------------------------|---------------|--------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `uri`                         | string        | No           |             |                                                                                                                                        | New Upstream forwarding address. Value supports Nginx variables. For example, $arg_name.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `method`                      | string        | No           |             | ["GET", "POST", "PUT", "HEAD", "DELETE", "OPTIONS","MKCOL", "COPY", "MOVE", "PROPFIND", "PROPFIND","LOCK", "UNLOCK", "PATCH", "TRACE"] | Rewrites the HTTP method.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `regex_uri`                   | array[string] | No           |             |                                                                                                                                        | Regular expressions used to match the URL from client. A match forwards the URL template to the upstream. Otherwise, the URL from the client is forwarded. The uri has a higher priority when both uri and regex_uri are configured. Multiple regular expressions are currently supported for pattern matching, and the plugin will try to match them one by one until they succeed or all fail. For example: ["^/iresty/(. *)/(. *)/(. *)", "/$1-$2-$3", ^/theothers/(. *)/(. *)", "/theothers/$1-$2"], the element with the odd index represents the uri regular expression that matches the request from the client, and the element with the even index represents the uri template that is forwarded upstream upon a successful match. Please note that the length of this value must be an even number. |
| `host`                        | string        | No           |             |                                                                                                                                        | New Upstream host address.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `headers`                     | object        | No           |             |                                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `headers.add`                 | object        | No           |             |                                                                                                                                        | Append the new headers using the {"name": "value",...} format. The values in the header can contain Nginx variables like $remote_addr and $balancer_ip. It also supports referencing the match result of regex_uri as a variable like $1-$2-$3.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `headers.set`                 | object        | No           |             |                                                                                                                                        | Overwrite the headers. If the header does not exist, it will be added. The format is {"name": "value", ...}. The values in the header can contain Nginx variables like $remote_addr and $balancer_ip. It also supports referencing the match result of regex_uri as a variable like $1-$2-$3. Note that if you would like to set the Host header, use the host attribute instead.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `headers.remove`              | array         | No           |             |                                                                                                                                        | Remove the headers. The format is ["name", ...].                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `use_real_request_uri_unsafe` | boolean       | No           | false       |                                                                                                                                        | Use real_request_uri (original $request_uri in nginx) to bypass URI normalization. Enabling this is considered unsafe as it bypasses all URI normalization steps.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

## Header priority

Header configurations are executed according to the following priorities:

`add` > `remove` > `set`

## Enable Plugin

Follow the example below to enable the proxy-rewrite plugin on a specific Route:

```bash

curl https://adrsearche-us-east.photoniq.macrometa.io:9080/api/stargate/v1/routes  -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "methods": ["GET"],
    "uri": "/test/index.html",
    "plugins": {
        "proxy-rewrite": {
            "uri": "/test/home.html",
            "host": "tekl.com",
            "headers": {
               "set": {
                    "X-Api-Version": "v1",
                    "X-Api-Engine": "apisix",
                    "X-Api-useless": ""
                },
                "add": {
                    "X-Request-ID": "429287"
                },
                "remove":[
                    "X-test"
                ]
            }
        }
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:80": 1
        }
    }
}'
```

### Example usage

Once you have enabled the Plugin as mentioned below, you can test the Route:

```bash
curl -X GET http://127.0.0.1:9080/test/index.html
```

After sending the request, check the Upstream access.log for its output:

```bash

127.0.0.1 - [26/Sep/2019:10:52:20 +0800] iresty.com GET /test/home.html HTTP/1.1 200 38 - curl/7.29.0 - 0.000 199 107
```

## Delete Plugin

Delete the corresponding JSON configuration from the Plugin configuration to disable the `proxy-rewrite` plugin. You can also disable by toggling the Enable button on the Stargate GUI. 

```bash

curl https://adrsearche-us-east.photoniq.macrometa.io:9080/api/stargate/v1/routes  -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "methods": ["GET"],
    "uri": "/test/index.html",
    "plugins": {},
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:80": 1
        }
    }
}'
```