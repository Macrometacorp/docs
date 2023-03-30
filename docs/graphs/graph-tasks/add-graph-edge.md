---
title: Add Graph Edge
sidebar_position: 40
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to add edges to a graph or [Graph Edge collection](../../collections/graph-edge/).

You can add edges and edge definitions using either the graph commands or the collection commands. Best practice is to use the graph commands in most cases. For more information, refer to [Manipulating Graph Collections](../graph-concepts/manipulating-graph-collections).

<Tabs groupId="operating-systems">
<TabItem value="console1" label="Web Console - Graph">

Follow these instructions to add a graph edge using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
2. Click **Graphs**.
3. Click the graph to which you want to add edges.
4. Click the vertex that is the beginning of the edge that you want to add, and then click the link icon (looks like a chain).
5. Click the vertex that is the end of the edge that you want to add.
6. (Optional) In the **Create Edge** screen, enter the **_key** if you want to assign a key.
7. (Optional) In the **Create Edge** screen, select the **Edge Collection** that you want to add the edge to (if you have more than one edge collection in the graph).
8. Click **Create**.

</TabItem>
<TabItem value="console2" label="Web Console - Collection">

To add edge documents to a collection:

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Collections**.
1. In the collection list, click the name of the edge collection to which you want to add an edge. If you aren't sure which collections are Graph Edge collections, then you can click **Edge** at the top of the page to see just Graph Edge collections.
1. Click **New Document**.
1. Enter information in the fields.
   - **_from -** Document `_id` from which the relationship originates.
   - **_to -** Document `_id` to which the relationship is defined.
   - **_key -** Optional. If left blank, then Macrometa automatically generates a key.
1. Click **Create**.

#### Add Edges from a File

To add edge documents to a collection from a JSON or CSV file:

![Import a Document](/img/collections/import-docs.png)

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Collections**.
1. In the collection list, click the name of the edge collection to which you want to add an edge. If you aren't sure which collections are Graph Edge collections, then you can click **Edge** at the top of the page to see just Graph Edge collections.
1. Click the import icon, which is a down arrow pointing to a file box.
1. Click **Choose File**, then browse to the file containing the documents you want to import.
1. Fill out any desired options and then click **Import Documents**.

   - **Select Primary Key -** Macrometa can autogenerate your primary key, or you can select one from the file.
   - **Replace docs -** Select this option to overwrite any existing documents with the same `_key`.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Create a New Edge](https://www.macrometa.com/docs/api#/operations/CreateAnEdge) or [Add a New Edge Definition](https://www.macrometa.com/docs/api#/operations/AddEdgedefinition) between existing vertices.

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl graph edge create](../../cli/graph-edges-cli#gdnsl-graph-edge-create) CLI command to create a new graph edge.

</TabItem>
</Tabs>
