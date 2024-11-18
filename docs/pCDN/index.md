---
pagination_next: null
pagination_prev: null
sidebar_class_name: hidden
sidebar_label: Private CDN
sidebar_position: 0
title: Private Content Delivery Network
---

Macrometa's private CDN (pCDN) is a highly-distributed API management platform designed to resolve the scalability, reliability, and latency limitations most centralized API management systems face. It does this with the following functionalities:

<grid cols={4}>
  <card
    heading="Distributed API handling"
    description="A distributed system to receive and distribute API traffic to improve performance"
    href="/pcdn/getting-started/"
  />
    <card
    heading="Load balancing"
    description="Use upstream nodes to balance API traffic load to prevent server overload."
    href="/pcdn/getting-started/set-up-load-bal/"
  />
    <card
    heading="Rate limiting"
    description="Set API thresholds to control and limit server resource consumption."
    href="/pcdn/getting-started/rate-limiting/"
   />
    <card
    heading="Authentication"
    description="Control access to your APIs with customizable plugins."
    href="/pcdn/plugin/authenticate/"
  />
</grid>


You can [get started by configuring your first route](./01-getting-started/index.md). 

## Benefits of Macrometa pCDN

Apart from the improved scalability, reliability, and latency offered by the pCDN, it also offers the following benefits:

1. **Improved performance**: Geo-replicating and eliminating the single point of failure from accessing your APIs while using custom plugins with functionalities that identify frequently accessed content helps inform your caching strategies. For example, high-traffic endpoints inform on the TTL and can be cached closer to users to reduce latency and improve loading times for users. 

2. **Efficient resource consumption**: The pCDN uses a proxy cache to store hot endpoints, reducing calls to the origin server, conserving network bandwidth, and improving server load and response times.  

3. **Improved observability and monitoring**: pCDN acts as a central hub for managing your network of APIs and employs a combination of logs, metrics, alerting systems, and efficient reporting to observe and visualize the performance of your APIs over time. Insights derived over time help diagnose performance issues and inform future growth strategies. 

4. **Personalized marketing**: Consumer ID used in pCDN for the unique identification of users helps create consumer groups, with each group containing different upstream and plugin configurations. Marketing teams can use these groups to create targeted responses and recommendations that speak to their group-specific needs.

5. **Extensibility:** pCDN offers numerous plugins that handle tasks like observability, authentication, traffic handling, and many more, allowing users to extend the service's capabilities to fit their business-specific needs.

In the next guide, we'll delve deeper into [Getting started with pCDN](./01-getting-started/index.md).