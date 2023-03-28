---
title: GRAPH
---

The `GRAPH` keyword in [C8QL](../../../queries/c8ql/) is used to specify a named graph in your Macrometa database when performing graph operations, such as traversals or finding the shortest path. A named graph groups together vertex and edge collections representing a specific graph structure, simplifying complex graph data management.

## Purpose

The purpose of the `GRAPH` keyword is to simplify graph query operations by referencing a named graph instead of individual vertex and edge collections. This makes queries more readable, maintainable, and easier to work with.

## Syntax

There are two primary syntax variations for using the `GRAPH` keyword, one for graph traversals and another for shortest path searches.

### Graph Traversal

For more information about graph traversal, refer to [Graph Traversal Queries](../traversal-queries/).

```sql
FOR v, e, p IN min_depth..max_depth DIRECTION start_vertex
  GRAPH 'graph_name'
  FILTER conditions
  RETURN result
```

### Shortest Path

This syntax applies to both [shortest path queries](../shortest-path.md) and [k shortest path queries](../k-shortest-paths/).

```sql
FOR vertex, edge IN
  SHORTEST_PATH start_vertex TO target_vertex
  GRAPH 'graph_name'
  RETURN {vertex, edge}
```

## Query Parameters

| Parameter  | Description |
|----------------|-------------|
| `graph_name`   | The name of the graph referenced in the query. |
