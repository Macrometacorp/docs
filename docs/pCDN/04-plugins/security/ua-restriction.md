---
title: ua-restriction  
---


## Description

The `ua-restriction` Plugin in Stargate enables you to control access to Routes or Services by filtering requests based on the `User-Agent` header. You can define an `allowlist` to permit specific `User-Agent` headers or a `denylist` to block undesired ones.  

A typical use case is restricting web crawlers or bots by denying specific `User-Agent` strings.

---

## Attributes

| Name            | Type          | Required | Default       | Description                                                                                       |
|-----------------|---------------|----------|---------------|---------------------------------------------------------------------------------------------------|
| `bypass_missing`| boolean       | False    | `false`       | If `true`, bypasses checks when the `User-Agent` header is missing.                              |
| `allowlist`     | array[string] | False    |               | A list of allowed `User-Agent` headers.                                                          |
| `denylist`      | array[string] | False    |               | A list of denied `User-Agent` headers.                                                           |
| `message`       | string        | False    | "Not allowed" | Custom message included in the response when access is denied.                                   |

:::note  
`allowlist` and `denylist` cannot be configured simultaneously. Use only one to avoid conflicts.  
:::

---

## Enable Plugin

To enable the `ua-restriction` Plugin on a specific Route or Service, follow these steps:

### Step 1: Retrieve the Admin Key  
Extract the `admin_key` from `config.yaml` and save it as an environment variable:

```bash
admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/"//g')
```

### Step 2: Configure the Plugin  
Enable the Plugin on a Route and specify the desired restrictions:

```bash
curl http://127.0.0.1:9180/api/stargate/v1/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/index.html",
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    },
    "plugins": {
        "ua-restriction": {
             "bypass_missing": true,
             "denylist": [
                 "my-bot2",
                 "(Twitterspider)/(\\d+)\\.(\\d+)"
             ],
             "message": "Do you want to do something bad?"
        }
    }
}'
```

---

## Example Usage

### Case 1: Request Without `User-Agent` Header  
When `bypass_missing` is set to `true`, requests without the `User-Agent` header will bypass restrictions and succeed:

```bash
curl http://127.0.0.1:9080/index.html -i
```

```bash
HTTP/1.1 200 OK
...
```

### Case 2: Request With Denied `User-Agent`  
If the `User-Agent` header matches an entry in the `denylist` (e.g., `Twitterspider/2.0`), access is denied:

```bash
curl http://127.0.0.1:9080/index.html --header 'User-Agent: Twitterspider/2.0'
```

```bash
HTTP/1.1 403 Forbidden
...
{"message":"Do you want to do something bad?"}
```

---

## Delete Plugin

To remove the `ua-restriction` Plugin, delete its configuration from the Route or Service. Stargate automatically reloads changes without requiring a restart:

```bash
curl http://127.0.0.1:9180/api/stargate/v1/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/index.html",
    "plugins": {},
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
}'
```
