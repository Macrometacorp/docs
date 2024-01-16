---
sidebar_position: 60
title: EST Settings
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You have several options for viewing and managing Edge Side Tagging settings.

- **Settings tab** - You can view and manage EST settings in the Settings tab in the web console.
- **REST API** - Macrometa provides several API calls that allow you to view and manage EST settings.

:::note
We strongly recommend that you review the setting and consult with Macrometa Support before making any changes.
:::

## View Settings

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view EST activity in the web console.

1. Log in to your Edge Side Tagging dashboard.
2. Click **Setting**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to: [get EST settings](http://localhost:3000/docs/apiEst#/paths/api-est-v1-settings/get).

</TabItem>
</Tabs>

## Create Settings

REVIEWERS - What does creating settings do? Is this creating a new EST origin? Why can't we do it in the UI?

Use our interactive API Reference with code generation in 18 programming languages to: [create EST settings](http://localhost:3000/docs/apiEst#/paths/api-est-v1-settings/post).

## Update Settings

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view EST activity in the web console.

1. Log in to your Edge Side Tagging dashboard.
2. Click **Setting**.
3. Make changes to the setting you want to update and then click **Update**. If you make a mistake and want to undo it before you click **Update**, then click **Revert**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to: [get EST settings](http://localhost:3000/docs/apiEst#/paths/api-est-v1-settings/patch).

</TabItem>
</Tabs>

## Delete Settings

REVIEWERS - What does deleting settings do? Is this deleting an EST origin? Why can't we do it in the UI?

Use our interactive API Reference with code generation in 18 programming languages to: [delete EST settings](http://localhost:3000/docs/apiEst#/paths/api-est-v1-settings/delete).

## Edge Side Tagging Settings

Edge Side Tagging provides the following settings. Field names in the web console are different than those in the API responses.

![EST Settings](/img/photoniq/est/est-settings.png)

### Cookies Settings


### Origin Settings

In the **Origin** field, enter the origin 
