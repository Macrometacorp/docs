---
sidebar_position: 40
title: Change Password
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page shows you different methods to change user passwords on a Macrometa GDN account. You must have appropriate admin permissions to perform this task.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

On the Users tab, you can select a user to access their details and change their password.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Access > Users**.
1. Click the stacked dots next to the user whose password you want to change.
1. Click **Edit User**.
1. Click **Password** to access the Password tab.
1. Enter and confirm the new password, then click **Save**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Modify User](https://www.macrometa.com/docs/api#/operations/ModifyUser) passwords.

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl user](../../cli/users-cli) CLI command to replace a user password on the Macrometa account.

</TabItem>
</Tabs>
