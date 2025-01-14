---
title: ip-restriction  
---


The `ip-restriction` Plugin allows you to restrict access to a Service or a Route by either whitelisting or blacklisting IP addresses.

Single IPs, multiple IPs, or even IP ranges in CIDR notation like `10.10.10.0/24` can be used.

## Attributes

| Name      | Type          | Required | Default                         | Valid values | Description                                                 |
|-----------|---------------|----------|---------------------------------|--------------|-------------------------------------------------------------|
| whitelist | array[string] | False    |                                 |              | List of IPs or CIDR ranges to whitelist.                    |
| blacklist | array[string] | False    |                                 |              | List of IPs or CIDR ranges to blacklist.                    |
| message   | string        | False    | "Your IP address is not allowed" | [1, 1024]    | Message returned when the IP address is not allowed access. |

:::note

Either one of the `whitelist` or `blacklist` attributes must be specified. They cannot be used together.

:::

## Enable Plugin

You can enable the Plugin on a Route or a Service as shown below:

:::note
You can fetch the `admin_key` from `config.yaml` and save it to an environment variable with the following command:

```bash
admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/"//g')
```

:::

```shell
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
        "ip-restriction": {
            "whitelist": [
                "127.0.0.1",
                "113.74.26.106/24"
            ]
        }
    }
}'
```

To return a custom message when an IP address is not allowed access, configure it in the Plugin as shown below:

```json
"plugins": {
    "ip-restriction": {
        "whitelist": [
            "127.0.0.1",
            "113.74.26.106/24"
        ],
        "message": "Do you want to do something bad?"
    }
}
```

## Example usage

After you have configured the Plugin as shown above, when you make a request from the IP `127.0.0.1`:

```shell
curl http://127.0.0.1:9080/index.html -i
```

```shell
HTTP/1.1 200 OK
...
```

But if you make requests from `127.0.0.2`:

```shell
curl http://127.0.0.1:9080/index.html -i --interface 127.0.0.2
```

```shell
HTTP/1.1 403 Forbidden
...
{"message":"Your IP address is not allowed"}
```

To change the whitelisted/blacklisted IPs, you can update the Plugin configuration. The changes are hot-reloaded, so there is no need to restart the service.

```shell
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
        "ip-restriction": {
            "whitelist": [
                "127.0.0.2",
                "113.74.26.106/24"
            ]
        }
    }
}'
```

## Delete Plugin

To remove the `ip-restriction` Plugin, delete the corresponding JSON configuration from the Plugin configuration. Stargate will automatically reload, and you do not have to restart for this to take effect.

```shell
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
