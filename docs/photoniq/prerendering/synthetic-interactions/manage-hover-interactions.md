---
sidebar_position: 40
title: Manage Hover Interactions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You have several options for managing Prerendering hover synthetic interaction policies.

- **Synthetic Interactions tab** - You can manage synthetic hover interaction policies for an origin on the Synthetic Interactions tab in the web console.
  ![Prerendering Synthetic Interactions Tab - Hover](/img/prerendering/synthetic-interactions-hover.png)
- **REST API** - Macrometa provides several API calls that allow you to manage synthetic hover interaction policies.

## View Synthetic Interactions

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view prerendering activity in the web console.

1. Log in to your Prerendering dashboard.
2. Click **Synthetic Interactions**.
3. Select an origin to view synthetic interactions for.
4. Click to expand **Scroll**, **Click**, or **Hover** to view interactions.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [Get all synthetic interactions](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--interactions/get)
- [Get a specific synthetic interaction](https://www.macrometa.com/docs/apiPrerendering#/paths/api-prerender-v1-origins-origin--interactions--type/get)

</TabItem>
</Tabs>

## Synthetic Interaction Fields

Prerendering provides the following information about synthetic interactions. Field names in the web console are different than those in the API responses. Refer to the API endpoint documentation for a full explanation of the API response.


### Hover

![Prerendering Synthetic Interactions Tab - Hover](/img/prerendering/synthetic-interactions-hover.png)

#### Global

- **Status** - Whether the interaction is active.
- **Sequence** - Interaction execution order.
- **HTML Selector** - HTML selector where the interaction is executed.
- **Wait After** - Waiting time (in milliseconds) after the interaction is executed.

#### Specifics

- **Status** - Whether the interaction is active.
- **Sequence** - Interaction execution order.
- **URL Paths** - Origin paths where the specific interaction is evaluated to be executed.
- **HTML Selector** - HTML selector where the interaction is executed.
- **Wait After** - Waiting time (in milliseconds) after the interaction is executed.

- Enable/disable all
- Enable/disable specific
- View
- Add
- Update
- delete