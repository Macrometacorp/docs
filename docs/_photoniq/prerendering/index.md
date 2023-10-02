---
sidebar_position: 1
title: Dynamic Prerendering
---

The PhotonIQ Dynamic Prerendering service is an innovative solution that generates static HTML pages from dynamic websites or web applications. This process, known as prerendering, is particularly useful for improving the search engine optimization (SEO) of websites that rely heavily on JavaScript.

### How It Works

Dynamic Prerendering works by running a full version of a web browser, such as Chrome, in a server environment. This browser loads the entire web application, including executing all JavaScript, just like a user's browser would. Once the JavaScript has finished executing, the prerendering service takes a snapshot of the resulting HTML and serves this static version to the client.

## Features

Key capabilities of Dynamic Prerendering include:

### Performance

- **Caching**: Boost speed by storing results from resource-intensive operations or retaining static resources for immediate retrieval.
- **Load Balancing**: Evenly distribute incoming traffic across multiple servers. This balance ensures no single server gets overburdened, promoting consistent application reliability.
- **Scalability**: Tailored for large-scale prerendering challenges. The service uses a distributed compute strategy, potentially running numerous instances in a given region to manage high-traffic demands.

### Reliability and Security

- **Fault Tolerance and Resiliency**: Built to address server or network disruptions. In the event of network issues, the service opts to serve older, reliable data over rejecting the request.
- **Rate Limiting**: Implement limits on client request frequency to deter misuse and ensure everyone gets a fair share of the resources.
- **Authorization**: Access and configuration of the prerender service require proper user authorization.

### Monitoring and Management

- **Metrics and Monitoring**: Track performance indicators like request counts, cache metrics, and latency. Regularly send telemetry data and logs to monitoring platforms for proactive management.
- **Audit Events**: Maintain transparency by logging events when configurations are created, updated, or deleted.
- **Deployer and Deployment Pipelines**: Streamline the integration and delivery workflow, ensuring updates are rolled out efficiently and safely.
