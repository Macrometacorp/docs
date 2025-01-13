---
sidebar_position: 20
title: Create Users
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page shows you different methods to create new users on a Macrometa GDN account. You must have appropriate admin permissions to perform this task.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to create a new user using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Access > Users**.
1. Click **New User**.
1. Enter a unique username.
1. Enter the email to be associated with this user account.
1. Enter a password and confirm it.
1. Optionally, choose to create the account as inactive by deselecting **Active**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to 
[Create User](https://www.macrometa.com/docs/api#/operations/CreateUser).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl user](../../developer-hub/cli/users-cli) CLI command to create a user on the Macrometa account.

</TabItem>
</Tabs>
