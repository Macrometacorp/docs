---
sidebar_position: 1
title: Graphs
---

Graph queries allow you to perform complex operations on graph data, which consists of vertices and edges representing entities and their relationships. Graph queries enable you to efficiently explore the relationships between entities in your data and extract meaningful insights. You can perform graph queries using [C8QL](../../queries/c8ql/), Macrometa's query language, which provides a powerful and flexible way to interact with your graph data.

## Named Graphs and Anonymous Graphs

In Macrometa GDN, you can work with graphs using either named graphs or anonymous graphs, depending on your needs and preferences.

### Named Graphs

_Named graphs_ are a way to manage and organize graph data in GDN, where Macrometa handles the collections involved in a graph. To create a named graph, you can use the graph module or the web interface. When defining a named graph, you'll need to specify the name of the graph and the vertex and edge collections involved. Named graphs offer a convenient method for managing graph data, as the underlying document and edge collections are handled by Macrometa.

C8QL language constructs for graph querying fully support both named graphs and anonymous graphs. These constructs provide optimizations to ensure the best performance when querying your graph data, regardless of the chosen approach.

### Anonymous Graphs

_Anonymous graphs_, also known as _collection sets_, are another way to work with graphs in GDN. In this approach, you apply graph functions directly on a combination of document and edge collections, without explicitly defining a named graph. This method offers more flexibility and control over the collections involved in a graph and can be useful for ad-hoc graph queries or when working with multiple collections.

## Graph Query Types

These graph query types, including traversals, shortest path, and k shortest paths, provide a foundation for efficiently exploring and analyzing the relationships within your graph data in Macrometa GDN. By using these queries, you can gain a deeper understanding of your data and extract valuable insights to inform your decision-making processes. Each query type has its own syntax and options, which you can explore in greater detail in the subsequent topics of this section. It's important to note that these types of queries are most useful if you use edge collections and/or graphs in your data model.

### Traversals

_Traversals_ are queries that explore the relationships between vertices by following edges in a graph. They can be combined with C8QL filter conditions and are useful for discovering connected data points and understanding the structure of your graph. Traversals can be performed in specific directions (outbound, inbound, or any) and you can control the depth of the traversal to limit the exploration of connections. Traversals are commonly used for tasks like finding related entities, discovering paths through a network, or analyzing hierarchical structures.

### Shortest Path

_Shortest path_ queries help you find the shortest path between two vertices in a graph. They can be used to determine the most direct route or relationship between entities in your graph data. You can also use edge weights to calculate the shortest path based on specific attributes, such as distance or time, making this query type ideal for route optimization, transportation, and similar use cases.

### k Shortest Path

_k shortest path_ queries find multiple shortest paths between two vertices in a graph, considering different criteria such as edge weights. This type of query is useful when you want to discover alternative routes or relationships between entities that meet specific criteria. For example, you may want to find the top three shortest paths between two locations based on distance or travel time.
