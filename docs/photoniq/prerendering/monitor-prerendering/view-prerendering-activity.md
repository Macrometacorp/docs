---
sidebar_position: 10
title: View Prerendering Activity
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You have several options for viewing Prerendering activity, either aggregated or per origin.

- **Activity tab** - You can view activity metrics for all origins or for one origin on the Activity tab in the web console. You can view metrics for the last day, the last week, or the last month.
  ![Prerendering Activity Tab](/img/prerendering/activity-tab.png)
- **REST API** - Macrometa provides several API calls that allow you to view metrics for all origins or for one origin. You can also sort and set any time frame that you need.

## View Prerendering Activity

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view prerendering activity in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Activity**.
3. (Optional) Select a specific origin. Default is **All origins**.
4. (Optional) Select a time frame. Default is **Last Day**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [Get render-stats metrics](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-metrics-stats-render/get)
- [Get render-stats metrics by origin](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-metrics-stats-render-origin/get)
- [Get usage metrics](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-usage-aggregationType/get)
- [Get usage metrics by origin](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-usage-aggregationType---origin/get)

</TabItem>
</Tabs>

## Activity Metrics

Prerendering provides the following metrics. Field names in the web console are different than those in the API responses. Refer to the API endpoint documentation for a full explanation of the API response.

- **Renders** - Total number of renders performed.
- **Requests per Second** - Number of renders performed per second.
- **Requests** - Total number of page requests received.
- **Cache Hits** - Number of requests served from the cache.
- **Cache Misses** - Number of requests that were not in the cache and were dynamically rendered instead.
- **Prefetches** - Number of prefetched pages served.
- **Failed Requests** - Number of requests that were not served by rendered pages.
- **Response Size** - Sum of all response sizes.
- **Origins** - Number of origins with pages rendered.
