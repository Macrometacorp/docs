---
title: Rate Limiting
---

As an API gateway, pCDN acts as the central host to all incoming and outgoing traffic from client requests. However, this traffic may also contain unwanted requests generated by web crawlers from malicious cyberware, as seen in a DDoS attack, which causes service downtime. 

pCDN uses the limit-count plugin to limit the number of API requests sent to the upstream addresses within a given time.

## Prerequisites

Ensure to have your login details and a [route configured](index.md) to proceed.

## Setting a rate-limit

You can set a rate-limit in two ways:

- Route configuration: When configuring your route, [you can enable the `limit-count` plugin in the third step](index.md#step-1-configuring-a-route).
- Enabling the plugin from the dashboard and add to your route configuration.

1. Navigate to **Plugins** from your Stargate dashboard
1. Click **Traffic control** and click **Enable** from the limit-count card
![limit-count](/img/pcdn/limit-count.png)
This opens the Plugin editor.
![limit-count](/img/pcdn/plugin-editor.png)
 - You can toggle to enable/disable the limit-count plugin
 - Enter the required fields like the count and time_window to configure the rate limits.
Alternatively, you can configure the `limit-count` plugin in JSON or YAML format.
3. Click **Submit**

## Test rate limiting

We set our limit-count to 4requests per 30seconds. This configuration limits the incoming requests to a maximum of 4 requests within 30 seconds.To test this:

- Generate 10 simultaneous requests.

Of the 10 requests, only 4 return a successful 200 status code while the other 6 returns the errors status code(503)