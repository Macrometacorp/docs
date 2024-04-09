---
sidebar_position: 45
title: P3 Metrics
---

PhotonIQ Performance Proxy (P3) offers a comprehensive suite of metrics designed to provide insights into no of requests coming in, no of optimized pages and no of optimized requests. It also provides an insight into how much time it takes for P3 to analyze and validate the optimizations before applying to it. It also tells us that how requests have failed and how many are successful . 

These metrics collectively give you a detailed view of the operational efficiency, performance impact, and optimization success of P3, enabling technical teams to make informed decisions and continuously refine their web performance strategies. This page provides a detailed list of key metrics provided by P3.

## Pages vs. Requests

In order to understand P3 metrics, you need to understand the difference between _pages_ and _requests_.

- A _page_ is a single URL that contains HTML.
- A _request_ is when a user (bot or human) requests to view the page.

Consider the following scenario:

- Pages A, B, and C are optimized.
- Each page has ten users visit it.

In this case, the metrics would show three (3) pages and 30 requests.

## Requests Metrics

- **Requests Count (1hr, 1d, 1m)**: The total number of requests processed by P3 over the past hour, day, and month, respectively.
- **Request Errors Count (1hr, 1d, 1m)**: The number of requests that resulted in errors when requesting the content from the origin the past hour, day, and month.
- **Requests Optimized Count (1hr, 1d, 1m)**: Counts the requests that were successfully optimized by P3 in the last hour, day, and month.
- **Requests Unoptimized Count (1hr, 1d, 1m)**: The count of requests that were not optimized over the past hour, day, and month, providing insights into potential areas for improvement.

## Optimizer Metrics

- **Pages Optimized**: Total pages that have been successfully optimized, indicating the scope and impact of P3's optimization efforts.
- **Pages Failed to Optimize**: The number of pages that could not be optimized, highlighting challenges or limitations faced during the optimization process.
- **Average Optimization Time (seconds)**: The average time taken to optimize a page, measured in seconds. This metric helps in evaluating the efficiency of the optimization process.
- **Average Validation Time (seconds)**: The average time spent validating the optimizations applied to ensure the page doesn't visually break and to ensure the optimizations doesn't break the functionality of the page.
- **Average Analyzer Time (seconds)**: The average time taken by the Offline Analyzer to assess and formulate optimization strategies for the incoming URL which matches the configured URL pattern in policy
- **Passthrough Pages**: The number of unique pages that pass through P3 without being configured for optimization.
- **Passthrough Requests**: The count of requests for pages that are not configured for P3 optimization but still pass through P3.
- **Optimized Pages**: The total number of pages that have been successfully optimized by P3.
- **Optimized Requests**: Counts the requests for pages that P3 has optimized.
- **Unoptimized Pages**: The number of pages that are not optimized or cannot be optimized at the time of analysis by P3.
- **Unoptimized Requests**: The count of requests for pages that are not optimized or cannot be optimized at the moment by P3.
