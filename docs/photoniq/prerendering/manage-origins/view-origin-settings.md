---
sidebar_position: 10
title: View Origin Settings
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You have several options for viewing Dynamic Prerendering origin settings.

- **Origin Settings tab** - In the Origin Settings tab in the web console, you can view information about each origin. To add a new origin URL, contact Macrometa Support.
  ![Prerendering Origin Settings Tab](/img/prerendering/origin-settings.png)
- **REST API** - Macrometa provides API calls that allow you to view origin settings for all origins or for one origin.

## View Origin Settings

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view origin settings in the web console.

1. Log in to your Dynamic Prerendering dashboard.
2. Click **Origin Settings**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [Get origins](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins/get)
- [Get an origin](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin/get)

</TabItem>
</Tabs>

## Origin Settings

Dynamic Prerendering provides the following origin settings. Field names in the web console are different than those in the API responses. Refer to the API endpoint documentation for a full explanation.

- **Origin URL** - URL of the origin.
- **Sitemap** - Sitemap, if one is associated with the origin.
- **Caching** - Indicates if caching is active for this origin.
- **Cache Expiration** - Amount of time a page remains in the cache before expiring.
- **Date Added** - Date the origin was added.
