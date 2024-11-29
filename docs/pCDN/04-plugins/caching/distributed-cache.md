---
title: Distributed cache
sidebar_label: distributed-cache
---

This plugin stores frequently accessed data in-memory for faster data and API access, thus improving page loading times and performance. It uses its content rules, which allows you to specify important cache details like size threshold, pattern, and the TTL. This caching method plays a vital role in preventing unnecessary loading of databases for better resource consumption. 

## Schema

| **Property**  | **Type** | **Default**      | **Description**                                   |
|---------------|----------|------------------|---------------------------------------------------|
| `cache_strategy` | String  | Replicated storage   | Cache storage method |
| `cache_zone`  | String   | `disk_cache_one` | The cache zone usually mapped to an object store. |
| `cache_ttl` | Integer  | `900` (15 min)   | Time-to-live (TTL) for cache entries, in seconds. |
| `pattern`  | String   | `/*.html` | Content regex pattern to cache |
| `size_threshold` | Integer  | `900` (15 min)   | Maximum size of content. |
| `type`  | String   | `file/json` | Content type. |

## Sample configuration

```json
{
  "_meta": {
    "disable": false
  },
  "cache_strategy": "replicated_storage",
  "cache_zone": "disk_cache_one",
  "content_rules": [
    {
      "pattern": "/*.json",
      "size_threshold": 15000,
      "cache_ttl": 70000,
      "type": "file/json"
    }
  ]
}
```

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
5. Toggle the **Enable** button to disable the plugin. 