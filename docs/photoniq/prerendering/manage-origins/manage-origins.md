---
sidebar_position: 10
title: Manage Origin Settings
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You have several options for viewing Prerendering origin settings.

- **Origin Settings tab** - In the Origin Settings tab in the web console, you can view and update information about each origin. To add a new origin domain, contact Macrometa Support.
  ![Prerendering Origin Settings Tab](/img/prerendering/origin-settings.png)
- **REST API** - Macrometa provides API calls that allow you to view and update origin settings.

## View Origin Settings

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view origin settings in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Origin Settings**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [Get origins](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins/get)
- [Get an origin](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin/get)

</TabItem>
</Tabs>

## Origin Settings Fields

Prerendering provides the following origin settings. Field names in the web console are different than those in the API responses. Refer to the API endpoint documentation for a full explanation.

- **Origin URL** - URL of the origin.
- **Sitemap** - Sitemap, if one is associated with the origin.
- **Caching** - Indicates if caching is active for this origin.
- **Cache Expiration** - Amount of time a page remains in the cache before expiring.
- **Date Added** - Date the origin was added.
- **Actions** - Icons allow you to edit or delete origins.

## Create an Origin

<Tabs groupId="operating-systems2">
<TabItem value="console" label="Web Console">

</TabItem>
<TabItem value="api" label="REST API">

- [Create origin](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins/post)

## Update an Origin

<Tabs groupId="operating-systems3">
<TabItem value="console" label="Web Console">

</TabItem>
<TabItem value="api" label="REST API">

- [Update origin](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin/patch)

## Delete an Origin

<Tabs groupId="operating-systems4">
<TabItem value="console" label="Web Console">

</TabItem>
<TabItem value="api" label="REST API">

- [Delete origin](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin/delete)
