---
sidebar_position: 20
title: Publish/Unpublish Stream Workers
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to publish stream Macrometa workers. After you [create a stream worker](create-stream-worker), you must publish it in order for it to run. If you want to stop it from running, then you can unpublish it.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to publish or unpublish a new stream worker using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
2. Click **Compute > Stream Workers**.
3. Click the **Stream Workers** tab.
4. Find the stream worker you want to publish or unpublish in the stream worker list, and then click the toggle to change its publish status.

</TabItem>
<TabItem value="sdk" label="SDK">

To see how to publish and unpublish (also called activate and deactivate) stream workers with the Macrometa Python SDK or JavaScript SDK, refer to the [Stream Workers SDK Example](../examples/stream-workers-sdk-example#step-4-activate-and-deactivate-stream-worker).

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Publish or Unpublish a Stream Worker](https://www.macrometa.com/docs/api#/operations/enableApplication).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl stream-worker](../../cli/stream-workers-cli) CLI command to publish or unpublish a stream worker.

</TabItem>
</Tabs>
