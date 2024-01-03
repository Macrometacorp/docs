---
sidebar_position: 20
title: View Rendering History
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You have several options for viewing Dynamic Prerendering render history, either aggregated or per origin.

- **Render History tab** - In the Render History tab in the web console, you can view render history for all origins or for a single origin. You can also filter the history view based on HTTP status.
  ![Prerendering Render History Tab](/img/prerendering/render-history.png)
- **REST API** - Macrometa provides several API calls that allow you to view render history for all origins or for one origin. You can also sort and set any time frame that you need.

## View Prerendering Activity

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view render history in the web console.

1. Log in to your Dynamic Prerendering dashboard.
2. Click **Render History**.
3. (Optional) Select a specific origin. Default is **All origins**.
4. (Optional) Apply filters to the list of rendered pages if you want to view only a specific status code.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- Get render history data
- Get render history data by origin
- Get percentile metrics
- Get percentile metrics by origin

</TabItem>
</Tabs>

## Activity Metrics

Dynamic Prerendering provides the following metrics. Field names in the web console are different than those in the API responses.

- Total Requests
- Total Renders
- Failed Renders
- Response Time Percentiles
- Rendered At
- HTTP Status
- Response Time
- URL
- Device
