---
title: Create a Graph
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Once you have created at least one vertex collection and at least one edge collection, you can create a graph using one of the methods described in this page.

For more information about creating collections for graphs, refer to [Create a Vertex Collection](create-vertex-collection) and [Create a Graph Edge Collection](create-graph-edge-collection).

You can also create an example graph based on Macrometa's pre-loaded examples, which include all required datasets. You do not need to create any collections for those. For more information about example graphs, refer to [Example Graphs](../graph-examples/example-graphs).

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Follow these instructions to create a new graph using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
2. Click **Data > Graphs**.
3. Click **New Graph**. At this point, you have two options:
   - Create a graph based on sample datasets.
   - Create a graph based on your vertex and edge collections.

#### Create a Graph Based on Sample Datasets

1. Click **Sample Datasets**.
2. Next to the example graph you want to make, click **Create**.

   Macrometa creates the named graph and the collections with vertex and edge data that the graph is based on. For more information about example graphs, refer to [Example Graphs](../graph-examples/example-graphs).

#### Create a Graph Based on Your Collections

1. In **Graph Name**, enter the graph name.
2. Click the **Graph Edge Collection** field, and then select the edge collection that you want the graph to use.
3. Click the **From Collections** field, and then select the document collection that you want the graph to use for start relations of the edge definitions. You can add multiple collections in this manner.
4. Click the **To Collections** field, and then select the document collection that you want the graph to use for end relations of the edge definitions. You can add multiple collections in this manner.
5. (Optional) If you have a collection of vertices that do not connect to other vertices, sometimes called orphan vertices, then click the **Isolated Vertex Collections** field, then select the collection. You can add multiple collections in this manner.
6. (Optional) To add another collection of edge definitions to your graph, click the plus icon. Another set of relationship fields appears, which you can populate like the previous set.
7. When you have added all the collections to your graph, click **Create**.

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to [Create a Graph]([Link to API command](https://www.macrometa.com/docs/api#/operations/CreateAGraph)).

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl graph create](../../cli/graph-cli#gdnsl-graph-create) CLI command to create a new named graph.

</TabItem>
</Tabs>
