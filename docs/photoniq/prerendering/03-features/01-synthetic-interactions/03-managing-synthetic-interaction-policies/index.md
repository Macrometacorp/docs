---
title: Managing Synthetic Interaction Policies
---

Prerendering allows you to create policies to govern the behavior of synthetic interactions. These policies give you room to customize and specify the HTML tags where these interactions should occur, providing you with control over what content is exposed to bots. Additionally, you can configure multiple interactions per page to cater to complex dynamic sites.

You have several options for managing Prerendering synthetic interaction policies.

- **Synthetic Interactions tab** - You can manage synthetic interaction policies for an origin on the Synthetic Interactions tab in the web console.
- **REST API** - Macrometa provides several API calls that allow you to manage synthetic interaction policies.

## Types of Synthetic Interaction Policies

Synthetic interaction can be _global_ or _specific_.

- A _global_ policy applies to all sites in the origin.
- A _specific_ policy applies only to selected URL paths.


## Enable/Disable Policies

Prerendering offers two methods for enabling and disabling synthetic interaction policies.

- **Synthetic Interactions tab** - Enable or disable interaction policies for an origin on the Synthetic Interactions tab in the web console.
- **REST API** - Macrometa provides an API call that allows you to enable or disable interaction policies for an origin.

### Enable or Disable All Policies

Follow these instructions to enable or disable all synthetic interaction policies of a particular type in the web console. There is no API endpoint to perform this task.

1. Log in to your Prerendering dashboard.
2. Click **Synthetic Interactions**.
3. Select an origin to enable or disable policies for.
4. Click the toggle next to the name of the type of policy to enable or disable.

![Enable or Disable All Synthetic Interactions](/static/img/prerendering/enable-disable-all-synthetic-interactions.png)

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

[Update a synthetic interaction](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--interactions--type/patch).

</TabItem>
</Tabs>
