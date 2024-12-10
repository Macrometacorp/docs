---
title: Serverless
---

There are two serverless plugins available on our gateway service:

- `serverless-pre-function`: This plugin runs at the start of a specified phase.
- `serverless-post-function`: This plugin runs at the ending of a specified phase.

## Attributes

| **Name**  | **Type**      | **Required** | **Default** | **Valid values**                                                             | **Description**                                                      |
|-----------|---------------|--------------|-------------|------------------------------------------------------------------------------|------------------------------------------------------------------|
| phase     | string        | No        | ["access"]  | ["rewrite", "access", "header_filter", "body_filter", "log", "before_proxy"] | Phase before or after which the serverless function is executed. |
| functions | array[string] | Yes         |             |                                                                              | Functions list executed sequentially.                |

## Enable the plugin

```bash
curl https://adrsearche-us-east.photoniq.macrometa.io:9080/api/stargate/v1/routes  -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/index.html",
    "plugins": {
        "serverless-pre-function": {
            "phase": "rewrite",
            "functions" : ["return function() ngx.log(ngx.ERR, \"serverless pre function\"); end"]
        },
        "serverless-post-function": {
            "phase": "rewrite",
            "functions" : ["return function(conf, ctx) ngx.log(ngx.ERR, \"match uri \", ctx.curr_req_matched and ctx.curr_req_matched._path); end"]
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

After configuring the plugin, you can make a request as shown below:

```bash
curl -i http://127.0.0.1:9080/index.html
```

You will find a message "serverless pre-function" and "match uri /index.html" in the error.log.

## Delete Plugin

To remove the serverless Plugin, delete the corresponding JSON configuration from the Plugin configuration.