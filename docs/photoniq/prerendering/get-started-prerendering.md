---
sidebar_position: 10
title: Get Started with Prerendering
---

Dynamic Prerendering is a completely managed, white-glove service. Macrometa engineers will implement for you, making sure the service is optimized and working correctly according to the prerendering strategy that you choose.

However, some people like to be more hands-on with their management. After you work with Macrometa engineers to set up your Dynamic Prerendering instance, follow these steps to get started prerendering a new origin.

## 1. Set Up Origin for Caching

Before leveraging the caching capabilities of Dynamic Prerendering service, you must first define your origin, which is the site that you want it to prerender. This step is crucial as it allows the system to understand the source of the pages and how they should be cached for optimal performance.

- Make a request to the [Create an origin](/docs/apiPrerendering#/paths/api-prerender-v1-origins/post) endpoint using the POST method.
- Include the necessary headers and provide a body containing your origin details.

## 2. Fetch Prerendered Page Content

To retrieve content, use the [Get prerendered page](/docs/apiPrerendering#/paths/api-prerender-v1-render-mobile---url/get) endpoint.

- If the requested page is already saved in the cache, then it will be directly served from there.
- If it is not in the cache, then the service prerenders the page on-the-fly, saves it to the cache for subsequent requests, and then delivers the content. This ensures faster delivery for frequently accessed pages and optimized performance.

## 3. Monitor the Service

Regularly check the health status of Dynamic Prerendering using the [Get service health](/docs/apiPrerendering#/paths/api-prerender-v1-health/get) endpoint to ensure smooth operation.

## 4. Purge the Cache

If you need to refresh your cached content, then use the [Purge cache](/docs/apiPrerendering#/paths/api-prerender-v1-purge/post) endpoint. This allows for targeted cache removal, specifying only the URLs you wish to clear. If a cleared URL is later accessed using the render endpoint and caching is enabled, then the service will automatically prerender and cache the page again for optimal delivery.

## 5. Advanced Cache Management

Gain more control over your caching strategy by selectively caching specific pages from your origin and determining the cache's time-to-live (TTL).

- Modify origin settings with the PATCH method at the [Update an origin](/docs/apiPrerendering#/paths/api-prerender-v1-origins-_key/patch) endpoint.
- To remove configurations for specific origins, use the DELETE method on the [Delete an origin](/docs/apiPrerendering#/paths/api-prerender-v1-origins-_key/delete) endpoint.
