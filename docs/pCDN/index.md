---
pagination_next: null
pagination_prev: null
sidebar_class_name: hidden
sidebar_label: Private CDN
sidebar_position: 0
title: Private Content Delivery Network
---

Macrometa's private CDN (pCDN) is a highly-distributed API management platform designed to resolve the scalability, reliability, and latency limitations most centralized API management systems face. It does this with the following functionalities:

- **Distributed API handling:** pCDN uses a distributed platform to receive and handle all API traffic, eliminating the single point of failure and improving reliability and latency.
- **Load balancing:** The pCDN distributes and balances incoming traffic load almost evenly across upstream nodes, thus preventing overloading a single server and possible downtime. 
- **Rate limiting and traffic control:** pCDN implements rate-limiting, which allows you to control resource consumption to prevent abuse and unnecessary costs. 
- **Security and authentication:** The platform offers numerous plugins to improve security when handling your APIs. These plugins are also customizable, allowing you to further enhance their effectiveness.
- **Extensibility:** pCDN offers numerous plugins that handle tasks like observability, authentication, traffic handling, and many more, allowing users to extend the service's capabilities to fit their business-specific needs. 

You can [get started by configuring your first route](./01-getting-started/index.md). 

## Benefits of Macrometa pCDN

Apart from the improved scalability, reliability, and latency offered by the pCDN, it also offers the following benefits:

1. **Improved performance**: Geo-replicating and eliminating the single point of failure from accessing your APIs while using custom plugins with functionalities that identify frequently accessed content helps inform your caching strategies. For example, high-traffic endpoints inform on the TTL and can be cached closer to users to reduce latency and improve loading times for users. 

2. **Efficient resource consumption**: The pCDN uses a proxy cache to store hot endpoints, reducing calls to the origin server, conserving network bandwidth, and improving server load and response times.  

3. **Improved observability and monitoring**: pCDN acts as a central hub for managing your network of APIs and employs a combination of logs, metrics, alerting systems, and efficient reporting to observe and visualize the performance of your APIs over time. Insights derived over time help diagnose performance issues and inform future growth strategies. 

4. **Personalized marketing**: Consumer ID used in pCDN for the unique identification of users helps create consumer groups, with each group containing different upstream and plugin configurations. Marketing teams can use these groups to create targeted responses and recommendations that speak to their group-specific needs.

In the next guide, we'll delve deeper into [Getting started with pCDN](./01-getting-started/index.md).