---
sidebar_position: 30
title: Configure Prefetching
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You have several options for managing Prerendering prefetching configurations.

- **Prefetching tab** - In the Prefetching tab in the web console, you can view and manage prefetching configurations for an origin.
- **REST API** - Macrometa provides a API calls that allow you to view and manage prefetching configurations for an origin.

## View Prefetching Configurations

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view prefetching jobs in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Prefetching**.
3. Click **Configuration**.

![Prerendering Prefetching Configuration Tab](/img/prerendering/prefetching-configuration-tab.png)

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [get prefetching configuration](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--prefetch-configs/get).

</TabItem>
</Tabs>

## Prefetching Configuration Fields

Prerendering provides the following prefetching configuration fields. Field names in the web console are different than those in the API responses. Refer to the API endpoint documentation for a full explanation of the API response.

- **Status** - Whether the configuration is active or inactive.
- **Origin URL** - The origin URL.
- **Sitemaps** - The sitemap path.
- **Scheduling** - Cron expression entered to trigger the prefetching job.
- **Devices** - Icon indicating whether the prefetch was rendered for just desktop or desktop and mobile.
- **Actions** - Icon that allows you to update.

## Create Prefetching Configurations

Use our interactive API Reference with code generation in 18 programming languages to [create a prefetching configuration](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--prefetch-configs/post).

## Edit Prefetching Configurations

<Tabs groupId="operating-systems2">
<TabItem value="console" label="Web Console">

Follow these instructions to edit a prefetching in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Prefetching**.
3. Click **Configuration**.
4. Click the Actions icon.
5. 

![Prerendering Update Prefetching Configuration](/img/prerendering/update-prefetching-configuration.png)

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [get prefetching configuration](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--prefetch-configs/get).

</TabItem>
</Tabs>

## Delete Prefetching Configurations

Use our interactive API Reference with code generation in 18 programming languages to [delete a prefetching configuration](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--prefetch-configs/delete).
