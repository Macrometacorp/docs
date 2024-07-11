---
title: Prerendering Strategies
---

Prerender offers two strategies for rendering web pages to bots and web crawlers: prefetching and on-demand rendering.

### Prefetching

With a prefetching strategy, Prerender uses your sitemap to crawl and prerender all pages on your origin site. These prerendered pages are ready for bot access, whether they end up being visited or not.

This Prerender strategy allows you to schedule content at intervals for prefetching. These intervals range from daily to weekly and is useful for irregularly updated content that require thorough crawling by bots.

![Bot Visits Prefetched Site](/img/photoniq/prerendering/bot-visits-site.png)

### On-demand Prerender

Unlike prefetching, on-demand prerender only renders a page after a bot requests for it. For uncached pages, Prerender fetches and renders the page before serving to the bot, and then caches the page for a specific period. 

Prerender allows you to define the caching periods when [configuring your origin](../07-prerendering-management/manage-origins/). 

![Bot Visits On-Demand Prerendered Site](/img/photoniq/prerendering/on-demand-prerender.png)

Prerender offers numerous flexible options when setting caching parameters, including cache duration or to manually clear the cache if needed. Clearing the cache works for frequently changing content or for very hands-on Prerender users.

![Cache Refresh](/img/photoniq/prerendering/refresh-cache.png)
