---
sidebar_position: 30
title: Update API Keys
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page describes how to update API keys. Once you log in to a Macrometa account, you can view all API keys that you have access to. If you have appropriate permissions, then you can also update them.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

1. Log in to your [Macrometa account](https://auth-play.macrometa.io/).
1. Click **Access > API Keys**.
1. Click the API key in the list that you want to change permissions for.
1. On the Permissions tab, select the option for the permissions you want to assign.

   Refer to [Permissions](../permissions/index.md) for information about each permission level.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to perform API key updates.

Refer to the [API Keys section](https://www.macrometa.com/docs/api#/operations/ValidateApiKey) in the API reference docs for a full list of commands.

Refer to [Permissions](index.md) for information about each permission level.

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl apikey set](../../cli/api-key-cli#gdnsl-apikey-set) CLI command to update API key permissions.

Refer to [Permissions](../permissions/index.md) for information about each permission level.

</TabItem>
</Tabs>
