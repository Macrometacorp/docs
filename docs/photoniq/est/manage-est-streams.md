---
sidebar_position: 40
title: Monitor and Debug P3 with EST Streams
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Stream feature in Edge Side Tagging (EST) is designed to enhance your tracking and debugging capabilities for third-party tags. By enabling this feature, you can push tracking data from third-party tags into a stream, facilitating real-time monitoring and analysis. This guide explains how to use this feature for debugging and analytics.

:::note
Keep the Stream feature enabled for debugging purposes only when necessary to minimize performance impact.
:::

## Understanding the EST Stream Feature

Turning on EST Stream feature provides access to stream data in real time and the Debug tab in the EST dashboard.

EST Stream is built on Macrometa GDN Streams. For more information about streams, refer to [Macrometa Streams](../../streams/) documentation.

### Streaming Data
The Stream feature pushes tracking data from third-party tags, which includes user interactions, conversions, and custom events, into stream. This data is then accessible for real-time monitoring and further analysis.

Debug Tab
The Debug tab is a dedicated interface in the GUI dashboard that becomes available upon enabling the Stream feature. It displays the data being pushed into the stream in real-time, allowing for immediate visibility into third-party tag behavior. This is especially useful for debugging purposes, as it provides insights into data transmission and potential issues.

## Turn on EST Stream

Log in to your EST account.
Navigate to the Settings tab of the dashboard.
On the Stream section, Toggle Enable Stream and click update to enable the Stream feature.
Once enabled, the Debug tab will automatically appear in your GUI dashboard.

## Subscribe to the EST Stream

Other applications or products can subscribe to the data stream for analytics or monitoring purposes. To subscribe:
Get access to EST stream: Follow this document to know more (https://www.macrometa.com/docs/streams/getting-started-streams).
Configure and subscribe to `est_stream`. You may filter the data types or events you wish to receive.
Integrate with Your Application: Utilize the stream data by integrating it into your analytics or monitoring systems. This may involve parsing the data, setting up alerts, or creating custom dashboards.
