---
sidebar_position: 100
title: Get RLS Metrics
---

Macrometa PhotonIQ Virtual Waiting Rooms (VWRs) has built-in metrics that allow you to retrieve waiting room telemetry per waiting room, per minute. Data is stored for the past 90 days.

Using VWRs metrics, you can:

- Evaluate peak traffic flow through your waiting room and onto your site.
- Determine how long users spent in the waiting room.
- Use analytics to help calibrate your waiting room settings.

## Get Metrics

You can retrieve metrics using the following endpoints:

- [Get Metrics for a Domain](https://www.macrometa.com/docs/apiVwrs#/operations/getMetrics) - Retrieve the metrics for a specific domain. Set start and end times to get metrics for a specific time period. To get the domain key, use the [Get Information for All Domains](https://www.macrometa.com/docs/apiVwrs#/operations/getDomainUsingQueryParams) endpoint.
- [Get All Metrics](https://www.macrometa.com/docs/apiVwrs#/operations/filterMetricsByDate) - Retrieve metrics for all domains. Set start and end times to get metrics for a specific time period.

## Available Metrics

The metrics response body includes the following properties:

- **avg_waiting_time**: The average time users spend in the virtual waiting room before being granted access to the origin service (in milliseconds).
- **domain_key**: The domain key.
- **duplicate_request_rate**: The percentage of duplicate requests detected and managed by the virtual waiting room service.
- **origin_key**: The origin key.
- **peak_queue_length**: The highest number of users in the queue during a specific period.
- **queue_abandonment_rate**: The percentage of users who leave the virtual waiting room without accessing the origin service.
- **request_success_rate**: The percentage of requests to the origin service that are successfully processed after users leave the virtual waiting room.
- **timestamp**: The epoch time of the start interval when the metric was generated (in seconds).

## Example Response

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
