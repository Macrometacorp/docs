---
sidebar_position: 10
title: Create Stream Workers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to create stream workers in Macrometa, but it assumes you have the code already written. To learn more about writing stream workers, refer to [Stream Worker Basics](../stream-worker-basics/) or look at [Stream Worker Examples](../examples/).

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to create a new stream worker using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **Stream Workers**.
1. If you already have a stream worker written, then paste the code in the Editor tab and skip the following substeps. Otherwise, click **New Stream Worker**.
   1. In the **Name** field, enter a name for your stream worker. No spaces or special characters are allowed except hyphens (-) and underscores (_). Best practice is not write a name that describes what the stream worker does.
   1. (Optional) Enter a description. Best practice is to include a description so that other users (or future you) understand what the stream worker is for.
   1. Click **Create**.

      Macrometa creates metadata with the information that you entered.

1. Enter the rest of your stream worker code.
1. (Optional) Click **Validate**.

   Macrometa validates your stream worker code and displays an error if it is invalid.

1. Click **Save**.
1. Select edge locations to which your stream worker will be deployed and then click **Save**.

   Your stream worker is now created in an unpublished state. To publish it, click **Publish**.

</TabItem>
<TabItem value="sdk" label="SDK">

To see how to create stream workers with the Macrometa Python SDK or JavaScript SDK, refer to the [Stream Workers SDK Example](../examples/stream-workers-sdk-example).

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

1. [Validate a Stream Worker Definition](https://www.macrometa.com/docs/api#/operations/validate)
2. [Create a Stream Worker](https://www.macrometa.com/docs/api#/operations/create) - Note that if you set `isActive` to `true`, then this command publishes the stream worker as well.

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl stream-worker create](../../cli/stream-workers-cli#gdnsl-stream-worker-created) CLI command to validate and create an unpublished stream worker.

</TabItem>
</Tabs>
