---
sidebar_position: 30
title: View Users
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page shows you different methods to view users on a Macrometa GDN account. You must have appropriate admin permissions to perform this task.

## View One or More Users

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

You can view all users of any GeoFabric for which you have read permissions.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Access > Users**.
1. (Optional) Type a query in the **Filter users** field to narrow the search and find a user by their ID, email address, tenant, or username.
1. (Optional) Click the stacked dots next to a user and then click **Edit User** to view more details about the user. The following columns show information about each user.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [List Available Users](https://www.macrometa.com/docs/api#/operations/ListAvailableUsers) or [Fetch User Data](https://www.macrometa.com/docs/api#/operations/FetchUser) on a specific user.

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl user](../../cli/users-cli) CLI command to view a list of users on the Macrometa account.

</TabItem>
</Tabs>

## General User Properties

Here are some of the properties you will see on the General tab when you view users. Different methods might return different user information. You can also 

### Email Address

The email address associated with the user.

### User ID

The unique ID for the user. This value is automatically generated.

### Display Name

The name displayed for the user, which by default is the same as the user ID.

### Account Status

Users are created as active or inactive, and you can activate or deactivate them at a later time.

## Permissions

This tab displays all permissions assigned to the user account. For more information, refer to [Permissions](../permissions/).

## Attributes

This tab displays all attributes assigned to the user account. For more information, refer to [Attributes](../attributes/).

## Password

This tab allows you to change the user password as described in [Change Password](change-password.md).
