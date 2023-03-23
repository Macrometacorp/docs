---
sidebar_position: 20
title: K Shortest Paths Syntax
---

The k shortest paths algorithm identifies the top _k_ shortest paths in terms of length (or weight) between two specified documents, `startVertex` and `targetVertex`, within a graph.

## K Shortest Paths Query Output

Each path is returned as a JSON object comprising three elements:

- An array consisting of the `vertices` present on the path.
- An array containing the `edges` connecting the vertices on the path.
- The `weight` of the path, representing the sum of all edge weights.

If no `weightAttribute` is provided, then the path's weight defaults to its length.

## Syntax

The syntax for k shortest paths queries is similar to the one for the [Shortest Path](shortest-path) query syntax, with options to use either a named graph or a set of edge collections. However, k shortest paths only emits a path variable, while `SHORTEST_PATH` emits both vertex and edge variables.

:::note
It is highly recommended that you use a **LIMIT** statement, as k shortest paths can be a resource-intensive operation. On large connected graphs, it might return numerous paths or perform an expensive (but unsuccessful) search for more short paths.
:::

### Syntax for Named Graphs

Use this syntax if you have created a named graph, which is entered as `graphName`.

```sql
FOR path
  IN OUTBOUND|INBOUND|ANY K_SHORTEST_PATHS
  startVertex TO targetVertex
  GRAPH graphName
  [OPTIONS options]
  [LIMIT offset, count]
```

### Syntax for Collection Sets

Instead of `GRAPH graphName` you can specify a list of edge collections. The involved vertex collections are determined by the edges of the given edge collections.

```sql
FOR path
  IN OUTBOUND|INBOUND|ANY K_SHORTEST_PATHS
  startVertex TO targetVertex
  edgeCollection1, ..., edgeCollectionN
  [OPTIONS options]
  [LIMIT offset, count]
```

### Syntax Traversing in Mixed Directions

For k shortest paths with a list of edge collections you can specify the direction for some of the edge collections. For example, if you have three edge collections `edges1`, `edges2`, and `edges3`, where `edges2` has no relevant direction, but `edges1` and `edges3` do, use `OUTBOUND` as the general search direction and `ANY` specifically for `edges2`:

```sql
FOR vertex IN OUTBOUND K_SHORTEST_PATHS
  startVertex TO targetVertex
  edges1, ANY edges2, edges3
```

All collections in the list that do not specify their own direction use the direction defined after `IN` (in this example: `OUTBOUND`). This allows you to use a different direction for each collection in your path search, providing greater flexibility when traversing graphs with mixed edge directions.

## Query Parameters

This section explains the parameters of the queries above.

### FOR

Defines the variable path, which stores a single path as an object containing `vertices`, `edges`, and the `weight` of the path.

### IN OUTBOUND|INBOUND|ANY

Defines in which direction edges are followed.

- **OUTBOUND**: Outgoing
- **INBOUND**: Incoming
- **ANY**: Both outgoing and incoming

### startVertex TO targetVertex

Both are string objects.

The two vertices between which the shortest path is computed. This can be specified in the form of an ID string or in the form of a document with the attribute `_id`. All other values will lead to a warning and an empty result. If one of the specified documents does not exist, then the result is empty as well and there is no warning.

### GRAPH graphName

String object. The name identifying the named graph. Its vertex and edge collections are already defined, you do not need to specify them.

### OPTIONS options

Object, _optional_.

Used to modify the way the traversal runs. Only the following attributes have an effect, all others are ignored:

- **weightAttribute** (string): A top-level edge attribute that should be used to read the edge weight. If the attribute does not exist or is not numeric, then the _defaultWeight_ is used instead.
- **defaultWeight** (number): This value is used as fallback if there is no _weightAttribute_ in the edge document, or if it's not a number. The default is 1.

### LIMIT

An optional parameter that sets the maximum number of paths to return. Using a `LIMIT` for `K_SHORTEST_PATHS` is highly recommended to manage the number of results and prevent excessive resource usage.

For more information, refer to [LIMIT operation](../../../queries/c8ql/operations/limit).
