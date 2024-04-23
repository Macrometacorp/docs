---
sidebar_position: 20
title: View Prefetching
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You have several options for viewing Prerendering prefetching that is in progress or already completed.

- **Prefetching tab** - In the Prefetching tab in the web console, you can view in-progress prefetching and prefetch history for an origin.
- **REST API** - Macrometa provides a API calls that allow you to view prefetch information.

## View Prefetching in Progress

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view render history in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Prefetching**.
3. Select the origin that you want to view.
4. If necessary, click **In Progress**.

![Prerendering Prefetching In Progress Tab](/img/prerendering/prefetching-in-progress.png)

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [get prefetch URLs](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--prefetch-urls/get)

</TabItem>
</Tabs>

## In Progress Fields

Prerendering provides the following prefetching fields. Field names in the web console are different than those in the API responses. Refer to the API endpoint documentation for a full explanation of the API response.

### Stats

- **Total** - Total number of URLs to be prefetched.
- **Completed** - Number of URLs successfully prefetched.
- **Queued** - Number of URLs queued for prefetch.
- **Failed** - Number of URLs where prefetching failed.
- **Retrying** - Number of URLs retrying prefetch.

### Events

- **Timestamp** - When the prefetch URL was created.
- **Status** - URL status.
- **URL** - Origin URL.
- **Device** - Icon indicating whether the prefetch was rendered for desktop or mobile.

## View Prefetching History

<Tabs groupId="operating-systems2">
<TabItem value="console" label="Web Console">

Follow these instructions to view prefetch history in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Prefetching**.
3. Select the origin that you want to view.
4. If necessary, click **History**.

![Prerendering Prefetching History Tab](/img/prerendering/prefetching-history.png)

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [get prefetch statistics](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-metrics-stats-prefetch-origin/get)

</TabItem>
</Tabs>

## Prefetching History Fields

Prerendering provides the following prefetching history fields. Field names in the web console are different than those in the API responses. Refer to the API endpoint documentation for a full explanation of the API response.

- **Type** - Whether prefetching was scheduled or done manually.
- **Total** - Total number of URLs to be prefetched.
- **Completed** - Number of URLs successfully prefetched.
- **Queued** - Number of URLs queued for prefetch.
- **Failed** - Number of URLs where prefetching failed.
- **Status** - Success status (completed, in progress, failed).
- **Created At** - When the prefetch process was triggered.
