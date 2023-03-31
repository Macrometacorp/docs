---
title: Manage Graph Vertices
sidebar_position: 80
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains various methods for managing vertices, also called nodes, in your Macrometa graphs.

## Create a Vertex

These instructions provide several methods of creating a new vertex in an existing graph.

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

These instructions provide several methods of viewing a graph vertex.

<Tabs groupId="operating-systems2">
<TabItem value="console" label="Web Console">

Follow these instructions to view a graph vertex using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
2. Click **Graphs**.
3. Click the graph that you want to view a vertex for.
4. Click the vertex that you want to view.
5. Click **Edit**.

   Macrometa displays the vertex record associated with the vertex that you clicked.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Get (View) a Vertex](https://www.macrometa.com/docs/api#/operations/GetAVertex).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl graph vertex describe](../../cli/graph-vertex-cli#gdnsl-graph-vertex-describe) CLI command to view a graph vertex.

</TabItem>
</Tabs>

## Update a Vertex

These instructions provide several methods of updating a graph vertex. Updating means that you to specify which vertex properties to update and leave the rest of the properties unchanged. If you want to update all the properties, then you should [Replace a Vertex](#replace-a-vertex).

<Tabs groupId="operating-systems2">
<TabItem value="console" label="Web Console">

Follow these instructions to update a graph vertex using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
2. Click **Graphs**.
3. Click the graph for which you want to update a vertex.
4. Click the vertex that you want to update.
5. Click **Edit**.

   Macrometa opens the vertex record in an editing window.

6. Update any information necessary.
7. Click **Save**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Update a Vertex](https://www.macrometa.com/docs/api#/operations/UpdateAVertex).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl graph vertex update](../../cli/graph-vertex-cli#gdnsl-graph-vertex-update) CLI command to update a graph vertex.

</TabItem>
</Tabs>

## Replace a Vertex

These instructions provide several methods of replacing a graph vertex. This command completely overwrites the existing vertex document with a new one, including any properties that were not explicitly included in the new document. In other words, all properties not present in the new document are removed. If you only want to update some of the properties, then you should [Update a Vertex](#update-a-vertex).

<Tabs groupId="operating-systems3">
<TabItem value="console" label="Web Console">

Follow these instructions to replace a graph vertex using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
2. Click **Graphs**.
3. Click the graph for which you want to replace a vertex.
4. Click the vertex that you want to replace.
5. Click **Edit**.

   Macrometa opens the vertex record in an editing window.

6. Update any information necessary.
7. Click **Save**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Replace a Vertex](https://www.macrometa.com/docs/api#/operations/ReplaceAVertex).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl graph vertex replace](../../cli/graph-vertex-cli#gdnsl-graph-vertex-replace) CLI command to replace a graph vertex.

</TabItem>
</Tabs>

## Delete a Vertex

## List Vertex Collections

## Add a Vertex Collection

## Remove a Vertex Collection
