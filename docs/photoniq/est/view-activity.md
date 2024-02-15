---
sidebar_position: 25
title: View EST Activity
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You have several options for viewing EST activity.

- **Activity Settings tab** - In the Activity tab in the web console, you can view EST activity.
- **REST API** - Macrometa provides API calls that allow you to view EST activity.

## View Request Traffic

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

1. Log in to your Edge Side Tagging dashboard.
2. Click **Components**.
3. Scroll down to Request Traffic.

    This section displays the total requests, including requests for metrics and page views, for the following time periods:

   - **Current Hour** - The current hour, starting from `X:00`. For example, if the current time is 4:23, then the total requests for the last 23 minutes are displayed.
   - **Last 24 Hours** - The previous full 24 hours. For example, if it is currently Thursday, then the total requests from Wednesday are displayed.
   - **Last 30 Days** - The previous full 30 days. For example, if it is currently June, then the total requests from Wednesday are displayed.

![Activity Tab - Request Traffic](/img/photoniq/est/activity-request-traffic.png)

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [View Hourly Usage Metrics](https://www.macrometa.com/docs/apiEst#/paths/api-est-v1-usage-hourly/get)
- [View Daily Usage Metrics](https://www.macrometa.com/docs/apiEst#/paths/api-est-v1-usage-daily/get)
- [View Monthly Usage Metrics](https://www.macrometa.com/docs/apiEst#/paths/api-est-v1-usage-monthly/get)

</TabItem>
</Tabs>

## View Event Metrics

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

1. Log in to your Edge Side Tagging dashboard.
2. Click **Components**.
3. Scroll down to Activity Summary and select a time period for which you want to view events:

   - **Current Hour** - The current hour, starting from `X:00`. For example, if the current time is 4:23, then metrics and logs for the last 23 minutes are displayed.
   - **Last 24 Hours** - The previous full 24 hours. For example, if it is currently Thursday, then metrics and logs from Wednesday are displayed.
   - **Last 30 Days** - The previous full 30 days. For example, if it is currently June, then metrics and logs from Wednesday are displayed.

4. Scroll down to Event Metrics.

    This section displays the total event count for third-party tag requests made during the selected time period.

   - **Total Events** - Total number of events recorded on the tracked page.
   - **Pageviews** - Number of times a user viewed a tracked page.
   - **Clicks** - Number of times a user clicked on a tracked page page.
   - **Other Events** - Count of events such as scrolls.

![Activity Tab - Event Metrics](/img/photoniq/est/activity-event-metrics.png)

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [View Hourly Activity Metrics](https://www.macrometa.com/docs/apiEst#/paths/api-est-v1-activity-hourly/get)
- [View Daily Activity Metrics](https://www.macrometa.com/docs/apiEst#/paths/api-est-v1-activity-daily/get)
- [View Monthly Activity Metrics](https://www.macrometa.com/docs/apiEst#/paths/api-est-v1-activity-monthly/get)

</TabItem>
</Tabs>

## System Update Log

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

1. Log in to your Edge Side Tagging dashboard.
2. Click **Components**.
3. Scroll down to System Update Log.

    This section displays the timestamp and description of changes to the EST components and settings made during the selected time period.

![Activity Tab - System Update Log](/img/photoniq/est/system-update-log.png)

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [view change history](https://www.macrometa.com/docs/apiEst#/paths/api-est-v1-change-history/get).

</TabItem>
</Tabs>

## Error Metrics

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

1. Log in to your Edge Side Tagging dashboard.
2. Click **Components**.
3. Scroll down to Activity Summary and select a time period for which you want to view events:

   - **Current Hour** - The current hour, starting from `X:00`. For example, if the current time is 4:23, then metrics and logs for the last 23 minutes are displayed.
   - **Last 24 Hours** - The previous full 24 hours. For example, if it is currently Thursday, then metrics and logs from Wednesday are displayed.
   - **Last 30 Days** - The previous full 30 days. For example, if it is currently June, then metrics and logs from Wednesday are displayed.

4. Scroll down to Error Metrics.

    This section displays the name and number of errors detected during the selected time period.

![Activity Tab - Error Metrics](/img/photoniq/est/error-metrics.png)

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [View Hourly Error Metrics](https://www.macrometa.com/docs/apiEst#/paths/api-est-v1-error-hourly/get)
- [View Daily Error Metrics](https://www.macrometa.com/docs/apiEst#/paths/api-est-v1-error-daily/get)
- [View Monthly Error Metrics](https://www.macrometa.com/docs/apiEst#/paths/api-est-v1-error-monthly/get)

</TabItem>
</Tabs>
