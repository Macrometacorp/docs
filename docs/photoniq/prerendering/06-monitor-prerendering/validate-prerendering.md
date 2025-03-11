---
sidebar_position: 80
title: Monitor and Validate Prerender
---

In order to confirm Prerender is running, Prerendering allows you to view a rendered page from a bot standpoint to understand what a web crawler sees when it visits your site, thus allowing you to optimize rendering behavior. 

Furthermore, you can check the health status of your Prerender service by using the health API endpoint. 

## Check Prerender Health

To see if Prerender is currently running, you can use the [Get service health](/docs/apiPrerendering#/paths/api-prerender-v1-health/get) API endpoint.

## View Prerendered Pages

Here are ways to view the prerendered pages:

1. **Use Developer Tools**: Many modern browsers have developer tools that allow you to emulate different user agents, including web crawlers. Switch to a crawler user agent and reload the page to see the prerendered version.
2. **API Endpoints**: Use the [Get prerendered page](/docs/apiPrerendering#/paths/api-prerender-v1-render-mobile---url/get) endpoint to view the prerendered page.
3. **View Cached Pages**: In the Cache Manager tab, you can [view cached pages](../07-prerendering-management/manage-cache/manage-cache.md).
4. **Third-Party Tools**: There are online services that allow you to view your site from the perspective of a search engine bot. These tools fetch the prerendered page and display it, giving you a clear idea of what is being served to the crawlers.
