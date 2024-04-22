---
sidebar_position: 40
title: Monitor and Debug P3 with EST Streams
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Stream feature in Edge Side Tagging (EST) is designed to enhance your tracking and debugging capabilities for third-party tags. This guide explains how to use this feature for debugging and analytics.

:::note
Keep the Stream feature enabled for debugging purposes only when necessary to minimize performance impact.
:::

## Understanding the EST Stream Feature

Turning on EST Stream feature provides access to the Debug tab in the EST dashboard.

Use EST Stream for:

- **Debugging** - Quickly identify and resolve issues with third-party tags by monitoring the real-time data in the Debug tab.
- **Custom Monitoring** - Set up custom alerts or dashboards based on specific events or metrics of interest from the stream data.

### Streaming Data

The EST Stream feature publishes tracking data from third-party tags, which includes user interactions, conversions, and custom events, into a stream. This data is then accessible for real-time monitoring and further analysis.

### Debug Tab

The Debug tab becomes available in the EST dashboard after you turn on the EST Stream feature. It displays the data being pushed into the stream in real-time, giving you immediate visibility into third-party tag behavior. This is especially useful for debugging purposes, because it provides insights into data transmission and potential issues.

## Turn on EST Stream

Follow these steps to turn on the EST Stream feature:

1. Log in to your EST dashboard.
2. Click **Settings**.
3. In the Stream section, click **Enable Stream**.
4. Click **Update**.

   Once enabled, the Debug tab appears in the EST dashboard.
