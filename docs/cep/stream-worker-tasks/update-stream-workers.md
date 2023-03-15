---
sidebar_position: 30
title: Update Stream Workers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to update Macrometa stream workers.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to update a stream worker using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
2. Click **Stream Workers**.
3. Click the **Stream Workers** tab.
4. Find the stream worker you want to update in the stream worker list, then click the pencil icon next to it.

   Macrometa opens the stream worker code in the Editor tab. You can now update the code. To change regions, click **Update Regions**.

5. When finished, click **Update**.

</TabItem>
<TabItem value="sdk" label="SDK">

To see how to update stream workers with the Macrometa Python SDK or JavaScript SDK, refer to the [Stream Workers SDK Example](../examples/stream-workers-sdk-example#step-5-update-stream-worker).

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Update a Stream Worker](https://www.macrometa.com/docs/api#/operations/update).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl stream-worker update](../../cli/stream-workers-cli#gdnsl-stream-worker-update) CLI command to validate and create an unpublished stream worker.

</TabItem>
</Tabs>
