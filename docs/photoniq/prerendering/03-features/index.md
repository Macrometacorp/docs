---
title: Features
---

Prerender offers numerous features that promote SEO and website performance while ensuring reliability and fault-tolerance.

## Customization and Seamless Content Delivery

- **[Two Prerender Strategies](../04-prerendering-strategies/index.md)**: Choose from two distinct Prerender strategies to enhance SEO and performance. Opt for a fully prerendered site ready for search engine bots or render pages on-demand based on bot visits. Select the approach that best aligns with your performance needs and traffic patterns.
- **Device Type Management**: Ensure an optimized user experience with device-specific rendering. Prerender delivers static mobile pages to mobile browser bots and static desktop pages to desktop browser bots, enabling a seamless experience across multiple devices.
- **[Customizable Headers](./02-prerendering-headers/index.md)**: Gain control over rendering behavior with customizable headers. These headers guide how Prerender renders pages to bots, for example, the [pass-through header](./02-prerendering-headers/passthrough-headers.md) offers language customization via its `Accept-Language` headers, allowing you to focus on a specific user base.
- **[Synthetic interactions](./01-synthetic-interactions/index.md)**: Address content visibility issues by simulating user interactions like scroll, click, or hover. Synthetic interactions mimic and render hidden content from interactions like scroll and hover, ensuring their visibility in the prerendered page. This visibility ensures search engine bots' accessibility to essential content, even for those requiring user interaction.
- **Easy, safe and accessible implementation**: Extend prerender capabilities to non-publicly accessible sites. From a staging environment to a restricted development site, Macrometa engineers are available to configure prerender for different access levels.
- **Link Previews**: Enhance social media visibility with integrated Open Graph tags in prerendered pages. This feature ensures that link previews on social media platforms display the intended image, title, and description, optimizing engagement and click-through rates. By including relevant Open Graph tags, PhotonIQ's Prerender service makes content more shareable and visually appealing on social media, improving your brand's online presence.

## Performance

- **Geo-replicated Caching**: Boost speed and availability by storing results from resource-intensive operations or retaining static resources for immediate retrieval, reducing server resource consumption.
- **Load Balancing**: Evenly distribute incoming traffic across multiple servers. This balance ensures that no single server gets overburdened, promoting consistent application reliability.
- **Scalability**: The service caters to large-scale Prerender challenges and uses a distributed compute strategy, potentially running numerous instances in a region to manage high-traffic demands.
- **Improved Connection Management:** The Sync service consolidates multiple Prerender service connections into a single WebSocket connection before connecting to the GDN, reducing network overhead and improving performance.

## Reliability and Security

- **Fault Tolerance and Resiliency**: During network issues, the service serves older, reliable data over rejecting the request, ensuring continuous availability. Furthermore, the Sync service ensures Prerender services remain operational even if the GDN encounters issues, maintaining service availability and reliability.
- **Rate Limiting**: Implement limits on client request frequency to deter misuse and ensure proper allocation of resources to various departments.
- **Authorization**: Accessing and configuring the Prerender service requires proper user authorization with the Auth service. The Auth service enforces role based access control, ensuring users only access what's required to perform their tasks. 

## Monitoring and Management

- **Fully Managed**: PhotonIQ Prerender is a white-glove, fully managed service that allows your engineers to focus on other important engineering tasks.
- **[Metrics and Monitoring](../06-monitor-prerendering/index.md)**: Track and evaluate performance indicators like request counts, cache metrics, and latency. Regularly send telemetry data and logs to monitoring platforms for proactive management.
- **Audit Events**: Establish a trail of configuration events to maintain audit transparency.
- **Deployer and Deployment Pipelines**: Streamline the integration and delivery workflow, ensuring efficient and safe rolling updates.
