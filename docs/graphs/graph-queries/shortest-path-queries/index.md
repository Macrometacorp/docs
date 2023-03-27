---
sidebar_position: 20
title: Shortest Path Query
---

A _shortest path query_ is a query that finds the shortest path between two given documents in your graph. The two documents are referred to as the `startVertex` and `targetVertex`. When you run this query, you receive the result as an array where each element represents a vertex in the shortest path and consists of two items:

- The vertex itself.
- The edge pointing to it.

Shortest path queries enable you to quickly find the shortest path between two vertices in your graph, allowing you to traverse and analyze your graph's structure. This can be particularly useful in applications where finding the most efficient path is critical, such as route planning or supply chain optimization.

## Shortest Path Query in Action

In this high-level example, you have a graph with four vertices labeled A, B, C, and D. The edges are labeled with their weight, or length. The graph looks like this:

![traversal graph](/img/graphs/traversal_graph.png)

Use the following parameters for your query:

- Start at the vertex **A**.
- Finish with the vertex **D**.

In this example, the shortest path between **A** and **D** is through vertices A, B, C and D in that order. The shortest path statement returns the following pairs:

| Vertex | Edge  |
|--------|-------|
|    A   | null  |
|    B   | A → B |
|    C   | B → C |
|    D   | C → D |

Note that the first edge in the result set will always be null because there is no edge pointing to the startVertex.
