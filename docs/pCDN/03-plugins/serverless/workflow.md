---
title: Workflow
---

This plugin introduces the `lua-resty-expr` for performing complex traffic control tasks on your APIs.

## Attributes

| **Name**      | **Type**      | **Required** | **Default** | **Valid values** | **Description**                                                                                                                                                                                                                       |
|---------------|---------------|--------------|-------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| rules.case    | array[array]  | No           |             |                  | Variable list to match for filtering requests for conditional traffic split. It is in the format {variable operator value}. For example, {"arg_name", "==", "json"}. The variables here are consistent with NGINX internal variables. |
| rules.actions | array[object] | True         |             |                  | The action to be performed after matching successfully. Currently, only one element is supported in actions. The first child element of the actions' only element can be return or limit-count.                                       |

### `actions` Attributes

- **return**

| **Name**            | **Type** | **Required** | **Default** | **Valid values** | **Description**                          |
|---------------------|----------|--------------|-------------|------------------|------------------------------------------|
| actions[1].return   | string   | No        |             |                  | Return directly to the client.           |
| actions[1].[2].code | integer  | No        |             |                  | HTTP status code returned to the client. |

- **limit-count**

| **Name**               | **Type** | **Required** | **Default** | **Valid values** | **Description**                                           |
|------------------------|----------|--------------|-------------|------------------|-----------------------------------------------------------|
| actions[1].limit-count | string   | No           |             |                  | Execute the functions of the limit-count plugin.          |
| actions[1].[2]         | object   | No           |             |                  | limit-count plugin configuration, group is not supported. |

:::note
Match `case` in order according to the index of the `rules`, and execute `actions` directly if `case` match.
:::

## Enable plugin

```bash
curl https://adrsearche-us-east.photoniq.macrometa.io:9080/api/stargate/v1/routes \
-H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri":"/hello/*",
    "plugins":{
        "workflow":{
            "rules":[
                {
                    "case":[
                        ["uri", "==", "/hello/pants"]
                    ],
                    "actions":[
                        [
                            "return",
                            {"code": 403}
                        ]
                    ]
                },
                {
                    "case":[
                        ["uri", "==", "/hello/v1/app"]
                    ],
                    "actions":[
                        [
                            "limit-count",
                            {
                                "count":2,
                                "time_window":30,
                                "rejected_code":429
                            }
                        ]
                    ]
                }
            ]
        }
    },
    "upstream":{
        "type":"roundrobin",
        "nodes":{
            "127.0.0.1:1980":1
        }
    }
}'
```

This example route configuration enables the workflow plugin and creates two rules:

- Case 1: First rule returns a 403 status code if the requested uri is /hello/pants.

```bash
curl http://127.0.0.1:9080/hello/pants -i
HTTP/1.1 403 Forbidden
......

{"error_msg":"rejected by workflow"}
```

- Case 2: if the request uri is /hello/v1/app, the workflow plugin executes the limit-count plugin

```bash
curl http://127.0.0.1:9080/hello/v1/app -i
HTTP/1.1 200 OK
curl http://127.0.0.1:9080/hello/v1/app -i
HTTP/1.1 200 OK
curl http://127.0.0.1:9080/hello/v1/app -i
HTTP/1.1 429 Too Many Requests
```