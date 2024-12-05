---
title: uri-blocker  
---


The `uri-blocker` Plugin is used to intercept and block requests that match specific URI patterns defined in `block_rules`. It allows you to secure Routes or Services by rejecting unwanted requests based on custom rules.


## Attributes

| Name             | Type          | Required | Default | Valid values | Description                                                                                                                                                                                           |
|------------------|---------------|----------|---------|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `block_rules`    | array[string] | True     |         |              | A list of regex rules to match against request URIs. If a match is found, the request is terminated with the specified `rejected_code`. For example: `["root.exe", "root.m+"]`.                       |
| `rejected_code`  | integer       | False    | 403     | [200, ...]   | HTTP status code returned when the request matches any `block_rules`.                                                                                                                                |
| `rejected_msg`   | string        | False    |         | non-empty    | Custom message to include in the HTTP response body when a request is blocked.                                                                                                                       |
| `case_insensitive` | boolean     | False    | false   |              | If `true`, the match is case-insensitive.                                                                                                                                                             |



## Enable Plugin

The example below demonstrates how to enable the `uri-blocker` Plugin on a specific Route:

### Step 1: Retrieve the Admin Key
Fetch the `admin_key` from `config.yaml` and store it as an environment variable:

```bash
admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/"//g')
```

### Step 2: Configure the Plugin
Enable the `uri-blocker` Plugin with a set of block rules:

```bash
curl -i http://127.0.0.1:9180/api/stargate/v1/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/*",
    "plugins": {
        "uri-blocker": {
            "block_rules": ["root.exe", "root.m+"]
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



## Example Usage

Once configured, requests matching the specified `block_rules` will be blocked.

### Case 1: Request Matching a Block Rule  
If the requested URI matches one of the `block_rules` (e.g., `root.exe`), the request is rejected:

```bash
curl -i http://127.0.0.1:9080/root.exe?a=a
```

```bash
HTTP/1.1 403 Forbidden
Date: Wed, 17 Jun 2020 13:55:41 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 150
Connection: keep-alive
Server: Stargate web server

... ...
```

### Case 2: Custom Rejection Message  
If `rejected_msg` is specified in the configuration, it will appear in the response body:

```json
{
    "plugins": {
        "uri-blocker": {
            "block_rules": ["root.exe", "root.m+"],
            "rejected_msg": "Access is not allowed"
        }
    }
}
```

The response:

```bash
HTTP/1.1 403 Forbidden
Date: Wed, 17 Jun 2020 13:55:41 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 150
Connection: keep-alive
Server: Stargate web server

{"error_msg":"Access is not allowed"}
```



## Delete Plugin

To disable the `uri-blocker` Plugin, remove its configuration from the Route. Stargate will automatically reload the changes without requiring a restart:

```bash
curl http://127.0.0.1:9180/api/stargate/v1/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/*",
    "plugins": {},
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
}'
```
