---
sidebar_position: 10
title: Get Started with Prerendering
---

PhotonIQ Prerendering is a completely managed, white-glove service. Macrometa engineers will implement for you, making sure the service is optimized and working correctly according to the prerendering strategy that you choose.

However, some people like to be more hands-on with their management. After you work with Macrometa engineers to set up your Prerendering instance, follow these steps to get started prerendering a new origin.

## Set Up the Origin

Before leveraging the caching capabilities of Prerendering service, you must first define your origin, which is the site that you want it to prerender. This step is crucial as it allows the system to understand the source of the pages and how they should be cached for optimal performance.

1. [Create an origin](manage-origins/manage-origins.md#create-an-origin).
2. (Optional) If using the web console, then you can [add a 404 identifier](manage-404-identifiers.md#add-or-update-404-identifiers) so that Prerendering can accurately report 404s.
3. (Optional) [Review and update Prerendering settings](prerendering-settings.md) for your origin. This can include customizing the URL block list and adding various types of headers.
4. (Optional) If you are using a prefetching strategy, then [configure prefetching](manage-prefetching/configure-prefetching.md).
5. (Optional) Set up [synthetic interactions](./synthetic-interactions/).
   1. [Find the HTML selector](./synthetic-interactions/find-htmlselector.md) that you want to act on.
   2. Create a synthetic interaction policy:
    - [Add a scroll interaction policy](./synthetic-interactions/manage-scroll-interactions.md#add-scroll-policies).
    - [Add a click interaction policy](./synthetic-interactions/manage-click-interactions.md#add-click-policies).
    - [Add a hover interaction policy](./synthetic-interactions/manage-hover-interactions.md#add-hover-policies).

## Validate and Monitor Prerendering

Once your origin is set up, you should validate that Prerendering is working as expected and monitor performance metrics.

1. [Validate Prerendering](monitor-prerendering/validate-prerendering.md) using one the API, web console, or other tools.
2. Monitor Prerendering:
   - [View Prerendering activity](./monitor-prerendering/view-prerendering-activity.md).
   - [View rendering history](./monitor-prerendering/view-render-history.md).
   - [View prefetching](./manage-prefetching/view-prefetching.md) if you are using a prefetching strategy.

## Purge the Cache as Needed

If you need to refresh your cached content, then you can [clear the cache](./manage-cache/manage-cache.md#clear-the-cache).

This allows for targeted cache removal, specifying only the URLs you wish to clear. If a cleared URL is later accessed using the render endpoint and caching is enabled, then the service will automatically prerender and cache the page again for optimal delivery.
