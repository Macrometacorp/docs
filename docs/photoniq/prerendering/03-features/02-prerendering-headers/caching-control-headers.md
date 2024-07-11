---
sidebar_position: 20
title: Caching Control Headers
---

Caching control headers offer a layer of control over the caching behavior in Prerender, particularly when different versions of a web page need to be served to bots. These headers determine how and when the rendered pages are stored in the cache, which impacts how bots interact with your site.

### What Are Caching Control Headers?

Caching control headers influence how the Prerender service caches rendered pages. These headers are used to manage page versions based on attributes like language, user-agent, or any other criteria that is significant for your web content.

### Why Use Caching Control Headers?

- **Multi-Language Support**: If your website supports multiple languages, then caching control headers can help manage how each version is cached. By considering the `Accept-Language` header, for instance, you can ensure that French, English, and Spanish versions of your site are cached separately.
- **Content Variability**: If your site offers content that varies based on specific conditions or attributes, then these headers help maintain distinct cache entries for each variant.
- **Optimized Bot Interaction**: Properly managed caching ensures that bots can access the most appropriate version of your content, making your site more bot-friendly and improving SEO.

### How Do Caching Control Headers Work?

Caching control headers come into play after a page is rendered by Prerender. These headers are used to create cache keys, which are unique identifiers that help store and retrieve the rendered page from the cache. When a bot sends a request that matches a particular cache key, the corresponding cached page is served, reducing latency and improving the bot's crawling efficiency.
