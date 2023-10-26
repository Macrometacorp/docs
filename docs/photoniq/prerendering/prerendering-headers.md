# Managing Headers in Dynamic Prerendering

## Overview

Headers in Dynamic Prerendering play a crucial role in tailoring the prerendering process to your specific requirements. Gain control over prerendering behavior with customizable passthrough, allowlist, and caching control headers. You can specify which pages should be prerendered based on unique attributes, allowing you to focus on a specific user base.

## Passthrough Headers

Passthrough headers allow bots to pass through specific header requests like language preferences during the rendering process. Without this feature, bots would only see the browser's default settings, usually those of a Chrome browser. This capability is particularly useful for capturing `User-Agent` information and ensuring that bots retrieve content in a specified language, such as through the `Accept-Language` header.

## Caching Control Headers

Also known as headers considered for cache keys, these headers are important for implementing a prefetching strategy. For instance, if your site offers different content based on language, using the `Accept-Language` header as a cache key ensures that bots can access all language versions of your site.

## Allowlist-Based Header Value

During the rendering process, either when prefetching or rendering on-demand, the allowlist-based header value signals to your system that the request is legitimate. This helps differentiate valid requests from malicious activities like DDOS attacks. The header can also include a customer secret value to further validate its legitimacy.

By understanding and utilizing these various header options, you can fine-tune how Dynamic Prerendering interacts with your web pages. This ensures that your content is accurately and efficiently rendered for web crawlers.