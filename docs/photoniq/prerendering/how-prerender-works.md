---
sidebar_position: 5
title: How Prerendering Works
---

PhotonIQ Prerendering generates static HTML pages from dynamic websites or web applications to enhance the search engine optimization (SEO) of websites. This page provides a high-level explanation of how the service operates.

## Human Visitors

Companies invest considerable resources in optimizing pages for human users, focusing on both speed and design. Techniques such as JavaScript, lazy loading, and other strategies are employed to make sites quick and visually appealing. Prerendering does not disrupt this user experience.

![Human Visits Site](/img/photoniq/prerendering/human-visits-site.png)

## Prerendering Pages for Bots

Prerendering integrates with the content delivery network (CDN) situated in front of your servers. The service collaborates with the CDN to identify bots and serve them the appropriate prerendered version of the page, either for mobile or desktop devices.

Because bots cannot interpret JavaScript or view content hidden by lazy loading and similar techniques, failing to present this content can negatively impact your search engine rankings. Prerendering addresses this issue by converting the content on your page into a static format that bots can easily understand and crawl. When a bot visits your site, Prerendering determines whether it is requesting the mobile or desktop version and serves the corresponding prerendered page.

## Prefetching vs. On-demand Prerendering

Prerendering offers two strategies: prefetching and on-demand prerendering.

### Prefetching

With the prefetching strategy, Prerendering uses your sitemap to crawl and prerender all pages on your origin site. These prerendered pages are ready for bot access, whether they end up being visited or not.

You can schedule content to be refreshed or prerendered again at intervals ranging from daily to weekly. This strategy is most useful for content that doesn't change frequently and is expected to be thoroughly crawled by bots.

![Bot Visits Prefetched Site](/img/photoniq/prerendering/bot-visits-site.png)

### On-demand Prerendering

In on-demand prerendering, a page is not prerendered until a bot requests it for the first time. If a bot requests a page not already in the cache, Prerendering fetches and renders the page before serving it to the bot. The rendered page may then be cached for a specific period, to fulfill future requests before the cache expires.

![Bot Visits On-Demand Prerendered Site](/img/photoniq/prerendering/on-demand-prerender.png)

You have the flexibility to set caching parameters, including cache duration. Additionally, you can manually clear the cache if needed. This strategy is ideal for frequently changing content or for those who prefer more hands-on management of the prerendering process.

![Cache Refresh](/img/photoniq/prerendering/refresh-cache.png)
