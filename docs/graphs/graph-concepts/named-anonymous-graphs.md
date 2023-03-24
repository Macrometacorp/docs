---
sidebar_position: 60
title: Named Graphs and Anonymous Graphs
---

In Macrometa GDN, you can work with graphs using either named graphs or anonymous graphs, depending on your needs and preferences.

For more information about querying graphs, refer to [Graph Queries](../graph-queries/).

To learn more about querying in general, refer to [Queries](../../queries/).

## Named Graphs

_Named graphs_ are a way to manage and organize graph data in GDN, where Macrometa handles the collections involved in a graph. To create a named graph, you can use the graph module or the web interface. When defining a named graph, you'll need to specify the name of the graph and the vertex and edge collections involved. Named graphs offer a convenient method for managing graph data, as the underlying document and edge collections are handled by Macrometa.

[C8QL](../../queries/c8ql/) language constructs for graph querying fully support both named graphs and anonymous graphs. These constructs provide optimizations to ensure the best performance when querying your graph data, regardless of the chosen approach.

## Anonymous Graphs

_Anonymous graphs_, also known as _collection sets_, are another way to work with graphs in GDN. In this approach, you apply graph functions directly on a combination of document and edge collections, without explicitly defining a named graph. This method offers more flexibility and control over the collections involved in a graph and can be useful for ad-hoc graph queries or when working with multiple collections.