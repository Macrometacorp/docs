---
sidebar_position: 10
title: Manage Cache
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You have several options for managing the Prerendering cache.

- **Cache Manager tab** - In the Cache Manager tab in the web console, you can view all cached documents for an origin. You can also clear the cache or preview a cached page.
  ![Prerendering Cache Manager Tab](/static/img/prerendering/cache-manager.png)
- **REST API** - Macrometa provides several API calls that allows you to manage the cache.

## Cache Manager Fields

Prerendering provides the following cache manager fields. Field names in the web console are different than those in the API responses. Refer to the API endpoint documentation for a full explanation of the API response.

- **URL** - URL of the content that has been cached.
- **HTTP Status** - Response HTTP status code.
- **Source** - Whether the page was prefetched or rendered on demand.
- **Expired At** - When the document will expire.
- **Device** - Icon showing whether the page was rendered for desktop or mobile.

## View Cached Documents

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view cached documents in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Cache Manager**.
3. Select the origin for which you want to view cached documents.
4. (Optional) Click the filter icon to refine the cache list.

</TabItem>
<TabItem value="api" label="REST API">

[Get all cached documents](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--cache/get).

</TabItem>
</Tabs>

## Clear the Cache

<Tabs groupId="operating-systems1">
<TabItem value="console" label="Web Console">

Follow these instructions to clear cached documents in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Cache Manager**.
3. Select the origin for which you want to purge cached documents.
4. Select the checkbox next to the URLs for which you want to clear the cache.
5. Click **Clear Cache**.

</TabItem>
<TabItem value="api" label="REST API">

[Purge the cache](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--cache-purge/post).

</TabItem>
</Tabs>

## View Cached Pages

<Tabs groupId="operating-systems2">
<TabItem value="console" label="Web Console">

Follow these instructions to view cached documents in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Cache Manager**.
3. Select the origin for which you want to preview cached documents.
4. Locate the URL that you want to view.
5. In the Actions column, click the eye icon.

</TabItem>
<TabItem value="api" label="REST API">

[Preview a cached document](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--cache--cacheKey--preview/get).

</TabItem>
</Tabs>
