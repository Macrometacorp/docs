---
sidebar_position: 5
title: How Dynamic Prerendering Works
---

PhotonIQ Dynamic Prerendering generates static HTML pages from dynamic websites or web applications to improve the search engine optimization (SEO) of websites. This page explains provides a high-level explanation of how it works.

## Human Visitors

Companies spend a lot of time and money optimizing pages for humans, both in terms of speed and design. JavaScript, lazy loading, and other strategies make sites fast and appealing to humans. Dynamic Prerendering does not interfere with that flow.

DIRECT ACCESS IMAGE PLACEHOLDER

## Prerendering Pages for Bots

Dynamic Prerendering is integrated with the content delivery network (CDN) in front of your servers. It works with the CDN to identify bots and serve them the appropriate prerendered page version, either mobile or desktop.

Bots do not understand JavaScript and cannot see things hidden by lazy loading or other strategies targeted at human visitors. If a bot tries to crawl your page and cannot find the content, then your search engine rankings can suffer.

Dynamic Prerendering solves that problem by taking the content in your page and rendering it in a static format that bots can easily understand and crawl. When a bot accesses your site, Dynamic Prerendering identifies whether it wants the mobile or desktop version of the site, then it serves the correct prerendered page.

## Prefetching vs. On-demand Prerendering

There are two strategies Dynamic Prerendering uses. You can either prefetch all the pages in your site (origin) or you can have pages prerendered on-demand.

### Prefetching

In the prefetching strategy, Dynamic Prerendering uses your sitemap to crawl and prerender all pages in your origin site. All pages will be prerendered and ready for a bot to show up, whether they are visited or not.

Content will be refreshed, or prerendered again, based on a schedule you define; anywhere from every day to every week. The prefetching strategy is useful for content that does not change often and that you are expecting to be thoroughly crawled by bots.

REPEATED CRAWLER REQUEST IMAGE PLACEHOLDER

### On-demand Prerendering

In the on-demand prerendering strategy, Dynamic Prerendering does not prerender a page until a bot tries to access it for the first time.If a bot requests a page and it is not in the cache already, then Dynamic Prerendering fetches the page, renders it, and serves it to the bot. The rendered page can then be cached for a period of time in case another bot requests it before the cache expires.

You can choose whether the pages are cached, and how long the cached pages persist. You can also clear the cache manually if necessary The on-demand prerendering strategy is useful for content that changes frequently or if you want more hands-on management of the prerendering service.

FIRST TIME CRAWLER REQUEST IMAGE PLACEHOLDER
