---
sidebar_position: 10
title: Manage EST Components
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You have several options for viewing and managing EST components.

- **Origin Settings tab** - In the Components tab in the web console, you can view and manage components.
  ![Components Tab](/img/photoniq/est/components-tab.png)
- **REST API** - Macrometa provides API calls that allow you to view and manage components.

## View Components

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view components and component settings in the web console.

1. Log in to your Edge Side Tagging dashboard.
2. Click **Components**.

   Macrometa displays a list of all components.

3. To view component settings, click the stacked dots on the line of the component that you want to view settings for, and then click **Edit**.

   Macrometa displays component settings.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [Get all component settings](https://www.macrometa.com/docs/apiEst#/paths/api-est-v1-components-settings/get)
- [Get component settings for a specific component](https://www.macrometa.com/docs/apiEst#/paths/api-est-v1-components-settings-component/get)

</TabItem>
</Tabs>

### Fields

- **Name** - Name the component was given when created.
- **Type** - Type of component, such as Bing or Reddit.
- **Activity Last 24 Hours** - Displays activity from the last 24 hours.
- **Status** - Indicates whether the component is active or not. If it is on, then the component is enabled.

## Enable or Disable Components

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to enable or disable components in the web console.

1. Log in to your Edge Side Tagging dashboard.
2. Click **Components**.
3. In the **Status** column, click the toggle to enable or disable the component.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

REVIEWERS - I have no idea which API call I would use for this task based on the API Reference. There is no information.

</TabItem>
</Tabs>

## Add New Components

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to add a new component in the web console.

1. Log in to your Edge Side Tagging dashboard.
2. Click **Components**.
3. Click **New Component**.
4. Click the component that you want to add.
5. Enter a **Component Name** and then click **Continue**.
6. Enable permissions and then click **Continue**. Each component requires different permissions, which are described in the console.
7. Enter any required setup information and then click **Continue**. Each component has different setup fields, which are described in the console.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

REVIEWERS - Do users need to get the component metadata before they add a new component so they know what to enter?

- [Add a new component](https://www.macrometa.com/docs/apiEst#/paths/api-est-v1-components-settings/get)

</TabItem>
</Tabs>

## Edit Component Settings

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to edit component settings in the web console.

1. Log in to your Edge Side Tagging dashboard.
2. Click **Components**.
3. Click the stacked dots on the line of the component that you want to view settings for, and then click **Edit**.
4. Change any settings that you want, and then click **Update**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

REVIEWERS - Do users need to get the component settings before they add a new component so they know what to enter?

- [Edit component settings](https://www.macrometa.com/docs/apiEst#/paths/api-est-v1-components-settings/patch)

</TabItem>
</Tabs>

## Delete Components

Deleting a component cannot be undone.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to delete a component in the web console.

1. Log in to your Edge Side Tagging dashboard.
2. Click **Components**.
3. Click the stacked dots on the line of the component that you want to view settings for, and then click **Delete**.
4. Confirm your choice by clicking **Delete**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

REVIEWERS - Do users need to get the component settings so they know what name to enter for deletion?

- [Delete component settings](https://www.macrometa.com/docs/apiEst#/paths/api-est-v1-components-settings/delete)

</TabItem>
</Tabs>
