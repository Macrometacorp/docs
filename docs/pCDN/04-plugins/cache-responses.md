---
title: Caching
---

Serving concurrent API responses, especially for high-traffic endpoints usually results in the following:

- **Increased latency:**  in latency, which increases loading times and bounce rates for your API consumers.
- **Reduced performance:** A lag in performance which reduces user experience.
- **Server overload:** More requests on the origin server increases server load, thus increasing resource consumption and overall costs. 

This calls for a need for caching, to help store high-traffic endpoints to serve frequently accessed content to improve page loading times and reduce overall load on servers. 

This tutorial offers a guide on using the plugins available for caching your APIs on the Stargate API gateway.

## Cache plugins

Stargate offers numerous plugins for you to help build a robust caching strategy for your different business use cases. These include:

- `graphql-cache`: This plugin efficiently caches graphql responses for better latency and performance.
- `distributed-cache`: This plugin selects and implements a caching strategy caches content based on configured rules.

## Configuring the `distributed-cache` plugin

To configure this plugin:

1. Navigate to **Plugins** on the Stargate dashboard.
1. Click **Enable** on the `distributed-cache` card. This opens the plugin editor.
1. Toggle the **Enable** button to enable the plugin. The `distributed-cache` plugin editor contains the following configurable fields:

    - **Type**: This allows you to select the configuration method. The plugin editor allows you to configure fields in JSON or YAML or as a form. 
    - **Cache Zone**: This specifies the cache zone
    - **Cache Strategy**: Select a cache strategy.
    - **Content rule**: Content rules allows you to specify a pattern, size threshold, ttl, and type.
    ![content rules](/img/pcdn/content-rules.png)
    For example, setting a content rule that matches html content with a max size of 30mb, with a TTL of 80000 seconds. Thus every content that falls into this group will follow the caching strategy specified. You can create multiple rules when using this plugin.
4. Click **Submit**

## Configuring the `graphql-cache` plugin

