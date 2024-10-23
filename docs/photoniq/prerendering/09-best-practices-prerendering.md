---
sidebar_position: 90
title: Prerender Best Practices
---

Prerender generates static HTML pages from dynamic content to make your site content more available to web crawlers (good bots). The following best practices help you get the most out of Prerender to ensure maximum visibility and discoverability of your web content.

## Accurate origin configuration

When [configuring your origin for Prerender](./07-prerendering-management/manage-origins/manage-origins.md#create-an-origin), ensure that the specified origin settings are accurate and correspond to your website's needs. Incorrect settings can result in caching problems and the delivery of outdated content to bots. 

## Determine the best cache strategy 

Take full advantage of [Prerender's cache manager](./07-prerendering-management/manage-cache/manage-cache.md) to serve the static version of your website's page faster. Using this feature serves pages to the bots without needing to re-render them. However, evaluating the page update frequency, content type, and SEO factors is essential before employing this feature to help balance costs and freshness of loaded pages. For example, the cache expiration time depends on the frequency of website updates.

## Remove or Update Dead Links

Dead links negatively affect both your SEO rankings and Prerender costs. Regularly scan your website for dead links and remove or update them to point to active pages. This practice improves SEO performance and ensures no extra charges for prerendering pages that don't contribute to your site's value.
For a system that redirects users to a 404 page in case of unavailable pages, use Prerender's [404 identifier](./07-prerendering-management/manage-404-identifiers.md) to label these pages accurately to web crawlers. 

## Regularly Review Prerender Performance Metrics

Prerender generates [monitoring metrics](./06-monitor-prerendering/view-prerendering-activity.md) to enable you to evaluate your site's performance. These metrics provide valuable insights into user experience and identify areas for further optimization. Practice checking and evaluating these metrics at regular intervals to stay ahead of any issues.

## Disable Cookie Consent Banner

Pop-up cookie consent banners disrupt user navigation and page experience. This is a crucial factor for search engines and can negatively affect your SEO rank. Before using the service, one recommendation is to turn off the cookie consent banner for Prerender user agents. This practice prevents the banner from being included in the cached version served to bots. 

