---
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

[Get prefetching configuration](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--prefetch-configs/get).

</TabItem>
</Tabs>

## Prefetching Configuration Fields

Prerendering provides the following prefetching configuration fields. Field names in the web console are different than those in the API responses. Refer to the API endpoint documentation for a full explanation of the API response.

- **Status** - Whether the configuration is active or inactive.
- **Origin URL** - The origin URL.
- **Sitemaps** - The sitemap path, if the origin has one. Prerendering will prefetch all URLs on the sitemap when the configuration is active.
- **Scheduling** - Cron expression entered to trigger the prefetching job.
- **Devices** - Icon indicating whether the prefetch was rendered for just desktop or desktop and mobile.
- **Actions** - Icon that allows you to update.

## Create Prefetching Configurations

<Tabs groupId="operating-systems2">
<TabItem value="console" label="Web Console">

A new prefetch configuration appears in the web console when you add a new origin in the Origin Settings tab. For more information about viewing and adding origins, refer to [Manage Origins](../../../07-prerendering-management/manage-origins/).

The new configuration is inactive and unscheduled. Follow these instructions in order to activate it:

1. Log in to your Prerendering dashboard.
2. Click **Prefetching**.
3. Click **Configuration**.
4. Click the **Actions icon**.
5. In **Cron Expression for Scheduling**, enter the cron expression that will dictate how often the job runs.
6. In **Devices**, select the devices that you want to prefetch pages for.
7. Click **Add**.

![Prerendering Add Prefetching Configuration](/img/prerendering/add-prefetch-configuration.png)

</TabItem>
<TabItem value="api" label="REST API">

[Create a prefetching configuration](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--prefetch-configs/post).

</TabItem>
</Tabs>

## Edit Prefetching Configuration

<Tabs groupId="operating-systems3">
<TabItem value="console" label="Web Console">

Follow these instructions to edit a prefetching in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Prefetching**.
3. Click **Configuration**.
4. Click the **Actions icon**.
5. In **Cron Expression for Scheduling**, enter or update the cron expression.
6. In **Devices**, select the devices that you want to prefetch pages for.
7. Click **Update**.

![Prerendering Update Prefetching Configuration](/img/prerendering/update-prefetching-configuration.png)

</TabItem>
<TabItem value="api" label="REST API">

[Get prefetching configuration](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--prefetch-configs/get).

</TabItem>
</Tabs>

## Delete Prefetching Configuration

[Delete a prefetching configuration](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--prefetch-configs/delete).
