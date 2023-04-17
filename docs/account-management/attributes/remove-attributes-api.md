---
sidebar_position: 50
title: Remove Attributes from API Keys
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page shows you different methods to remove attributes from Macrometa GDN API keys. You must have appropriate admin permissions to perform this task.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to remove attributes from API keys using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Access > API Keys**.
1. Click the ID of the API key for which you want to remove attributes.
1. On the **Attributes** tab, click the gray _x_ icon next to the attribute you want to delete.
1. Click **Update**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Remove All Attributes](https://www.macrometa.com/docs/api#/operations/ClearAllAttributesForApiKey) or [Remove One Attribute](https://www.macrometa.com/docs/api#/operations/ClearTheAttributesForApiKey).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl apikey clear](../../cli/api-key-cli#gdnsl-apikey-clear) CLI command to remove attributes.

</TabItem>
</Tabs>
