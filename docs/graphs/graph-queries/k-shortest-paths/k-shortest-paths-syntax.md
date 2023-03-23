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

```sql
FOR path
  IN OUTBOUND|INBOUND|ANY K_SHORTEST_PATHS
  startVertex TO targetVertex
  GRAPH graphName
  [OPTIONS options]
  [LIMIT offset, count]
```

- `FOR`: Emits the variable **path** which contains one path as an object containing `vertices`, `edges`, and the `weight` of the path.

- `IN` `OUTBOUND|INBOUND|ANY`: defines in which direction edges are followed (outgoing, incoming, or both)

- `K_SHORTEST_PATHS`: the keyword to compute k shortest paths
  - **startVertex** `TO` **targetVertex** (both string\|object): the two vertices between which the paths will be computed. This can be specified in the form of a ID string or in the form of a document with the attribute `_id`. All other values will lead to a warning and an empty result. If one of the specified documents does not exist, the result is empty as well and there is no warning.

- `GRAPH` **graphName** (string): the name identifying the named graph. Its vertex and edge collections will be looked up.

- `OPTIONS` **options** (object, _optional_): used to modify the execution of the traversal. Only the following attributes have an effect, all others are ignored:
  - **weightAttribute** (string): a top-level edge attribute that should be used to read the edge weight. If the attribute does not exist or is not numeric, the _defaultWeight_ will be used instead.
  - **defaultWeight** (number): this value will be used as fallback if there is no _weightAttribute_ in the edge document, or if it's not a number. The default is 1.

- `LIMIT` (see [LIMIT operation](../../queries/c8ql/operations/limit.md), _optional_): the maximal number of paths to return. It is highly recommended to use a `LIMIT` for `K_SHORTEST_PATHS`.

### Syntax for Collection Sets

```sql
FOR path
  IN OUTBOUND|INBOUND|ANY K_SHORTEST_PATHS
  startVertex TO targetVertex
  edgeCollection1, ..., edgeCollectionN
  [OPTIONS options]
  [LIMIT offset, count]
```

Instead of `GRAPH graphName` you can specify a list of edge collections. The involved vertex collections are determined by the edges of the given edge collections.

### Syntax Traversing in Mixed Directions

For k shortest paths with a list of edge collections you can optionally specify the direction for some of the edge collections. Say for example you have three edge collections _edges1_, _edges2_ and _edges3_, where in _edges2_ the direction has no relevance, but in _edges1_ and _edges3_ the direction should be taken into account. In this case you can use `OUTBOUND` as general search direction and `ANY` specifically for _edges2_ as follows:

```sql
FOR vertex IN OUTBOUND K_SHORTEST_PATHS
  startVertex TO targetVertex
  edges1, ANY edges2, edges3
```

All collections in the list that do not specify their own direction will use the direction defined after `IN` (here: `OUTBOUND`). This allows to use a different direction for each collection in your path search.
