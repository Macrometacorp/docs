---
sidebar_position: 30
title: Add Attributes to API Keys
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page shows you different methods to add attributes to Macrometa GDN API keys. You must have appropriate admin permissions to perform this task.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to add attributes to API keys using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Accounts**.
1. On the API Keys tab, click the ID of the API key for which you want to limit permissions.
1. Click **Attributes** and provide the following details:
    - **Attribute -** First level of permission. For example, `employee`.
    - **Value -** Second level of permission. For example, `staff` or `admin`.
1. Click **Add Attribute** if you want to add more attributes.
1. Click **Update**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Update API Key Attributes](https://www.macrometa.com/docs/api#/operations/UpdateTheAttributesForApiKey).

</TabItem>
</Tabs>
