---
sidebar_position: 1
title: Dynamic Prerendering
---

The PhotonIQ Dynamic Prerendering service is an innovative solution that generates static HTML pages from dynamic websites or web applications. This process, known as prerendering, is particularly useful for improving the search engine optimization (SEO) of websites that rely heavily on JavaScript.

Dynamic Prerendering is a white glove, fully-managed service. Macrometa engineers work with you to implement and optimize it for you within 30 days.

### How It Works

Dynamic Prerendering works by running a full version of a web browser, such as Chrome, in a server environment. This browser loads the entire web application, including executing all JavaScript, just like a user's browser would. Once the JavaScript has finished executing, the prerendering service takes a snapshot of the resulting HTML and serves this static version to the client.

## Features

Key capabilities of Dynamic Prerendering include:

### Customization and Content Delivery

- **Two Prerendering Strategies**: Choose between two distinct prerendering methods to enhance SEO and performance. Opt for a fully prerendered site that's ready for search engine bots or render pages on-demand based on bot visits. Select the approach that aligns best with your performance needs and traffic patterns.

- **Device Type Management**: Ensure an optimized user experience with device-specific prerendering. Dynamic Prerendering delivers static mobile pages to mobile browser bots and static desktop pages to desktop browser bots. This enables a seamless experience across multiple devices.

- **Custom Headers**: Gain control over prerendering behavior with custom HTTP headers. Specify which pages should be prerendered based on unique attributes. For example, target only English-language pages for prerendering, allowing you to focus on a specific user base.

- **Synthetic Events**: Address content visibility issues arising from user interactions like scroll, click, or hover. Synthetic events can trigger this hidden content, ensuring it is included in the prerendered page. This ensures that all essential content is accessible to search engine bots, even if it normally requires user interaction to appear.

- **Public Access Not Required**: Extend prerendering capabilities to non-publicly accessible sites. Whether you're working on a staging environment or a restricted development site, Macrometa engineers can assist in setting up prerendering without requiring public access.

### Performance

- **Caching**: Boost speed by storing results from resource-intensive operations or retaining static resources for immediate retrieval.
- **Load Balancing**: Evenly distribute incoming traffic across multiple servers. This balance ensures no single server gets overburdened, promoting consistent application reliability.
- **Scalability**: Tailored for large-scale prerendering challenges. The service uses a distributed compute strategy, potentially running numerous instances in a given region to manage high-traffic demands.

### Reliability and Security

- **Fault Tolerance and Resiliency**: Built to address server or network disruptions. In the event of network issues, the service opts to serve older, reliable data over rejecting the request.
- **Rate Limiting**: Implement limits on client request frequency to deter misuse and ensure everyone gets a fair share of the resources.
- **Authorization**: Access and configuration of the prerender service require proper user authorization.

### Monitoring and Management

- **Fully Managed**: Dynamic Prerendering is a white glove, fully-managed service.
- **Metrics and Monitoring**: Track performance indicators like request counts, cache metrics, and latency. Regularly send telemetry data and logs to monitoring platforms for proactive management.
- **Audit Events**: Maintain transparency by logging events when configurations are created, updated, or deleted.
- **Deployer and Deployment Pipelines**: Streamline the integration and delivery workflow, ensuring updates are rolled out efficiently and safely.
