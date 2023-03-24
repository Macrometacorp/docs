---
sidebar_position: 60
title: Named Graphs and Anonymous Graphs
---

In Macrometa Global Data Network (GDN), you can work with graphs using either named graphs or anonymous graphs, depending on your needs and preferences. Both approaches offer different levels of convenience and flexibility when managing and querying graph data.

[C8QL](../../queries/c8ql/) language constructs for graph querying fully support both named graphs and anonymous graphs. These constructs provide optimizations to ensure the best performance when querying your graph data, regardless of the chosen approach.

For more information about querying graphs, refer to [Graph Queries](../graph-queries/).

To learn more about querying in general, refer to [Queries](../../queries/).

## Named Graphs

_Named graphs_ are a way to manage and organize graph data in GDN, where Macrometa handles the collections involved in a graph. To create a named graph, you can use the [API](../../api-docs/), the [CLI](../../cli/), or the web interface. When defining a named graph, you'll need to specify the name of the graph and the vertex and edge collections involved.

Using named graphs simplifies the process of working with graph data because it allows you to focus on the graph structure itself, without worrying about the details of the underlying collections.

## Anonymous Graphs

_Anonymous graphs_, also known as _collection sets_, are another way to work with graphs in GDN. In this approach, you apply graph functions directly on a combination of document and edge collections, without explicitly defining a named graph. This method offers more flexibility and control over the collections involved in a graph and can be useful for ad-hoc graph queries or when working with multiple collections.

With anonymous graphs, you have the freedom to mix and match collections as needed, making it easier to perform complex queries across various datasets. However, this approach requires a deeper understanding of the underlying collections and their relationships.

## Which One to Use

When deciding between named graphs and anonymous graphs, consider factors such as the complexity of your graph data, the frequency of ad-hoc queries, and the need for managing collections. Each approach has its advantages, and the choice depends on your specific requirements and preferences.
