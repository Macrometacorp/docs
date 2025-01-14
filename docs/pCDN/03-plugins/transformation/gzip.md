---
title: gzip
---

This plugin dynamically sets the behaviour of gzip in Nginx and requires the client to include Accept-Encoding: gzip in the request header to indicate support for gzip compression when enabled. 

Stargate examines the the support and server configuration upon receiving a client request and appends the the `Content-Encoding: gzip header` to the response, indicating that the response content has been compressed using gzip. Upon receiving the response, the client uses the corresponding decompression algorithm based on the `Content-Encoding header` to decompress the response content and obtain the original response content.

## Attributes

| **Name**         | **Type**             | **Required** | **Default**   | **Valid values** | **Description**                                                                     |
|------------------|----------------------|--------------|---------------|------------------|-------------------------------------------------------------------------------------|
| `types`          | array[string] or "*" | No           | ["text/html"] |                  | Dynamically sets the gzip_types directive. Special value "*" matches any MIME type. |
| `min_length`     | integer              | No           | 20            | >= 1             | Dynamically sets the gzip_min_length directive.                                     |
| `comp_level`     | integer              | No           | 1             | [1, 9]           | Dynamically sets the gzip_comp_level directive.                                     |
| `http_version`   | number               | No           | 1.1           | 1.1, 1.0         | Dynamically sets the gzip_http_version directive.                                   |
| `buffers.number` | integer              | No           | 32            | >= 1             | Dynamically sets the gzip_buffers directive parameter number.                       |
| `buffers.size`   | integer              | No           | 4096          | >= 1             | Dynamically sets the gzip_buffers directive parameter size. The unit is in bytes.   |
| `vary`           | boolean              | No           | false         |                  | Dynamically sets the gzip_vary directive.                                           |

## Enable plugin

```bash
curl -i https://adrsearche-us-east.photoniq.macrometa.io:9080/api/stargate/v1/routes  -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/index.html",
    "plugins": {
        "gzip": {
            "buffers": {
                "number": 8
            }
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

### Using the plugin

```bash
curl http://127.0.0.1:9080/index.html -i -H "Accept-Encoding: gzip"
```

```bash
HTTP/1.1 404 Not Found
Content-Type: text/html; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Date: Wed, 21 Jul 2021 03:52:55 GMT
Server: APISIX/2.7
Content-Encoding: gzip

Warning: Binary output can mess up your terminal. Use "--output -" to tell
Warning: curl to output it to your terminal anyway, or consider "--output
Warning: <FILE>" to save to a file.
```

## Delete plugin

To remove the gzip Plugin, delete the corresponding JSON configuration from the Plugin configuration.
