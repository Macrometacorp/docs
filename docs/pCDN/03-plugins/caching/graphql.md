---
title: GraphQL cache
sidebar_label: graphql-cache
---

This plugin normalizes and caches frequently requested graphql query responses to prevent overloading the server and offers additional benefits like:

- Distributed caching for improved scalability and reliability of web applications
- TTL-based cache expiration and automatic cleanup to ensure freshness of content. 
- Metrics for observation and monitoring

## Schema

| **Property**  | **Type** | **Default**      | **Description**                                   |
|---------------|----------|------------------|---------------------------------------------------|
| `ttl_seconds` | integer  | `900` (15 min)   | Time-to-live (TTL) for cache entries, in seconds. |
| `cache_zone`  | String   | `disk_cache_one` | The cache zone usually mapped to an object store. |

## Configuring the `graphql-cache` plugin

1. Navigate to **Plugins** on the Stargate dashboard.
2. Click **Enable** on the `graphql-cache` card. This opens the plugin editor.
3. Toggle the **Enable** button to enable the plugin. Configure your plugin by specifying rules for the cache. Here is a sample schema:

```json
{
  "plugins": {
    “graphql-parser”: {},
    "graphql-cache": {
      "ttl_seconds": 3600,
      "cache_zone": "graphql-cache"
    }
  }
}
```

4. Click **Submit**
