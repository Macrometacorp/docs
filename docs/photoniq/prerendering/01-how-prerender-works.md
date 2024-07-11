---
title: How Prerender Works
---

PhotonIQ Prerender runs the full version of a web browser in a server environment and loads an entire web application like a regular browser, including Javascript execution to generate a static HTML page. Prerender takes a snapshot of this resulting HTML code and serves to clients, enhancing the search engine optimization (SEO) of websites. 

## Effects of Prerender on Web Visitors 

Let's explore how Prerender affects these two classes of web visitors:
 
- Human visitors
- Bots

### Prerendered Pages for Human Visitors

Businesses investing a considerable resources and techniques like Javascript lazy loading, image compression, caching, and other strategies to improve web page speed, performance and experience for human users need not worry about the effects of Prerender on their human visitors as the service does not disrupt their user experience. 

![Human Visits Site](/img/photoniq/prerendering/human-visits-site.png)

### Prerendered Pages for Bots

Prerender integrates with the content delivery network (CDN) situated in front of your servers to identify bots and serve them the appropriate prerendered version of your page, either for mobile or desktop devices.

Since bots are unable to interpret JavaScript or view content hidden by lazy loading and similar web optimization techniques, a failure to present this content reduces the amount of content indexed by these web bots, negatively impacting your search engine rankings. 

Prerender addresses this issue by converting the content on your page into a static format that bots can easily understand and crawl.
When a bot visits your site, Prerender determines whether it is requesting the mobile or desktop version and serves the corresponding prerendered page.

