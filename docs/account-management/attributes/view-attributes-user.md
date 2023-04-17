---
sidebar_position: 10
title: View User Attributes
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page shows you different methods to view attributes assigned to users on your Macrometa GDN account. You must have appropriate admin permissions to perform this task.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view user attributes from users using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Access > Users**.
3. Click the stacked dots next to the user for which you want to view attributes.
4. Click the **Attributes** tab.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Get User Attributes](https://www.macrometa.com/docs/api#/operations/GetTheAttributesForUser).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl user get](../../cli/users-cli#gdnsl-user-get) CLI command to get user attributes.

</TabItem>
<TabItem value="c8ql" label="C8QL">

Use the [CURRENT_USER_ATTRIBUTE](../../queries/c8ql/functions/database.md#current_user_attribute) to return user attributes with a C8QL query.

</TabItem>
</Tabs>
