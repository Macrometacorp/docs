---
sidebar_position: 10
title: Pass-through Headers
---

Pass-through headers facilitate greater flexibility and control during the prerendering process. These headers act as conduits for transmitting specific instructions or preferences from web crawlers to the prerendering service.

### What Are Pass-through Headers?

Pass-through headers allow you to forward certain header values from the bot's request directly to the Prerendering service. Unlike default browser settings, which usually take precedence in the absence of these headers, passthrough headers enable a more tailored rendering experience.

### Why Use Pass-through Headers?

- **Language Customization**: One of the most common uses for passthrough headers is language customization via the `Accept-Language` header. If a web crawler prefers content in a certain language, this preference can be passed through, ensuring that the content rendered is in the desired language.
- **User-Agent Information**: Pass-through headers also allow the capture of `User-Agent` information. This is particularly useful for analytics and for serving specialized content based on the type of bot that is crawling your site.
- **Other Preferences**: Other browser or bot-specific settings can also be passed through, providing a rendering experience that is as close as possible to the bot's original request.

### How Do Pass-through Headers Work?

When a bot sends a request to access a web page, it includes specific headers based on its settings or requirements. The Prerendering service reads these incoming headers and selectively passes them through during the rendering process. This ensures that any special instructions or requirements from the bot are taken into account, leading to a more accurate and customized rendering.
