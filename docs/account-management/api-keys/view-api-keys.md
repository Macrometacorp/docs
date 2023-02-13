---
sidebar_position: 20
title: View API Keys
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page describes how to view API keys and their attributes or permissions.

Once you log in to a Macrometa account, you can view all API keys that you have access to. [Update API Keys](update-api-keys.md)

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

To see a list of existing API keys:

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Account**.
1. Click the **API Keys** tab.
1. (Optional) Click the ID of an API key to view its details. The following columns show information about each API key.

   - **ID -** The unique ID for the user. This value is chosen by the creator of the API key.
   - **Tenant -** The tenant on which the API key is hosted.
   - **Username -** The username of the account that created the API key.

To see API key permissions:

1. Log in to your [Macrometa account](https://auth-play.macrometa.io/).
1. Click **Account**.
1. Click the **API Keys** tab.
1. Click the API key in the list that you want to change permissions for.

   Macrometa displays permissions for that API key. Refer to [Permissions](../permissions/index.md) for information about each permission level.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to perform API key updates.

Refer to the [API Keys section](https://www.macrometa.com/docs/api#/operations/ValidateApiKey) in the API reference docs for a full list of commands.

Refer to [Permissions](index.md) for information about each permission level.

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl apikey](../../cli/api-key-cli) CLI command to view and validate API keys.

Use the [gdnsl apikey get](../../cli/api-key-cli#gdnsl-apikey-get) CLI command to view API key access levels.

Refer to [Permissions](../permissions/index.md) for information about each permission level.

</TabItem>
</Tabs>
