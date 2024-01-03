---
sidebar_position: 10
title: View Origin Settings
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You have several options for viewing Dynamic Prerendering origin settings.

- **Origin Settings tab** - In the Origin Settings tab in the web console, you can view information about each origin. To add a new origin URL, contact Macrometa Support.
  ![Prerendering Origin Settings Tab](/img/prerendering/render-history.png)
- **REST API** - Macrometa provides several API calls that allow you to view origin settings for all origins or for one origin.

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

- **Total Requests** - Total page requests received during the selected time frame.
- **Total Renders** - Total renders successfully performed during the selected time frame.
- **Failed Renders** - Total renders that failed during the selected time frame.
- **Response Time Percentiles** - Response time percentiles in seconds.
- **Rendered At** - When the render was performed.
- **HTTP Status** - HTTP status code received.
- **Response Time** - Amount of time it took to send the response.
- **URL** - Rendered URL. Click the URL to view the page.
- **Device** - Icon indicating whether the render was for desktop or mobile.