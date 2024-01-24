---
sidebar_position: 1
title: Prerendering
---

PhotonIQ Prerendering offers a robust solution for enhancing SEO and website performance for enterprise-level companies. This service generates static HTML from dynamic sites, ideal for JavaScript-heavy websites. It ensures complete rendering of web elements like tabs and scrolls, improving search engine visibility and indexing speed. Key features include geo-replicated caching for fast, global web page delivery with current SEO and analytics.

As a no-code, scalable solution, Prerendering integrates seamlessly with existing web frameworks, catering to the needs of marketing and web teams in large enterprises. It boosts organic traffic, enhances user experience, and provides a competitive advantage by saving time and resources. Macrometa offers a fully managed service, implementing and optimizing the solution within 30 days.

### How It Works

Prerendering works by running a full version of a web browser, such as Chrome, in a server environment. This browser loads the entire web application, including executing all JavaScript, just like a user's browser would. Once the JavaScript has finished executing, the prerendering service takes a snapshot of the resulting HTML and serves this static version to the client.

For a more detailed explanation, refer to [How Prerendering Works](how-prerender-works.md).

## Features

Key capabilities of Prerendering include:

### Customization and Content Delivery

- **Two Prerendering Strategies**: Choose between two distinct prerendering methods to enhance SEO and performance. Opt for a fully prerendered site that's ready for search engine bots or render pages on-demand based on bot visits. Select the approach that aligns best with your performance needs and traffic patterns.

- **Device Type Management**: Ensure an optimized user experience with device-specific prerendering. Prerendering delivers static mobile pages to mobile browser bots and static desktop pages to desktop browser bots. This enables a seamless experience across multiple devices.

- **Customizable Headers**: Gain control over prerendering behavior with customizable passthrough, allowlist, and cache-control headers. Specify which pages should be prerendered based on unique attributes. For example, target only English-language pages for prerendering, allowing you to focus on a specific user base. For more information, refer to [Headers in Prerendering](prerendering-headers/index.md).

- **Synthetic Interactions**: Address content visibility issues arising from user interactions like scroll, click, or hover. Synthetic interactions can trigger this hidden content, ensuring it is included in the prerendered page. This ensures that all essential content is accessible to search engine bots, even if it normally requires user interaction to appear. For more information, refer to [Synthetic Interactions in Prerendering](./synthetic-interactions/index.md).

- **Public Access Not Required**: Extend prerendering capabilities to non-publicly accessible sites. Whether you're working on a staging environment or a restricted development site, Macrometa engineers can assist in setting up prerendering without requiring public access.

### Performance

- **Caching**: Boost speed by storing results from resource-intensive operations or retaining static resources for immediate retrieval.
- **Load Balancing**: Evenly distribute incoming traffic across multiple servers. This balance ensures no single server gets overburdened, promoting consistent application reliability.
- **Scalability**: Tailored for large-scale prerendering challenges. The service uses a distributed compute strategy, potentially running numerous instances in a given region to manage high-traffic demands.

### Reliability and Security

- **Fault Tolerance and Resiliency**: Built to address server or network disruptions. In the event of network issues, the service opts to serve older, reliable data over rejecting the request.
- **Rate Limiting**: Implement limits on client request frequency to deter misuse and ensure everyone gets a fair share of the resources.
- **Authorization**: Access and configuration of the prerendering service require proper user authorization.

### Monitoring and Management

- **Fully Managed**: Prerendering is a white glove, fully-managed service.
- **Metrics and Monitoring**: Track performance indicators like request counts, cache metrics, and latency. Regularly send telemetry data and logs to monitoring platforms for proactive management.
- **Audit Events**: Maintain transparency by logging events when configurations are created, updated, or deleted.
- **Deployer and Deployment Pipelines**: Streamline the integration and delivery workflow, ensuring updates are rolled out efficiently and safely.
