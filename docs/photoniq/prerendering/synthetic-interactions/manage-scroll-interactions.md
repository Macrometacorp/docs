---
sidebar_position: 20
title: Manage Scroll Interactions
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You have several options for managing Prerendering scroll synthetic interactions.

- **Synthetic Interactions tab** - You can view synthetic interactions for an origin on the Synthetic Interactions tab in the web console.
  ![Prerendering Synthetic Interactions Tab - Scroll](/img/prerendering/synthetic-interactions-scroll.png)
- **REST API** - Macrometa provides several API calls that allow you to view metrics for an origin. You can also sort and set any time frame that you need.

## View Scroll Synthetic Interactions

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view scroll interactions in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Synthetic Interactions**.
3. Select an origin to view scroll synthetic interactions for.
4. Click to expand **Scroll** to view interactions.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [Get all synthetic interactions](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--interactions/get)
- [Get a specific synthetic interaction](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--interactions--type/get)

</TabItem>
</Tabs>

## Scroll Synthetic Interaction Fields

Prerendering provides the following information about scroll synthetic interactions. Field names in the web console are different than those in the API responses. Refer to the API endpoint documentation for a full explanation of the API response.

### Global Configuration

- **Status** - Whether the interaction is active.
- **Steps** - Number of scrolls down to be performed.
- **Delay** - Waiting time (in milliseconds) between scrolls.
- **Actions** - Click the icon to edit an interaction.

### Specifics

- **Status** - Whether the interaction is active.
- **URL Paths** - Origin paths where the specific interaction is evaluated to be executed.
- **Operator** - **Equal** or **Not equal**.
- **Actions** - Click an icon to edit or delete an interaction.

## Add Scroll Interactions

<Tabs groupId="operating-systems3">
<TabItem value="console" label="Web Console">

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [create a synthetic interaction](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--interactions--type/post).

</TabItem>
</Tabs>

## Update Scroll Interactions

<Tabs groupId="operating-systems4">
<TabItem value="console" label="Web Console">

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [update a synthetic interaction](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--interactions--type/patch).

</TabItem>
</Tabs>

## Delete Scroll Interactions

<Tabs groupId="operating-systems5">
<TabItem value="console" label="Web Console">

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [delete a synthetic interaction](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--interactions--type/delete).

</TabItem>
</Tabs>
