---
sidebar_position: 10
title: Traversal Query Syntax
---

When writing a traversal query, you can either use a named graph or a set of edge collections (anonymous graph).

## Syntax for Named Graphs

Use this syntax if you have created a named graph, which is entered as `graphName`.

```sql
[WITH collection1[, collection2[, ...collectionN]]]
FOR vertex[, edge[, path]]
  IN [min[..max]]
  OUTBOUND|INBOUND|ANY startVertex
  GRAPH graphName
  PRUNE pruneCondition
  [OPTIONS options]
  [FILTER filterCondition]
  [LET variableDefinitions]
  [COLLECT aggregation]
  [SORT sortOrder]
  [LIMIT offset, count]
  [RETURN returnExpression]
```

## Syntax for Collection Sets

Instead of `GRAPH graphName`, you can specify a list of edge collections (anonymous graph). The vertex collections involved are determined by the edges of the given edge collections. Other than that, the syntax is similar to the named version.

```sql
[WITH collection1[, collection2[, ...collectionN]]]
FOR vertex[, edge[, path]]
  IN [min[..max]]
  OUTBOUND|INBOUND|ANY startVertex
  edgeCollection1, ..., edgeCollectionN
  PRUNE pruneCondition
  [OPTIONS options]
  [FILTER filterCondition]
  [LET variableDefinitions]
  [COLLECT aggregation]
  [SORT sortOrder]
  [LIMIT offset, count]
  [RETURN returnExpression]
```

If the same edge collection is specified multiple times, then it behaves as if it were specified only once. Specifying the same edge collection is only allowed when the collections do not have conflicting traversal directions.

## Traversing in Mixed Directions

For traversals with a list of edge collections, you can optionally specify the direction for some of the edge collections. For example, if you have three edge collections `edges1`, `edges2`, and `edges3`, and in `edges2` the direction has no relevance but in `edges1` and `edges3` the direction should be taken into account. In that case, you could use `OUTBOUND` as the general traversal direction and `ANY` specifically for `edges2` as follows:

```sql
FOR vertex IN OUTBOUND
  startVertex
  edges1, ANY edges2, edges3
  [PRUNE pruneCondition]
  [OPTIONS options]
  [FILTER filterCondition]
  [LET variableDefinitions]
  [COLLECT aggregation]
  [SORT sortOrder]
  [LIMIT offset, count]
  [RETURN returnExpression]
```

All collections in the list that do not specify their own direction use the direction defined after `IN`. This allows you to use a different direction for each collection in your traversal.

## Query Parameters

This section explains the parameters of the queries above. Anything not specific to graph traversal queries (such as `FILTER`, `SORT`, `LIMIT`, `COLLECT`, and `RETURN`) is explained in [C8QL](../../../../compute/queryworkers/queries/c8ql/).

### Specifying Collections: WITH

- **collections** (collection, `repeatable`): List the collections involved in the traversal

### Traversal Variables: FOR

This command emits up to three variables:

- **vertex** (object): The current vertex during a traversal.
- **edge** (object, `optional`): The current edge during a traversal.
- **path** (object, `optional`): A representation of the current path with two members:
  - `vertices`: An array of all vertices on this path.
  - `edges`: An array of all edges on this path.

### Traversal Depth: IN

- `min..max`: Specifies the minimum and maximum depth for the traversal.
  - **min** (number, `optional`): The traversal starts at depth `min`, excluding edges and vertices below this depth. If not specified, then it defaults to 1. The minimum possible value is 0.
  - **max** (number, `optional`): Paths with a length up to `max` are traversed. If omitted, then `max` defaults to `min`, returning only vertices and edges within the specified depth range. Note that `max` cannot be specified without `min`.

### Traversal Direction: OUTBOUND|INBOUND|ANY

Choose to follow outgoing, incoming, or both edge directions during traversal. This option cannot be replaced by a bind parameter.

- **startVertex** (string|object): Specifies the starting vertex for the traversal. This can be provided as an ID string or a document containing an `_id` attribute. Any other value will result in a warning and an empty result. If the specified document doesn't exist, then the result will also be empty without a warning.

### Named Graph: GRAPH

**graphName** (string): The name identifying the named graph, which determines the vertex and edge collections to be used. Note that the graph name must enclosed in quote marks, as it's treated as a regular string.

### Traversal PRUNE Condition

- **pruneCondition**: A condition that evaluates to a Boolean value, assessed at every step of the traversal as early as possible. The condition's semantics are as follows:

  - If the condition evaluates to `true`, then the current path is considered a result but might still be subject to post-filtering or depth constraints. However, the search will not continue beyond this path, meaning no results will include this path as a prefix.
  
    Example: Consider the path `(A) -> (B) -> (C)`. Starting at `A` and using `PRUNE` on `B` results in `(A)` and `(A) -> (B)` being valid paths, while `(A) -> (B) -> (C)` is not returned because it was pruned at `B`.

  - If the condition evaluates to `false`, then the query continues to search beyond the current path.

Only one `PRUNE` condition is possible, but it can include any number of `AND` or `OR` statements. Note that you can use the output variables from the traversal in the `PRUNE` condition, as well as all variables defined prior to the traversal statement.

### Traversal Query OPTIONS

**options** (object, `optional`): Modify the behavior of the traversal query by specifying options. Only the following attributes have an effect, all others are ignored.

- **uniqueVertices** (string): Optionally ensure vertex uniqueness
  - "path" – Guarantees that no path with a duplicate vertex is returned.
  - "global" –  Ensures that each vertex is visited at most once during the traversal, regardless of the number of paths leading from the start vertex to it. If the `min` depth is greater than 1, then a vertex found before the `min` depth might not be returned, even if it is part of a path. This setting makes the result non-deterministic. If multiple paths exist from the `startVertex` to `vertex`, then one of them is chosen. If you use this option, then you should also set the `bfs` option to `true`, otherwise the results might be unpredictable.
  - "none" (default) – No uniqueness check is applied on vertices.

- **uniqueEdges** (string): Optionally ensure edge uniqueness
  - "path" (default) – Guarantees that no path with a duplicate edge is returned.
  - "global" – Ensures that each edge is visited at most once during the traversal, regardless of the number of paths leading from the start vertex to it. If the `min` depth is greater than 1, then an edge found before the `min` depth might not be returned, even if it is part of a path. This setting makes the result non-deterministic. If multiple paths exist from the `startVertex` to `vertex`, then one of them is chosen.
  - "none" – No uniqueness check is applied to edges. With this configuration, the traversal will follow cycles in edges.

- **bfs** (bool): Use the alternative breadth-first traversal algorithm. This can consume a lot of memory if the graph is large.
  - true – Executes the traversal using a breadth-first approach. Results will first contain all vertices at depth 1, followed by all vertices at depth 2, and so on.
  - false (default) – Executes the traversal using a depth-first approach. Results will first return all paths from `min` depth to `max` depth for one vertex at depth 1, then for the next vertex at depth 1, and so on.
