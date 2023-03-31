---
title: Manage Graph Vertices
sidebar_position: 80
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains various methods for managing vertices, also called nodes, in your Macrometa graphs.

## Create a Vertex

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to create a graph vertex using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **Graphs**.
1. Click the graph that you want to create a vertex for.
1. Click an empty space on the canvas, then click the plus sign that appears.
1. (Optional) In the **Create node** window, enter the vertex **_key**. If you do not enter a key, then Macrometa automatically generates one for you.
1. In the **Create node** window, select the **Collection** to add the vertex to.
1. Click **Create**.

   A new vertex appears on the canvas and a new vertex record appears in the collection that you selected. You can now edit the vertex to add attributes or connect the vertex to other vertices with edges.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Create a Vertex](https://www.macrometa.com/docs/api#/operations/CreateAVertex).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl graph vertex create](../../cli/graph-vertex-cli#gdnsl-graph-vertex-create) CLI command to create a new graph vertex.

</TabItem>
</Tabs>

## View a Vertex

## Update a Vertex

## Replace a Vertex

## Delete a Vertex

## List Vertex Collections

## Add a Vertex Collection

## Remove a Vertex Collection
