---
sidebar_position: 100
title: Get VWRs Metrics
---

## Overview

Macrometa PhotonIQ Virtual Waiting Rooms (VWRs) has built-in metrics that allow you to retrieve waiting room telemetry per waiting room, per minute. This data has a shelf life of 90days. 

VWRs metrics allow you to:

- Evaluate peak traffic flow through your waiting room and onto your site.
- Determine how long users spent in the waiting room.
- Use analytics to assess and adjust your waiting room settings.


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

