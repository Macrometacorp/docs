---
title: Caching
sidebar_label: Caching
---

Serving concurrent API responses, especially for high-traffic endpoints usually results in the following:

- **Increased latency:**  in latency, which increases loading times and bounce rates for your API consumers.
- **Reduced performance:** A lag in performance which reduces user experience.
- **Server overload:** More requests on the origin server increases server load, thus increasing resource consumption and overall costs. 

This calls for a need for caching, to help store high-traffic endpoints to serve frequently accessed content to improve page loading times and reduce overall load on servers. 

This tutorial offers a guide on using the plugins available for caching your APIs on the Stargate API gateway.

## Cache plugins

Stargate offers numerous plugins for you to help build a robust caching strategy for your different business use cases. These include:

- `graphql-cache`: This plugin efficiently caches graphql responses for better latency and performance.
- `distributed-cache`: This plugin selects and implements a caching strategy caches content based on configured rules.

## Next steps

Learn more about these plugins and how to enable them for improving your web and app APIs performance. 