---
title: Depth-first and Breadth-first Traversals
sidebar_position: 80
---

Depth-first traversal (DFT) and breadth-first traversal (BFT) are two common strategies for exploring and navigating a graph, both used to visit all the vertices and edges of a graph in a systematic manner. Each traversal method has its specific use cases and characteristics.

In the context of Macrometa's global data network, DFT and BFT can be used to explore relationships between vertices and edges within the graph, enabling complex graph analysis and pattern matching. To perform DFT and BFT on Macrometa graphs, you can use [C8QL](../../../compute/queryworkers/queries/c8ql/), Macrometa's query language.

It is important to remember that both DFT and BFT can be resource-intensive operations, especially when traversing large graphs or exploring many levels deep. It is advisable to limit the traversal depth or use filters to reduce the number of vertices and edges visited during the traversal.

For more information about querying graphs, refer to [Graph Queries](../graph-queries/).

To learn more about querying in general, refer to [Queries](../../../compute/queryworkers/queries/).

## Depth-First Traversal (DFT)

Depth-first traversal starts at a given vertex and explores as far as possible along each branch before backtracking. In other words, DFT goes deep into the graph along a single path, visiting all the descendants of a vertex before returning to explore other branches. DFT can be implemented using recursion or an explicit stack data structure.

### Steps for DFT

1. Start at a source vertex.
1. Visit the vertex and mark it as visited.
1. For each adjacent unvisited vertex, perform a depth-first traversal from that vertex.
1. Backtrack when there are no more unvisited adjacent vertices.

DFT is particularly useful for tasks like searching for cycles in a graph or determining whether a path exists between two vertices.

### DFT Example

You could run the following query on the [Traversal Graph Example](../graph-examples/sample-dataset-graphs#the-traversal-graph):

```sql
FOR vertex, edge, path IN 1..3 ANY 'circles/A' GRAPH 'traversalGraph' 
RETURN { user: vertex._key, connection: edge ? edge._key : null, depth: LENGTH(path.edges) }
```

This query will explore the graph up to 3 levels deep. The `ANY` keyword is used to traverse the graph in any direction (both incoming and outgoing edges).

## Breadth-First Traversal (BFT)

Breadth-first traversal starts at a given vertex and explores all its neighbors before moving on to the neighbors of those neighbors. BFT visits vertices in layers, exploring all vertices at a given depth from the starting vertex before moving on to the next level. BFT can be implemented using a queue data structure.

### Steps for BFT

1. Start at a source vertex and add it to the queue.
1. Visit the vertex at the front of the queue and mark it as visited.
1. Add all unvisited adjacent vertices to the end of the queue.
1. Remove the visited vertex from the queue.
1. Repeat steps 2-4 until the queue is empty.

BFT is particularly useful for tasks like finding the shortest path between two vertices in an unweighted graph or computing the minimum spanning tree of a connected graph.

### BFT Example

You can have Macrometa use a breadth-first traversal algorithm by setting the traversal option to `true`. For more information about options, refer to [Traversal Query Parameters](../graph-queries/traversal-queries/index.md#query-parameters).

A query would look something like this:

```sql
FOR vertex, edge, path IN 1..3 ANY 'circles/A' GRAPH 'traversalGraph'
OPTIONS {bfs: true}
RETURN {
user: vertex._key,
connection: edge ? edge._key : null,
depth: LENGTH(path.edges)
}
```
