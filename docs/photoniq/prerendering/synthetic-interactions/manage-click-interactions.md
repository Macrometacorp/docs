---
sidebar_position: 30
title: Manage Click Interaction Policies
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You have several options for managing Prerendering click synthetic interaction policies.

- **Synthetic Interactions tab** - You can manage synthetic click interaction policies for an origin on the Synthetic Interactions tab in the web console.
  ![Prerendering Synthetic Interactions Tab - Click](/img/prerendering/synthetic-interactions-click.png)
- **REST API** - Macrometa provides several API calls that allow you to manage synthetic click interaction policies.

## View Click Policies

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view click policies in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Synthetic Interactions**.
3. Select an origin to view scroll policies for.
4. Click to expand **Click** to view existing policies.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [Get all synthetic interactions](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--interactions/get)
- [Get a specific synthetic interaction](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--interactions--type/get)

</TabItem>
</Tabs>

## Click Policy Fields

Prerendering provides the following information about click synthetic interaction policies. Field names in the web console are different than those in the API responses. Refer to the API endpoint documentation for a full explanation of the API response.

### Global

Global policies are applied to all origin URLs.

- **Sequence** - Policy execution order.
- **Status** - Whether the policy is active or inactive.
- **HTML Selector** - HTML selector where the policy is executed. For more information about HTML selectors, refer to [Find HTML Selector](find-htmlselector.md).
- **Wait After** - Waiting time (in milliseconds) after the policy is executed.
- **Devices** - Icons indicating whether the policy is for desktop devices, mobile devices, or both.
- **Actions** - Click an icon to edit or delete a policy.

### Specifics

Specific policies are applied only to the URLs specified in the policy. If the policies conflict, then the specific policy takes precedence.

- **Sequence** - Policy execution order.
- **Status** - Whether the policy is active or inactive.
- **URL Paths** - Origin paths where the specific policy is evaluated to be executed.
- **Operator** - **Equal** or **Not equal**.
- **HTML Selector** - HTML selector where the policy is executed. For more information about HTML selectors, refer to [Find HTML Selector](find-htmlselector.md).
- **Wait After** - Waiting time (in milliseconds) after the policy is executed.
- **Devices** - Icons indicating whether the policy is for desktop devices, mobile devices, or both.
- **Actions** - Click an icon to edit or delete a policy.

## Add Click Policies

<Tabs groupId="operating-systems3">
<TabItem value="console" label="Web Console">

Follow these instructions to add a new click policy in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Synthetic Interactions**.
3. Select the origin that you want to create the new policy for.
4. Click **Add Policy**.
5. In the **Interaction Type** field, select **Click**.
6. If you want the policy to be active immediately, then leave the **Active** toggle on. If you want the policy inactive, then click to turn it off.
7. In the **Interaction Scope** field, select one of the following:
   - **Global** - The policy will apply to all origin URLs.
   - **Specific** - (Default) The policy will apply only to specific URL paths.
8. In the **Device Type** field, select one of the following:
   - **Desktop** - Policy will apply only to desktop devices.
   - **Mobile** - Policy will apply only to mobile devices.
   - **All** - (Default) Policy will apply to both desktop and mobile devices.
9. In the **Waiting Time After Interaction Execution** field, enter the time in milliseconds that Prerendering should wait after executing the interaction before executing the next interaction.
10. In the **HTML Selector** field, enter the `htmlSelector` that you want the policy to execute upon.  For more information about HTML selectors, refer to [Find HTML Selector](find-htmlselector.md).
11. (Specific policies only) In **URL Paths**, enter one or more URL paths to which the policy will either apply or be excluded from, depending on which operator you select.
12. (Specific policies only) In the **Operator** field, select on of the following:
    - **Equal** - Applies the policy to all specified URL paths.
    - **Not equal** - Applies the policy to all origin URLs except the specified URL paths.
13. Click **Add Policy**.

![Add Click Policy](/img/prerendering/add-click-policy.png)

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [create a synthetic interaction](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--interactions--type/post).

</TabItem>
</Tabs>

## Update Click Policies

<Tabs groupId="operating-systems4">
<TabItem value="console" label="Web Console">

Follow these instructions to update a click interaction policy in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Synthetic Interactions**.
3. Select the origin for which you want to edit a policy.
4. Click to expand **Click**.
5. In the **Actions** field, click the pencil icon next to the policy that you want to edit.
6. Update any values desired and then click **Update**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [update a synthetic interaction](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--interactions--type/patch).

</TabItem>
</Tabs>

## Update Click Policy Sequence

Follow these instructions to update the order in which click interaction policies are performed in the web console. There is no API endpoint to perform this task.

1. Log in to your Prerendering dashboard.
2. Click **Synthetic Interactions**.
3. Select the origin for which you want to edit a policy.
4. Click to expand **Click**.
5. Click the arrows next to the policies to reorder them.
6. When you are satisfied with the order, click **Update Sequence**.
7. Click **Confirm**.

![Update Click Policy Sequence](/img/prerendering/update-click-policy-sequence.png)

## Delete Click Policies

<Tabs groupId="operating-systems5">
<TabItem value="console" label="Web Console">

Follow these instructions to delete a click interaction policy in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Synthetic Interactions**.
3. Select the origin for which you want to delete a policy.
4. Click to expand **Click**.
5. In the **Actions** field, click the red X icon next to the policy that you want to delete.
6. Click **Confirm**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [delete a synthetic interaction](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--interactions--type/delete).

</TabItem>
</Tabs>
