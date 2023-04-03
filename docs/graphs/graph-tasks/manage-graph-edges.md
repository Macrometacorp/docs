---
title: Manage Graph Edges
sidebar_position: 80
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains various methods for managing edges in Macrometa graphs.

## Create an Edge

These instructions provide several methods of creating a new edge in an existing graph.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to create a graph edge using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **Data > Graphs**.
1. Click the graph that you want to create a new edge for.
1. Click the first vertex that you want to create an edge for. This will be the **From** vertex of the edge.
1. Click **Draw edge** (chain links icon).
1. Click the destination vertex of the edge. This will be the **To** vertex.
1. (Optional) In the **Create Edge** window, enter the edge **_key**. If you do not enter a key, then Macrometa automatically generates one for you.
1. In the **Create Edge** window, select the **Collection** to add the edge to.
1. Click **Create**.

   A new edge appears on the canvas and a new edge record appears in the collection that you selected. You can now edit the edge to add attributes.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Create an Edge](https://www.macrometa.com/docs/api#/operations/CreateAnEdge).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl graph edge create](../../cli/graph-edges-cli#gdnsl-graph-edge-create) CLI command to create a new graph edge.

</TabItem>
</Tabs>

## View an Edge

These instructions provide several methods of viewing a graph edge.

<Tabs groupId="operating-systems2">
<TabItem value="console" label="Web Console">

Follow these instructions to view a graph edge using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
2. Click **Graphs**.
3. Click the graph that you want to view an edge for.
4. Click the edge that you want to view.
5. Click **Edit** (the pencil icon).

   Macrometa displays the edge record associated with the edge that you clicked.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Get (View) an Edge](https://www.macrometa.com/docs/api#/operations/GetAnEdge).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl graph edge describe](../../cli/graph-edges-cli#gdnsl-graph-edge-describe) CLI command to view a graph edge.

</TabItem>
</Tabs>

## Update an Edge

These instructions provide several methods of updating a graph edge. Updating means that you to specify which edge properties to update and leave the rest of the properties unchanged. If you want to update all the properties, then you should [Replace an Edge](#replace-an-edge).

<Tabs groupId="operating-systems2">
<TabItem value="console" label="Web Console">

Follow these instructions to update a graph edge using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
2. Click **Graphs**.
3. Click the graph for which you want to update an edge.
4. Click the edge that you want to update.
5. Click **Edit** (the pencil icon).

   Macrometa opens the edge record in an editing window.

6. Update any information necessary.
7. Click **Save**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Modify (Update) an Edge](https://www.macrometa.com/docs/api#/operations/ModifyAnEdge).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl graph edge update](../../cli/graph-edges-cli#gdnsl-graph-edge-update) CLI command to update a graph edge.

</TabItem>
</Tabs>

## Replace an Edge

These instructions provide several methods of replacing a graph edge. This command completely overwrites the existing edge document with a new one, including any properties that were not explicitly included in the new document. In other words, all properties not present in the new document are removed. If you only want to update some of the properties, then you should [Update an Edge](#update-an-edge).

<Tabs groupId="operating-systems3">
<TabItem value="console" label="Web Console">

Follow these instructions to replace a graph edge using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
2. Click **Graphs**.
3. Click the graph for which you want to replace an edge.
4. Click the edge that you want to replace.
5. Click **Edit** (the pencil icon).

   Macrometa opens the edge record in an editing window.

6. Update any information necessary.
7. Click **Save**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Replace an Edge Definition](https://www.macrometa.com/docs/api#/operations/ReplaceAnEdge).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl graph edge replace](../../cli/graph-edges-cli#gdnsl-graph-edge-replace) CLI command to replace a graph edge.

</TabItem>
</Tabs>

## Delete an Edge

These instructions provide several methods of deleting an edge from a graph.

<Tabs groupId="operating-systems3">
<TabItem value="console" label="Web Console">

Follow these instructions to delete a graph edge using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
2. Click **Graphs**.
3. Click the graph for which you want to delete a edge.
4. Click the edge that you want to delete.
5. Click **Delete** (the trash can icon).
6. In the **Delete edge** window, click **Delete**.
7. Macrometa asks you to confirm the deletion. Click **Yes**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Remove (Delete) an Edge](https://www.macrometa.com/docs/api#/operations/RemoveAnEdge).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl graph edge delete](../../cli/graph-edges-cli#gdnsl-graph-edge-delete) CLI command to delete a graph edge.

</TabItem>
</Tabs>

## List Edge Collections

These instructions provide several methods of listing edge collections associated with a graph.

<Tabs groupId="operating-systems4">
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [List Edge Collections](https://www.macrometa.com/docs/api#/operations/ListEdgeCollections).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl graph describe](../../cli/graph-cli#gdnsl-graph-describe) CLI command to get a list of edge collections for a graph.

</TabItem>
</Tabs>

## Add an Edge Collection

These instructions provide several methods of adding an edge collection to a graph.

<Tabs groupId="operating-systems5">
<TabItem value="console" label="Web Console">

Follow these instructions to add an edge collection to a graph using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
2. Click **Graphs**.
3. Click **Edit** next to the graph that you want to add a edge collection to.
4. Click the plus icon.

   A new set of three relationship fields appear. You can do this more than once.

5. Click in the **Edge Collections** field, and then select the edge collection that you want to add.
6. Select the **From Collections** and **To Collections** associated with this edge collection.
7. Click **Update**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Add an Edge Definition](https://www.macrometa.com/docs/api#/operations/AddEdgeCollection).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl graph update](../../cli/graph-cli#gdnsl-graph-update) CLI command to add an edge collection to a graph.

</TabItem>
</Tabs>

## Remove an Edge Collection

These instructions provide several methods of removing an edge collection from a graph. If the graph only has one edge collection, then you can change it, but you cannot remove it.

<Tabs groupId="operating-systems5">
<TabItem value="console" label="Web Console">

Follow these instructions to remove an edge collection from a graph using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **Graphs**.
1. Click **Edit** next to the graph that you want to remove an edge collection from.
1. In the **Edge Collections** field, click the **X** next to the edge collection that you want to remove.
1. Click **Update**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Remove an Edge Definition](https://www.macrometa.com/docs/api#/operations/RemoveAnEdgedefinitionFromTheGraph).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl graph update](../../cli/graph-cli#gdnsl-graph-update) CLI command to remove an edge collection from a graph.

</TabItem>
</Tabs>
