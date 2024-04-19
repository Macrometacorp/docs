---
sidebar_position: 70
title: Manage 404 Identifiers
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You have several options for viewing Prerendering 404 identifiers currently set on your origins. The 404 identifier is set when an origin is created. When Prerendering encounters a page with this string, it reports a 404 status code.

- **404 Identifier tab** - In the 404 Identifier tab in the web console, you can view information about the 404 identifier assigned to each origin. To add or update 404 identifiers, contact Macrometa Support.
  ![Prerendering 404 Identifier Tab](/img/prerendering/404-identifier.png)
- **REST API** - Macrometa provides API calls that allow you to view origin settings, including 404 identifiers, for all origins or for one origin.

## View 404 Identifiers

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view 404 identifiers in the web console.

1. Log in to your Prerendering dashboard.
2. Click **404 Identifier**.

</TabItem>
<TabItem value="api" label="REST API">

In the API, 404 identifier information is included in the origin settings API. Use our interactive API Reference with code generation in 18 programming languages to:

- [Get origins](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins/get)
- [Get an origin](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin/get)

</TabItem>
</Tabs>

## 404 Identifier Fields

Prerendering provides the following fields in the 404 Identifier tab. Field names in the web console are different than those in the API responses. Refer to the API endpoint documentation for a full explanation of the API response.

- **Origin URL** - URL of the origin.
- **Identifier String** - Text that signals the prerendering bot to set the response code to 404.
- **Date Added** - Date the origin was added.

## Add or Update 404 Identifiers

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to add or update 404 identifiers in the web console.

1. Log in to your Prerendering dashboard.
2. Click **404 Identifier**.
3. In the Actions column, click the pencil icon.
4. In the Update 404 Identifier window, add or edit text and then click **Update**.

![Update 404 Identifier](/img/prerendering/update-404-identifier.png)

</TabItem>
<TabItem value="api" label="REST API">

In the API, 404 identifier information is included in the origin settings API. Use our interactive API Reference with code generation in 18 programming languages to:

- [Get origins](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins/get)
- [Get an origin](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin/get)

</TabItem>
</Tabs>
