---
title: referer-restriction  
---


## Description

The `referer-restriction` Plugin restricts access to Services or Routes by applying rules to the `Referer` request header. You can define rules using whitelists or blacklists of hostnames, with optional support for wildcards.

## Attributes

| Name           | Type          | Required | Default                           | Description                                                                                       |
|----------------|---------------|----------|-----------------------------------|---------------------------------------------------------------------------------------------------|
| `whitelist`    | array[string] | False    |                                   | List of hostnames to allow. Wildcards are supported with `*`.                                    |
| `blacklist`    | array[string] | False    |                                   | List of hostnames to deny. Wildcards are supported with `*`.                                     |
| `message`      | string        | False    | "Your referer host is not allowed" | Custom message returned when access is denied.                                                  |
| `bypass_missing` | boolean     | False    | `false`                           | If `true`, skips checks when the `Referer` header is missing or malformed.                      |

:::info IMPORTANT  
Only one of `whitelist` or `blacklist` must be specified. These attributes cannot be used together.  
:::

---

## Enable Plugin

You can enable the `referer-restriction` Plugin for a specific Route or Service. The example below demonstrates enabling it for a Route.

### Step 1: Retrieve the Admin Key
To manage the configuration, retrieve the `admin_key` from the `config.yaml` file and save it as an environment variable:

```bash
admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/"//g')
```

### Step 2: Configure the Plugin
Enable the Plugin with a whitelist and set `bypass_missing` to `true`:

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
        "referer-restriction": {
            "bypass_missing": true,
            "whitelist": [
                "xx.com",
                "*.xx.com"
            ]
        }
    }
}'
```

---

## Example Usage

### Case 1: Request from Whitelisted Referer  
A request with a `Referer` header matching the whitelist (e.g., `http://xx.com/x`) is allowed:

```bash
curl http://127.0.0.1:9080/index.html -H 'Referer: http://xx.com/x'
```

```bash
HTTP/1.1 200 OK
...
```

### Case 2: Request from Non-Whitelisted Referer  
A request with a `Referer` header not in the whitelist (e.g., `http://yy.com/x`) is denied:

```bash
curl http://127.0.0.1:9080/index.html -H 'Referer: http://yy.com/x'
```

```bash
HTTP/1.1 403 Forbidden
...
{"message":"Your referer host is not allowed"}
```

### Case 3: Request Without Referer Header  
Since `bypass_missing` is set to `true`, a request without the `Referer` header is allowed:

```bash
curl http://127.0.0.1:9080/index.html
```

```bash
HTTP/1.1 200 OK
...
```

---

## Delete Plugin

To remove the `referer-restriction` Plugin from a Route, delete its configuration. Stargate automatically reloads changes without requiring a restart:

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
