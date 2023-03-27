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

Anonymous graphs don’t have edge definitions describing which vertex collection is connected by which edge collection. The graph model has to be maintained in the client-side code. This gives you more freedom than the strict named graphs.

With anonymous graphs, you have the freedom to mix and match collections as needed, making it easier to perform complex queries across various datasets. However, this approach requires a deeper understanding of the underlying collections and their relationships.

## Which Graph Type to Use

When deciding whether to use anonymous or named graphs in Macrometa GDN, it is important to understand the key differences between the two.

Named graphs guarantee graph integrity, ensuring that no dangling edges are present when inserting or removing vertices or edges. This is particularly helpful when using the same vertex collection across multiple named graphs. However, maintaining this level of integrity requires additional database operations, which might impact performance.

On the other hand, anonymous graphs can offer faster performance for many operations, because they do not enforce the same level of integrity checks as named graphs.

The decision between anonymous and named graphs ultimately depends on your specific needs: If maintaining graph integrity is a priority and you can accommodate the additional computational overhead, then named graphs might be the right choice. However, if performance is the primary concern and you can manage potential issues with dangling edges, then anonymous graphs might be a more suitable option.
