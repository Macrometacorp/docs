---
sidebar_position: 40
title: Remove Attributes from Users
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page shows you different methods to remove attributes from users on your Macrometa GDN account. You must have appropriate admin permissions to perform this task.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to remove attributes from users using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Access > Users** click the stacked dots next to the user for which you want to remove attributes.
1. Click **Edit User**.
1. Click **Attributes**.
1. Click the gray _x_ icon next to the attribute you want to delete.
1. Click **Update**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Remove All Attributes](https://www.macrometa.com/docs/api#/operations/ClearAllAttributesForUser) or [Remove One Attribute](https://www.macrometa.com/docs/api#/operations/ClearTheAttributesForUser).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl user clear](../../cli/api-key-cli#gdnsl-user-clear) CLI command to remove attributes.

</TabItem>
</Tabs>
