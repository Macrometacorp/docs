---
sidebar_position: 20
title: Manage Scroll Interaction Policies
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You have several options for managing Prerendering scroll synthetic interaction policies.

- **Synthetic Interactions tab** - You can manage synthetic scroll interaction policies for an origin on the Synthetic Interactions tab in the web console.
  ![Prerendering Synthetic Interactions Tab - Scroll](/img/prerendering/synthetic-interactions-scroll.png)
- **REST API** - Macrometa provides several API calls that allow you to manage synthetic scroll interaction policies.

## View Scroll Policies

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view scroll policies in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Synthetic Interactions**.
3. Select an origin to view scroll policies for.
4. Click to expand **Scroll** to view existing policies.

</TabItem>
<TabItem value="api" label="REST API">

- [Get all synthetic interactions](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--interactions/get)
- [Get a specific synthetic interaction](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--interactions--type/get)

</TabItem>
</Tabs>

## Scroll Policy Fields

Prerendering provides the following information about scroll synthetic interaction policies. Field names in the web console are different than those in the API responses. Refer to the API endpoint documentation for a full explanation of the API response.

### Global Configuration

The global configuration applies to all origin URLs unless it is overriden by a specific scroll policy.

- **Status** - Whether the policy is active or inactive.
- **Steps** - Number of scrolls down to be performed.
- **Delay** - Waiting time (in milliseconds) between scrolls.
- **Actions** - Click the icon to edit a configuration. You cannot deactivate or delete scroll global configurations.

### Specifics

If a specific scroll policy is applied to a URL, then the global configuration will not be applied. The specific policy is applied instead.

- **Status** - Whether the policy is active or inactive.
- **URL Paths** - Origin paths where the specific policy is evaluated to be executed.
- **Operator** - **Equal** or **Not equal**.
- **Actions** - Click an icon to edit or delete a policy.

## Add Scroll Policies

<Tabs groupId="operating-systems3">
<TabItem value="console" label="Web Console">

Follow these instructions to add a new scroll policy in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Synthetic Interactions**.
3. Select the origin that you want to create the new policy for.
4. Click **Add Policy**.
5. In the **Interaction Type** field, select **Scroll**.
6. If you want the policy to be active immediately, then leave the **Active** toggle on. If you want the policy inactive, then click to turn it off.
7. Leave the **Interaction Scope** on the default **Specific**. You cannot create global scroll interaction policies.
8. In **URL Paths**, enter one or more URL paths to which the policy will either apply or be excluded from, depending on which operator you select.
9. In the **Operator** field, select on of the following:
    - **Equal** - Applies the policy to all specified URL paths.
    - **Not equal** - Applies the policy to all origin URLs except the specified URL paths.

10. Click **Add Policy**.

![Add Scroll Policy](/img/prerendering/add-scroll-policy.png)

</TabItem>
<TabItem value="api" label="REST API">

[Create a synthetic interaction](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--interactions--type/post).

</TabItem>
</Tabs>

## Update Scroll Global Configuration

<Tabs groupId="operating-systems4">
<TabItem value="console" label="Web Console">

Follow these instructions to update a scroll global configuration in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Synthetic Interactions**.
3. Select the origin for which you want to edit the global configuration.
4. Click to expand **Scroll**.
5. In the **Actions** field, click the pencil icon next to the global configuration that you want to edit.
6. Update any values desired and then click **Update**.

![Edit Scroll Global Configuration](/img/prerendering/update-scroll-global-config.png)

</TabItem>
<TabItem value="api" label="REST API">

[Update a synthetic interaction](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--interactions--type/patch).

</TabItem>
</Tabs>

## Update Specific Scroll Policies

<Tabs groupId="operating-systems4">
<TabItem value="console" label="Web Console">

Follow these instructions to update a scroll interaction policy in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Synthetic Interactions**.
3. Select the origin for which you want to edit a policy.
4. Click to expand **Scroll**.
5. In the **Actions** field, click the pencil icon next to the policy that you want to edit.
6. Update any values desired and then click **Update**.

</TabItem>
<TabItem value="api" label="REST API">

[Update a synthetic interaction](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--interactions--type/patch).

</TabItem>
</Tabs>

## Delete Specific Scroll Policies

<Tabs groupId="operating-systems5">
<TabItem value="console" label="Web Console">

Follow these instructions to delete a specific scroll interaction policy in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Synthetic Interactions**.
3. Select the origin for which you want to delete a policy.
4. Click to expand **Scroll**.
5. In the **Actions** field, click the red X icon next to the policy that you want to delete.
6. Click **Confirm**.

</TabItem>
<TabItem value="api" label="REST API">

[Delete a synthetic interaction](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--interactions--type/delete).

</TabItem>
</Tabs>
