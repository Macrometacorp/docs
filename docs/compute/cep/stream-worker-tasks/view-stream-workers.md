---
sidebar_position: 30
title: View Stream Workers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to view Macrometa stream workers. You can view them either as a list or view details of a specific stream worker.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to update a stream worker using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
2. Click **Stream Workers**.
3. Click the **Stream Workers** tab.

   Macrometa displays a list of all saved stream workers.

4. To see details of a stream worker, click the name of a stream worker in the list.

   Macrometa displays the stream worker definition code in the **Preview** pane.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [Fetch a List of All Stream Workers](https://www.macrometa.com/docs/api#/operations/getAll)
- [Fetch a Specific Stream Worker](https://www.macrometa.com/docs/api#/operations/getApplication)

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl stream-worker list](../../../developer-hub/cli/stream-workers-cli#gdnsl-stream-worker-list) CLI command to fetch a list of all existing stream workers.

Use the [gdnsl stream-worker describe](../../../developer-hub/cli/stream-workers-cli#gdnsl-stream-worker-describe) CLI command to fetch details of a specific stream worker.

</TabItem>
</Tabs>
