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
1. (Optional) Click a user ID to view more details about the user. The following columns show information about each user.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [List Available Users](https://www.macrometa.com/docs/api#/operations/ListAvailableUsers) or [Fetch User Data](https://www.macrometa.com/docs/api#/operations/FetchUser) on a specific user.

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl user](../../cli/users-cli) CLI command to view a list of users on the Macrometa account.

</TabItem>
</Tabs>

## User Properties

Here are some of the properties you will see when you view users. Different methods might return different user information.
### ID

The unique ID for the user. This value is automatically generated.

### Email Address

The email address associated with the user.

### Tenant

The tenant on which the user is hosted.

### Username

The name chosen when the user was created.

### Status

Users are created as active or inactive, and you can activate or deactivate them at a later time.
