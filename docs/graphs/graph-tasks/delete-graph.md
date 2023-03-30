---
title: Delete a Graph
sidebar_position: 60
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains different ways to delete a graph in Macrometa GDN.

:::caution
Deleting a graph cannot be undone!
:::

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to create a new collection using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
2. Click **Graphs**.
3. Next the graph that you want to delete, click **Edit**.
4. Click **Delete**.
5. When the system asks you to confirm your choice, it also displays a checkbox with the option to also drop collections.

   If you select this checkbox, then Macrometa also deletes any edge or vertex collections associated with the graph that are not associated with other graphs.

   Make your selection, and then click **Yes**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Delete (Remove) a Graph](https://www.macrometa.com/docs/api#/operations/DropAGraph).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl graph delete](../../cli/graph-cli#gdnsl-graph-delete) CLI command to create a delete a graph.

</TabItem>
</Tabs>
