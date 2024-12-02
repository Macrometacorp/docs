---
pagination_next: null
pagination_prev: null
sidebar_class_name: hidden
sidebar_label: Private CDN
sidebar_position: 0
title: Private Content Delivery Network
---

Macrometa's private CDN (pCDN) is a highly-distributed API management platform designed to solve the scalability, reliability, and latency limitations faced by  centralized API management systems.It does this with some of these functionalities:

<grid cols={4}>
  <card
    heading="Distributed API handling"
    description="Receive and redistribute API traffic across edge locations to improve performance"
    href="/pCDN/getting-started/"
  />
    <card
    heading="Load balancing"
    description="Use upstream nodes to balance API traffic load to prevent server overload."
    href="/pCDN/getting-started/"
  />
    <card
    heading="Rate limiting"
    description="Set API thresholds to control and limit server resource consumption."
    href="/pCDN/getting-started/rate-limiting/"
   />
    <card
    heading="Authentication"
    description="Control access to your APIs with customizable plugins."
    href="/pCDN/plugins/"
  />
</grid>


You can [get started by configuring your first route](./01-getting-started/index.md). 

## Benefits of Macrometa pCDN

Apart from improving scalability, reliability, and latency, the pCDN also offers the following benefits:

1. **Improved performance**: pCDN employs geo-replication, thereby eliminating the single point of failure from accessing your APIs. Thus, API consumers access APIs from the region closest to them, reducing latency and improving performance. 

2. **Efficient resource consumption**: The pCDN uses a proxy cache to store content from hot API endpoints, reducing calls to the origin server, conserving network bandwidth, and improving server load and response times.  

3. **Improved observability and monitoring**: pCDN acts as a central hub for managing your network of APIs and employs a combination of logs, metrics, alerting systems, and efficient reporting to observe and visualize the performance of your APIs over time. Insights derived over time help diagnose performance issues and inform future growth strategies. 

4. **Personalized marketing**: Consumer ID, used in pCDN to uniquely identify users, helps create consumer groups, each containing different upstream and plugin configurations. Marketing teams can use these groups to develop targeted responses and recommendations that meet their group-specific needs.

5. **Extensibility:** pCDN offers numerous plugins that handle tasks like observability, authentication, traffic handling, and many more, allowing users to extend the service's capabilities to fit their business-specific needs. For example, its cache plugins help to identify frequently accessed content to inform your caching strategies. For example, evaluating the volume of API traffic and content type can inform the TTL and cache it closer to users to reduce latency and improve user loading times. 

In the next guide, we'll delve deeper into [Getting started with pCDN](./01-getting-started/index.md).