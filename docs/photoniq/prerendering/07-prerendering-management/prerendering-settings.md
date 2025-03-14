---
sidebar_position: 80
title: Manage Advanced Settings
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You have several options for viewing and managing Prerender settings.

- **Advanced Settings tab** - You can view settings for an origin in Advanced Settings tab in the web console.
- **REST API** - Macrometa provides several API calls that allow you to view and manage origin settings.

:::note
Each setting is explained in detail in the Prerender web console. We strongly recommend that you review the setting and consult with Macrometa Support before making any changes.
:::

## View and Manage Settings

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view prerendering activity in the web console.

1. Log in to your Prerender dashboard.
2. Click **Advanced Setting**.
3. Select the origin for which you want to view settings.
4. Scroll down to the setting that you want to view.
5. Update settings by clicking toggles or editing lists, depending on the setting.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference to:

- [Get Prerender settings](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--settings/get).
- [Update Prerender settings](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--settings/patch)
- [Get all origin settings](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins/get)
- [Get settings for an origin](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin/get)
- [Update origin settings](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin/patch)

</TabItem>
</Tabs>

## Optimizing with Advanced Settings

Configuring settings available in the Advanced settings tab allows you to optimize how Prerender renders your pages.

### Optimized Rendering for Different Crawling Bots

Use these settings to optimize rendering for desktop or mobile. Fields include:

- Screen Resolution
- User Agent
- Status

![Optimized Rendering for Different Crawling Bots](/img/prerendering/optimizing-rendering-for-different-bots.png)

### Optimizing Rendering Timeouts

Configure the rendering timeout to best suit your needs.

![Optimizing Rendering Timeouts](/img/prerendering/optimizing-rendering-timeouts.png)

### Fonts Blocking

You can block fonts to speed up rendering.

![Fonts Blocking](/img/prerendering/fonts-blocking.png)

### Stylesheet Blocking

You can block stylesheets to speed up load times.

![Stylesheet Blocking](/img/prerendering/stylesheet-blocking.png)

### Inject Styled Components CSS

You can inject styled components into the head element to improve styles, but it slows down page rendering. This setting can be useful when you are testing.

![Inject Styled Components CSS](/img/prerendering/inject-styled-components-css.png)

### URL Block List

You can block specific external URLs during rendering. Click **Edit** to update the list.

![URL Block List](/img/prerendering/url-block-list.png)

### Allow Origin Header Value

In the web console, this displays the origin allowlist value if one is set. For more information about allowlist headers, refer to [Allowlist-Based Header Values](../03-features/02-prerendering-headers/allowlist-value-headers.md).

![Allow Origin Header Value](/img/prerendering/allow-origin-header-value.png)

### Add Response Header

In the web console, this displays current header keys and values. For more information about headers, refer to [Prerendering Headers](../03-features/02-prerendering-headers/index.md).

![Add Response Header](/img/prerendering/add-response-header.png)

### Pass-through Headers

You can specify headers from a bot's request to be sent directly to the Prerender service. Click **Edit** to update the list.

![Pass-through Headers](/img/prerendering/pass-through-headers.png)

### Follow Redirect

This settings dictates how Prerender handles redirects based on the selected strategy. To select a strategy:

1. Scroll to **Follow Redirect** from the **Advanced Settings** tab.
1. Select a strategy.
1. Click **Save**

![follow redirect](/img/prerendering/follow-redirect.png)
