---
sidebar_position: 60
title: Delete Stream Workers
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to delete Macrometa stream workers.

:::warning
Deleting a stream worker cannot be undone. You cannot recover a deleted stream worker, you can only re-create it.
:::

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to delete a new stream worker using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
2. Click **Stream Workers**.
3. Click the **Stream Workers** tab.
4. Find the stream worker you want to delete in the stream worker list, then click the red minus icon next to it.
5. Macrometa asks you to confirm deletion. Click **Yes**.

</TabItem>
<TabItem value="sdk" label="SDK">

To see how to delete stream workers with the Macrometa Python SDK or JavaScript SDK, refer to the [Stream Workers SDK Example](../examples/basic-examples/stream-workers-sdk-example#step-7-delete-stream-worker).

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Delete a Stream Worker](https://www.macrometa.com/docs/api#/operations/delete).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl stream-worker delete](../../cli/stream-workers-cli#gdnsl-stream-worker-delete) CLI command to delete a stream worker.

</TabItem>
</Tabs>
