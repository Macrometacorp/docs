---
sidebar_position: 30
title: P3 Metrics
---

PhotonIQ Performance Proxy (P3) offers a comprehensive suite of metrics designed to provide insights into no of requests coming in, no of optimized pages and no of optimized requests. It also provides an insight into how much time it takes for P3 to analyze and validate the optimizations before applying to it. It also tells us that how requests have failed and how many are successful . 

These metrics collectively give you a detailed view of the operational efficiency, performance impact, and optimization success of P3, enabling technical teams to make informed decisions and continuously refine their web performance strategies. This page provides a detailed list of key metrics provided by P3.

## Requests Metrics

- **Requests Count (1hr, 1d, 1m)**: The total number of requests processed by P3 over the past hour, day, and month, respectively.
- **Request Errors Count (1hr, 1d, 1m)**: The number of requests that resulted in errors when requesting the content from the origin the past hour, day, and month.
- **Requests Optimized Count (1hr, 1d, 1m)**: Counts the requests that were successfully optimized by P3 in the last hour, day, and month.
- **Requests Unoptimized Count (1hr, 1d, 1m)**: The count of requests that were not optimized over the past hour, day, and month, providing insights into potential areas for improvement.

## Optimizer Metrics

- **Pages Optimized**: Total pages that have been successfully optimized, indicating the scope and impact of P3's optimization efforts.
- **Pages Failed to Optimize**: The number of pages that could not be optimized, highlighting challenges or limitations faced during the optimization process.
- **Average Optimization Time (seconds)**: The average time taken to optimize a page, measured in seconds. This metric helps in evaluating the efficiency of the optimization process.
- **Average Validation Time (seconds)**: Average time spent validating the optimizations applied to ensure the page doesn't visually break and to ensure the optimizations doesn't break the functionality of the page 
- **Average Analyzer Time (seconds)**: Reflects the average time taken by the Offline Analyzer to assess and formulate optimization strategies for the incoming URL which matches the configured URL pattern in policy
