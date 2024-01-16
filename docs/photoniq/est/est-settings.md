---
sidebar_position: 60
title: EST Settings
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You have several options for viewing and managing Edge Side Tagging settings.

- **Advanced Settings tab** - You can view settings for an origin in Advanced Settings tab in the web console.
- **REST API** - Macrometa provides several API calls that allow you to view and manage origin settings.

:::note
Each setting is explained in detail in the Edge Side Tagging web console. We strongly recommend that you review the setting and consult with Macrometa Support before making any changes.
:::

## View Settings

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view EST activity in the web console.

1. Log in to your Edge Side Tagging dashboard.
2. Click **Advanced Setting**.
3. Select the origin for which you want to view settings.
4. Scroll down to the setting that you want to view

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [Get EST settings](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--settings/get).
- [Get all origin settings](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins/get)
- [Get settings for an origin](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin/get)

</TabItem>
</Tabs>

## Update Settings

Use our interactive API Reference with code generation in 18 programming languages to:

- [Update EST settings](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--settings/patch).
- [Update origin settings](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin/patch)

## Edge Side Tagging Settings

Edge Side Tagging provides the following settings. Field names in the web console are different than those in the API responses. Refer to the API endpoint documentation for a full explanation.