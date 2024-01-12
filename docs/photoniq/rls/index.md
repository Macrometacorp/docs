---
sidebar_position: 1
title: Rate Limiting
---

Macrometa's PhotonIQ Ratelimiting service (RLS) is an advanced rate-limiting service used to control the rate at which users can make requests to a
given service. The primary purpose is to prevent the overuse of resources, ensure fair use among multiple users or services, and protect the system
from abuse, such as denial-of-service attacks.

## Benefits of Rate Limiter

### Request Thresholds

Rate limiting entails establishing a cap on the allowable number of requests within a specified time frame. For example, a service may permit a maximum of 100 requests per user per minute.

### Resource Protection

By limiting the number of requests, rate limiting helps to ensure that system resources like bandwidth, database connections, or compute power are not overwhelmed by too many simultaneous requests.

### Fair Usage

It ensures fair resource usage among all users or services accessing the system. Without rate limiting, a few heavy users could consume all available resources, leading to service degradation for others.

### Abuse Prevention

Rate limiting is an essential tool in preventing malicious activities such as brute-force attacks, where an attacker makes a large number of requests in an attempt to guess a password or find a vulnerability.

### Response Strategies

When a rate limit is exceeded, the service may respond with an HTTP 429 "Too Many Requests" status code or, in the case of internal systems, with a custom response indicating that the rate limit has been hit.

## Key Features

Key capabilities of RLS include:

### Flexible Rule Definition

Allow defining rate limiting rules using various HTTP request characteristics (URI, HTTP method, headers, cookies, query
string fields).

### Dynamic Request Counting

Support counting requests based on various characteristics, including IP, country, header, cookie, AS Number (ASN),
query parameter values, or bot fingerprints.

### Comprehensive Action Choices

Offer multiple actions when thresholds are exceeded, such as block, challenge (e.g., CAPTCHA), or log actions.

### Burst and Quote Controls

Implement both burst and quota controls, allowing the service to handle sudden spikes in requests and enforce long-term request quotas.

### Wildcard Support for URI patterns

Support wildcards in URI patterns for more flexible rule applications.

### Advanced Rate Limiting

- **Session-Based Rate Limiting:** Enable rate limiting based on session identifiers like cookies, headers (e.g., x-api-key), or query values.
- **Tiered Rate Limiting:** Enable creating tiered rules to handle persistent threats or repeat offenders with escalating responses.
  **Dynamic Scalability and Response-Based Limiting:** The ability to scale rate limiting dynamically and use origin response headers to set rate limits.
- **Flexible Rule Behavior (Fixed Action vs. Throttle):** Allow choosing between fixed action (blocking all requests for some time) and
  throttle behavior (selectively dropping requests).
- **Regulated Site Access:** Manages post-queue access to the site, depending on user engagement and duration of visit.
- **Time-Based Access Control:** Sets limits for uninterrupted access post-queue and re-queueing protocols after inactivity, balancing server load and user access.

### Rate Limit Analytics

Provide analytics to suggest appropriate rate-limiting thresholds and analyze traffic patterns.
