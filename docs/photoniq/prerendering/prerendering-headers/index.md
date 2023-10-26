---
sidebar_position: 20
title: Prerendering Headers
---

# Headers in Dynamic Prerendering

Headers in Dynamic Prerendering allow you to tailor the prerendering process to your specific requirements. You can exercise control over prerendering behavior with customizable passthrough, allowlist, and caching control headers. You can specify which pages should be prerendered based on unique attributes, allowing you to focus on a specific user base.

## Passthrough Headers

Passthrough headers facilitate greater flexibility and control during the prerendering process. These headers act as conduits for transmitting specific instructions or preferences from web crawlers to the prerendering service.

### What Are Passthrough Headers?

Passthrough headers allow you to forward certain header values from the bot's request directly to the Dynamic Prerendering service. Unlike default browser settings, which usually take precedence in the absence of these headers, passthrough headers enable a more tailored rendering experience.

### Why Use Passthrough Headers?

- **Language Customization**: One of the most common uses for passthrough headers is language customization via the `Accept-Language` header. If a web crawler prefers content in a certain language, this preference can be passed through, ensuring that the content rendered is in the desired language.
- **User-Agent Information**: Passthrough headers also allow the capture of `User-Agent` information. This is particularly useful for analytics and for serving specialized content based on the type of bot that is crawling your site.
- **Other Preferences**: Other browser or bot-specific settings can also be passed through, providing a rendering experience that is as close as possible to the bot's original request.

### How Do Passthrough Headers Work?

When a bot sends a request to access a web page, it includes specific headers based on its settings or requirements. The Dynamic Prerendering service reads these incoming headers and selectively passes them through during the rendering process. This ensures that any special instructions or requirements from the bot are taken into account, leading to a more accurate and customized rendering.

## Caching Control Headers

Caching control headers offer a layer of control over the caching behavior in Dynamic Prerendering, particularly when different versions of a web page need to be served to bots. These headers determine how and when the rendered pages are stored in the cache, which impacts how bots interact with your site.

### What Are Caching Control Headers?

Caching control headers influence how the Dynamic Prerendering service caches rendered pages. These headers are used to manage page versions based on attributes like language, user-agent, or any other criteria that is significant for your web content.

### Why Use Caching Control Headers?

- **Multi-Language Support**: If your website supports multiple languages, then caching control headers can help manage how each version is cached. By considering the `Accept-Language` header, for instance, you can ensure that French, English, and Spanish versions of your site are cached separately.
- **Content Variability**: If your site offers content that varies based on specific conditions or attributes, then these headers help maintain distinct cache entries for each variant.
- **Optimized Bot Interaction**: Properly managed caching ensures that bots can access the most appropriate version of your content, making your site more bot-friendly and improving SEO.

### How Do Caching Control Headers Work?

Caching control headers come into play after a page is rendered by Dynamic Prerendering. These headers are used to create cache keys, which are unique identifiers that help store and retrieve the rendered page from the cache. When a bot sends a request that matches a particular cache key, the corresponding cached page is served, reducing latency and improving the bot's crawling efficiency.

## Allowlist-Based Header Value

Allowlist-based header values help confirm the legitimacy of requests coming from the Dynamic Prerendering service to your origin server, ensuring both security and integrity.

### What Are Allowlist-Based Header Values?

Allowlist-based header values are custom headers that act as a security mechanism during the prerendering process. They allow you to validate that incoming requests to your origin server are legitimate and are indeed coming from the Dynamic Prerendering service.

### Why Use Allowlist-Based Header Values?

- **Security Measures**: These header values are primarily used as a security measure to protect against potential threats like DDOS attacks by filtering out illegitimate requests.
- **Request Verification**: They can contain customer-specific secret values, serving as a secure handshake between your system and the prerendering service.
- **Resource Allocation**: Knowing that a request is valid allows your server to allocate resources more efficiently, ensuring a smoother prerendering process.

### How Do Allowlist-Based Header Values Work?

When a page is being prerendered—either on-demand or during prefetching—the Dynamic Prerendering service attaches an allowlist-based header value to the request sent to your origin server. Your server, configured to recognize this header, validates the request before proceeding with the rendering process.
