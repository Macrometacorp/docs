---
title: View Graphs
sidebar_position: 60
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to view Macrometa graphs.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to view graphs using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **Data > Graphs**.

   Macrometa displays a list of graphs.

1. To see the collections that make up the graph, click **Edit**.
1. To view the actual graph, click the name of the graph.

   Macrometa displays the graph. Initially, Macrometa only loads part of the graph. This helps avoid memory issues with larger graphs.

To display the full graph:

1. While viewing a graph, click **Load Full Graph**, then confirm the choice.

   Using your mouse or the icons in the lower right corner, you can zoom in and out or reposition the graph on your screen.

1. To make the graph appear more structured, click the play (triangle) icon in the lower right. Click the stop (square) icon when the structure looks set.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [List All Graphs](https://www.macrometa.com/docs/api#/operations/ListAllGraphs)
- [Get Information About a Specific Graph](https://www.macrometa.com/docs/api#/operations/GetAGraph)

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl graph list](../../cli/graph-cli#gdnsl-graph-list) CLI command to view a list of graphs that exist in your current geofabric.

Use the [gdnsl graph describe](../../cli/graph-cli#gdnsl-graph-describe) CLI command to view the details of a specific graph.

</TabItem>
</Tabs>
