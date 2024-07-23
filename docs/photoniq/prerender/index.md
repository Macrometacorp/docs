---
sidebar_position: 1
title: Prerender
---

PhotonIQ Prerender offers a no-code,  robust solution for enhancing SEO and website performance for enterprise-level companies. This service generates static HTML from dynamic sites, ensuring the complete rendering of web elements like tabs and scrolls, improving search engine visibility and indexing speed, making it ideal for JavaScript-heavy websites. 

As a no-code, scalable solution, Prerender integrates seamlessly with existing Javascript web frameworks, improving speed and agility during implementation. It also caters to the needs of marketing and web teams in large enterprises, boosting organic traffic, enhancing user experience, and providing a competitive advantage by saving time and resources. 
Furthermore, Prerender offers geo-replicated caching for fast, global web page delivery with current SEO and analytics.

Macrometa offers Prerender as a fully managed service, implementing and optimizing the solution within 30 days. However, for a more practical introduction, you can get started with the service by [setting up your origin](./02-get-started/index.md)

## Key Features of Prerender

### Customization and Seamless Content Delivery

- **Two Prerender Strategies**: Choose between two distinct prerender methods to enhance SEO and performance. Opt for a fully prerendered site that's ready for search engine bots or render pages on-demand based on bot visits. Select the approach that aligns best with your performance needs and traffic patterns.
- **Device Type Management**: Ensure an optimized user experience with device-specific rendering. Prerender delivers static mobile pages to mobile browser bots and static desktop pages to desktop browser bots. This enables a seamless experience across multiple devices.
- **Customizable Headers**: Gain control over prerendering behavior with [customizable headers](./03-features/02-prerendering-headers/index.md). These headers guide how prerender renders pages to bots, for example, the [pass-through header](./03-features/02-prerendering-headers/passthrough-headers.md) offers language customization via its `Accept-Language` headers, allowing you to focus on a specific user base.
- **Synthetic Interactions**: Address content visibility issues arising from user interactions like scroll, click, or hover. [Synthetic interactions](./03-features/01-synthetic-interactions/01-implementing-interaction/index.md) mimic and render hidden content from interactions like scroll and hover, ensuring their visibility in the prerendered page. This visibility ensures accessibility to essential content by search engine bots, even for those requiring user interaction.
- **Easy, safe and accessible implementation**: Extend prerender capabilities to non-publicly accessible sites. From staging environment to a restricted development site, Macrometa engineers are available for configuring prerender for different levels of access.
- **Link Previews**: Enhance social media visibility with integrated Open Graph tags in prerendered pages. This feature ensures that link previews on social media platforms display the intended image, title, and description, optimizing engagement and click-through rates. By including relevant Open Graph tags, PhotonIQ's prerender service makes content more shareable and visually appealing on social media, improving your brand's online presence.

### Performance

- **Geo-replicated Caching**: Boost speed and availability by storing results from resource-intensive operations or retaining static resources for immediate retrieval, reducing consumption of server resources.
- **Load Balancing**: Evenly distribute incoming traffic across multiple servers. This balance ensures no single server gets overburdened, promoting consistent application reliability.
- **Scalability**: Tailored for large-scale prerender challenges. The service uses a distributed compute strategy, potentially running numerous instances in a given region to manage high-traffic demands.

### Reliability and Security

- **Fault Tolerance and Resiliency**: In the event of network issues, the service serves older, reliable data over rejecting the request, ensuring continuous availability.
- **Rate Limiting**: Implement limits on client request frequency to deter misuse and ensure proper allocation of resources to various departments.
- **Authorization**: Accessing and configuring the prerender service requires proper user authorization from Macrometa to proceed.

### Monitoring and Management

- **Fully Managed**: PhotonIQ Prerender is a white glove, fully-managed service, allowing your engineers to focus on other important engineering tasks.
- **Metrics and Monitoring**: Track and evaluate performance indicators like request counts, cache metrics, and latency. Regularly send telemetry data and logs to monitoring platforms for proactive management.
- **Audit Events**: Establish a trail of configuration events to maintain transparency for audits.
- **Deployer and Deployment Pipelines**: Streamline the integration and delivery workflow, ensuring rolling updates are efficient and safe.


## Benefits of PhotonIQ Prerendering

PhotonIQ Prerender provides a comprehensive suite of features and advantages, essential for enhancing website performance and SEO for small and large businesses. By implementing this service, businesses experience a significant improvement in their SEO performance, boosting their online presence and user engagement. Here are some other key benefits:

- **Advanced Page Rendering:** Prerender synthetic interactions mimics and renders live user interactions like tabs, scrolls, and hidden content  for a fully-rendered page. These interactions ensure that all aspects of a web page are visible and indexable by search engines.
- **Improved Website Performance:** Prerender stores its rendered pages in a cache and delivers it globally or regionally via a CDN, causing faster page load times and a consistent user experience across different geographical regions.
- **Optimized Crawl Budget Utilization:** With a hydration time of P90 or 50 ms, PhotonIQ makes the most of your crawl budget, allowing search engines to index more pages and more relevant content.
- **Framework Agnostic, No-Code Solution:** This fully managed service easily integrates with various frameworks, requiring no code changes, making it versatile and easy to implement.
- **Faster Page Indexing:** Accelerates the process of getting web pages indexed by search engines.
- **Turnkey Implementation:** Offers a straightforward and less complicated setup process, facilitating quicker adoption and integration.

By leveraging these benefits, PhotonIQ Prerender improves website visibility and performance, while also managing and optimizing web content for search engines and users alike.
