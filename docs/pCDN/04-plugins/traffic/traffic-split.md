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

### Enable plugin

You can enable this plugin when configuring a route or by following these steps:

1. Navigate to **Plugins** on the Stargate dashboard.
2. Click **Enable** on the `traffic-split` card from the **Traffic** section. This opens the plugin editor.
3. Toggle the **Enable** button to enable the plugin. Configure your plugin by specifying your attribute value.
4. Click **Submit**

### Sample usage

