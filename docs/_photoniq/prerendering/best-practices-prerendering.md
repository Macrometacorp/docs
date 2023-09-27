---
sidebar_position: 60
title: Dynamic Prerendering Best Practices
---

Prerendering is an optimization technique that generates static HTML pages from dynamic content to improve website performance. The following best practices help you get the most out of Dynamic Prerendering.





## Selective Prerendering

Choose specific pages or sections of your website that would benefit most from prerendering. High-traffic pages or those with dynamic content that doesn't change frequently are good candidates.

## Domain Configuration

Ensure the domains set for prerendering are configured correctly. Incorrect configurations may lead to caching issues or the delivery of stale content.

## Implement User-Agent String Detection on Origin Server

Configure your origin server to detect user-agent strings for more granular control. This allows you to serve custom content based on the user agent.

## Monitor Fingerprinting Issues on Your Site

Fingerprinting is a technique that collects data about a user's browser or device characteristics. While this is often used for legitimate purposes such as analytics or user experience customization, it can also be exploited to track users without their consent. When prerendering is implemented on your site, there's a chance that the fingerprinting scripts could collect data from the service, rather than the end users. This not only skews your data but can also compromise user privacy if not carefully managed.

In the context of prerendering, fingerprinting scripts could misidentify the prerendering service as actual users, thereby skewing analytics and potentially triggering actions meant for real users, like loading additional resources or triggering events.

Therefore, be vigilant in monitoring your site for fingerprinting scripts and consider the following:

1. **Isolate or Disable Fingerprinting Scripts**: During prerendering, identify and isolate fingerprinting scripts to prevent them from executing.

2. **Check Analytics Data**: Regularly review analytics data to ensure that the prerendering service is not being counted as a user.

3. **Update Privacy Policies**: If you are using fingerprinting for analytics or other purposes, ensure that your privacy policy reflects this and is compliant with relevant regulations.

By actively monitoring and managing fingerprinting, you can ensure that your prerendering activities do not compromise user privacy or affect the integrity of your data.

## Regularly Review Prerendering Performance Metrics

Periodically review performance metrics provided by the prerendering service. This offers insights into user experience and identifies opportunities for optimization.

## Cache Management on Your Origin Server

Manage the cache effectively on your origin server to ensure that dynamic content is as optimized as possible.

## Return the Correct Status Codes to Crawlers

Two special meta tags can be added to the `<head>` section of your HTML to return different status codes or headers to crawlers based on your REST calls.

```html
<meta name="prerender-status-code" content="404">
```

```html
<meta name="prerender-status-code" content="301">
<meta name="prerender-header" content="Location: http://www.example.com">
```

## Tell When Pages Are Ready to Be Saved

Use the following HTML and JavaScript code to inform the prerendering service when your pages are ready to be saved.

```html
<script> window.prerenderReady = false; </script>
```

```javascript
window.prerenderReady = true;
```

## Use the API to Cache or Recache Pages

Utilize the API to cache or recache pages as needed.

## Configure Ignored Params

A set of standard tracking parameters have already been configured to be ignored. Customize this list based on your specific requirements.

## Remove Dead Links

Dead links can impact both your SEO and your rendering costs. Make sure to remove or update them regularly.
