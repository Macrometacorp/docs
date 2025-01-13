---
title: Update a Graph
sidebar_position: 60
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page describes various methods of updating Macrometa graphs. While you cannot change the name of the graph after it is created, you can add or remove edge definitions and vertex collections.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to update a graph using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **Data > Graphs**.
1. Click **Edit** next to the graph that you want to edit.
1. Make any changes to the edge definitions and vertex collections, and then click **Update**.

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl graph update](../../../developer-hub/cli/graph-cli#gdnsl-graph-update) CLI command to update settings or collections of a graph.

</TabItem>
</Tabs>
