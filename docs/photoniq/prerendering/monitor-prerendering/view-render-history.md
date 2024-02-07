---
sidebar_position: 20
title: View Rendering History
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You have several options for viewing Prerendering render history, either aggregated or per origin.

- **Render History tab** - In the Render History tab in the web console, you can view render history for all origins or for a single origin. You can also filter the history view based on HTTP status.
  ![Prerendering Render History Tab](/img/prerendering/render-history.png)
- **REST API** - Macrometa provides several API calls that allow you to view render history for all origins or for one origin. You can also sort and set any time frame that you need.

## View Render History

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view render history in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Render History**.
3. (Optional) Select a specific origin. Default is **All origins**.
4. (Optional) Apply filters to the list of rendered pages if you want to view only a specific status code.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [Get render history data](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-history-render/get)
- [Get render history data by origin](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-history-render-origin/get)
- [Get response time percentiles](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-metrics-percentiles-responsetime/get)
- [Get response time percentiles by origin](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-metrics-percentiles-responsetime-origin/get)

</TabItem>
</Tabs>

## Render History Metrics

Prerendering provides the following metrics. Field names in the web console are different than those in the API responses. Refer to the API endpoint documentation for a full explanation of the API response.

- **Total Requests** - Total page requests received during the selected time frame.
- **Total Renders** - Total renders successfully performed during the selected time frame.
- **Failed Renders** - Total renders that failed during the selected time frame.
- **Response Time Percentiles** - Response time percentiles in seconds.
- **Rendered At** - When the render was performed.
- **HTTP Status** - HTTP status code received.
- **Response Time** - Amount of time it took to send the response.
- **URL** - Rendered URL. Click the URL to view the page.
- **Device** - Icon indicating whether the render was for desktop or mobile.
