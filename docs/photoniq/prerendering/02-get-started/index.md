---
title: Get Started with Prerender
---

Although PhotonIQ offers Prerender as a completely managed, white-glove service, this guide provides a practical approach to setting up and using the service for self-starters.

## Objectives

This guide will help you:

- [Set up your origin](../07-prerendering-management/manage-origins/manage-origins.md)
- [Validate and monitor Prerender](../06-monitor-prerendering/validate-prerendering.md)
- [Purge the Cache](../07-prerendering-management/manage-cache/manage-cache.md)
- [Customize rendering behavior with Prerender headers](../03-features/02-prerendering-headers/index.md)

## Prerequisites

- A Prerender instance. This Instance gives you access to the service and other tools needed to use it. Contact Macrometa engineers to help set up your Prerender Instance.
- Target domain 


### Set Up Origin

Before leveraging the different capabilities of Prerender, you need to define your origin, which is the target site for Prerender. This step is crucial as it helps the system to understand the source of the pages and determine the caching strategy for ensuring optimal performance. For example, a regularly-updated products page may require shorter periods between subsequent caches than a contact page. 

To set up your origin:

1. Navigate to **Origin Settings** on your [Prerender dashboard](../07-prerendering-management/index.md)
1. Click **Add Origin URL**
1. Configure your origin by filling the values for the following fields.
    - **Subdomain** - (Optional) Enter the target subdomain of the domain for Prerendering
    - **Domain** - Select the target domain for prerender.
    - **Sitemap Paths** - (Optional) Click **Add Sitemap Path** and add the path to the sitemap. 
    
    :::important
    
    Adding a sitemap is needed if you intend to use a prefetching strategy, i.e, using Prerender to prefetch the URLs in your site.

    :::
    - **Enable Caching** - Click to turn on caching, and select the cache expiration time (also called time to live (ttl)) in days.

![setup origin](/img/photoniq/prerendering/set-up-origin.png)

You can further increase the capabilities of Prerendering by configuring the following settings:

1. (Optional) If using the web console, you can [add a 404 identifier](../07-prerendering-management/manage-404-identifiers.md) by adding an identifier string. A 404 identifier helps Prerender accurately report 404s. 
1. (Optional) [Review and update Prerendering settings](../07-prerendering-management/prerendering-settings.md) for your origin. This configuration updates may include customizing the URL block list and adding various types of headers.
1. (Optional) If you are using a prefetching strategy, then [configure prefetching](../04-prerendering-strategies/01-prefetching/configure-prefetching.md).
1. (Optional) Set up [synthetic interactions](../03-features/01-synthetic-interactions/01-implementing-interaction/index.md).
   1. [Find the HTML selector](../03-features/01-synthetic-interactions/01-implementing-interaction/index.md) that you want to act on.
   2. Create a synthetic interaction policy:
    - [Add a scroll interaction policy](../03-features/01-synthetic-interactions/03-managing-synthetic-interaction-policies/manage-scroll-interactions.md).
    - [Add a click interaction policy](../03-features/01-synthetic-interactions/03-managing-synthetic-interaction-policies/manage-click-interactions.md).
    - [Add a hover interaction policy](../03-features/01-synthetic-interactions/03-managing-synthetic-interaction-policies/manage-hover-interactions.md).

### Validate and Monitor Prerender

After setting up your origin for Prerender, you can validate its operations and performance by observing monitoring metrics.

Navigate to **Activity** on your Prerender dashboard to view metrics like:

- Renders
- Request per second
- Usage highlights which provides information on other metrics like cache hits and misses, requests, prefetches, and failed requests. 

![Usage highlights](/img/photoniq/prerendering/prerendering-metrics.png)

### Purge the Cache as Needed

Prerender has a [cache manager](../07-prerendering-management/manage-cache/manage-cache.md), which allows you to view information about the existing caches. 

To manage your cache, navigate to the **Cache Manager**. If you need to refresh your cached content, then you can [clear the cache](../07-prerendering-management/manage-cache/manage-cache.md).

This allows for targeted cache removal, specifying only the URLs you wish to clear. When accessing a URL with a cleared cache using the render endpoint, prerender automatically renders the page and caches it to ensure optimal delivery.

![cache manager](/img/photoniq/prerendering/cache-manager.png)

### Customize with Prerender Headers

[Prerender headers](../03-features/02-prerendering-headers/index.md) help guide how Prerender renders your pages to bots. For example, you can configure Prerender to render a page in a specified language using the pass-through header. 

To customize with a pass-through header:
1. Navigate to **Advanced Settings** on your Prerender Instance.
1. Scroll to **Pass-through Headers** and click **Add Pass-through Headers**
1. Enter the `Accept-language` header and click **Save**.

![pass-through header](/img/photoniq/prerendering/accept-language.png)

This header transmits any language preferences for bots to Prerender. For example, if the bots request contains preference for english, it passes this preference into the header, so Prerender renders the web content in English.

