---
sidebar_position: 1
title: Graphs Queries
---

Graph queries allow you to perform complex operations on graph data, which consists of vertices and edges representing entities and their relationships. Graph queries enable you to efficiently explore the relationships between entities in your data and extract meaningful insights. You can perform graph queries using [C8QL](../../queries/c8ql/), Macrometa's query language, which provides a powerful and flexible way to interact with your graph data.

## Graph Query Types

These graph query types, including traversals, shortest path, and k shortest paths, provide a foundation for efficiently exploring and analyzing the relationships within your graph data in Macrometa GDN. By using these queries, you can gain a deeper understanding of your data and extract valuable insights to inform your decision-making processes. Each query type has its own syntax and options, which you can explore in greater detail in the subsequent topics of this section. It's important to note that these types of queries are most useful if you use edge collections and/or graphs in your data model.

### Traversals

_Traversals_ are queries that explore the relationships between vertices by following edges in a graph. They can be combined with C8QL filter conditions and are useful for discovering connected data points and understanding the structure of your graph. Traversals can be performed in specific directions (outbound, inbound, or any) and you can control the depth of the traversal to limit the exploration of connections. Traversals are commonly used for tasks like finding related entities, discovering paths through a network, or analyzing hierarchical structures.

### Shortest Path

_Shortest path_ queries help you find the shortest path between two vertices in a graph. They can be used to determine the most direct route or relationship between entities in your graph data. You can also use edge weights to calculate the shortest path based on specific attributes, such as distance or time, making this query type ideal for route optimization, transportation, and similar use cases.

### K Shortest Path

_K shortest path_ queries find multiple shortest paths between two vertices in a graph, considering different criteria such as edge weights. This type of query is useful when you want to discover alternative routes or relationships between entities that meet specific criteria. For example, you may want to find the top three shortest paths between two locations based on distance or travel time.
