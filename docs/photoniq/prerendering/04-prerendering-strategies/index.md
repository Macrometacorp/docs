---
title: Prerendering Strategies
---

Prerendering offers two strategies for rendering web pages to bots and web crawlers: prefetching and on-demand prerendering.

### Prefetching

With a prefetching strategy, Prerendering uses your sitemap to crawl and prerender all pages on your origin site. These prerendered pages are ready for bot access, whether they end up being visited or not.

This Prerendering strategy allows you to schedule content at intervals for prefetching. These intervals range from daily to weekly and is useful for irregularly updated content that require thorough crawling by bots.

![Bot Visits Prefetched Site](/static/img/photoniq/prerendering/bot-visits-site.png)

### On-demand Prerendering

Unlike prefetching, on-demand prerendering only renders a page after a bot requests for it. For uncached pages, Prerendering fetches and renders the page before serving to the bot, and then caches the page for a specific period. 

Prerendering allows you to define the caching periods when [configuring your origin](../07-prerendering-management/manage-origins/). 

![Bot Visits On-Demand Prerendered Site](/static/img/photoniq/prerendering/on-demand-prerender.png)

Prerendering offers numerous flexible options when setting caching parameters, including cache duration or to manually clear the cache if needed. Clearing the cache works for frequently changing content or for very hands-on Prerendering users.

![Cache Refresh](/static/img/photoniq/prerendering/refresh-cache.png)
