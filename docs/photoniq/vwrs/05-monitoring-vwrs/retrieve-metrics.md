---
title: Retrieve Sample Metrics
---

## Get Metrics

VWRs offers different endpoint for retrieving your waiting room metrics:

- [Get Metrics for a Domain](https://www.macrometa.com/docs/apiVwrs#/operations/getMetrics) - Retrieve the metrics for a specific domain. Set start and end times to get metrics for a specific time period. To get the domain key, use the [Get Information for All Domains](https://www.macrometa.com/docs/apiVwrs#/operations/getDomainUsingQueryParams) endpoint.
- [Get All Metrics](https://www.macrometa.com/docs/apiVwrs#/operations/filterMetricsByDate) - Retrieve metrics for all domains. Set start and end times to get metrics for a specific time period.


## Example Response

Below is a sample response: 

```json
[
  {
    "_key": "www.example1.com:2023-08-21_07:50:00",
    "avg_waiting_time": 0,
    "domain_key": "www.example1.com",
    "duplicate_request_rate": 100,
    "peak_queue_length": 100,
    "queue_abandonment_rate": 0,
    "request_success_rate": 100,
     "usage_requests": 6000,
    "timestamp": 1692604200
  },
  {
    "_key": "www.example2.com:2023-08-21_07:50:00",
    "avg_waiting_time": 0,
    "domain_key": "www.example2.com",
    "duplicate_request_rate": 0,
    "peak_queue_length": 200,
    "queue_abandonment_rate": 0,
    "request_success_rate": 100,
     "usage_requests": 18000,
    "timestamp": 1692604200
  },
  {
    "_key": "www.example3.com:2023-08-21_07:50:00",
    "avg_waiting_time": 0,
    "domain_key": "www.example3.com",
    "duplicate_request_rate": 0,
    "origin_key": "origin-example3.com",
    "peak_queue_length": 200,
    "queue_abandonment_rate": 0,
    "request_success_rate": 100,
     "usage_requests": 30000,
    "timestamp": 1692604200
  }
]
```
