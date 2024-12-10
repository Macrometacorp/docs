---
title: traffic-split
---

This plugin allows you to dynamically assign portions of traffic to different upstream services. It does this by configuring `match`, which are custom rules for directing traffic to `weighted_upstreams`.

## Attributes

| **Name**                       | **Type**       | **Required** | **Default** | **Valid values**            | **Description**                                                                                                                                                                                                                                                                               |
|--------------------------------|----------------|--------------|-------------|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| rules.match                    | array[object]  | False        |             |                             | Rules to match for conditional traffic split. By default the list is empty and the traffic will be split unconditionally.                                                                                                                                                                     |
| rules.match.vars               | array[array]   | False        |             |                             | List of variables to match for filtering requests for conditional traffic split. It is in the format {variable operator value}. For example, {"arg_name", "==", "json"}. The variables here are consistent with NGINX internal variables. For details on supported operators, lua-resty-expr. |
| rules.weighted_upstreams       | array[object]  | False        |             |                             | List of Upstream configurations.                                                                                                                                                                                                                                                              |
| weighted_upstreams.upstream_id | string/integer | False        |             |                             | ID of the configured Upstream object.                                                                                                                                                                                                                                                         |
| weighted_upstreams.upstream    | object         | False        |             |                             | Configuration of the Upstream.                                                                                                                                                                                                                                                                |
| upstream.type                  | enum           | False        | roundrobin  | [roundrobin, chash]         | Type of mechanism to use for traffic splitting. roundobin supports weighted load and chash does consistent hashing.                                                                                                                                                                           |
| upstream.hash_on               | enum           | False        | vars        |                             | Only valid if the type is chash. Supported vars (Nginx variables), header (custom header), cookie, consumer, and vars_combinations. For more details, refer Upstream.                                                                                                                         |
| upstream.key                   | string         | False        |             |                             | Only valid if the type is chash. Finds the corresponding node id according to hash_on and key values. For more details, refer Upstream.                                                                                                                                                       |
| upstream.nodes                 | object         | False        |             |                             | IP addresses (with optional ports) of the Upstream nodes represented as a hash table. In the hash table, the key is the IP address and the value is the weight of the node. Setting weight to 0 means that a request is never forwarded to that node.                                         |
| upstream.timeout               | object         | False        | 15          |                             | Timeout in seconds for connecting, sending and receiving messages.                                                                                                                                                                                                                            |
| upstream.pass_host             | enum           | False        | "pass"      | ["pass", "node", "rewrite"] | Configures the host when the request is forwarded to the upstream. Can be one of pass, node or rewrite. pass- transparently passes the client's host to the Upstream. node- uses the host configured in the node of the Upstream. rewrite- Uses the value configured in upstream_host.        |
| upstream.name                  | string         | False        |             |                             | Identifier for the Upstream for specifying service name, usage scenarios etc.                                                                                                                                                                                                                 |
| upstream.upstream_host         | string         | False        |             |                             | Host of the Upstream request. Only valid when pass_host attribute is set to rewrite.                                                                                                                                                                                                          |
| weighted_upstreams.weight      | integer        | False        | weight = 1  |                             | Weight to give to each Upstream node for splitting traffic.                                                                                                                                                                                                                                   |

## Enable plugin

You can enable this plugin when configuring a route or by following these steps:

1. Navigate to **Plugins** on the Stargate dashboard.
2. Click **Enable** on the `traffic-split` card from the **Traffic** section. This opens the plugin editor.
3. Toggle the **Enable** button to enable the plugin. Configure your plugin by specifying your attribute value.
4. Click **Submit**

## Sample `traffic-split` plugin use cases

### Canary Release

A canary release involves gradually deploying a new version by routing an increasing percentage of traffic to it. Eventually, all traffic is directed to the new version.

To implement a canary release, configure the weight attribute in the weighted_upstreams section as shown below:

```bash
curl https://adrsearche-us-east.photoniq.macrometa.io:9080/api/stargate/v1/routes \
-H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/index.html",
    "plugins": {
        "traffic-split": {
            "rules": [
                {
                    "weighted_upstreams": [
                        {
                            "upstream": {
                                "name": "upstream_A",
                                "type": "roundrobin",
                                "nodes": {
                                    "127.0.0.1:1981":10
                                },
                                "timeout": {
                                    "connect": 30,
                                    "send": 15,
                                    "read": 15
                                }
                            },
                            "weight": 3
                        },
                        {
                            "weight": 2
                        }
                    ]
                }
            ]
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

This configuration sets the weights at a ratio of 4:1, meaning:

- 80% of traffic is routed to the upstream service running on 127.0.0.1:1981 (the plugin’s upstream).
- 20% of traffic is routed to the upstream service running on 127.0.0.1:1980 (the route’s upstream).

## Testing the Configuration

After setting up the configuration, you can test it by making multiple requests. For instance, if you send 5 requests, 4 will hit the service at :1981 and 1 will hit the service at :1980:

```bash

curl http://127.0.0.1:9080/index.html -i
```

### Sample responses

1. Request routed to :1980:

```bash
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
...
hello 1980
```

2. Request routed to :1981:

```bash
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
...
world 1981
```

This demonstrates the weighted traffic distribution in action.