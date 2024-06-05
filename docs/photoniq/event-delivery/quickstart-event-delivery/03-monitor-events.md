---
title: Monitor Event Delivery Metrics
---

EDS offers numerous metrics for monitoring and evaluating the health status of your event service. Some of these [metrics](../event-delivery-metrics.md) include:
- `es_cpu_usage_second`
- `es_errors_per_second`
- `es_memory_usage_second`


## Get Health Status of EDS
Performing a health status check on your EDS requires making an API call to the EDS API with a `curl` command. A sample health check API request looks like this:

```curl -X GET 'url/api/es/v1/health'```

Replace url with your gdn URL. For example, the following request:

```curl -X GET 'https://url/api/es/v1/health'```

**returns**:
```json
{"status":"up"}
```
