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
2. Click **Settings**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [get EST settings](http://localhost:3000/docs/apiEst#/paths/api-est-v1-settings/get).

</TabItem>
</Tabs>

## Create and Update Settings

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view EST activity in the web console.

1. Log in to your Edge Side Tagging dashboard.
2. Click **Settings**.
3. Make changes to the setting you want to update and then click **Update**. If you make a mistake and want to undo it before you click **Update**, then click **Revert**.
4. (Optional) You can add multiple, comma-separated origins in the **Origin** field.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [Create EST settings](http://localhost:3000/docs/apiEst#/paths/api-est-v1-settings/post) - Do this for each origin.
- [Update EST settings](http://localhost:3000/docs/apiEst#/paths/api-est-v1-settings/patch)

</TabItem>
</Tabs>

## Edge Side Tagging Settings

Edge Side Tagging provides the following settings. Field names in the web console are different than those in the API responses.

![EST Settings](/img/photoniq/est/est-settings.png)

### Cookies Settings

Define how EST handles cookies.

- **Same Site** - Instructs the browser on when to send the cookie in cross-site requests. EST supports `strict` and `none`.
- **Secure** - Attribute in cookie settings is a security feature that instructs web browsers to only send the cookie through secure channels.

### Origin Settings

In the **Origin** field, enter the origin that will connect to the EST service.
