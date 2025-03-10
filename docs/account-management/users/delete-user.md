---
sidebar_position: 50
title: Delete User Accounts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page shows you different methods to delete or remove users from a Macrometa GDN account. You must have appropriate admin permissions to perform this task.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

On the Users tab, you can select a user to access their details and delete the account.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Access > Users**.
1. Click the stacked dots next to the user that you want to delete.
1. Click **Remove User** and then click **Delete** to confirm.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to 
[Remove User](https://www.macrometa.com/docs/api#/operations/RemoveUser).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl user](../../developer-hub/cli/users-cli) CLI command to delete a user from the Macrometa account.

</TabItem>
</Tabs>
