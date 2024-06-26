---
sidebar_position: 10
title: Get Started with Prerendering
---

Although PhotonIQ offers Prerendering as a completely managed, white-glove service, this guide provides a practical approach to setting up and using the service.

## Objectives

This guide will help you:

- Set up your origin
- Validate and monitor Prerendering
- Purge the Cache
- Customize rendering behavior with Prerendering headers

## Prerequisites

- A Prerendering instance. Contact Macrometa Engineers to help set up your Prerendering Instance.
- Your Subdomain 


### Set Up Origin

Before leveraging the different capabilities of Prerendering, you need to define your origin, which is the target site for Prerendering. This step is crucial as it helps the system to understand the source of the pages and caching strategy for ensuring optimal performance.

To set up your origin:

1. Navigate to **Origin Settings** on your Prerendering dashboard
1. Click **Add Origin URL**
1. Configure your origin by filling the values for the following fields.
    - **Subdomain** - (Optional) Enter the target subdomain of the domain for Prerendering
    - **Domain** - Select the target domain for prerender.
    - **Sitemap Paths** - (Optional) Click **Add Sitemap Path** and add the path to the sitemap. 
    
    :::important
    
    Adding a sitemap is needed if you intend to use a prefetching strategy, i.e, using Prerender to prefetch the URLs in your site.

    :::
    - **Enable Caching** - Click to turn on caching, and select the cache expiration time (also called time to live (ttl)) in days.

![setup origin](/static/img/photoniq/prerendering/set-up-origin.png)

You can further increase the capabilities of Prerendering by configuring the following settings:

1. (Optional) If using the web console, you can [add a 404 identifier](../07-prerendering-management/manage-404-identifiers.md) by adding an identifier string. A 404 identifier helps Prerendering accurately report 404s. 
1. (Optional) [Review and update Prerendering settings](../07-prerendering-management/prerendering-settings.md) for your origin. This configuration updates may include customizing the URL block list and adding various types of headers.
1. (Optional) If you are using a prefetching strategy, then [configure prefetching](../04-prerendering-strategies/01-prefetching/02-configure-prefetching.md).
1. (Optional) Set up [synthetic interactions](../03-features/01-synthetic-interactions/01-implementing-interaction/).
   1. [Find the HTML selector](./synthetic-interactions/find-htmlselector.md) that you want to act on.
   2. Create a synthetic interaction policy:
    - [Add a scroll interaction policy](../03-features/01-synthetic-interactions/03-managing-synthetic-interaction-policies/manage-scroll-interactions.md).
    - [Add a click interaction policy](../03-features/01-synthetic-interactions/03-managing-synthetic-interaction-policies/manage-click-interactions.md).
    - [Add a hover interaction policy](../03-features/01-synthetic-interactions/03-managing-synthetic-interaction-policies/manage-hover-interactions.md).

### Validate and Monitor Prerendering

After setting up your origin for Prerendering, you can validate its operations and performance by observing monitoring metrics.

Navigate to **Activity** on your Prerendering dashboard to view metrics like:

- Renders
- Request per second
- Usage highlights which provides information on other metrics like cache hits and misses, requests, prefetches, and failed requests. 

![Usage highlights](/static/img/photoniq/prerendering/prerendering-metrics.png)

### Purge the Cache as Needed

Prerendering has a cache manager, which allows you to view information about the existing caches. 

To manage your cache, navigate to the **Cache Manager**. If you need to refresh your cached content, then you can [clear the cache](../07-prerendering-management/manage-cache/).

This allows for targeted cache removal, specifying only the URLs you wish to clear. If a cleared URL is later accessed using the render endpoint and caching is enabled, then the service will automatically prerender and cache the page again for optimal delivery.

![cache manager](/static/img/photoniq/prerendering/cache-manager.png)

### Customize with Prerendering Headers

Prerendering headers help guide how Prerender renders your pages to bots. For example, you can configure Prerender to render a page in a specified language using the pass-through header. 

To customize with a pass-through header:
1. Navigate to **Advanced Settings** on your Prerendering Instance.
1. Scroll to **Pass-through Headers** and click **Add Pass-through Headers**
1. Enter the `Accept-language` header and click **Save**.

![pass-through header](/static/img/photoniq/prerendering/accept-language.png)

This header transmits any language preferences for bots to Prerendering. For example, if the bots request contains preference for english, it passes this preference into the header, so Prerendering renders the web content in English.

