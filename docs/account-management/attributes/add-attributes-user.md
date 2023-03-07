---
sidebar_position: 20
title: Add Attributes to Users
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page shows you different methods to add attributes to users on your Macrometa GDN account. You must have appropriate admin permissions to perform this task.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to add attributes to users using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Accounts**.
3. On the Users tab, click the stacked dots next to the user for which you want to limit permissions.
4. Click **Edit User**.
5. Click **Attributes** and provide the following details:
    - **Attribute -** First level of permission. For example, `employee`.
    - **Value -** Second level of permission. For example, `staff` or `admin`.
6. Click **Add Attribute** if you want to add more attributes.
7. Click **Update**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Update User Attributes](https://www.macrometa.com/docs/api#/operations/CreateTheAttributesForUser).

</TabItem>
</Tabs>
