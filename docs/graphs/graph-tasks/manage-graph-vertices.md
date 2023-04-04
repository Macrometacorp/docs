---
title: Manage Graph Vertices
sidebar_position: 80
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains various methods for managing vertices, also called nodes, in Macrometa graphs.

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
5. Click **Edit** (the pencil icon).

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
5. Click **Edit** (the pencil icon).

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
5. Click **Edit** (the pencil icon).

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

These instructions provide several methods of deleting a vertex from a graph.

<Tabs groupId="operating-systems3">
<TabItem value="console" label="Web Console">

Follow these instructions to delete a graph vertex using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
2. Click **Graphs**.
3. Click the graph for which you want to delete a vertex.
4. Click the vertex that you want to delete.
5. Click **Delete** (the trash can icon).
6. In the **Delete node** window, indicate whether you want to delete the edges and then click **Delete**.
7. Macrometa asks you to confirm the deletion. Click **Yes**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Remove (Delete) a Vertex](https://www.macrometa.com/docs/api#/operations/RemoveAVertex).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl graph vertex delete](../../cli/graph-vertex-cli#gdnsl-graph-vertex-delete) CLI command to delete a graph vertex.

</TabItem>
<TabItem value="c8ql" label="C8QL">

C8QL does not provide a direct method to remove vertices with associated edges. However, you can achieve this using a combination of queries. The examples below demonstrate how to remove a vertex and its associated edges from different graphs.

**Remove a Vertex from One Collection**

This example, demonstrates how to remove a vertex and its associated edges from a graph. The query removes the vertex **eve** from the [knows example graph](../graph-examples/example-graphs#the-knows-graph), as well as the edges `eve -> alice` and `eve -> bob`.

![Knows Example Graph](/img/graphs/knows_graph.png)

This query deletes **eve** and its adjacent edges:

```sql
LET edgeKeys = (FOR v, e IN 1..1 ANY 'persons/eve' GRAPH 'knows_graph' RETURN e._key)
LET r = (FOR key IN edgeKeys REMOVE key IN knows) 
REMOVE 'eve' IN persons
```

The query performs the following actions:

- Traverses the graph with a depth of 1 to retrieve the `_key` of all edges connected to **eve**.
- Removes all these edges from the `knows` collection.
- Removes the vertex **eve** from the `persons` collection.

After you run the query, Macrometa returns an empty list. If you examine `knows_graph`, then you will see that the vertex and its associated edges have been removed.

An alternative query to achieve the same result is to combine the edge retrieval and removal within the same graph traversal:

```sql
LET edgeKeys = (FOR v, e IN 1..1 ANY 'persons/eve' GRAPH 'knows_graph'
            REMOVE e._key IN knows)
REMOVE 'eve' IN persons
```

**Remove a Vertex from Multiple Collections**

In the [City Graph](../graph-examples/example-graphs#the-city-graph) example graph, there are several vertex collections - `germanCity` and `frenchCity`, and several edge collections - `frenchHighway`, `germanHighway`, and `internationalHighway`.

![City Example Graph2](/img/graphs/cities_graph.png)

To delete city **Berlin**, you must consider all edge collections. The `REMOVE` operation should be applied to all edge collections with `OPTIONS { ignoreErrors: true }`. If you don't use this option, then the query will stop whenever it encounters a non-existing key that should be removed from a collection.

```sql
LET edgeKeys = (FOR v, e IN 1..1 ANY 'germanCity/Berlin' GRAPH 'routeplanner' RETURN e._key)
LET r = (FOR key IN edgeKeys REMOVE key IN internationalHighway
        OPTIONS { ignoreErrors: true } REMOVE key IN germanHighway
        OPTIONS { ignoreErrors: true } REMOVE key IN frenchHighway
        OPTIONS { ignoreErrors: true }) 
REMOVE 'Berlin' IN germanCity
```

The query performs the following actions:

- Traverses the graph with a depth of 1 to retrieve the `_key` of all edges connected to **Berlin**.
- Removes all these edges from the `internationalHighway`, `germanHighway`, and `frenchHighway` collections using the `ignoreErrors` option to avoid stopping the query if a non-existing key is encountered.
- Removes the vertex **Berlin** from the `germanCity` collection.

After you run the query, Macrometa returns an empty list. If you examine the `routeplanner` graph, then you will see that the vertex and its associated edges have been removed.

</TabItem>
</Tabs>

## List Vertex Collections

These instructions provide several methods of listing vertex collections associated with a graph.

<Tabs groupId="operating-systems4">
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [List Vertex Collections](https://www.macrometa.com/docs/api#/operations/ListVertexCollections).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl graph describe](../../cli/graph-cli#gdnsl-graph-describe) CLI command to get a list of vertex collections for a graph.

</TabItem>
</Tabs>

## Add a Vertex Collection

These instructions provide several methods of adding a vertex collection to a graph.

<Tabs groupId="operating-systems5">
<TabItem value="console" label="Web Console">

Follow these instructions to add a vertex collection to a graph using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **Graphs**.
1. Click **Edit** next to the graph that you want to add a vertex collection to.
1. Click in the **From Collections**, **To Collections**, or **Vertex Collections** field, and then select the vertex collection that you want to add. You can do this more than once.
1. Click **Update**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Add a Vertex Collection](https://www.macrometa.com/docs/api#/operations/AddVertexCollection).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl graph update](../../cli/graph-cli#gdnsl-graph-update) CLI command to add a vertex collection to a graph.

</TabItem>
</Tabs>

## Remove a Vertex Collection

These instructions provide several methods of removing a vertex collection from a graph.

<Tabs groupId="operating-systems5">
<TabItem value="console" label="Web Console">

Follow these instructions to remove a vertex collection from a graph using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **Graphs**.
1. Click **Edit** next to the graph that you want to remove a vertex collection from.
1. In the **From Collections**, **To Collections**, or **Vertex Collections** field, click the **X** next to the vertex collection that you want to remove. You can do this more than once.
1. Click **Update**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Remove a Vertex Collection](https://www.macrometa.com/docs/api#/operations/RemoveVertexCollection).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl graph update](../../cli/graph-cli#gdnsl-graph-update) CLI command to remove a vertex collection from a graph.

</TabItem>
</Tabs>
