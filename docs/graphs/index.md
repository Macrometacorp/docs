---
title: Graphs
sidebar_position: 10
---

Macrometa graphs allow you to model, store, and query complex relationships between entities. In Macrometa GDN, you can leverage graphs to represent connected data as nodes (vertices) and edges.

Vertices represent the entities in the graph, while edges represent the relationships between these entities. By organizing data in this manner, you can efficiently perform complex traversals, pattern matching, and other graph-specific queries.

## High-Level Process

To get started with graphs in Macrometa GDN, follow these steps.

### 1. Create Vertex Collections

Vertex collections are [document collections](../collections/types-collections/documents/index.md) used to store the vertices or nodes of your graph. Each vertex represents an entity in your data model, such as a person, a product, or an event.

A vertex can be a document in a document collection or an [edge collection](../collections/graph-edge/), so `edges` can be used as `vertices`. The _edge definitions_ define which collections are used within a named graph.

### 2. Create Edge Collections

Edge collections are used to store the edges or relationships between vertices in your graph. Each edge represents a connection between two vertices and may include additional attributes describing the nature of the relationship.

Edges are stored as documents in [edge collections](graph-tasks/create-graph-edge-collection).

### 3. Define the Graph Structure

Once you have created the necessary vertex and edge collections, you can define your graph structure in Macrometa GDN. This involves specifying which vertex collections and edge collections should be part of the graph, as well as any additional configuration options.

For more information, refer to [Create a Graph](graph-tasks/create-graph).

### 4. Query the Graph

With the graph structure in place, you can use Macrometa GDN's query language to perform a variety of graph-related operations, such as traversals, shortest path calculations, and pattern matching. These powerful query capabilities enable you to extract valuable insights from your connected data.

For more information, refer to [Graph Queries](graph-queries/).

## Use Cases for Graphs

Graphs allow you to structure your models in line with your domain and group them logically in collections and giving you the power to query them in the same graph queries. Here are some common use cases for graphs in Macrometa GDN.

### Access Control and Permissions

Graphs can be used to model and manage complex relationships between users, roles, and resources in a system, simplifying access control and permission management.

### Transportation and Logistics

By representing transportation networks, routes, and schedules as a graph, businesses can optimize routing, minimize transit times, automate fleet management, and improve overall efficiency.

### Recommendation Engines

Graphs can be used to model relationships between products, customers, and their preferences, enabling personalized recommendations based on user behavior, product similarities, or collaborative filtering.

### Social Networks

Macrometa graphs can be used to represent connections between users in a social network, allowing you to write queries related to friend recommendations, influence analysis, and community detection.

### Network Management

Graphs can be used to model complex networks, such as telecommunication or computer networks, making it easier to monitor, optimize, and troubleshoot network performance and connectivity issues.

## For the Math Geeks

Mathematically, a graph (directed, unlabelled, without multiple edges) is nothing but a relation. It consists of a set `V` of vertices and a subset `E` (the edges) of the Cartesian product `V x V`. There is an edge from `v to w`, if and only if the pair `(v,w)` is contained in `E`.

Similarly, a _bipartite graph_ is just a subset of a Cartesian product `A x B` for two disjoint sets `A` and `B`. It is only when we go to labelled graphs (in which every edge carries a label) or multiple edges that we get a richer structure. Note that an undirected graph can just be seen as a symmetric directed one.
