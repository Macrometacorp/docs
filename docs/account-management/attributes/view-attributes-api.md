---
sidebar_position: 15
title: View API Key Attributes
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page shows you different methods to view attributes assigned to Macrometa GDN API keys. You must have appropriate admin permissions to perform this task.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view API key attributes using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Access > API Keys**.
1. Click the ID of the API key for which you want to view attributes.
1. Click **Attributes**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Get API Key Attributes](https://www.macrometa.com/docs/api#/operations/GetTheAttributesForApiKey).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl apikey get](../../cli/api-key-cli#gdnsl-apikey-set) CLI command to get user attributes.

</TabItem>
<TabItem value="c8ql" label="C8QL">

Use the [CURRENT_APIKEY_ATTRIBUTE](../../queries/c8ql/functions/database.md#current_apikey_attribute) to return user attributes with a C8QL query.

</TabItem>
</Tabs>
