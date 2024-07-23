---
sidebar_position: 10
title: Manage Origin Settings
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Prerender offers different options for viewing and managing your origin settings.

- **Origin Settings tab** - In the Origin Settings tab in the web console, you can view and update information about each origin. To add a new origin domain, contact Macrometa Support.
  ![Prerender Origin Settings Tab](/img/prerendering/origin-settings.png)
- **REST API** - Macrometa provides API calls that allow you to view and update origin settings.

## View Origin Settings

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view origin settings in the web console.

1. Log in to your Prerender dashboard.
2. Click **Origin Settings**.

</TabItem>
<TabItem value="api" label="REST API">

- [Get origins](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins/get)
- [Get an origin](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin/get)

</TabItem>
</Tabs>

## Origin Settings Fields

Prerender provides the following origin settings. Field names in the web console are different than those in the API responses. Refer to the API endpoint documentation for a full explanation.

- **Origin URL** - URL of the origin.
- **Sitemap** - Sitemap, if one is associated with the origin.
- **Caching** - Indicates if caching is active for this origin.
- **Cache Expiration** - Amount of time a page remains in the cache before expiring.
- **Date Added** - Date the origin was added.
- **Actions** - Icons allow you to edit or delete origins.

## Create an Origin

<Tabs groupId="operating-systems2">
<TabItem value="console" label="Web Console">

Follow these instructions to add new origin settings in the web console. To add a new origin domain, contact Macrometa Support.

1. Log in to your Prerender dashboard.
2. Click **Origin Settings**.
3. Click **Add Origin URL**.
4. Enter values in the following fields:
   - **Subdomain** - (Optional) Enter the subdomain of the domain that you want to prerender.
   - **Domain** - Select the domain that you want to prerender.
   - **Sitemap Paths** - (Optional) Click **Add Sitemap Path** and then add the path to the sitemap. This is needed if you want Prerender to prefetch the URLs in your site.
   - **Enable Caching** - Click to turn on caching, then select the cache expiration time (also called time to live or ttl) in days.
5. Click **Add**.

![Prerender Add Origin URL](/img/prerendering/add-origin-url.png)

</TabItem>
<TabItem value="api" label="REST API">

[Create an origin](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins/post).

</TabItem>
</Tabs>

## Update an Origin

<Tabs groupId="operating-systems3">
<TabItem value="console" label="Web Console">

Follow these instructions to update origin settings in the web console.

1. Log in to your Prerender dashboard.
2. Click **Origin Settings**.
3. In the **Actions** column, click the pencil icon to open the **Edit Origin URL** window.
4. Enter new values in fields and then click **Update**.

</TabItem>
<TabItem value="api" label="REST API">

[Update an origin](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin/patch).

</TabItem>
</Tabs>

## Delete an Origin

<Tabs groupId="operating-systems4">
<TabItem value="console" label="Web Console">

Follow these instructions to delete origin settings in the web console.

1. Log in to your Prerender dashboard.
2. Click **Origin Settings**.
3. In the **Actions** column, click the red X next to the origin that you want to delete.
4. Click **Confirm**.

</TabItem>
<TabItem value="api" label="REST API">

[Delete an origin](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin/delete).

</TabItem>
</Tabs>
