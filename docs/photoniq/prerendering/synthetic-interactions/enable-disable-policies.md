---
sidebar_position: 80
title: Enable/Disable Policies
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You have several options for enabling and disabling Prerendering synthetic interaction policies.

- **Synthetic Interactions tab** - You can view enable or disable interaction policies for an origin on the Synthetic Interactions tab in the web console.
- **REST API** - Macrometa provides an API call that allows you to enable or disable interaction policies for an origin.

## Enable or Disable All Policies

Follow these instructions to enable or disable all synthetic interaction policies of a particular type in the web console. There is no API endpoint to perform this task.

1. Log in to your Prerendering dashboard.
2. Click **Synthetic Interactions**.
3. Select an origin to enable or disable policies for.
4. Click the toggle next to the name of the type of policy that you want to enable or disable.

![Enable or Disable All Synthetic Interactions](/img/prerendering/enable-disable-all-synthetic-interactions.png)

## Enable or Disable Specific Policies

<Tabs groupId="operating-systems2">
<TabItem value="console" label="Web Console">

Follow these instructions to enable or disable specific synthetic interaction policies in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Synthetic Interactions**.
3. Select an origin to enable or disable policies for.
4. Click to expand the type of policy that you want to enable or disable.
5. Click the pencil icon next to the policy that you want to enable or disable.
6. Click the **Active** toggle to enable or disable the interaction.
7. Click **Update**.

   The displayed status changes to reflect the new status, either **Active** or **Inactive**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [update a synthetic interaction](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--interactions--type/patch).

</TabItem>
</Tabs>
