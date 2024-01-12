---
sidebar_position: 30
title: Configure a Domain
---

You can configure a domain with the [Create a Domain REST API](https://www.macrometa.com/docs/apiVwrs#/operations/createDomain). Use this API to define and configure the behavior of the waiting room.

## Domain Definition Fields

The following required fields define a domain (waiting room):

- **domain_key**: The unique key of the domain.
- **domain_url**: The URL that the waiting room needs to sit in front of. All subpaths of this URL are sent to this defined waiting room. For example, `/checkout/path1` and `/checkout/path2` are both sent to the `/checkout` waiting room.
- **access_type**: The access type defines how the rate limit should be calculated. Different options include:
  - **users**:
    - The metric service counts the number of unique user requests every second. These are identified by a request ID stored in the encrypted cookie (`vwrs-session`).
    - A rolling history of unique user requests is kept for 60 seconds.
    - **Rate Calculation Example**: If the metric service indicates 480 unique users in the last 60 seconds, then the rate is 8 unique users per second.
  
  - **users_per_period**:
    - Behaves the same as the `users` access type, except the `rate_limit` is divided over the defined period.
    - **Rate Calculation Example**: If the maximum rate is 100 for 5 seconds, then the rate is 20 users per second.
  
  - **rps**:
    - The metric service counts the number of requests to the origin server per second (RPS).
    - **Rate Calculation Example**: If the maximum number of requests allowed is 20 and 13 POST requests are detected, then 7 more requests are released from the waiting room.
  
- **period**: Must be set if the `access_type` is `users_per_period`.
  - Defines the time (in seconds) for rate calculation.
  - Must be a number greater than zero.

- **rate_limit**: The rate at which traffic should be diverted to the waiting room.
  - Must be a number greater than zero.
  - **Note**: For `access_type` of `users` and `rps`, this is the maximum request rate. For `users_per_period`, the maximum rate is calculated using the active rate divided by the period.

## Domain Behavior Fields

The following optional fields define the behavior of the waiting room:

- **queue_type:**: Defines how requests should be removed from the waiting room. The three possible queue types are `fifo`, `random`, and `lottery`. If this is not set, then the default queue is `fifo`.
- **queue_enablement**: You can configure the waiting room to be enabled dynamically. When set to `auto`, the waiting room is enabled after reaching the defined `rate_limit` for a specific `metric_interval`. If set to `manual`, then the waiting room is always enabled.
- **origin_key**: Every domain is associated with an origin that was created with the Create Origin REST API, POST `/api/vwr/v1/origins/{origin_id}`.
- **metric_interval**: The time (in seconds) to enable and disable the waiting room. It represents how long the traffic must be at or above the rate limit before being directed to the waiting room.
- **access_duration**: The time (in seconds) that users can access the origin after being granted access. After this period, users are forwarded to the waiting room again.
- **status_interval**: Defined in seconds, this interval determines how often the waiting room HTML page is updated with information like the request's position, estimated waiting time, and the maximum number of requests in the waiting room.
- **waiting_room_path**: The cloud origin (such as NetStorage) path for a domain that stores the HTML for the waiting room. The path should be a fully qualified path like `/{upload-directory-id}/path`.
- **priority**: An array of priorities, where the highest priority corresponds to the lowest number.
